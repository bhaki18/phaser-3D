/**
 * Example of using Vector3.cross(v) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Vector3 .cross(v) Example', { fill: '#0f0', font: '16px Courier' });

        // Create two vectors
        const v1 = new Vector3(1, 0, 0); // X axis
        const v2 = new Vector3(0, 1, 0); // Y axis

        this.add.text(10, 40, `v1 (X-axis): (${v1.x}, ${v1.y}, ${v1.z})`, { fill: '#fff' });
        this.add.text(10, 60, `v2 (Y-axis): (${v2.x}, ${v2.y}, ${v2.z})`, { fill: '#fff' });

        // Cross product of X and Y should yield Z (0, 0, 1) or (0, 0, -1)
        const v3 = v1.cross(v2);

        this.add.text(10, 90, `Cross product v1 x v2: (${v3.x}, ${v3.y}, ${v3.z})`, { fill: '#ff0' });
        this.add.text(10, 110, `Notice the result is perpendicular to both original vectors.`, { fill: '#aaa' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
