const mobileMenuIcon = document.querySelector(".menu-icon");
const mobileMenuWrapp = document.querySelector(".mobile-menu-wrapp");
const mobileMenu = document.querySelector(".mobile-menu");
const closeCross = document.querySelector(".cross-close");

mobileMenuIcon.addEventListener("click", function () {
  mobileMenuWrapp.style.display = "flex";
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => {
    mobileMenu.classList.add("open");
  });
});

closeCross.addEventListener("click", closeMenu);

document.querySelectorAll(".mobile-menu__list a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

function closeMenu() {
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
  setTimeout(function () {
    mobileMenuWrapp.style.display = "none";
  }, 300);
}
