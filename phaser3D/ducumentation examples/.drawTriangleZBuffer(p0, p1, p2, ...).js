/**
 * Example of using Render.drawTriangleZBuffer(p0, p1, p2, ...) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Renderer .drawTriangleZBuffer(...) Example', { fill: '#0f0', font: '16px Courier' });

        const camera = new Camera();
        const renderer = new Render(this, camera, { renderScale: 2 });
        
        // Mock 2D projected points (x, y, z) where z is depth
        const p0 = new Vector3(100, 100, 5);
        const p1 = new Vector3(200, 100, 5);
        const p2 = new Vector3(150, 200, 5);
        
        // Mock UV coordinates (u, v)
        const uv0 = { u: 0, v: 0 };
        const uv1 = { u: 1, v: 0 };
        const uv2 = { u: 0.5, v: 1 };
        
        // Mock texture and color
        const texture = null; // Untextured
        const color = 0xff0000; // Red

        this.add.text(10, 40, `Drawing single triangle manually to Z-Buffer...`, { fill: '#fff' });

        // Call the internal rendering method
        renderer.drawTriangleZBuffer(p0, p1, p2, uv0, uv1, uv2, texture, color);

        this.add.text(10, 70, `Triangle submitted to Z-Buffer!`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
