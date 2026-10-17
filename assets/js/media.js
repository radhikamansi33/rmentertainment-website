/**
 * Media: hero, video tiles (live or placeholder), filters, and the video dialog.
 */
(function () {
  var $ = RM.$, $$ = RM.$$, esc = RM.escape;
  var dialog = $("#video-dialog");
  var player = $("#video-player");
  var lastTrigger = null;

  /* ---- Hero image or video ---- */
  var heroSlot = $("#hero-media");
  var hero = RM.media.hero || {};

  if (heroSlot && hero.type === "image" && hero.src) {
    heroSlot.innerHTML = '<img src="' + RM.base + hero.src + '" alt="Performers at a wedding celebration">';
  }

  if (heroSlot && hero.type === "video" && hero.src) {
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (navigator.connection && (navigator.connection.saveData || /2g/.test(navigator.connection.effectiveType)));
    heroSlot.innerHTML =
      '<video muted loop playsinline poster="' + RM.base + (hero.poster || "") + '" aria-label="Showreel, muted">' +
      '<source src="' + RM.base + hero.src + '"></video>' +
      '<button class="hero-pause" type="button">' + (calm ? "Play video" : "Pause video") + "</button>";
    var heroVideo = $("video", heroSlot);
    var heroButton = $(".hero-pause", heroSlot);
    if (!calm) { heroVideo.play().catch(function () {}); }
    heroButton.addEventListener("click", function () {
      if (heroVideo.paused) { heroVideo.play(); heroButton.textContent = "Pause video"; }
      else { heroVideo.pause(); heroButton.textContent = "Play video"; }
    });
  }

  /* ---- Video tiles ---- */
  function tileHtml(key, index, slot) {
    var number = index + 1;
    var label = RM.config.sectionLabels[key] || key;
    var title = esc(slot.title || "Video " + number);

    if (slot.live) {
      var poster = RM.base + "assets/videos/" + key + "/posters/video-" + number + ".jpg";
      return '<figure class="video-tile" data-key="' + key + '">' +
        '<button class="video-tile__frame" type="button" data-key="' + key + '" data-index="' + index + '" aria-label="Play video: ' + title + " (" + esc(label) + ')">' +
        '<img src="' + poster + '" alt="" loading="lazy"><span class="video-tile__play">Play video</span></button>' +
        '<figcaption><strong>' + title + '</strong><span class="meta">' + esc(label) + "</span></figcaption></figure>";
    }
    return '<figure class="video-tile video-tile--empty" data-key="' + key + '">' +
      '<div class="video-tile__frame" role="img" aria-label="Placeholder for ' + esc(label) + " video " + number + '"></div>' +
      '<figcaption><strong>Video ' + number + ' (coming soon)</strong><span class="meta">' + esc(label) + "</span></figcaption></figure>";
  }

  $$("[data-videos]").forEach(function (grid) {
    var html = "";
    grid.dataset.videos.split(",").forEach(function (key) {
      (RM.media.sections[key] || []).forEach(function (slot, index) {
        html += tileHtml(key, index, slot);
      });
    });
    grid.innerHTML = html;

    grid.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-key]");
      if (!button) { return; }
      lastTrigger = button;
      var key = button.dataset.key;
      var n = Number(button.dataset.index) + 1;
      player.src = RM.base + "assets/videos/" + key + "/video-" + n + ".mp4";
      player.poster = RM.base + "assets/videos/" + key + "/posters/video-" + n + ".jpg";
      dialog.showModal();
      player.play().catch(function () {});
    });
  });

  /* ---- Dialog: Escape closes, focus returns to the trigger ---- */
  function closeDialog() {
    player.pause();
    player.removeAttribute("src");
    player.load();
    if (dialog.open) { dialog.close(); }
    if (lastTrigger) { lastTrigger.focus(); }
  }
  $("#video-close").addEventListener("click", closeDialog);
  dialog.addEventListener("close", function () {
    player.pause();
    if (lastTrigger) { lastTrigger.focus(); }
  });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) { closeDialog(); }
  });

  /* ---- Category filters (Our Work) ---- */
  var filterButtons = $$(".filters button");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.setAttribute("aria-pressed", b === button); });
      $$(".video-tile").forEach(function (tile) {
        tile.hidden = !(button.dataset.filter === "all" || tile.dataset.key === button.dataset.filter);
      });
    });
  });
})();
