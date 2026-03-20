/**
 * Example of using Vector3.normalize() in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Vector3 .normalize() Example', { fill: '#0f0', font: '16px Courier' });

        // Create a vector with length > 1
        const v1 = new Vector3(10, 0, 0);
        const originalLength = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z); // Or v1.length()

        this.add.text(10, 40, `Original v1: (${v1.x}, ${v1.y}, ${v1.z})`, { fill: '#fff' });
        this.add.text(10, 60, `Original length: ${originalLength}`, { fill: '#fff' });

        // Normalize the vector to have length = 1 (unit vector)
        const v2 = v1.normalize();
        const newLength = v2.length();

        this.add.text(10, 90, `Normalized: (${v2.x.toFixed(2)}, ${v2.y}, ${v2.z})`, { fill: '#ff0' });
        this.add.text(10, 110, `New length: ${newLength}`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
