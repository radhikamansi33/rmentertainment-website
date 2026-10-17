/**
 * Header: dropdown menu, mobile menu, compact-on-scroll, and logo loading.
 */
(function () {
  var $ = RM.$;
  var dropdownButton = $("#dropdown-button");
  var dropdownMenu = $("#dropdown-menu");
  var menuToggle = $("#menu-toggle");
  var mobileNav = $("#mobile-nav");
  var mobileExperiences = $("#mobile-experiences");
  var mobileSub = $("#mobile-sub");

  function setOpen(button, menu, open) {
    var next = open === undefined ? !menu.classList.contains("is-open") : open;
    menu.classList.toggle("is-open", next);
    button.setAttribute("aria-expanded", next);
  }

  dropdownButton.addEventListener("click", function () {
    setOpen(dropdownButton, dropdownMenu);
  });

  menuToggle.addEventListener("click", function () {
    setOpen(menuToggle, mobileNav);
  });

  mobileExperiences.addEventListener("click", function () {
    setOpen(mobileExperiences, mobileSub);
    var open = mobileSub.classList.contains("is-open");
    mobileExperiences.textContent = "Experiences " + (open ? "\u2212" : "+");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && dropdownMenu.classList.contains("is-open")) {
      setOpen(dropdownButton, dropdownMenu, false);
      dropdownButton.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav__item--dropdown")) {
      setOpen(dropdownButton, dropdownMenu, false);
    }
  });

  dropdownMenu.addEventListener("focusout", function (event) {
    if (!dropdownMenu.parentNode.contains(event.relatedTarget)) {
      setOpen(dropdownButton, dropdownMenu, false);
    }
  });

  window.addEventListener("scroll", function () {
    $("#site-header").classList.toggle("is-compact", window.scrollY > 60);
  }, { passive: true });

  // Logo: use the first logo file that exists, otherwise keep the text-only brand.
  var logo = $("#brand-logo");
  var files = RM.config.logoFiles.slice();

  function tryNext() {
    if (!files.length) { return; }
    var file = files.shift();
    var probe = new Image();
    probe.onload = function () {
      logo.src = probe.src;
      logo.hidden = false;
      var icon = $("link[rel=icon]");
      if (icon) { icon.href = probe.src; }
    };
    probe.onerror = tryNext;
    probe.src = RM.base + "assets/images/logo/" + file;
  }
  tryNext();
})();
