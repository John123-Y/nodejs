<antArtifact identifier="js-file" type="application/vnd.ant.code" language="javascript" title="script.js" version_uuid="c3d4e5f6-7890-9012-cdef-3456789012cd"></antArtifact>
// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when skills section is visible
            if (entry.target.closest('#skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 200 + 500); // Stagger the animations
    });
}

// Cycling current skill
const skills = ['Node.js', 'React.js', 'Tailwind CSS', 'React Native', 'HTML', 'CSS'];
let currentSkillIndex = 0;

function updateCurrentSkill() {
    const currentSkillElement = document.getElementById('current-skill-text');
    if (currentSkillElement) {
        currentSkillElement.textContent = skills[currentSkillIndex];
        currentSkillIndex = (currentSkillIndex + 1) % skills.length;
    }
}

// Update current skill every 3 seconds
setInterval(updateCurrentSkill, 3000);

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// EmailJS Integration for Contact Form
(function () {
    // Initialize EmailJS with your Public Key
    emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // Replace with your EmailJS Public Key
})();

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Send form data via EmailJS
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(() => {
                    formMessage.textContent = 'Message sent successfully!';
                    formMessage.classList.add('show');
                    contactForm.reset();
                    setTimeout(() => {
                        formMessage.classList.remove('show');
                    }, 3000);
                }, (error) => {
                    formMessage.textContent = 'Failed to send message. Please try again.';
                    formMessage.style.color = '#ef4444';
                    formMessage.classList.add('show');
                    console.error('EmailJS error:', error);
                    setTimeout(() => {
                        formMessage.classList.remove('show');
                        formMessage.style.color = '#10b981';
                    }, 3000);
                });
        });
    }
});

</antArtifact>
