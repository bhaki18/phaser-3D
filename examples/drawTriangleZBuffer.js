class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Renderer.drawTriangleZBuffer()\nDirect low-level rasterization', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.renderer = new Render(this, this.camera, {renderScale:1});
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Define 3 points in screen space (mocking projection result)
        const p0 = { x: 400 + Math.sin(time/1000)*100, y: 100, z: 10 };
        const p1 = { x: 200, y: 400, z: 15 };
        const p2 = { x: 600, y: 500, z: 20 };
        
        // Draw directly to the surface
        this.renderer.drawTriangleZBuffer(p0, p1, p2, 0x00ffff);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
