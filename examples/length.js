class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Vector3.length()\nRed Cube Tip relative to origin (0,0,0)', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        this.vec = new Vector3(0, 0, 0);
        this.infoText = this.add.text(10, 70, '', {fill:'#fff', font:'16px Courier'});
        
        this.marker = Mesh.createCube(2);
        this.marker.baseColor = 0xff3333;
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Move vector in a circle
        const radius = 15;
        this.vec.x = Math.sin(time / 1000) * radius;
        this.vec.y = Math.cos(time / 1000) * radius;
        this.vec.z = Math.sin(time / 500) * 5;
        
        this.marker.position = this.vec;
        
        const len = this.vec.length();
        this.infoText.setText(`Vector: (${this.vec.x.toFixed(2)}, ${this.vec.y.toFixed(2)}, ${this.vec.z.toFixed(2)})\nComputed Length: ${len.toFixed(4)}`);
        
        this.renderer.render([this.marker]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
