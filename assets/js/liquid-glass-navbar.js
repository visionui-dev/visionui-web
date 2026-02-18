/**
 * Liquid Glass style for Navbar
 *
 * True refraction (like https://imadr.me/liquid-glass/) uses WebGL shaders and
 * runs on the GPU; it is not achievable with CSS backdrop-filter because
 * backdrop-filter: url(#svgFilter) does not work for SVG filters in any major
 * browser (Chrome, Firefox, Safari). So we apply a strong glass look with
 * blur + specular + gradients that works everywhere.
 */

(function () {
  "use strict";

  function init() {
    var nav =
      document.querySelector(".liquid-glass-nav") ||
      document.querySelector(".glass-navbar") ||
      document.querySelector(".glass-nav");
    if (!nav) return;

    // Specular overlay (rim light)
    var specular = document.createElement("div");
    specular.className = "lg-specular";
    specular.style.cssText =
      "position:absolute;inset:0;pointer-events:none;z-index:1;border-radius:inherit;" +
      "background:linear-gradient(180deg,rgba(255,255,255,0.12) 0%,rgba(255,255,255,0.03) 40%,transparent 70%);" +
      "box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),inset 0 -1px 0 rgba(255,255,255,0.06);";
    nav.insertBefore(specular, nav.firstChild);

    nav.style.position = nav.style.position || "relative";
    nav.style.background = "rgba(26, 26, 26, 0.7)";
    nav.style.border = "1px solid rgba(255, 255, 255, 0.1)";
    nav.style.borderBottom = nav.style.border;
    // Stitch-style glass: blur 12px (same as VisionUI Web Rebrand landing)
    nav.style.backdropFilter =
      "blur(12px) saturate(160%) contrast(1.08) brightness(1.04)";
    nav.style.webkitBackdropFilter = nav.style.backdropFilter;
    nav.style.boxShadow =
      "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)";

    function onScroll() {
      if (window.scrollY > 60) {
        nav.classList.add("scrolled");
        nav.style.background = "rgba(18, 18, 20, 0.8)";
      } else {
        nav.classList.remove("scrolled");
        nav.style.background = "rgba(26, 26, 26, 0.7)";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
