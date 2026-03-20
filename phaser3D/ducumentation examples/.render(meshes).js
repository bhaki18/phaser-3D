/**
 * Example of using Render.render(meshes) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Renderer .render(meshes) Example', { fill: '#0f0', font: '16px Courier' });

        // Instantiate Renderer (assuming Render class exists)
        const camera = new Camera();
        const renderer = new Render(this, camera, { renderScale: 2 });
        
        // Create a few meshes
        const cube1 = Mesh.createCube(10);
        cube1.position = new Vector3(-15, 0, 50);
        
        const cube2 = Mesh.createCube(10);
        cube2.position = new Vector3(15, 0, 50);

        const meshesToRender = [cube1, cube2];

        this.add.text(10, 40, `Prepared ${meshesToRender.length} meshes for rendering.`, { fill: '#fff' });

        // Trigger the render cycle for this frame
        renderer.render(meshesToRender);

        this.add.text(10, 70, `Called renderer.render(meshes)!`, { fill: '#ff0' });
        this.add.text(10, 90, `(Normally called every frame in the update loop)`, { fill: '#aaa' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
