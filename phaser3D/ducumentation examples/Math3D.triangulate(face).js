/**
 * Example of using Math3D.triangulate(face) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Math3D .triangulate(face) Example', { fill: '#0f0', font: '16px Courier' });

        // A face with 4 vertices (Quad)
        const quadFace = [
            new Vector3(-1, 1, 0),  // Top Left
            new Vector3(1, 1, 0),   // Top Right
            new Vector3(1, -1, 0),  // Bottom Right
            new Vector3(-1, -1, 0)  // Bottom Left
        ];

        this.add.text(10, 40, `Original Face has ${quadFace.length} vertices (Polygon/Quad)`, { fill: '#fff' });

        // Triangulate the face into multiple 3-vertex triangles
        const triangles = Math3D.triangulate(quadFace);

        this.add.text(10, 70, `Called Math3D.triangulate(quadFace)`, { fill: '#aaa' });

        this.add.text(10, 100, `Result: ${triangles.length} triangles.`, { fill: '#ff0' });
        
        triangles.forEach((tri, index) => {
            this.add.text(10, 120 + (index * 20), `Triangle ${index + 1}: ${tri[0].x},${tri[0].y} -> ${tri[1].x},${tri[1].y} -> ${tri[2].x},${tri[2].y}`, { fill: '#fff' });
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
