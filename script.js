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

  // ---------- BACKGROUND SCROLL LOCK ----------
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

  // ---------- MENU OPEN / CLOSE ----------
  const openMenu = () => {
    menuOverlay.classList.add("is-open");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");

    lockBodyScroll();
    body.classList.add("menu-open");

    menuOverlay.scrollTop = 0;

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
    menuOverlay.classList.contains("is-open") ? closeMenu() : openMenu();
  };

  menuBtn.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdropBtn) backdropBtn.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOverlay.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // ---------- PREVIEW ----------
  const previewLinks = document.querySelectorAll("[data-preview]");

  const setPreview = (el) => {
    const src = el.getAttribute("data-preview");
    if (src && previewEl) previewEl.style.backgroundImage = `url('${src}')`;
  };

  previewLinks.forEach((el) => {
    el.addEventListener("mouseenter", () => setPreview(el));
    el.addEventListener("focus", () => setPreview(el));
  });

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
          ev.preventDefault();
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
