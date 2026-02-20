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

    const navHTML = `
    <nav class="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[52.8rem] px-4" style="visibility: visible; opacity: 1;">
        <div class="glass-nav glass-navbar glass-pill rounded-full px-[1.65rem] py-[0.825rem] flex items-center justify-between shadow-2xl">
            <a href="index.html" class="flex items-center gap-2 no-underline flex-shrink-0">
                <div class="text-primary">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fill-rule="evenodd"></path>
                    </svg>
                </div>
                <span class="font-bold tracking-tight text-white text-[0.96rem] sm:text-[1.1rem]">VisionUI</span>
            </a>
            <div id="navLinks" class="hidden sm:flex items-center gap-4 md:gap-5 text-[0.96rem] font-medium">
                <a class="nav-item-glow py-1" href="index.html#features">Features</a>
                <a class="nav-item-glow py-1" href="store.html">Apps</a>
                <a class="nav-item-glow py-1" href="showcase.html">Showcase</a>
                <a class="nav-item-glow py-1" href="docs.html">Docs</a>
            </div>
            <div class="nav-right relative flex items-center gap-2 flex-shrink-0">
                <button type="button" id="navMenuToggle" class="sm:hidden p-2 rounded-full text-slate-400 hover:text-primary hover:bg-white/5 transition-colors" aria-label="Menu">
                    <span class="material-symbols-outlined text-[22px]">menu</span>
                </button>
                <a href="account.html" class="nav-account flex items-center gap-1.5 bg-primary text-background-dark px-[1.1rem] py-[0.55rem] sm:px-[1.375rem] rounded-full text-[0.96rem] font-bold hover:brightness-110 transition-all no-underline shadow-[0_0_15px_rgba(59,216,216,0.3)]">
                    <span class="material-symbols-outlined nav-account-icon text-[18px]">person</span>
                    <span class="nav-account-label" data-i18n="nav.account">My Account</span>
                    <span class="material-symbols-outlined nav-account-chevron text-[14px] sm:text-[15px]">chevron_right</span>
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
