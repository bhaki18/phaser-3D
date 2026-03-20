class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Interactive Visual Test\nTarget: .render(meshes).js', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-30);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        // Target shape
        this.mesh = Mesh.createCube(12);
        this.mesh.baseColor = 0x00FF88;
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        this.mesh.rotation.y += 0.015;
        this.mesh.rotation.x += 0.01;
        this.renderer.render([this.mesh]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});