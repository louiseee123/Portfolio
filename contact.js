// Contact Form Handling
// Contact Form Handling - IMPROVED VERSION
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Hide any previous status
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';
            
            // Collect form data
            const formData = new FormData(this);
            
            try {
                // Using fetch with proper error handling
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                // Check if response is OK
                if (response.ok) {
                    const data = await response.json();
                    
                    // Success message
                    formStatus.className = 'form-status success';
                    formStatus.textContent = '✓ Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
                    formStatus.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Auto hide success message after 8 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 8000);
                } else {
                    // Handle HTTP errors
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show more helpful error message
                formStatus.className = 'form-status error';
                formStatus.innerHTML = `
                    <strong>⚠️ Unable to send message</strong><br>
                    Please try one of these alternatives:<br>
                    • Email me directly at <a href="mailto:johnlouisebergs123@gmail.com" style="color: #7aa2f7;">johnlouisebergs123@gmail.com</a><br>
                    • Try again in a few moments<br>
                    • Check your internet connection
                `;
                formStatus.style.display = 'block';
            } finally {
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
// 3D Tilt Effect for Contact Cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});