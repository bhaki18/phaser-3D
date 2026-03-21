class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Renderer.resize(w, h)\nCanvas size is constant, but internal resolution changes', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-30);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        this.mesh = Mesh.createCube(12);
        this.mesh.baseColor = 0x00FF88;
        
        this.info = this.add.text(10, 70, '', {fill:'#fff', font:'16px Courier'});
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Cycle internal resolution
        const w = 100 + Math.abs(Math.sin(time / 1000)) * 700;
        const h = 100 + Math.abs(Math.cos(time / 1000)) * 500;
        this.renderer.resize(w, h);
        
        this.mesh.rotation.y += 0.015;
        this.info.setText(`Internal Resolution: ${Math.round(w)} x ${Math.round(h)}`);
        
        this.renderer.render([this.mesh]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
