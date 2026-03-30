document.addEventListener('DOMContentLoaded', function() {
    // AR functionality for model-viewer
    const modelViewer = document.querySelector('model-viewer');
    const arButton = document.getElementById('ar-button');
    
    if (modelViewer && arButton) {
        modelViewer.addEventListener('ar-status', (event) => {
            arButton.style.display = event.detail.status === 'session-started' || event.detail.status === 'session-starting' ? 'none' : 'flex';
        });
        
        // Check AR support and show button if supported
        if (modelViewer.canActivateAR) {
            arButton.classList.add('ar-supported');
            arButton.style.display = 'flex';
            arButton.addEventListener('click', () => {
                modelViewer.activateAR();
            });
        } else {
            arButton.style.display = 'none';
        }
    }
    
    const viewCertButtons = document.querySelectorAll('.view-cert-btn');
    const modal = document.getElementById('certificate-modal');
    const iframe = document.getElementById('certificate-iframe');
    const closeButton = document.querySelector('.close-button');

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

viewCertButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const certSrc = this.getAttribute('data-pdf-src');
            const embed = document.getElementById('certificate-embed');
            
            // Check if it's a PDF or image and set appropriate type
            if (certSrc.toLowerCase().endsWith('.png') || certSrc.toLowerCase().endsWith('.jpg') || certSrc.toLowerCase().endsWith('.jpeg')) {
                embed.setAttribute('type', 'image/' + certSrc.split('.').pop());
                embed.src = certSrc;
            } else {
                embed.setAttribute('type', 'application/pdf');
                // Only encode spaces, not the entire URL
                const encodedSrc = certSrc.replace(/ /g, '%20');
                // Add #toolbar=0 to hide the PDF viewer's toolbar
                embed.src = encodedSrc + '#toolbar=0&navpanes=0&scrollbar=0';
            }
            
            modal.style.display = 'block';
        });
    });

closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.getElementById('certificate-embed').src = ''; 
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.getElementById('certificate-embed').src = '';
        }
    });
});

function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
}

function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close menu when clicking on a nav link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('nav ul');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
