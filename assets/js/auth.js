/**
 * VisionUI Web Authentication Module
 * Handles user session state across all pages
 */

const AUTH_CONFIG = {
    API_BASE: 'https://admin.visionui.app',
    SESSION_KEY: 'visionui_session',
    USER_KEY: 'visionui_user'
};

/**
 * Auth state management
 */
const VUIAuth = {
    // Get stored session
    getSession() {
        try {
            const session = localStorage.getItem(AUTH_CONFIG.SESSION_KEY);
            const user = localStorage.getItem(AUTH_CONFIG.USER_KEY);
            if (session && user) {
                return {
                    token: session,
                    user: JSON.parse(user)
                };
            }
        } catch (e) {
            console.error('Error reading session:', e);
        }
        return null;
    },

    // Save session
    saveSession(token, user) {
        localStorage.setItem(AUTH_CONFIG.SESSION_KEY, token);
        localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(user));
    },

    // Clear session
    clearSession() {
        localStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
        localStorage.removeItem(AUTH_CONFIG.USER_KEY);
    },

    // Check if logged in
    isLoggedIn() {
        return !!this.getSession();
    },

    // Get current user
    getUser() {
        const session = this.getSession();
        return session?.user || null;
    },

    // Validate session with backend
    async validateSession() {
        const session = this.getSession();
        if (!session) return false;

        try {
            const response = await fetch(`${AUTH_CONFIG.API_BASE}/api/user/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Update stored user data
                this.saveSession(session.token, data.user);
                return true;
            } else {
                // Session invalid
                this.clearSession();
                return false;
            }
        } catch (e) {
            console.error('Session validation error:', e);
            return false;
        }
    },

    // Login
    async login(email, password) {
        const response = await fetch(`${AUTH_CONFIG.API_BASE}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        // Accept both 'token' and 'session_token' for compatibility
        const token = data.session_token || data.token;
        
        if (data.success && token) {
            this.saveSession(token, {
                email: data.email,
                name: data.name,
                has_license: data.has_license,
                license_type: data.license_type
            });
            return { success: true, user: data };
        }

        return { success: false, error: data.error || 'Login failed' };
    },

    // Register
    async register(email, password, name = '') {
        const response = await fetch(`${AUTH_CONFIG.API_BASE}/api/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        });

        const data = await response.json();

        // Accept both 'token' and 'session_token' for compatibility
        const token = data.session_token || data.token;
        
        if (data.success && token) {
            this.saveSession(token, {
                email: data.email,
                name: data.name,
                has_license: false
            });
            return { success: true, user: data };
        }

        return { success: false, error: data.error || 'Registration failed' };
    },

    // Logout
    async logout() {
        const session = this.getSession();
        if (session) {
            try {
                await fetch(`${AUTH_CONFIG.API_BASE}/api/user/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${session.token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } catch (e) {
                console.error('Logout error:', e);
            }
        }
        this.clearSession();
    }
};

/**
 * UI Components for auth state
 */
const VUIAuthUI = {
    // Update navbar with auth state
    updateNavbar() {
        const navAccount = document.querySelector('.nav-account');
        if (!navAccount) return;

        const user = VUIAuth.getUser();
        
        if (user) {
            // Logged in
            navAccount.innerHTML = `
                <span class="user-email">${user.email.split('@')[0]}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            `;
            navAccount.classList.add('logged-in');
            navAccount.title = `Logged in as ${user.email}`;
        } else {
            // Not logged in
            navAccount.innerHTML = `
                👤 <span>Mi Cuenta</span>
            `;
            navAccount.classList.remove('logged-in');
            navAccount.title = 'Login / Register';
        }
    },

    // Create user dropdown menu
    createUserDropdown() {
        const navAccount = document.querySelector('.nav-account');
        if (!navAccount || !VUIAuth.isLoggedIn()) return;

        // Check if dropdown already exists
        if (document.querySelector('.user-dropdown')) return;

        const user = VUIAuth.getUser();
        const dropdown = document.createElement('div');
        dropdown.className = 'user-dropdown';
        dropdown.innerHTML = `
            <div class="dropdown-header">
                <div class="user-avatar">${user.email.charAt(0).toUpperCase()}</div>
                <div class="user-info">
                    <div class="user-name">${user.email}</div>
                    <div class="user-status">${user.has_license ? '✓ Licencia activa' : 'Sin licencia'}</div>
                </div>
            </div>
            <div class="dropdown-divider"></div>
            <a href="pages/account.html" class="dropdown-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Mi Cuenta
            </a>
            <a href="pages/store.html" class="dropdown-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Tienda
            </a>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item logout-btn" onclick="VUIAuthUI.handleLogout()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Cerrar Sesión
            </button>
        `;

        navAccount.parentElement.appendChild(dropdown);

        // Toggle on click
        navAccount.addEventListener('click', (e) => {
            if (VUIAuth.isLoggedIn()) {
                e.preventDefault();
                dropdown.classList.toggle('show');
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navAccount.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    },

    // Handle logout
    async handleLogout() {
        await VUIAuth.logout();
        this.updateNavbar();
        // Redirect to home if on protected page
        if (window.location.pathname.includes('account')) {
            window.location.href = '../index.html';
        } else {
            window.location.reload();
        }
    },

    // Initialize auth UI
    init() {
        this.updateNavbar();
        if (VUIAuth.isLoggedIn()) {
            this.createUserDropdown();
            // Validate session in background
            VUIAuth.validateSession().then(valid => {
                if (!valid) {
                    this.updateNavbar();
                }
            });
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => VUIAuthUI.init());
} else {
    VUIAuthUI.init();
}

// Export for use in other scripts
window.VUIAuth = VUIAuth;
window.VUIAuthUI = VUIAuthUI;
