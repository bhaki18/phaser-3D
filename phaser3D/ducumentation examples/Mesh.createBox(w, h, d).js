/**
 * Example of using Mesh.createBox(w, h, d) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Mesh .createBox(w, h, d) Example', { fill: '#0f0', font: '16px Courier' });

        const width = 20;
        const height = 10;
        const depth = 30;

        // Create a 3D Box (Rectangular Prism) Mesh manually
        const boxMesh = Mesh.createBox(width, height, depth);

        this.add.text(10, 40, `Created 3D Box Mesh:`, { fill: '#fff' });
        this.add.text(10, 60, `Width: ${width}, Height: ${height}, Depth: ${depth}`, { fill: '#aaa' });

        // Useful mesh properties to inspect
        const vertexCount = boxMesh.vertices.length;
        const faceCount = boxMesh.faces.length;

        this.add.text(10, 90, `Box Properties:`, { fill: '#fff' });
        this.add.text(10, 110, `Vertices: ${vertexCount} (usually 8 for a box)`, { fill: '#ff0' });
        this.add.text(10, 130, `Faces: ${faceCount} (usually 12 triangles)`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
