/**
 * Example of using Render.sampleTexture(texture, u, v) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Renderer .sampleTexture(texture, u, v) Example', { fill: '#0f0', font: '16px Courier' });

        const camera = new Camera();
        const renderer = new Render(this, camera, { renderScale: 2 });
        
        // Mock a texture data array (normally retrieved via context.getImageData)
        // Let's assume a 2x2 texture with 4 pixels (RGBA format)
        const mockTexture = {
            width: 2,
            height: 2,
            data: [
                255, 0, 0, 255,   0, 255, 0, 255,  // Red, Green
                0, 0, 255, 255,   255, 255, 0, 255 // Blue, Yellow
            ]
        };

        // Sample texture at UV (0.75, 0.25) -> Top Right pixel -> Green
        const u = 0.75;
        const v = 0.25;

        this.add.text(10, 40, `Sampling Mock 2x2 Texture at UV (${u}, ${v})`, { fill: '#fff' });

        // Retrieve the color using the renderer's texture sampler
        const sampledColor = renderer.sampleTexture(mockTexture, u, v);

        // Convert the sampled numeric color back to hex string for display
        const hexColor = sampledColor.toString(16).padStart(6, '0');

        this.add.text(10, 70, `Sampled Color (Hex): 0x${hexColor}`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
