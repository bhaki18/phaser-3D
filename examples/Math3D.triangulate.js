class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: Face Triangulation\nConverting Quad Face [0,1,2,3] into 2 Triangles', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-15);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        // Define a quad face manually
        this.face = [
            new Vector3(-5, -5, 0),
            new Vector3(5, -5, 0),
            new Vector3(5, 5, 0),
            new Vector3(-5, 5, 0)
        ];
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Rotate face vertices
        const angle = time / 1000;
        const rotatedFace = this.face.map(v => v.rotateY(angle).rotateX(angle * 0.5));
        
        // Triangulate
        const triangleIndices = Math3D.triangulate(rotatedFace);
        
        // Project and Render
        for (const tri of triangleIndices) {
            const v0 = rotatedFace[tri[0]];
            const v1 = rotatedFace[tri[1]];
            const v2 = rotatedFace[tri[2]];
            
            const c0 = Math3D.toCameraSpace(v0, this.camera);
            const c1 = Math3D.toCameraSpace(v1, this.camera);
            const c2 = Math3D.toCameraSpace(v2, this.camera);
            
            const p0 = Math3D.project(c0, this.camera, this.renderer.width, this.renderer.height);
            const p1 = Math3D.project(c1, this.camera, this.renderer.width, this.renderer.height);
            const p2 = Math3D.project(c2, this.camera, this.renderer.width, this.renderer.height);
            
            if (p0 && p1 && p2) {
                // Alternating colors per triangle
                const color = (tri[1] === 1) ? 0x0088FF : 0x00FFAA;
                this.renderer.drawTriangle(p0, p1, p2, color);
            }
        }
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
