/**
 * VisionUI - Smooth Page Transitions
 * Eliminates the black flash when navigating between pages
 * Uses View Transitions API when available, CSS fade fallback otherwise
 */

(function() {
    'use strict';

    // Skip if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check for View Transitions API support (Chrome 111+, Edge 111+)
    const supportsViewTransitions = 'startViewTransition' in document;

    function handleNavigation(event) {
        const link = event.target.closest('a');
        
        // Only handle same-origin navigation
        if (!link || 
            link.target === '_blank' ||
            link.href.startsWith('#') ||
            link.origin !== location.origin ||
            event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }

        event.preventDefault();
        const targetUrl = link.href;

        if (supportsViewTransitions) {
            // Modern: Use View Transitions API
            document.startViewTransition(() => {
                window.location.href = targetUrl;
            });
        } else {
            // Fallback: CSS fade out
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.15s ease-out';
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 150);
        }
    }

    // Attach to all internal links
    document.addEventListener('click', handleNavigation);

    // Fade in on page load
    window.addEventListener('pageshow', () => {
        if (!supportsViewTransitions) {
            document.body.style.opacity = '0';
            requestAnimationFrame(() => {
                document.body.style.transition = 'opacity 0.25s ease-in';
                document.body.style.opacity = '1';
            });
        }
    });
})();
