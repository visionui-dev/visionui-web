// Typing effect tipo Google Antigravity: cursor estilizado + texto que se escribe rápido
// onComplete: callback cuando termina (ocultar cursor, revelar resto de la página)
function initHeroTyping(onComplete) {
    const container = document.getElementById('hero-typed-text');
    const cursor = document.querySelector('.hero-typed-cursor');
    if (!container || container.dataset.typed === 'done') {
        if (onComplete) onComplete();
        return;
    }

    const fullText = 'The impossible Desktop\u00A0UI, reimagined.';
    const charDelay = 30; // 70% de la velocidad actual (más lento)
    let i = 0;

    function typeNext() {
        if (i < fullText.length) {
            container.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeNext, charDelay);
        } else {
            container.dataset.typed = 'done';
            // Gradient a "impossible" y ocultar cursor
            const html = container.innerHTML
                .replace('impossible', '<span class="animate-gradient-text">impossible</span>')
                .replace('reimagined', '<span id="hero-reimagined" class="hero-chroma-word">reimagined</span>');
            container.innerHTML = html;
            if (cursor) cursor.classList.add('hero-cursor-done');
            document.dispatchEvent(new CustomEvent('vui:typing:done'));
            if (typeof onComplete === 'function') onComplete();
        }
    }

    typeNext();
}

// Tras terminar el typing: revelar hero gradient, subtítulo, p, botones, mockup, etc.
function runHeroRevealAfterTyping() {
    if (!window.gsap) return;
    gsap.set(['.hero-gradient', '.hero-subtitle', 'h1 + p', '.glow-bg', '#vui-bg-deco'], { visibility: 'visible' });
    gsap.set(['.hero-buttons a', '.hero-buttons button'], { visibility: 'visible' });
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
    tl.fromTo('.hero-gradient', { opacity: 0 }, { opacity: 1, duration: 1.2 })
      .fromTo('.hero-subtitle', { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.8")
      .fromTo('h1 + p', { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, "-=0.7")
      .fromTo('.hero-buttons-wrapper', { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.6");
    tl.add(() => {
        const btnWrapper = document.getElementById('hero-cta-wrapper');
        if (btnWrapper && window.gsap) {
            gsap.to(btnWrapper, {
                y: -10,
                duration: 3.5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                repeatDelay: 0.8
            });
        }
    }, "-=0.2");
    const mockup = document.querySelector('.hero-gradient + div > div:last-child');
    if (mockup && mockup.querySelector('.aspect-\\[16\\/9\\]')) {
        gsap.set(mockup, { visibility: 'visible' });
        tl.fromTo(mockup, { y: 30, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1 }, "-=0.5");
    }
    tl.fromTo('.glow-bg, #vui-bg-deco', { opacity: 0 }, { opacity: 1 }, "-=1");
}

// Animaciones usando GSAP para todas las páginas de VisionUI Web (SPA Compatible)
window.initVUIAnimations = function() {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Primero, hacemos visibles los elementos antes de animarlos (excepto nav que es persistente)
    gsap.set(`
        .hero-gradient, .inline-flex.items-center.gap-2, 
        h1, h1 + p, .hero-buttons a, .hero-buttons button,
        .hero-gradient + div > div:last-child, .feature-card, 
        #studio .grid.lg\\:grid-cols-\\[420px_1fr\\] > div:first-child, 
        .glass-pill:not(nav .glass-pill), #waitlistForm, .app-card, .doc-card, .gallery-item, .step-card
    `, { visibility: "visible" });

    // Fade in para la Navbar solo la primera vez, NUNCA en SPA navigation
    if (!window.vuiNavbarAnimated) {
        window.vuiNavbarAnimated = true;
        // No animar: la navbar es persistente y no debe saltar al navegar
    }

    // Página Index con typing: nada carga hasta que termine (solo navbar visible)
    const typedEl = document.getElementById('hero-typed-text');
    if (typedEl) {
        document.body.classList.add('vui-typing-active');
        initHeroTyping(function onTypingDone() {
            document.body.classList.remove('vui-typing-active');
            runHeroRevealAfterTyping();
        });
    } else {
    // Páginas sin typing: flujo GSAP normal
    const heroElements = document.querySelector('h1');
    if (heroElements) {
        gsap.set(['.hero-gradient', '.inline-flex.items-center.gap-2', 'h1', 'h1 + p'], { opacity: 0, visibility: 'visible' });
        gsap.set(['.hero-buttons a', '.hero-buttons button'], { opacity: 0, y: 20, visibility: 'visible' });
        const tlHero = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
        const heroGradient = document.querySelector('.hero-gradient');
        if (heroGradient) tlHero.fromTo(heroGradient, { opacity: 0 }, { opacity: 1, duration: 2 });
        const badge = document.querySelector('.inline-flex.items-center.gap-2');
        if (badge) tlHero.fromTo(badge, { y: -20, opacity: 0 }, { y: 0, opacity: 1 }, "-=1.5");
        tlHero.fromTo("h1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2 }, "-=1")
              .fromTo("h1 + p", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.8");
        const buttons = document.querySelectorAll('.hero-buttons a, .hero-buttons button');
        if (buttons.length) tlHero.fromTo(buttons, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.8");
        const mockup = document.querySelector('.hero-gradient + div > div:last-child');
        if (mockup && mockup.querySelector('.aspect-\\[16\\/9\\]')) {
            tlHero.fromTo(mockup, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1 }, "-=0.5");
        }
    }}

    // --- Animaciones para Tarjetas (ScrollTrigger) ---
    const cardSelectors = ['.feature-card', '.app-card', '.doc-card', '.gallery-item', '.step-card'];
    cardSelectors.forEach(selector => {
        gsap.utils.toArray(selector).forEach((card, i) => {
            gsap.fromTo(card, 
                { y: 40, opacity: 0, scale: 0.98 },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=80", // Se anima un poco antes de llegar al fondo
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    ease: "power2.out",
                    delay: (i % 3) * 0.1 // cascada de hasta 3 columnas
                }
            );
        });
    });

    // --- Index.html Específicos ---
    // Sección VUIStudio (Izquierda)
    const studioText = document.querySelector("#studio .grid.lg\\:grid-cols-\\[420px_1fr\\] > div:first-child");
    if (studioText) {
        gsap.fromTo(studioText, 
            { x: -40, opacity: 0 },
            {
                scrollTrigger: { trigger: "#studio", start: "top 80%" },
                x: 0, opacity: 1, duration: 0.8, ease: "power3.out"
            }
        );
    }

    // Glass Pills (Píldoras de características en VUIStudio)
    gsap.utils.toArray('.glass-pill').forEach((pill, i) => {
        // Ignorar la navbar si tiene esta clase
        if (pill.tagName.toLowerCase() === 'nav' || pill.closest('nav')) return;
        
        gsap.fromTo(pill, 
            { y: 30, opacity: 0 },
            {
                scrollTrigger: { trigger: pill.closest('.grid') || pill, start: "top 85%" },
                y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)", delay: (i % 4) * 0.1
            }
        );
    });

    // Formulario Waitlist
    const waitlist = document.querySelector("#waitlistForm");
    if (waitlist) {
        gsap.fromTo(waitlist, 
            { y: 20, opacity: 0 },
            {
                scrollTrigger: { trigger: waitlist, start: "top 90%" },
                y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2
            }
        );
    }
};

// Inicializar en carga principal
document.addEventListener("DOMContentLoaded", () => {
    window.initVUIAnimations();
});

// Inicializar cuando se cambia la página por SPA (Smooth Navigation)
document.addEventListener("vui-page-changed", () => {
    window.initVUIAnimations();
});