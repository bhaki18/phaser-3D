class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Mesh.createBox(w, h, d)\nDimensions: 20 x 5 x 10', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        // Creating a non-uniform box
        this.mesh = Mesh.createBox(20, 5, 10);
        this.mesh.baseColor = 0xffaa00;
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        this.mesh.rotation.y += 0.01;
        this.mesh.rotation.x += 0.005;
        this.renderer.render([this.mesh]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
