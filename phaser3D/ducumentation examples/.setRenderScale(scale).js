/**
 * Example of using Render.setRenderScale(scale) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Renderer .setRenderScale(scale) Example', { fill: '#0f0', font: '16px Courier' });

        const camera = new Camera();
        const renderer = new Render(this, camera, { renderScale: 2 });

        this.add.text(10, 40, `Current render scale: 1.0 (Full Resolution)`, { fill: '#fff' });

        // Reduce render resolution for performance (pixelated look or faster rendering)
        // 0.5 means rendering at 400x300, then upscaled to 800x600 in the view
        const targetScale = 0.5;
        renderer.setRenderScale(targetScale);

        this.add.text(10, 70, `renderer.setRenderScale(${targetScale}) called.`, { fill: '#aaa' });

        this.add.text(10, 100, `Renderer now calculating internally at half resolution.`, { fill: '#ff0' });
        this.add.text(10, 120, `Good for performance on mobile devices!`, { fill: '#aaa' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
