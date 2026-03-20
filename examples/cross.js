class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: Vector Cross Product\nYellow vector = Normal to the plane of White and Green vectors', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-20);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        this.vA = new Vector3(8, 0, 0);
        this.vB = new Vector3(0, 8, 0);
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Tilt vB over time
        const angle = time / 1500;
        this.vB.x = Math.sin(angle) * 8;
        this.vB.z = Math.cos(angle) * 8;
        
        // Compute cross product
        const vCross = this.vA.cross(this.vB).normalize().mulScalar(10);
        
        // Projection
        const p0 = Math3D.project(Math3D.toCameraSpace(new Vector3(0,0,0), this.camera), this.camera, this.renderer.width, this.renderer.height);
        const pA = Math3D.project(Math3D.toCameraSpace(this.vA, this.camera), this.camera, this.renderer.width, this.renderer.height);
        const pB = Math3D.project(Math3D.toCameraSpace(this.vB, this.camera), this.camera, this.renderer.width, this.renderer.height);
        const pC = Math3D.project(Math3D.toCameraSpace(vCross, this.camera), this.camera, this.renderer.width, this.renderer.height);
        
        if (p0 && pA && pB && pC) {
            // Draw vectors
            this.renderer.ctx.lineWidth = 2;
            this.renderer.ctx.strokeStyle = '#fff';
            this.renderer.ctx.beginPath(); this.renderer.ctx.moveTo(p0.x, p0.y); this.renderer.ctx.lineTo(pA.x, pA.y); this.renderer.ctx.stroke();
            
            this.renderer.ctx.strokeStyle = '#00ff88';
            this.renderer.ctx.beginPath(); this.renderer.ctx.moveTo(p0.x, p0.y); this.renderer.ctx.lineTo(pB.x, pB.y); this.renderer.ctx.stroke();
            
            this.renderer.ctx.strokeStyle = '#ffff00';
            this.renderer.ctx.beginPath(); this.renderer.ctx.moveTo(p0.x, p0.y); this.renderer.ctx.lineTo(pC.x, pC.y); this.renderer.ctx.stroke();
        }
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
