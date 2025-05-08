// Initialize Three.js Scene
let scene, camera, renderer, particles;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        alpha: true
    });

    // Renderer setup
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 30;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#00ff88',
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation loop
    animate();
}

// Animation function
function animate() {
    requestAnimationFrame(animate);

    if (particles) {
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0001;
    }

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize only on home page
if (document.querySelector('#bg-canvas')) {
    init();
}

// Glitch effect for text
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchText.style.textShadow = `
                ${Math.random() * 10}px ${Math.random() * 10}px ${Math.random() * 30}px rgba(0, 255, 136, 0.8),
                ${Math.random() * -10}px ${Math.random() * -10}px ${Math.random() * 30}px rgba(255, 51, 102, 0.8)
            `;
            setTimeout(() => {
                glitchText.style.textShadow = '0 0 10px rgba(0, 255, 136, 0.3)';
            }, 50);
        }
    }, 50);
}

// Form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Save message to localStorage
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        messages.push({
            name,
            email,
            message,
            date: new Date().toISOString()
        });
        localStorage.setItem('messages', JSON.stringify(messages));

        alert('Message sent successfully!');
        contactForm.reset();
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Portfolio item hover effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});
