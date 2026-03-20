/**
 * Example of using Mesh.getTransformedVertices() in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Mesh .getTransformedVertices() Example', { fill: '#0f0', font: '16px Courier' });

        // Create a basic mesh, like a cube
        const cube = Mesh.createCube(10);
        
        // Apply some transformations
        cube.position = new Vector3(5, 0, 10);
        cube.rotateY(Math.PI / 4);

        // Retrieve vertices after applying the mesh's world matrix
        const vertices = cube.getTransformedVertices();

        this.add.text(10, 40, `Number of transformed vertices: ${vertices.length}`, { fill: '#fff' });
        
        if (vertices.length > 0) {
            const v0 = vertices[0];
            this.add.text(10, 70, `Transformed vertex 0: (${v0.x.toFixed(2)}, ${v0.y.toFixed(2)}, ${v0.z.toFixed(2)})`, { fill: '#ff0' });
            this.add.text(10, 90, `(Includes translation and rotation)`, { fill: '#aaa' });
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
