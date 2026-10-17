/**
 * Small helpers shared by the other scripts.
 */
window.RM = window.RM || {};

RM.base = window.RM_BASE || "";
RM.media = window.RM_MEDIA || { sections: {}, founders: [], hero: {} };

RM.$ = function (selector, root) {
  return (root || document).querySelector(selector);
};

RM.$$ = function (selector, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(selector));
};

RM.escape = function (text) {
  var map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  return String(text).replace(/[&<>"]/g, function (c) {
    return map[c];
  });
};
