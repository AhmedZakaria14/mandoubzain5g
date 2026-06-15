document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".ebhdr3-nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".nav-services-btn");

    button.addEventListener("click", (e) => {
      // موبايل وتابلت
      if (window.innerWidth < 790) {
        e.preventDefault();

        const isOpen = dropdown.classList.contains("open");

        // اقفل الكل
        dropdowns.forEach((item) => item.classList.remove("open"));

        // افتح الحالي لو مش مفتوح
        if (!isOpen) {
          dropdown.classList.add("open");
        }
      }
      // ديسكتوب
      else {
        if (button.dataset.href) {
          window.location.href = button.dataset.href;
        }
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".ebhdr3-nav-dropdown")) {
      document
        .querySelectorAll(".ebhdr3-nav-dropdown")
        .forEach((item) => item.classList.remove("open"));
    }
  });
});
