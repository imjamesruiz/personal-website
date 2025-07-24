// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

// Terminal animation
const terminalText = document.querySelector('.terminal-text');
const commands = [
    'npm start',
    'git commit -m "Initial commit"',
    'code .',
    'npm run dev'
];
let currentCommand = 0;

function typeCommand() {
    const command = commands[currentCommand];
    let i = 0;
    
    terminalText.textContent = '';
    
    function type() {
        if (i < command.length) {
            terminalText.textContent += command.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            setTimeout(eraseCommand, 2000);
        }
    }
    
    type();
}

function eraseCommand() {
    let text = terminalText.textContent;
    
    function erase() {
        if (text.length > 0) {
            text = text.slice(0, -1);
            terminalText.textContent = text;
            setTimeout(erase, 50);
        } else {
            currentCommand = (currentCommand + 1) % commands.length;
            setTimeout(typeCommand, 500);
        }
    }
    
    erase();
}

// Start terminal animation
setTimeout(typeCommand, 1000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent!';
    submitBtn.style.backgroundColor = 'var(--accent-secondary)';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = 'var(--accent-primary)';
    }, 3000);
});

// Add scroll reveal animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Add visible class to sections when they come into view
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('transitionend', () => {
            if (section.classList.contains('visible')) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
}); 