class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: Auto-Adjusting Render Scale\nWatch Render Scale change based on performance target', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-20);
        this.renderer = new Render(this, this.camera, {renderScale:1.0});
        
        this.mesh = Mesh.createCube(10);
        this.targetFPS = 60;
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Simulating heavy load by performing redundant calculations if needed,
        // but here we just call the adjustment method with the current delta.
        this.renderer.autoAdjustScale(delta);
        
        this.mesh.rotation.y += 0.02;
        this.renderer.render([this.mesh]);
        
        const stats = this.renderer.getStats();
        this.add.text(10, 60, `Current Scale: ${this.renderer.renderScale.toFixed(2)}\nFrame Time: ${delta.toFixed(1)}ms\nTriangles: ${stats.triangles}`, {fill:'#fff'}).setDepth(1);
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
