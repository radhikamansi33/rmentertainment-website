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

  // Cover: full-width banner above the hero text; the side visual is removed.
  if (heroSlot && hero.type === "cover" && hero.src) {
    var heroSection = heroSlot.closest(".hero");
    heroSection.insertAdjacentHTML("beforebegin",
      '<div class="cover"><img src="' + RM.base + hero.src + '" alt="' + esc(hero.alt || "") + '"></div>');
    heroSlot.closest(".hero__visual").remove();
    heroSection.classList.add("hero--cover");
  }

  if (heroSlot && hero.type === "image" && hero.src) {
    heroSlot.innerHTML = '<img src="' + RM.base + hero.src + '" alt="' + esc(hero.alt || "Performers at a wedding celebration") + '">';
    // A photo is shown whole, without the arch frame cropping it.
    heroSlot.closest(".hero__visual").classList.add("hero__visual--photo");
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

  // data-videos="all" lists every section; data-live-only skips "coming soon" slots.
  $$("[data-videos]").forEach(function (grid) {
    var html = "";
    var keys = grid.dataset.videos === "all" ? Object.keys(RM.media.sections) : grid.dataset.videos.split(",");
    var liveOnly = grid.hasAttribute("data-live-only");
    var shown = [];
    keys.forEach(function (key) {
      (RM.media.sections[key] || []).forEach(function (slot, index) {
        if (liveOnly && !slot.live) { return; }
        if (shown.indexOf(key) === -1) { shown.push(key); }
        html += tileHtml(key, index, slot);
      });
    });
    grid.innerHTML = html || '<p class="note">Films appear here as they are added.</p>';

    var filters = $(".filters[data-auto]", grid.parentNode);
    if (filters) {
      filters.hidden = shown.length < 2;
      filters.innerHTML = '<button type="button" aria-pressed="true" data-filter="all">All</button>' +
        shown.map(function (key) {
          return '<button type="button" aria-pressed="false" data-filter="' + key + '">' +
            esc(RM.config.sectionLabels[key] || key) + "</button>";
        }).join("");
    }

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

  /* ---- Photo gallery: data-photos="" shows all, data-photos="key" one section.
     The section stays hidden until it has photos. ---- */
  $$("[data-photos]").forEach(function (grid) {
    var key = grid.dataset.photos;
    var photos = (RM.media.photos || []).filter(function (photo) {
      return !key || photo.section === key;
    });
    if (!photos.length) { return; }
    grid.innerHTML = photos.map(function (photo) {
      var src = RM.base + photo.src;
      return '<a class="photo-tile" href="' + src + '" target="_blank" rel="noopener">' +
        '<img src="' + src + '" alt="' + esc(photo.alt || "") + '" loading="lazy"></a>';
    }).join("");
    grid.closest("section").hidden = false;
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
      // Only the grid next to the filters; other sections on the page stay visible.
      $$(".video-tile", button.closest(".wrap")).forEach(function (tile) {
        tile.hidden = !(button.dataset.filter === "all" || tile.dataset.key === button.dataset.filter);
      });
    });
  });
})();
