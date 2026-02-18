/**
 * VisionUI Website configuration
 *
 * Central place to set external URLs without editing HTML.
 * Keep values empty ("") to disable optional links.
 */

/**
 * Google OAuth Client ID for "Continue with Google".
 * 
 * HOW TO CONFIGURE:
 * ═══════════════════════════════════════════════════════════════════════════
 * 1. Go to: https://console.cloud.google.com/apis/credentials
 * 2. Create a new OAuth 2.0 Client ID (Web application)
 * 3. Add these Authorized JavaScript origins:
 *    - https://visionui.app
 *    - https://www.visionui.app
 *    - http://127.0.0.1:4173 (for local testing)
 * 4. Add these Authorized redirect URIs:
 *    - https://visionui.app/account.html
 *    - https://www.visionui.app/account.html
 *    - http://127.0.0.1:4173/account.html
 * 5. Copy the Client ID and paste it below
 * 6. In Cloudflare Worker, set environment variable: GOOGLE_CLIENT_ID
 * 
 * Note: Leave empty ("") to disable Google Sign In feature
 * ═══════════════════════════════════════════════════════════════════════════
 */
window.VISIONUI_GOOGLE_CLIENT_ID = '932063872431-imfkm3onl3fsajddleq2do4djjn1gfau.apps.googleusercontent.com';

window.VISIONUI_LINKS = {
    demoDownloadUrl: 'store.html',
    demoVideoUrl: '',

    websiteUrl: 'https://visionui.app',
    discordUrl: 'https://discord.gg/visionui',

    xUrl: '',
    youtubeUrl: '',
    tiktokUrl: '',
    githubUrl: ''
};
