/* ==========================================================================
   Orange Bird — auth.js
   Mock validation only. No credentials are stored or sent anywhere.
   ========================================================================== */

(function () {
  "use strict";

  var OB = window.OB || {};

  function setError(input, message) {
    if (!input) return;
    input.classList.add("error");
    input.setAttribute("aria-invalid", "true");
    var field = input.closest(".field");
    var error = field ? field.querySelector(".form-error") : null;
    if (error) error.textContent = message;
  }

  function clearError(input) {
    if (!input) return;
    input.classList.remove("error");
    input.removeAttribute("aria-invalid");
    var field = input.closest(".field");
    var error = field ? field.querySelector(".form-error") : null;
    if (error) error.textContent = "";
  }

  function clearFormErrors(form) {
    form.querySelectorAll(".input, .textarea").forEach(clearError);
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function finish(form, button, label, redirect) {
    button.disabled = true;
    button.innerHTML = label;
    window.setTimeout(function () {
      window.location.href = redirect;
    }, 650);
  }

  function initPasswordToggles() {
    document.querySelectorAll("[data-toggle-password]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var input = document.getElementById(btn.getAttribute("data-toggle-password"));
        if (!input) return;
        var show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
        btn.innerHTML = show ? "Hide" : "Show";
      });
    });
  }

  function initPasswordMeter() {
    var input = document.getElementById("password");
    var meter = document.getElementById("password-strength");
    if (!input || !meter) return;
    input.addEventListener("input", function () {
      var value = input.value;
      var score = 0;
      if (value.length >= 6) score++;
      if (value.length >= 10) score++;
      if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
      if (/[0-9]/.test(value) || /[^A-Za-z0-9]/.test(value)) score++;
      var labels = ["Too short", "Weak", "Okay", "Good", "Strong"];
      meter.textContent = value ? "Password strength: " + labels[score] : "";
      meter.style.color = score < 2 ? "var(--danger)" : score < 3 ? "var(--primary-hover)" : "var(--success)";
    });
  }

  function initLogin() {
    var form = document.querySelector('form[data-auth="login"]');
    if (!form) return;
    var email = form.querySelector("#email");
    var password = form.querySelector("#password");
    var button = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearFormErrors(form);
      var ok = true;
      if (!email.value.trim()) { setError(email, "Enter your email address."); ok = false; }
      else if (!validEmail(email.value.trim())) { setError(email, "That email address does not look right."); ok = false; }
      if (!password.value) { setError(password, "Enter your password."); ok = false; }
      else if (password.value.length < 6) { setError(password, "Password must be at least 6 characters."); ok = false; }
      if (!ok) {
        var first = form.querySelector(".input.error");
        if (first) first.focus();
        return;
      }
      if (button) finish(form, button, "Signing in\u2026", "home.html");
    });

    [email, password].forEach(function (input) {
      if (input) input.addEventListener("input", function () { clearError(input); });
    });
  }

  function initSignup() {
    var form = document.querySelector('form[data-auth="signup"]');
    if (!form) return;
    var name = form.querySelector("#name");
    var handle = form.querySelector("#handle");
    var email = form.querySelector("#email");
    var password = form.querySelector("#password");
    var confirm = form.querySelector("#confirm-password");
    var terms = form.querySelector("#terms");
    var button = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearFormErrors(form);
      var ok = true;
      if (!name.value.trim() || name.value.trim().length < 2) { setError(name, "Enter your name (at least 2 characters)."); ok = false; }
      if (!handle.value.trim() || !/^[a-zA-Z0-9_]{3,15}$/.test(handle.value.trim())) {
        setError(handle, "Use 3–15 letters, numbers or underscores."); ok = false;
      }
      if (!email.value.trim()) { setError(email, "Enter your email address."); ok = false; }
      else if (!validEmail(email.value.trim())) { setError(email, "That email address does not look right."); ok = false; }
      if (!password.value) { setError(password, "Choose a password."); ok = false; }
      else if (password.value.length < 6) { setError(password, "Password must be at least 6 characters."); ok = false; }
      if (!confirm.value) { setError(confirm, "Confirm your password."); ok = false; }
      else if (confirm.value !== password.value) { setError(confirm, "Passwords do not match."); ok = false; }
      if (terms && !terms.checked) {
        var termField = terms.closest(".field");
        var termError = termField ? termField.querySelector(".form-error") : null;
        if (termError) termError.textContent = "Please accept the Terms and Privacy Policy.";
        ok = false;
      }
      if (!ok) {
        var first = form.querySelector(".input.error");
        if (first) first.focus();
        return;
      }
      if (OB.saveProfile) {
        OB.saveProfile({
          name: name.value.trim(),
          handle: handle.value.trim().toLowerCase(),
          bio: "New creator on Orange Bird. \ud83d\udc26"
        });
      }
      if (button) finish(form, button, "Creating account\u2026", "home.html");
    });

    [name, handle, email, password, confirm].forEach(function (input) {
      if (input) input.addEventListener("input", function () { clearError(input); });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLogin();
    initSignup();
    initPasswordToggles();
    initPasswordMeter();
  });
})();
