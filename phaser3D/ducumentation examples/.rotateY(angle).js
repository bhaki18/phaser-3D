/**
 * Example of using Mesh.rotateY(angle) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Mesh .rotateY(angle) Example', { fill: '#0f0', font: '16px Courier' });

        // Create a 3D Mesh
        const cube = Mesh.createCube(10);
        
        this.add.text(10, 40, `Initial rotation Y: ${cube.rotation.y}`, { fill: '#fff' });

        // Rotate Mesh around the Y axis by PI/2 radians (90 degrees)
        const angle = Math.PI / 2;
        cube.rotation.y += angle;

        this.add.text(10, 60, `Rotated around Y axis by: ${angle.toFixed(2)} radians (90 deg)`, { fill: '#aaa' });
        
        this.add.text(10, 90, `New rotation Y: ${cube.rotation.y.toFixed(2)}`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
