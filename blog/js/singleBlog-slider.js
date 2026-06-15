document.addEventListener("DOMContentLoaded", function () {
    var slider = document.querySelector(".related-slider");
    if (!slider) return;
  
    var vp = slider.querySelector(".related-viewport");
    var track = slider.querySelector(".related-track");
    var dotsEl = slider.querySelector(".related-dots");
    var btnPrev = slider.querySelector(".related-nav.prev");
    var btnNext = slider.querySelector(".related-nav.next");
    var slides = Array.from(track.querySelectorAll(".related-slide"));
    var N = slides.length;
    var cur = 0;
  
    /* ── helpers ── */
    function wrap(i) {
      return ((i % N) + N) % N;
    }
  
    function slideX(i) {
      var s = slides[i];
      var vw = vp.offsetWidth;
      return -(s.offsetLeft - (vw - s.offsetWidth) / 2);
    }
  
    function moveTo(i, anim) {
      cur = wrap(i);
      track.classList.toggle("r2-no-anim", !anim);
      track.style.transform = "translateX(" + slideX(cur) + "px)";
      renderDots();
    }
  
    /* ── dots ── */
    for (var d = 0; d < N; d++) {
      (function (idx) {
        var b = document.createElement("button");
        b.addEventListener("click", function () {
          moveTo(idx, true);
          autoLater();
        });
        dotsEl.appendChild(b);
      })(d);
    }
  
    function renderDots() {
      dotsEl.querySelectorAll("button").forEach(function (b, i) {
        b.classList.toggle("active", i === cur);
      });
    }
  
    /* ── nav buttons ── */
    btnPrev.addEventListener("click", function () {
      moveTo(cur - 1, true);
      autoLater();
    });
    btnNext.addEventListener("click", function () {
      moveTo(cur + 1, true);
      autoLater();
    });
  
    /* ── autoplay ── */
    var autoT = null,
      resumeT = null,
      finger = false;
  
    function autoOn() {
      autoOff();
      autoT = setInterval(function () {
        if (!finger) moveTo(cur + 1, true);
      }, 4000);
    }
    function autoOff() {
      clearInterval(autoT);
      autoT = null;
      clearTimeout(resumeT);
      resumeT = null;
    }
    function autoLater() {
      autoOff();
      resumeT = setTimeout(function () {
        if (!finger) autoOn();
      }, 3000);
    }
  
    /* ── drag state ── */
    var sx = 0,
      sy = 0,
      stx = 0,
      lx = 0,
      active = false;
    var decided = false,
      isH = false;
  
    function getTX() {
      var m = getComputedStyle(track).transform;
      if (m === "none") return 0;
      return parseFloat(m.match(/matrix.*\((.+)\)/)[1].split(",")[4]) || 0;
    }
  
    function snapClosest() {
      var tx = getTX();
      var idx = 0,
        best = Infinity;
      for (var i = 0; i < N; i++) {
        var dist = Math.abs(tx - slideX(i));
        if (dist < best) {
          best = dist;
          idx = i;
        }
      }
      return idx;
    }
  
    function pDown(cx, cy) {
      active = true;
      decided = false;
      isH = false;
      sx = cx;
      sy = cy;
      lx = cx;
      stx = slideX(cur);
      track.classList.add("r2-no-anim");
      autoOff();
    }
  
    function pMove(cx, cy) {
      if (!active) return;
      if (!decided) {
        var adx = Math.abs(cx - sx),
          ady = Math.abs(cy - sy);
        if (adx < 5 && ady < 5) return;
        decided = true;
        isH = adx >= ady;
      }
      if (!isH) {
        active = false;
        finger = false;
        moveTo(cur, true);
        autoLater();
        return;
      }
      lx = cx;
      track.style.transform = "translateX(" + (stx + (cx - sx)) + "px)";
    }
  
    function pUp() {
      if (!active) return;
      active = false;
      finger = false;
      vp.classList.remove("r2-grabbing");
      var movedPx = lx - sx;
      var threshold = vp.offsetWidth * 0.12;
      if (movedPx < -threshold) moveTo(cur - 1, true);
      else if (movedPx > threshold) moveTo(cur + 1, true);
      else moveTo(snapClosest(), true);
      autoLater();
    }
  
    /* mouse */
    vp.addEventListener("mousedown", function (e) {
      finger = true;
      vp.classList.add("r2-grabbing");
      pDown(e.clientX, e.clientY);
    });
    vp.addEventListener("mousemove", function (e) {
      pMove(e.clientX, e.clientY);
    });
    vp.addEventListener("mouseup", pUp);
    vp.addEventListener("mouseleave", function () {
      if (active) pUp();
    });
  
    /* touch */
    vp.addEventListener(
      "touchstart",
      function (e) {
        finger = true;
        pDown(e.touches[0].clientX, e.touches[0].clientY);
      },
      { passive: true },
    );
    vp.addEventListener(
      "touchmove",
      function (e) {
        pMove(e.touches[0].clientX, e.touches[0].clientY);
      },
      { passive: true },
    );
    vp.addEventListener("touchend", pUp);
    vp.addEventListener("touchcancel", pUp);
  
    /* init */
    moveTo(0, false);
    autoOn();
    window.addEventListener("resize", function () {
      moveTo(cur, false);
    });
  });
  