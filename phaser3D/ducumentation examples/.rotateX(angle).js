/**
 * Example of using Mesh.rotateX(angle) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Mesh .rotateX(angle) Example', { fill: '#0f0', font: '16px Courier' });

        // Create a 3D Mesh
        const cube = Mesh.createCube(10);
        
        this.add.text(10, 40, `Initial rotation X: ${cube.rotation.x}`, { fill: '#fff' });

        // Rotate Mesh around the X axis by PI/4 radians (45 degrees)
        const angle = Math.PI / 4;
        cube.rotation.x += angle;

        this.add.text(10, 60, `Rotated around X axis by: ${angle.toFixed(2)} radians (45 deg)`, { fill: '#aaa' });
        
        this.add.text(10, 90, `New rotation X: ${cube.rotation.x.toFixed(2)}`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
