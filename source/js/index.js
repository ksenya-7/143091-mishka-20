var nav = document.querySelector(".menu-nav");
var navToggle = document.querySelector(".page-header__toggle-btn");

if (nav) {
  nav.classList.remove("menu-nav--no-js");
}

if (navToggle) {
  navToggle.addEventListener("click", function (e) {
    e.preventDefault();
    nav.classList.toggle("menu-nav--open");
    navToggle.classList.toggle("page-header__toggle-btn--active");
  });
}
