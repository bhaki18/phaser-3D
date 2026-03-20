// Data Structure mapping categories to example files
const examplesData = {
    "Vector3 (Math)": [
        ".add(v).js", ".sub(v).js", ".mulScalar(s).js", ".dot(v).js", 
        ".cross(v).js", ".normalize().js", ".length().js", "Vector3(x, y, z).js"
    ],
    "Camera": [
        ".moveForward(amount).js", ".moveRight(amount).js"
    ],
    "Mesh (Geometry)": [
        ".rotateX(angle).js", ".rotateY(angle).js", ".rotateZ(angle).js", 
        ".getTransformedVertices().js", ".getWorldBoundingSphere().js", 
        ".getLODMeshForDistance(dist).js", ".setLODLevels(levels).js",
        "Mesh.createBox(w, h, d).js", "Mesh.createCube(size).js"
    ],
    "Renderer (Core)": [
        ".render(meshes).js", ".clearBuffers().js", ".drawTriangleZBuffer(p0, p1, p2, ...).js", 
        ".clipTriangleNear(c0, c1, c2, near, uvs).js", ".sampleTexture(texture, u, v).js", 
        ".resize(width, height).js", ".setRenderScale(scale).js", 
        ".autoAdjustScale(ms).js", ".getStats().js", ".worldToCameraInto(v, ..., out).js"
    ],
    "Math3D (Projection)": [
        "Math3D.computeNormal(v1, v2, v3).js", "Math3D.isFaceVisible(v1, v2, v3).js", 
        "Math3D.project(v, camera, w, h).js", "Math3D.triangulate(face).js"
    ]
};

const categoryToFile = {
    "Vector3 (Math)": "Vector3.js",
    "Camera": "Camera.js",
    "Mesh (Geometry)": "Mesh.js",
    "Renderer (Core)": "Render.js",
    "Math3D (Projection)": "Math3D.js"
};

const docsData = {
    "Vector3 (Math)": `
        <h1>Vector3</h1>
        <p>A mathematical class representing a 3D vector and point in space.</p>
        <h2>Constructor</h2>
        <code>new Vector3(x, y, z)</code>
        <p>Creates a new Vector3 instance.</p>
        <h2>Methods</h2>
        <ul>
            <li><code>.clone()</code> - Returns a new Vector3 with the same coordinates.</li>
            <li><code>.add(v)</code>, <code>.sub(v)</code> - Returns a new Vector3 adding/subtracting v.</li>
            <li><code>.mulScalar(s)</code>, <code>.divScalar(s)</code> - Returns a new Vector3 scaled by s.</li>
            <li><code>.dot(v)</code> - Returns the dot product (scalar) with v.</li>
            <li><code>.cross(v)</code> - Returns a new Vector3 representing the cross product with v.</li>
            <li><code>.length()</code> - Returns the magnitude of the vector.</li>
            <li><code>.normalize()</code> - Returns a new unit Vector3.</li>
            <li><code>.distance(v)</code> - Returns the distance to another Vector3.</li>
            <li><code>.rotateY(angle)</code>, <code>.rotateX(angle)</code>, <code>.rotateZ(angle)</code> - Returns a new Vector3 rotated around the respective axis.</li>
        </ul>
    `,
    "Camera": `
        <h1>Camera</h1>
        <p>A virtual camera used to view the 3D scene mathematically.</p>
        <h2>Constructor</h2>
        <code>new Camera()</code>
        <h2>Properties</h2>
        <ul>
            <li><code>.position</code> - A Vector3 representing the camera's location. default: (0,0,-10)</li>
            <li><code>.rotation</code> - A Vector3 representing Euler angles (pitch, yaw, roll). default: (0,0,0)</li>
            <li><code>.fov</code> - Field of View factor. default: 256</li>
        </ul>
        <p><em>Note: For movement, interact directly with the position and rotation vectors.</em></p>
    `,
    "Mesh (Geometry)": `
        <h1>Mesh</h1>
        <p>Represents a 3D object comprised of vertices and triangular faces.</p>
        <h2>Constructor</h2>
        <code>new Mesh(vertices, faces, uvs, faceUVs)</code>
        <h2>Static Methods</h2>
        <ul>
            <li><code>Mesh.createCube(size)</code> - Generates a cube mesh of given size.</li>
            <li><code>Mesh.createBox(w, h, d)</code> - Generates a box mesh.</li>
            <li><code>Mesh.createPyramid(size, height)</code> - Generates a pyramid mesh.</li>
        </ul>
        <h2>Properties</h2>
        <ul>
            <li><code>.position</code>, <code>.rotation</code>, <code>.scale</code> - Vector3 transformations applied to the mesh instance.</li>
            <li><code>.baseColor</code> - The hex color (e.g. 0xff0000) used if no texture is mapped.</li>
            <li><code>.texture</code> - A Phaser Texture object mapped to the UVs.</li>
            <li><code>.doubleSided</code> - Boolean, if true backface culling is disabled.</li>
        </ul>
        <h2>Methods</h2>
        <ul>
            <li><code>.getTransformedVertices()</code> - Applies transformations and returns an array of world-space Vector3 vertices.</li>
            <li><code>.getWorldBoundingSphere()</code> - Returns { center, radius } for efficient frustum culling.</li>
            <li><code>.setLODLevels(levels)</code> - Array of { distance, mesh } for Level of Detail swapping.</li>
        </ul>
    `,
    "Renderer (Core)": `
        <h1>Renderer</h1>
        <p>The core software rasterizer that projects 3D meshes onto a 2D Phaser CanvasTexture.</p>
        <h2>Constructor</h2>
        <code>new Renderer(scene, camera, options)</code>
        <p><code>options</code> include: <code>renderScale</code>, <code>targetFPS</code>, <code>triangleBudget</code>, <code>nearPlane</code>, etc.</p>
        <h2>Methods</h2>
        <ul>
            <li><code>.clearBuffers()</code> - Clears the Depth (Z-Buffer) and color buffer before rendering a new frame.</li>
            <li><code>.render(meshes)</code> - Projects, culls, clips, and draws the array of Mesh objects to the screen.</li>
            <li><code>.resize(width, height)</code> - Resizes the internal framebuffers and canvas payload.</li>
            <li><code>.setRenderScale(scale)</code> - Dynamic pixelation scale (e.g. 0.5 for half resolution rendering).</li>
            <li><code>.autoAdjustScale(frameMs)</code> - Called in the update loop to dynamically adjust scale and keep target FPS.</li>
            <li><code>.getStats()</code> - Returns performance metrics like triangles rasterized and culled.</li>
        </ul>
    `,
    "Math3D (Projection)": `
        <h1>Math3D</h1>
        <p>Static utility class for 3D mathematical projections and transformations.</p>
        <h2>Methods</h2>
        <ul>
            <li><code>Math3D.toCameraSpace(v, camera)</code> - Translates and rotates a world vector into the camera's local space.</li>
            <li><code>Math3D.project(v, camera, width, height)</code> - Projects a camera-space vector into 2D screen coordinates.</li>
            <li><code>Math3D.computeNormal(v1, v2, v3)</code> - Returns the normalized perpendicular Vector3 of a triangle face.</li>
            <li><code>Math3D.isFaceVisible(v1, v2, v3)</code> - Returns true if the triangle faces the camera (based on normal dot product).</li>
        </ul>
    `
};

let currentTabMode = 'docs';

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initSidebar();
    
    // UI Elements
    const copyBtn = document.getElementById('copy-btn');
    const iframe = document.getElementById('demo-iframe');
    const loader = document.getElementById('iframe-loader');
    
    const tabDocs = document.getElementById('tab-docs');
    const tabExamples = document.getElementById('tab-examples');

    tabDocs.addEventListener('click', () => {
        tabDocs.classList.add('active');
        tabExamples.classList.remove('active');
        currentTabMode = 'docs';
        initSidebar();
        
        document.getElementById('editor-view').classList.add('hidden');
        document.getElementById('docs-view').classList.add('hidden');
        document.getElementById('welcome-hero').classList.remove('hidden');
    });

    tabExamples.addEventListener('click', () => {
        tabExamples.classList.add('active');
        tabDocs.classList.remove('active');
        currentTabMode = 'examples';
        initSidebar();
        
        document.getElementById('editor-view').classList.add('hidden');
        document.getElementById('docs-view').classList.add('hidden');
        document.getElementById('welcome-hero').classList.remove('hidden');
        
        // Ensure sidebar stays visible for 3-column experience
        document.querySelector('.sidebar').classList.remove('hidden');
    });

    const topDemoBtn = document.querySelector('.nav-btn');
    if (topDemoBtn) {
        topDemoBtn.addEventListener('click', (e) => {
            // Let the target="_blank" handle it, or we could load it in app
            // For now, demo.html is the target in index.html
        });
    }

    const topApiLink = document.getElementById('top-api-link');
    if (topApiLink) {
        topApiLink.addEventListener('click', (e) => {
            e.preventDefault();
            tabDocs.click();
        });
    }

    // Copy to clipboard
    copyBtn.addEventListener('click', () => {
        const code = document.getElementById('code-output').innerText;
        navigator.clipboard.writeText(code).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27c93f" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg> Copied!`;
            setTimeout(() => { copyBtn.innerHTML = originalText; }, 2000);
        });
    });

    // Iframe load event to stop spinner
    iframe.addEventListener('load', () => {
        loader.classList.add('hidden');
    });
});

function initSidebar() {
    const sidebarNav = document.getElementById('sidebar-nav');
    sidebarNav.innerHTML = '';
    
    for (const [category, files] of Object.entries(examplesData)) {
        const group = document.createElement('div');
        group.className = 'cat-group';

        const title = document.createElement('div');
        title.className = 'cat-title';
        title.innerHTML = `<span>${category}</span> <span class="caret">▼</span>`;
        
        title.addEventListener('click', () => {
            if (currentTabMode === 'docs') {
                // In docs mode, clicking the category loads the documentation
                document.querySelectorAll('.cat-group .cat-title').forEach(el => el.style.color = '');
                title.style.color = 'var(--accent-primary)';
                loadDoc(category);
            } else {
                // In examples mode, clicking expands/collapses the list
                const list = group.querySelector('.cat-list');
                const isOpen = list.classList.contains('open');
                list.classList.toggle('open');
                title.querySelector('.caret').style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0deg)';
            }
        });

        const list = document.createElement('ul');
        list.className = currentTabMode === 'examples' ? 'cat-list open' : 'cat-list hidden';

        if (currentTabMode === 'examples') {
            files.forEach(file => {
                const li = document.createElement('li');
                li.textContent = file.replace('.js', '');
                li.addEventListener('click', (e) => {
                    e.stopPropagation(); // prevent title click if nested
                    loadExample(file, li);
                });
                list.appendChild(li);
            });
        }

        group.appendChild(title);
        group.appendChild(list);
        sidebarNav.appendChild(group);
    }
}

function loadDoc(category) {
    document.getElementById('welcome-hero').classList.add('hidden');
    document.getElementById('editor-view').classList.add('hidden');
    
    const docsView = document.getElementById('docs-view');
    docsView.classList.remove('hidden');
    
    docsView.classList.remove('fade-in');
    void docsView.offsetWidth; 
    docsView.classList.add('fade-in');

    const content = docsData[category] || "<h1>Not Found</h1>";
    const docsContainer = document.getElementById('docs-content');
    
    docsContainer.innerHTML = content + `
        <h2 style="margin-top: 48px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;">Engine Source Code</h2>
        <div id="api-source-loader" style="color: var(--accent-primary); font-size: 13px; margin-bottom: 16px;">Loading source file...</div>
        <pre><code id="api-source-code"></code></pre>
    `;

    const filename = categoryToFile[category];
    if (filename) {
        fetch('./phaser3D/js/' + filename)
            .then(res => res.text())
            .then(code => {
                document.getElementById('api-source-loader').classList.add('hidden');
                const codeEl = document.getElementById('api-source-code');
                codeEl.textContent = code;
                applySyntaxHighlighting(codeEl);
            })
            .catch(err => {
                document.getElementById('api-source-loader').textContent = "Failed to load source: " + err;
            });
    } else {
        document.getElementById('api-source-loader').classList.add('hidden');
    }
}

function loadExample(filename, liElement) {
    // Styling Active Selection
    document.querySelectorAll('.cat-list li').forEach(el => el.classList.remove('active'));
    liElement.classList.add('active');

    // Switch Views
    document.getElementById('welcome-hero').classList.add('hidden');
    document.getElementById('docs-view').classList.add('hidden');
    
    // Ensure 3-column layout
    const editorView = document.getElementById('editor-view');
    editorView.classList.remove('hidden');
    editorView.style.display = 'flex'; // Force flex row
    
    document.querySelector('.sidebar').style.display = 'flex';
    document.querySelector('.workspace').style.flex = '1';
    
    // Add small animation to re-trigger fade in
    editorView.classList.remove('fade-in');
    void editorView.offsetWidth; // trigger reflow
    editorView.classList.add('fade-in');

    document.getElementById('preview-title').textContent = filename;
    document.getElementById('iframe-loader').classList.remove('hidden');

    // Fetch Code & Inject
    fetch('./examples/' + filename)
        .then(res => res.text())
        .then(code => {
            const codeOutput = document.getElementById('code-output');
            codeOutput.textContent = code;
            applySyntaxHighlighting(codeOutput);

            // Load iframe
            document.getElementById('demo-iframe').src = `viewer.html?file=${encodeURIComponent(filename)}`;
        })
        .catch(err => {
            document.getElementById('code-output').textContent = "// System Error loading file.\n" + err;
            document.getElementById('iframe-loader').classList.add('hidden');
        });
}

// Advanced Regex-based Syntax Highlighting (No external libraries needed)
function applySyntaxHighlighting(el) {
    let str = el.textContent;
    
    // Preserve HTML entities
    str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const regexArray = [
        { r: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, c: 'tk-comment' }, // Comments
        { r: /(['"`])(?:(?!\1)[^\\]|\\.)*\1/g, c: 'tk-string' }, // Strings
        { r: /\b(class|const|let|var|new|super|extends|function|if|else|for|while|return|this|export|import|from|async|await)\b/g, c: 'tk-keyword' }, // Keywords
        { r: /\b([A-Z][a-zA-Z0-9_]*)\b/g, c: 'tk-class' }, // Classes (Capitalized words)
        { r: /\b([a-zA-Z_]\w*)(?=\s*\()/g, c: 'tk-func' }, // Functions
        { r: /\b(\d+(\.\d+)?)\b/g, c: 'tk-number' }, // Numbers
        { r: /([+\-*/=<>!&|?:]+)/g, c: 'tk-operator' } // Operators
    ];

    // We must process tokens without overlapping. For simplicity, we use a basic pipeline 
    // that might occasionally nest if regex hits inside a string, but it's okay for our scope.
    // A clean way is to replace with safe tokens, but simple regex pipeline is fine for quick docs.
    str = str.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(['"`][\s\S]*?['"`])/g, (match) => {
        if(match.startsWith('//') || match.startsWith('/*')) return `<span class="tk-comment">${match}</span>`;
        return `<span class="tk-string">${match}</span>`;
    });

    // Now apply other highlights to non-spanned text (naive approach but works for simple JS)
    // Actually, setting innerHTML properly:
    el.innerHTML = str
        .replace(/(<span class="tk-comment">.*?<\/span>|<span class="tk-string">.*?<\/span>)|(\b(class|const|let|var|new|super|extends|function|if|else|for|while|return|this|export|import|from|async|await)\b)/g, (match, p1, p2) => p1 || `<span class="tk-keyword">${p2}</span>`)
        .replace(/(<span .*?<\/span>)|(\b([A-Z][a-zA-Z0-9_]*)\b)/g, (match, p1, p2) => p1 || `<span class="tk-class">${p2}</span>`)
        .replace(/(<span .*?<\/span>)|(\b([a-zA-Z_]\w*)(?=\s*\())/g, (match, p1, p2) => p1 || `<span class="tk-func">${p2}</span>`)
        .replace(/(<span .*?<\/span>)|(\b(\d+(\.\d+)?)\b)/g, (match, p1, p2) => p1 || `<span class="tk-number">${p2}</span>`)
        .replace(/(<span .*?<\/span>)|([+\-*/=<>!&|?:]+)/g, (match, p1, p2) => p1 ? p1 : (p2 !== '/' ? `<span class="tk-operator">${p2}</span>` : p2));
}

// ----------------------------------------------------
// DYNAMIC PARTICLE BACKGROUND (Antigravity Style)
// ----------------------------------------------------
function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 - dist/1200})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}
