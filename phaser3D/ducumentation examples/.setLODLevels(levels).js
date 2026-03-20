/**
 * Example of using Mesh.setLODLevels(levels) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Mesh .setLODLevels(levels) Example', { fill: '#0f0', font: '16px Courier' });

        // Create the base mesh
        const mesh = Mesh.createCube(10);

        // Create simplified versions for LOD
        const lod1 = Mesh.createCube(10); // Imagine a somewhat simplified mesh
        const lod2 = Mesh.createCube(10); // Imagine a very simplified mesh

        // Set the LOD (Level Of Detail) levels based on distance
        // The nearest distance (0) uses the original mesh, deeper distances use simpler meshes
        const levels = [
            { distance: 0, mesh: mesh },
            { distance: 100, mesh: lod1 },
            { distance: 300, mesh: lod2 }
        ];

        mesh.setLODLevels(levels);

        this.add.text(10, 40, `Configured ${levels.length} LOD levels.`, { fill: '#fff' });
        this.add.text(10, 70, `Distance 0+: Original Mesh`, { fill: '#ff0' });
        this.add.text(10, 90, `Distance 100+: LOD1 Mesh`, { fill: '#ff0' });
        this.add.text(10, 110, `Distance 300+: LOD2 Mesh`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
