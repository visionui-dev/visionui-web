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
            .nav-account.logged-in { background: rgba(59,216,216,0.15); border: 1px solid rgba(59,216,216,0.3); color: white; }
            .user-dropdown { position: absolute; top: 100%; right: 0; margin-top: 0.5rem; background: #222; border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; min-width: 220px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: all 0.2s; z-index: 1000; overflow: hidden; }
            .user-dropdown.show { opacity: 1; visibility: visible; transform: translateY(0); }
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

    const navHTML = `
    <nav class="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[52.8rem] px-4" style="visibility: visible; opacity: 1;">
        <div class="glass-nav glass-navbar glass-pill rounded-full px-[1.2rem] sm:px-[1.65rem] py-[0.7rem] sm:py-[0.825rem] flex items-center justify-between shadow-2xl">
            <a href="index.html" class="flex items-center gap-1.5 sm:gap-2 no-underline flex-shrink-0">
                <div class="text-primary">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
                    </svg>
                </div>
                <span class="font-bold tracking-tight text-white text-[0.96rem] sm:text-[1.1rem]"><span class="hidden sm:inline">VisionUI</span><span class="sm:hidden">VUI</span></span>
            </a>
            <div id="navLinks" class="hidden sm:flex items-center gap-4 md:gap-5 text-[0.96rem] font-medium">
                <a class="nav-item-glow py-1" href="index.html#features">Features</a>
                <a class="nav-item-glow py-1" href="store.html">Apps</a>
                <a class="nav-item-glow py-1" href="showcase.html">Showcase</a>
                <a class="nav-item-glow py-1" href="docs.html">Docs</a>
            </div>
            <div class="nav-right relative flex items-center gap-2 flex-shrink-0">
                <button type="button" id="navMenuToggle" class="sm:hidden p-2 rounded-full text-slate-400 hover:text-primary hover:bg-white/5 transition-colors" aria-label="Menu">
                    <span class="material-symbols-outlined text-[20px] sm:text-[22px]">menu</span>
                </button>
                <a href="account.html" class="nav-account flex items-center gap-1.5 bg-primary text-background-dark px-[0.9rem] sm:px-[1.375rem] py-[0.45rem] sm:py-[0.55rem] rounded-full text-[0.9rem] sm:text-[0.96rem] font-bold hover:brightness-110 transition-all no-underline shadow-[0_0_15px_rgba(59,216,216,0.3)]">
                    <span class="material-symbols-outlined nav-account-icon text-[16px] sm:text-[18px]">person</span>
                    <span class="nav-account-label hidden sm:inline" data-i18n="nav.account">My Account</span>
                    <span class="material-symbols-outlined nav-account-chevron text-[14px] sm:text-[15px] hidden sm:inline">chevron_right</span>
                </a>
            </div>
        </div>
        <div id="navMobileMenu" class="sm:hidden absolute bottom-full left-4 right-4 mb-2 glass-nav rounded-2xl p-3 shadow-2xl hidden flex-col border border-white/10">
            <a class="px-4 py-2.5 rounded-xl text-sm nav-item-glow hover:bg-white/5" href="index.html#features">Features</a>
            <a class="px-4 py-2.5 rounded-xl text-sm nav-item-glow hover:bg-white/5" href="store.html">Apps</a>
            <a class="px-4 py-2.5 rounded-xl text-sm nav-item-glow hover:bg-white/5" href="showcase.html">Showcase</a>
            <a class="px-4 py-2.5 rounded-xl text-sm nav-item-glow hover:bg-white/5" href="docs.html">Docs</a>
        </div>
    </nav>
    `;

    container.innerHTML = navHTML;

    // Re-bind eventos del menú móvil
    const toggle = document.getElementById('navMenuToggle');
    const menu = document.getElementById('navMobileMenu');
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
        });
        menu.querySelectorAll('a').forEach(function(a) {
            a.addEventListener('click', function() {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
            });
        });
    }

    // Disparar evento personalizado por si auth.js u otros necesitan saber que la navbar ya está lista
    document.dispatchEvent(new Event('vui-navbar-loaded'));
}

function injectFooter() {
    const container = document.getElementById('vui-footer-container');
    if (!container) return;

    const footerHTML = `
    <footer class="border-t border-white/5 py-6 px-6 mt-12 w-full relative z-10">
        <div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-medium gap-4">
            <span class="text-slate-500">© 2026 VUI Framework. All rights reserved.</span>
            <div class="flex flex-wrap justify-center gap-4 md:gap-6">
                <a class="text-slate-500 hover:text-primary transition-colors flex items-center gap-1" href="store.html">Apps</a>
                <a class="text-slate-500 hover:text-primary transition-colors flex items-center gap-1" href="https://x.com/AgoraDevStudio" target="_blank" rel="noopener">X (Twitter)</a>
                <a class="text-slate-500 hover:text-primary transition-colors flex items-center gap-1" href="https://discord.gg/visionui" target="_blank" rel="noopener">Discord</a>
                <a class="text-slate-500 hover:text-primary transition-colors flex items-center gap-1" href="docs.html">Docs</a>
                <a class="text-slate-500 hover:text-primary transition-colors flex items-center gap-1" href="privacy.html">Privacy</a>
                <a class="text-slate-500 hover:text-primary transition-colors flex items-center gap-1" href="terms.html">Terms</a>
            </div>
        </div>
    </footer>
    `;

    container.innerHTML = footerHTML;
}
