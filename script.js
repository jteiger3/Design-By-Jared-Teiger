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
    // still run carousel if home
    initCarousel(page);
    return;
  }

  // ---------- MENU OPEN/CLOSE ----------
  const openMenu = () => {
    menuOverlay.classList.add("is-open");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");

    // lock page scroll + flip nav colors + burger->X
    body.classList.add("no-scroll");
    body.classList.add("menu-open");

    // default preview
    if (previewEl) {
      previewEl.style.backgroundImage = "url('./assets/about.jpg')";
    }
  };

  const closeMenu = () => {
    menuOverlay.classList.remove("is-open");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");

    body.classList.remove("no-scroll");
    body.classList.remove("menu-open");
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
        // If menu isn't open, don't interfere
        if (!menuOverlay.classList.contains("is-open")) return;

        // If no preview element, do nothing
        if (!previewEl) return;

        const src = el.getAttribute("data-preview");
        if (!src) return;

        if (lastTapped !== el) {
          ev.preventDefault();
          setPreview(el);
          lastTapped = el;
          setTimeout(() => (lastTapped = null), 1200);
        }
      },
      { passive: false }
    );
  });

  // Prevent iOS “rubber band” scrolling behind the overlay
  menuOverlay.addEventListener(
    "touchmove",
    (e) => {
      if (menuOverlay.classList.contains("is-open")) e.preventDefault();
    },
    { passive: false }
  );

  // ---------- HOME CAROUSEL ----------
  initCarousel(page);

  function initCarousel(pageName) {
    if (pageName !== "home") return;

    const slides = Array.from(document.querySelectorAll(".carousel__slide"));
    const dots = Array.from(document.querySelectorAll(".dot"));
    if (!slides.length) return;

    let i = 0;

    const show = (idx) => {
      slides.forEach((s) => s.classList.remove("is-active"));
      dots.forEach((d) => d.classList.remove("is-active"));
      slides[idx]?.classList.add("is-active");
      dots[idx]?.classList.add("is-active");
    };

    // make sure initial state is correct
    show(0);

    setInterval(() => {
      i = (i + 1) % slides.length;
      show(i);
    }, 4500);
  }
})();
