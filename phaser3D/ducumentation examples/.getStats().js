/**
 * Example of using Render.getStats() in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Renderer .getStats() Example', { fill: '#0f0', font: '16px Courier' });

        const camera = new Camera();
        const renderer = new Render(this, camera, { renderScale: 2 });

        // Normally, you would render some geometry first
        // renderer.render(meshes);

        // Retrieve performance and rendering statistics
        const stats = renderer.getStats();

        this.add.text(10, 40, `Renderer Frame Statistics:`, { fill: '#fff' });
        
        // Example stats output
        this.add.text(10, 70, `Meshes processed: ${stats.meshesProcessed || 0}`, { fill: '#ff0' });
        this.add.text(10, 90, `Triangles total: ${stats.trianglesTotal || 0}`, { fill: '#ff0' });
        this.add.text(10, 110, `Triangles rendered: ${stats.trianglesRendered || 0}`, { fill: '#ff0' });
        this.add.text(10, 130, `Triangles culled: ${stats.trianglesCulled || 0}`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
