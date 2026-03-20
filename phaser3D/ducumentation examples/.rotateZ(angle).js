/**
 * Example of using Mesh.rotateZ(angle) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Mesh .rotateZ(angle) Example', { fill: '#0f0', font: '16px Courier' });

        // Create a 3D Mesh
        const cube = Mesh.createCube(10);
        
        this.add.text(10, 40, `Initial rotation Z: ${cube.rotation.z}`, { fill: '#fff' });

        // Rotate Mesh around the Z axis by Math.PI radians (180 degrees)
        const angle = Math.PI;
        cube.rotation.z += angle;

        this.add.text(10, 60, `Rotated around Z axis by: ${angle.toFixed(2)} radians (180 deg)`, { fill: '#aaa' });
        
        this.add.text(10, 90, `New rotation Z: ${cube.rotation.z.toFixed(2)}`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
