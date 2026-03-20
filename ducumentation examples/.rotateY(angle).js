class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'rotateY(angle)\nOnly revolves on Y axis', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.c1 = Mesh.createBox(25, 10, 5); this.c1.baseColor = 0xffff00;
        this.meshes = [this.c1];
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.c1.rotation.y += 0.02;
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});