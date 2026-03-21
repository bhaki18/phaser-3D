class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Renderer.render(meshes)\nRendering a collection of 3D objects', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-50);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        this.meshes = [];
        for (let i = 0; i < 5; i++) {
            const mesh = Mesh.createCube(5);
            mesh.position = new Vector3((i - 2) * 12, 0, 0);
            mesh.baseColor = Phaser.Display.Color.RandomRGB().color;
            this.meshes.push(mesh);
        }
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        this.meshes.forEach((mesh, i) => {
            mesh.rotation.y += 0.01 + i * 0.005;
            mesh.rotation.x += 0.01;
        });
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
