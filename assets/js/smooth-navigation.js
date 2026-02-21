/**
 * VisionUI - Smooth Page Transitions
 * Eliminates the black flash when navigating between pages
 * Uses View Transitions API when available, CSS fade fallback otherwise
 * Full page reload - NO SPA content swapping
 */

(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const supportsViewTransitions = 'startViewTransition' in document;

    function handleNavigation(event) {
        const link = event.target.closest('a');
        if (!link ||
            link.target === '_blank' ||
            link.href.startsWith('#') ||
            link.origin !== location.origin ||
            event.ctrlKey || event.metaKey || event.shiftKey ||
            link.href.includes('/api/') || link.href.includes('mailto:')) {
            return;
        }

        // Same page + hash = let browser handle scroll
        if (link.pathname === location.pathname && link.hash) return;

        event.preventDefault();
        const targetUrl = link.href;

        if (supportsViewTransitions) {
            document.startViewTransition(() => {
                window.location.href = targetUrl;
            });
        } else {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.15s ease-out';
            setTimeout(() => { window.location.href = targetUrl; }, 150);
        }
    }

    document.addEventListener('click', handleNavigation);

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
