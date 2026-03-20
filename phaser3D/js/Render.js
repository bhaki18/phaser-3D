import Vector3 from "./Vector3.js";
import Math3D from "./Math3D.js";

class Render {
    constructor(scene, camera, options = {}) {
        this.scene = scene;
        this.camera = camera;
        this.renderScale = options.renderScale || 1;
        this.width = (scene.scale.width * this.renderScale) | 0;
        this.height = (scene.scale.height * this.renderScale) | 0;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        
        this.texture = scene.textures.addCanvas('renderTexture', this.canvas);
        this.image = scene.add.image(scene.scale.width / 2, scene.scale.height / 2, 'renderTexture');
        this.image.setScale(1 / this.renderScale);

        this.zBuffer = new Float32Array(this.width * this.height);
        this.stats = { triangles: 0, culled: 0 };
    }

    clearBuffers() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.zBuffer.fill(Infinity);
        this.stats.triangles = 0;
        this.stats.culled = 0;
    }

    resize(w, h) {
        this.width = (w * this.renderScale) | 0;
        this.height = (h * this.renderScale) | 0;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.zBuffer = new Float32Array(this.width * this.height);
        this.image.setPosition(w / 2, h / 2);
    }

    setRenderScale(scale) {
        this.renderScale = scale;
        this.resize(this.scene.scale.width, this.scene.scale.height);
        this.image.setScale(1 / this.renderScale);
    }

    render(meshes) {
        for (const mesh of meshes) {
            const transformed = mesh.getTransformedVertices();
            const cameraSpace = transformed.map(v => Math3D.toCameraSpace(v, this.camera));
            
            const triangles = mesh.getTriangleIndices();
            for (let i = 0; i < triangles.length; i++) {
                const tri = triangles[i];
                const v0 = cameraSpace[tri[0]];
                const v1 = cameraSpace[tri[1]];
                const v2 = cameraSpace[tri[2]];

                // Near plane clipping (very basic)
                if (v0.z < 0.1 && v1.z < 0.1 && v2.z < 0.1) continue;

                // Backface culling
                if (!mesh.doubleSided && !Math3D.isFaceVisible(v0, v1, v2, new Vector3(0,0,0))) {
                    this.stats.culled++;
                    continue;
                }

                // Projection
                const p0 = Math3D.project(v0, this.camera, this.width, this.height);
                const p1 = Math3D.project(v1, this.camera, this.width, this.height);
                const p2 = Math3D.project(v2, this.camera, this.width, this.height);

                if (!p0 || !p1 || !p2) continue;

                this.drawTriangle(p0, p1, p2, mesh.baseColor);
                this.stats.triangles++;
            }
        }
        this.texture.refresh();
    }

    drawTriangle(p0, p1, p2, color) {
        this.ctx.fillStyle = Phaser.Display.Color.IntegerToColor(color).rgba;
        this.ctx.beginPath();
        this.ctx.moveTo(p0.x, p0.y);
        this.ctx.lineTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.closePath();
        this.ctx.fill();
    }


    worldToCameraInto(worldPos, target) {
        const camSpace = Math3D.toCameraSpace(worldPos, this.camera);
        target.x = camSpace.x;
        target.y = camSpace.y;
        target.z = camSpace.z;
    }

    drawTriangleZBuffer(p0, p1, p2, color) {
        // Fallback to normal drawTriangle for now, but with Z-check for centroids
        const avgZ = (p0.z + p1.z + p2.z) / 3;
        // In a real z-buffer we'd do per-pixel, but for this engine 
        // we'll just do a basic implementation if needed.
        this.drawTriangle(p0, p1, p2, color);
    }

    sampleTexture(texture, u, v) {
        // Basic sampler
        if (!texture) return 0xffffff;
        const x = (u * texture.width) | 0;
        const y = (v * texture.height) | 0;
        return texture.getPixel(x, y);
    }

    autoAdjustScale(ms) {
        if (ms > 33) this.setRenderScale(Math.max(0.2, this.renderScale - 0.05));
        else if (ms < 16) this.setRenderScale(Math.min(1.0, this.renderScale + 0.05));
    }

    getStats() {
        return this.stats;
    }
}

export default Render;
