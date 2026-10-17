/**
 * Founders: renders profile cards from the media manifest.
 * Cards without a name show a neutral placeholder.
 */
(function () {
  var container = RM.$("#founders");
  if (!container) { return; }

  var founders = RM.media.founders && RM.media.founders.length ? RM.media.founders : [{}, {}];

  container.innerHTML = founders.map(function (f) {
    var empty = !f.name;
    var photo = f.photo ? '<img src="' + RM.base + f.photo + '" alt="' + RM.escape(f.name || "Founder") + '" loading="lazy">' : "";
    return '<article class="founder' + (empty ? " founder--empty" : "") + '">' +
      '<div class="founder__photo"><div>' + photo + "</div></div>" +
      "<h3>" + RM.escape(f.name || "Founder name") + "</h3>" +
      '<p class="founder__role">' + RM.escape(f.role || "Role") + "</p>" +
      "<p>" + RM.escape(f.bio || "A short biography will appear here.") + "</p></article>";
  }).join("");
})();
