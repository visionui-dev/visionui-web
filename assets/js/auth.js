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
                // Update stored user data with latest info
                this.saveSession(session.token, {
                    email: data.email,
                    name: data.name,
                    has_license: data.has_active_license,
                    license_type: data.licenses?.[0]?.app,
                    email_verified: data.email_verified
                });
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
                license_type: data.license_type,
                email_verified: data.email_verified
            });
            return { success: true, user: data };
        }

        return { success: false, error: data.error || 'Login failed' };
    },

    // Login with Google (credential = JWT from Google Identity)
    async loginWithGoogle(credential) {
        const response = await fetch(`${AUTH_CONFIG.API_BASE}/api/user/google-auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential })
        });

        const data = await response.json();

        if (data.success && (data.session_token || data.token)) {
            const token = data.session_token || data.token;
            this.saveSession(token, {
                email: data.email,
                name: data.name,
                has_license: data.has_license,
                license_type: data.license_type,
                email_verified: data.email_verified ?? true
            });
            return { success: true, user: data };
        }

        return { success: false, error: data.error || 'Google sign-in failed' };
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
    },

    // Request password reset
    async forgotPassword(email) {
        try {
            const response = await fetch(`${AUTH_CONFIG.API_BASE}/api/user/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            return data;
        } catch (e) {
            console.error('Forgot password error:', e);
            return { success: false, error: 'Connection error' };
        }
    },

    // Reset password with token
    async resetPassword(token, password) {
        try {
            const response = await fetch(`${AUTH_CONFIG.API_BASE}/api/user/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password })
            });

            const data = await response.json();
            return data;
        } catch (e) {
            console.error('Reset password error:', e);
            return { success: false, error: 'Connection error' };
        }
    },

    // Validate reset token
    async validateResetToken(token) {
        try {
            const response = await fetch(`${AUTH_CONFIG.API_BASE}/api/user/validate-reset-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });

            const data = await response.json();
            return data;
        } catch (e) {
            console.error('Validate reset token error:', e);
            return { valid: false, error: 'Connection error' };
        }
    },

    // Google OAuth Sign In
    async loginWithGoogle(credential) {
        try {
            const response = await fetch(`${AUTH_CONFIG.API_BASE}/api/user/google-signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token && data.user) {
                    this.saveSession(data.token, {
                        email: data.user.email,
                        name: data.user.name,
                        has_license: data.user.has_active_license,
                        license_type: data.user.licenses?.[0]?.app,
                        email_verified: data.user.email_verified,
                        is_oauth: true
                    });
                    return { success: true, user: data.user };
                }
            }
            
            const errorData = await response.json();
            return { success: false, error: errorData.message || 'Google sign-in failed' };
        } catch (e) {
            console.error('Google sign-in error:', e);
            return { success: false, error: 'Connection error' };
        }
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

        const ensureStructuredButton = () => {
            let iconEl = navAccount.querySelector('.nav-account-icon');
            let labelEl = navAccount.querySelector('.nav-account-label');
            let chevronEl = navAccount.querySelector('.nav-account-chevron');

            if (!iconEl || !labelEl || !chevronEl) {
                navAccount.innerHTML = `
                    <span class="material-symbols-outlined nav-account-icon text-[18px]">person</span>
                    <span class="nav-account-label" data-i18n="nav.account">My Account</span>
                    <span class="material-symbols-outlined nav-account-chevron text-[14px] sm:text-[15px]">chevron_right</span>
                `;
                iconEl = navAccount.querySelector('.nav-account-icon');
                labelEl = navAccount.querySelector('.nav-account-label');
                chevronEl = navAccount.querySelector('.nav-account-chevron');
            }

            return { iconEl, labelEl, chevronEl };
        };

        const { iconEl, labelEl, chevronEl } = ensureStructuredButton();
        
        if (user) {
            // Logged in
            if (iconEl) iconEl.textContent = 'person';
            if (labelEl) {
                labelEl.classList.add('user-email');
                labelEl.removeAttribute('data-i18n');
                labelEl.textContent = user.email.split('@')[0];
            }
            if (chevronEl) chevronEl.classList.add('hidden');
            navAccount.classList.add('logged-in');
            navAccount.title = `Logged in as ${user.email}`;
        } else {
            // Not logged in - use i18n text
            if (iconEl) iconEl.textContent = 'person';
            if (labelEl) {
                labelEl.classList.remove('user-email');
                labelEl.setAttribute('data-i18n', 'nav.account');
                labelEl.textContent = 'My Account';
            }
            if (chevronEl) chevronEl.classList.remove('hidden');
            navAccount.classList.remove('logged-in');
            navAccount.title = 'Login / Register';
            
            // Re-apply i18n translations if available
            if (typeof VUIi18n !== 'undefined' && VUIi18n.updatePage) {
                VUIi18n.updatePage();
            }
        }
    },

    // Create user dropdown menu
    createUserDropdown() {
        const navAccount = document.querySelector('.nav-account');
        if (!navAccount || !VUIAuth.isLoggedIn()) return;

        // Check if dropdown already exists
        if (document.querySelector('.user-dropdown')) return;

        const user = VUIAuth.getUser();
        // Use root-level paths (no more pages/ folder)
        const accountPath = 'account.html';
        const storePath = 'store.html';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'user-dropdown';
        dropdown.innerHTML = `
            <div class="dropdown-header">
                <div class="user-avatar">${user.email.charAt(0).toUpperCase()}</div>
                <div class="user-info">
                    <div class="user-name">${user.email}</div>
                    <div class="user-status" data-i18n="${user.has_license ? 'auth.license_active' : 'auth.no_licenses'}">${user.has_license ? '✓ Active license' : 'No license'}</div>
                </div>
            </div>
            <div class="dropdown-divider"></div>
            <a href="${accountPath}" class="dropdown-item">
                <span class="material-symbols-outlined" style="font-size:16px;line-height:1;">manage_accounts</span>
                <span data-i18n="nav.account">My Account</span>
            </a>
            <a href="${storePath}" class="dropdown-item">
                <span class="material-symbols-outlined" style="font-size:16px;line-height:1;">apps</span>
                <span data-i18n="nav.store">Apps</span>
            </a>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item logout-btn" onclick="VUIAuthUI.handleLogout()">
                <span class="material-symbols-outlined" style="font-size:16px;line-height:1;">logout</span>
                <span data-i18n="auth.logout">Sign out</span>
            </button>
        `;

        // Add dropdown to the nav-right container if it exists, otherwise to parent
        const navRight = document.querySelector('.nav-right');
        if (navRight) {
            navRight.appendChild(dropdown);
        } else {
            navAccount.parentElement.appendChild(dropdown);
        }

        // Toggle on click
        navAccount.addEventListener('click', (e) => {
            if (VUIAuth.isLoggedIn()) {
                e.preventDefault();
                dropdown.classList.toggle('show');
            }
        });

        // Show on hover
        navAccount.addEventListener('mouseenter', () => {
            if (VUIAuth.isLoggedIn()) {
                dropdown.classList.add('show');
            }
        });

        // Hide when mouse leaves both the account link and dropdown
        let hideTimeout;
        const hideDropdown = () => {
            hideTimeout = setTimeout(() => {
                dropdown.classList.remove('show');
            }, 200);
        };
        
        const cancelHide = () => {
            clearTimeout(hideTimeout);
        };
        
        navAccount.addEventListener('mouseleave', hideDropdown);
        dropdown.addEventListener('mouseenter', cancelHide);
        dropdown.addEventListener('mouseleave', hideDropdown);

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
            window.location.href = 'index.html';
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
