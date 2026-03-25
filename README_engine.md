# Phaser 3D Engine v1.1.0
*A lightweight, native 3D software rasterizer with Physics for Phaser 3.*

## How to use in your Phaser Game

1. Copy the `phaser3D` folder into your game's root directory.
2. In your game's main scene or entry script, import the modules you need:

```javascript
import Vector3 from './phaser3D/js/Vector3.js';
import Camera from './phaser3D/js/Camera.js';
import Mesh from './phaser3D/js/Mesh.js';
import Render from './phaser3D/js/Render.js';

// If you want physics:
import PhysicsWorld from './phaser3D/physics/PhysicsWorld.js';
import RigidBody from './phaser3D/physics/RigidBody.js';
```

3. Set up the camera and renderer in your Scene's `create()` method:
```javascript
this.camera = new Camera(); 
this.camera.position = new Vector3(0, 0, -40);

// renderScale adjust the resolution of the rasterizer. 1.0 = native, 0.5 = double speed / pixelated
this.renderer = new Render(this, this.camera, {renderScale: 1.0}); 

// Set up Physics
this.world = new PhysicsWorld(new Vector3(0, -9.8, 0));
```

4. Render the graphics in your Scene's `update(time, delta)` loop:
```javascript
this.renderer.clearBuffers();

// Step Physics (if applicable)
const dt = Math.min(delta / 1000, 0.1);
this.world.step(dt);

// Pass your meshes to the renderer
this.renderer.render([myAwesomeMesh, myFloorMesh]);
```

Enjoy blazing fast 3D graphics rendered natively in Phaser!
