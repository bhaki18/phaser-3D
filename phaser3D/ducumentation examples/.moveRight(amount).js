/**
 * Example of using Camera.moveRight(amount) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Camera .moveRight(amount) Example', { fill: '#0f0', font: '16px Courier' });

        // Initialize camera
        const camera = new Camera();
        camera.position = new Vector3(0, 0, 0);

        this.add.text(10, 40, `Initial Position: (${camera.position.x}, ${camera.position.y}, ${camera.position.z})`, { fill: '#fff' });

        // Simulate strafing right
        const moveAmount = 10;
        camera.position.x += moveAmount;

        this.add.text(10, 60, `Moved right by: ${moveAmount}`, { fill: '#aaa' });
        
        // After moveRight, position is updated
        this.add.text(10, 90, `New Position (Strafed): (${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)})`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
