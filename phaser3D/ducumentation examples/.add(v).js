/**
 * Example of using Vector3.add(v) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Vector3 .add(v) Example', { fill: '#0f0', font: '16px Courier' });

        // Create two vectors
        const v1 = new Vector3(10, 20, 30);
        const v2 = new Vector3(5, 5, 5);

        this.add.text(10, 40, `Original v1: (${v1.x}, ${v1.y}, ${v1.z})`, { fill: '#fff' });
        this.add.text(10, 60, `Vector to add (v2): (${v2.x}, ${v2.y}, ${v2.z})`, { fill: '#fff' });

        // Add v2 to v1 (returns a new vector)
        const v3 = v1.add(v2);

        this.add.text(10, 90, `Result (v1 + v2): (${v3.x}, ${v3.y}, ${v3.z})`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
