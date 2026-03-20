class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: 3D Projection\nConverting Vector3 to Screen X,Y', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-15);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        // Cube vertices
        this.vertices = [
            new Vector3(-5, -5, -5), new Vector3(5, -5, -5), 
            new Vector3(5, 5, -5), new Vector3(-5, 5, -5),
            new Vector3(-5, -5, 5), new Vector3(5, -5, 5), 
            new Vector3(5, 5, 5), new Vector3(-5, 5, 5)
        ];
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        const angle = time / 1000;
        const rotated = this.vertices.map(v => v.rotateY(angle).rotateX(angle * 0.5));
        
        for (const v of rotated) {
            const camSpace = Math3D.toCameraSpace(v, this.camera);
            const p = Math3D.project(camSpace, this.camera, this.renderer.width, this.renderer.height);
            
            if (p) {
                // Draw projection lines from center
                this.renderer.ctx.strokeStyle = 'rgba(255,255,255,0.2)';
                this.renderer.ctx.beginPath();
                this.renderer.ctx.moveTo(this.renderer.width / 2, this.renderer.height / 2);
                this.renderer.ctx.lineTo(p.x, p.y);
                this.renderer.ctx.stroke();

                // Draw point
                this.renderer.ctx.fillStyle = '#00f0ff';
                this.renderer.ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
            }
        }
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
