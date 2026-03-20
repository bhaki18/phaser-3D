class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: Face Normal Computation\nRed line = Computed Normal Vector', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-15);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        // A single triangle face
        this.v1 = new Vector3(-5, -5, 0);
        this.v2 = new Vector3(5, -5, 0);
        this.v3 = new Vector3(0, 5, 0);
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        const angle = time / 1000;
        const rv1 = this.v1.rotateY(angle).rotateX(angle * 0.3);
        const rv2 = this.v2.rotateY(angle).rotateX(angle * 0.3);
        const rv3 = this.v3.rotateY(angle).rotateX(angle * 0.3);
        
        // Compute normal
        const normal = Math3D.computeNormal(rv1, rv2, rv3);
        const centroid = Math3D.centroid([rv1, rv2, rv3]);
        
        // Projection
        const cv1 = Math3D.toCameraSpace(rv1, this.camera);
        const cv2 = Math3D.toCameraSpace(rv2, this.camera);
        const cv3 = Math3D.toCameraSpace(rv3, this.camera);
        const cn  = Math3D.toCameraSpace(centroid.add(normal.mulScalar(5)), this.camera);
        const cc  = Math3D.toCameraSpace(centroid, this.camera);

        const p1 = Math3D.project(cv1, this.camera, this.renderer.width, this.renderer.height);
        const p2 = Math3D.project(cv2, this.camera, this.renderer.width, this.renderer.height);
        const p3 = Math3D.project(cv3, this.camera, this.renderer.width, this.renderer.height);
        const pn = Math3D.project(cn, this.camera, this.renderer.width, this.renderer.height);
        const pc = Math3D.project(cc, this.camera, this.renderer.width, this.renderer.height);
        
        if (p1 && p2 && p3 && pn && pc) {
            this.renderer.drawTriangle(p1, p2, p3, 0x0088FF);
            
            // Draw Normal Line
            this.renderer.ctx.strokeStyle = '#ff0000';
            this.renderer.ctx.lineWidth = 3;
            this.renderer.ctx.beginPath();
            this.renderer.ctx.moveTo(pc.x, pc.y);
            this.renderer.ctx.lineTo(pn.x, pn.y);
            this.renderer.ctx.stroke();
        }
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
