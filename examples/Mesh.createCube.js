class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Mesh.createCube(size)\nSize: 15', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        this.mesh = Mesh.createCube(15);
        this.mesh.baseColor = 0x00ccff;
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        this.mesh.rotation.y += 0.015;
        this.mesh.rotation.z += 0.01;
        this.renderer.render([this.mesh]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
