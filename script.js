// ============================================
// DARK MODE FUNCTIONALITY
// ============================================

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference or prefer-color-scheme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedDarkMode = localStorage.getItem('darkMode');

if (savedDarkMode !== null) {
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
    }
} else if (prefersDark) {
    body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    updateDarkModeIcon();
});

function updateDarkModeIcon() {
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Initialize icon on load
updateDarkModeIcon();

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// TYPING ANIMATION
// ============================================

const typingText = document.querySelector('.typing-text');
const phrases = [
    'Web Developer',
    'Frontend Developer',
    'Problem Solver',
    'Code Enthusiast'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 100;
    }

    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

// Start typing animation
type();

// ============================================
// SMOOTH SCROLL & NAVBAR ACTIVE STATE
// ============================================

const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous messages
    formMessage.classList.remove('show', 'success', 'error');
    clearErrors();

    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    let isValid = true;

    if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }

    if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email');
        isValid = false;
    }

    if (subject.length < 3) {
        showError('subjectError', 'Subject must be at least 3 characters');
        isValid = false;
    }

    if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }

    if (!isValid) return;

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Log form data (in production, send to backend)
        console.log('Form submitted:', { name, email, subject, message });
    } catch (error) {
        showFormMessage('Error sending message. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.add('show', type);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 5000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInUp 0.8s ease forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observe all testimonial cards
document.querySelectorAll('.testimonial-card').forEach(card => {
    observer.observe(card);
});

// ============================================
// PROGRESS BAR ANIMATION
// ============================================

const progressObserverOptions = {
    threshold: 0.5
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, progressObserverOptions);

const skillsContainer = document.querySelector('.skills-container');
if (skillsContainer) {
    progressObserver.observe(skillsContainer);
}

// ============================================
// PROJECT FILTER (OPTIONAL - COMMENTED OUT)
// ============================================

// Uncomment this section if you want to add project filtering

/*
const projectCategories = ['all', 'frontend', 'fullstack', 'tools'];

document.querySelectorAll('.project-card').forEach(card => {
    const category = card.dataset.category;
    card.dataset.category = category || 'frontend';
});

function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 50);
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}
*/

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Get current scroll position
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// ============================================
// CONSOLE GREETING
// ============================================

console.log('%c👋 Welcome to Abdullah Khan\'s Portfolio!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore the code and reach out for collaboration!', 'color: #a855f7; font-size: 14px;');

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images if supported
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Prevent flash of unstyled content
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});