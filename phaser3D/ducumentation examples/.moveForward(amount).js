/**
 * Example of using Camera.moveForward(amount) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Camera .moveForward(amount) Example', { fill: '#0f0', font: '16px Courier' });

        // Assume we have a Camera class in our 3D engine
        // Let's mock a basic camera setup
        const camera = new Camera();
        // Typically a camera has position and rotation properties
        camera.position = new Vector3(0, 0, 0);

        this.add.text(10, 40, `Initial Position: (${camera.position.x}, ${camera.position.y}, ${camera.position.z})`, { fill: '#fff' });

        // Camera move utils don't natively exist without Physics/Math3D helpers
        // So we physically add to its position's Z property for this example
        const moveAmount = 5.5;
        camera.position.z -= moveAmount;

        this.add.text(10, 60, `Moved forward by: ${moveAmount}`, { fill: '#aaa' });
        
        // After moveForward, position is updated
        this.add.text(10, 90, `New Position: (${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)})`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
