/**
 * VisionUI Advertising Module
 * Non-invasive ad integration with AdSense support
 * 
 * SETUP:
 * 1. Create a Google AdSense account: https://www.google.com/adsense/
 * 2. Add your domain and get approval
 * 3. Replace 'ca-pub-XXXXXXXXXX' with your actual publisher ID
 * 4. Create ad units in AdSense and get slot IDs
 * 
 * Note: Ads won't show until your AdSense account is approved
 */

const ADS_CONFIG = {
    // Your AdSense Publisher ID
    PUBLISHER_ID: 'ca-pub-4576543194506330',
    
    // Enable/disable ads globally
    ENABLED: true,
    
    // Ad positions (conservative config for professional site)
    POSITIONS: {
        HEADER_BANNER: false,     // Disabled - let Auto Ads handle placement
        SIDEBAR: true,            // Sidebar ads (300x250)
        IN_CONTENT: false,        // Disabled - Auto Ads does this better
        FOOTER_BANNER: true       // Bottom banner
    },
    
    // Test mode (shows placeholder ads)
    TEST_MODE: false,
    
    // Minimum content height before showing in-content ads
    MIN_CONTENT_HEIGHT: 2000,
    
    // Pages where ads should NOT appear (premium/checkout experience)
    EXCLUDED_PAGES: [
        '/pages/account.html',
        '/pages/store.html',
        '/pages/post-purchase.html',
        '/pages/setup-account.html',
        '/pages/purchase-success.html',
        '/pages/claim-license.html',
        '/pages/reset-password.html'
    ]
};

/**
 * Ads Manager
 */
const VUIAds = {
    initialized: false,
    
    // Check if current page should show ads
    shouldShowAds() {
        const currentPath = window.location.pathname;
        for (const excluded of ADS_CONFIG.EXCLUDED_PAGES) {
            if (currentPath.includes(excluded.replace('/pages/', ''))) {
                return false;
            }
        }
        return true;
    },
    
    // Initialize ads
    init() {
        if (this.initialized || !ADS_CONFIG.ENABLED) return;
        
        // Don't show ads on excluded pages
        if (!this.shouldShowAds()) return;
        
        // Don't show ads to users with licenses (premium experience)
        if (window.VUIAuth && VUIAuth.isLoggedIn()) {
            const user = VUIAuth.getUser();
            if (user?.has_license) {
                console.log('Ads disabled for premium users');
                return;
            }
        }
        
        this.loadAdSense();
        this.initialized = true;
    },
    
    // Load AdSense script
    loadAdSense() {
        if (document.getElementById('adsense-script')) return;
        
        const script = document.createElement('script');
        script.id = 'adsense-script';
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CONFIG.PUBLISHER_ID}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    },
    
    // Create an ad unit
    createAdUnit(type, container) {
        if (!ADS_CONFIG.ENABLED && !ADS_CONFIG.TEST_MODE) return;
        
        const adConfigs = {
            'banner-header': {
                format: 'auto',
                fullWidth: true,
                style: 'display:block',
                slot: 'XXXXXXXXXX' // Replace with your slot ID
            },
            'banner-footer': {
                format: 'auto',
                fullWidth: true,
                style: 'display:block',
                slot: 'XXXXXXXXXX'
            },
            'sidebar': {
                format: 'rectangle',
                style: 'display:inline-block;width:300px;height:250px',
                slot: 'XXXXXXXXXX'
            },
            'in-content': {
                format: 'fluid',
                layout: 'in-article',
                style: 'display:block;text-align:center',
                slot: 'XXXXXXXXXX'
            }
        };
        
        const config = adConfigs[type];
        if (!config) return;
        
        if (ADS_CONFIG.TEST_MODE) {
            // Show placeholder in test mode
            this.createPlaceholder(type, container);
            return;
        }
        
        const adContainer = document.createElement('div');
        adContainer.className = `vui-ad vui-ad-${type}`;
        adContainer.innerHTML = `
            <ins class="adsbygoogle"
                style="${config.style}"
                data-ad-client="${ADS_CONFIG.PUBLISHER_ID}"
                data-ad-slot="${config.slot}"
                ${config.format ? `data-ad-format="${config.format}"` : ''}
                ${config.fullWidth ? 'data-full-width-responsive="true"' : ''}
                ${config.layout ? `data-ad-layout="${config.layout}"` : ''}>
            </ins>
            <small class="ad-label">Publicidad</small>
        `;
        
        container.appendChild(adContainer);
        
        // Push ad
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    },
    
    // Create placeholder for test mode
    createPlaceholder(type, container) {
        const sizes = {
            'banner-header': { width: '100%', height: '90px' },
            'banner-footer': { width: '100%', height: '90px' },
            'sidebar': { width: '300px', height: '250px' },
            'in-content': { width: '100%', height: '280px' }
        };
        
        const size = sizes[type] || { width: '300px', height: '250px' };
        
        const placeholder = document.createElement('div');
        placeholder.className = `vui-ad-placeholder vui-ad-${type}`;
        placeholder.style.cssText = `
            width: ${size.width};
            height: ${size.height};
            background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(236, 72, 153, 0.1));
            border: 2px dashed rgba(124, 58, 237, 0.3);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(124, 58, 237, 0.5);
            font-size: 0.875rem;
            margin: 1rem auto;
            max-width: 100%;
        `;
        placeholder.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📢</div>
                <div>Ad Placeholder (${type})</div>
                <div style="font-size: 0.75rem; opacity: 0.7;">Test Mode</div>
            </div>
        `;
        
        container.appendChild(placeholder);
    },
    
    // Auto-inject ads into page
    autoInject() {
        if (!ADS_CONFIG.ENABLED && !ADS_CONFIG.TEST_MODE) return;
        
        // Header banner
        if (ADS_CONFIG.POSITIONS.HEADER_BANNER) {
            const header = document.querySelector('.hero, header, main');
            if (header) {
                const adWrapper = document.createElement('div');
                adWrapper.className = 'ad-wrapper ad-header';
                adWrapper.style.cssText = 'padding: 0.5rem 0; background: rgba(0,0,0,0.2); text-align: center;';
                header.parentElement.insertBefore(adWrapper, header);
                this.createAdUnit('banner-header', adWrapper);
            }
        }
        
        // In-content ads (between sections)
        if (ADS_CONFIG.POSITIONS.IN_CONTENT) {
            const sections = document.querySelectorAll('section');
            if (sections.length > 2 && document.body.scrollHeight > ADS_CONFIG.MIN_CONTENT_HEIGHT) {
                const midIndex = Math.floor(sections.length / 2);
                const adWrapper = document.createElement('div');
                adWrapper.className = 'ad-wrapper ad-in-content';
                adWrapper.style.cssText = 'padding: 2rem 0; max-width: 728px; margin: 0 auto;';
                sections[midIndex].parentElement.insertBefore(adWrapper, sections[midIndex]);
                this.createAdUnit('in-content', adWrapper);
            }
        }
        
        // Footer banner
        if (ADS_CONFIG.POSITIONS.FOOTER_BANNER) {
            const footer = document.querySelector('footer');
            if (footer) {
                const adWrapper = document.createElement('div');
                adWrapper.className = 'ad-wrapper ad-footer';
                adWrapper.style.cssText = 'padding: 1rem 0; background: rgba(0,0,0,0.2); text-align: center;';
                footer.parentElement.insertBefore(adWrapper, footer);
                this.createAdUnit('banner-footer', adWrapper);
            }
        }
    }
};

// Add styles
const adStyles = document.createElement('style');
adStyles.textContent = `
    .vui-ad {
        position: relative;
        margin: 1rem 0;
    }
    
    .vui-ad .ad-label {
        position: absolute;
        top: 4px;
        left: 4px;
        font-size: 0.6rem;
        color: #999;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    .ad-wrapper {
        clear: both;
    }
    
    /* Hide ads on small screens if too intrusive */
    @media (max-width: 480px) {
        .ad-header, .ad-footer {
            display: none;
        }
    }
`;
document.head.appendChild(adStyles);

// Auto-init after page load
window.addEventListener('load', () => {
    // Delay ad injection for better UX
    setTimeout(() => {
        VUIAds.init();
        VUIAds.autoInject();
    }, 2000);
});

// Export
window.VUIAds = VUIAds;
