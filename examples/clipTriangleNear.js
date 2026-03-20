class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: Near Plane Clipping\nWatch the triangle disappear as it crosses Z=0.1', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-10);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        // Custom vertices for clipping test
        this.v1 = new Vector3(-5, -5, 5);
        this.v2 = new Vector3(5, -5, 5);
        this.v3 = new Vector3(0, 5, -5); // This one will cross the near plane
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Move v3 back and forth across the clipping plane
        this.v3.z = Math.sin(time / 1000) * 10;
        
        // Transform to camera space
        const c1 = Math3D.toCameraSpace(this.v1, this.camera);
        const c2 = Math3D.toCameraSpace(this.v2, this.camera);
        const c3 = Math3D.toCameraSpace(this.v3, this.camera);

        // Call the clipping method
        const clipped = Math3D.clipTriangleNear(c1, c2, c3, 0.1);

        // Render clipped results
        for (const tri of clipped) {
            const p1 = Math3D.project(tri[0], this.camera, this.renderer.width, this.renderer.height);
            const p2 = Math3D.project(tri[1], this.camera, this.renderer.width, this.renderer.height);
            const p3 = Math3D.project(tri[2], this.camera, this.renderer.width, this.renderer.height);
            
            if (p1 && p2 && p3) {
                this.renderer.drawTriangle(p1, p2, p3, 0x00FF88);
            }
        }
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
