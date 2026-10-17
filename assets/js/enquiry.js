/**
 * Enquiry: service preselection, validation, and honest submission feedback.
 */
(function () {
  var $ = RM.$, $$ = RM.$$;
  var form = $("#enquiry-form");

  var team = RM.config.team || [];

  if (!form) { return; }
  var submitting = false;

  /* ---- Preselect the service from ?service=slug ---- */
  var preselected = new URLSearchParams(window.location.search).get("service");
  $$("[name=svc]", form).forEach(function (box) {
    if (box.dataset.slug === preselected) { box.checked = true; }
  });

  /* ---- "Not decided" disables the date field ---- */
  var notDecided = $("#not-decided");
  var dateField = $("#date");
  notDecided.addEventListener("change", function () {
    dateField.disabled = notDecided.checked;
    if (notDecided.checked) { dateField.value = ""; }
  });

  function validate() {
    var errors = [];
    function fail(id, message, errorId) {
      errors.push([id, message]);
      $("#e-" + (errorId || id)).textContent = message;
      var el = $("#" + id);
      if (el && el.setAttribute) { el.setAttribute("aria-invalid", "true"); }
    }
    function value(name) { return form.elements[name].value.trim(); }

    var pref = value("pref"), email = value("email"), phone = value("phone");
    if (!value("name")) { fail("name", "Enter your name."); }
    if (!pref) { fail("pref", "Choose how you\u2019d like us to reach you."); }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) { fail("email", "Enter an email address like name@example.com."); }
    else if (pref === "Email" && !email) { fail("email", "Enter your email address, since you prefer email."); }
    if ((pref === "Phone call" || pref === "WhatsApp") && !phone) { fail("phone", "Enter your phone number, since you prefer a call or WhatsApp."); }
    if (pref === "Any" && !email && !phone) { fail("email", "Enter an email address or phone number."); }
    if (!$("[name=svc]:checked", form)) { fail("services", "Choose at least one service.", "svc"); }
    if (!form.elements.consent.checked) { fail("consent", "Please tick the box so we can contact you."); }
    return errors;
  }

  function showErrors(errors) {
    var summary = $("#error-summary");
    summary.hidden = false;
    summary.innerHTML = "<strong>Please fix the following:</strong><ul>" + errors.map(function (e) {
      return '<li><a href="#" data-target="' + e[0] + '">' + e[1] + "</a></li>";
    }).join("") + "</ul>";
    $$("a", summary).forEach(function (a) {
      a.addEventListener("click", function (event) {
        event.preventDefault();
        var target = $("#" + a.dataset.target);
        (target.querySelector("input") || target).focus();
      });
    });
    summary.focus();
  }

  function payload() {
    var data = {};
    new FormData(form).forEach(function (v, k) { if (k !== "svc") { data[k] = v; } });
    data.services = $$("[name=svc]:checked", form).map(function (x) { return x.value; });

    // Options understood by the email delivery service.
    data._subject = "New enquiry: R & M Entertainment Designers";
    data._template = "table";
    data._captcha = "false";
    if (data.email) { data._replyto = data.email; }
    return data;
  }

  /* Optional follow-up after an email enquiry: a short WhatsApp message. The visitor presses send. */
  function followUpText(data) {
    return [
      "Hello R & M Entertainment Designers, I just sent an enquiry.",
      "Name: " + data.name,
      "Services: " + data.services.join(", "),
      "Event date: " + (data.date || "Not decided")
    ].join("\n");
  }

  /* Full enquiry written out as a WhatsApp message. */
  function enquiryText(data) {
    var lines = ["Hello R & M Entertainment Designers, I'd like to enquire.", "", "Name: " + data.name];
    if (data.phone) { lines.push("Phone: " + data.phone); }
    if (data.email) { lines.push("Email: " + data.email); }
    lines.push("Preferred contact: " + data.pref);
    lines.push("Event date: " + (data.date || "Not decided"));
    if (data.city) { lines.push("City or venue: " + data.city); }
    lines.push("Services: " + data.services.join(", "));
    if (data.count) { lines.push("Participants: " + data.count); }
    if (data.budget) { lines.push("Budget: " + data.budget); }
    if (data.message) { lines.push("", data.message); }
    return lines.join("\n");
  }

  /* After a successful send: show the confirmation briefly, then reload a fresh, empty page. */
  var RELOAD_DELAY = 4000;
  function reloadSoon(result) {
    result.insertAdjacentHTML("beforeend", '<p class="meta">This page will refresh in a few seconds.</p>');
    setTimeout(function () { window.location.reload(); }, RELOAD_DELAY);
  }

  /* Opens WhatsApp to one founder (inside the visitor's click, so it is not blocked as a pop-up). */
  function sendWhatsApp(person, data, result) {
    var link = RM.whatsappLink(person, enquiryText(data));
    var chat = window.open(link, "_blank");
    if (chat) { chat.opener = null; }
    var first = RM.escape(person.name.split(" ")[0]);
    result.className = "form-result";
    result.innerHTML =
      (chat
        ? "<strong>WhatsApp has opened with your enquiry to " + first + ".</strong> Press send in WhatsApp to deliver it."
        : "<strong>Your browser stopped WhatsApp from opening.</strong> Press “Open WhatsApp” below, then press send.") +
      " This is not a booking confirmation." +
      '<p><a class="btn btn--primary" href="' + link + '" target="_blank" rel="noopener">' + (chat ? "Open WhatsApp again" : "Open WhatsApp") + "</a>" +
      ' <a class="btn btn--outline" href="tel:' + person.phone + '">Call ' + first + "</a></p>";
    result.scrollIntoView({ block: "nearest" });
    // Only reload when WhatsApp really opened; if it was blocked, keep the button above.
    if (chat) { reloadSoon(result); }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (submitting) { return; }
    // Which button was pressed; Enter in a field counts as WhatsApp, the first button.
    var viaWhatsApp = !(event.submitter && event.submitter.dataset.via === "email") && team.length;

    $$(".field__error", form).forEach(function (x) { x.textContent = ""; });
    $$("[aria-invalid]", form).forEach(function (x) { x.removeAttribute("aria-invalid"); });

    var errors = validate();
    if (errors.length) { showErrors(errors); return; }
    $("#error-summary").hidden = true;

    var button = $("#submit-button");
    var result = $("#form-result");

    // WhatsApp: one founder goes straight to WhatsApp; with several, the visitor chooses whom.
    if (viaWhatsApp) {
      var details = payload();
      if (team.length === 1) { sendWhatsApp(team[0], details, result); return; }
      result.className = "form-result";
      result.innerHTML = "<strong>Who would you like to send your enquiry to?</strong>" +
        '<div class="btn-row">' + team.map(function (p, i) {
          return '<button class="btn btn--primary" type="button" data-person="' + i + '">Send to ' + RM.escape(p.name) + "</button>";
        }).join("") + "</div>";
      $$("[data-person]", result).forEach(function (choice) {
        choice.addEventListener("click", function () {
          sendWhatsApp(team[Number(choice.dataset.person)], details, result);
        });
      });
      result.scrollIntoView({ block: "nearest" });
      $("[data-person]", result).focus();
      return;
    }
    submitting = true;
    button.disabled = true;
    button.textContent = "Sending\u2026";

    var data = payload();

    var request = RM.config.formEndpoint
      ? fetch(RM.config.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        })
          .then(function (r) {
            if (!r.ok) { throw new Error("failed"); }
            return r.json();
          })
          .then(function (body) {
            // The service explains refusals (for example, first-time activation); pass that on.
            if (String(body.success) === "false") { throw new Error(body.message || "failed"); }
          })
      : Promise.reject(new Error("not-connected"));

    request
      .then(function () {
        result.className = "form-result";
        result.innerHTML =
          "<strong>Enquiry received.</strong> Thank you. We\u2019ll get in touch using your preferred method. This is not a booking confirmation." +
          '<p class="btn-row">' + team.map(function (p) {
            return '<a class="btn btn--outline" href="' + RM.whatsappLink(p, followUpText(data)) + '" target="_blank" rel="noopener">WhatsApp ' +
              RM.escape(p.name.split(" ")[0]) + "</a>";
          }).join("") + "</p>";
        form.reset();
        reloadSoon(result);
      })
      .catch(function (error) {
        result.className = "form-result form-result--warn";
        var known = error.message === "failed" || error.message === "Failed to fetch";
        result.innerHTML = error.message === "not-connected"
          ? "<strong>Your enquiry has not been sent.</strong> Delivery isn\u2019t connected yet. Your answers are still in the form."
          : "<strong>We couldn\u2019t send your enquiry.</strong> " +
            (known ? "Check your connection and try again." : RM.escape(error.message)) +
            " Your answers are still in the form.";
      })
      .then(function () {
        submitting = false;
        button.disabled = false;
        button.textContent = "Send via Email";
        result.scrollIntoView({ block: "nearest" });
      });
  });
})();