/**
 * VisionUI Web Analytics
 * Tracking ligero para entender el interés de usuarios
 */
(function() {
  'use strict';
  
  const API_URL = 'https://admin.visionui.app/api/track';
  
  // Generar o recuperar session ID
  function getSessionId() {
    let sid = sessionStorage.getItem('vui_session');
    if (!sid) {
      sid = 'ses_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('vui_session', sid);
    }
    return sid;
  }
  
  // Tiempo de inicio de sesión
  const sessionStart = Date.now();
  let pageViewCount = 0;
  
  // Enviar evento al servidor
  function track(event, detail = null) {
    const data = {
      event: event,
      page: window.location.pathname,
      detail: detail,
      referrer: document.referrer || null,
      session_id: getSessionId()
    };
    
    // Usar sendBeacon si está disponible (mejor para eventos de salida)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(API_URL, JSON.stringify(data));
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true
      }).catch(() => {}); // Ignorar errores silenciosamente
    }
  }
  
  // Track page view
  function trackPageView() {
    pageViewCount++;
    track('page_view');
  }
  
  // Track session end con duración
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
  
  // Auto-tracking de clicks en elementos importantes
  function setupClickTracking() {
    document.addEventListener('click', function(e) {
      const target = e.target.closest('a, button');
      if (!target) return;
      
      const href = target.getAttribute('href') || '';
      const text = target.textContent?.trim().toLowerCase() || '';
      const classList = target.className?.toLowerCase() || '';
      
      // Click en link de Apps/Store
      if (href.includes('store') || href.includes('apps') || text.includes('apps') || text.includes('tienda')) {
        track('apps_click', text || href);
      }
      
      // Click en Download
      else if (href.includes('download') || text.includes('descargar') || text.includes('download')) {
        const isFramework = text.includes('framework') || text.includes('visionui') || href.includes('framework');
        track('download', isFramework ? 'framework' : (text || href));
      }
      
      // Click en Comprar/Buy
      else if (text.includes('comprar') || text.includes('buy') || text.includes('purchase') || classList.includes('purchase')) {
        track('checkout_started', text || 'purchase_button');
      }
      
      // Click en botón de login/register
      else if (text.includes('iniciar sesión') || text.includes('login') || text.includes('registr') || text.includes('crear cuenta')) {
        const isRegister = text.includes('registr') || text.includes('crear');
        track(isRegister ? 'registration_click' : 'login_click', text);
      }
      
      // Cualquier otro botón importante
      else if (target.tagName === 'BUTTON' && (classList.includes('primary') || classList.includes('cta'))) {
        track('button_click', text || 'cta_button');
      }
    });
  }
  
  // Detectar cuando user completa registro o login (escuchar eventos custom)
  function setupAuthTracking() {
    // Escuchar eventos de auth exitoso
    window.addEventListener('vui:registration', function(e) {
      track('registration', e.detail?.email || 'unknown');
    });
    
    window.addEventListener('vui:login', function(e) {
      track('login', e.detail?.email || 'unknown');
    });
    
    // También detectar por URL si llega a página de éxito
    if (window.location.pathname.includes('post-purchase') || 
        window.location.pathname.includes('purchase-success') ||
        window.location.search.includes('success')) {
      track('purchase_complete', window.location.search);
    }
  }
  
  // Tracking de scroll (para medir engagement)
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
  
  // Inicializar
  function init() {
    // Track page view
    trackPageView();
    
    // Setup trackers
    setupClickTracking();
    setupAuthTracking();
    setupScrollTracking();
    
    // Track session end on page unload
    window.addEventListener('beforeunload', trackSessionEnd);
    window.addEventListener('pagehide', trackSessionEnd);
    
    // También para SPA navigation (si se usa)
    window.addEventListener('popstate', trackPageView);
  }
  
  // Exponer funciones para uso manual si se necesita
  window.VUIAnalytics = {
    track: track,
    trackPageView: trackPageView
  };
  
  // Iniciar cuando DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
