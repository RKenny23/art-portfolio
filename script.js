// Enhanced gallery filter functionality
document.addEventListener("DOMContentLoaded", function () {
  // Logo click functionality
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", () => {
    window.location.href = "#home";
  });

  const categoryButtons = document.querySelectorAll(".category-btn");
  const artItems = document.querySelectorAll(".art-item");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalContent = document.querySelector(".modal-content");
  let currentImageIndex = 0;
  let visibleItems = [];

  // Filter functionality
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const selectedCategory = this.getAttribute("data-category");

      // Filter the art items and update visible items array
      visibleItems = Array.from(artItems).filter((item) => {
        const isVisible =
          selectedCategory === "all" ||
          item.getAttribute("data-category") === selectedCategory;
        item.style.display = isVisible ? "block" : "none";
        return isVisible;
      });
    });
  });

  // Initialize visible items
  visibleItems = Array.from(artItems);

  // Modal functionality
  artItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.querySelector("h3").textContent;
      const description = item.querySelector("p").textContent;

      modalContent.innerHTML = `
        <img src="${img.src}" alt="${img.alt}" class="modal-image">
        <button class="modal-close">×</button>
        <button class="modal-prev">❮</button>
        <button class="modal-next">❯</button>
        <div class="modal-info">
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
      `;

      currentImageIndex = visibleItems.indexOf(item);
      modalOverlay.classList.add("active");
      document.body.classList.add("modal-open");
      attachModalListeners();
    });
  });

  // Close modal when clicking overlay
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modalOverlay.classList.contains("active")) return;

    switch (e.key) {
      case "ArrowRight":
        currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
        updateModalContent(currentImageIndex);
        break;
      case "ArrowLeft":
        currentImageIndex =
          (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
        updateModalContent(currentImageIndex);
        break;
      case "Escape":
        modalOverlay.classList.remove("active");
        document.body.classList.remove("modal-open");
        break;
    }
  });

  // Function to attach all modal event listeners
  function attachModalListeners() {
    const modalClose = modalContent.querySelector(".modal-close");
    const modalPrev = modalContent.querySelector(".modal-prev");
    const modalNext = modalContent.querySelector(".modal-next");

    modalClose.addEventListener("click", () => {
      modalOverlay.classList.remove("active");
      document.body.classList.remove("modal-open");
    });

    modalNext.addEventListener("click", () => {
      currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
      updateModalContent(currentImageIndex);
    });

    modalPrev.addEventListener("click", () => {
      currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
      updateModalContent(currentImageIndex);
    });
  }

  // Update modal content function
  function updateModalContent(index) {
    const item = visibleItems[index];
    const img = item.querySelector("img");
    const title = item.querySelector("h3").textContent;
    const description = item.querySelector("p").textContent;

    modalContent.innerHTML = `
      <img src="${img.src}" alt="${img.alt}" class="modal-image">
      <button class="modal-close">×</button>
      <button class="modal-prev">❮</button>
      <button class="modal-next">❯</button>
      <div class="modal-info">
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
    `;

    attachModalListeners();
  }
}); 