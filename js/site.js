(function () {
  var KEY = "tn-language";

  function lang() {
    return localStorage.getItem(KEY) === "zh" ? "zh" : "en";
  }

  function apply(next) {
    localStorage.setItem(KEY, next);
    document.documentElement.lang = next === "zh" ? "zh-Hant" : "en";
    document.querySelectorAll("[data-en]").forEach(function (el) {
      el.textContent = el.getAttribute(next === "zh" ? "data-zh" : "data-en");
    });
    document.querySelectorAll("[data-lang-label]").forEach(function (el) {
      el.textContent = next === "zh" ? "English" : "中文";
    });
  }

  document.addEventListener("click", function (event) {
    var toggle = event.target.closest("[data-lang-toggle]");
    if (toggle) {
      apply(lang() === "zh" ? "en" : "zh");
    }
    var menuBtn = event.target.closest("[data-menu-open]");
    var menu = document.querySelector("[data-mobile-menu]");
    if (menuBtn && menu) {
      menu.classList.toggle("open");
      return;
    }
    if (event.target.closest("[data-menu-close]") && menu) {
      menu.classList.remove("open");
    }
    if (menu && menu.classList.contains("open") && !event.target.closest(".menu-slot")) {
      menu.classList.remove("open");
    }
  });

  apply(lang());
})();
