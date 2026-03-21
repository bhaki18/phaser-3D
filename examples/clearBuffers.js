class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Renderer.clearBuffers()\nSpace to toggle clearing (current: ON)', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-30);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        this.mesh = Mesh.createCube(10);
        this.mesh.baseColor = 0xff00ff;
        this.shouldClear = true;
        
        this.input.keyboard.on('keydown-SPACE', () => {
            this.shouldClear = !this.shouldClear;
            this.children.list[0].setText(`Renderer.clearBuffers()\nSpace to toggle clearing (current: ${this.shouldClear ? 'ON' : 'OFF - Trails!'})`);
        });
    }
    update(time, delta) {
        if (this.shouldClear) {
            this.renderer.clearBuffers();
        }
        this.mesh.position.x = Math.sin(time / 500) * 15;
        this.mesh.rotation.y += 0.02;
        this.renderer.render([this.mesh]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
