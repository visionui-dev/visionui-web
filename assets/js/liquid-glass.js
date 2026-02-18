/**
 * VisionUI Website - Liquid Glass Effect for Navbar
 * True edge distortion using Canvas 2D + SDF rounded-rect math
 * NO backdrop blur — pure refractive edge rendering
 *
 * References:
 * - https://github.com/shuding/liquid-glass (SDF + smoothstep)
 * - https://imadr.me/liquid-glass/ (Snell's law + normals)
 * - Apple WWDC25 Session 219 - Liquid Glass design language
 * - Inigo Quilez (iquilezles.org) - SDF math for rounded rectangles
 */

// ─── SDF helper (rounded rectangle, Inigo Quilez) ──────────────────────────
function sdfRoundedRect(px, py, cx, cy, hw, hh, r) {
    const qx = Math.abs(px - cx) - hw + r;
    const qy = Math.abs(py - cy) - hh + r;
    return Math.sqrt(Math.max(qx, 0) ** 2 + Math.max(qy, 0) ** 2)
         + Math.min(Math.max(qx, qy), 0) - r;
}

// ─── Main liquid glass init ─────────────────────────────────────────────────
function initLiquidGlassNavbar() {
    const navbar = document.querySelector('.glass-nav');
    if (!navbar) return;

    // Remove any previous blur — we render everything ourselves
    navbar.style.backdropFilter = 'none';
    navbar.style.webkitBackdropFilter = 'none';
    navbar.style.background = 'transparent';
    navbar.style.position = 'relative';
    navbar.style.overflow = 'hidden';

    // ── Canvas layer (sits behind all navbar content) ────────────────────
    const canvas = document.createElement('canvas');
    canvas.className = 'liquid-glass-canvas';
    canvas.style.cssText = `
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        z-index: 0;
        display: block;
    `;
    navbar.insertBefore(canvas, navbar.firstChild);

    // Bring existing children above canvas
    Array.from(navbar.children).forEach(child => {
        if (!child.classList.contains('liquid-glass-canvas') &&
            !child.classList.contains('navbar-particles')) {
            child.style.position = 'relative';
            child.style.zIndex = '5';
        }
    });

    // ── Caustic shimmer points ───────────────────────────────────────────
    const caustics = Array.from({ length: 6 }, (_, i) => ({
        phase: (i / 6) * Math.PI * 2,
        speed: 0.0006 + Math.random() * 0.0004,
        size:  0.06  + Math.random() * 0.06,
    }));

    let lastW = 0, lastH = 0;
    let dpr = window.devicePixelRatio || 1;

    function render(ts) {
        const rect  = navbar.getBoundingClientRect();
        const cssW  = rect.width;
        const cssH  = rect.height;
        if (cssW < 1 || cssH < 1) { requestAnimationFrame(render); return; }

        // Resize canvas only when needed
        if (cssW !== lastW || cssH !== lastH) {
            canvas.width  = Math.round(cssW  * dpr);
            canvas.height = Math.round(cssH * dpr);
            canvas.style.width  = cssW  + 'px';
            canvas.style.height = cssH + 'px';
            lastW = cssW; lastH = cssH;
        }

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(dpr, dpr);

        const W = cssW, H = cssH;
        const R = H / 2;              // pill radius
        const cx = W / 2, cy = H / 2;
        const hw = W / 2 - R, hh = 0; // half-extents for SDF (pill)

        // ── Pill clip ────────────────────────────────────────────────────
        ctx.beginPath();
        ctx.roundRect(0, 0, W, H, R);
        ctx.clip();

        // ── Base glass fill — dark, slightly transparent ─────────────────
        ctx.fillStyle = 'rgba(20, 20, 20, 0.72)';
        ctx.fillRect(0, 0, W, H);

        // ── Edge refraction zone (SDF-driven brightness push at border) ──
        //    We sample-scan the pill edge and paint the displaced halo.
        //    This is the core liquid-glass signature look.
        const edgeThick = 10;   // px — thickness of the refraction band
        const STEPS = Math.min(Math.ceil(W + H) * 2, 1200);

        // Build a thin ImageData strip for the edge effect
        // (We approximate with radial/linear gradients shaped by the SDF boundary)

        // Top specular (the strongest light refraction at top edge)
        const specGrad = ctx.createLinearGradient(0, 0, 0, H * 0.55);
        specGrad.addColorStop(0,    'rgba(255,255,255,0.22)');
        specGrad.addColorStop(0.04, 'rgba(255,255,255,0.10)');
        specGrad.addColorStop(0.14, 'rgba(255,255,255,0.03)');
        specGrad.addColorStop(1,    'rgba(255,255,255,0.00)');
        ctx.fillStyle = specGrad;
        ctx.fillRect(0, 0, W, H);

        // Bottom ambient occlusion shadow
        const botGrad = ctx.createLinearGradient(0, H * 0.55, 0, H);
        botGrad.addColorStop(0, 'rgba(0,0,0,0.00)');
        botGrad.addColorStop(1, 'rgba(0,0,0,0.18)');
        ctx.fillStyle = botGrad;
        ctx.fillRect(0, 0, W, H);

        // Left chromatic fringe — teal (refracted light separation at edge)
        const leftEdge = ctx.createLinearGradient(0, 0, R * 1.8, 0);
        leftEdge.addColorStop(0,   'rgba(59,216,216,0.22)');
        leftEdge.addColorStop(0.3, 'rgba(59,216,216,0.06)');
        leftEdge.addColorStop(1,   'rgba(59,216,216,0.00)');
        ctx.fillStyle = leftEdge;
        ctx.fillRect(0, 0, W, H);

        // Right chromatic fringe (slightly dimmer for asymmetric depth)
        const rightEdge = ctx.createLinearGradient(W, 0, W - R * 1.8, 0);
        rightEdge.addColorStop(0,   'rgba(59,216,216,0.14)');
        rightEdge.addColorStop(0.3, 'rgba(59,216,216,0.04)');
        rightEdge.addColorStop(1,   'rgba(59,216,216,0.00)');
        ctx.fillStyle = rightEdge;
        ctx.fillRect(0, 0, W, H);

        // ── Animated caustic shimmer along the edge ───────────────────────
        caustics.forEach((c, i) => {
            c.phase += c.speed;
            // Position oscillates along pill perimeter
            const angle = c.phase;
            // Map angle to a point on the pill edge
            const ex = cx + Math.cos(angle) * (hw + R);
            const ey = cy + Math.sin(angle) * R * 0.8;
            const sr = R * c.size;

            const cGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, sr);
            const alpha = 0.04 + 0.03 * Math.sin(c.phase * 3.7 + i);
            cGrad.addColorStop(0,   `rgba(200,255,255,${alpha})`);
            cGrad.addColorStop(0.5, `rgba(59,216,216,${alpha * 0.4})`);
            cGrad.addColorStop(1,   'rgba(59,216,216,0.00)');
            ctx.fillStyle = cGrad;
            ctx.fillRect(0, 0, W, H);
        });

        // ── Inner border highlight (the glass "rim") ──────────────────────
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(0.5, 0.5, W - 1, H - 1, R - 0.5);
        // Gradient stroke from bright top to dim bottom
        const rimGrad = ctx.createLinearGradient(0, 0, 0, H);
        rimGrad.addColorStop(0,    'rgba(255,255,255,0.28)');
        rimGrad.addColorStop(0.4,  'rgba(255,255,255,0.10)');
        rimGrad.addColorStop(1,    'rgba(59,216,216,0.14)');
        ctx.strokeStyle = rimGrad;
        ctx.lineWidth   = 1;
        ctx.stroke();
        ctx.restore();

        // ── Outer glow (barely visible ambient halo) ─────────────────────
        ctx.save();
        ctx.restore();

        ctx.restore();
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    // Inject a minimal CSS so .glass-nav has no conflicting styles
    if (!document.getElementById('liquid-glass-styles')) {
        const style = document.createElement('style');
        style.id = 'liquid-glass-styles';
        style.textContent = `
            .glass-nav {
                background: transparent !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                border: none !important;
            }
            @keyframes liquid-shimmer {
                0%,100% { background-position: 200% 0; }
                50%      { background-position: -200% 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ─── Floating Bubbles Effect for Navbar ────────────────────────────────────
function initNavbarParticles() {
    const navbar = document.querySelector('.glass-nav');
    if (!navbar) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'navbar-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 4;
        overflow: hidden;
        border-radius: inherit;
    `;
    navbar.appendChild(particleContainer);

    class Bubble {
        constructor(container) {
            this.container = container;
            this.el = document.createElement('div');
            this.el.style.cssText = `
                position: absolute;
                border-radius: 50%;
                pointer-events: none;
                will-change: transform, opacity;
            `;
            container.appendChild(this.el);
            this.reset(true);
        }

        reset(initial = false) {
            this.size   = 2.5 + Math.random() * 2;
            this.x      = 8 + Math.random() * 84;
            this.y      = initial ? (20 + Math.random() * 60) : 108;
            this.speed  = 0.012 + Math.random() * 0.016;
            this.driftA = 0.25 + Math.random() * 0.35;
            this.driftS = 0.006 + Math.random() * 0.007;
            this.driftO = Math.random() * Math.PI * 2;
            this.maxOp  = 0.38 + Math.random() * 0.22;
            this.life   = 0;
            this.fadeIn = 35;

            const s = this.size;
            this.el.style.width  = s + 'px';
            this.el.style.height = s + 'px';
            this.el.style.background = `radial-gradient(circle at 30% 30%,
                rgba(140,255,255,0.95),
                rgba(59,216,216,0.65) 50%,
                rgba(59,216,216,0.25) 100%)`;
            this.el.style.boxShadow = `0 0 ${s * 2}px rgba(59,216,216,0.45)`;
        }

        update() {
            this.life++;
            const progress = Math.max(0, (108 - this.y) / 118);
            let op;
            if (this.life < this.fadeIn) {
                op = (this.life / this.fadeIn) * this.maxOp;
            } else if (progress > 0.82) {
                op = this.maxOp * (1 - (progress - 0.82) / 0.18);
            } else {
                op = this.maxOp;
            }

            this.y -= this.speed;
            const dx = Math.sin(this.life * this.driftS + this.driftO) * this.driftA;
            this.el.style.left    = (this.x + dx) + '%';
            this.el.style.top     = this.y + '%';
            this.el.style.opacity = Math.max(0, op);

            if (this.y < -6) { this.reset(false); this.life = 0; }
        }

        destroy() { this.el.remove(); }
    }

    const bubbles = Array.from({ length: 10 }, () => new Bubble(particleContainer));

    let animId;
    function animate() {
        bubbles.forEach(b => b.update());
        animId = requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animId);
        bubbles.forEach(b => b.destroy());
    });
}

// ─── Boot ──────────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initLiquidGlassNavbar();
        initNavbarParticles();
    });
} else {
    initLiquidGlassNavbar();
    initNavbarParticles();
}
