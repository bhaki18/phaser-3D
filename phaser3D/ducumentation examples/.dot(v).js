/**
 * Example of using Vector3.dot(v) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Vector3 .dot(v) Example', { fill: '#0f0', font: '16px Courier' });

        // Create two vectors
        const v1 = new Vector3(1, 0, 0); // pointing right
        const v2 = new Vector3(0, 1, 0); // pointing up
        const v3 = new Vector3(1, 0, 0); // pointing right
        
        this.add.text(10, 40, `v1 (Right): (${v1.x}, ${v1.y}, ${v1.z})`, { fill: '#fff' });
        this.add.text(10, 60, `v2 (Up): (${v2.x}, ${v2.y}, ${v2.z})`, { fill: '#fff' });
        this.add.text(10, 80, `v3 (Right): (${v3.x}, ${v3.y}, ${v3.z})`, { fill: '#fff' });

        // Calculate dot product
        const dotOrthogonal = v1.dot(v2); // Perpendicular vectors should yield 0
        const dotParallel = v1.dot(v3);   // Parallel vectors of length 1 should yield 1

        this.add.text(10, 110, `Dot product v1 . v2 (orthogonal): ${dotOrthogonal}`, { fill: '#ff0' });
        this.add.text(10, 130, `Dot product v1 . v3 (parallel): ${dotParallel}`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
