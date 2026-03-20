/**
 * Example of using Render.clipTriangleNear(c0, c1, c2, near, uvs) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Renderer .clipTriangleNear(...) Example', { fill: '#0f0', font: '16px Courier' });

        const camera = new Camera();
        const renderer = new Render(this, camera, { renderScale: 2 });
        
        // 3 Vertices of a triangle in Camera Space
        // c0 is behind the camera (z < near), c1 and c2 are in front
        const c0 = new Vector3(0, 10, -5); 
        const c1 = new Vector3(-10, -10, 10);
        const c2 = new Vector3(10, -10, 10);

        const uvs = [ {u:0,v:0}, {u:1,v:0}, {u:0.5,v:1} ];
        const nearPlane = 0.1;

        this.add.text(10, 40, `Triangle has 1 vertex behind the near plane.`, { fill: '#fff' });

        // Clip the triangle against the near plane.
        // Returns an array of new triangles (vertices & uvs) resulting from the clip.
        const clippedTriangles = renderer.clipTriangleNear(c0, c1, c2, nearPlane, uvs);

        this.add.text(10, 70, `Triangle clipped into ${clippedTriangles ? clippedTriangles.length : 0} new triangles.`, { fill: '#ff0' });
        this.add.text(10, 90, `(Needed to prevent dividing by zero or reverse rendering)`, { fill: '#aaa' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
