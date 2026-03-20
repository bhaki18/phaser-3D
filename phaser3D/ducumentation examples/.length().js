/**
 * Example of using Vector3.length() in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Vector3 .length() Example', { fill: '#0f0', font: '16px Courier' });

        // Create vectors of known length
        const v1 = new Vector3(10, 0, 0);
        const v2 = new Vector3(3, 4, 0); // Pythagorean triple 3-4-5

        this.add.text(10, 40, `v1: (${v1.x}, ${v1.y}, ${v1.z})`, { fill: '#fff' });
        this.add.text(10, 60, `v2: (${v2.x}, ${v2.y}, ${v2.z})`, { fill: '#fff' });

        // Calculate lengths
        const len1 = v1.length();
        const len2 = v2.length();

        this.add.text(10, 90, `Length of v1: ${len1}`, { fill: '#ff0' });
        this.add.text(10, 110, `Length of v2: ${len2}`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
