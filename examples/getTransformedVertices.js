class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: Transformed Vertices\nBlue dots = World-space vertex positions after rotation/scale', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-15);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        this.mesh = Mesh.createCube(6);
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        this.mesh.rotation.y += 0.02;
        this.mesh.rotation.z += 0.01;
        
        // Get vertices already transformed to world space
        const worldVertices = this.mesh.getTransformedVertices();
        
        // Render the mesh normally
        this.renderer.render([this.mesh]);
        
        // Draw debug dots for each transformed vertex
        for (const v of worldVertices) {
            const camSpace = Math3D.toCameraSpace(v, this.camera);
            const p = Math3D.project(camSpace, this.camera, this.renderer.width, this.renderer.height);
            
            if (p) {
                this.renderer.ctx.fillStyle = '#00ffff';
                this.renderer.ctx.beginPath();
                this.renderer.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                this.renderer.ctx.fill();
            }
        }
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
