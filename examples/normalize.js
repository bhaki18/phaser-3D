class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Vector3.normalize()\nRed: Original Vector\nGreen: Normalized (Unit) Vector', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-30);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        // Use a dynamic vector
        this.vec = new Vector3(10, 5, 0);
        this.normText = this.add.text(10, 80, '', {fill:'#fff', font:'16px Courier'});
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Animate original vector
        this.vec.x = Math.sin(time / 1000) * 15;
        this.vec.y = Math.cos(time / 1000) * 15;
        
        const normalized = this.vec.normalize();
        
        this.normText.setText(`Original: (${this.vec.x.toFixed(2)}, ${this.vec.y.toFixed(2)})\nNormalized: (${normalized.x.toFixed(2)}, ${normalized.y.toFixed(2)})\nLength: ${normalized.length().toFixed(2)}`);

        // Visual representation (using debug lines or simple meshes)
        // Here we just use the logic to show it works.
        // For a visual 3D engine demo, we should render something.
        // Let's render a line from origin to vec and origin to normalized*10
        
        // We can use a small cube at the tips
        this.tip1 = Mesh.createCube(1);
        this.tip1.position = this.vec;
        this.tip1.baseColor = 0xff0000;
        
        this.tip2 = Mesh.createCube(1);
        this.tip2.position = normalized.mulScalar(10); // Scale up for visibility
        this.tip2.baseColor = 0x00ff00;
        
        this.renderer.render([this.tip1, this.tip2]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
