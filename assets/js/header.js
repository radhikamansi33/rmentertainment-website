/**
 * Header: mobile menu, compact-on-scroll, and logo loading.
 */
(function () {
  var $ = RM.$;
  var menuToggle = $("#menu-toggle");
  var mobileNav = $("#mobile-nav");

  function setOpen(button, menu, open) {
    var next = open === undefined ? !menu.classList.contains("is-open") : open;
    menu.classList.toggle("is-open", next);
    button.setAttribute("aria-expanded", next);
  }

  menuToggle.addEventListener("click", function () {
    setOpen(menuToggle, mobileNav);
  });


  // Header WhatsApp and Call buttons: with several founders, a pop-up asks whom to contact.
  var team = RM.config.team || [];
  var choices = {
    whatsapp: { button: $(".header-social--whatsapp"), title: "Who would you like to WhatsApp?" },
    call: { button: $(".header-social--call"), title: "Who would you like to call?" }
  };
  if (team.length > 1) {
    var greeting = "Hello R & M Entertainment Designers, I'd like to enquire about your services.";
    var popup = document.createElement("dialog");
    popup.className = "contact-popup";
    popup.setAttribute("aria-labelledby", "contact-popup-title");
    document.body.appendChild(popup);

    var openPopup = function (kind) {
      popup.innerHTML = '<h2 id="contact-popup-title">' + choices[kind].title + "</h2>" +
        '<div class="contact-popup__list">' + team.map(function (p) {
          var href = kind === "whatsapp" ? RM.whatsappLink(p, greeting) : "tel:" + p.phone;
          var target = kind === "whatsapp" ? ' target="_blank" rel="noopener"' : "";
          return '<a class="contact-popup__person contact-popup__person--' + kind + '" href="' + href + '"' + target + ">" +
            "<strong>" + RM.escape(p.name) + "</strong><span>" + RM.escape(p.display || p.phone) + "</span></a>";
        }).join("") + "</div>" +
        '<button class="contact-popup__close" type="button">Close</button>';
      $(".contact-popup__close", popup).addEventListener("click", function () { popup.close(); });
      // Choosing someone closes the pop-up.
      RM.$$(".contact-popup__person", popup).forEach(function (a) {
        a.addEventListener("click", function () { popup.close(); });
      });
      popup.showModal();
    };

    Object.keys(choices).forEach(function (kind) {
      var button = choices[kind].button;
      if (!button) { return; }
      button.setAttribute("aria-haspopup", "dialog");
      button.addEventListener("click", function (event) {
        event.preventDefault();
        openPopup(kind);
      });
    });

    // A click on the dimmed area outside the box closes it.
    popup.addEventListener("click", function (event) {
      if (event.target === popup) { popup.close(); }
    });
  }

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
