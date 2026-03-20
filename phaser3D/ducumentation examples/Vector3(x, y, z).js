/**
 * Example of instantiating a new Vector3(x, y, z) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Vector3(x, y, z) Constructor Example', { fill: '#0f0', font: '16px Courier' });

        // Instantiating a new 3D Vector
        const pos = new Vector3(150, 200, -50);
        
        // Sometimes you only provide x, y (defaults may apply)
        const partialPos = new Vector3(10, 20);

        this.add.text(10, 40, `Instantiated Vector 1:`, { fill: '#fff' });
        this.add.text(30, 60, `x: ${pos.x}`, { fill: '#ff0' });
        this.add.text(30, 80, `y: ${pos.y}`, { fill: '#ff0' });
        this.add.text(30, 100, `z: ${pos.z}`, { fill: '#ff0' });

        this.add.text(10, 130, `Instantiated Vector 2 (missing z?):`, { fill: '#fff' });
        this.add.text(30, 150, `x: ${partialPos.x}, y: ${partialPos.y}, z: ${partialPos.z}`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
