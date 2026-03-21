class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Renderer.setRenderScale(scale)\nDemonstrating retro pixelation effects', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-30);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        this.mesh = Mesh.createCube(12);
        this.mesh.baseColor = 0xffcc00;
        
        this.info = this.add.text(10, 70, '', {fill:'#fff', font:'16px Courier'});
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Cycle scale from 0.1 to 3.0
        const scale = 0.2 + (Math.sin(time / 1000) + 1) * 1.4;
        this.renderer.setRenderScale(scale);
        
        this.mesh.rotation.y += 0.015;
        this.info.setText(`Render Scale: ${scale.toFixed(2)}x\nEffective Resolution: ${Math.round(800 * scale)}x${Math.round(600 * scale)}`);
        
        this.renderer.render([this.mesh]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
