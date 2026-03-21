class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Vector3 Operations\nGreen = V1 + V2', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        this.v1 = new Vector3(10, 0, 0);
        this.v2 = new Vector3(0, 10, 0);
        
        this.m1 = Mesh.createCube(1); this.m1.baseColor = 0xff0000;
        this.m2 = Mesh.createCube(1); this.m2.baseColor = 0x0000ff;
        this.m3 = Mesh.createCube(2); this.m3.baseColor = 0x00ff00;
        
        this.info = this.add.text(10, 70, '', {fill:'#fff', font:'14px Courier'});
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Rotate v2
        this.v2.x = Math.sin(time/1000) * 15;
        this.v2.y = Math.cos(time/1000) * 15;
        
        const sum = this.v1.add(this.v2);
        
        this.m1.position = this.v1;
        this.m2.position = this.v2;
        this.m3.position = sum;
        
        this.info.setText(`V1 (Red): ${this.v1.x.toFixed(1)}, ${this.v1.y.toFixed(1)}\nV2 (Blue): ${this.v2.x.toFixed(1)}, ${this.v2.y.toFixed(1)}\nSum (Green): ${sum.x.toFixed(1)}, ${sum.y.toFixed(1)}`);
        
        this.renderer.render([this.m1, this.m2, this.m3]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
