import Vector3 from "../js/Vector3.js";
import Collision from "./collision.js";

class PhysicsWorld {
    constructor(gravity = new Vector3(0, -9.8, 0)) {
        this.gravity = gravity;
        this.bodies = [];
    }

    addBody(body) {
        this.bodies.push(body);
        return body;
    }

    removeBody(body) {
        const index = this.bodies.indexOf(body);
        if (index > -1) {
            this.bodies.splice(index, 1);
        }
    }

    step(dt) {
        // 1. Applica gravità e aggiorna posizioni
        for (const body of this.bodies) {
            if (!body.isStatic && body.useGravity) {
                // F = m*a -> la forza peso è F = m * g
                body.applyForce(this.gravity.mulScalar(body.mass));
            }
            body.update(dt);
        }

        // 2. Rilevamento e risoluzione collisioni (Brute force O(N^2))
        for (let i = 0; i < this.bodies.length; i++) {
            for (let j = i + 1; j < this.bodies.length; j++) {
                const bodyA = this.bodies[i];
                const bodyB = this.bodies[j];
                
                // Se entrambi statici, ignora
                if (bodyA.isStatic && bodyB.isStatic) continue;

                // Al momento supportiamo collisioni sferiche come base
                let collisionData;
                if (bodyA.colliderType === 'sphere' && bodyB.colliderType === 'sphere') {
                    collisionData = Collision.checkSphereSphere(bodyA, bodyB);
                } else if (bodyA.colliderType === 'aabb' && bodyB.colliderType === 'aabb') {
                    collisionData = Collision.checkAABBAABB(bodyA, bodyB);
                } else if (bodyA.colliderType === 'sphere' && bodyB.colliderType === 'aabb') {
                    // Fallback approssimativo AABB vs Sphere limitandosi all'AABB per ora
                    collisionData = Collision.checkAABBAABB(bodyA, bodyB);
                } else {
                    collisionData = Collision.checkAABBAABB(bodyA, bodyB);
                }

                if (collisionData && collisionData.hit) {
                    Collision.resolveCollision(bodyA, bodyB, collisionData);
                }
            }
        }
    }
}

export default PhysicsWorld;
