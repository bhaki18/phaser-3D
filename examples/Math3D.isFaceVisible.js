class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Math3D.isFaceVisible()\nGreen: Visible Front-Face\nRed: Culled Back-Face', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-20);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        // Single quad face
        this.v0 = new Vector3(-5, -5, 0);
        this.v1 = new Vector3(5, -5, 0);
        this.v2 = new Vector3(5, 5, 0);
        
        this.info = this.add.text(10, 70, '', {fill:'#fff', font:'16px Courier'});
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Rotate the face
        const angle = time / 1000;
        const rv0 = this.v0.rotateXY(angle);
        const rv1 = this.v1.rotateXY(angle);
        const rv2 = this.v2.rotateXY(angle);
        
        // Culling check
        const isVisible = Math3D.isFaceVisible(rv0, rv1, rv2, this.camera);
        
        // Manual projection for debug display
        const p0 = Math3D.project(Math3D.toCameraSpace(rv0, this.camera), this.camera, 800, 600);
        const p1 = Math3D.project(Math3D.toCameraSpace(rv1, this.camera), this.camera, 800, 600);
        const p2 = Math3D.project(Math3D.toCameraSpace(rv2, this.camera), this.camera, 800, 600);
        
        if (p0 && p1 && p2) {
            this.renderer.drawTriangle(p0, p1, p2, isVisible ? 0x00ff00 : 0xff0000);
        }
        
        this.info.setText(`Face Visible: ${isVisible}`);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
