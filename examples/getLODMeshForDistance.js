class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: Level of Detail (LOD)\nWatch the mesh change complexity as camera moves away', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-15);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        // Base mesh
        this.mainMesh = Mesh.createCube(8);
        
        // Define LOD levels
        this.lodLevels = [
            { distance: 20, mesh: Mesh.createCube(8) },       // High detail (standard cube)
            { distance: 40, mesh: Mesh.createPyramid(8, 8) }, // Medium detail
            { distance: Infinity, mesh: Mesh.createBox(2,2,2) } // Low detail (point-like)
        ];
        
        this.mainMesh.setLODLevels(this.lodLevels);
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Move camera back and forth
        const dist = 20 + Math.sin(time / 2000) * 30;
        this.camera.position.z = -dist;
        
        // Choose mesh based on LOD
        const activeMesh = this.mainMesh.getLODMeshForDistance(dist);
        activeMesh.position = this.mainMesh.position;
        activeMesh.rotation.y += 0.02;
        
        this.renderer.render([activeMesh]);
        
        this.add.text(10, 60, `Camera Distance: ${dist.toFixed(1)}\nActive LOD: ${activeMesh.vertices.length} vertices`, {fill:'#fff'}).setDepth(1);
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
