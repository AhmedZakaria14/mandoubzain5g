document.addEventListener("DOMContentLoaded", function () {
  const ebci2Section = document.querySelector(".ebci2-contact-section");
  const ebci2Cards = document.querySelectorAll(".ebci2-contact-card");

  const ebci2Observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // اظهار القسم
          ebci2Section.classList.add("show");

          // اظهار الكروت بالتتابع delay
          ebci2Cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("show");
            }, index * 1000);
          });

          // تشغيل مرة واحدة فقط
          observer.unobserve(ebci2Section);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  ebci2Observer.observe(ebci2Section);
});
