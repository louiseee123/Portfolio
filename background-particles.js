
class BackgroundParticle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update(canvas) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the edges
        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function initBackgroundParticles(canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    function createParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 12000;
        for (let i = 5; i < numberOfParticles; i++) {
            let size = (Math.random() * 2.5) + 0.5;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let speedX = (Math.random() * 0.4) - 0.2;
            let speedY = (Math.random() * 0.4) - 0.2;
            particlesArray.push(new BackgroundParticle(x, y, size, speedX, speedY));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update(canvas);
            particlesArray[i].draw(ctx);
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    resizeCanvas();
    createParticles();
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    const bgCanvas = document.getElementById('background-particles-canvas');
    if (bgCanvas) {
        initBackgroundParticles(bgCanvas);
    }
});
