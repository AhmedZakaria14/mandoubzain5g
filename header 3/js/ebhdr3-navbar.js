const navbar = document.getElementById("ebhdr3-hdr");
const toggle = document.getElementById("ebhdr3-navToggle");
const overlay = document.getElementById("ebhdr3-navMenu");
const navClose = document.getElementById("ebhdr3-navClose");

/* Toggle Menu */
toggle.addEventListener("click", () => {
  navbar.classList.toggle("ebhdr3-nav--open");
});

/* Close When Click on close button */
navClose.addEventListener("click", () => {
  navbar.classList.remove("ebhdr3-nav--open");
});

/* Close When Click Outside */
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) || e.target.id == "ebhdr3-navMenu") {
    navbar.classList.remove("ebhdr3-nav--open");
  }
});

/* Change Background On Scroll */
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("ebhdr3-nav--scrolled");
  } else {
    navbar.classList.remove("ebhdr3-nav--scrolled");
  }
});
