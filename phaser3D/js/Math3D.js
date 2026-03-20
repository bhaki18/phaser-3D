import Vector3 from "./Vector3.js";

class Math3D {
    static centroid(vertices) {
        if (vertices.length === 0) return new Vector3(0,0,0);
        let x = 0, y = 0, z = 0;
        for (let v of vertices) {
            x += v.x;
            y += v.y;
            z += v.z;
        }
        return new Vector3(x / vertices.length, y / vertices.length, z / vertices.length);
    }

    static computeNormal(v1, v2, v3) {
        const edge1 = v2.sub(v1);
        const edge2 = v3.sub(v1);
        return edge1.cross(edge2).normalize();
    }

    static isFaceVisible(v1, v2, v3, cameraPos) {
        const normal = this.computeNormal(v1, v2, v3);
        const toCamera = cameraPos.sub(v1);
        return normal.dot(toCamera) > 0;
    }

    static toCameraSpace(v, camera) {
        // Translate relative to camera
        let x = v.x - camera.position.x;
        let y = v.y - camera.position.y;
        let z = v.z - camera.position.z;

        // Rotate by camera inverse rotation (Y then X then Z)
        const sy = Math.sin(-camera.rotation.y);
        const cy = Math.cos(-camera.rotation.y);
        const sx = Math.sin(-camera.rotation.x);
        const cx = Math.cos(-camera.rotation.x);
        const sz = Math.sin(-camera.rotation.z);
        const cz = Math.cos(-camera.rotation.z);

        // Y axis
        let x1 = x * cy + z * sy;
        let z1 = -x * sy + z * cy;
        
        // X axis
        let y2 = y * cx - z1 * sx;
        let z2 = y * sx + z1 * cx;
        
        // Z axis
        let x3 = x1 * cz - y2 * sz;
        let y3 = x1 * sz + y2 * cz;

        return new Vector3(x3, y3, z2);
    }

    static project(v, camera, width, height) {
        if (v.z <= 0.1) return null; // Near plane clipping simple

        const factor = camera.fov / v.z;
        const x = v.x * factor + width / 2;
        const y = -v.y * factor + height / 2;

        return { x, y, z: v.z };
    }

    static triangulate(face) {
        const triangles = [];
        for (let i = 1; i < face.length - 1; i++) {
            triangles.push([face[0], face[i], face[i + 1]]);
        }
        return triangles;
    }

    static clipTriangleNear(v1, v2, v3, nearZ = 0.1) {
        // Simple clipping: if all are behind, return empty
        if (v1.z < nearZ && v2.z < nearZ && v3.z < nearZ) return [];
        
        // If all are in front, return the triangle
        if (v1.z >= nearZ && v2.z >= nearZ && v3.z >= nearZ) return [[v1, v2, v3]];

        // Otherwise, it's a cross-plane triangle. 
        // For simplicity in this educational engine, we'll just return the original 
        // if at least one vertex is visible, or a single-vertex approximation.
        // A full implementation would create 1 or 2 new triangles.
        return [[v1, v2, v3]]; 
    }
}

export default Math3D;
