class Example extends Phaser.Scene {
    create() { 
        this.add.text(10, 10, 'RigidBody: Sphere vs Sphere Collision\nTwo spheres colliding mid-air.', {fill:'#0f0', font:'18px Courier', backgroundColor:'#000'});
        
        this.camera = new Camera(); 
        this.camera.position = new Vector3(0, 0, -60);
        this.renderer = new Render(this, this.camera, {renderScale:1.5});
        
        // --- PHYSICS SETUP ---
        this.world = new PhysicsWorld(new Vector3(0, 0, 0)); // No gravity for this demo

        // 1. Left Sphere (Moving right)
        // Note: Engine native createCube acts identically for AABB/Bounding Spheres
        this.sphereAMesh = Mesh.createCube(10);
        this.sphereAMesh.position = new Vector3(-25, 0, 0);
        this.sphereAMesh.baseColor = 0x00ff00;
        
        this.bodyA = new RigidBody(this.sphereAMesh, {
            mass: 2.0,
            bounciness: 1.0,  // Perfectly elastic
            colliderType: 'sphere'
        });
        // Initial velocity towards right
        this.bodyA.velocity = new Vector3(15, 0, 0);
        this.world.addBody(this.bodyA);

        // 2. Right Sphere (Moving left)
        this.sphereBMesh = Mesh.createCube(10);
        this.sphereBMesh.position = new Vector3(25, 5, 0); // Offset slightly
        this.sphereBMesh.baseColor = 0x0000ff;
        
        this.bodyB = new RigidBody(this.sphereBMesh, {
            mass: 5.0, // Heavier
            bounciness: 1.0,
            colliderType: 'sphere'
        });
        // Initial velocity towards left
        this.bodyB.velocity = new Vector3(-10, 0, 0);
        this.world.addBody(this.bodyB);
    }

    update(time, delta) {
        this.renderer.clearBuffers();
        
        // Physics Step (delta in seconds)
        const dt = Math.min(delta / 1000, 0.1); 
        this.world.step(dt);
        
        // Rotate meshes just for visual effect
        this.sphereAMesh.rotation.y += 0.02;
        this.sphereBMesh.rotation.y += 0.02;
        
        // Render
        this.renderer.render([this.sphereAMesh, this.sphereBMesh]);
    }
}
const game = new Phaser.Game({type: Phaser.AUTO, width: 800, height: 600, scene: Example});
