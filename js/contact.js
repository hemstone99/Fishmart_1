     document.querySelector('.user-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelector('.user-dropdown').classList.toggle('show');
        });
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactSubmit();
    });
}
// Handle contact form submission
        function handleContactSubmit() {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || subject === '' || message === '') {
                showNotification('Please fill in all fields');
                return;
            }
            
            if (!email.includes('@')) {
                showNotification('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon.');
            
            // Clear form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
        }
        
        // Show notification
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }