class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: World to Camera In-Place Transformation', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-20);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        this.worldPos = new Vector3(5, 5, 5);
        this.targetVec = new Vector3(); // Vector to be reused
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Rotate world position around center
        this.worldPos.x = Math.cos(time / 1000) * 10;
        this.worldPos.z = Math.sin(time / 1000) * 10;
        
        // Transform into targetVec in-place
        this.renderer.worldToCameraInto(this.worldPos, this.targetVec);
        
        // Project the target vector
        const p = Math3D.project(this.targetVec, this.camera, this.renderer.width, this.renderer.height);
        
        if (p) {
            // Draw a small square at the vertex
            this.renderer.ctx.fillStyle = '#ff00ff';
            this.renderer.ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
            
            this.add.text(10, 50, `Camera Space Z: ${this.targetVec.z.toFixed(2)}`, {fill:'#fff'}).setDepth(1);
        }
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
