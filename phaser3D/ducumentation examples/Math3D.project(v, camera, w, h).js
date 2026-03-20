/**
 * Example of using Math3D.project(v, camera, w, h) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Math3D .project(v, camera, w, h) Example', { fill: '#0f0', font: '16px Courier' });

        // Camera setup
        const camera = new Camera();
        camera.position = new Vector3(0, 0, -10); // 10 units away

        // Vertex in the world, let's put it at the center of the world
        const worldVertex = new Vector3(0, 0, 0);

        // Screen dimensions
        const screenWidth = 800;
        const screenHeight = 600;

        this.add.text(10, 40, `Projecting World Vertex (0, 0, 0) onto 2D Screen`, { fill: '#fff' });

        // Project the 3D vertex to 2D
        const projectedVertex = Math3D.project(worldVertex, camera, screenWidth, screenHeight);

        if (projectedVertex) {
            this.add.text(10, 70, `2D Screen Coordinates:`, { fill: '#fff' });
            this.add.text(10, 90, `X: ${projectedVertex.x.toFixed(2)} (Center of screen)`, { fill: '#ff0' });
            this.add.text(10, 110, `Y: ${projectedVertex.y.toFixed(2)}`, { fill: '#ff0' });
            this.add.text(10, 130, `Z (Depth): ${projectedVertex.z.toFixed(2)}`, { fill: '#ff0' });
        } else {
            this.add.text(10, 70, `Vertex clipped (behind camera).`, { fill: '#f00' });
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
