class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: World Bounding Sphere\nRed circle = Bounding sphere used for frustum culling', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-20);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        this.mesh = Mesh.createCube(8);
        this.mesh.position = new Vector3(0, 0, 0);
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Move and rotate mesh
        this.mesh.position.x = Math.sin(time/1000) * 10;
        this.mesh.rotation.y += 0.02;
        
        // Get bounding sphere
        const sphere = this.mesh.getWorldBoundingSphere();
        
        // Render mesh
        this.renderer.render([this.mesh]);
        
        // Project sphere center and radius
        const camCenter = Math3D.toCameraSpace(sphere.center, this.camera);
        const p = Math3D.project(camCenter, this.camera, this.renderer.width, this.renderer.height);
        
        if (p) {
            // Calculate screen radius (simplified)
            const screenRadius = (sphere.radius * this.camera.fov) / camCenter.z;
            
            this.renderer.ctx.strokeStyle = '#ff0000';
            this.renderer.ctx.lineWidth = 2;
            this.renderer.ctx.beginPath();
            this.renderer.ctx.arc(p.x, p.y, screenRadius, 0, Math.PI * 2);
            this.renderer.ctx.stroke();
        }
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
