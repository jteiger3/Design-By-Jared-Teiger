/* =========================
script.js
========================= */

(function () {
  const menuBtn = document.getElementById("menuBtn");
  const menuOverlay = document.getElementById("menuOverlay");
  const previewImg = document.getElementById("menuPreviewImg");

  // Carousel (home only)
  const slidesWrap = document.getElementById("carouselSlides");
  const dotsWrap = document.getElementById("carouselDots");

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    if (menuBtn) menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (menuOverlay) menuOverlay.setAttribute("aria-hidden", open ? "false" : "true");

    // Prevent body scroll when menu is open
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.body.style.overflow = open ? "hidden" : "";
  }

  menuBtn?.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menu-open");
    setMenu(!isOpen);
  });

  // Close with ESC only (no click-outside close)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  // Hover preview logic
  if (menuOverlay && previewImg) {
    const hoverables = menuOverlay.querySelectorAll("[data-preview]");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const src = el.getAttribute("data-preview");
        if (src) previewImg.src = src;
      });
      el.addEventListener("focus", () => {
        const src = el.getAttribute("data-preview");
        if (src) previewImg.src = src;
      });
    });
  }

  // Simple carousel (dots)
  if (slidesWrap && dotsWrap) {
    const slides = Array.from(slidesWrap.querySelectorAll(".carousel__slide"));
    const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
    let idx = 0;
    let timer = null;

    function goTo(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, si) => s.classList.toggle("is-active", si === idx));
      dots.forEach((d, di) => d.classList.toggle("is-active", di === idx));
    }

    dots.forEach((d, di) => {
      d.addEventListener("click", () => {
        goTo(di);
        restart();
      });
    });

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(() => goTo(idx + 1), 5000);
    }

    restart();
  }
})();
