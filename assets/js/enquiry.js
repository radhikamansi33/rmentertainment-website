/**
 * Enquiry: contact links, service preselection, validation, and honest submission feedback.
 */
(function () {
  var $ = RM.$, $$ = RM.$$;
  var form = $("#enquiry-form");

  /* ---- Contact links appear only when real details are supplied ---- */
  var links = $("#contact-links");
  if (links) {
    var c = RM.config.contact;
    var items = [
      ["WhatsApp", c.whatsapp],
      ["Phone", c.phone && "tel:" + c.phone],
      ["Email", c.email && "mailto:" + c.email],
      ["Instagram", c.instagram]
    ].filter(function (item) { return item[1]; });
    links.innerHTML = items.map(function (i) {
      return '<a href="' + i[1] + '">' + i[0] + "</a>";
    }).join(" &nbsp; ");
  }

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

  /* Optional follow-up: opens WhatsApp with a ready message. The visitor presses send. */
  function whatsappLink(data) {
    var lines = [
      "Hello R & M Entertainment Designers, I just sent an enquiry.",
      "Name: " + data.name,
      "Services: " + data.services.join(", "),
      "Event date: " + (data.date || "Not decided")
    ];
    return "https://wa.me/" + RM.config.whatsappNumber + "?text=" + encodeURIComponent(lines.join("\n"));
  }

  /* Full enquiry as a WhatsApp message to the business number. */
  function whatsappEnquiryLink(data) {
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
    return "https://wa.me/" + RM.config.whatsappNumber + "?text=" + encodeURIComponent(lines.join("\n"));
  }

  var viaWhatsApp = RM.config.sendVia === "whatsapp" && RM.config.whatsappNumber;
  if (viaWhatsApp) { $("#submit-button").textContent = "Send Enquiry on WhatsApp"; }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (submitting) { return; }

    $$(".field__error", form).forEach(function (x) { x.textContent = ""; });
    $$("[aria-invalid]", form).forEach(function (x) { x.removeAttribute("aria-invalid"); });

    var errors = validate();
    if (errors.length) { showErrors(errors); return; }
    $("#error-summary").hidden = true;

    var button = $("#submit-button");
    var result = $("#form-result");

    // WhatsApp: open the chat now (still inside the click, so it is not blocked as a pop-up).
    if (viaWhatsApp) {
      var link = whatsappEnquiryLink(payload());
      window.open(link, "_blank", "noopener");
      var c = RM.config.contact;
      result.className = "form-result";
      result.innerHTML =
        "<strong>WhatsApp has opened with your enquiry.</strong> Press send in WhatsApp to deliver it. This is not a booking confirmation." +
        '<p><a class="btn btn--primary" href="' + link + '" target="_blank" rel="noopener">Open WhatsApp again</a>' +
        (c.phone ? ' <a class="btn btn--outline" href="tel:' + c.phone + '">Call ' + RM.escape(c.phone) + "</a>" : "") + "</p>";
      result.scrollIntoView({ block: "nearest" });
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
          '<p><a class="btn btn--outline" href="' + whatsappLink(data) + '" target="_blank" rel="noopener">Also message us on WhatsApp</a></p>';
        form.reset();
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
        button.textContent = "Send Enquiry";
        result.scrollIntoView({ block: "nearest" });
      });
  });
})();