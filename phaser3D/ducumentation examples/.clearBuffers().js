/**
 * Example of using Render.clearBuffers() in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Renderer .clearBuffers() Example', { fill: '#0f0', font: '16px Courier' });

        const camera = new Camera();
        const renderer = new Render(this, camera, { renderScale: 2 });

        this.add.text(10, 40, `Graphics and Z-Buffer are ready.`, { fill: '#fff' });

        // At the start of every frame, buffers must be cleared 
        // to prevent drawing over the previous frame's pixels.
        renderer.clearBuffers();

        this.add.text(10, 70, `renderer.clearBuffers() executed.`, { fill: '#ff0' });
        this.add.text(10, 90, `Color buffer (graphics) cleared, Depth buffer filled with Infinity.`, { fill: '#aaa' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
