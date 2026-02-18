/**
 * VisionUI Web Analytics
 * Lightweight tracking to understand user interest
 */
(function() {
  'use strict';
  
  const API_URL = 'https://admin.visionui.app/api/track';
  
  function getSessionId() {
    let sid = sessionStorage.getItem('vui_session');
    if (!sid) {
      sid = 'ses_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('vui_session', sid);
    }
    return sid;
  }
  
  const sessionStart = Date.now();
  let pageViewCount = 0;
  
  function track(event, detail = null) {
    const data = {
      event: event,
      page: window.location.pathname,
      detail: detail,
      referrer: document.referrer || null,
      session_id: getSessionId()
    };
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon(API_URL, JSON.stringify(data));
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true
      }).catch(() => {});
    }
  }
  
  function trackPageView() {
    pageViewCount++;
    track('page_view');
  }
  
  function trackSessionEnd() {
    const duration = Math.round((Date.now() - sessionStart) / 1000);
    const data = {
      event: 'session_end',
      page: window.location.pathname,
      session_id: getSessionId(),
      duration: duration
    };
    if (navigator.sendBeacon) {
      navigator.sendBeacon(API_URL, JSON.stringify(data));
    }
  }
  
  function setupClickTracking() {
    document.addEventListener('click', function(e) {
      const target = e.target.closest('a, button');
      if (!target) return;
      
      const href = target.getAttribute('href') || '';
      const text = target.textContent?.trim().toLowerCase() || '';
      const classList = target.className?.toLowerCase() || '';
      
      if (href.includes('store') || href.includes('apps') || text.includes('apps')) {
        track('apps_click', text || href);
      } else if (href.includes('download') || text.includes('download')) {
        const isFramework = text.includes('framework') || text.includes('visionui') || href.includes('framework');
        track('download', isFramework ? 'framework' : (text || href));
      } else if (text.includes('buy') || text.includes('purchase') || classList.includes('purchase')) {
        track('checkout_started', text || 'purchase_button');
      } else if (text.includes('login') || text.includes('sign in') || text.includes('register') || text.includes('create account')) {
        const isRegister = text.includes('register') || text.includes('create');
        track(isRegister ? 'registration_click' : 'login_click', text);
      } else if (target.tagName === 'BUTTON' && (classList.includes('primary') || classList.includes('cta'))) {
        track('button_click', text || 'cta_button');
      }
    });
  }
  
  function setupAuthTracking() {
    window.addEventListener('vui:registration', function(e) {
      track('registration', e.detail?.email || 'unknown');
    });
    window.addEventListener('vui:login', function(e) {
      track('login', e.detail?.email || 'unknown');
    });
    if (window.location.pathname.includes('post-purchase') || 
        window.location.pathname.includes('purchase-success') ||
        window.location.search.includes('success')) {
      track('purchase_complete', window.location.search);
    }
  }
  
  let maxScroll = 0;
  function setupScrollTracking() {
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll && scrollPercent >= 50 && scrollPercent % 25 === 0) {
          maxScroll = scrollPercent;
          track('scroll_depth', scrollPercent + '%');
        }
      }, 200);
    });
  }
  
  function init() {
    trackPageView();
    setupClickTracking();
    setupAuthTracking();
    setupScrollTracking();
    window.addEventListener('beforeunload', trackSessionEnd);
    window.addEventListener('pagehide', trackSessionEnd);
    window.addEventListener('popstate', trackPageView);
  }
  
  window.VUIAnalytics = { track, trackPageView };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
