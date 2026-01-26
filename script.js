const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

// Set canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(58, 134, 255, ${Math.random() * 0.3 + 0.1})`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
function initParticles() {
    particles = [];
    for (let i = 0; i < 200; i++) {
        particles.push(new Particle());
    }
}

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let particle of particles) {
        particle.update();
        particle.draw();
    }
    
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
});

// Start
initParticles();
animateParticles();
function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        // Get the exact position of the about section
        const offsetTop = aboutSection.offsetTop;
        
        // Smooth scroll to that position
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}