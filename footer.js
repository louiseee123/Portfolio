// Footer JavaScript for interactive elements

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeFooter();
    initializeBackToTop();
    initializeNewsletterForm();
    initializeFooterAnimations();
    initializeStatsCounter();
});

// Initialize footer specific functions
function initializeFooter() {
    // Add current year to copyright
    updateCopyrightYear();
    
    // Smooth scroll for footer links
    setupFooterLinks();
}

// Update copyright year dynamically
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Back to Top Button functionality
function initializeBackToTop() {
    // Create back to top button if it doesn't exist
    if (!document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to Top');
        document.body.appendChild(backToTopBtn);
    }
    
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Newsletter form handling
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate form submission
                showNewsletterMessage('success', 'Thank you for subscribing!');
                emailInput.value = '';
            } else {
                showNewsletterMessage('error', 'Please enter a valid email address.');
            }
        });
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show newsletter subscription message
function showNewsletterMessage(type, message) {
    const newsletterForm = document.querySelector('.newsletter-form');
    let messageDiv = document.querySelector('.newsletter-message');
    
    // Remove existing message if any
    if (messageDiv) {
        messageDiv.remove();
    }
    
    // Create new message element
    messageDiv = document.createElement('div');
    messageDiv.className = `newsletter-message newsletter-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        margin-top: 10px;
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 0.85rem;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 
            'background: rgba(76, 175, 80, 0.1); color: #4CAF50; border: 1px solid rgba(76, 175, 80, 0.3);' : 
            'background: rgba(244, 67, 54, 0.1); color: #F44336; border: 1px solid rgba(244, 67, 54, 0.3);'
        }
    `;
    
    newsletterForm.parentNode.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Initialize footer animations
function initializeFooterAnimations() {
    // Add animation to footer sections on scroll
    const footerSections = document.querySelectorAll('.footer-grid > div');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    footerSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Animated stats counter
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const targetNumber = parseInt(entry.target.getAttribute('data-target') || entry.target.textContent.replace(/[^0-9]/g, ''));
                animateNumber(entry.target, targetNumber);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        // Store the target number
        const currentText = stat.textContent;
        const targetNum = parseInt(currentText.replace(/[^0-9]/g, ''));
        stat.setAttribute('data-target', targetNum);
        stat.textContent = '0';
        observer.observe(stat);
    });
}

// Animate number counting
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50; // Divide animation into 50 steps
    const duration = 1500; // 1.5 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, stepTime);
}

// Setup footer links for smooth scrolling
function setupFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    const button = e.target.closest('.newsletter-button, .footer-social-link, .back-to-top');
    
    if (button) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);