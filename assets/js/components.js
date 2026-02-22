/**
 * VisionUI - Shared Components
 * Injects the shared Navbar and Footer into all pages to avoid duplication.
 */

document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    injectFooter();
});

function injectNavbar() {
    // Solo inyectar si existe un contenedor designado o si el usuario no tiene una ya en el HTML
    // Buscamos un <div id="vui-navbar-container"></div>
    const container = document.getElementById('vui-navbar-container');
    if (!container) return;

    // Inject styles needed for the navbar so they work on all pages
    if (!document.getElementById('vui-navbar-styles')) {
        const styleHTML = `
        <style id="vui-navbar-styles">
            .glass-nav, .glass-navbar {
                background: rgba(26, 26, 26, 0.35);
                border: none;
            }
            .glass-pill {
                background: transparent;
                border: none;
            }
            .nav-item-glow {
                color: #B5F1FF;
                transition: all 0.3s ease;
            }
            .nav-item-glow:hover {
                color: #ffffff;
                text-shadow: 0 0 5px rgba(255, 255, 255, 0.27), 0 0 10px rgba(181, 241, 255, 0.21);
            }
            .nav-item-glow.active-nav-link {
                color: #ffffff;
            }
            .nav-account.logged-in { background: rgba(59,216,216,0.15); border: 1px solid rgba(59,216,216,0.3); color: white; }
            .user-dropdown { position: absolute; top: 100%; right: 0; margin-top: 0.5rem; background: #222; border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; min-width: 220px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: all 0.2s; z-index: 1000; overflow: hidden; }
            .user-dropdown.show { opacity: 1; visibility: visible; transform: translateY(0); }
            /* Nav móvil: textos más pequeños para evitar pegados a VUI y Account */
            @media (max-width: 639px) {
                #navLinks .nav-item-glow { font-size: 0.88rem !important; }
                #navLinks { gap: 0.65rem !important; }
            }
            /* Mobile bottom nav */
            .mobile-bottom-nav {
                background: rgba(22, 22, 22, 0.9);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
        </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styleHTML);
    }

    // Active link highlighting based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navHTML = `
    <nav class="fixed bottom-4 sm:bottom-auto sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[52.8rem] px-2 sm:px-4" style="visibility: visible; opacity: 1;">
        <div class="glass-nav glass-navbar glass-pill rounded-full px-3 sm:px-[1.65rem] py-2 sm:py-[0.825rem] flex items-center justify-between shadow-2xl relative">
            <div class="absolute inset-0 rounded-full pointer-events-none" style="padding: 1.5px; background: linear-gradient(173deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 14%, rgba(255,255,255,0) 86%, rgba(255,255,255,0.25) 100%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;"></div>
            <a href="index.html" class="flex items-center gap-2 no-underline flex-shrink-0 group">
                <div class="text-primary relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7">
                    <!-- Generic Modern 'V' Logo for VisionUI -->
                    <div class="absolute inset-0 bg-primary/20 rounded-lg rotate-3 group-hover:rotate-6 transition-transform"></div>
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 relative z-10 drop-shadow-[0_0_8px_rgba(59,216,216,0.5)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21L3 5H7.5L12 15.5L16.5 5H21L12 21Z" fill="url(#vui-gradient)"/>
                        <path d="M12 13L8 5H12L12 13Z" fill="white" opacity="0.3"/>
                        <defs>
                            <linearGradient id="vui-gradient" x1="3" y1="5" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#ffffff"/>
                                <stop offset="1" stop-color="#3bd8d8"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <span class="font-bold tracking-tight text-white text-[1rem] sm:text-[1.15rem]">
                    <span class="hidden sm:inline">VisionUI</span>
                    <span class="sm:hidden">VUI</span>
                </span>
            </a>
            <div class="hidden sm:block w-[1px] h-5 bg-white/10 mx-1"></div>
            <div id="navLinks" class="flex items-center gap-3 min-[400px]:gap-4 sm:gap-5 text-[0.8rem] min-[400px]:text-[0.85rem] sm:text-[0.96rem] font-medium">
                <a class="nav-item-glow py-1 ${currentPage === 'index.html' && window.location.hash !== '#features' ? '' : ''}" href="index.html#features">Features</a>
                <a class="nav-item-glow py-1 ${currentPage === 'store.html' || currentPage === 'store' ? 'active-nav-link' : ''}" href="store.html">Apps</a>
                <a class="nav-item-glow py-1 hidden min-[360px]:inline ${currentPage === 'showcase.html' || currentPage === 'showcase' ? 'active-nav-link' : ''}" href="showcase.html">Showcase</a>
                <a class="nav-item-glow py-1 ${currentPage === 'docs.html' || currentPage === 'docs' ? 'active-nav-link' : ''}" href="docs.html">Docs</a>
            </div>
            <div class="nav-right relative flex items-center gap-2 flex-shrink-0">
                <a href="account.html" id="accountBtn" class="nav-account group relative overflow-hidden flex items-center justify-center gap-1.5 bg-primary text-background-dark px-[0.6rem] sm:px-[1.375rem] py-[0.45rem] sm:py-[0.55rem] rounded-full text-[0.9rem] sm:text-[0.96rem] font-bold transition-all no-underline hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(59,216,216,0.3)] active:scale-95">
                    <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)] z-0">
                        <div class="relative h-full w-4 bg-white/30"></div>
                    </div>
                    <span id="accountBtnAvatar" class="relative z-10 hidden w-5 h-5 rounded-full bg-background-dark/20 text-background-dark flex items-center justify-center text-[10px]"></span>
                    <div class="relative flex h-[18px] w-[18px] items-center justify-center overflow-hidden z-10">
                        <span class="material-symbols-outlined absolute nav-account-icon text-[18px] transition-transform duration-300 group-hover:translate-y-[150%]">person</span>
                        <span class="material-symbols-outlined absolute text-[18px] -translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0">account_circle</span>
                    </div>
                    <span class="relative z-10 hidden sm:inline-flex items-center gap-1">
                        <span id="accountBtnText" class="nav-account-label tracking-wide" data-i18n="nav.account">My Account</span>
                        <span id="accountBtnChevron" class="material-symbols-outlined nav-account-chevron text-[15px] transition-transform duration-300 group-hover:translate-x-[3px]">chevron_right</span>
                    </span>
                </a>
            </div>
        </div>
    </nav>
    `;

    container.innerHTML = navHTML;

    // Disparar evento personalizado por si auth.js u otros necesitan saber que la navbar ya está lista
    // Usamos un pequeño delay para asegurar que listeners diferidos estén listos
    setTimeout(() => {
        document.dispatchEvent(new Event('vui-navbar-loaded'));
        
        // Explicitly re-initialize hover glow
        if (typeof initCardHoverGlow === 'function') {
            initCardHoverGlow();
        }
    }, 50);
}

function injectFooter() {
    const container = document.getElementById('vui-footer-container');
    if (!container) return;

    if (!document.getElementById('vui-footer-icon-styles')) {
        const style = document.createElement('style');
        style.id = 'vui-footer-icon-styles';
        style.textContent = `.footer-brand-icon { filter: brightness(0) invert(0.65); transition: filter 0.2s; opacity: 0.9; } a:hover .footer-brand-icon { filter: brightness(0) invert(0.85); opacity: 1; }`;
        document.head.appendChild(style);
    }

    const footerHTML = `
    <footer class="border-t border-white/5 py-6 px-6 mt-12 w-full relative z-10">
        <div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-medium gap-4">
            <span class="text-slate-500">© 2026 VUI Framework. All rights reserved.</span>
            <div class="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                <div class="flex flex-wrap justify-center items-center gap-4 md:gap-5">
                    <a class="text-slate-500 hover:text-primary transition-colors flex items-center group" href="https://x.com/vision_ui" target="_blank" rel="noopener" title="X"><img src="assets/images/icons/x.svg" alt="X" class="w-4 h-4 shrink-0 footer-brand-icon"></a>
                    <a class="text-slate-500 hover:text-primary transition-colors flex items-center group" href="https://instagram.com/vision_ui" target="_blank" rel="noopener" title="Instagram"><img src="assets/images/icons/instagram.svg" alt="Instagram" class="w-4 h-4 shrink-0 footer-brand-icon"></a>
                    <a class="text-slate-500 hover:text-primary transition-colors flex items-center group" href="https://discord.gg/vision_ui" target="_blank" rel="noopener" title="Discord"><img src="assets/images/icons/discord.svg" alt="Discord" class="w-4 h-4 shrink-0 footer-brand-icon"></a>
                </div>
                <span class="hidden sm:inline w-px h-4 bg-white/10 flex-shrink-0"></span>
                <div class="flex flex-wrap justify-center items-center gap-4 md:gap-5">
                    <a class="text-slate-500 hover:text-primary transition-colors" href="store.html">VUI Apps</a>
                    <a class="text-slate-500 hover:text-primary transition-colors" href="docs.html">Docs</a>
                    <a class="text-slate-500 hover:text-primary transition-colors" href="privacy.html">Privacy</a>
                    <a class="text-slate-500 hover:text-primary transition-colors" href="terms.html">Terms</a>
                    <a class="text-slate-500 hover:text-primary transition-colors" href="refund-policy.html">Refunds</a>
                </div>
            </div>
        </div>
    </footer>
    `;

    container.innerHTML = footerHTML;
}
