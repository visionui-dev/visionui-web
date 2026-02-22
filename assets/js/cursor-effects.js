/**
 * Cursor Effects: chromatic aberration on "reimagined" + magnetic/gravity on buttons & cards
 */
(function() {
    'use strict';

    let mouseX = 0, mouseY = 0;
    let lastMouseX = 0, lastMouseY = 0;
    let smoothedSpeed = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    // ── 1. Chromatic aberration on #hero-reimagined based on mouse velocity ──
    function tickChroma() {
        const word = document.getElementById('hero-reimagined');
        if (!word) {
            requestAnimationFrame(tickChroma);
            return;
        }

        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        const currentSpeed = Math.sqrt(dx * dx + dy * dy);
        
        // Rise/decay: duración x3 (decay más lento = efecto persiste más)
        const riseRate = 0.1;
        const decayRate = 0.0067;
        smoothedSpeed += currentSpeed > 0
            ? (currentSpeed - smoothedSpeed) * riseRate
            : (0 - smoothedSpeed) * decayRate;
        
        // Displacement 30% less than before (70% of original)
        const effectSpread = Math.min(smoothedSpeed * 0.112, 4.55);
        
        if (effectSpread > 0.1) {
            // 20-80: blue (0.2), cyan (0.8)
            word.style.textShadow = `${effectSpread}px 0 0 rgba(80,140,255,0.2), -${effectSpread}px 0 0 rgba(0,220,255,0.8)`;
        } else {
            word.style.textShadow = 'none';
        }

        lastMouseX = mouseX;
        lastMouseY = mouseY;
        requestAnimationFrame(tickChroma);
    }

    // ── 2. Magnetic/gravity effect (buttons & cards attracted subtly to cursor) ──
    const MAGNET_SELECTORS = '.hero-buttons a, .hero-buttons button, .feature-card, .app-card, .step-card, .doc-card';
    const MAGNET_RADIUS = 160;
    const MAGNET_STRENGTH = 6; // Max pixels to move
    const LERP = 0.08; // Smoothness

    let targets = [];
    let rafId;

    function initMagnetic() {
        targets = Array.from(document.querySelectorAll(MAGNET_SELECTORS)).map(el => {
            // Keep track of original inline transform if any
            return { el, x: 0, y: 0 };
        });

        if (targets.length === 0) return;

        function tickMagnetic() {
            targets.forEach(t => {
                const rect = t.el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = mouseX - cx;
                const dy = mouseY - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let targetX = 0;
                let targetY = 0;

                if (dist < MAGNET_RADIUS && dist > 0) {
                    // Calculate a subtle gravity pull
                    const force = Math.pow(1 - (dist / MAGNET_RADIUS), 2); // easing out
                    targetX = (dx / dist) * force * MAGNET_STRENGTH;
                    targetY = (dy / dist) * force * MAGNET_STRENGTH;
                }

                // Apply smooth interpolation
                t.x += (targetX - t.x) * LERP;
                t.y += (targetY - t.y) * LERP;

                // Apply transform, only if there's actual movement (optimization)
                if (Math.abs(t.x) > 0.05 || Math.abs(t.y) > 0.05) {
                    t.el.style.transform = `translate(${t.x.toFixed(2)}px, ${t.y.toFixed(2)}px)`;
                } else {
                    t.el.style.transform = '';
                }
            });
            rafId = requestAnimationFrame(tickMagnetic);
        }
        rafId = requestAnimationFrame(tickMagnetic);
    }

    function init() {
        requestAnimationFrame(tickChroma);
        
        // Refresh targets for magnetic effect
        if (rafId) cancelAnimationFrame(rafId);
        if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
            initMagnetic();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    document.addEventListener('vui:typing:done', init);
})();
