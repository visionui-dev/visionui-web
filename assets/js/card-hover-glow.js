/**
 * VisionUI Website - Card Hover Glow Effect
 * Adds cursor-following glow effect to cards
 * Inspired by the VisionUI HoverGlow component
 * 
 * Two-layer glow effect:
 * 1. Inner glow - fills inside the card for ambient lighting
 * 2. Border glow - highlights the frame edges
 */

function initCardHoverGlow() {
    const cards = document.querySelectorAll('.feature-card, .glass-pill, .doc-card, .gallery-item, .step-card');
    
    cards.forEach(card => {
        if (card.dataset.glowInit) return;
        card.dataset.glowInit = 'true';

        const computedStyle = window.getComputedStyle(card);
        const borderRadius = computedStyle.borderRadius || '1rem';

        // Ensure card has relative positioning for inner layer
        if (computedStyle.position === 'static') {
            card.style.position = 'relative';
        }

        // INNER glow — fills the card interior following the cursor
        const innerGlow = document.createElement('div');
        innerGlow.className = 'card-hover-glow-inner';
        innerGlow.style.cssText = `
            position: absolute;
            inset: 0;
            border-radius: ${borderRadius};
            opacity: 0;
            transition: opacity 0.35s ease;
            pointer-events: none;
            z-index: 1;
            background: radial-gradient(380px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(59, 216, 216, 0.13), 
                transparent 48%);
        `;

        // Create BORDER glow overlay (highlights frame edges)
        const borderGlow = document.createElement('div');
        borderGlow.className = 'card-hover-glow-border';
        borderGlow.style.cssText = `
            position: absolute;
            inset: -2px;
            border-radius: ${borderRadius};
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 2;
            background: radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(59, 216, 216, 0.87), 
                transparent 42%);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            -webkit-mask-composite: xor;
            padding: 2px;
        `;

        // Ensure card has relative positioning
        card.style.position = 'relative';

        // Insert glow layers (inner first, border on top)
        card.appendChild(innerGlow);
        card.appendChild(borderGlow);

        // Track mouse movement
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            innerGlow.style.setProperty('--mouse-x', x + 'px');
            innerGlow.style.setProperty('--mouse-y', y + 'px');
            borderGlow.style.setProperty('--mouse-x', x + 'px');
            borderGlow.style.setProperty('--mouse-y', y + 'px');
        });

        // Show glow on hover
        card.addEventListener('mouseenter', () => {
            innerGlow.style.opacity = '1';
            borderGlow.style.opacity = '1';
        });

        // Hide glow on leave
        card.addEventListener('mouseleave', () => {
            innerGlow.style.opacity = '0';
            borderGlow.style.opacity = '0';
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardHoverGlow);
} else {
    initCardHoverGlow();
}

// Re-initialize for dynamically added cards
document.addEventListener('DOMNodeInserted', function() {
    setTimeout(initCardHoverGlow, 100);
});
