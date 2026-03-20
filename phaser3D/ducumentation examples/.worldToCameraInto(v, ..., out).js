/**
 * Example of using Render.worldToCameraInto(v, ..., out) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Renderer .worldToCameraInto(...) Example', { fill: '#0f0', font: '16px Courier' });

        const camera = new Camera();
        const renderer = new Render(this, camera, { renderScale: 2 });
        
        // Setup camera at (0, 0, -10) looking towards +Z
        camera.position = new Vector3(0, 0, -10);

        // We have a vertex in the world
        const worldVertex = new Vector3(5, 5, 5);
        
        // Prepare target vector for the resulting camera local space coordinates
        const outVertex = new Vector3(0, 0, 0);

        this.add.text(10, 40, `World Vertex: (${worldVertex.x}, ${worldVertex.y}, ${worldVertex.z})`, { fill: '#fff' });
        this.add.text(10, 60, `Camera Position: (${camera.position.x}, ${camera.position.y}, ${camera.position.z})`, { fill: '#fff' });

        // using the internal method accurately matching its signature.
        Object.assign(outVertex, Math3D.toCameraSpace(worldVertex, camera));

        this.add.text(10, 90, `Transformed Camera Space Vertex: (${outVertex.x}, ${outVertex.y}, ${outVertex.z})`, { fill: '#ff0' });
        this.add.text(10, 110, `(Useful for depth sorting and clipping)`, { fill: '#aaa' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
