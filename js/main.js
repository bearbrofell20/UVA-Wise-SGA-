/* =====================================================================
   UVA Wise SGA — site interactions
   ===================================================================== */
(function () {
  "use strict";

  /* ---- Enable JS-only enhancements (scroll-reveal). Without this class,
     .reveal content stays fully visible for no-JS robustness. ---- */
  document.documentElement.classList.add("js");

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  var backdrop = document.querySelector(".nav-backdrop");

  function closeNav() {
    if (!links) return;
    links.classList.remove("open");
    document.body.classList.remove("nav-open");
    if (backdrop) backdrop.classList.remove("show");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      if (backdrop) backdrop.classList.toggle("show", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeNav);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });
  // Close menu when a link is tapped
  if (links) {
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  /* ---- Highlight current page in nav ---- */
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a[href]").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Current year in footer ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Contact form: only @uvawise.edu addresses may send, and the
     message is routed to the SGA president's inbox. ---- */
  var form = document.getElementById("contact-form");
  if (form) {
    var SGA_EMAIL = "sgapresident@uvawise.edu";
    /* Paste a Formspree endpoint here (e.g. "https://formspree.io/f/xxxxxxxx")
       to have messages delivered straight to the SGA inbox. While it is
       empty, the form opens the sender's email app addressed to the SGA. */
    var FORMSPREE_ENDPOINT = "";
    var emailField = form.querySelector("#email");
    var nameField = form.querySelector("#name");
    var msgField = form.querySelector("#message");
    var topicField = form.querySelector("#topic");
    var submitBtn = form.querySelector('button[type="submit"]');
    var status = document.getElementById("form-status");
    var hint = document.getElementById("email-hint");

    function isUvawise(v) { return /@uvawise\.edu$/i.test((v || "").trim()); }
    function ready() {
      return (nameField && nameField.value.trim()) &&
             (msgField && msgField.value.trim()) &&
             isUvawise(emailField && emailField.value);
    }
    function refresh() {
      var val = emailField ? emailField.value : "";
      if (val && !isUvawise(val)) {
        emailField.classList.add("invalid");
        if (hint) { hint.innerHTML = "Please use your <strong>@uvawise.edu</strong> email address."; hint.className = "form-note err"; }
      } else {
        if (emailField) emailField.classList.remove("invalid");
        if (hint) { hint.innerHTML = "Only <strong>@uvawise.edu</strong> email addresses can send a message."; hint.className = "form-note"; }
      }
      if (submitBtn) submitBtn.disabled = !ready();
    }
    ["input", "change", "keyup", "blur"].forEach(function (ev) {
      form.addEventListener(ev, refresh, true);
    });
    refresh();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!isUvawise(emailField && emailField.value)) {
        if (status) { status.textContent = "Only @uvawise.edu email addresses can send a message."; status.className = "form-status err"; }
        if (emailField) emailField.focus();
        return;
      }
      var name = nameField ? nameField.value.trim() : "";
      var topic = topicField && topicField.value ? topicField.value : "Message";
      var message = msgField ? msgField.value.trim() : "";
      var first = name.split(" ")[0] || "";

      /* Preferred path: deliver to the SGA inbox through Formspree. */
      if (FORMSPREE_ENDPOINT && window.fetch) {
        if (submitBtn) submitBtn.disabled = true;
        if (status) { status.textContent = "Sending…"; status.className = "form-status"; }
        fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form)
        }).then(function (r) {
          if (!r.ok) throw new Error("send failed");
          if (status) { status.textContent = "Thanks" + (first ? ", " + first : "") + ". Your message has been sent to the SGA."; status.className = "form-status ok"; }
          form.reset();
          refresh();
        }).catch(function () {
          if (status) { status.textContent = "Sorry, that didn't go through. Please email " + SGA_EMAIL + " directly."; status.className = "form-status err"; }
          if (submitBtn) submitBtn.disabled = false;
        });
        return;
      }

      /* Fallback: open the sender's email app addressed to the SGA. */
      var subject = "SGA Website: " + topic + (name ? " from " + name : "");
      var body = "Name: " + name + "\nEmail: " + emailField.value.trim() +
                 "\nTopic: " + topic + "\n\n" + message;
      window.location.href = "mailto:" + SGA_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      if (status) {
        status.textContent = "Opening your email app to send to " + SGA_EMAIL + ".";
        status.className = "form-status ok";
      }
    });
  }
})();
