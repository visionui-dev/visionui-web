/**
 * VisionUI - Adaptive Navbar with Scroll Effect
 * Comprime los espacios de la navbar al hacer scroll (estilo Google Stitch)
 */

(function() {
    'use strict';

    function initAdaptiveNavbar() {
        const navs = document.querySelectorAll('.glass-nav, .glass-navbar');
        if (!navs || navs.length === 0) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateNavbar() {
            const scrollY = window.scrollY;
            const isScrollingDown = scrollY > lastScrollY;
            const hasScrolled = scrollY > 20;

            navs.forEach(nav => {
                if (hasScrolled) {
                    // Modo comprimido: reducir padding y gaps
                    nav.classList.add('scrolled');
                    
                    // Reducir padding horizontal y vertical
                    nav.style.paddingLeft = '1.2rem';
                    nav.style.paddingRight = '1.2rem';
                    nav.style.paddingTop = '0.6rem';
                    nav.style.paddingBottom = '0.6rem';
                    
                    // Comprimir gaps entre elementos
                    const navLinks = nav.querySelector('#navLinks');
                    if (navLinks) {
                        navLinks.style.gap = '0.75rem'; // Reducido de 1rem/1.25rem
                    }
                } else {
                    // Modo normal: padding y gaps originales
                    nav.classList.remove('scrolled');
                    
                    nav.style.paddingLeft = '';
                    nav.style.paddingRight = '';
                    nav.style.paddingTop = '';
                    nav.style.paddingBottom = '';
                    
                    const navLinks = nav.querySelector('#navLinks');
                    if (navLinks) {
                        navLinks.style.gap = '';
                    }
                }
            });

            lastScrollY = scrollY;
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }

        // Agregar transiciones suaves a la navbar
        navs.forEach(nav => {
            nav.style.transition = 'padding 0.3s ease, background 0.3s ease';
            
            const navLinks = nav.querySelector('#navLinks');
            if (navLinks) {
                navLinks.style.transition = 'gap 0.3s ease';
            }
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Estado inicial
        updateNavbar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdaptiveNavbar);
    } else {
        initAdaptiveNavbar();
    }
})();
