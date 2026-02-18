/**
 * VisionUI Website - Modern JavaScript
 * Interactive features and animations for the 2025 VisionUI Framework website
 */

// ==================================================
// DOM CONTENT LOADED
// ==================================================

document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    // Initialize all modules
    initExternalLinks();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initFormHandling();
    initMockupInteractions();
    initParticleSystem();
    initPerformanceOptimizations();

    // Log initialization
    console.log('🚀 VisionUI Website initialized successfully');
}

// ==================================================
// EXTERNAL LINKS (CONFIG)
// ==================================================

function initExternalLinks() {
    const links = (typeof window !== 'undefined' && window.VISIONUI_LINKS) ? window.VISIONUI_LINKS : {};

    const linkMap = {
        demoDownload: links.demoDownloadUrl,
        x: links.xUrl,
        youtube: links.youtubeUrl,
        tiktok: links.tiktokUrl
    };

    const elements = document.querySelectorAll('[data-vui-link]');
    elements.forEach((element) => {
        const key = element.getAttribute('data-vui-link');
        const url = linkMap[key];

        if (typeof url === 'string' && url.trim().length > 0) {
            element.setAttribute('href', url);

            if (/^https?:\/\//i.test(url)) {
                element.setAttribute('target', '_blank');
                element.setAttribute('rel', 'noopener noreferrer');
            }
        } else {
            // Hide empty optional links (avoid dead icons)
            if (key !== 'demoDownload') {
                element.style.display = 'none';
            }
        }
    });
}

// ==================================================
// NAVIGATION SYSTEM
// ==================================================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    let lastScrollY = window.scrollY;
    let ticking = false;
    let scrollTimeout;

    // Navbar scroll effect with hide/show
    function updateNavbar() {
        if (!navbar) return;
        
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollY > lastScrollY && scrollY > 60) {
            // Scrolling down - hide navbar
            navbar.classList.add('scrolling-down');
            navbar.classList.remove('scrolling-up');
        } else if (scrollY < lastScrollY) {
            // Scrolling up - show navbar
            navbar.classList.remove('scrolling-down');
            navbar.classList.add('scrolling-up');
        }

        // Always show navbar at top
        if (scrollY < 50) {
            navbar.classList.remove('scrolling-down');
            navbar.classList.add('scrolling-up');
        }

        lastScrollY = scrollY;
        ticking = false;

        // Update active nav link based on scroll position
        updateActiveNavLink();
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Show/hide nav actions on mobile
            const navActions = document.querySelector('.nav-actions');
            if (navActions && window.innerWidth <= 768) {
                navActions.classList.toggle('mobile-active');
            }

            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Si es un link externo o a otra página, navegar normalmente
            if (!targetId.startsWith('#')) {
                // No prevenir default, dejar que navegue normalmente
                return;
            }
            
            e.preventDefault();
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Update navbar on scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    updateNavbar();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==================================================
// SCROLL EFFECTS
// ==================================================

function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .gallery-item, .designer-mockup, .download-visual');
    animateElements.forEach(el => observer.observe(el));

    // Parallax effect for hero background
    const heroBg = document.querySelector('.hero-bg-pattern');
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const rate = scrollY * -0.5;
            heroBg.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ==================================================
// ANIMATIONS SYSTEM
// ==================================================

function initAnimations() {
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }

    // Floating animation for elements
    const floatingElements = document.querySelectorAll('.feature-icon, .designer-image');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
        el.classList.add('floating');
    });

    // Pulse animation for buttons
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach((btn, index) => {
        btn.style.animationDelay = `${index * 0.2}s`;
        btn.classList.add('pulse-glow');
    });
}

// ==================================================
// FORM HANDLING
// ==================================================

function initFormHandling() {
    const contactForm = document.querySelector('.form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            showNotification('Mensaje enviado correctamente', 'success');

            // Reset form
            this.reset();

            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Enviando...</span>';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Enviar Mensaje</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            }, 2000);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Ingresa un email válido';
        }
    }

    // Update field styling
    field.classList.toggle('error', !isValid);
    field.classList.toggle('valid', isValid && value);

    // Show/hide error message
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!isValid && errorMessage) {
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
    } else if (errorElement) {
        errorElement.remove();
    }

    return isValid;
}

// ==================================================
// MOCKUP INTERACTIONS
// ==================================================

function initMockupInteractions() {
    // Interactive designer mockup
    const componentItems = document.querySelectorAll('.component-item');
    const canvasElements = document.querySelectorAll('.canvas-element');

    componentItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            componentItems.forEach(i => i.classList.remove('active'));
            canvasElements.forEach(e => e.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Show corresponding canvas element
            const componentType = this.querySelector('span').textContent.toLowerCase();
            const targetElement = document.querySelector(`.${componentType}-preview`);

            if (targetElement) {
                targetElement.classList.add('active');
            }

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Hover effects for canvas elements
    canvasElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 16px 32px rgba(61, 216, 216, 0.2)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Dynamic equalizer bars
    function updateEqualizer() {
        const bars = document.querySelectorAll('.eq-bar');
        bars.forEach((bar, index) => {
            const height = Math.random() * 100 + 20;
            bar.style.height = `${height}%`;

            if (height > 60) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });
    }

    // Update equalizer every 200ms
    if (document.querySelector('.equalizer')) {
        setInterval(updateEqualizer, 200);
    }
}

// ==================================================
// PARTICLE SYSTEM
// ==================================================

function initParticleSystem() {
    // Particles in navbar (especially for mobile)
    const navbarParticles = document.querySelector('.navbar-particles');
    if (navbarParticles) {
        // Create particles for navbar
        for (let i = 0; i < 15; i++) {
            createNavbarParticle(navbarParticles);
        }
    }

    function createNavbarParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'navbar-particle';

        // Random position within navbar
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random size
        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random animation delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';

        container.appendChild(particle);

        // Remove and recreate particle
        setTimeout(() => {
            particle.remove();
            createNavbarParticle(container);
        }, 5000);
    }
}

// ==================================================
// NOTIFICATION SYSTEM
// ==================================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message"></span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    const msgEl = notification.querySelector('.notification-message');
    if (msgEl) msgEl.textContent = String(message ?? '');

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// ==================================================
// PERFORMANCE OPTIMIZATIONS
// ==================================================

function initPerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Throttle scroll events
    let scrollTimeout;
    function throttledScroll() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                // Handle scroll events
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    }

    window.addEventListener('scroll', throttledScroll);

    // Preload critical resources
    preloadCriticalResources();
}

function preloadCriticalResources() {
    // Preload hero background image if exists
    const heroImage = document.querySelector('.hero-visual img');
    if (heroImage) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = heroImage.src;
        document.head.appendChild(link);
    }
}

// ==================================================
// UTILITY FUNCTIONS
// ==================================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================================================
// ACCESSIBILITY FEATURES
// ==================================================

function initAccessibility() {
    // Keyboard navigation for mobile menu
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // Focus management
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });

    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Saltar al contenido principal';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Show skip link on focus
    skipLink.addEventListener('focus', function() {
        this.classList.remove('sr-only');
    });

    skipLink.addEventListener('blur', function() {
        this.classList.add('sr-only');
    });
}

// ==================================================
// ANALYTICS & TRACKING
// ==================================================

function initAnalytics() {
    // Track page views
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });

    // Track button clicks
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('button_click', {
                button_text: this.textContent.trim(),
                button_location: getElementLocation(this)
            });
        });
    });

    // Track form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            trackEvent('form_submit', {
                form_name: this.name || 'contact_form'
            });
        });
    });
}

function trackEvent(eventName, parameters = {}) {
    // Send to analytics service (Google Analytics, etc.)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }

    // Log to console for development
    console.log(`📊 Event tracked: ${eventName}`, parameters);
}

function getElementLocation(element) {
    const rect = element.getBoundingClientRect();
    return {
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2)
    };
}

// ==================================================
// ERROR HANDLING
// ==================================================

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    showNotification('Ha ocurrido un error inesperado.', 'error');
});

// ==================================================
// SERVICE WORKER (PWA FEATURES)
// ==================================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered successfully');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// ==================================================
// CSS ANIMATIONS
// ==================================================

// Add CSS for dynamic animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    @keyframes pulse-glow {
        0%, 100% {
            box-shadow: var(--shadow-glow);
        }
        50% {
            box-shadow: 0 0 20px rgba(61, 216, 216, 0.4);
        }
    }

    @keyframes particle-float {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }

    .floating {
        animation: floating 3s ease-in-out infinite;
    }

    .pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
    }

    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        animation: particle-float 20s linear infinite;
        pointer-events: none;
    }

    .particle-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }

    .navbar-particle {
        position: absolute;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0.4;
        animation: navbar-particle-float 5s ease-in-out infinite;
        pointer-events: none;
        filter: blur(0.5px);
    }

    @keyframes navbar-particle-float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
        }
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-primary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        box-shadow: var(--shadow-lg);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
        max-width: 300px;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-success {
        border-color: #28CA42;
    }

    .notification-error {
        border-color: #FF6B35;
    }

    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--spacing-md);
    }

    .notification-message {
        color: var(--text-primary);
        font-size: 0.875rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
        padding: 0;
    }

    .field-error {
        color: #FF6B35;
        font-size: 0.75rem;
        margin-top: var(--spacing-xs);
    }

    .form-input.error {
        border-color: #FF6B35;
        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
    }

    .form-input.valid {
        border-color: #28CA42;
        box-shadow: 0 0 0 3px rgba(40, 202, 66, 0.1);
    }

    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: var(--bg-primary);
        padding: 8px;
        text-decoration: none;
        border-radius: var(--radius-md);
        z-index: 1000;
        transition: top 0.3s;
    }

    .skip-link:focus {
        top: 6px;
    }

    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            flex-direction: column;
            padding: var(--spacing-lg);
            border-top: 1px solid var(--border-primary);
            box-shadow: var(--shadow-lg);
        }

        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

document.head.appendChild(style);

// Initialize accessibility features
initAccessibility();

// Initialize analytics (uncomment when ready)
// initAnalytics();

console.log('🎨 VisionUI Website fully loaded and interactive');
