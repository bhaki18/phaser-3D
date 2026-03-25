import Vector3 from "../js/Vector3.js";

class Collision {
    
    // Rileva collisione tra due RigidBody (Sfera-Sfera)
    static checkSphereSphere(bodyA, bodyB) {
        const sphereA = bodyA.mesh.getWorldBoundingSphere();
        const sphereB = bodyB.mesh.getWorldBoundingSphere();
        
        const dist = sphereA.center.distance(sphereB.center);
        const radiusSum = sphereA.radius + sphereB.radius;
        
        if (dist < radiusSum) {
            // Se la distanza è 0 (stesso centro), forza una normale arbitraria per evitare divisioni per zero
            const normal = dist === 0 
                ? new Vector3(0, 1, 0) 
                : sphereA.center.sub(sphereB.center).normalize();
            
            const penetration = radiusSum - dist;
            return {
                hit: true,
                normal: normal,  // Direzione da B ad A
                penetration: penetration
            };
        }
        return { hit: false };
    }

    // Rileva collisione tramite Axis-Aligned Bounding Box (Scatola di collisione non ruotata)
    static checkAABBAABB(bodyA, bodyB) {
        const boundsA = Collision.getAABBBounds(bodyA.mesh.getTransformedVertices());
        const boundsB = Collision.getAABBBounds(bodyB.mesh.getTransformedVertices());

        if (boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x &&
            boundsA.min.y <= boundsB.max.y && boundsA.max.y >= boundsB.min.y &&
            boundsA.min.z <= boundsB.max.z && boundsA.max.z >= boundsB.min.z) {
            
            // Determina la penetrazione lungo i 6 assi possibili
            const overlaps = [
                boundsA.max.x - boundsB.min.x,
                boundsB.max.x - boundsA.min.x,
                boundsA.max.y - boundsB.min.y,
                boundsB.max.y - boundsA.min.y,
                boundsA.max.z - boundsB.min.z,
                boundsB.max.z - boundsA.min.z
            ];

            const minOverlap = Math.min(...overlaps);

            let normal = new Vector3(0, 0, 0);
            if (minOverlap === overlaps[0]) normal = new Vector3(1, 0, 0);
            else if (minOverlap === overlaps[1]) normal = new Vector3(-1, 0, 0);
            else if (minOverlap === overlaps[2]) normal = new Vector3(0, 1, 0);
            else if (minOverlap === overlaps[3]) normal = new Vector3(0, -1, 0);
            else if (minOverlap === overlaps[4]) normal = new Vector3(0, 0, 1);
            else if (minOverlap === overlaps[5]) normal = new Vector3(0, 0, -1);

            return { hit: true, normal: normal, penetration: minOverlap };
        }
        return { hit: false };
    }

    static getAABBBounds(vertices) {
        let minX = Infinity, minY = Infinity, minZ = Infinity;
        let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

        for (let i = 0; i < vertices.length; i++) {
            const v = vertices[i];
            if (v.x < minX) minX = v.x;
            if (v.y < minY) minY = v.y;
            if (v.z < minZ) minZ = v.z;
            if (v.x > maxX) maxX = v.x;
            if (v.y > maxY) maxY = v.y;
            if (v.z > maxZ) maxZ = v.z;
        }
        return {
            min: new Vector3(minX, minY, minZ),
            max: new Vector3(maxX, maxY, maxZ)
        };
    }

    // Risolve la collisione modificando le velocità e separando gli oggetti
    static resolveCollision(bodyA, bodyB, collisionData) {
        if (bodyA.isStatic && bodyB.isStatic) return;

        const normal = collisionData.normal;
        
        // Calcola la velocità relativa
        const relativeVelocity = bodyA.velocity.sub(bodyB.velocity);
        const velAlongNormal = relativeVelocity.dot(normal);

        // Se si stanno allontanando, non fare nulla
        if (velAlongNormal > 0) return;

        // Calcola il coefficiente di restituzione (rimbalzo)
        const e = Math.min(bodyA.bounciness, bodyB.bounciness);

        // Calcola l'impulso scalare
        let j = -(1 + e) * velAlongNormal;
        j /= bodyA.invMass + bodyB.invMass;

        // Applica l'impulso lungo la normale
        const impulse = normal.mulScalar(j);
        
        if (!bodyA.isStatic) {
            bodyA.applyImpulse(impulse);
        }
        if (!bodyB.isStatic) {
            bodyB.applyImpulse(impulse.mulScalar(-1)); // -impulse
        }

        // Positional correction (Penetration Resolution) tramite Projection
        // Evita che gli oggetti compenetrino eccessivamente o affondino a causa della gravità continua
        const percent = 0.8; // Percentuale di penetrazione da compensare
        const slop = 0.01;   // Tolleranza per evitare jitter
        
        const correctionMagnitude = Math.max(collisionData.penetration - slop, 0.0) / (bodyA.invMass + bodyB.invMass) * percent;
        const correction = normal.mulScalar(correctionMagnitude);
        
        if (!bodyA.isStatic) {
            bodyA.mesh.position = bodyA.mesh.position.add(correction.mulScalar(bodyA.invMass));
        }
        if (!bodyB.isStatic) {
            bodyB.mesh.position = bodyB.mesh.position.sub(correction.mulScalar(bodyB.invMass));
        }
    }
}

export default Collision;
