/**
 * VisionUI Website - Liquid Glass Effect for Navbar
 * Based on Shu Ding's liquid-glass technique (2025)
 * https://github.com/shuding/liquid-glass
 *
 * True refractive distortion using SVG feDisplacementMap + SDF rounded-rect
 * - A hidden canvas computes a displacement map via SDF math (Inigo Quilez)
 * - An SVG <feDisplacementMap> filter reads that canvas as feImage
 * - backdrop-filter: url(#vui-lg-filter) applies the warp to whatever is behind
 * - Result: pixels at the pill edge are displaced, creating true glass refraction
 */

// ─── SDF: rounded rectangle (Inigo Quilez / Shu Ding) ─────────────────────
function _sdfRoundRect(x, y, width, height, radius) {
    const qx = Math.abs(x) - width + radius;
    const qy = Math.abs(y) - height + radius;
    return Math.min(Math.max(qx, qy), 0) + Math.sqrt(Math.max(qx, 0) ** 2 + Math.max(qy, 0) ** 2) - radius;
}

function _smoothStep(edge0, edge1, x) {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
}

// ─── Build displacement map on a hidden canvas (Shu Ding approach) ────────
function _buildDisplacementMap(canvas, W, H) {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(W, H);
    const data = imgData.data;

    // Pill shape parameters (normalized coordinates)
    const halfWidth = 0.4;   // Width of straight segment (0.4 = 80% of width)
    const halfHeight = 0.0;  // Pill is fully rounded vertically
    const radius = 0.5;      // Full radius for pill shape
    const edgeOffset = 0.12;  // Edge band thickness (subtle)
    const edgeStart = 0.8;    // Where displacement begins
    const edgeEnd = 0.0;      // Maximum displacement at edge

    // We compute raw dx/dy displacements first, then normalize to 0-255
    const rawDx = new Float32Array(W * H);
    const rawDy = new Float32Array(W * H);
    let maxScale = 0;

    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            // Normalize coordinates to [-0.5, 0.5]
            const nx = (x / W) - 0.5;
            const ny = (y / H) - 0.5;

            // Calculate SDF distance to edge
            const distanceToEdge = _sdfRoundRect(nx, ny, halfWidth, halfHeight, radius);

            // Calculate displacement factor using smoothStep (Shu Ding method)
            const displacement = _smoothStep(edgeStart, edgeEnd, distanceToEdge - edgeOffset);
            const scaled = _smoothStep(0, 1, displacement);

            // Calculate displacement: contract toward center at edges
            // This creates the liquid glass refraction effect
            const newX = nx * scaled + 0.5;
            const newY = ny * scaled + 0.5;

            // Convert back to pixel coordinates
            const newPixelX = newX * W;
            const newPixelY = newY * H;

            // Calculate displacement vector
            const dx = newPixelX - x;
            const dy = newPixelY - y;

            const idx = y * W + x;
            rawDx[idx] = dx;
            rawDy[idx] = dy;

            // Track maximum displacement for normalization
            maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
        }
    }

    // Normalize to [0, 255] with 0.5 = no displacement (128)
    // Use 0.5 multiplier for more subtle effect
    const scale = maxScale > 0 ? (0.5 / maxScale) : 1;

    for (let i = 0; i < W * H; i++) {
        const r = rawDx[i] * scale + 0.5;
        const g = rawDy[i] * scale + 0.5;
        data[i * 4]     = Math.round(Math.max(0, Math.min(255, r * 255))); // R = X
        data[i * 4 + 1] = Math.round(Math.max(0, Math.min(255, g * 255))); // G = Y
        data[i * 4 + 2] = 0;
        data[i * 4 + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);
    return { dataURL: canvas.toDataURL(), scale: maxScale };
}

// ─── Main init ──────────────────────────────────────────────────────────────
function initLiquidGlassNavbar() {
    const navbar = document.querySelector('.glass-nav');
    if (!navbar) return;

    const FILTER_ID = 'vui-lg-filter';
    const FEMAP_ID  = 'vui-lg-map';

    // ── 1. Create hidden SVG filter ────────────────────────────────────────
    let svgEl = document.getElementById('vui-lg-svg');
    if (!svgEl) {
        svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgEl.id = 'vui-lg-svg';
        svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgEl.setAttribute('width', '0');
        svgEl.setAttribute('height', '0');
        svgEl.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:0;';

        const defs   = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', FILTER_ID);
        filter.setAttribute('filterUnits', 'userSpaceOnUse');
        filter.setAttribute('color-interpolation-filters', 'sRGB');
        // Large region so the filter covers the full navbar
        filter.setAttribute('x', '-10%');
        filter.setAttribute('y', '-50%');
        filter.setAttribute('width', '120%');
        filter.setAttribute('height', '200%');

        const feImg = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
        feImg.setAttribute('id', FEMAP_ID);
        feImg.setAttribute('result', 'displacementMap');

        const feDisp = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
        feDisp.setAttribute('id', 'vui-lg-disp');
        feDisp.setAttribute('in', 'SourceGraphic');
        feDisp.setAttribute('in2', 'displacementMap');
        feDisp.setAttribute('xChannelSelector', 'R');
        feDisp.setAttribute('yChannelSelector', 'G');
        feDisp.setAttribute('scale', '8');  // Initial subtle scale, will be updated dynamically

        filter.appendChild(feImg);
        filter.appendChild(feDisp);
        defs.appendChild(filter);
        svgEl.appendChild(defs);
        document.body.appendChild(svgEl);
    }

    const feImg  = document.getElementById(FEMAP_ID);
    const feDisp = document.getElementById('vui-lg-disp');

    // ── 2. Hidden canvas for displacement map ──────────────────────────────
    const mapCanvas = document.createElement('canvas');
    mapCanvas.style.display = 'none';
    document.body.appendChild(mapCanvas);

    // ── 3. Rim-highlight overlay (subtle inner border, CSS only) ───────────
    let rimEl = navbar.querySelector('.vui-lg-rim');
    if (!rimEl) {
        rimEl = document.createElement('div');
        rimEl.className = 'vui-lg-rim';
        rimEl.style.cssText = `
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            z-index: 1;
        `;
        navbar.insertBefore(rimEl, navbar.firstChild);
    }

    // Lift existing navbar children above the rim
    Array.from(navbar.children).forEach(child => {
        if (!child.classList.contains('vui-lg-rim') &&
            !child.classList.contains('navbar-particles')) {
            child.style.position = 'relative';
            child.style.zIndex   = '10';
        }
    });

    // ── 4. Inject CSS ──────────────────────────────────────────────────────
    if (!document.getElementById('vui-lg-styles')) {
        const style = document.createElement('style');
        style.id = 'vui-lg-styles';
        style.textContent = `
            .glass-nav {
                background: rgba(18, 18, 18, 0.42) !important;
                backdrop-filter: url(#${FILTER_ID}) blur(10px) contrast(1.1) brightness(1.05) saturate(1.15) !important;
                -webkit-backdrop-filter: url(#${FILTER_ID}) blur(10px) contrast(1.1) brightness(1.05) saturate(1.15) !important;
                border: none !important;
                box-shadow: 0 2px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset !important;
            }
            .vui-lg-rim {
                background: linear-gradient(
                    160deg,
                    rgba(255,255,255,0.12) 0%,
                    rgba(255,255,255,0.04) 30%,
                    rgba(59,216,216,0.08) 70%,
                    rgba(59,216,216,0.03) 100%
                );
                box-shadow:
                    inset 0 1px 0 rgba(255,255,255,0.15),
                    inset 0 -1px 0 rgba(59,216,216,0.08);
            }
        `;
        document.head.appendChild(style);
    }

    // ── 5. Resize + rebuild displacement map when navbar size changes ──────
    let lastW = 0, lastH = 0;

    function updateMap() {
        const rect = navbar.getBoundingClientRect();
        const W = Math.round(rect.width);
        const H = Math.round(rect.height);
        if (W < 4 || H < 4 || (W === lastW && H === lastH)) return;

        lastW = W; lastH = H;
        mapCanvas.width  = W;
        mapCanvas.height = H;

        const { dataURL, scale } = _buildDisplacementMap(mapCanvas, W, H);

        // Point feImage to the canvas data
        feImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataURL);
        feImg.setAttribute('width',  W);
        feImg.setAttribute('height', H);

        // Scale the displacement in screen-space pixels
        // Use Shu Ding's approach: scale is already in pixels, apply subtle multiplier
        const displacementScale = Math.round(scale * 0.6); // More subtle for navbar
        feDisp.setAttribute('scale', String(Math.max(1, displacementScale)));

        // Position the SVG filter to match the navbar on screen
        filter_positionToNavbar(rect);
    }

    function filter_positionToNavbar(rect) {
        const filter = document.getElementById(FILTER_ID);
        if (!filter) return;
        filter.setAttribute('x',      String(Math.round(rect.left)));
        filter.setAttribute('y',      String(Math.round(rect.top)));
        filter.setAttribute('width',  String(Math.round(rect.width)));
        filter.setAttribute('height', String(Math.round(rect.height)));
    }

    // ── 6. Animate: update filter position every frame (navbar can move on scroll) ──
    function animate() {
        const rect = navbar.getBoundingClientRect();
        filter_positionToNavbar(rect);
        updateMap(); // no-op if size unchanged
        requestAnimationFrame(animate);
    }

    updateMap();
    requestAnimationFrame(animate);
}

// ─── Floating Bubbles Effect for Navbar ────────────────────────────────────
function initNavbarParticles() {
    const navbar = document.querySelector('.glass-nav');
    if (!navbar) return;

    // Don't add twice
    if (navbar.querySelector('.navbar-particles')) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'navbar-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 6;
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
                will-change: transform, opacity, left, top;
                transform: translateZ(0);
                backface-visibility: hidden;
            `;
            container.appendChild(this.el);
            this.reset(true);
        }

        reset(initial = false) {
            this.size   = 2.5 + Math.random() * 2;
            this.x      = 8 + Math.random() * 84;
            this.y      = initial ? (20 + Math.random() * 60) : 108;
            this.speed  = 0.12 + Math.random() * 0.08;  // Faster upward movement
            this.driftA = 0.8 + Math.random() * 1.2;    // More horizontal drift
            this.driftS = 0.015 + Math.random() * 0.012; // Faster oscillation
            this.driftO = Math.random() * Math.PI * 2;
            this.maxOp  = 0.35 + Math.random() * 0.15;
            this.life   = 0;
            this.fadeIn = 20;  // Faster fade in

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
            } else if (progress > 0.85) {
                op = this.maxOp * (1 - (progress - 0.85) / 0.15);
            } else {
                op = this.maxOp;
            }

            // Smooth upward movement
            this.y -= this.speed;
            
            // Enhanced horizontal drift with smooth oscillation
            const driftPhase = this.life * this.driftS + this.driftO;
            const dx = Math.sin(driftPhase) * this.driftA;
            
            // Apply transform for better performance (GPU accelerated)
            this.el.style.transform = `translate(${dx}px, 0)`;
            this.el.style.left = this.x + '%';
            this.el.style.top = this.y + '%';
            this.el.style.opacity = Math.max(0, op);

            if (this.y < -6) { 
                this.reset(false); 
                this.life = 0; 
            }
        }

        destroy() { this.el.remove(); }
    }

    const bubbles = Array.from({ length: 12 }, () => new Bubble(particleContainer));

    let animId;
    let lastTime = performance.now();
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        // Update all bubbles
        bubbles.forEach(b => b.update());
        
        // Use requestAnimationFrame for smooth 60fps
        animId = requestAnimationFrame(animate);
    }
    animate(performance.now());

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
