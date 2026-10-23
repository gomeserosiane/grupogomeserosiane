// Galeria contínua e visualizador ampliado do Village Natureza.
(() => {
  const carousel = document.querySelector("[data-village-carousel]");
  const track = document.querySelector("[data-village-track]");
  const originalSet = document.querySelector("[data-village-set]");
  const lightbox = document.querySelector("[data-village-lightbox]");

  if (!carousel || !track || !originalSet || !lightbox) return;

  const expandedImage = lightbox.querySelector("[data-village-expanded]");
  const viewport = lightbox.querySelector("[data-village-viewport]");
  const thumbs = lightbox.querySelector("[data-village-thumbs]");
  const currentLabel = lightbox.querySelector("[data-village-current]");
  const zoomLabel = lightbox.querySelector("[data-village-zoom-level]");
  const closeButton = lightbox.querySelector("[data-village-close]");
  const previousButton = lightbox.querySelector("[data-village-prev]");
  const nextButton = lightbox.querySelector("[data-village-next]");
  const zoomInButton = lightbox.querySelector("[data-village-zoom-in]");
  const zoomOutButton = lightbox.querySelector("[data-village-zoom-out]");
  const zoomResetButton = lightbox.querySelector("[data-village-zoom-reset]");
  const sourceButtons = [...originalSet.querySelectorAll("[data-village-image]")];
  const images = sourceButtons.map((button) => {
    const image = button.querySelector("img");
    return { src: image.src, alt: image.alt };
  });

  let activeIndex = 0;
  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let dragStartX = 0;
  let dragStartY = 0;
  let startPanX = 0;
  let startPanY = 0;
  let dragging = false;
  let lastFocusedElement = null;

  // Duplica a sequência para manter o movimento contínuo da direita para a esquerda.
  const clonedSet = originalSet.cloneNode(true);
  clonedSet.removeAttribute("data-village-set");
  clonedSet.setAttribute("aria-hidden", "true");
  clonedSet.querySelectorAll("button").forEach((button) => button.setAttribute("tabindex", "-1"));
  clonedSet.querySelectorAll("img").forEach((image) => image.setAttribute("loading", "lazy"));
  track.appendChild(clonedSet);

  thumbs.innerHTML = images.map((image, index) => `
    <button type="button" data-village-thumb="${index}" aria-label="Ver imagem ${index + 1}">
      <img src="${image.src}" alt="" loading="lazy">
    </button>
  `).join("");

  function updateTransform() {
    expandedImage.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`;
    zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
    viewport.classList.toggle("is-zoomed", zoom > 1);
  }

  function resetZoom() {
    zoom = 1;
    panX = 0;
    panY = 0;
    updateTransform();
  }

  function setZoom(nextZoom) {
    zoom = Math.min(3, Math.max(1, Math.round(nextZoom * 4) / 4));

    if (zoom === 1) {
      panX = 0;
      panY = 0;
    }

    updateTransform();
  }

  function renderImage(index, direction = "next") {
    const normalizedIndex = (index + images.length) % images.length;
    activeIndex = normalizedIndex;
    resetZoom();
    expandedImage.src = images[activeIndex].src;
    expandedImage.alt = images[activeIndex].alt;
    currentLabel.textContent = String(activeIndex + 1);

    const animationClass = direction === "prev" ? "is-changing-prev" : "is-changing-next";
    expandedImage.classList.remove("is-changing-next", "is-changing-prev");
    void expandedImage.offsetWidth;
    expandedImage.classList.add(animationClass);

    thumbs.querySelectorAll("[data-village-thumb]").forEach((button, thumbIndex) => {
      const isActive = thumbIndex === activeIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", isActive ? "true" : "false");

      if (isActive) {
        button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    });
  }

  function openLightbox(index, trigger) {
    lastFocusedElement = trigger;
    renderImage(index);
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("village-lightbox-open");
    track.classList.add("is-paused");

    requestAnimationFrame(() => {
      lightbox.classList.add("is-open");
      closeButton.focus();
    });
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("village-lightbox-open");
    track.classList.remove("is-paused");
    resetZoom();

    window.setTimeout(() => {
      lightbox.setAttribute("aria-hidden", "true");
      lastFocusedElement?.focus();
    }, 350);
  }

  function showPrevious() {
    renderImage(activeIndex - 1, "prev");
  }

  function showNext() {
    renderImage(activeIndex + 1, "next");
  }

  carousel.addEventListener("click", (event) => {
    const button = event.target.closest("[data-village-image]");
    if (!button) return;
    openLightbox(Number(button.dataset.villageImage), button);
  });

  thumbs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-village-thumb]");
    if (!button) return;
    const nextIndex = Number(button.dataset.villageThumb);
    renderImage(nextIndex, nextIndex < activeIndex ? "prev" : "next");
  });

  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", showPrevious);
  nextButton.addEventListener("click", showNext);
  zoomInButton.addEventListener("click", () => setZoom(zoom + 0.25));
  zoomOutButton.addEventListener("click", () => setZoom(zoom - 0.25));
  zoomResetButton.addEventListener("click", resetZoom);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  viewport.addEventListener("dblclick", () => {
    setZoom(zoom === 1 ? 2 : 1);
  });

  viewport.addEventListener("wheel", (event) => {
    event.preventDefault();
    setZoom(zoom + (event.deltaY < 0 ? 0.25 : -0.25));
  }, { passive: false });

  viewport.addEventListener("pointerdown", (event) => {
    dragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    startPanX = panX;
    startPanY = panY;
    viewport.classList.add("is-dragging");
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!dragging || zoom === 1) return;
    panX = startPanX + event.clientX - dragStartX;
    panY = startPanY + event.clientY - dragStartY;
    updateTransform();
  });

  viewport.addEventListener("pointerup", (event) => {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove("is-dragging");

    const swipeDistance = event.clientX - dragStartX;
    if (zoom === 1 && Math.abs(swipeDistance) > 60) {
      swipeDistance < 0 ? showNext() : showPrevious();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showPrevious();
    if (event.key === "ArrowRight") showNext();
    if (event.key === "+" || event.key === "=") setZoom(zoom + 0.25);
    if (event.key === "-") setZoom(zoom - 0.25);
    if (event.key === "0") resetZoom();

    if (event.key === "Tab") {
      const focusable = [...lightbox.querySelectorAll("button:not([disabled])")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
