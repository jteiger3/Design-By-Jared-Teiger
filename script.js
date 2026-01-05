/* =========================
   script.js
   Shared site behavior
   ========================= */

(function () {
  const body = document.body;

  // MENU
  const menuOverlay = document.getElementById("menuOverlay");
  const menuBtn = document.querySelector(".menuBtn");
  const previewImg = document.getElementById("menuPreviewImg");

  function openMenu() {
    if (!menuOverlay || !menuBtn) return;
    menuOverlay.classList.add("is-open");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    body.classList.add("noScroll");
  }

  function closeMenu() {
    if (!menuOverlay || !menuBtn) return;
    menuOverlay.classList.remove("is-open");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    body.classList.remove("noScroll");
  }

  function toggleMenu() {
    if (!menuOverlay) return;
    const isOpen = menuOverlay.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  }

  // Click menu button toggles
  if (menuBtn) {
    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMenu();
    });
  }

  // Prevent overlay click from closing accidentally (per your request)
  // Close only with ESC key.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Hover/focus preview swap (links + pills)
  function setPreview(src) {
    if (!previewImg || !src) return;
    // swap with a tiny fade
    previewImg.classList.remove("is-visible");
    window.setTimeout(() => {
      previewImg.src = src;
      previewImg.classList.add("is-visible");
    }, 120);
  }

  const previewTargets = document.querySelectorAll("[data-preview]");
  previewTargets.forEach((el) => {
    const src = el.getAttribute("data-preview");
    // hover
    el.addEventListener("mouseenter", () => setPreview(src));
    // keyboard focus
    el.addEventListener("focus", () => setPreview(src));
  });

  // Ensure menu panel never scrolls on mobile; if content gets tall, we clamp instead.
  // (You can later add internal scroll if you ever need it.)
  if (menuOverlay) {
    // Stop touch scroll from "rubber-banding" the background on iOS
    menuOverlay.addEventListener(
      "touchmove",
      (e) => {
        if (menuOverlay.classList.contains("is-open")) e.preventDefault();
      },
      { passive: false }
    );
  }

  // HOME CAROUSEL (simple)
  const carousel = document.getElementById("homeCarousel");
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll(".hero__slide"));
    const dots = Array.from(document.querySelectorAll(".hero__dots .dot"));
    let idx = 0;

    function show(i) {
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
    }

    window.setInterval(() => {
      idx = (idx + 1) % slides.length;
      show(idx);
    }, 4500);
  }
})();

