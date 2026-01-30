/**
 * VisionUI Internationalization (i18n) Module
 * Professional, scalable multi-language system
 */

const I18N_CONFIG = {
    DEFAULT_LANG: 'es',
    STORAGE_KEY: 'visionui_lang',
    SUPPORTED_LANGS: ['es', 'en']
};

// Complete translations for ES and EN
const TRANSLATIONS = {
    es: {
        // Navigation
        'nav.features': 'Características',
        'nav.designer': 'Diseñador',
        'nav.gallery': 'Galería',
        'nav.apps': 'Apps',
        'nav.download': 'Descargar',
        'nav.contact': 'Contacto',
        'nav.account': 'Mi Cuenta',
        'nav.login': 'Iniciar Sesión',
        'nav.logout': 'Cerrar Sesión',
        'nav.framework': 'Framework',
        'nav.store': 'Tienda',
        'nav.home': 'Inicio',
        
        // Hero
        'hero.subtitle': 'Framework para Interfaces Modernas',
        'hero.description': 'Crea interfaces de usuario elegantes y modernas con PySide6. Efectos avanzados, animaciones fluidas y desarrollo ultrarrápido. Todo lo que necesitas para aplicaciones profesionales.',
        'hero.download': 'Descargar Framework',
        'hero.view_designer': 'Ver Diseñador',
        
        // Features
        'features.title': 'Características Avanzadas',
        'features.subtitle': 'Tecnología de vanguardia para el desarrollo de interfaces modernas',
        'features.performance.title': 'Rendimiento Optimizado',
        'features.performance.desc': 'Motor de procesamiento multihilo con compresión automática de imágenes y optimizaciones de memoria avanzadas.',
        'features.visual.title': 'Efectos Visuales',
        'features.visual.desc': 'Gradientes avanzados, sombras dinámicas, glow effects, animaciones fluidas y transiciones elegantes.',
        'features.components.title': 'Componentes Modulares',
        'features.components.desc': 'Más de 40 componentes listos para usar: botones, textos, barras de progreso, sliders, tablas y mucho más.',
        'features.wysiwyg.title': 'Diseñador WYSIWYG',
        'features.wysiwyg.desc': 'Interfaz visual intuitiva para diseñar interfaces sin código. Arrastrar, soltar y configurar en tiempo real.',
        'features.license.title': 'Sistema de Licencias',
        'features.license.desc': 'Protección avanzada con verificación automática y gestión de licencias cloud integrada.',
        'features.code.title': 'Código Elegante',
        'features.code.desc': 'Arquitectura limpia y modular, fácil de mantener y extender. Documentación completa incluida.',
        
        // Designer Section
        'designer.title': 'Diseñador Visual Profesional',
        'designer.description': 'Crea interfaces espectaculares sin escribir una línea de código. El diseñador WYSIWYG de VisionUI te permite construir aplicaciones modernas con un simple arrastrar y soltar.',
        'designer.feature1': 'Interfaz intuitiva y moderna',
        'designer.feature2': 'Previsualización en tiempo real',
        'designer.feature3': 'Exportación automática de código',
        'designer.feature4': 'Panel de propiedades avanzado',
        'designer.try': 'Probar Diseñador',
        
        // Gallery
        'gallery.title': 'Aplicaciones Creadas con VisionUI',
        'gallery.subtitle': 'Ejemplos reales de interfaces modernas desarrolladas con nuestro framework',
        'gallery.trading.title': 'Dashboard de Trading',
        'gallery.trading.desc': 'Interfaz profesional para análisis financiero con gráficos en tiempo real, indicadores técnicos y gestión de portfolio.',
        'gallery.audio.title': 'Control de Audio',
        'gallery.audio.desc': 'Aplicación elegante para control de volumen del sistema con ecualizador visual y presets de audio.',
        'gallery.can.title': 'Monitor CAN',
        'gallery.can.desc': 'Herramienta profesional para monitoreo de buses CAN con visualización de datos en tiempo real y alertas.',
        
        // Download
        'download.title': 'Descarga VisionUI',
        'download.desc': 'Comienza a crear interfaces modernas hoy mismo. Framework completo con diseñador visual incluido.',
        'download.feature1': 'Framework completo PySide6',
        'download.feature2': 'Diseñador visual WYSIWYG',
        'download.feature3': 'Más de 40 componentes',
        'download.feature4': 'Documentación completa',
        'download.feature5': 'Soporte técnico incluido',
        'download.button': 'Descargar Gratis',
        'download.version': 'Versión 1.0.0',
        'download.size': 'Tamaño: ~50MB',
        'download.platform': 'Windows 10+',
        
        // Contact
        'contact.title': '¿Listo para revolucionar tus interfaces?',
        'contact.desc': 'Únete a la comunidad de desarrolladores que ya están creando aplicaciones modernas con VisionUI.',
        'contact.email': 'Email',
        'contact.website': 'Sitio Web',
        'contact.discord': 'Discord',
        'contact.form.name': 'Nombre',
        'contact.form.name_placeholder': 'Tu nombre',
        'contact.form.email': 'Email',
        'contact.form.email_placeholder': 'tu@email.com',
        'contact.form.message': 'Mensaje',
        'contact.form.message_placeholder': 'Cuéntanos sobre tu proyecto...',
        'contact.form.submit': 'Enviar Mensaje',
        
        // Footer
        'footer.description': 'Framework moderno para crear interfaces de usuario elegantes y profesionales con PySide6.',
        'footer.product': 'Producto',
        'footer.resources': 'Recursos',
        'footer.community': 'Comunidad',
        'footer.docs': 'Documentación',
        'footer.tutorials': 'Tutoriales',
        'footer.api': 'API Reference',
        'footer.examples': 'Ejemplos',
        'footer.blog': 'Blog',
        'footer.newsletter': 'Newsletter',
        'footer.rights': 'Todos los derechos reservados',
        'footer.privacy': 'Política de Privacidad',
        'footer.terms': 'Términos de Servicio',
        'footer.copyright': '© 2026 VisionUI Framework. Todos los derechos reservados.',
        'footer.createdby': 'Creado con ❤️ por Ezequiel Carlos Garcia',
        
        // Store
        'store.title': 'VisionUI Apps',
        'store.subtitle': 'Aplicaciones profesionales creadas con VisionUI Framework. Software de alta calidad, diseño moderno y actualizaciones incluidas.',
        'store.available': 'Aplicaciones Disponibles',
        'store.available_subtitle': 'Elige la aplicación que necesitas y obtén una licencia inmediata.',
        'store.buy': 'Comprar',
        'store.coming_soon': 'Próximamente',
        'store.lifetime': 'de por vida',
        'store.popular': 'Popular',
        'store.available_badge': 'Disponible',
        'store.how_works': '¿Cómo funciona?',
        'store.how_works_subtitle': 'Obtén tu licencia en 3 simples pasos',
        'store.step1.title': 'Elige tu app',
        'store.step1.desc': 'Selecciona la aplicación que necesitas de nuestro catálogo.',
        'store.step2.title': 'Paga seguro',
        'store.step2.desc': 'Completa el pago con tarjeta, PayPal o criptomonedas vía LemonSqueezy.',
        'store.step3.title': 'Descarga y activa',
        'store.step3.desc': 'Recibe tu licencia por email, descarga la app y actívala al instante.',
        'store.no_license': '¿No recibiste tu licencia?',
        'store.back_framework': 'Volver al Framework',
        
        // Apps descriptions
        'app.testapp.title': 'TestApp - Music Player',
        'app.testapp.desc': 'Reproductor de música moderno para Windows con interfaz elegante, ecualizador visual y soporte para múltiples formatos de audio.',
        'app.testapp.f1': 'Interfaz moderna y personalizable',
        'app.testapp.f2': 'Soporte MP3, FLAC, WAV, OGG',
        'app.testapp.f3': 'Ecualizador de 10 bandas',
        'app.testapp.f4': 'Actualizaciones gratuitas',
        'app.framework.title': 'VisionUI Framework',
        'app.framework.desc': 'El framework completo para crear tus propias aplicaciones con PySide6. Incluye VUIStudio y todos los componentes.',
        'app.framework.f1': 'VUIStudio Designer incluido',
        'app.framework.f2': '+55 componentes listos',
        'app.framework.f3': 'Soporte y actualizaciones',
        'app.framework.f4': 'Licencia comercial',
        'app.inventory.title': 'Inventory Pro',
        'app.inventory.desc': 'Sistema de gestión de inventario para pequeñas y medianas empresas. Control de stock, alertas y reportes.',
        'app.inventory.f1': 'Gestión multi-almacén',
        'app.inventory.f2': 'Alertas de stock bajo',
        'app.inventory.f3': 'Reportes exportables',
        'app.inventory.f4': 'Base de datos local',
        
        // Auth / Account
        'auth.title': 'Mi Cuenta',
        'auth.subtitle': 'Inicia sesión o crea una cuenta',
        'auth.login': 'Iniciar sesión',
        'auth.register': 'Crear cuenta',
        'auth.email': 'Email',
        'auth.password': 'Contraseña',
        'auth.confirm_password': 'Confirmar contraseña',
        'auth.name': 'Nombre',
        'auth.name_optional': 'Nombre (opcional)',
        'auth.forgot_password': '¿Olvidaste tu contraseña?',
        'auth.no_account': '¿No tienes cuenta?',
        'auth.has_account': '¿Ya tienes cuenta?',
        'auth.login_button': 'Iniciar sesión',
        'auth.register_button': 'Crear cuenta',
        'auth.logout': 'Cerrar sesión',
        'auth.logged_as': 'Conectado como',
        'auth.view_apps': 'Ver aplicaciones disponibles',
        'auth.back_home': 'Volver al inicio',
        'auth.my_licenses': 'Mis Licencias',
        'auth.purchase_history': 'Historial de Compras',
        'auth.no_licenses': 'No tienes licencias activas aún',
        'auth.explore_apps': 'Explorar aplicaciones',
        'auth.start_now': '¡Empieza ahora!',
        'auth.explore_apps_desc': 'Explora nuestras aplicaciones profesionales',
        'auth.license_active': 'Activa',
        'auth.license_expired': 'Expirada',
        'auth.license_key': 'License Key',
        'auth.valid_until': 'Válida hasta',
        'auth.no_expiration': 'Sin expiración',
        'auth.activated': 'Activada',
        'auth.download': 'Descargar',
        'auth.loading': 'Cargando...',
        'auth.creating': 'Creando...',
        'auth.passwords_no_match': 'Las contraseñas no coinciden',
        'auth.min_chars': 'Mínimo 6 caracteres',
        'auth.connection_error': 'Error de conexión',
        'auth.login_error': 'Error al iniciar sesión',
        'auth.register_error': 'Error al crear cuenta',
        
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
        'general.connected': 'Conectado',
        
        // Tags
        'tag.finance': 'Finanzas',
        'tag.realtime': 'Tiempo Real',
        'tag.charts': 'Gráficos',
        'tag.audio': 'Audio',
        'tag.controls': 'Controles',
        'tag.system': 'Sistema',
        'tag.industrial': 'Industrial',
        'tag.monitoring': 'Monitoreo'
    },
    
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
        'hero.description': 'Create elegant and modern user interfaces with PySide6. Advanced effects, smooth animations and ultra-fast development. Everything you need for professional applications.',
        'hero.download': 'Download Framework',
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
        'download.title': 'Download VisionUI',
        'download.desc': 'Start creating modern interfaces today. Complete framework with visual designer included.',
        'download.feature1': 'Complete PySide6 framework',
        'download.feature2': 'WYSIWYG visual designer',
        'download.feature3': 'Over 40 components',
        'download.feature4': 'Complete documentation',
        'download.feature5': 'Technical support included',
        'download.button': 'Download Free',
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
        'auth.logout': 'Logout',
        'auth.logged_as': 'Logged in as',
        'auth.view_apps': 'View available applications',
        'auth.back_home': 'Back to home',
        'auth.my_licenses': 'My Licenses',
        'auth.purchase_history': 'Purchase History',
        'auth.no_licenses': 'You don\'t have active licenses yet',
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
        'auth.min_chars': 'Minimum 6 characters',
        'auth.connection_error': 'Connection error',
        'auth.login_error': 'Login error',
        'auth.register_error': 'Registration error',
        
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
        'general.connected': 'Connected',
        
        // Tags
        'tag.finance': 'Finance',
        'tag.realtime': 'Real-time',
        'tag.charts': 'Charts',
        'tag.audio': 'Audio',
        'tag.controls': 'Controls',
        'tag.system': 'System',
        'tag.industrial': 'Industrial',
        'tag.monitoring': 'Monitoring'
    }
};

/**
 * i18n Module - Professional implementation
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
        this.createLanguageSwitcher();
    },

    // Create professional language switcher
    createLanguageSwitcher() {
        const existingSwitcher = document.querySelector('.lang-switcher');
        if (existingSwitcher) {
            existingSwitcher.remove();
        }

        const nav = document.querySelector('.nav-container');
        if (!nav) return;

        // Create switcher container
        const switcher = document.createElement('div');
        switcher.className = 'lang-switcher';
        
        // Create EN/ES buttons
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en" title="English">EN</button>
            <button class="lang-btn ${this.currentLang === 'es' ? 'active' : ''}" data-lang="es" title="Español">ES</button>
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
