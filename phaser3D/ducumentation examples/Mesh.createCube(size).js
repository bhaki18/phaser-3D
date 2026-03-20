/**
 * Example of using Mesh.createCube(size) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Mesh .createCube(size) Example', { fill: '#0f0', font: '16px Courier' });

        const size = 15;

        // Create a 3D Cube Mesh (equilateral box)
        const cubeMesh = Mesh.createCube(size);

        this.add.text(10, 40, `Created 3D Cube Mesh:`, { fill: '#fff' });
        this.add.text(10, 60, `Size (w, h, d in uniform dimensions): ${size}`, { fill: '#aaa' });

        // Check geometry info
        const vertexCount = cubeMesh.vertices.length;
        const faceCount = cubeMesh.faces.length;

        this.add.text(10, 90, `Cube Properties:`, { fill: '#fff' });
        this.add.text(10, 110, `Vertices: ${vertexCount} (8 corners)`, { fill: '#ff0' });
        this.add.text(10, 130, `Faces: ${faceCount} (12 triangular faces, 2 per side)`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
