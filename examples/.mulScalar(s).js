class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'Vector3.mulScalar(s)\nPulsing Scale', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.c1 = Mesh.createCube(5); this.c1.baseColor = 0x00ffff; 
        this.meshes = [this.c1];
        this.baseScale = new Vector3(1,1,1);
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.c1.rotation.x += 0.02; this.c1.rotation.y += 0.03;
        let s = Math.abs(Math.sin(t*0.003)) * 2 + 0.5;
        this.c1.scale = this.baseScale.mulScalar(s);
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});