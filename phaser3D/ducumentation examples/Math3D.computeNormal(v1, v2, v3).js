/**
 * Example of using Math3D.computeNormal(v1, v2, v3) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Math3D .computeNormal(v1, v2, v3) Example', { fill: '#0f0', font: '16px Courier' });

        // Define 3 vertices of a triangle in counter-clockwise order
        const v1 = new Vector3(0, 0, 0);
        const v2 = new Vector3(10, 0, 0);
        const v3 = new Vector3(0, 10, 0);

        this.add.text(10, 40, `Triangle on XY plane:`, { fill: '#fff' });
        this.add.text(10, 60, `v1=(0,0,0), v2=(10,0,0), v3=(0,10,0)`, { fill: '#fff' });

        // Compute the normal vector of the triangle face
        const normal = Math3D.computeNormal(v1, v2, v3);

        this.add.text(10, 90, `Computed Normal: (${normal.x}, ${normal.y}, ${normal.z})`, { fill: '#ff0' });
        this.add.text(10, 110, `Points towards +Z (0, 0, 1) if counter-clockwise.`, { fill: '#aaa' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
