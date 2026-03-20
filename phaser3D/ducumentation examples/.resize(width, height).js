/**
 * Example of using Render.resize(width, height) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Renderer .resize(width, height) Example', { fill: '#0f0', font: '16px Courier' });

        // Initialize renderer at 800x600
        const camera = new Camera();
        const renderer = new Render(this, camera, { renderScale: 2 });

        this.add.text(10, 40, `Initial renderer size: ${renderer.width}x${renderer.height}`, { fill: '#fff' });

        // Resize the renderer backbuffer/Z-buffer to new dimensions, e.g., 1024x768
        const newWidth = 1024;
        const newHeight = 768;
        renderer.resize(newWidth, newHeight);

        this.add.text(10, 70, `renderer.resize(${newWidth}, ${newHeight}) called.`, { fill: '#aaa' });

        this.add.text(10, 100, `New renderer size: ${renderer.width}x${renderer.height}`, { fill: '#ff0' });
        this.add.text(10, 120, `(Z-Buffer arrays and aspect ratio updated automatically)`, { fill: '#aaa' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
