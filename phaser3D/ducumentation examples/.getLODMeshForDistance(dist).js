/**
 * Example of using Mesh.getLODMeshForDistance(dist) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Mesh .getLODMeshForDistance(dist) Example', { fill: '#0f0', font: '16px Courier' });

        // Let's assume we have a highly detailed mesh and two simpler versions
        const highResMesh = Mesh.createCube(10); // Pseudo high-res
        const midResMesh = Mesh.createCube(10);  // Pseudo mid-res
        const lowResMesh = Mesh.createCube(10);  // Pseudo low-res

        // Setup LOD levels for the highResMesh (defined in array form usually)
        highResMesh.setLODLevels([
            { distance: 0, mesh: highResMesh },
            { distance: 50, mesh: midResMesh },
            { distance: 200, mesh: lowResMesh }
        ]);

        // Get the mesh for a specific distance from camera
        const testDistance1 = 30; // Closer than 50, should get highResMesh
        const lodMesh1 = highResMesh.getLODMeshForDistance(testDistance1);
        
        const testDistance2 = 250; // Further than 200, should get lowResMesh
        const lodMesh2 = highResMesh.getLODMeshForDistance(testDistance2);

        this.add.text(10, 40, `Selected mesh for distance ${testDistance1}: ${lodMesh1 === highResMesh ? 'High Res' : 'Other'}`, { fill: '#ff0' });
        this.add.text(10, 60, `Selected mesh for distance ${testDistance2}: ${lodMesh2 === lowResMesh ? 'Low Res' : 'Other'}`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
