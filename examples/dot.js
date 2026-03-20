class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: Vector Dot Product\nAngle between vectors visualization', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-15);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        this.vFixed = new Vector3(10, 0, 0);
        this.vMoving = new Vector3(10, 0, 0);
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Rotate moving vector
        const angle = time / 1000;
        this.vMoving.x = Math.cos(angle) * 10;
        this.vMoving.y = Math.sin(angle) * 10;
        
        // Compute dot product (normalized)
        const dot = this.vFixed.normalize().dot(this.vMoving.normalize());
        
        // Projection
        const p0 = Math3D.project(Math3D.toCameraSpace(new Vector3(0,0,0), this.camera), this.camera, this.renderer.width, this.renderer.height);
        const p1 = Math3D.project(Math3D.toCameraSpace(this.vFixed, this.camera), this.camera, this.renderer.width, this.renderer.height);
        const p2 = Math3D.project(Math3D.toCameraSpace(this.vMoving, this.camera), this.camera, this.renderer.width, this.renderer.height);
        
        if (p0 && p1 && p2) {
            // Draw vectors
            this.renderer.ctx.strokeStyle = '#fff';
            this.renderer.ctx.beginPath(); this.renderer.ctx.moveTo(p0.x, p0.y); this.renderer.ctx.lineTo(p1.x, p1.y); this.renderer.ctx.stroke();
            this.renderer.ctx.strokeStyle = '#00ff88';
            this.renderer.ctx.beginPath(); this.renderer.ctx.moveTo(p0.x, p0.y); this.renderer.ctx.lineTo(p2.x, p2.y); this.renderer.ctx.stroke();
        }
        
        this.add.text(10, 60, `Dot Product: ${dot.toFixed(2)}\n(1 = Parallel, 0 = Orthogonal, -1 = Opposite)`, {fill:'#fff'}).setDepth(1);
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
