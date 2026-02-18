/**
 * Liquid Glass Effect for Navbar
 *
 * Direct adaptation of Shu Ding's technique (2025):
 *   https://github.com/shuding/liquid-glass
 *
 * How it works:
 *   1. A fragment function computes per-pixel UV displacement using a
 *      Signed Distance Function (roundedRectSDF) + smoothStep.
 *   2. Displacement vectors are encoded into the Red (X) and Green (Y)
 *      channels of a hidden canvas → exported as data-URL.
 *   3. An SVG <feImage> loads that data-URL and feeds it into
 *      <feDisplacementMap> which warps SourceGraphic.
 *   4. The navbar applies:
 *        backdrop-filter: url(#filterId) blur(..) contrast(..) brightness(..) saturate(..)
 *      so pixels behind the element are refracted through the SDF shape.
 *   5. A specular-highlight div is injected for the glassy rim light.
 */

(function () {
  "use strict";

  // ── Math helpers (verbatim from Shu Ding) ───────────────────────────────

  function smoothStep(a, b, t) {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  function len(x, y) {
    return Math.sqrt(x * x + y * y);
  }

  // Inigo Quilez rounded-rect SDF
  function roundedRectSDF(x, y, w, h, r) {
    var qx = Math.abs(x) - w + r;
    var qy = Math.abs(y) - h + r;
    return (
      Math.min(Math.max(qx, qy), 0) +
      len(Math.max(qx, 0), Math.max(qy, 0)) -
      r
    );
  }

  // ── Unique filter ID ────────────────────────────────────────────────────

  var uid =
    "lg-nav-" +
    Math.random().toString(36).slice(2, 9);

  // ── Fragment shader — the core of the effect ────────────────────────────
  // Shu Ding: returns new UV so pixels at the edge are contracted → refraction.
  // Params for pill (rounded-full) vs wide bar are chosen in buildMap by aspect ratio.

  function makeFragment(halfW, halfH, radius, bezel) {
    return function fragment(uvx, uvy) {
      var ix = uvx - 0.5;
      var iy = uvy - 0.5;
      var d = roundedRectSDF(ix, iy, halfW, halfH, radius);
      var displacement = smoothStep(0.8, 0.0, d - bezel);
      var scaled = smoothStep(0.0, 1.0, displacement);
      return { x: ix * scaled + 0.5, y: iy * scaled + 0.5 };
    };
  }

  // ── Build displacement map on hidden canvas (Shu Ding's updateShader) ──

  function buildMap(w, h, canvas, ctx, fragmentFn) {
    canvas.width = w;
    canvas.height = h;

    var total = w * h;
    var data = new Uint8ClampedArray(total * 4);
    var raw = new Float64Array(total * 2);
    var maxScale = 0;

    for (var i = 0; i < total; i++) {
      var px = i % w;
      var py = (i - px) / w;
      var pos = fragmentFn(px / w, py / h);
      var dx = pos.x * w - px;
      var dy = pos.y * h - py;
      raw[i * 2] = dx;
      raw[i * 2 + 1] = dy;
      var adx = Math.abs(dx);
      var ady = Math.abs(dy);
      if (adx > maxScale) maxScale = adx;
      if (ady > maxScale) maxScale = ady;
    }

    // Encode with headroom; we'll amplify scale when applying so refraction is visible
    maxScale *= 0.5;
    if (maxScale < 1) maxScale = 1;

    for (var j = 0; j < total; j++) {
      var r = raw[j * 2] / maxScale + 0.5;
      var g = raw[j * 2 + 1] / maxScale + 0.5;
      var off = j * 4;
      data[off]     = r * 255; // R → X displacement
      data[off + 1] = g * 255; // G → Y displacement
      data[off + 2] = 0;
      data[off + 3] = 255;
    }

    ctx.putImageData(new ImageData(data, w, h), 0, 0);

    return {
      dataURL: canvas.toDataURL(),
      scale: maxScale, // used as feDisplacementMap scale
    };
  }

  // ── Create SVG filter ───────────────────────────────────────────────────

  function createSVGFilter() {
    var svgNS = "http://www.w3.org/2000/svg";
    var xlinkNS = "http://www.w3.org/1999/xlink";

    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.cssText =
      "position:fixed;top:0;left:0;pointer-events:none;z-index:0;";

    var defs = document.createElementNS(svgNS, "defs");
    var filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", uid + "_f");
    filter.setAttribute("filterUnits", "userSpaceOnUse");
    filter.setAttribute("color-interpolation-filters", "sRGB");

    var feImg = document.createElementNS(svgNS, "feImage");
    feImg.setAttribute("id", uid + "_img");
    feImg.setAttribute("result", "dispMap");

    var feDisp = document.createElementNS(svgNS, "feDisplacementMap");
    feDisp.setAttribute("in", "SourceGraphic");
    feDisp.setAttribute("in2", "dispMap");
    feDisp.setAttribute("xChannelSelector", "R");
    feDisp.setAttribute("yChannelSelector", "G");
    feDisp.setAttribute("scale", "0");

    filter.appendChild(feImg);
    filter.appendChild(feDisp);
    defs.appendChild(filter);
    svg.appendChild(defs);
    document.body.appendChild(svg);

    return { svg: svg, filter: filter, feImg: feImg, feDisp: feDisp };
  }

  // ── Main init ───────────────────────────────────────────────────────────

  function init() {
    // Apply to both portfolio navbar and index/home pill bar
    var nav =
      document.querySelector(".liquid-glass-nav") ||
      document.querySelector(".glass-nav");
    if (!nav) return;

    // Hidden canvas for displacement map generation
    var canvas = document.createElement("canvas");
    canvas.style.display = "none";
    var ctx = canvas.getContext("2d");

    // SVG filter elements
    var svgParts = createSVGFilter();
    var feImg  = svgParts.feImg;
    var feDisp = svgParts.feDisp;
    var filter = svgParts.filter;

    // Specular highlight overlay (works without style.css, e.g. index.html)
    var specular = document.createElement("div");
    specular.className = "lg-specular";
    specular.style.cssText =
      "position:absolute;inset:0;pointer-events:none;z-index:1;border-radius:inherit;" +
      "background:linear-gradient(180deg,rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.02) 50%,transparent 100%);" +
      "box-shadow:inset 0 1px 0 rgba(255,255,255,0.15),inset 0 -1px 0 rgba(255,255,255,0.04);";
    nav.insertBefore(specular, nav.firstChild);

    // nav-container z-index is handled via CSS (.nav-container { z-index: 10 })

    // ── Apply the liquid-glass backdrop-filter to the navbar ──────────
    nav.style.position = nav.style.position || "relative";
    nav.style.background = "rgba(18, 18, 20, 0.35)";
    nav.style.borderBottom = "none";
    nav.style.backdropFilter =
      "url(#" + uid + "_f) blur(0.5px) contrast(1.15) brightness(1.05) saturate(1.15)";
    nav.style.webkitBackdropFilter = nav.style.backdropFilter;
    nav.style.boxShadow =
      "0 4px 12px rgba(0,0,0,0.3), inset 0 -8px 20px rgba(0,0,0,0.1)";

    // ── Update displacement map (called on init & resize) ────────────
    var lastW = 0;
    var lastH = 0;

    function updateMap() {
      var rect = nav.getBoundingClientRect();
      var w = Math.round(rect.width);
      var h = Math.round(rect.height);
      if (w < 8 || h < 8) return;
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;

      // Pill (index): wider bezel = more visible refraction at the edge
      var aspect = h / w;
      var fragmentFn =
        aspect > 0.35
          ? makeFragment(0.38, 0.38, 0.52, 0.18)
          : makeFragment(0.48, 0.42, 0.18, 0.2);

      var result = buildMap(w, h, canvas, ctx, fragmentFn);

      // Point the SVG feImage at the new displacement map
      feImg.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "href",
        result.dataURL
      );
      feImg.setAttribute("width", String(w));
      feImg.setAttribute("height", String(h));

      // Amplify scale so refraction is clearly visible (not just a faint blur)
      var dispScale = Math.max(12, Math.min(80, result.scale * 2.5));
      feDisp.setAttribute("scale", String(dispScale));

      // Filter region must match element position on screen (backdrop is viewport space)
      filter.setAttribute("x", String(Math.round(rect.left)));
      filter.setAttribute("y", String(Math.round(rect.top)));
      filter.setAttribute("width", String(w));
      filter.setAttribute("height", String(h));
    }

    updateMap();

    // Reposition filter when scrolling/resize (pill bar moves)
    var rafId;
    function tick() {
      var r = nav.getBoundingClientRect();
      filter.setAttribute("x", String(Math.round(r.left)));
      filter.setAttribute("y", String(Math.round(r.top)));
      rafId = requestAnimationFrame(tick);
    }
    tick();

    // ── Resize handling ──────────────────────────────────────────────
    var resizeTimer;
    var ro = new ResizeObserver(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateMap, 80);
    });
    ro.observe(nav);

    // ── Scroll → update visual state ─────────────────────────────────
    function onScroll() {
      if (window.scrollY > 60) {
        nav.classList.add("scrolled");
        nav.style.background = "rgba(10, 10, 12, 0.5)";
      } else {
        nav.classList.remove("scrolled");
        nav.style.background = "rgba(18, 18, 20, 0.35)";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ── Boot ────────────────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
