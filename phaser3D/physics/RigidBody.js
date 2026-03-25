import Vector3 from "../js/Vector3.js";

class RigidBody {
    constructor(mesh, options = {}) {
        this.mesh = mesh; // The 3D Mesh this body is attached to
        this.mass = options.mass !== undefined ? options.mass : 1.0;
        this.invMass = this.mass > 0 ? 1.0 / this.mass : 0;
        this.isStatic = this.mass === 0 || options.isStatic;
        
        this.velocity = new Vector3(0, 0, 0);
        this.acceleration = new Vector3(0, 0, 0);
        this.force = new Vector3(0, 0, 0);
        
        this.bounciness = options.bounciness !== undefined ? options.bounciness : 0.5;
        this.friction = options.friction !== undefined ? options.friction : 0.2;
        this.useGravity = options.useGravity !== undefined ? options.useGravity : true;
        
        // colliderType: 'sphere' or 'aabb'
        this.colliderType = options.colliderType || 'sphere';
    }

    applyForce(force) {
        if (!this.isStatic) {
            this.force = this.force.add(force);
        }
    }

    applyImpulse(impulse) {
        if (!this.isStatic) {
            this.velocity = this.velocity.add(impulse.mulScalar(this.invMass));
        }
    }

    update(dt) {
        if (this.isStatic) return;

        // a = F / m
        this.acceleration = this.force.mulScalar(this.invMass);
        
        // v = v + a * dt
        this.velocity = this.velocity.add(this.acceleration.mulScalar(dt));
        
        // p = p + v * dt
        this.mesh.position = this.mesh.position.add(this.velocity.mulScalar(dt));
        
        // Reset forces for next frame
        this.force = new Vector3(0, 0, 0);
    }
}

export default RigidBody;
