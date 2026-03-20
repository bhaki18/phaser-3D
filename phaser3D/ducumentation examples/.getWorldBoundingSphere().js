/**
 * Example of using Mesh.getWorldBoundingSphere() in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Mesh .getWorldBoundingSphere() Example', { fill: '#0f0', font: '16px Courier' });

        // Create a basic mesh
        const cube = Mesh.createCube(10);
        
        // Move the mesh in the world
        cube.position = new Vector3(100, 50, -20);
        
        // Get the bounding sphere in world space, useful for frustum culling
        const boundingSphere = cube.getWorldBoundingSphere();

        this.add.text(10, 40, `Calculated World Bounding Sphere:`, { fill: '#fff' });
        
        this.add.text(10, 70, `Center: (${boundingSphere.center.x.toFixed(2)}, ${boundingSphere.center.y.toFixed(2)}, ${boundingSphere.center.z.toFixed(2)})`, { fill: '#ff0' });
        this.add.text(10, 90, `Radius: ${boundingSphere.radius.toFixed(2)}`, { fill: '#ff0' });
        
        this.add.text(10, 120, `Notice center matches the object position.`, { fill: '#aaa' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
