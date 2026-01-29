/**
 * VisionUI Internationalization (i18n) Module
 * Supports multiple languages with easy extensibility
 */

const I18N_CONFIG = {
    DEFAULT_LANG: 'es',
    STORAGE_KEY: 'visionui_lang',
    SUPPORTED_LANGS: ['es', 'en']
};

// Language strings
const TRANSLATIONS = {
    es: {
        // Navigation
        'nav.features': 'Características',
        'nav.designer': 'Diseñador',
        'nav.gallery': 'Galería',
        'nav.apps': '🛒 Apps',
        'nav.download': 'Descargar',
        'nav.contact': 'Contacto',
        'nav.account': 'Mi Cuenta',
        'nav.login': 'Iniciar Sesión',
        'nav.logout': 'Cerrar Sesión',
        
        // Hero
        'hero.subtitle': 'Framework para Interfaces Modernas',
        'hero.description': 'Crea interfaces de usuario elegantes y modernas con PySide6. Efectos avanzados, animaciones fluidas y desarrollo ultrarrápido.',
        'hero.download': 'Descargar Framework',
        'hero.view_designer': 'Ver Diseñador',
        
        // Features
        'features.title': 'Características Avanzadas',
        'features.subtitle': 'Tecnología de vanguardia para el desarrollo de interfaces modernas',
        'features.performance.title': 'Rendimiento Optimizado',
        'features.performance.desc': 'Motor de procesamiento multihilo con compresión automática de imágenes y optimizaciones de memoria avanzadas.',
        'features.visual.title': 'Efectos Visuales',
        'features.visual.desc': 'Gradientes avanzados, sombras dinámicas, glow effects, animaciones fluidas y transiciones elegantes.',
        'features.components.title': 'Componentes Premium',
        'features.components.desc': 'Más de 50 widgets personalizables con diseño moderno y soporte para temas oscuros y claros.',
        'features.wysiwyg.title': 'Editor WYSIWYG',
        'features.wysiwyg.desc': 'Diseñador visual completo: arrastrar y soltar, preview en tiempo real, exportación a código Python.',
        
        // Store
        'store.title': 'Apps Premium',
        'store.subtitle': 'Aplicaciones profesionales construidas con VisionUI',
        'store.buy': 'Comprar',
        'store.coming_soon': 'Próximamente',
        'store.lifetime': 'lifetime',
        'store.how_works': '¿Cómo funciona?',
        'store.step1.title': 'Elige tu app',
        'store.step1.desc': 'Selecciona la aplicación que necesitas de nuestro catálogo.',
        'store.step2.title': 'Paga seguro',
        'store.step2.desc': 'Completa el pago con tarjeta, PayPal o criptomonedas vía LemonSqueezy.',
        'store.step3.title': 'Descarga y activa',
        'store.step3.desc': 'Recibe tu licencia por email, descarga la app y actívala al instante.',
        
        // Auth / Account
        'auth.login': 'Iniciar Sesión',
        'auth.register': 'Crear Cuenta',
        'auth.email': 'Email',
        'auth.password': 'Contraseña',
        'auth.confirm_password': 'Confirmar Contraseña',
        'auth.name': 'Nombre',
        'auth.forgot_password': '¿Olvidaste tu contraseña?',
        'auth.no_account': '¿No tienes cuenta?',
        'auth.has_account': '¿Ya tienes cuenta?',
        'auth.login_button': 'Entrar',
        'auth.register_button': 'Crear cuenta',
        'auth.logout': 'Cerrar sesión',
        'auth.logged_as': 'Conectado como',
        'auth.license_active': 'Licencia activa',
        'auth.no_license': 'Sin licencia',
        
        // Purchase Modal
        'purchase.title': 'Comprar',
        'purchase.email_instruction': 'Ingresa tu email para recibir tu licencia después del pago.',
        'purchase.connected_as': 'Conectado como:',
        'purchase.license_sent_to': 'Tu licencia se enviará a este email después del pago.',
        'purchase.use_other_email': 'Usar otro email',
        'purchase.continue': 'Continuar al pago',
        'purchase.cancel': 'Cancelar',
        'purchase.have_account': '¿Ya tienes cuenta?',
        
        // Post Purchase
        'post.title': '¡Pago completado!',
        'post.subtitle': 'Tu licencia está siendo procesada',
        'post.check_inbox': 'Revisa tu bandeja de entrada',
        'post.email_sent': 'Enviamos un email a',
        'post.with_instructions': 'con las instrucciones para activar tu licencia.',
        'post.next_steps': 'Próximos pasos',
        'post.step1': 'Abre el email de VisionUI',
        'post.step1_desc': 'Busca un email con el asunto "¡Tu licencia está lista!"',
        'post.step2': 'Crea tu contraseña',
        'post.step2_desc': 'Haz clic en el botón del email para configurar tu acceso',
        'post.step3': 'Descarga e inicia sesión',
        'post.step3_desc': 'Descarga la aplicación y usa tu email + contraseña',
        
        // General
        'general.loading': 'Cargando...',
        'general.error': 'Error',
        'general.success': 'Éxito',
        'general.back': 'Volver',
        'general.continue': 'Continuar',
        'general.save': 'Guardar',
        'general.cancel': 'Cancelar',
        'general.close': 'Cerrar',
        
        // Footer
        'footer.rights': 'Todos los derechos reservados',
        'footer.privacy': 'Privacidad',
        'footer.terms': 'Términos',
        'footer.contact': 'Contacto'
    },
    
    en: {
        // Navigation
        'nav.features': 'Features',
        'nav.designer': 'Designer',
        'nav.gallery': 'Gallery',
        'nav.apps': '🛒 Apps',
        'nav.download': 'Download',
        'nav.contact': 'Contact',
        'nav.account': 'My Account',
        'nav.login': 'Login',
        'nav.logout': 'Logout',
        
        // Hero
        'hero.subtitle': 'Framework for Modern Interfaces',
        'hero.description': 'Create elegant and modern user interfaces with PySide6. Advanced effects, smooth animations and ultra-fast development.',
        'hero.download': 'Download Framework',
        'hero.view_designer': 'View Designer',
        
        // Features
        'features.title': 'Advanced Features',
        'features.subtitle': 'Cutting-edge technology for modern interface development',
        'features.performance.title': 'Optimized Performance',
        'features.performance.desc': 'Multi-threaded processing engine with automatic image compression and advanced memory optimizations.',
        'features.visual.title': 'Visual Effects',
        'features.visual.desc': 'Advanced gradients, dynamic shadows, glow effects, smooth animations and elegant transitions.',
        'features.components.title': 'Premium Components',
        'features.components.desc': 'Over 50 customizable widgets with modern design and support for dark and light themes.',
        'features.wysiwyg.title': 'WYSIWYG Editor',
        'features.wysiwyg.desc': 'Complete visual designer: drag and drop, real-time preview, Python code export.',
        
        // Store
        'store.title': 'Premium Apps',
        'store.subtitle': 'Professional applications built with VisionUI',
        'store.buy': 'Buy',
        'store.coming_soon': 'Coming Soon',
        'store.lifetime': 'lifetime',
        'store.how_works': 'How it works?',
        'store.step1.title': 'Choose your app',
        'store.step1.desc': 'Select the application you need from our catalog.',
        'store.step2.title': 'Pay securely',
        'store.step2.desc': 'Complete payment with card, PayPal or crypto via LemonSqueezy.',
        'store.step3.title': 'Download and activate',
        'store.step3.desc': 'Receive your license by email, download the app and activate it instantly.',
        
        // Auth / Account
        'auth.login': 'Login',
        'auth.register': 'Register',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.confirm_password': 'Confirm Password',
        'auth.name': 'Name',
        'auth.forgot_password': 'Forgot your password?',
        'auth.no_account': "Don't have an account?",
        'auth.has_account': 'Already have an account?',
        'auth.login_button': 'Sign In',
        'auth.register_button': 'Create Account',
        'auth.logout': 'Logout',
        'auth.logged_as': 'Logged in as',
        'auth.license_active': 'License active',
        'auth.no_license': 'No license',
        
        // Purchase Modal
        'purchase.title': 'Buy',
        'purchase.email_instruction': 'Enter your email to receive your license after payment.',
        'purchase.connected_as': 'Connected as:',
        'purchase.license_sent_to': 'Your license will be sent to this email after payment.',
        'purchase.use_other_email': 'Use another email',
        'purchase.continue': 'Continue to payment',
        'purchase.cancel': 'Cancel',
        'purchase.have_account': 'Already have an account?',
        
        // Post Purchase
        'post.title': 'Payment completed!',
        'post.subtitle': 'Your license is being processed',
        'post.check_inbox': 'Check your inbox',
        'post.email_sent': 'We sent an email to',
        'post.with_instructions': 'with instructions to activate your license.',
        'post.next_steps': 'Next steps',
        'post.step1': 'Open VisionUI email',
        'post.step1_desc': 'Look for an email with subject "Your license is ready!"',
        'post.step2': 'Create your password',
        'post.step2_desc': 'Click the button in the email to set up your access',
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
        
        // Footer
        'footer.rights': 'All rights reserved',
        'footer.privacy': 'Privacy',
        'footer.terms': 'Terms',
        'footer.contact': 'Contact'
    }
};

/**
 * i18n Module
 */
const VUIi18n = {
    currentLang: I18N_CONFIG.DEFAULT_LANG,

    // Get stored language or detect from browser
    getStoredLang() {
        const stored = localStorage.getItem(I18N_CONFIG.STORAGE_KEY);
        if (stored && I18N_CONFIG.SUPPORTED_LANGS.includes(stored)) {
            return stored;
        }
        
        // Detect from browser
        const browserLang = navigator.language.split('-')[0];
        if (I18N_CONFIG.SUPPORTED_LANGS.includes(browserLang)) {
            return browserLang;
        }
        
        return I18N_CONFIG.DEFAULT_LANG;
    },

    // Set language
    setLang(lang) {
        if (!I18N_CONFIG.SUPPORTED_LANGS.includes(lang)) {
            console.warn(`Language ${lang} not supported`);
            return false;
        }
        
        this.currentLang = lang;
        localStorage.setItem(I18N_CONFIG.STORAGE_KEY, lang);
        document.documentElement.lang = lang;
        this.updatePage();
        
        return true;
    },

    // Get translation
    t(key, params = {}) {
        const translations = TRANSLATIONS[this.currentLang] || TRANSLATIONS[I18N_CONFIG.DEFAULT_LANG];
        let text = translations[key];
        
        if (!text) {
            console.warn(`Translation missing: ${key}`);
            return key;
        }
        
        // Replace parameters {{param}}
        Object.keys(params).forEach(param => {
            text = text.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
        });
        
        return text;
    },

    // Update all elements with data-i18n attribute
    updatePage() {
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
        
        // Update elements with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });
        
        // Update elements with data-i18n-title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = this.t(key);
        });
    },

    // Initialize
    init() {
        this.currentLang = this.getStoredLang();
        document.documentElement.lang = this.currentLang;
        this.updatePage();
        this.createLanguageSwitcher();
    },

    // Create language switcher UI - Simple toggle button
    createLanguageSwitcher() {
        const existingSwitcher = document.querySelector('.lang-switcher');
        if (existingSwitcher) return;

        const nav = document.querySelector('.nav-container');
        if (!nav) return;

        const switcher = document.createElement('button');
        switcher.className = 'lang-toggle';
        switcher.title = this.currentLang === 'es' ? 'Switch to English' : 'Cambiar a Español';
        switcher.innerHTML = this.currentLang === 'es' ? '🇬🇧' : '🇪🇸';
        
        // Insert before nav-toggle (hamburger menu)
        const navToggle = nav.querySelector('.nav-toggle');
        if (navToggle) {
            nav.insertBefore(switcher, navToggle);
        } else {
            nav.appendChild(switcher);
        }

        // Toggle language on click
        switcher.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = this.currentLang === 'es' ? 'en' : 'es';
            this.setLang(newLang);
            
            // Update button
            switcher.innerHTML = newLang === 'es' ? '🇬🇧' : '🇪🇸';
            switcher.title = newLang === 'es' ? 'Switch to English' : 'Cambiar a Español';
        });
    }
};

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => VUIi18n.init());
} else {
    VUIi18n.init();
}

// Export
window.VUIi18n = VUIi18n;
window.t = (key, params) => VUIi18n.t(key, params);
