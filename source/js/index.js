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

var modalButtons = document.querySelectorAll(".js-button");
var modal = document.querySelector(".modal");
var modalForm = modal.querySelector("form");
var modalOverlay = document.querySelector(".modal__overlay");
console.log(modalButtons);
console.log(modalButtons.length);

var closeModal = function () {
  modal.classList.remove("modal--active");
};

if (modalButtons) {
  for (var i = 0; i < modalButtons.length; i = i + 1) {
    modalButtons[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      modal.classList.add("modal--active");
      console.log(i);
    });
  }
}

modalOverlay.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeModal();
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (modal.classList.contains("modal--active")) {
      evt.preventDefault();
      closeModal();
    }
  }
});

function init() {
  var e = new ymaps.Map("map", {
    center: [59.939, 30.3226],
    zoom: 16,
    behaviors: ["drag"],
  });
  (myPlacemark = new ymaps.Placemark(
    [59.938635, 30.32365],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/map-pin.svg",
      iconImageSize: [67, 100],
      iconImageOffset: [-67, -100],
    }
  )),
    e.geoObjects.add(myPlacemark);
}

ymaps.ready(init);
