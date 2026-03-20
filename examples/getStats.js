class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: Renderer Statistics\nReal-time triangle counts and culling data', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-20);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        // Spawn many cubes to see culling in action
        this.meshes = [];
        for (let i = 0; i < 20; i++) {
            const m = Mesh.createCube(4);
            m.position = new Vector3((Math.random()-0.5)*40, (Math.random()-0.5)*40, (Math.random()-0.5)*40);
            m.baseColor = Math.random() * 0xffffff;
            this.meshes.push(m);
        }
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Rotate camera around the scene
        this.camera.rotation.y += 0.01;
        
        this.renderer.render(this.meshes);
        
        const stats = this.renderer.getStats();
        this.add.text(10, 60, `Triangles Rendered: ${stats.triangles}\nFaces Culled: ${stats.culled}`, {fill:'#fff', fontSize:'16px'}).setDepth(1);
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
