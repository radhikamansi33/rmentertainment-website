/**
 * Footer year. All other behaviour lives in its own file.
 */
(function () {
  var year = RM.$("#year");
  if (year) { year.textContent = new Date().getFullYear(); }
})();
