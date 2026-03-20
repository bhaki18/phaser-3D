class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Engine Demo: Texture Sampling\nSampling a procedural checkboard pattern', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-15);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        
        // Create a dummy texture (canvas)
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0,0,32,32);
        ctx.fillStyle = '#f0f'; ctx.fillRect(0,0,16,16); ctx.fillRect(16,16,16,16);
        
        this.dummyTexture = {
            canvas: canvas,
            width: 32,
            height: 32,
            getPixel: (x, y) => {
                // Simplified pixel getter for demo
                return ( ( (x>>3) + (y>>3) ) % 2 === 0 ) ? 0xffffff : 0xff00ff;
            }
        };
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Render some sampled points on a grid
        for (let u = 0; u <= 1; u += 0.1) {
            for (let v = 0; v <= 1; v += 0.1) {
                const color = this.renderer.sampleTexture(this.dummyTexture, u, v);
                
                // Screen projection of the UV grid as a 3D plane
                const worldPos = new Vector3((u-0.5)*10, (v-0.5)*10, 0);
                const camSpace = Math3D.toCameraSpace(worldPos.rotateY(time/1000), this.camera);
                const p = Math3D.project(camSpace, this.camera, this.renderer.width, this.renderer.height);
                
                if (p) {
                    this.renderer.ctx.fillStyle = Phaser.Display.Color.IntegerToColor(color).rgba;
                    this.renderer.ctx.fillRect(p.x - 4, p.y - 4, 8, 8);
                }
            }
        }
        
        this.renderer.texture.refresh();
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
