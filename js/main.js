/* ==========================================================================
   Orange Bird — main.js
   Shared shell behaviour: active nav, search, mobile drawer, follows,
   profile session state, toasts and small DOM helpers.
   ========================================================================== */

(function () {
  "use strict";

  var OB = (window.OB = window.OB || {});
  var LOGO = "assets/logo orange bird.png";

  /* ----------------------------- storage ----------------------------- */
  OB.store = {
    get: function (key, fallback) {
      try {
        var raw = sessionStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  /* ----------------------------- escaping / formatting ----------------------------- */
  OB.escape = function (value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  OB.formatCount = function (n) {
    n = Number(n) || 0;
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  };

  OB.highlight = function (text, query) {
    var escaped = OB.escape(text);
    var q = String(query || "").trim();
    if (!q) return escaped;
    try {
      var safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return escaped.replace(new RegExp("(" + safe + ")", "ig"), "<mark>$1</mark>");
    } catch (e) {
      return escaped;
    }
  };

  OB.toast = function (message, duration) {
    var toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(OB._toastTimer);
    OB._toastTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, duration || 2400);
  };

  /* ----------------------------- icons (for JS-rendered content) ----------------------------- */
  var ICONS = {
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    repeat: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    "chevron-left": '<polyline points="15 18 9 12 15 6"/>',
    "chevron-right": '<polyline points="9 18 15 12 9 6"/>',
    "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    "user-plus": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>',
    "user-check": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    "map-pin": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    "bell-off": '<path d="M13.73 21a2 2 0 0 1-3.46 0"/><path d="M18.63 13A17.89 17.89 0 0 1 18 8"/><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"/><path d="M18 8a6 6 0 0 0-9.33-5"/><line x1="1" y1="1" x2="23" y2="23"/>',
    "shopping-bag": '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-4.9-4.5-9-10-9z"/>',
    "help-circle": '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
    upload: '<polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    "trending-up": '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/><path d="M5 3l.7 1.8L7.5 5.5 5.7 6.2 5 8l-.7-1.8L2.5 5.5l1.8-.7z"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    headphones: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    feather: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>',
    x2: '<path d="M4 4l16 16"/><path d="M20 4L4 20"/>'
  };

  OB.icon = function (name, size) {
    size = size || 16;
    var inner = ICONS[name] || ICONS.sparkles || ICONS.star;
    return (
      '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      inner +
      "</svg>"
    );
  };

  /* ----------------------------- user/profile helpers ----------------------------- */
  OB.getProfile = function () {
    var saved = OB.store.get("ob_profile", null);
    var base = CURRENT_USER;
    if (!saved) return Object.assign({}, base);
    return Object.assign({}, base, saved);
  };

  OB.saveProfile = function (patch) {
    var current = OB.getProfile();
    var next = Object.assign({}, current, patch);
    OB.store.set("ob_profile", next);
    OB.refreshProfileUI();
    return next;
  };

  OB.refreshProfileUI = function () {
    var profile = OB.getProfile();
    document.querySelectorAll("[data-current-name]").forEach(function (el) {
      el.textContent = profile.name;
    });
    document.querySelectorAll("[data-current-handle]").forEach(function (el) {
      el.textContent = "@" + profile.handle;
    });
    document.querySelectorAll("[data-current-avatar]").forEach(function (img) {
      if (profile.avatar && img.getAttribute("src") !== profile.avatar) {
        img.setAttribute("src", profile.avatar);
      }
    });
  };

  OB.userUrl = function (handle) {
    if (handle === CURRENT_USER.handle) return "profile.html";
    return "user.html?u=" + encodeURIComponent(handle);
  };

  OB.postUrl = function (id) {
    return "post-detail.html?id=" + encodeURIComponent(id);
  };

  OB.verified = function (user) {
    if (!user || !user.verified) return "";
    return '<span class="verified" title="Verified" aria-label="Verified">' + OB.icon("check", 9) + "</span>";
  };

  /* ----------------------------- follows ----------------------------- */
  OB.getFollows = function () {
    return OB.store.get("ob_follows", ["aiartman", "fantasy_ai_author"]);
  };

  OB.isFollowing = function (handle) {
    return OB.getFollows().indexOf(handle) !== -1;
  };

  OB.toggleFollow = function (handle) {
    var follows = OB.getFollows();
    var i = follows.indexOf(handle);
    if (i === -1) {
      follows.push(handle);
      OB.toast("Following @" + handle);
    } else {
      follows.splice(i, 1);
      OB.toast("Unfollowed @" + handle);
    }
    OB.store.set("ob_follows", follows);
    document.querySelectorAll('[data-follow="' + handle + '"]').forEach(function (btn) {
      var following = OB.isFollowing(handle);
      btn.classList.toggle("btn-primary", !following);
      btn.classList.toggle("btn-secondary", following);
      btn.innerHTML = following ? "Following" : "Follow";
      btn.setAttribute("aria-pressed", following ? "true" : "false");
    });
    return OB.isFollowing(handle);
  };

  OB.followButton = function (user, size) {
    var following = OB.isFollowing(user.handle);
    return (
      '<button class="btn ' +
      (following ? "btn-secondary" : "btn-primary") +
      " " +
      (size || "btn-sm") +
      '" data-follow="' +
      OB.escape(user.handle) +
      '" aria-pressed="' +
      (following ? "true" : "false") +
      '">' +
      (following ? "Following" : "Follow") +
      "</button>"
    );
  };

  /* ----------------------------- post interaction state ----------------------------- */
  OB.getLikes = function () {
    return OB.store.get("ob_likes", []);
  };
  OB.isLiked = function (id) {
    return OB.getLikes().indexOf(Number(id)) !== -1;
  };
  OB.toggleLike = function (id) {
    var likes = OB.getLikes();
    var i = likes.indexOf(Number(id));
    if (i === -1) likes.push(Number(id));
    else likes.splice(i, 1);
    OB.store.set("ob_likes", likes);
    return OB.isLiked(id);
  };

  OB.getReposts = function () {
    return OB.store.get("ob_reposts", []);
  };
  OB.isReposted = function (id) {
    return OB.getReposts().indexOf(Number(id)) !== -1;
  };
  OB.toggleRepost = function (id) {
    var items = OB.getReposts();
    var i = items.indexOf(Number(id));
    if (i === -1) items.push(Number(id));
    else items.splice(i, 1);
    OB.store.set("ob_reposts", items);
    return OB.isReposted(id);
  };

  OB.getBookmarks = function () {
    return OB.store.get("ob_bookmarks", [2, 8, 15, 24, 35, 47]);
  };
  OB.isBookmarked = function (id) {
    return OB.getBookmarks().indexOf(Number(id)) !== -1;
  };
  OB.toggleBookmark = function (id) {
    var items = OB.getBookmarks();
    var i = items.indexOf(Number(id));
    if (i === -1) items.push(Number(id));
    else items.splice(i, 1);
    OB.store.set("ob_bookmarks", items);
    return OB.isBookmarked(id);
  };

  /* ----------------------------- active navigation ----------------------------- */
  function setActiveNav() {
    var page = document.body.getAttribute("data-page") || "";
    if (!page) return;
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      var isActive = link.getAttribute("data-nav") === page;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  /* ----------------------------- search ----------------------------- */
  function initSearch() {
    document.querySelectorAll("form.js-search-form").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var input = form.querySelector('input[type="search"], input[name="q"], input[type="text"]');
        var q = input ? input.value.trim() : "";
        window.location.href = "search.html" + (q ? "?q=" + encodeURIComponent(q) : "");
      });
    });
  }

  /* ----------------------------- mobile drawer ----------------------------- */
  function initMobileMenu() {
    var toggle = document.querySelector(".js-mobile-toggle");
    var scrim = document.querySelector(".scrim");
    function close() {
      document.body.classList.remove("mobile-open");
      document.body.classList.remove("no-scroll");
    }
    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = document.body.classList.toggle("mobile-open");
        document.body.classList.toggle("no-scroll", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    if (scrim) scrim.addEventListener("click", close);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });
  }

  /* ----------------------------- copy prompt ----------------------------- */
  function initCopyButtons() {
    document.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-copy]");
      if (!btn) return;
      event.preventDefault();
      var text = btn.getAttribute("data-copy");
      function done() {
        OB.toast("Prompt copied to clipboard");
        var old = btn.innerHTML;
        btn.innerHTML = OB.icon("check", 14) + " Copied";
        window.setTimeout(function () { btn.innerHTML = old; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          OB.toast("Copy failed — select the prompt manually");
        });
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { OB.toast("Copy failed"); }
        document.body.removeChild(ta);
      }
    });
  }

  /* ----------------------------- follow / nav clicks ----------------------------- */
  function initGlobalClicks() {
    document.addEventListener("click", function (event) {
      var follow = event.target.closest("[data-follow]");
      if (follow) {
        event.preventDefault();
        event.stopPropagation();
        OB.toggleFollow(follow.getAttribute("data-follow"));
      }
    });
  }

  /* ----------------------------- image fallback ----------------------------- */
  function initImageFallback() {
    document.addEventListener(
      "error",
      function (event) {
        var img = event.target;
        if (img && img.tagName === "IMG" && img.getAttribute("data-fallback") !== "done") {
          img.setAttribute("data-fallback", "done");
          img.src = LOGO;
        }
      },
      true
    );
  }

  /* ----------------------------- theme / accessibility settings ----------------------------- */
  function initStoredSettings() {
    var settings = OB.store.get("ob_settings", {});
    if (settings.reduceMotion) document.documentElement.style.scrollBehavior = "auto";
    if (settings.compact) document.body.classList.add("compact-feed");
  }

  /* ----------------------------- boot ----------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    setActiveNav();
    initSearch();
    initMobileMenu();
    initCopyButtons();
    initGlobalClicks();
    initImageFallback();
    initStoredSettings();
    OB.refreshProfileUI();
    if (typeof window.obInitPage === "function") window.obInitPage();
  });
})();
