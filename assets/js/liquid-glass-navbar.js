/**
 * VisionUI Web - Liquid Glass Navbar
 * Efecto Apple Liquid Glass Avanzado (SVG nativo 100%)
 * - Blur interno (antes de la refracción para mantener el borde nítido)
 * - Refracción Snell 3D con Aberración Cromática Sutil
 * - Bisel Especular Dinámico integrado en un solo mapa (Canal B)
 */
(function () {
  "use strict";

  function buildMaps(canvas, W, H) {
    var ctx = canvas.getContext("2d", { willReadFrequently: true });
    var imgData = ctx.createImageData(W, H);
    var data = imgData.data;

    var R = H / 2;
    var hw = Math.max(0, W / 2 - R);

    // SDF exacto
    function sdf(px, py) {
      var qx = Math.abs(px - W / 2) - hw;
      var qy = Math.abs(py - H / 2);
      if (qx < 0) return qy - R;
      return Math.sqrt(qx * qx + qy * qy) - R;
    }

    // Grosor de la superficie de distorsión (incrementado un 35% respecto al 0.25 anterior)
    var glass_depth = Math.max(10, H * 0.34); 

    var idx = 0;
    for (var y = 0; y < H; y++) {
      for (var x = 0; x < W; x++) {
        var d = sdf(x, y);
        var dx = 0, dy = 0;
        var highlight = 0;

        if (d <= 0 && d > -glass_depth * 1.5) {
          // 2D Normal
          var eps = 1.0;
          var gx = sdf(x + eps, y) - sdf(x - eps, y);
          var gy = sdf(x, y + eps) - sdf(x, y - eps);
          var glis = Math.sqrt(gx * gx + gy * gy);
          if (glis > 0) { gx /= glis; gy /= glis; }

          // Perfil Z para curvar el borde
          var t = Math.min(1.0, Math.max(0.0, Math.abs(d) / glass_depth));
          var z_profile = t * t * (3 - 2 * t); 

          // 3D Normal
          var edge_w = 1.0 - z_profile;
          var nx = gx * edge_w;
          var ny = gy * edge_w;
          var nz = z_profile;

          var nlen = Math.sqrt(nx*nx + ny*ny + nz*nz);
          if (nlen > 0) { nx /= nlen; ny /= nlen; nz /= nlen; }

          // Ley de Snell (Refracción óptica)
          var ior = 1.52; 
          var eta = 1.0 / ior;
          var cosi = nz;
          var sin2t = eta * eta * (1.0 - cosi * cosi);
          var cost = Math.sqrt(Math.max(0.0, 1.0 - sin2t));
          var factor = eta * cosi - cost;
          
          var ref_x = factor * nx;
          var ref_y = factor * ny;
          var ref_z = factor * nz - eta;

          var ref_z_clamped = Math.max(0.05, -ref_z);
          dx = ref_x / ref_z_clamped;
          dy = ref_y / ref_z_clamped;

          dx = Math.max(-1.0, Math.min(1.0, dx));
          dy = Math.max(-1.0, Math.min(1.0, dy));

          // --- SISTEMA DE ILUMINACIÓN HÍBRIDO (Bisel uniforme + Especular direccional inteligente) ---
          // 1. Bisel base (Fresnel): Uniforme en todo el contorno, pero muy tenue
          var fresnel = Math.pow(1.0 - nz, 3.0); 

          // 2. Luz Especular Direccional: Viene desde arriba y ligeramente a la izquierda
          // (max(0, -ny) brilla arriba, max(0, -nx) brilla a la izquierda)
          var fakeLight = Math.max(0.0, -ny * 0.85 - nx * 0.35 + nz * 0.2);
          var spec = Math.pow(fakeLight, 4.0); 

          // Combinar ambos: Fresnel muy suave + Especular fuerte direccional
          // Reducido al 70% de su intensidad anterior como solicitaste.
          highlight = (fresnel * 0.028) + (fresnel * spec * 0.175); 
        }

        // R = X Distorsión, G = Y Distorsión, B = Bisel Highlight, A = 255
        data[idx] = Math.round((dx + 1.0) * 127.5);
        data[idx + 1] = Math.round((dy + 1.0) * 127.5);
        data[idx + 2] = Math.round(highlight * 255);
        data[idx + 3] = 255;

        idx += 4;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL();
  }

  function initNav(nav) {
    if (!nav || nav.dataset.liquidGlassInit) return;
    nav.dataset.liquidGlassInit = "true";

    var filterId = "vui-lg-" + Math.random().toString(36).substr(2, 9);
    var feMapId = "vui-lg-map-" + filterId;

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.cssText = "position:fixed;top:0;left:0;pointer-events:none;z-index:9998;";

    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", filterId);
    filter.setAttribute("filterUnits", "userSpaceOnUse");
    filter.setAttribute("color-interpolation-filters", "sRGB");
    filter.setAttribute("x", "0");
    filter.setAttribute("y", "0");

    var feImage = document.createElementNS("http://www.w3.org/2000/svg", "feImage");
    feImage.setAttribute("id", feMapId);
    feImage.setAttribute("result", "displacementMap");

    function createColorMatrix(inSrc, values, res) {
      var fe = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
      fe.setAttribute("in", inSrc);
      fe.setAttribute("type", "matrix");
      fe.setAttribute("values", values);
      if (res) fe.setAttribute("result", res);
      return fe;
    }

    function createDisp(inSrc, res) {
      var fe = document.createElementNS("http://www.w3.org/2000/svg", "feDisplacementMap");
      fe.setAttribute("in", inSrc);
      fe.setAttribute("in2", "displacementMap");
      fe.setAttribute("xChannelSelector", "R");
      fe.setAttribute("yChannelSelector", "G");
      fe.setAttribute("result", res);
      return fe;
    }

    function createBlend(in1, in2, res) {
      var fe = document.createElementNS("http://www.w3.org/2000/svg", "feBlend");
      fe.setAttribute("in", in1);
      fe.setAttribute("in2", in2);
      fe.setAttribute("mode", "lighten");
      if (res) fe.setAttribute("result", res);
      return fe;
    }

    // 1. Blur previo nativo (solo difumina el fondo, manteniendo nítida la distorsión del cristal posterior)
    var feBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    feBlur.setAttribute("in", "SourceGraphic");
    feBlur.setAttribute("stdDeviation", "1.0"); // Blur ajustado a 1.0 según lo solicitado
    feBlur.setAttribute("result", "BLUR");

    // 2. Extraer RGB del fondo desenfocado
    var matR = createColorMatrix("BLUR", "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0", "R_chan");
    var matG = createColorMatrix("BLUR", "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0", "G_chan");
    var matB = createColorMatrix("BLUR", "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0", "B_chan");

    // 3. Refracción de canales
    var dispR = createDisp("R_chan", "R_disp");
    var dispG = createDisp("G_chan", "G_disp");
    var dispB = createDisp("B_chan", "B_disp");

    // 4. Recombinar canales refractados
    var blend1 = createBlend("R_disp", "G_disp", "RG");
    var blend2 = createBlend("RG", "B_disp", "REFRACTED");

    // 5. Extraer el Bisel Especular codificado en el canal AZUL (B) del displacementMap
    // Transforma el canal B (0-255) en la opacidad (A) de un píxel puramente blanco (1,1,1)
    var matHl = createColorMatrix("displacementMap", "0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 1 0 0", "HIGHLIGHT");

    // 6. Superponer el Bisel Blanco sobre la imagen Refractada
    var compFinal = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
    compFinal.setAttribute("in", "HIGHLIGHT");
    compFinal.setAttribute("in2", "REFRACTED");
    compFinal.setAttribute("operator", "over");

    // Ensamblar filtro
    filter.appendChild(feImage);
    filter.appendChild(feBlur);
    filter.appendChild(matR);
    filter.appendChild(matG);
    filter.appendChild(matB);
    filter.appendChild(dispR);
    filter.appendChild(dispG);
    filter.appendChild(dispB);
    filter.appendChild(blend1);
    filter.appendChild(blend2);
    filter.appendChild(matHl);
    filter.appendChild(compFinal);

    defs.appendChild(filter);
    svg.appendChild(defs);
    document.body.appendChild(svg);

    var mapCanvas = document.createElement("canvas");
    mapCanvas.style.display = "none";

    nav.style.position = nav.style.position || "relative";
    nav.style.isolation = "isolate";

    var lastW = 0, lastH = 0;

    function updateFilter() {
      var rect = nav.getBoundingClientRect();
      var W = Math.round(rect.width);
      var H = Math.round(rect.height);
      if (W < 4 || H < 4) return;
      if (W === lastW && H === lastH) return;

      lastW = W;
      lastH = H;
      mapCanvas.width = W;
      mapCanvas.height = H;

      var dispUrl = buildMaps(mapCanvas, W, H);
      
      filter.setAttribute("width", String(W));
      filter.setAttribute("height", String(H));
      
      feImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", dispUrl);
      feImage.setAttribute("width", String(W));
      feImage.setAttribute("height", String(H));
      
      // Escalas de Refracción (Aberración cromática microscópica activa)
      var baseScale = H * 0.20; 
      dispR.setAttribute("scale", String(baseScale * 1.02)); // Separación mayor para mantenerla visible
      dispG.setAttribute("scale", String(baseScale * 0.95));
      dispB.setAttribute("scale", String(baseScale * 0.88));
    }

    // Hemos sacado el 'blur(4px)' de aquí porque ahora el filtro SVG lo hace de manera nativa e inteligente.
    nav.style.backdropFilter = "url(#" + filterId + ") brightness(1.05) saturate(1.15)";
    nav.style.webkitBackdropFilter = nav.style.backdropFilter;
    
    // Solo un ligerísimo borde para estructurar
    nav.style.border = "1px solid rgba(255, 255, 255, 0.03)";

    function onScroll() {
      if (window.scrollY > 60) {
        nav.style.backgroundColor = "rgba(255, 255, 255, 0.028)";
        nav.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.2)";
      } else {
        nav.style.backgroundColor = "rgba(255, 255, 255, 0.007)";
        nav.style.boxShadow = "none";
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    updateFilter();

    var ro = new ResizeObserver(function () {
      updateFilter();
    });
    ro.observe(nav);
  }

  function init() {
    var navs = document.querySelectorAll(".liquid-glass-nav, .glass-navbar, .glass-nav");
    navs.forEach(initNav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
