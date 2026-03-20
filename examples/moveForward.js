class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'Camera Move Forward\nMoving through static boxes', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-150);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.meshes = [];
        for(let i=0; i<15; i++) {
            let m = Mesh.createCube(10); m.baseColor = Math.random() * 0xffffff;
            m.position = new Vector3((Math.random()-0.5)*40, (Math.random()-0.5)*40, i * 20);
            this.meshes.push(m);
        }
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.camera.position.z += 0.5;
        if(this.camera.position.z > 300) this.camera.position.z = -150;
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
