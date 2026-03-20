/**
 * Example of using Vector3.mulScalar(s) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Vector3 .mulScalar(s) Example', { fill: '#0f0', font: '16px Courier' });

        // Create a vector
        const v1 = new Vector3(2, 4, 6);
        const scalar = 2.5;

        this.add.text(10, 40, `Original v1: (${v1.x}, ${v1.y}, ${v1.z})`, { fill: '#fff' });
        this.add.text(10, 60, `Scalar value: ${scalar}`, { fill: '#fff' });

        // Multiply vector by scalar (returns a new vector)
        const v2 = v1.mulScalar(scalar);

        this.add.text(10, 90, `Result: (${v2.x}, ${v2.y}, ${v2.z})`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
