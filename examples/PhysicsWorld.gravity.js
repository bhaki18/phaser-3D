class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'PhysicsWorld: Gravity & Bouncing\nRed box falls and bounces on a static floor.', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0, 15, -60);
        this.camera.rotation.x = -0.15; // Point camera slightly down
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        // --- PHYSICS SETUP ---
        this.world = new PhysicsWorld(new Vector3(0, -20.0, 0)); // Gravity

        // 1. Dynamic Box (Falling)
        this.boxMesh = Mesh.createBox(5, 5, 5);
        this.boxMesh.position = new Vector3(0, 30, 0);
        this.boxMesh.baseColor = 0xff0000;
        
        this.boxBody = new RigidBody(this.boxMesh, {
            mass: 5.0,
            bounciness: 0.7,
            colliderType: 'aabb'
        });
        this.world.addBody(this.boxBody);

        // 2. Static Floor
        this.floorMesh = Mesh.createBox(40, 2, 40);
        this.floorMesh.position = new Vector3(0, -10, 0);
        this.floorMesh.baseColor = 0x555555;
        
        this.floorBody = new RigidBody(this.floorMesh, {
            isStatic: true,
            bounciness: 0.5,
            colliderType: 'aabb'
        });
        this.world.addBody(this.floorBody);
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Physics Step (delta is in ms, convert to seconds)
        const dt = Math.min(delta / 1000, 0.1); 
        this.world.step(dt);
        
        // Render the meshes (Painters algorithm manually applied)
        this.renderer.render([this.floorMesh, this.boxMesh]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
