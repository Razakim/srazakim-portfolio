/* Razakim Savadogo — Portfolio : interactions (vanilla JS, zéro dépendance) */
(function () {
  "use strict";

  /* ---------- Thème sombre / clair ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var storedTheme = null;
  try { storedTheme = localStorage.getItem("rs-theme"); } catch (e) { /* stockage indisponible */ }
  var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  if (storedTheme === "light" || (!storedTheme && prefersLight)) {
    root.setAttribute("data-theme", "light");
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      if (next === "light") { root.setAttribute("data-theme", "light"); }
      else { root.removeAttribute("data-theme"); }
      try { localStorage.setItem("rs-theme", next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Header : état au scroll ---------- */
  var header = document.querySelector(".site-header");
  var backToTop = document.getElementById("back-to-top");
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle("scrolled", y > 24);
    if (backToTop) backToTop.classList.toggle("visible", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Scrollspy ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-menu a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Apparition au scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { reveal.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Marquee (duplication pour boucle parfaite) ---------- */
  var marquee = document.getElementById("marquee-track");
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
  }

  /* ---------- Carrousel de certificats (26 cartes) ---------- */
  var carousel = document.getElementById("cert-carousel");
  var CERT_COUNT = 26;
  if (carousel) {
    var awardSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/></svg>';
    var html = "";
    for (var i = 1; i <= CERT_COUNT; i++) {
      var num = (i < 10 ? "0" : "") + i;
      html +=
        '<article class="cert-card">' +
          '<div class="cert-icon">' + awardSvg + '</div>' +
          '<h3>Certificat ' + num + '</h3>' +
          '<p>Certification / diplôme — à compléter</p>' +
        '</article>';
    }
    carousel.innerHTML = html;

    var prev = document.getElementById("cert-prev");
    var next = document.getElementById("cert-next");
    function step() { var card = carousel.querySelector(".cert-card"); return card ? card.offsetWidth + 18 : 260; }
    if (prev) prev.addEventListener("click", function () { carousel.scrollBy({ left: -step() * 2, behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { carousel.scrollBy({ left: step() * 2, behavior: "smooth" }); });
  }

  /* ---------- Effet tilt sur la carte hero ---------- */
  var heroCard = document.getElementById("hero-card");
  var fine = window.matchMedia("(pointer: fine)").matches;
  var noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (heroCard && fine && !noMotion) {
    heroCard.addEventListener("mousemove", function (e) {
      var r = heroCard.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      heroCard.style.transform = "perspective(700px) rotateY(" + x * 8 + "deg) rotateX(" + -y * 8 + "deg)";
    });
    heroCard.addEventListener("mouseleave", function () {
      heroCard.style.transform = "perspective(700px) rotateY(0) rotateX(0)";
    });
  }

  /* ---------- Année du footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
