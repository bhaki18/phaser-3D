class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Mesh.setLODLevels()\nCube (High Poly) -> Box (Low Poly) based on distance', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-20);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        // High poly (Cube)
        this.highPoly = Mesh.createCube(8);
        this.highPoly.baseColor = 0x00ff00;
        
        // Low poly (Small box)
        this.lowPoly = Mesh.createBox(4, 4, 4);
        this.lowPoly.baseColor = 0xff0000;
        
        this.mainMesh = Mesh.createCube(8); // Placeholder
        this.mainMesh.setLODLevels([
            { distance: 0, mesh: this.highPoly },
            { distance: 40, mesh: this.lowPoly }
        ]);
        
        this.info = this.add.text(10, 70, '', {fill:'#fff', font:'16px Courier'});
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Move mesh away and back
        const dist = 20 + Math.abs(Math.sin(time / 2000)) * 60;
        this.mainMesh.position.z = -dist;
        this.mainMesh.rotation.y += 0.02;
        
        this.info.setText(`Distance: ${dist.toFixed(1)}\nActive LOD: ${dist < 40 ? 'High Poly (Green)' : 'Low Poly (Red)'}`);
        
        this.renderer.render([this.mainMesh]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
