/**
 * VisionUI Internationalization (i18n) Module
 * Professional, scalable multi-language system
 */

const I18N_CONFIG = {
    DEFAULT_LANG: 'en',
    STORAGE_KEY: 'visionui_lang',
    SUPPORTED_LANGS: ['en']
};

// Complete translations - English only
const TRANSLATIONS = {
    en: {
        // Navigation
        'nav.features': 'Features',
        'nav.designer': 'Designer',
        'nav.gallery': 'Gallery',
        'nav.apps': 'Apps',
        'nav.download': 'Download',
        'nav.contact': 'Contact',
        'nav.account': 'My Account',
        'nav.login': 'Login',
        'nav.logout': 'Logout',
        'nav.framework': 'Framework',
        'nav.store': 'Store',
        'nav.home': 'Home',
        
        // Hero
        'hero.subtitle': 'Framework for Modern Interfaces',
        'hero.description': 'Create elegant and modern user interfaces with PySide6. Includes demos like Glass Widget (Bitcoin) showcasing a real-time refractive glass effect on Windows.',
        'hero.download': 'Download demo (Glass Widget)',
        'hero.view_designer': 'View Designer',
        
        // Features
        'features.title': 'Advanced Features',
        'features.subtitle': 'Cutting-edge technology for modern interface development',
        'features.performance.title': 'Optimized Performance',
        'features.performance.desc': 'Multi-threaded processing engine with automatic image compression and advanced memory optimizations.',
        'features.visual.title': 'Visual Effects',
        'features.visual.desc': 'Advanced gradients, dynamic shadows, glow effects, smooth animations and elegant transitions.',
        'features.components.title': 'Modular Components',
        'features.components.desc': 'Over 40 ready-to-use components: buttons, texts, progress bars, sliders, tables and much more.',
        'features.wysiwyg.title': 'WYSIWYG Designer',
        'features.wysiwyg.desc': 'Intuitive visual interface to design without code. Drag, drop and configure in real-time.',
        'features.license.title': 'License System',
        'features.license.desc': 'Advanced protection with automatic verification and integrated cloud license management.',
        'features.code.title': 'Elegant Code',
        'features.code.desc': 'Clean and modular architecture, easy to maintain and extend. Complete documentation included.',
        
        // Designer Section
        'designer.title': 'Professional Visual Designer',
        'designer.description': 'Create spectacular interfaces without writing a single line of code. VisionUI\'s WYSIWYG designer lets you build modern applications with simple drag and drop.',
        'designer.feature1': 'Intuitive and modern interface',
        'designer.feature2': 'Real-time preview',
        'designer.feature3': 'Automatic code export',
        'designer.feature4': 'Advanced properties panel',
        'designer.try': 'Try Designer',
        
        // Gallery
        'gallery.title': 'Applications Built with VisionUI',
        'gallery.subtitle': 'Real examples of modern interfaces developed with our framework',
        'gallery.trading.title': 'Trading Dashboard',
        'gallery.trading.desc': 'Professional interface for financial analysis with real-time charts, technical indicators and portfolio management.',
        'gallery.audio.title': 'Audio Control',
        'gallery.audio.desc': 'Elegant application for system volume control with visual equalizer and audio presets.',
        'gallery.can.title': 'CAN Monitor',
        'gallery.can.desc': 'Professional tool for CAN bus monitoring with real-time data visualization and alerts.',
        
        // Download
        'download.title': 'Download the demo',
        'download.desc': 'Glass Widget (Bitcoin): a lightweight Windows app with always-on-top mode and a real-time refractive glass effect. Built with VisionUI.',
        'download.feature1': 'Real Windows app (.exe)',
        'download.feature2': 'Always-on-top',
        'download.feature3': 'Toggle effect + intensity control',
        'download.feature4': 'Interactive (not a mockup)',
        'download.feature5': 'Built with VisionUI',
        'download.button': 'Download demo',
        'download.version': 'Version 1.0.0',
        'download.size': 'Size: ~50MB',
        'download.platform': 'Windows 10+',
        
        // Contact
        'contact.title': 'Ready to revolutionize your interfaces?',
        'contact.desc': 'Join the community of developers already creating modern applications with VisionUI.',
        'contact.email': 'Email',
        'contact.website': 'Website',
        'contact.discord': 'Discord',
        'contact.form.name': 'Name',
        'contact.form.name_placeholder': 'Your name',
        'contact.form.email': 'Email',
        'contact.form.email_placeholder': 'you@email.com',
        'contact.form.message': 'Message',
        'contact.form.message_placeholder': 'Tell us about your project...',
        'contact.form.submit': 'Send Message',
        
        // Footer
        'footer.description': 'Modern framework for creating elegant and professional user interfaces with PySide6.',
        'footer.product': 'Product',
        'footer.resources': 'Resources',
        'footer.community': 'Community',
        'footer.docs': 'Documentation',
        'footer.tutorials': 'Tutorials',
        'footer.api': 'API Reference',
        'footer.examples': 'Examples',
        'footer.blog': 'Blog',
        'footer.newsletter': 'Newsletter',
        'footer.rights': 'All rights reserved',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.copyright': '© 2026 VisionUI Framework. All rights reserved.',
        'footer.createdby': 'Created with ❤️ by Ezequiel Carlos Garcia',
        
        // Store
        'store.title': 'VisionUI Apps',
        'store.subtitle': 'Professional applications built with VisionUI Framework. High quality software, modern design and updates included.',
        'store.available': 'Available Applications',
        'store.available_subtitle': 'Choose the application you need and get an instant license.',
        'store.buy': 'Buy',
        'store.coming_soon': 'Coming Soon',
        'store.lifetime': 'lifetime',
        'store.popular': 'Popular',
        'store.available_badge': 'Available',
        'store.how_works': 'How it works?',
        'store.how_works_subtitle': 'Get your license in 3 simple steps',
        'store.step1.title': 'Choose your app',
        'store.step1.desc': 'Select the application you need from our catalog.',
        'store.step2.title': 'Pay securely',
        'store.step2.desc': 'Complete payment with card, PayPal or crypto via LemonSqueezy.',
        'store.step3.title': 'Download and activate',
        'store.step3.desc': 'Receive your license by email, download the app and activate it instantly.',
        'store.no_license': 'Didn\'t receive your license?',
        'store.back_framework': 'Back to Framework',
        
        // Apps descriptions
        'app.testapp.title': 'TestApp - Music Player',
        'app.testapp.desc': 'Modern music player for Windows with elegant interface, visual equalizer and support for multiple audio formats.',
        'app.testapp.f1': 'Modern and customizable interface',
        'app.testapp.f2': 'MP3, FLAC, WAV, OGG support',
        'app.testapp.f3': '10-band equalizer',
        'app.testapp.f4': 'Free updates',
        'app.framework.title': 'VisionUI Framework',
        'app.framework.desc': 'The complete framework to create your own applications with PySide6. Includes VUIStudio and all components.',
        'app.framework.f1': 'VUIStudio Designer included',
        'app.framework.f2': '+55 ready components',
        'app.framework.f3': 'Support and updates',
        'app.framework.f4': 'Commercial license',
        'app.inventory.title': 'Inventory Pro',
        'app.inventory.desc': 'Inventory management system for small and medium businesses. Stock control, alerts and reports.',
        'app.inventory.f1': 'Multi-warehouse management',
        'app.inventory.f2': 'Low stock alerts',
        'app.inventory.f3': 'Exportable reports',
        'app.inventory.f4': 'Local database',
        
        // Auth / Account
        'auth.title': 'My Account',
        'auth.subtitle': 'Sign in or create an account',
        'auth.login': 'Sign in',
        'auth.register': 'Create account',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.confirm_password': 'Confirm password',
        'auth.name': 'Name',
        'auth.name_optional': 'Name (optional)',
        'auth.forgot_password': 'Forgot your password?',
        'auth.no_account': 'Don\'t have an account?',
        'auth.has_account': 'Already have an account?',
'auth.login_button': 'Sign in',
                'auth.register_button': 'Create account',
                'auth.continue_google': 'Continue with Google',
                'auth.set_password_desktop': 'Set password for desktop app',
        'auth.logout': 'Logout',
        'auth.logged_as': 'Logged in as',
        'auth.view_apps': 'View available applications',
        'auth.back_home': 'Back to home',
        'auth.my_licenses': 'My Licenses',
        'auth.my_apps': 'My Applications',
        'auth.purchase_history': 'Purchase History',
        'auth.no_licenses': 'You don\'t have purchased applications yet',
        'auth.purchased': 'Purchased',
        'auth.expires': 'Valid until',
        'auth.explore_apps': 'Explore applications',
        'auth.start_now': 'Start now!',
        'auth.explore_apps_desc': 'Explore our professional applications',
        'auth.license_active': 'Active',
        'auth.license_expired': 'Expired',
        'auth.license_key': 'License Key',
        'auth.valid_until': 'Valid until',
        'auth.no_expiration': 'No expiration',
        'auth.activated': 'Activated',
        'auth.download': 'Download',
        'auth.loading': 'Loading...',
        'auth.creating': 'Creating...',
        'auth.passwords_no_match': 'Passwords don\'t match',
        'auth.passwords_match': '✓ Passwords match',
        'auth.the_app': 'the app',
        'auth.login_to_purchase': 'Sign in or create an account to continue purchasing {{app}}',
        'auth.min_chars': 'Minimum 6 characters',
        'auth.connection_error': 'Connection error',
        'auth.login_error': 'Login error',
        'auth.register_error': 'Registration error',
        'auth.email_verified': 'Email verified',
        'auth.email_pending': 'Email pending verification',
        'auth.resend_verification': 'Resend email',
        'auth.verification_sent': 'Email sent',
        
        // Password Recovery
        'auth.reset_password': 'Reset Password',
        'auth.reset_password_subtitle': 'Enter your email to receive a recovery link',
        'auth.new_password': 'New Password',
        'auth.new_password_subtitle': 'Enter your new password',
        'auth.send_reset_link': 'Send recovery link',
        'auth.change_password': 'Change password',
        'auth.current_password': 'Current password',
        'auth.confirm_new_password': 'Confirm new password',
        'auth.save_password': 'Save',
        'auth.account_settings': 'Account settings',
        'auth.back_to_login': 'Back to sign in',
        'auth.reset_email_sent': 'Check your email!',
        'auth.reset_email_sent_desc': 'If the email exists in our system, you will receive a password reset link shortly.',
        'auth.check_spam': 'Don\'t forget to check your spam folder.',
        'auth.password_updated': 'Password Updated!',
        'auth.password_updated_desc': 'Your password has been changed successfully. You can now sign in with your new password.',
        'auth.invalid_link': 'Invalid Link',
        'auth.invalid_link_desc': 'This recovery link is invalid or has expired.',
        'auth.expired_link': 'Expired Link',
        'auth.expired_link_desc': 'This recovery link has expired. Please request a new one.',
        'auth.used_link': 'Link Already Used',
        'auth.used_link_desc': 'This recovery link has already been used. If you need to change your password, request a new one.',
        'auth.request_new_link': 'Request new link',
        'auth.resetting_password_for': 'Resetting password for:',
        
        // Purchase Modal
        'purchase.title': 'Buy',
        'purchase.email_instruction': 'Enter your email to receive your license after payment.',
        'purchase.connected_as': 'Connected as:',
        'purchase.license_sent_to': 'Your license will be sent to this email after payment.',
        'purchase.use_other_email': 'Use another email',
        'purchase.continue': 'Continue to payment',
        'purchase.cancel': 'Cancel',
        'purchase.have_account': 'Already have an account?',
        'purchase.login_required': 'You need an account to purchase',
        'purchase.login_required_desc': 'Create a free account or sign in to continue with your purchase.',
        
        // Post Purchase
        'post.title': 'Payment completed!',
        'post.subtitle': 'Your license is being processed',
        'post.subtitle_done': 'Your license is active. Sign in to the app with your web email and password.',
        'post.ready_use': 'Your license is ready. Use the app with your web email and password.',
        'post.download_signin': 'Download and sign in',
        'post.download_signin_desc': 'Download the app from your account panel and sign in with your web email and password.',
        'post.check_inbox': 'Check your inbox',
        'post.email_sent': 'We sent an email to',
        'post.with_instructions': 'with instructions to activate your license.',
        'post.next_steps': 'Next steps',
        'post.step1': 'Open VisionUI email',
        'post.step1_desc': 'Look for an email with subject "Your license is ready!"',
        'post.step2': 'Create your password',
        'post.step2_desc': 'Click the button in the email to set up your access',
        'post.step2_desc_generic': 'Open the app, enter your email and the License Key from the email',
        'post.step2_desc_has_password': 'Open the app and enter your email and the License Key you received by email.',
        'post.step2_desc_setup_token': 'Click the link in the email to set up your password.',
        'post.step3': 'Download and sign in',
        'post.step3_desc': 'Download the app and use your email + password',
        
        // General
        'general.loading': 'Loading...',
        'general.error': 'Error',
        'general.success': 'Success',
        'general.back': 'Back',
        'general.continue': 'Continue',
        'general.save': 'Save',
        'general.cancel': 'Cancel',
        'general.close': 'Close',
        'general.connected': 'Connected',
        'general.processing_license': 'Processing your license...',
        'general.email_sent_check': 'Email sent. Check your inbox.',
        'general.license_ready': 'Your license is ready!',
        'general.email_sent_success': 'Email sent successfully. If you don\'t see it, check your spam folder.',
        
        // Errors
        'error.network': 'Could not connect to server. Check your connection.',
        'error.timeout': 'Server took too long to respond. Please try again.',
        'error.payment_not_configured': 'Payment system not configured. Please contact support.',
        
        // Tags
        'tag.finance': 'Finance',
        'tag.realtime': 'Real-time',
        'tag.charts': 'Charts',
        'tag.audio': 'Audio',
        'tag.controls': 'Controls',
        'tag.system': 'System',
        'tag.industrial': 'Industrial',
        'tag.monitoring': 'Monitoring',
        'tag.can': 'CAN'
    }
};

/**
 * i18n Module - Professional implementation
 */
const VUIi18n = {
    currentLang: I18N_CONFIG.DEFAULT_LANG,

    // Get stored language or detect from browser
    getStoredLang() {
        // Always use English - force English for entire website
        return I18N_CONFIG.DEFAULT_LANG;
    },

    // Set language and update page
    setLang(lang) {
        if (!I18N_CONFIG.SUPPORTED_LANGS.includes(lang)) {
            console.warn(`Language ${lang} not supported`);
            return false;
        }
        
        this.currentLang = lang;
        localStorage.setItem(I18N_CONFIG.STORAGE_KEY, lang);
        document.documentElement.lang = lang;
        this.updatePage();
        this.updateSwitcherUI();
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        
        return true;
    },

    // Get translation with fallback
    t(key, params = {}) {
        const translations = TRANSLATIONS[this.currentLang] || TRANSLATIONS[I18N_CONFIG.DEFAULT_LANG];
        let text = translations[key];
        
        if (!text) {
            // Fallback to default language
            text = TRANSLATIONS[I18N_CONFIG.DEFAULT_LANG][key];
            if (!text) {
                console.warn(`Translation missing: ${key}`);
                return key;
            }
        }
        
        // Replace parameters {{param}}
        Object.keys(params).forEach(param => {
            text = text.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
        });
        
        return text;
    },

    // Update all elements with data-i18n attributes
    updatePage() {
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.hasAttribute('placeholder')) {
                    el.placeholder = translation;
                } else {
                    el.value = translation;
                }
            } else {
                el.textContent = translation;
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });
        
        // Update titles
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = this.t(key);
        });
        
        // Update aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            el.setAttribute('aria-label', this.t(key));
        });
    },

    // Update switcher button UI
    updateSwitcherUI() {
        const switcher = document.querySelector('.lang-switcher');
        if (!switcher) return;
        
        const buttons = switcher.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
        });
    },

    // Initialize
    init() {
        this.currentLang = this.getStoredLang();
        document.documentElement.lang = this.currentLang;
        this.updatePage();
        // Language switcher disabled - English only
        // this.createLanguageSwitcher();
    },

    // Create professional language switcher (DISABLED - English only)
    createLanguageSwitcher() {
        // Language switcher disabled - only English is supported
        return;
        
        /* DISABLED CODE - UNCOMMENT TO RE-ENABLE MULTI-LANGUAGE
        const existingSwitcher = document.querySelector('.lang-switcher');
        if (existingSwitcher) {
            existingSwitcher.remove();
        }

        const nav = document.querySelector('.nav-container');
        if (!nav) return;

        // Create switcher container
        const switcher = document.createElement('div');
        switcher.className = 'lang-switcher';
        
        // Create EN button only
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en" title="English">EN</button>
        `;
        
        // Insert before nav-toggle (hamburger menu)
        const navToggle = nav.querySelector('.nav-toggle');
        if (navToggle) {
            nav.insertBefore(switcher, navToggle);
        } else {
            nav.appendChild(switcher);
        }

        // Add event listeners
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                this.setLang(lang);
            });
        });
        */
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => VUIi18n.init());
} else {
    VUIi18n.init();
}

// Export for global access
window.VUIi18n = VUIi18n;
window.t = (key, params) => VUIi18n.t(key, params);
