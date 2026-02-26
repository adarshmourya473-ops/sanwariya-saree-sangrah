// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// CONTACT FORM VALIDATION AND SUBMISSION
// ==========================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Clear previous errors
    clearErrors();

    // Validate form
    let isValid = true;

    if (name === '') {
        showError('nameError', 'Name is required');
        isValid = false;
    }

    if (phone === '') {
        showError('phoneError', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    if (email !== '' && !isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    if (message === '') {
        showError('messageError', 'Message is required');
        isValid = false;
    }

    // If valid, show success message
    if (isValid) {
        // In a real application, you would send this data to a server
        formMessage.textContent = '✓ Thank you for your message! We will contact you soon.';
        formMessage.className = 'form-message success';

        // Reset form
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 5000);

        // Log form data (for demonstration)
        console.log({
            name,
            phone,
            email,
            message,
            timestamp: new Date().toISOString()
        });
    }
});

// Helper function to show errors
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Helper function to clear errors
function clearErrors() {
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });
    formMessage.textContent = '';
    formMessage.className = '';
}

// Validate phone number (basic validation)
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    // Remove any non-digit characters and check if 10 digits
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// LAZY LOADING IMAGES
// ==========================================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// ANIMATION ON SCROLL
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.collection-card, .feature-card, .review-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ==========================================
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SEARCH ENGINE OPTIMIZATION
// ==========================================
// The page includes meta tags for SEO optimization
// Keywords: Best Saree Shop in Shivpuri, Blouse Shop in Shivpuri, Matching Blouse Near Me

// ==========================================
// DYNAMIC PHONE NUMBER (UPDATE AS NEEDED)
// ==========================================
const phoneNumber = '+919630600986';
const whatsappNumber = '+919630600986';

// Update all phone links
document.querySelectorAll('a[href*="tel:"]').forEach(link => {
    link.href = `tel:${phoneNumber}`;
});

document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.href = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;
});

// ==========================================
// DYNAMIC CONTENT LOADER (FOR FUTURE ADMIN PANEL)
// ==========================================
class ContentManager {
    constructor() {
        this.collections = [];
        this.reviews = [];
    }

    addCollection(name, description, icon) {
        this.collections.push({ name, description, icon });
    }

    addReview(rating, text, author) {
        this.reviews.push({ rating, text, author });
    }

    renderCollections() {
        // This can be used to dynamically load collections from a server
        console.log('Collections:', this.collections);
    }
}

const contentManager = new ContentManager();

// ==========================================
// CONSOLE LOGGING FOR DEBUGGING
// ==========================================
console.log('Sanwariya Saree Sangrah Website Loaded Successfully');
console.log('Version: 1.0');
console.log('Contact: +919630600986');
