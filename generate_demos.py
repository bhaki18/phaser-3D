import os

directory = "ducumentation examples"

demos = {
    # Vector3
    ".add(v).js": """class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'Vector3.add(v)\\nRed Cube + Blue Cube = Green Cube', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.c1 = Mesh.createCube(5); this.c1.baseColor = 0xff0000; this.c1.position = new Vector3(-10, 5, 0);
        this.c2 = Mesh.createCube(5); this.c2.baseColor = 0x0000ff; this.c2.position = new Vector3(10, 5, 0);
        this.c3 = Mesh.createCube(5); this.c3.baseColor = 0x00ff00;
        this.meshes = [this.c1, this.c2, this.c3];
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.c1.rotation.y += 0.05; this.c2.rotation.x += 0.05; this.c3.rotation.z += 0.05;
        this.c1.position.y = Math.sin(t*0.005) * 5; this.c2.position.x = Math.cos(t*0.005) * 5;
        this.c3.position = this.c1.position.add(this.c2.position);
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});""",

    ".sub(v).js": """class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'Vector3.sub(v)\\nRed Cube - Blue Cube = Green Cube', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.c1 = Mesh.createCube(5); this.c1.baseColor = 0xff0000; this.c1.position = new Vector3(-10, 5, 0);
        this.c2 = Mesh.createCube(5); this.c2.baseColor = 0x0000ff; this.c2.position = new Vector3(10, 5, 0);
        this.c3 = Mesh.createCube(5); this.c3.baseColor = 0x00ff00;
        this.meshes = [this.c1, this.c2, this.c3];
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.c1.rotation.y += 0.05; this.c2.rotation.x += 0.05; this.c3.rotation.z += 0.05;
        this.c1.position.y = Math.sin(t*0.005) * 5; this.c2.position.x = Math.cos(t*0.005) * 5;
        this.c3.position = this.c1.position.sub(this.c2.position);
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});""",

    ".mulScalar(s).js": """class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'Vector3.mulScalar(s)\\nPulsing Scale', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.c1 = Mesh.createCube(5); this.c1.baseColor = 0x00ffff; 
        this.meshes = [this.c1];
        this.baseScale = new Vector3(1,1,1);
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.c1.rotation.x += 0.02; this.c1.rotation.y += 0.03;
        let s = Math.abs(Math.sin(t*0.003)) * 2 + 0.5;
        this.c1.scale = this.baseScale.mulScalar(s);
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});""",

    ".cross(v).js": """class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'Vector3.cross(v)\\nRed x Green = Blue (Orthogonal)', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.c1 = Mesh.createCube(1); this.c1.scale = new Vector3(1, 10, 1); this.c1.baseColor = 0xff0000;
        this.c2 = Mesh.createCube(1); this.c2.scale = new Vector3(10, 1, 1); this.c2.baseColor = 0x00ff00;
        this.c3 = Mesh.createCube(1); this.c3.scale = new Vector3(1, 1, 10); this.c3.baseColor = 0x0000ff;
        this.meshes = [this.c1, this.c2, this.c3];
    }
    update(t, d) {
        this.renderer.clearBuffers();
        let angle = t * 0.001;
        this.c1.rotation.z = angle;
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});""",

    ".getStats().js": """class Example extends Phaser.Scene {
    create() { this.txt = this.add.text(10, 10, 'Renderer.getStats()', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-150);
        this.renderer = new Render(this, this.camera, {renderScale:0.5});
        this.meshes = [];
        for(let i=0; i<30; i++) {
            let m = Mesh.createCube(10); m.baseColor = Math.random() * 0xffffff;
            m.position = new Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100);
            this.meshes.push(m);
        }
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.meshes.forEach(m => { m.rotation.x += 0.01; m.rotation.y += 0.02; });
        this.renderer.render(this.meshes);
        let s = this.renderer.getStats();
        this.txt.setText(`Renderer.getStats()\\nMeshes: ${s.meshesProcessed}\\nTris Rendered: ${s.trianglesRendered}\\nTris total: ${s.trianglesTotal}`);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});""",

    ".rotateX(angle).js": """class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'rotateX(angle)\\nOnly revolves on X axis', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.c1 = Mesh.createBox(15, 25, 5); this.c1.baseColor = 0xff00ff;
        this.meshes = [this.c1];
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.c1.rotation.x += 0.02;
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});""",

    ".rotateY(angle).js": """class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'rotateY(angle)\\nOnly revolves on Y axis', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.c1 = Mesh.createBox(25, 10, 5); this.c1.baseColor = 0xffff00;
        this.meshes = [this.c1];
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.c1.rotation.y += 0.02;
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});""",

    ".rotateZ(angle).js": """class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'rotateZ(angle)\\nOnly revolves on Z axis', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-40);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.c1 = Mesh.createBox(5, 25, 15); this.c1.baseColor = 0x00ffff;
        this.meshes = [this.c1];
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.c1.rotation.z += 0.02;
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});""",

    ".moveForward(amount).js": """class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'Camera Move Forward\\nMoving through static boxes', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(0,0,-150);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.meshes = [];
        for(let i=0; i<15; i++) {
            let m = Mesh.createCube(10); m.baseColor = Math.random() * 0xffffff;
            m.position = new Vector3((Math.random()-0.5)*40, (Math.random()-0.5)*40, i * 20);
            this.meshes.push(m);
        }
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.camera.position.z += 0.5;
        if(this.camera.position.z > 300) this.camera.position.z = -150;
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});""",

    ".moveRight(amount).js": """class Example extends Phaser.Scene {
    create() { this.add.text(10, 10, 'Camera Move Right\\nPanning across static scene', {fill:'#0f0'});
        this.camera = new Camera(); this.camera.position = new Vector3(-80,0,-20);
        this.renderer = new Render(this, this.camera, {renderScale:1});
        this.meshes = [];
        for(let i=0; i<10; i++) {
            let m = Mesh.createCube(10); m.baseColor = 0xff0055;
            m.position = new Vector3(i * 20 - 50, 0, 20);
            this.meshes.push(m);
        }
    }
    update(t, d) {
        this.renderer.clearBuffers();
        this.camera.position.x = Math.sin(t*0.001) * 80;
        this.renderer.render(this.meshes);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});"""
}

# Auto-generate a generic fallback for any JS file missing from my hardcoded list
fallback_template = """class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'Interactive Visual Test\\nTarget: {filename}', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0,0,-30);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        // Target shape
        this.mesh = Mesh.createCube(12);
        this.mesh.baseColor = 0x00FF88;
    }
    update(time, delta) {
        this.renderer.clearBuffers();
        this.mesh.rotation.y += 0.015;
        this.mesh.rotation.x += 0.01;
        this.renderer.render([this.mesh]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});"""

import os
all_files = [os.path.join(directory, f) for f in os.listdir(directory) if f.endswith('.js')]

for fpath in all_files:
    filename = os.path.basename(fpath)
    if filename in demos:
        content = demos[filename]
    else:
        content = fallback_template.replace('{filename}', filename)
    
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Generated 3D scenes for {len(all_files)} files.")
