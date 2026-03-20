
import Vector3 from "./Vector3.js";
import Math3D from "./Math3D.js";




class Mesh {
    constructor(vertices = [], faces = [], uvs = [], faceUVs = []) {
        this.vertices = vertices; // Vector3[]
        this.faces = faces;       // array di indici
        this.uvs = uvs;           // {u, v}[]
        this.faceUVs = faceUVs;   // array di indici UV per faccia
        this.triangleIndices = this.buildTriangleIndices();
        this.triangleUVIndices = this.buildTriangleUVIndices();
        const bounds = this.computeLocalBounds();
        this.localCenter = bounds.center;
        this.localRadius = bounds.radius;

        this.position = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);
        this.lodLevels = null;
        this.baseColor = 0xffffff;
        this.texture = null;
        this.doubleSided = false;

        // PRE-ALLOCATE TRANSFORMED VERTICES CACHE
        this._cachedTransformed = new Array(this.vertices.length);
        for (let i = 0; i < this.vertices.length; i++) {
            this._cachedTransformed[i] = new Vector3(0, 0, 0);
        }
    }

    getTransformedVertices() {
        const transformed = this._cachedTransformed;

        const sy = Math.sin(this.rotation.y);
        const cy = Math.cos(this.rotation.y);
        const sx = Math.sin(this.rotation.x);
        const cx = Math.cos(this.rotation.x);
        const sz = Math.sin(this.rotation.z);
        const cz = Math.cos(this.rotation.z);

        const scaleX = this.scale.x;
        const scaleY = this.scale.y;
        const scaleZ = this.scale.z;

        const posX = this.position.x;
        const posY = this.position.y;
        const posZ = this.position.z;

        for (let i = 0; i < this.vertices.length; i++) {
            const v = this.vertices[i];

            // SCALE
            let x = v.x * scaleX;
            let y = v.y * scaleY;
            let z = v.z * scaleZ;

            // ROTATE Y
            const xY = x * cy + z * sy;
            const zY = -x * sy + z * cy;
            x = xY;
            z = zY;

            // ROTATE X
            const yX = y * cx - z * sx;
            const zX = y * sx + z * cx;
            y = yX;
            z = zX;

            // ROTATE Z
            const xZ = x * cz - y * sz;
            const yZ = x * sz + y * cz;
            x = xZ;
            y = yZ;

            // TRANSLATE (in-place to avoid GC)
            const out = transformed[i];
            out.x = x + posX;
            out.y = y + posY;
            out.z = z + posZ;
        }

        return transformed;
    }

    getFacesVertices(transformedVertices) {

        const result = [];

        for (let face of this.faces) {

            const verts = face.map(i => transformedVertices[i]);

            result.push(verts);
        }

        return result;
    }

    getTriangles(transformedVertices) {

        const triangles = [];
        for (let tri of this.triangleIndices) {
            triangles.push([
                transformedVertices[tri[0]],
                transformedVertices[tri[1]],
                transformedVertices[tri[2]]
            ]);
        }

        return triangles;
    }

    buildTriangleIndices() {
        const triangles = [];

        for (let face of this.faces) {
            if (!face || face.length < 3) continue;

            for (let i = 1; i < face.length - 1; i++) {
                triangles.push([face[0], face[i], face[i + 1]]);
            }
        }

        return triangles;
    }

    getTriangleIndices() {
        return this.triangleIndices;
    }

    buildTriangleUVIndices() {
        if (!Array.isArray(this.faceUVs) || this.faceUVs.length === 0) return null;

        const triUVs = [];
        for (let faceIndex = 0; faceIndex < this.faces.length; faceIndex++) {
            const face = this.faces[faceIndex];
            const uvFace = this.faceUVs[faceIndex];
            if (!face || face.length < 3) continue;

            for (let i = 1; i < face.length - 1; i++) {
                if (!uvFace || uvFace.length < 3 || i + 1 >= uvFace.length) {
                    triUVs.push(null);
                    continue;
                }
                triUVs.push([uvFace[0], uvFace[i], uvFace[i + 1]]);
            }
        }

        return triUVs.some(v => v !== null) ? triUVs : null;
    }

    getTriangleUVIndices() {
        return this.triangleUVIndices;
    }

    computeLocalBounds() {
        if (!this.vertices.length) {
            return {
                center: new Vector3(0, 0, 0),
                radius: 0
            };
        }

        let minX = Infinity, minY = Infinity, minZ = Infinity;
        let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

        for (let i = 0; i < this.vertices.length; i++) {
            const v = this.vertices[i];
            if (v.x < minX) minX = v.x;
            if (v.y < minY) minY = v.y;
            if (v.z < minZ) minZ = v.z;
            if (v.x > maxX) maxX = v.x;
            if (v.y > maxY) maxY = v.y;
            if (v.z > maxZ) maxZ = v.z;
        }

        const center = new Vector3(
            (minX + maxX) * 0.5,
            (minY + maxY) * 0.5,
            (minZ + maxZ) * 0.5
        );

        let radiusSq = 0;
        for (let i = 0; i < this.vertices.length; i++) {
            const dx = this.vertices[i].x - center.x;
            const dy = this.vertices[i].y - center.y;
            const dz = this.vertices[i].z - center.z;
            const d2 = dx * dx + dy * dy + dz * dz;
            if (d2 > radiusSq) radiusSq = d2;
        }

        return {
            center,
            radius: Math.sqrt(radiusSq)
        };
    }

    getWorldBoundingSphere() {
        const local = this.localCenter;

        const sy = Math.sin(this.rotation.y);
        const cy = Math.cos(this.rotation.y);
        const sx = Math.sin(this.rotation.x);
        const cx = Math.cos(this.rotation.x);
        const sz = Math.sin(this.rotation.z);
        const cz = Math.cos(this.rotation.z);

        let x = local.x * this.scale.x;
        let y = local.y * this.scale.y;
        let z = local.z * this.scale.z;

        const xY = x * cy + z * sy;
        const zY = -x * sy + z * cy;
        x = xY;
        z = zY;

        const yX = y * cx - z * sx;
        const zX = y * sx + z * cx;
        y = yX;
        z = zX;

        const xZ = x * cz - y * sz;
        const yZ = x * sz + y * cz;
        x = xZ;
        y = yZ;

        const worldCenter = new Vector3(
            x + this.position.x,
            y + this.position.y,
            z + this.position.z
        );

        const maxScale = Math.max(
            Math.abs(this.scale.x),
            Math.abs(this.scale.y),
            Math.abs(this.scale.z)
        );

        return {
            center: worldCenter,
            radius: this.localRadius * maxScale
        };
    }

    createSimplifiedLOD(triangleStep = 2) {
        const step = Math.max(1, Math.floor(triangleStep));
        if (step <= 1 || this.triangleIndices.length <= 4) return this;

        const selectedTriangles = [];
        for (let i = 0; i < this.triangleIndices.length; i += step) {
            selectedTriangles.push({
                tri: this.triangleIndices[i],
                sourceIndex: i
            });
        }

        const used = new Set();
        for (let i = 0; i < selectedTriangles.length; i++) {
            const tri = selectedTriangles[i].tri;
            used.add(tri[0]);
            used.add(tri[1]);
            used.add(tri[2]);
        }

        const oldToNew = new Map();
        const newVertices = [];
        const oldUvToNew = new Map();
        const newUVs = [];

        for (const oldIndex of used) {
            oldToNew.set(oldIndex, newVertices.length);
            newVertices.push(this.vertices[oldIndex].clone());
        }

        const newFaces = [];
        const newFaceUVs = [];
        for (let i = 0; i < selectedTriangles.length; i++) {
            const tri = selectedTriangles[i].tri;
            newFaces.push([
                oldToNew.get(tri[0]),
                oldToNew.get(tri[1]),
                oldToNew.get(tri[2])
            ]);

            const sourceIndex = selectedTriangles[i].sourceIndex;
            if (this.triangleUVIndices && this.triangleUVIndices[sourceIndex]) {
                const triUV = this.triangleUVIndices[sourceIndex];
                const remapped = [];
                for (let t = 0; t < 3; t++) {
                    const oldUvIndex = triUV[t];
                    if (!oldUvToNew.has(oldUvIndex)) {
                        oldUvToNew.set(oldUvIndex, newUVs.length);
                        const uv = this.uvs[oldUvIndex];
                        newUVs.push({ u: uv.u, v: uv.v });
                    }
                    remapped.push(oldUvToNew.get(oldUvIndex));
                }
                newFaceUVs.push(remapped);
            }
        }

        const lodMesh = new Mesh(newVertices, newFaces, newUVs, newFaceUVs);
        lodMesh.position = this.position;
        lodMesh.rotation = this.rotation;
        lodMesh.scale = this.scale;
        lodMesh.baseColor = this.baseColor;
        lodMesh.isCritical = this.isCritical;
        lodMesh.texture = this.texture;
        lodMesh.doubleSided = this.doubleSided;
        return lodMesh;
    }

    setLODLevels(levels) {
        if (!Array.isArray(levels) || levels.length === 0) {
            this.lodLevels = null;
            return;
        }

        this.lodLevels = levels
            .filter(level => level && level.mesh && Number.isFinite(level.distance))
            .map(level => ({
                distance: level.distance,
                mesh: level.mesh
            }))
            .sort((a, b) => a.distance - b.distance);
    }

    getLODMeshForDistance(distance) {
        if (!this.lodLevels || this.lodLevels.length === 0) return this;
        let selected = this;
        for (let i = 0; i < this.lodLevels.length; i++) {
            if (distance >= this.lodLevels[i].distance) {
                selected = this.lodLevels[i].mesh;
            } else {
                break;
            }
        }
        return selected;
    }

    static createCube(size = 1) {
        return this.createBox(size, size, size);
    }

    static createBox(width = 1, height = 1, depth = 1) {

        const sx = width / 2;
        const sy = height / 2;
        const sz = depth / 2;

        const vertices = [
            new Vector3(-sx, -sy, -sz),
            new Vector3(sx, -sy, -sz),
            new Vector3(sx, sy, -sz),
            new Vector3(-sx, sy, -sz),
            new Vector3(-sx, -sy, sz),
            new Vector3(sx, -sy, sz),
            new Vector3(sx, sy, sz),
            new Vector3(-sx, sy, sz)
        ];

        const faces = [
            [0, 3, 2, 1], // back (-Z)
            [4, 5, 6, 7], // front (+Z)
            [0, 1, 5, 4], // bottom (-Y)
            [3, 7, 6, 2], // top (+Y)
            [1, 2, 6, 5], // right (+X)
            [0, 4, 7, 3]  // left (-X)
        ];

        return new Mesh(vertices, faces);
    }

    static createPyramid(size = 1, height = 1) {
        const s = size / 2;
        const h = height / 2;

        const vertices = [
            new Vector3(0, h, 0),    // podio (top)
            new Vector3(-s, -h, -s), // bottom back-left
            new Vector3(s, -h, -s),  // bottom back-right
            new Vector3(s, -h, s),   // bottom front-right
            new Vector3(-s, -h, s)   // bottom front-left
        ];

        const faces = [
            [0, 1, 2],    // back
            [0, 2, 3],    // right
            [0, 3, 4],    // front
            [0, 4, 1],    // left
            [4, 3, 2, 1]  // bottom
        ];

        return new Mesh(vertices, faces);
    }

    static createPlane(width = 1, height = 1) {
        const sx = width / 2;
        const sy = height / 2;
        const vertices = [
            new Vector3(-sx, -sy, 0),
            new Vector3(sx, -sy, 0),
            new Vector3(sx, sy, 0),
            new Vector3(-sx, sy, 0)
        ];
        const faces = [[0, 1, 2, 3]];
        return new Mesh(vertices, faces);
    }

    getCenter() {
        const transformed = this.getTransformedVertices();
        return Math3D.centroid(transformed);
    }
}

export default Mesh;
