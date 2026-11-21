// 日本語・英語のどちらか片方だけを出す。#ja / #en、前に選んだ言語、ブラウザの言語の順で決める。
(function () {
  var root = document.documentElement;
  function pick() {
    var h = location.hash.slice(1);
    if (h === "ja" || h === "en") { try { localStorage.setItem("lang", h); } catch (e) {} return h; }
    var s = null;
    try { s = localStorage.getItem("lang"); } catch (e) {}
    if (s === "ja" || s === "en") return s;
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    return /^ja\b/i.test(prefs[0] || "") ? "ja" : "en";
  }
  function apply(l) {
    root.setAttribute("data-lang", l);
    root.lang = l;
    var t = root.getAttribute("data-title-" + l);
    if (t) document.title = t;
    var a = document.getElementById("langswitch");
    if (a) {
      var other = l === "ja" ? "en" : "ja";
      a.textContent = other === "ja" ? "日本語" : "English";
      a.setAttribute("lang", other);
      a.href = "#" + other;
    }
  }
  apply(pick());
  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-lang"));
    var a = document.getElementById("langswitch");
    if (a) a.addEventListener("click", function (e) {
      e.preventDefault();
      var l = root.getAttribute("data-lang") === "ja" ? "en" : "ja";
      try { localStorage.setItem("lang", l); } catch (err) {}
      if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
      apply(l);
      window.scrollTo(0, 0);
    });
  });
  window.addEventListener("hashchange", function () {
    var h = location.hash.slice(1);
    if (h === "ja" || h === "en") apply(h);
  });
})();
