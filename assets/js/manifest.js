/* Media lives in the repository root: Video/haldi/video1.mp4,
   Video/sangeet/video2.webm, Video/haldi/image1.jpg, etc.
   Nested folders are supported. Folder names are case-insensitive.
   On a custom domain or local preview, fill in owner and repo below.
   Use a PUBLIC repository. Never put a GitHub access token in this file. */
(function () {
  "use strict";
  var config = window.RM_GITHUB = Object.assign({
    owner: "", repo: "", branch: "main", directory: "Video"
  }, window.RM_GITHUB || {});
  var script = document.currentScript;
  var root = new URL("../../", script ? script.src : location.href);
  if (/\.github\.io$/i.test(root.hostname)) {
    config.owner = config.owner || root.hostname.split(".")[0];
    config.repo = config.repo || root.pathname.split("/").filter(Boolean)[0] || root.hostname;
  }
  var folders = {
    home: "home", about: "about", founders: "founders",
    "behind-the-scenes": "behind-the-scenes", "sangeet-entry": "sangeet",
    "varmala-entry": "varmala", "haldi-entry": "haldi",
    choreography: "choreography", "special-artists": "special-artists",
    "virtual-sessions": "virtual-sessions", "technical-rehearsals": "technical-rehearsals"
  };
  var media = window.RM_MEDIA = {
    hero: {src: "", poster: ""}, founders: [], sections: {}, error: ""
  };
  Object.keys(folders).forEach(function (key) { media.sections[key] = []; });
  function encoded(path) { return path.split("/").map(encodeURIComponent).join("/"); }
  function normalize(value) { return value.toLowerCase().replace(/[ _]+/g, "-"); }
  function request(url) {
    return fetch(url, {headers: {Accept: "application/vnd.github+json"}}).then(function (response) {
      if (!response.ok) throw new Error("GitHub media request failed (" + response.status + ").");
      return response.json();
    });
  }
  media.ready = Promise.resolve().then(function () {
    if (!config.owner || !config.repo) throw new Error("Set the GitHub owner and repo in assets/js/manifest.js to load media.");
    var api = "https://api.github.com/repos/" + encodeURIComponent(config.owner) + "/" + encodeURIComponent(config.repo) + "/git/trees/";
    return request(api + encodeURIComponent(config.branch)).then(function (tree) {
      var folder = tree.tree.find(function (entry) { return entry.type === "tree" && entry.path === config.directory; });
      if (!folder) throw new Error("The repository needs a " + config.directory + "/ folder at its root.");
      return request(api + folder.sha + "?recursive=1");
    }).then(function (tree) {
      if (tree.truncated) throw new Error("Media folder is too large to list completely. Split it into a smaller repository.");
      var files = tree.tree.filter(function (entry) {
        return entry.type === "blob" && /\.(mp4|webm|jpe?g|png|gif|webp|avif)$/i.test(entry.path);
      }).sort(function (a, b) { return a.path.localeCompare(b.path, undefined, {numeric: true, sensitivity: "base"}); });
      var base = "https://raw.githubusercontent.com/" + encodeURIComponent(config.owner) + "/" + encodeURIComponent(config.repo) + "/" + encodeURIComponent(config.branch) + "/" + encoded(config.directory) + "/";
      files.forEach(function (file) {
        var parts = file.path.split("/"), folder = normalize(parts[0]);
        var name = parts[parts.length - 1], stem = name.replace(/\.[^.]+$/, "");
        var item = {src: base + encoded(file.path), type: /\.(mp4|webm)$/i.test(name) ? "video" : "image", title: stem.replace(/[-_]+/g, " "), poster: ""};
        if (folder === "hero" && !media.hero.src) media.hero = item;
        Object.keys(folders).forEach(function (key) {
          if (folder === normalize(folders[key]) || folder === key) media.sections[key].push(item);
        });
      });
      // If no dedicated home folder exists, show all experience media on home.
      if (!media.sections.home.length) Object.keys(folders).forEach(function (key) {
        if (["home", "about", "founders"].indexOf(key) < 0) media.sections.home = media.sections.home.concat(media.sections[key]);
      });
      return media;
    });
  }).catch(function (error) { media.error = error.message; console.warn(error.message); return media; });
})();
