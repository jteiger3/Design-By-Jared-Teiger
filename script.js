// script.js
(() => {
  // ---------- DOM ----------
  const body = document.body;
  const page = body.getAttribute("data-page");

  const menuBtn = document.getElementById("menuBtn");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeBtn = document.getElementById("closeBtn");
  const backdropBtn = document.getElementById("backdropBtn");
  const previewEl = document.getElementById("menuPreview");

  // Safety: if someone loads a page without the overlay markup
  if (!menuBtn || !menuOverlay) {
    initCarousel(page);
    return;
  }

  // ---------- BACKGROUND SCROLL LOCK (mobile-safe) ----------
  let scrollY = 0;

  const lockBodyScroll = () => {
    scrollY = window.scrollY || 0;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
  };

  const unlockBodyScroll = () => {
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    window.scrollTo(0, scrollY);
  };

  // ---------- MENU OPEN/CLOSE ----------
  const openMenu = () => {
    menuOverlay.classList.add("is-open");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");

    // lock background + flip nav colors + burger->X
    lockBodyScroll();
    body.classList.add("menu-open");

    // ensure menu scroll starts at top
    menuOverlay.scrollTop = 0;

    // default preview
    if (previewEl) {
      previewEl.style.backgroundImage = "url('./assets/about.jpg')";
    }
  };

  const closeMenu = () => {
    menuOverlay.classList.remove("is-open");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");

    body.classList.remove("menu-open");
    unlockBodyScroll();
  };

  const toggleMenu = () => {
    const isOpen = menuOverlay.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  };

  // Button click
  menuBtn.addEventListener("click", toggleMenu);

  // Close button / backdrop
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdropBtn) backdropBtn.addEventListener("click", closeMenu);

  // Escape closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOverlay.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // ---------- PREVIEW HOVER / FOCUS ----------
  const previewLinks = document.querySelectorAll("[data-preview]");

  const setPreview = (el) => {
    const src = el.getAttribute("data-preview");
    if (src && previewEl) previewEl.style.backgroundImage = `url('${src}')`;
  };

  previewLinks.forEach((el) => {
    el.addEventListener("mouseenter", () => setPreview(el));
    el.addEventListener("focus", () => setPreview(el));
  });

  // Mobile: first tap updates preview, second tap navigates
  let lastTapped = null;
  previewLinks.forEach((el) => {
    el.addEventListener(
      "touchstart",
      (ev) => {
        if (!menuOverlay.classList.contains("is-open")) return;
        if (!previewEl) return;

        const src = el.getAttribute("data-preview");
        if (!src) return;

        if (lastTapped !== el) {
          ev.preventDefault(); // only blocks the first tap to allow preview swap
          setPreview(el);
          lastTapped = el;
          setTimeout(() => (lastTapped = null), 1200);
        }
      },
      { passive: false }
    );
  });

  // ---------- HOME CAROUSEL ----------
  initCarousel(page);

  function initCarousel(pageName) {
    if (pageName !== "home") return;

    const slides = Array.from(document.querySelectorAll(".carousel__slide"));
    const dotsWrap = document.querySelector(".carousel__dots");
if (dotsWrap) {
  dotsWrap.innerHTML = slides
    .map((_, idx) => `<span class="dot ${idx === 0 ? "is-active" : ""}"></span>`)
    .join("");
}
const dots = Array.from(document.querySelectorAll(".dot"));

    if (!slides.length) return;

    let i = 0;

    const show = (idx) => {
      slides.forEach((s) => s.classList.remove("is-active"));
      dots.forEach((d) => d.classList.remove("is-active"));
      slides[idx]?.classList.add("is-active");
      dots[idx]?.classList.add("is-active");
    };

    show(0);

    setInterval(() => {
      i = (i + 1) % slides.length;
      show(i);
    }, 4500);
  }
})();
