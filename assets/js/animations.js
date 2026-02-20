// Animaciones usando GSAP para index.html
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // Hacer visibles los elementos antes de animarlos
    gsap.set("nav, .hero-gradient, .inline-flex.items-center.gap-2, h1, h1 + p, .flex.flex-col.sm\\:flex-row.gap-3 a, .hero-gradient + div > div:last-child, .feature-card, #studio .grid.lg\\:grid-cols-\\[420px_1fr\\] > div:first-child, .glass-pill, #waitlistForm", { visibility: "visible" });

    // Fade in la navbar inmediatamente
    gsap.fromTo("nav", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });

    // Hero Section Animations
    const tlHero = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    
    tlHero.fromTo(".hero-gradient", { opacity: 0 }, { opacity: 1, duration: 2 })
          .fromTo(".inline-flex.items-center.gap-2", { y: -20, opacity: 0 }, { y: 0, opacity: 1 }, "-=1.5")
          .fromTo("h1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2 }, "-=1")
          .fromTo("h1 + p", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.8")
          .fromTo(".flex.flex-col.sm\\:flex-row.gap-3 a", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.8")
          .fromTo(".hero-gradient + div > div:last-child", { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1 }, "-=0.5");

    // Features Cards Animations
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.fromTo(card, 
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                delay: i % 2 * 0.1 // cascada suave para columnas
            }
        );
    });

    // VUISTUDIO Section
    gsap.fromTo("#studio .grid.lg\\:grid-cols-\\[420px_1fr\\] > div:first-child", 
        { x: -40, opacity: 0 },
        {
            scrollTrigger: {
                trigger: "#studio",
                start: "top 80%",
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }
    );

    gsap.fromTo(".glass-pill", 
        { y: 30, opacity: 0 },
        {
            scrollTrigger: {
                trigger: "#studio",
                start: "top 70%",
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)"
        }
    );

    gsap.fromTo("#waitlistForm", 
        { y: 20, opacity: 0 },
        {
            scrollTrigger: {
                trigger: "#waitlistForm",
                start: "top 90%",
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.4
        }
    );
});