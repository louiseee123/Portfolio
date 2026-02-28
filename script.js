document.addEventListener('DOMContentLoaded', function() {
    const viewCertButtons = document.querySelectorAll('.view-cert-btn');
    const modal = document.getElementById('certificate-modal');
    const iframe = document.getElementById('certificate-iframe');
    const closeButton = document.querySelector('.close-button');

    viewCertButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pdfSrc = this.getAttribute('data-pdf-src');
            iframe.src = pdfSrc;
            modal.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        iframe.src = ''; 
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            iframe.src = '';
        }
    });
});
function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
}

