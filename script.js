// script.js
(function () {
  const menuBtn = document.getElementById("menuBtn");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeBtn = document.getElementById("closeBtn");
  const backdropBtn = document.getElementById("backdropBtn");
  const previewEl = document.getElementById("menuPreview");

  const body = document.body;
  const page = body.getAttribute("data-page");

  // ----- MENU -----
  function openMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.add("is-open");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuBtn?.setAttribute("aria-expanded", "true");
    body.classList.add("no-scroll");

    // ↓ Update #3: lets CSS flip nav to black while menu is open
    body.classList.add("menu-open");

    // set default preview = about.jpg
    if (previewEl) {
      previewEl.style.backgroundImage = "url('./assets/about.jpg')";
    }
  }

  function closeMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.remove("is-open");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuBtn?.setAttribute("aria-expanded", "false");
    body.classList.remove("no-scroll");

    // ↓ Update #3: revert nav back to white (default overlay state)
    body.classList.remove("menu-open");
  }

  menuBtn?.addEventListener("click", () => {
    const isOpen = menuOverlay?.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener("click", closeMenu);
  backdropBtn?.addEventListener("click", closeMenu);

  // Escape closes menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOverlay?.classList.contains("is-open")) closeMenu();
  });

  // Hover preview switching (desktop)
  const previewLinks = document.querySelectorAll("[data-preview]");
  previewLinks.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const src = el.getAttribute("data-preview");
      if (src && previewEl) previewEl.style.backgroundImage = `url('${src}')`;
    });
    el.addEventListener("focus", () => {
      const src = el.getAttribute("data-preview");
      if (src && previewEl) previewEl.style.backgroundImage = `url('${src}')`;
    });
  });

  // Mobile: tap updates preview (without navigating) if you tap once; second tap navigates.
  let lastTapped = null;
  previewLinks.forEach((el) => {
    el.addEventListener("touchstart", (ev) => {
      const src = el.getAttribute("data-preview");
      if (!src || !previewEl) return;

      if (lastTapped !== el) {
        ev.preventDefault();
        previewEl.style.backgroundImage = `url('${src}')`;
        lastTapped = el;
        setTimeout(() => (lastTapped = null), 1200);
      }
    }, { passive: false });
  });

  // Prevent overlay scroll / accidental behavior
  menuOverlay?.addEventListener("touchmove", (e) => {
    if (menuOverlay.classList.contains("is-open")) e.preventDefault();
  }, { passive: false });

  // ----- HOME CAROUSEL -----
  if (page === "home") {
    const slides = Array.from(document.querySelectorAll(".carousel__slide"));
    const dots = Array.from(document.querySelectorAll(".dot"));
    let i = 0;

    function show(idx) {
      slides.forEach((s) => s.classList.remove("is-active"));
      dots.forEach((d) => d.classList.remove("is-active"));
      slides[idx]?.classList.add("is-active");
      dots[idx]?.classList.add("is-active");
    }

    setInterval(() => {
      i = (i + 1) % slides.length;
      show(i);
    }, 4500);
  }
})();
