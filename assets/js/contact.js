// Copy to clipboard functionality
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(function() {
        // Add copied class
        element.classList.add('copied');
        
        // Change the email text temporarily
        const emailSpan = element.querySelector('.contact-email');
        const originalText = emailSpan.textContent;
        emailSpan.textContent = '✓ Copied to clipboard!';
        
        // Reset after 2 seconds
        setTimeout(function() {
            element.classList.remove('copied');
            emailSpan.textContent = originalText;
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy:', err);
    });
}
