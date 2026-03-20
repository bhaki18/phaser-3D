/**
 * Example of using Render.autoAdjustScale(ms) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Renderer .autoAdjustScale(ms) Example', { fill: '#0f0', font: '16px Courier' });

        const camera = new Camera();
        const renderer = new Render(this, camera, { renderScale: 2 });

        this.add.text(10, 40, `Using dynamic resolution scaling based on frametime...`, { fill: '#fff' });

        // Imagine rendering took 18ms (which means fps drops below 60fps)
        const frameTimeMs = 18; 
        
        // Let the engine adjust the internal scale down to maintain 60FPS
        renderer.autoAdjustScale(frameTimeMs);

        this.add.text(10, 70, `Pass frame delta time: ${frameTimeMs}ms`, { fill: '#aaa' });

        this.add.text(10, 100, `Engine adjusts render scale dynamically to keep smooth FPS!`, { fill: '#ff0' });
    }

    update(time, delta) {
        // In a real scenario, this is called every frame
        // this.renderer.autoAdjustScale(delta);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
