// Animaciones usando GSAP para index.html
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    const tlHero = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    
    tlHero.from(".hero-gradient", { opacity: 0, duration: 2 })
          .from(".inline-flex.items-center.gap-2", { y: -20, opacity: 0 }, "-=1.5")
          .from("h1", { y: 30, opacity: 0, stagger: 0.2 }, "-=1")
          .from("h1 + p", { y: 20, opacity: 0 }, "-=0.8")
          .from(".flex.flex-col.sm\\:flex-row.gap-3 a", { y: 20, opacity: 0, stagger: 0.1 }, "-=0.8")
          .from(".hero-gradient + div > div:last-child", { y: 40, opacity: 0, scale: 0.95 }, "-=0.5");

    // Features Cards Animations
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: i % 2 * 0.1 // cascada suave para columnas
        });
    });

    // VUISTUDIO Section
    gsap.from("#studio .grid.lg\\:grid-cols-\\[420px_1fr\\] > div:first-child", {
        scrollTrigger: {
            trigger: "#studio",
            start: "top 80%",
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".glass-pill", {
        scrollTrigger: {
            trigger: "#studio",
            start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
    });

    gsap.from("#waitlistForm", {
        scrollTrigger: {
            trigger: "#waitlistForm",
            start: "top 90%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4
    });
});