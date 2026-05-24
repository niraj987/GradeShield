// Three.js Immersive 3D Full-Screen background Scene
// Features a dynamic drifting starfield, multi-layered geodesic orbital cores, and score-reactive shooting stars.

let scene, camera, renderer;
let centralCore, outerShell, starPoints, ringGroup;
let ring1, ring2, ring3;
let shootingStars = [];
const MAX_SHOOTING_STARS = 4;

let targetRotationX = 0;
let targetRotationY = 0;
let mouseX = 0;
let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Initialize the 3D Scene
function initThreeScene() {
  const container = document.getElementById('three-container');
  if (!container) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  // 1. Create Scene
  scene = new THREE.Scene();

  // 2. Create Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 11; // Frame the models perfectly in full-screen background

  // 3. Create WebGL Renderer with full transparency and anti-aliasing
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 4. Create Starfield Particle System
  const starCount = 900;
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 60;     // X
    starPositions[i + 1] = (Math.random() - 0.5) * 40; // Y
    starPositions[i + 2] = (Math.random() - 0.8) * 45; // Z (Pushed slightly into back depth)
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08,
    transparent: true,
    opacity: 0.35,
    sizeAttenuation: true
  });

  starPoints = new THREE.Points(starGeometry, starMaterial);
  scene.add(starPoints);

  // 5. Create Central Complex Geodesic Core
  const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x6366f1, // Default Indigo
    metalness: 0.95,
    roughness: 0.1,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });
  centralCore = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(centralCore);

  // Outer structural structural polyhedral wireframe shell
  const shellGeometry = new THREE.IcosahedronGeometry(2.3, 1);
  const shellMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.04
  });
  outerShell = new THREE.Mesh(shellGeometry, shellMaterial);
  scene.add(outerShell);

  // 6. Create Orbiting Atomic Rings Group
  ringGroup = new THREE.Group();
  scene.add(ringGroup);

  const ringMaterial1 = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.18, wireframe: true });
  const ringMaterial2 = new THREE.MeshBasicMaterial({ color: 0x14b8a6, transparent: true, opacity: 0.18, wireframe: true });
  const ringMaterial3 = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.15, wireframe: true });

  ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.015, 8, 100), ringMaterial1);
  ring1.rotation.x = Math.PI / 4;
  ringGroup.add(ring1);

  ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.015, 8, 100), ringMaterial2);
  ring2.rotation.y = Math.PI / 4;
  ringGroup.add(ring2);

  ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.015, 8, 100), ringMaterial3);
  ring3.rotation.x = -Math.PI / 3;
  ring3.rotation.y = Math.PI / 6;
  ringGroup.add(ring3);

  // 7. Initialize trailing shooting stars pool
  for (let i = 0; i < MAX_SHOOTING_STARS; i++) {
    const lineGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(6); // 2 vertices, 3 coordinates each
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.0,
      linewidth: 2
    });

    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    shootingStars.push({
      line: line,
      active: false,
      x: 0, y: 0, z: 0,
      vx: 0, vy: 0, vz: 0,
      length: 2,
      opacity: 0
    });
  }

  // 8. Add Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
  scene.add(ambientLight);

  pointLight1 = new THREE.PointLight(0x6366f1, 1.8, 60); // Primary Light
  pointLight1.position.set(6, 6, 6);
  scene.add(pointLight1);

  pointLight2 = new THREE.PointLight(0x14b8a6, 2.2, 60); // Secondary Light
  pointLight2.position.set(-6, -6, 6);
  scene.add(pointLight2);

  // 9. Attach Event Hooks
  document.addEventListener('mousemove', onDocumentMouseMove);
  window.addEventListener('resize', onWindowResize);

  // 10. Launch rendering loop
  animateThreeScene();
}

// Mouse movement listener
function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 100;
  mouseY = (event.clientY - windowHalfY) / 100;
}

// Handle window sizing triggers
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  windowHalfX = width / 2;
  windowHalfY = height / 2;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

// Recolor the stars, wireframes, and orbits dynamically based on CGPA score changes
function updateThreeEmblemColor(cgpa) {
  if (!centralCore || !pointLight1 || !pointLight2 || !ring1) return;

  let primaryColor, secondaryColor;

  if (cgpa >= 9.0) {
    primaryColor = 0xf59e0b; // Gold
    secondaryColor = 0xf97316; // Orange
  } else if (cgpa >= 8.0) {
    primaryColor = 0x8b5cf6; // Purple
    secondaryColor = 0xec4899; // Pink
  } else if (cgpa >= 7.0) {
    primaryColor = 0x06b6d4; // Cyan
    secondaryColor = 0x14b8a6; // Teal
  } else if (cgpa >= 5.5) {
    primaryColor = 0x6366f1; // Indigo
    secondaryColor = 0x06b6d4; // Cyan
  } else {
    primaryColor = 0xf43f5e; // Rose warning
    secondaryColor = 0xf59e0b; // Gold
  }

  // Smooth color transitions using GSAP
  gsap.to(centralCore.material.color, {
    r: ((primaryColor >> 16) & 255) / 255,
    g: ((primaryColor >> 8) & 255) / 255,
    b: (primaryColor & 255) / 255,
    duration: 1.5
  });

  // Orbital rings coloring shifts
  gsap.to(ring1.material.color, {
    r: ((primaryColor >> 16) & 255) / 255,
    g: ((primaryColor >> 8) & 255) / 255,
    b: (primaryColor & 255) / 255,
    duration: 1.5
  });
  gsap.to(ring2.material.color, {
    r: ((secondaryColor >> 16) & 255) / 255,
    g: ((secondaryColor >> 8) & 255) / 255,
    b: (secondaryColor & 255) / 255,
    duration: 1.5
  });

  // Color lights
  gsap.to(pointLight1.color, {
    r: ((primaryColor >> 16) & 255) / 255,
    g: ((primaryColor >> 8) & 255) / 255,
    b: (primaryColor & 255) / 255,
    duration: 1.5
  });
  gsap.to(pointLight2.color, {
    r: ((secondaryColor >> 16) & 255) / 255,
    g: ((secondaryColor >> 8) & 255) / 255,
    b: (secondaryColor & 255) / 255,
    duration: 1.5
  });

  // Shooting stars coloring shift (update active pool materials)
  shootingStars.forEach(star => {
    gsap.to(star.line.material.color, {
      r: ((secondaryColor >> 16) & 255) / 255,
      g: ((secondaryColor >> 8) & 255) / 255,
      b: (secondaryColor & 255) / 255,
      duration: 1.0
    });
  });
}

// Core animation loop
function animateThreeScene() {
  requestAnimationFrame(animateThreeScene);

  const time = Date.now() * 0.0006;

  // 1. Slow drift and passive rotations for starfields and cores
  if (starPoints) {
    starPoints.rotation.y += 0.00025;
    starPoints.rotation.x += 0.0001;
  }

  if (centralCore && outerShell) {
    // Elegant floating oscillation (hover effect)
    centralCore.position.y = Math.sin(time * 1.5) * 0.12;
    outerShell.position.y = Math.sin(time * 1.5) * 0.12;

    centralCore.rotation.y += 0.0035;
    centralCore.rotation.x += 0.0015;

    outerShell.rotation.y -= 0.002;
    outerShell.rotation.x -= 0.001;

    // Inertial camera/mouse look vector mapping
    targetRotationY = mouseX * 0.18;
    targetRotationX = mouseY * 0.18;

    centralCore.rotation.y += (targetRotationY - centralCore.rotation.y) * 0.06;
    centralCore.rotation.x += (targetRotationX - centralCore.rotation.x) * 0.06;
    outerShell.rotation.y += (targetRotationY - outerShell.rotation.y) * 0.06;
    outerShell.rotation.x += (targetRotationX - outerShell.rotation.x) * 0.06;
  }

  // 2. Animate Orbital atomic rings
  if (ringGroup && ring1 && ring2 && ring3) {
    ring1.rotation.z += 0.004;
    ring2.rotation.z -= 0.003;
    ring3.rotation.z += 0.002;
    ringGroup.rotation.y += 0.0015;
  }

  // 3. Animate dynamic trailing shooting stars
  shootingStars.forEach(star => {
    if (!star.active) {
      // Trigger a shooting star with a small probability
      if (Math.random() < 0.0025) {
        star.active = true;
        // Launch from top-left boundary
        star.x = -22 + Math.random() * 12;
        star.y = 12 + Math.random() * 5;
        star.z = -2 - Math.random() * 12; // Pushed deep to remain in background

        // Vector pointing down-right
        const angle = -Math.PI / 6 + (Math.random() - 0.5) * 0.08; // ~ -30 degrees
        const speed = 0.22 + Math.random() * 0.28;
        star.vx = Math.cos(angle) * speed;
        star.vy = Math.sin(angle) * speed;
        star.vz = 0;
        star.length = 2.5 + Math.random() * 2.0;
        star.opacity = 1.0;
      }
    } else {
      // Move shooting star along speed vectors
      star.x += star.vx;
      star.y += star.vy;
      star.z += star.vz;

      // Fading opacity trail
      star.opacity -= 0.016;
      if (star.opacity <= 0) star.opacity = 0;

      // Reset when faded out or off-screen bounds
      if (star.x > 22 || star.y < -12 || star.opacity <= 0) {
        star.active = false;
        star.line.material.opacity = 0;
      } else {
        // Redraw dynamic trailing vertices segment
        const positions = star.line.geometry.attributes.position.array;
        
        // Head
        positions[0] = star.x;
        positions[1] = star.y;
        positions[2] = star.z;

        // Tail
        const speedMag = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
        const dx = (star.vx / speedMag) * star.length;
        const dy = (star.vy / speedMag) * star.length;
        positions[3] = star.x - dx;
        positions[4] = star.y - dy;
        positions[5] = star.z;

        star.line.geometry.attributes.position.needsUpdate = true;
        star.line.material.opacity = star.opacity;
      }
    }
  });

  renderer.render(scene, camera);
}
