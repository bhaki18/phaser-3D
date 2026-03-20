/**
 * Example of using Math3D.isFaceVisible(v1, v2, v3) in Phaser 3D
 */
class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.add.text(10, 10, 'Math3D .isFaceVisible(v1, v2, v3) Example', { fill: '#0f0', font: '16px Courier' });

        // Triangle in camera space
        // Front-facing (counter-clockwise)
        const frontV1 = new Vector3(0, 10, 5);
        const frontV2 = new Vector3(-10, -10, 5);
        const frontV3 = new Vector3(10, -10, 5);
        
        // Back-facing (clockwise)
        const backV1 = new Vector3(0, 10, 5);
        const backV2 = new Vector3(10, -10, 5);
        const backV3 = new Vector3(-10, -10, 5);

        // Check visibility using backface culling logic
        // Uses dot product of normal and viewing vector
        const isFrontVisible = Math3D.isFaceVisible(frontV1, frontV2, frontV3);
        const isBackVisible = Math3D.isFaceVisible(backV1, backV2, backV3);

        this.add.text(10, 40, `Testing Backface Culling...`, { fill: '#fff' });

        this.add.text(10, 70, `Front-facing triangle visible? ${isFrontVisible}`, { fill: '#ff0' });
        this.add.text(10, 90, `Back-facing triangle visible? ${isBackVisible}`, { fill: '#ff0' });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
