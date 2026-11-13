/* ==========================================================================
   Orange Bird — feed.js
   Page renderers and interactions: feed, galleries, search, compose,
   post detail, profiles, people, notifications, messages and services.
   ========================================================================== */

(function () {
  "use strict";

  var OB = window.OB;
  var LOGO = "assets/logo orange bird.png";

  /* ----------------------------- helpers ----------------------------- */
  function $(id) {
    return document.getElementById(id);
  }

  function params() {
    return new URLSearchParams(window.location.search);
  }

  function avatar(user, cls) {
    if (!user) user = CURRENT_USER;
    return (
      '<img class="avatar ' + (cls || "") + '" src="' + OB.escape(user.avatar || LOGO) +
      '" alt="' + OB.escape(user.name) + '" data-fallback="1">'
    );
  }

  function linkify(text) {
    var safe = OB.escape(text);
    safe = safe.replace(/(^|[\s(])(#[A-Za-z0-9_]+)/g, function (_, pre, tag) {
      return pre + '<a href="hashtag.html?tag=' + encodeURIComponent(tag.slice(1)) + '">' + tag + "</a>";
    });
    safe = safe.replace(/(^|[\s(])(@[A-Za-z0-9_]+)/g, function (_, pre, handle) {
      return pre + '<a href="' + OB.userUrl(handle.slice(1)) + '">' + handle + "</a>";
    });
    return safe;
  }

  function emptyState(title, text, cta, href, icon) {
    return (
      '<div class="empty"><div class="empty-icon">' + OB.icon(icon || "image", 22) + "</div>" +
      "<h3>" + OB.escape(title) + "</h3><p>" + OB.escape(text) + "</p>" +
      (cta ? '<a class="btn btn-primary btn-sm" href="' + href + '">' + OB.escape(cta) + "</a>" : "") +
      "</div>"
    );
  }

  function categoryLabel(cat) {
    var meta = CATEGORY_META[cat];
    return meta ? meta.short : "Post";
  }

  /* ----------------------------- post cards ----------------------------- */
  function postCard(post, options) {
    options = options || {};
    var user = obGetUser(post.userId);
    var image = post.imageId ? obGetImage(post.imageId) : null;
    var liked = OB.isLiked(post.id);
    var reposted = OB.isReposted(post.id);
    var bookmarked = OB.isBookmarked(post.id);
    var likeCount = Number(post.likes) + (liked ? 1 : 0);
    var repostCount = Number(post.reposts) + (reposted ? 1 : 0);
    var url = OB.postUrl(post.id);
    var media = "";
    if (post.image) {
      media =
        '<a class="post-media" href="' + url + '" aria-label="Open post">' +
        '<img src="' + OB.escape(post.image) + '" alt="' + OB.escape(image ? image.title : "Post image") +
        '" loading="lazy" data-fallback="1">' +
        '<span class="post-media-meta"><span>' + OB.escape(image ? image.title : "Artwork") + "</span>" +
        "<span>" + OB.escape(image ? categoryLabel(image.category) : "Media") + "</span></span></a>";
    }
    var bookmarkCls = bookmarked ? " saved" : "";
    return (
      '<article class="post-card' + (options.detail ? " detail" : "") + '" data-post-id="' + post.id + '"' +
      (options.noLink ? "" : ' tabindex="0" role="link" aria-label="View post by ' + OB.escape(user.name) + '"') + ">" +
      '<a href="' + OB.userUrl(user.handle) + '" aria-label="View ' + OB.escape(user.name) + ' profile">' + avatar(user) + "</a>" +
      '<div class="post-body">' +
      '<header class="post-head">' +
      '<a class="post-name" href="' + OB.userUrl(user.handle) + '">' + OB.escape(user.name) + "</a>" + OB.verified(user) +
      '<a class="post-handle" href="' + OB.userUrl(user.handle) + '">@' + OB.escape(user.handle) + "</a>" +
      '<span class="post-sep">\u00b7</span>' +
      '<a class="post-time" href="' + url + '">' + OB.escape(post.time) + "</a>" +
      '<span class="post-menu"><button class="icon-btn" type="button" data-action="menu" data-id="' + post.id + '" aria-label="Post menu">' + OB.icon("more", 16) + "</button></span>" +
      "</header>" +
      '<p class="post-text">' + linkify(post.text) + "</p>" +
      media +
      '<footer class="post-actions">' +
      '<button class="post-action commented" type="button" data-action="reply" data-id="' + post.id + '" aria-label="Reply">' + OB.icon("message", 16) + "<span>" + post.replies + "</span></button>" +
      '<button class="post-action' + (reposted ? " reposted" : "") + '" type="button" data-action="repost" data-id="' + post.id + '" aria-pressed="' + reposted + '" aria-label="Repost">' + OB.icon("repeat", 16) + '<span class="action-count">' + repostCount + "</span></button>" +
      '<button class="post-action' + (liked ? " liked" : "") + '" type="button" data-action="like" data-id="' + post.id + '" aria-pressed="' + liked + '" aria-label="Like">' + OB.icon("heart", 16) + '<span class="action-count">' + likeCount + "</span></button>" +
      '<button class="post-action' + bookmarkCls + '" type="button" data-action="bookmark" data-id="' + post.id + '" aria-pressed="' + bookmarked + '" aria-label="Bookmark">' + OB.icon("bookmark", 16) + "</button>" +
      "</footer></div></article>"
    );
  }

  function renderFeed(containerId, posts) {
    var el = $(containerId);
    if (!el) return;
    if (!posts || !posts.length) {
      el.innerHTML = emptyState("No posts here yet", "Follow a few creators or explore the gallery to fill this space.", "Explore art", "explore.html", "image");
      return;
    }
    el.innerHTML = posts.map(function (p) { return postCard(p); }).join("");
  }

  function replyCard(reply) {
    var user = obGetUser(reply.userId);
    return (
      '<article class="post-card">' +
      '<a href="' + OB.userUrl(user.handle) + '">' + avatar(user) + "</a>" +
      '<div class="post-body"><header class="post-head">' +
      '<a class="post-name" href="' + OB.userUrl(user.handle) + '">' + OB.escape(user.name) + "</a>" + OB.verified(user) +
      '<a class="post-handle" href="' + OB.userUrl(user.handle) + '">@' + OB.escape(user.handle) + "</a>" +
      '<span class="post-sep">\u00b7</span><span class="post-time">' + OB.escape(reply.time) + "</span></header>" +
      '<p class="post-text">' + linkify(reply.text) + "</p>" +
      '<footer class="post-actions"><button class="post-action" type="button" data-action="like" data-id="' + reply.id + '">' + OB.icon("heart", 15) + "<span>" + reply.likes + "</span></button>" +
      '<button class="post-action" type="button" data-action="reply" data-id="' + reply.postId + '">' + OB.icon("message", 15) + " Reply</button></footer></div></article>"
    );
  }

  /* ----------------------------- user rows / widgets ----------------------------- */
  function userRow(user, options) {
    options = options || {};
    return (
      '<article class="user-row">' +
      '<a href="' + OB.userUrl(user.handle) + '">' + avatar(user) + "</a>" +
      '<div class="u-main">' +
      '<div class="u-name"><a href="' + OB.userUrl(user.handle) + '">' + OB.escape(user.name) + "</a> " + OB.verified(user) +
      ' <span class="u-handle">@' + OB.escape(user.handle) + "</span></div>" +
      '<p class="u-bio">' + OB.escape(user.bio) + "</p>" +
      (options.showStats ? '<div class="tiny muted" style="margin-top:4px">' + OB.formatCount(user.followers) + " followers \u00b7 " + OB.formatCount(user.following) + " following</div>" : "") +
      "</div>" +
      (options.noFollow ? "" : '<div class="u-actions">' + OB.followButton(user) + "</div>") +
      "</article>"
    );
  }

  function renderUserList(containerId, users, options) {
    var el = $(containerId);
    if (!el) return;
    if (!users.length) {
      el.innerHTML = emptyState("Nobody here yet", "Try exploring the gallery and following a few creators.", "Explore", "explore.html", "user");
      return;
    }
    el.innerHTML = users.map(function (u) { return userRow(u, options); }).join("");
  }

  function followRow(user) {
    return (
      '<div class="follow-row">' +
      '<a href="' + OB.userUrl(user.handle) + '">' + avatar(user) + "</a>" +
      '<div class="who"><a href="' + OB.userUrl(user.handle) + '">' + OB.escape(user.name) + " " + OB.verified(user) + "</a><span>@" + OB.escape(user.handle) + "</span></div>" +
      OB.followButton(user, "btn-xs") +
      "</div>"
    );
  }

  function renderSidebarWidgets() {
    var who = document.getElementById("who-to-follow");
    if (who) {
      who.innerHTML = USERS.filter(function (u) { return !u.isMe; }).slice(0, 3).map(followRow).join("");
    }
    document.querySelectorAll("[data-trending]").forEach(function (el) {
      el.innerHTML = HASHTAGS.slice(0, 5).map(function (tag) {
        return (
          '<a class="trend" href="hashtag.html?tag=' + encodeURIComponent(tag.tag.slice(1)) + '">' +
          '<span class="trend-meta">Trending in art</span>' +
          '<span class="trend-tag">' + OB.escape(tag.tag) + "</span>" +
          '<span class="trend-meta">' + OB.formatCount(tag.count) + " posts</span></a>"
        );
      }).join("");
    });
    document.querySelectorAll("[data-mini-gallery]").forEach(function (el) {
      var picks = [1, 8, 20, 33, 42, 51, 57, 58, 61];
      el.innerHTML = picks.map(function (id) {
        var img = obGetImage(id);
        if (!img) return "";
        return '<a href="' + OB.postUrl(img.id) + '" aria-label="' + OB.escape(img.title) + '"><img src="' + OB.escape(img.path) + '" alt="' + OB.escape(img.title) + '" loading="lazy"></a>';
      }).join("");
    });
  }

  /* ----------------------------- gallery rendering ----------------------------- */
  function imageTile(img, options) {
    options = options || {};
    var user = obGetUser(img.userId);
    var price = img.price ? '<span class="gallery-price">$' + img.price + "</span>" : "";
    var badge = '<span class="gallery-badge">' + OB.escape(categoryLabel(img.category)) + "</span>";
    var content =
      '<img src="' + OB.escape(img.path) + '" alt="' + OB.escape(img.title) + '" loading="lazy" data-fallback="1">' +
      badge + price +
      '<span class="gallery-overlay"><span class="g-title">' + OB.escape(img.title) + '</span><span class="g-meta"><span>@' +
      OB.escape(user.handle) + "</span><span>" + OB.icon("eye", 11) + " View</span></span></span>";
    if (options.lightbox) {
      return '<button type="button" class="gallery-item" data-index="' + options.index + '" aria-label="Open ' + OB.escape(img.title) + '">' + content + "</button>";
    }
    if (options.custom) return content;
    return '<a class="gallery-item" href="' + OB.postUrl(img.id) + '" aria-label="' + OB.escape(img.title) + '">' + content + "</a>";
  }

  function renderGallery(containerId, images, options) {
    var el = $(containerId);
    if (!el) return;
    options = options || {};
    if (!images || !images.length) {
      el.innerHTML = emptyState("No artwork here", "Try another category or explore all media.", "Browse gallery", "gallery.html", "image");
      return;
    }
    el.innerHTML = images.map(function (img, i) {
      return imageTile(img, Object.assign({}, options, { index: i }));
    }).join("");
  }

  function galleryFilters(containerId, active, counts) {
    var el = $(containerId);
    if (!el) return;
    var cats = [
      { key: "all", label: "All" },
      { key: "aiart", label: "AI Art" },
      { key: "fantasy", label: "Fantasy" },
      { key: "lofi", label: "Lofi" },
      { key: "marketplace", label: "Marketplace" },
      { key: "celistima", label: "Curation" }
    ];
    el.innerHTML = cats.map(function (cat) {
      return '<button class="tab' + (cat.key === active ? " active" : "") + '" type="button" data-cat="' + cat.key + '">' +
        cat.label + ' <span class="count">' + (counts[cat.key] || 0) + "</span></button>";
    }).join("");
  }

  /* ----------------------------- lightbox ----------------------------- */
  var lightboxItems = [];
  var lightboxIndex = 0;
  var lightboxLastFocus = null;

  function ensureLightbox() {
    if (document.getElementById("lightbox")) return;
    var el = document.createElement("div");
    el.id = "lightbox";
    el.className = "lightbox";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Artwork viewer");
    el.innerHTML =
      '<button class="lightbox-close" type="button" data-lb-close aria-label="Close viewer">' + OB.icon("x", 18) + "</button>" +
      '<div class="lightbox-inner">' +
      '<div class="lightbox-stage">' +
      '<button class="lightbox-nav prev" type="button" data-lb-prev aria-label="Previous image">' + OB.icon("chevron-left", 20) + "</button>" +
      '<img id="lightbox-img" src="" alt="">' +
      '<button class="lightbox-nav next" type="button" data-lb-next aria-label="Next image">' + OB.icon("chevron-right", 20) + "</button>" +
      '<span class="lightbox-counter" id="lightbox-counter"></span>' +
      "</div>" +
      '<aside class="lightbox-side">' +
      '<div class="lb-author" id="lightbox-author"></div>' +
      '<h2 id="lightbox-title"></h2>' +
      '<div id="lightbox-category"></div>' +
      '<div class="lb-label">Prompt / note</div><div class="lb-text" id="lightbox-prompt"></div>' +
      '<div class="lb-label">Details</div><div class="lb-text" id="lightbox-details"></div>' +
      '<div class="lightbox-actions" id="lightbox-actions"></div>' +
      "</aside></div>";
    document.body.appendChild(el);

    el.addEventListener("click", function (event) {
      if (event.target === el) closeLightbox();
      if (event.target.closest("[data-lb-close]")) closeLightbox();
      if (event.target.closest("[data-lb-prev]")) stepLightbox(-1);
      if (event.target.closest("[data-lb-next]")) stepLightbox(1);
    });
    document.addEventListener("keydown", function (event) {
      if (!el.classList.contains("open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") stepLightbox(-1);
      if (event.key === "ArrowRight") stepLightbox(1);
    });
  }

  function paintLightbox() {
    var img = lightboxItems[lightboxIndex];
    if (!img) return;
    var user = obGetUser(img.userId);
    $("lightbox-img").src = img.path;
    $("lightbox-img").alt = img.title;
    $("lightbox-counter").textContent = lightboxIndex + 1 + " / " + lightboxItems.length;
    $("lightbox-author").innerHTML =
      '<img class="avatar" src="' + OB.escape(user.avatar) + '" alt="' + OB.escape(user.name) + '">' +
      '<div><a href="' + OB.userUrl(user.handle) + '">' + OB.escape(user.name) + " " + OB.verified(user) + "</a>" +
      '<div class="tiny muted">@' + OB.escape(user.handle) + "</div></div>";
    $("lightbox-title").textContent = img.title;
    $("lightbox-category").innerHTML =
      '<span class="tag">' + OB.escape(categoryLabel(img.category)) + "</span> " +
      (img.price ? '<span class="tag orange">$' + img.price + "</span>" : "");
    $("lightbox-prompt").textContent = img.note || img.prompt;
    $("lightbox-details").innerHTML =
      "By <a href=\"" + OB.userUrl(user.handle) + '">@' + OB.escape(user.handle) + "</a><br>" +
      "Category: " + OB.escape(categoryLabel(img.category)) + (img.price ? "<br>Price: $" + img.price : "");
    $("lightbox-actions").innerHTML =
      '<a class="btn btn-primary btn-sm" href="' + OB.postUrl(img.id) + '">' + OB.icon("message", 14) + " View post</a>" +
      '<button class="btn btn-ghost btn-sm" type="button" data-copy="' + OB.escape(img.prompt) + '">' + OB.icon("copy", 14) + " Copy prompt</button>";
  }

  function openLightbox(items, index) {
    ensureLightbox();
    lightboxItems = items || [];
    lightboxIndex = Math.max(0, Math.min(index || 0, lightboxItems.length - 1));
    lightboxLastFocus = document.activeElement;
    paintLightbox();
    var lb = $("lightbox");
    lb.classList.add("open");
    document.body.classList.add("no-scroll");
    var close = lb.querySelector("[data-lb-close]");
    if (close) close.focus();
  }

  function closeLightbox() {
    var lb = $("lightbox");
    if (!lb) return;
    lb.classList.remove("open");
    document.body.classList.remove("no-scroll");
    if (lightboxLastFocus && lightboxLastFocus.focus) lightboxLastFocus.focus();
  }

  function stepLightbox(delta) {
    if (!lightboxItems.length) return;
    lightboxIndex = (lightboxIndex + delta + lightboxItems.length) % lightboxItems.length;
    paintLightbox();
  }

  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;
  window.renderFeed = renderFeed;
  window.renderGallery = renderGallery;
  window.renderUserList = renderUserList;

  /* ----------------------------- home feed ----------------------------- */
  function initHome() {
    var list = $("feed-list");
    if (!list) return;
    var posts = obAllPosts();
    var shown = 0;
    var pageSize = 10;

    function loadMore() {
      var chunk = posts.slice(shown, shown + pageSize);
      if (shown === 0) list.innerHTML = "";
      list.insertAdjacentHTML("beforeend", chunk.map(function (p) { return postCard(p); }).join(""));
      shown += chunk.length;
      var btn = $("load-more");
      var count = $("feed-visible-count");
      if (count) count.textContent = shown + " of " + posts.length + " posts";
      if (btn) {
        btn.classList.toggle("hidden", shown >= posts.length);
        if (shown >= posts.length) btn.textContent = "You're all caught up";
      }
    }

    loadMore();
    var more = $("load-more");
    if (more) more.addEventListener("click", loadMore);

    var compose = $("home-compose");
    if (compose) {
      compose.addEventListener("click", function () {
        window.location.href = "compose.html";
      });
      compose.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.location.href = "compose.html";
        }
      });
    }
  }

  /* ----------------------------- explore ----------------------------- */
  function initExplore() {
    var grid = $("explore-grid");
    if (!grid) return;
    var tabs = $("explore-tabs");
    var count = $("explore-count");
    var active = "all";
    var counts = obCounts();

    function draw() {
      var items = active === "all" ? IMAGES : IMAGES.filter(function (img) { return img.category === active; });
      renderGallery("explore-grid", items);
      if (count) count.innerHTML = "<b>" + items.length + "</b> artworks in " + (active === "all" ? "every category" : categoryLabel(active));
    }

    if (tabs) {
      tabs.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-cat]");
        if (!btn) return;
        active = btn.getAttribute("data-cat");
        tabs.querySelectorAll("[data-cat]").forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        draw();
      });
    }
    draw();
    var total = $("explore-total");
    if (total) total.textContent = counts.all;
  }

  /* ----------------------------- gallery page ----------------------------- */
  function initGallery() {
    var grid = $("gallery-grid");
    if (!grid) return;
    var filterBar = $("gallery-filters");
    var counts = obCounts();
    var active = "all";
    var current = [];

    function draw() {
      current = active === "all" ? IMAGES.slice() : IMAGES.filter(function (img) { return img.category === active; });
      galleryFilters("gallery-filters", active, counts);
      renderGallery("gallery-grid", current, { lightbox: true });
      var count = $("gallery-count");
      if (count) count.innerHTML = "<b>" + current.length + "</b> artworks" + (active === "all" ? " across 5 collections" : " in " + categoryLabel(active));
    }

    if (filterBar) {
      filterBar.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-cat]");
        if (!btn) return;
        active = btn.getAttribute("data-cat");
        draw();
      });
    }
    grid.addEventListener("click", function (event) {
      var item = event.target.closest("[data-index]");
      if (!item) return;
      event.preventDefault();
      openLightbox(current, Number(item.getAttribute("data-index")));
    });
    draw();
  }

  /* ----------------------------- search ----------------------------- */
  function initSearchPage() {
    var form = $("search-page-form");
    if (!form) return;
    var q = params().get("q") || "";
    var input = $("search-page-input");
    if (input) input.value = q;
    var heading = $("search-heading");
    if (heading) heading.textContent = q ? "Results for \u201c" + q + "\u201d" : "Search Orange Bird";
    var sub = $("search-subtitle");
    if (sub) sub.textContent = q ? "Posts, people and hashtags that match your search." : "Search posts, people and hashtags across Orange Bird.";

    var postResults = q
      ? obAllPosts().filter(function (p) {
          return (p.text || "").toLowerCase().indexOf(q.toLowerCase()) !== -1;
        })
      : obAllPosts().slice(0, 6);
    var userResults = q
      ? USERS.filter(function (u) {
          return (u.name + " " + u.handle + " " + u.bio).toLowerCase().indexOf(q.toLowerCase()) !== -1;
        })
      : USERS.filter(function (u) { return !u.isMe; });
    var tagResults = q
      ? HASHTAGS.filter(function (t) { return t.tag.toLowerCase().indexOf(q.replace(/^#/, "").toLowerCase()) !== -1; })
      : HASHTAGS.slice(0, 6);

    renderFeed("search-posts", postResults.slice(0, 8));
    renderUserList("search-users", userResults, { showStats: true });
    var tagEl = $("search-tags");
    if (tagEl) {
      tagEl.innerHTML = tagResults.length
        ? tagResults.map(function (t) {
            return '<a class="trend" href="hashtag.html?tag=' + encodeURIComponent(t.tag.slice(1)) + '">' +
              '<span class="trend-meta">' + OB.formatCount(t.count) + " posts</span>" +
              '<span class="trend-tag">' + OB.highlight(t.tag, q) + "</span></a>";
          }).join("")
        : emptyState("No hashtags found", "Try a broader search term.", "Explore tags", "explore.html", "search");
    }

    var tabs = $("search-tabs");
    var panels = { posts: $("panel-posts"), users: $("panel-users"), tags: $("panel-tags") };
    function selectTab(name) {
      Object.keys(panels).forEach(function (key) {
        if (panels[key]) panels[key].classList.toggle("hidden", key !== name);
      });
      if (tabs) {
        tabs.querySelectorAll("[data-result-tab]").forEach(function (b) {
          b.classList.toggle("active", b.getAttribute("data-result-tab") === name);
        });
      }
    }
    if (tabs) {
      tabs.querySelectorAll("[data-result-tab]").forEach(function (btn) {
        var key = btn.getAttribute("data-result-tab");
        var count = key === "posts" ? postResults.length : key === "users" ? userResults.length : tagResults.length;
        var badge = btn.querySelector(".count");
        if (badge) badge.textContent = count;
        btn.addEventListener("click", function () { selectTab(key); });
      });
    }
    selectTab("posts");

    if (!q) {
      var noResults = $("search-note");
      if (noResults) noResults.classList.remove("hidden");
    }
  }

  /* ----------------------------- hashtag ----------------------------- */
  function initHashtagPage() {
    var feed = $("hashtag-feed");
    if (!feed) return;
    var raw = (params().get("tag") || "AIArt").replace(/^#/, "");
    var tag = "#" + raw;
    var title = $("hashtag-title");
    if (title) title.textContent = tag;
    document.title = tag + " / Orange Bird";
    var query = $("hashtag-query");
    if (query) query.value = tag;

    var matches = obAllPosts().filter(function (p) {
      return (p.text || "").toLowerCase().indexOf(tag.toLowerCase()) !== -1;
    });
    var count = $("hashtag-count");
    if (count) count.innerHTML = "<b>" + matches.length + "</b> posts";
    renderFeed("hashtag-feed", matches);

    var related = $("hashtag-related");
    if (related) {
      related.innerHTML = HASHTAGS.filter(function (t) { return t.tag !== tag; }).slice(0, 4).map(function (t) {
        return '<a class="chip" href="hashtag.html?tag=' + encodeURIComponent(t.tag.slice(1)) + '">' + OB.escape(t.tag) + "</a>";
      }).join("");
    }
    var follow = $("tag-follow");
    if (follow) {
      follow.addEventListener("click", function () {
        var on = follow.classList.toggle("btn-secondary");
        follow.classList.toggle("btn-primary", !on);
        follow.textContent = on ? "Following " + tag : "Follow " + tag;
        OB.toast(on ? "Following " + tag : "Unfollowed " + tag);
      });
    }
  }

  /* ----------------------------- compose ----------------------------- */
  function initComposePage() {
    var form = $("compose-form");
    if (!form) return;
    var text = $("compose-text");
    var counter = $("char-count");
    var error = $("compose-error");
    var publish = $("publish-btn");
    var preview = $("selected-preview");
    var picker = $("image-picker");
    var pickerWrap = $("picker-wrap");
    var addImage = $("add-image-btn");
    var selected = null;

    function renderCounter() {
      var n = text.value.length;
      if (counter) {
        counter.textContent = n + " / 280";
        counter.classList.toggle("warn", n > 240 && n <= 280);
        counter.classList.toggle("over", n > 280);
      }
      if (publish) publish.disabled = n === 0 || n > 280;
    }

    function clearSelected() {
      selected = null;
      if (preview) { preview.innerHTML = ""; preview.classList.add("hidden"); }
      if (picker) picker.querySelectorAll(".pick-item").forEach(function (b) { b.classList.remove("selected"); });
    }

    function chooseImage(img) {
      selected = img;
      if (preview) {
        preview.classList.remove("hidden");
        preview.innerHTML =
          '<img src="' + OB.escape(img.path) + '" alt="' + OB.escape(img.title) + '">' +
          '<button class="remove" type="button" aria-label="Remove image" data-remove-image>' + OB.icon("x", 14) + "</button>";
      }
      if (picker) {
        picker.querySelectorAll(".pick-item").forEach(function (b) {
          b.classList.toggle("selected", Number(b.getAttribute("data-image")) === img.id);
        });
      }
      if (pickerWrap) pickerWrap.classList.add("hidden");
      OB.toast("Image selected");
    }

    if (picker) {
      picker.innerHTML = IMAGES.map(function (img) {
        return '<button class="pick-item" type="button" data-image="' + img.id + '" aria-label="Choose ' + OB.escape(img.title) + '">' +
          '<img src="' + OB.escape(img.path) + '" alt="" loading="lazy"></button>';
      }).join("");
      picker.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-image]");
        if (!btn) return;
        chooseImage(obGetImage(btn.getAttribute("data-image")));
      });
    }
    if (preview) {
      preview.addEventListener("click", function (event) {
        if (event.target.closest("[data-remove-image]")) clearSelected();
      });
    }
    if (addImage && pickerWrap) {
      addImage.addEventListener("click", function () {
        pickerWrap.classList.toggle("hidden");
      });
    }

    var draft = OB.store.get("ob_draft", null);
    if (draft && draft.text) {
      text.value = draft.text;
      if (draft.imageId) {
        var img = obGetImage(draft.imageId);
        if (img) chooseImage(img);
      }
    }
    renderCounter();

    text.addEventListener("input", function () {
      renderCounter();
      if (error) error.textContent = "";
      OB.store.set("ob_draft", { text: text.value, imageId: selected ? selected.id : null });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var value = text.value.trim();
      if (!value) {
        if (error) error.textContent = "Write something before publishing.";
        text.focus();
        return;
      }
      if (value.length > 280) {
        if (error) error.textContent = "Your post is over 280 characters.";
        return;
      }
      var id = Date.now();
      var post = {
        id: id,
        userId: CURRENT_USER.id,
        text: value,
        image: selected ? selected.path : "",
        imageId: selected ? selected.id : null,
        likes: 0,
        replies: 0,
        reposts: 0,
        time: "now",
        category: selected ? selected.category : "text"
      };
      if (!obSavePost(post)) {
        OB.toast("Could not save your post in this browser session");
      }
      OB.store.set("ob_draft", null);
      window.location.href = OB.postUrl(id);
    });

    if (publish) publish.disabled = text.value.trim().length === 0;
  }

  /* ----------------------------- post detail ----------------------------- */
  function initPostDetail() {
    var holder = $("post-detail");
    if (!holder) return;
    var post = obGetPost(params().get("id"));
    if (!post) {
      window.location.replace("404.html");
      return;
    }
    var user = obGetUser(post.userId);
    document.title = post.text.slice(0, 58) + (post.text.length > 58 ? "\u2026" : "") + " / Orange Bird";
    holder.innerHTML = postCard(post, { detail: true, noLink: true });

    var replyList = $("reply-list");
    var replies = REPLIES.filter(function (r) { return r.postId === Number(post.id); });
    function drawReplies() {
      if (!replyList) return;
      replyList.innerHTML = replies.length
        ? replies.map(replyCard).join("")
        : emptyState("No replies yet", "Be the first to join the conversation.", "", "", "message");
      var count = $("reply-count");
      if (count) count.textContent = replies.length + " replies";
    }
    drawReplies();

    var form = $("reply-form");
    if (form) {
      var input = $("reply-text");
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var value = input.value.trim();
        if (!value) { input.focus(); return; }
        replies.unshift({
          id: Date.now(),
          postId: post.id,
          userId: CURRENT_USER.id,
          text: value,
          time: "now",
          likes: 0
        });
        input.value = "";
        drawReplies();
        OB.toast("Reply posted");
        var fresh = replyList.querySelector(".post-card");
        if (fresh) fresh.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }

    var related = $("related-posts");
    if (related) {
      var pool = obAllPosts().filter(function (p) { return p.id !== post.id; });
      var same = post.category ? pool.filter(function (p) { return p.category === post.category; }) : [];
      var picks = (same.length >= 3 ? same : pool).slice(0, 3);
      related.innerHTML = picks.map(function (p) { return postCard(p); }).join("");
    }

    var replyingTo = $("replying-to");
    if (replyingTo) replyingTo.innerHTML = "Replying to <a href=\"" + OB.userUrl(user.handle) + '">@' + OB.escape(user.handle) + "</a>";
  }

  /* ----------------------------- profile ----------------------------- */
  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (el) { el.textContent = value; });
  }

  function setProfileBanner(profile) {
    var banner = document.querySelector(".profile-banner");
    if (!banner) return;
    if (profile.banner) {
      banner.style.backgroundImage = 'url("' + profile.banner + '")';
      banner.style.backgroundSize = "cover";
      banner.style.backgroundPosition = "center";
    }
  }

  function initProfilePage() {
    var page = $("profile-page");
    if (!page) return;
    var profile = OB.getProfile();
    var posts = obAllPosts().filter(function (p) { return p.userId === profile.id; });
    var avatarEl = $("profile-avatar");
    if (avatarEl) {
      avatarEl.src = profile.avatar || LOGO;
      avatarEl.alt = profile.name;
    }
    setText("[data-profile-name]", profile.name);
    setText("[data-profile-handle]", "@" + profile.handle);
    setText("[data-profile-bio]", profile.bio);
    setText("[data-profile-location]", profile.location || "Somewhere");
    setText("[data-profile-joined]", "Joined " + (profile.joined || "2026"));
    setText("[data-profile-followers]", OB.formatCount(profile.followers || 0));
    setText("[data-profile-following]", OB.formatCount(profile.following || 0));
    setText("[data-profile-postcount]", posts.length);
    var site = $("profile-site");
    if (site) {
      if (profile.site) {
        site.textContent = profile.site;
        site.href = "https://" + profile.site;
        site.classList.remove("hidden");
      } else {
        site.classList.add("hidden");
      }
    }
    setProfileBanner(profile);

    var tweets = $("profile-tweets");
    var media = $("profile-media");
    var likes = $("profile-likes");
    if (tweets) renderFeed("profile-tweets", posts);
    if (media) {
      renderGallery("profile-media", IMAGES.slice(0, 12));
      var mediaNote = $("profile-media-note");
      if (mediaNote) mediaNote.textContent = "A selection of " + IMAGES.length + " artworks from the community.";
    }
    if (likes) {
      var liked = obAllPosts().filter(function (p) { return OB.isLiked(p.id); });
      renderFeed("profile-likes", liked.length ? liked.slice(0, 8) : obAllPosts().slice(0, 4));
    }

    var tabs = $("profile-tabs");
    if (tabs) {
      tabs.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-tab]");
        if (!btn) return;
        var name = btn.getAttribute("data-tab");
        tabs.querySelectorAll("[data-tab]").forEach(function (b) {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        document.querySelectorAll("[data-profile-panel]").forEach(function (panel) {
          panel.classList.toggle("hidden", panel.getAttribute("data-profile-panel") !== name);
        });
        var note = $("profile-media-note");
        if (name === "media" && note) note.classList.remove("hidden");
      });
      if (window.location.hash === "#media") {
        var mediaTab = tabs.querySelector('[data-tab="media"]');
        if (mediaTab) mediaTab.click();
      }
    }
  }

  function initEditProfile() {
    var form = $("edit-profile-form");
    if (!form) return;
    var profile = OB.getProfile();
    var name = $("edit-name");
    var handle = $("edit-handle");
    var bio = $("edit-bio");
    var location = $("edit-location");
    var site = $("edit-site");
    var avatarPreview = $("edit-avatar-preview");
    var bannerPreview = $("edit-banner-preview");
    var avatarInput = $("edit-avatar-file");
    var bannerInput = $("edit-banner-file");
    var pendingAvatar = profile.avatar;
    var pendingBanner = profile.banner || "";
    var bioCounter = $("bio-count");
    var error = $("edit-profile-error");

    name.value = profile.name;
    handle.value = profile.handle;
    bio.value = profile.bio || "";
    location.value = profile.location || "";
    site.value = profile.site || "";
    if (avatarPreview) avatarPreview.src = profile.avatar || LOGO;
    if (bannerPreview) bannerPreview.src = profile.banner || LOGO;

    function updateBio() {
      if (bioCounter) bioCounter.textContent = bio.value.length + " / 160";
    }
    updateBio();
    bio.addEventListener("input", updateBio);

    function readFile(file, callback) {
      if (!file) return;
      if (!/^image\//.test(file.type)) {
        OB.toast("Choose an image file");
        return;
      }
      if (file.size > 800 * 1024) {
        OB.toast("Please choose an image under 800 KB");
        return;
      }
      var reader = new FileReader();
      reader.onload = function () { callback(reader.result); };
      reader.readAsDataURL(file);
    }

    if (avatarInput) {
      avatarInput.addEventListener("change", function () {
        readFile(avatarInput.files[0], function (data) {
          pendingAvatar = data;
          if (avatarPreview) avatarPreview.src = data;
        });
      });
    }
    if (bannerInput) {
      bannerInput.addEventListener("change", function () {
        readFile(bannerInput.files[0], function (data) {
          pendingBanner = data;
          if (bannerPreview) bannerPreview.src = data;
        });
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!name.value.trim() || name.value.trim().length < 2) {
        if (error) error.textContent = "Please enter a name with at least 2 characters.";
        name.focus();
        return;
      }
      if (!/^[a-zA-Z0-9_]{3,15}$/.test(handle.value.trim())) {
        if (error) error.textContent = "Handles use 3–15 letters, numbers or underscores.";
        handle.focus();
        return;
      }
      if (bio.value.length > 160) {
        if (error) error.textContent = "Bio must be 160 characters or fewer.";
        return;
      }
      var saved = OB.saveProfile({
        name: name.value.trim(),
        handle: handle.value.trim().toLowerCase(),
        bio: bio.value.trim(),
        location: location.value.trim(),
        site: site.value.trim(),
        avatar: pendingAvatar,
        banner: pendingBanner
      });
      if (!saved) {
        OB.toast("Profile updated for this view (image too large to store)");
      } else {
        OB.toast("Profile updated");
      }
      window.setTimeout(function () { window.location.href = "profile.html"; }, 700);
    });
  }

  function initUserPage() {
    var page = $("user-page");
    if (!page) return;
    var handle = params().get("u") || "";
    var user = obGetUserByHandle(handle);
    if (!user) {
      window.location.replace("404.html");
      return;
    }
    if (user.isMe) {
      window.location.replace("profile.html");
      return;
    }
    document.title = user.name + " (@" + user.handle + ") / Orange Bird";
    var avatarEl = $("user-avatar");
    if (avatarEl) { avatarEl.src = user.avatar; avatarEl.alt = user.name; }
    setText("[data-user-name]", user.name);
    setText("[data-user-handle]", "@" + user.handle);
    setText("[data-user-bio]", user.bio);
    setText("[data-user-location]", user.location || "Somewhere");
    setText("[data-user-joined]", "Joined " + user.joined);
    setText("[data-user-followers]", OB.formatCount(user.followers));
    setText("[data-user-following]", OB.formatCount(user.following));
    var banner = document.querySelector(".profile-banner");
    if (banner && user.accent) {
      banner.style.background =
        "radial-gradient(circle at 18% 30%, " + user.accent + ", transparent 42%), " +
        "radial-gradient(circle at 78% 20%, rgba(29,161,242,.6), transparent 45%), linear-gradient(120deg,#1b2733,#33485b 52%,#16212b)";
    }
    var follow = $("user-follow");
    if (follow) follow.innerHTML = OB.followButton(user, "btn-primary");
    var posts = obAllPosts().filter(function (p) { return p.userId === user.id; });
    renderFeed("user-posts", posts);
    var media = $("user-media");
    if (media) {
      var own = IMAGES.filter(function (img) { return img.userId === user.id; });
      renderGallery("user-media", own);
    }
    var tabs = $("user-tabs");
    if (tabs) {
      tabs.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-tab]");
        if (!btn) return;
        var name = btn.getAttribute("data-tab");
        tabs.querySelectorAll("[data-tab]").forEach(function (b) { b.classList.toggle("active", b === btn); });
        document.querySelectorAll("[data-user-panel]").forEach(function (panel) {
          panel.classList.toggle("hidden", panel.getAttribute("data-user-panel") !== name);
        });
      });
    }
  }

  function initPeoplePage() {
    var list = $("people-list");
    if (!list) return;
    var kind = document.body.getAttribute("data-people") ||
      document.body.getAttribute("data-page");
    var users = USERS.filter(function (u) { return !u.isMe; });
    var count = $("people-count");
    if (count) count.innerHTML = "<b>" + users.length + "</b> " + (kind === "followers" ? "followers" : "following");
    renderUserList("people-list", users, { showStats: true });
    var title = $("people-title");
    if (title) title.textContent = kind === "followers" ? "Followers" : "Following";
    var subtitle = $("people-subtitle");
    if (subtitle) subtitle.textContent = kind === "followers" ? "People who follow you on Orange Bird." : "Creators you follow on Orange Bird.";
  }

  /* ----------------------------- notifications ----------------------------- */
  function initNotifications() {
    var list = $("notifications-list");
    if (!list) return;
    var unread = NOTIFICATIONS.filter(function (n) { return n.unread; }).length;
    var unreadEl = $("notif-unread-count");
    if (unreadEl) unreadEl.textContent = unread;

    function draw(filter) {
      var items = filter === "mentions" ? NOTIFICATIONS.filter(function (n) { return n.type === "mention"; }) : NOTIFICATIONS;
      list.innerHTML = items.map(function (n) {
        var user = obGetUser(n.userId);
        var link = n.type === "follow" ? OB.userUrl(user.handle) : OB.postUrl(100 + (n.id % 2));
        var iconName = n.type === "like" ? "heart" : n.type === "follow" ? "user-plus" : n.type === "mention" ? "message" : "repeat";
        return '<a class="notif-item' + (n.unread ? " unread" : "") + '" href="' + link + '">' +
          '<span class="notif-icon ' + n.type + '">' + OB.icon(iconName, 16) + "</span>" +
          avatar(user, "avatar-sm") +
          '<span class="notif-body"><b>' + OB.escape(user.name) + "</b> " + OB.escape(n.text) +
          (n.detail ? '<span class="notif-detail">' + OB.escape(n.detail) + "</span>" : "") +
          '<span class="notif-detail tiny">' + OB.escape(n.time) + " ago</span></span>" +
          (n.unread ? '<span class="unread-dot"></span>' : "") + "</a>";
      }).join("");
      if (!items.length) {
        list.innerHTML = emptyState("Nothing to see", "New mentions and follows will appear here.", "Explore", "explore.html", "bell");
      }
    }

    draw("all");
    var tabs = $("notif-tabs");
    if (tabs) {
      tabs.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-notif-filter]");
        if (!btn) return;
        tabs.querySelectorAll("[data-notif-filter]").forEach(function (b) { b.classList.toggle("active", b === btn); });
        draw(btn.getAttribute("data-notif-filter"));
      });
    }
    var mark = $("mark-all-read");
    if (mark) {
      mark.addEventListener("click", function () {
        list.querySelectorAll(".notif-item.unread").forEach(function (item) {
          item.classList.remove("unread");
          var dot = item.querySelector(".unread-dot");
          if (dot) dot.remove();
        });
        NOTIFICATIONS.forEach(function (n) { n.unread = false; });
        if (unreadEl) unreadEl.textContent = "0";
        OB.toast("All notifications marked as read");
      });
    }
  }

  /* ----------------------------- messages ----------------------------- */
  function initMessages() {
    var list = $("conversation-list");
    if (!list) return;
    var activeId = CONVERSATIONS[0] ? CONVERSATIONS[0].id : null;
    var requested = params().get("u");
    if (requested) {
      var match = CONVERSATIONS.find(function (c) {
        var u = obGetUser(c.userId);
        return u.handle === requested;
      });
      if (match) activeId = match.id;
    }

    function conversationPreview(c) {
      var last = c.messages[c.messages.length - 1];
      return last ? last.text : "";
    }

    function drawList() {
      list.innerHTML = CONVERSATIONS.map(function (c) {
        var user = obGetUser(c.userId);
        return '<button type="button" class="conv-item' + (c.id === activeId ? " active" : "") + '" data-conv="' + c.id + '">' +
          avatar(user) +
          '<span class="conv-main"><span class="conv-top"><span class="conv-name">' + OB.escape(user.name) + " " + OB.verified(user) + '</span><span class="conv-time">' + OB.escape(c.time) + "</span></span>" +
          '<span class="conv-preview">' + OB.escape(conversationPreview(c)) + "</span></span>" +
          (c.unread ? '<span class="conv-unread">' + c.unread + "</span>" : "") +
          "</button>";
      }).join("");
    }

    function drawChat() {
      var conv = CONVERSATIONS.find(function (c) { return c.id === activeId; });
      var head = $("chat-head");
      var body = $("chat-body");
      var form = $("chat-form");
      if (!conv) {
        if (head) head.innerHTML = "";
        if (body) body.innerHTML = emptyState("Select a conversation", "Choose a conversation from the list to start chatting.", "", "", "mail");
        if (form) form.classList.add("hidden");
        return;
      }
      var user = obGetUser(conv.userId);
      conv.unread = 0;
      if (head) {
        head.innerHTML = '<a href="' + OB.userUrl(user.handle) + '">' + avatar(user) + "</a>" +
          '<div class="who"><a href="' + OB.userUrl(user.handle) + '">' + OB.escape(user.name) + " " + OB.verified(user) + "</a><span>@" + OB.escape(user.handle) + " \u00b7 usually replies fast</span></div>" +
          '<a class="btn btn-ghost btn-sm" href="' + OB.userUrl(user.handle) + '">View profile</a>';
      }
      if (body) {
        body.innerHTML = conv.messages.map(function (m) {
          var me = m.from === CURRENT_USER.id;
          var sender = me ? OB.getProfile() : user;
          return '<div class="bubble-row' + (me ? " me" : "") + '">' + avatar(sender, "avatar-xs") +
            '<div class="bubble">' + linkify(m.text) + '<span class="bubble-time">' + OB.escape(m.time) + "</span></div></div>";
        }).join("");
        body.scrollTop = body.scrollHeight;
      }
      if (form) form.classList.remove("hidden");
      drawList();
    }

    list.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-conv]");
      if (!btn) return;
      activeId = Number(btn.getAttribute("data-conv"));
      drawChat();
    });

    var form = $("chat-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var input = $("chat-input");
        var value = input.value.trim();
        if (!value) return;
        var conv = CONVERSATIONS.find(function (c) { return c.id === activeId; });
        if (!conv) return;
        conv.messages.push({ from: CURRENT_USER.id, text: value, time: "now" });
        conv.time = "now";
        input.value = "";
        drawChat();
      });
    }

    if (requested && !CONVERSATIONS.some(function (conv) { return obGetUser(conv.userId).handle === requested; })) {
      OB.toast("No conversation with @" + requested + " yet — send one from their profile.");
    }
    drawList();
    drawChat();
  }

  /* ----------------------------- services ----------------------------- */
  function initServices() {
    var grid = $("service-grid");
    if (!grid) return;
    var counts = obCounts();
    var services = [
      { title: "AI Art Studio", desc: "Daily AI drops, bold colour studies and process notes from AI Art Man.", cat: "aiart", href: "service-ai-art.html", icon: "sparkles", cls: "" },
      { title: "Fantasy Worlds", desc: "Epic kingdoms, dragons and quiet ruins. Twenty worlds ready to explore.", cat: "fantasy", href: "service-fantasy.html", icon: "layers", cls: "blue" },
      { title: "Lofi Prompts", desc: "Soft palettes, rainy windows and copy-ready prompts for your next session.", cat: "lofi", href: "service-lofi.html", icon: "headphones", cls: "green" },
      { title: "Prompt Marketplace", desc: "Premium prompts from independent artists, with transparent prices.", cat: "marketplace", href: "service-marketplace.html", icon: "cart", cls: "purple" },
      { title: "Art Curation", desc: "A hand-picked collection chosen by Celistima. Quality over quantity.", cat: "celistima", href: "service-curation.html", icon: "star", cls: "red" },
      { title: "My Gallery", desc: "Your personal media tab — likes, saves and everything you have shared.", cat: "all", href: "profile.html#media", icon: "camera", cls: "" }
    ];
    grid.innerHTML = services.map(function (s) {
      var count = s.cat === "all" ? counts.all + " artworks" : counts[s.cat] + " artworks";
      return '<a class="service-card ' + s.cls + '" href="' + s.href + '">' +
        '<span class="service-icon">' + OB.icon(s.icon, 21) + "</span>" +
        "<h3>" + s.title + "</h3><p>" + s.desc + "</p>" +
        '<span class="service-foot"><span>' + count + '</span><b>Explore \u2192</b></span></a>';
    }).join("");
  }

  function initServicePage() {
    var cat = document.body.getAttribute("data-service-cat");
    if (!cat) return;
    var images = IMAGES.filter(function (img) { return img.category === cat; });
    var countEls = document.querySelectorAll("[data-service-count]");
    countEls.forEach(function (el) { el.textContent = images.length; });

    if (cat === "fantasy") {
      var filter = $("fantasy-filters");
      var grid = $("service-gallery");
      var styles = ["All", "Dragons", "Kingdoms", "Portraits"];
      var active = "All";
      function drawFantasy() {
        var list = active === "All" ? images : images.filter(function (img) {
          return (img.id % 3) === styles.indexOf(active) - 1;
        });
        renderGallery("service-gallery", list);
        if (filter) {
          filter.querySelectorAll("[data-style]").forEach(function (b) {
            b.classList.toggle("active", b.getAttribute("data-style") === active);
          });
        }
      }
      if (filter) {
        filter.innerHTML = styles.map(function (s) {
          return '<button class="chip' + (s === "All" ? " active" : "") + '" type="button" data-style="' + s + '">' + s + "</button>";
        }).join("");
        filter.addEventListener("click", function (event) {
          var btn = event.target.closest("[data-style]");
          if (!btn) return;
          active = btn.getAttribute("data-style");
          drawFantasy();
        });
      }
      drawFantasy();
      return;
    }

    if (cat === "lofi") {
      var lofiGrid = $("service-gallery");
      if (lofiGrid) {
        lofiGrid.innerHTML = images.map(function (img) {
          return '<article class="gallery-item lofi-item">' +
            '<img src="' + OB.escape(img.path) + '" alt="' + OB.escape(img.title) + '" loading="lazy">' +
            '<span class="gallery-badge">Lofi</span>' +
            '<span class="gallery-overlay"><span class="g-title">' + OB.escape(img.title) + '</span><span class="g-meta">' + OB.escape(img.prompt.slice(0, 46)) + "\u2026</span>" +
            '<span class="prompt-actions"><a class="btn btn-xs btn-dark" href="' + OB.postUrl(img.id) + '">View</a>' +
            '<button class="btn btn-xs btn-primary" type="button" data-copy="' + OB.escape(img.prompt) + '">' + OB.icon("copy", 12) + " Copy</button></span></span></article>";
        }).join("");
      }
      return;
    }

    if (cat === "marketplace") {
      var marketGrid = $("service-gallery");
      var sort = $("marketplace-sort");
      function drawMarket() {
        var list = images.slice();
        if (sort && sort.value === "price-low") list.sort(function (a, b) { return a.price - b.price; });
        if (sort && sort.value === "price-high") list.sort(function (a, b) { return b.price - a.price; });
        if (sort && sort.value === "popular") list.sort(function (a, b) { return b.id - a.id; });
        if (marketGrid) {
          marketGrid.innerHTML = list.map(function (img) {
            var user = obGetUser(img.userId);
            return '<article class="product-card">' +
              '<a class="product-image" href="' + OB.postUrl(img.id) + '"><img src="' + OB.escape(img.path) + '" alt="' + OB.escape(img.title) + '" loading="lazy"></a>' +
              '<div class="product-body"><div class="product-title">' + OB.escape(img.title) + "</div>" +
              '<div class="seller-line">' + avatar(user, "avatar-xs") + "<span>@" + OB.escape(user.handle) + "</span></div>" +
              '<div class="product-foot"><span class="price-tag">$' + img.price + '</span><button class="btn btn-xs btn-primary" type="button" data-buy="' + OB.escape(img.title) + '">Buy</button></div></div></article>';
          }).join("");
        }
      }
      if (sort) sort.addEventListener("change", drawMarket);
      drawMarket();
      return;
    }

    renderGallery("service-gallery", images);
  }

  /* ----------------------------- settings ----------------------------- */
  var ACCENTS = {
    orange: { primary: "#FF7A00", hover: "#E56B00", soft: "#FFF3E6", soft2: "#FFE4CC" },
    blue: { primary: "#1DA1F2", hover: "#0C85D0", soft: "#E8F5FE", soft2: "#CBEBFB" },
    green: { primary: "#17BF63", hover: "#119A4F", soft: "#E8F8EF", soft2: "#CBEFDA" }
  };

  function applyAccent(name) {
    var a = ACCENTS[name] || ACCENTS.orange;
    var root = document.documentElement.style;
    root.setProperty("--primary", a.primary);
    root.setProperty("--primary-hover", a.hover);
    root.setProperty("--primary-soft", a.soft);
    root.setProperty("--primary-soft-2", a.soft2);
  }

  function initSettings() {
    var form = $("settings-form");
    if (!form) return;
    var settings = OB.store.get("ob_settings", {});
    var reduce = $("setting-reduce-motion");
    var compact = $("setting-compact");
    var email = $("setting-email");
    var privateAccount = $("setting-private");
    var accentButtons = form.querySelectorAll("[data-accent]");

    if (reduce) reduce.checked = !!settings.reduceMotion;
    if (compact) compact.checked = !!settings.compact;
    if (email) email.checked = settings.email !== false;
    if (privateAccount) privateAccount.checked = !!settings.privateAccount;
    if (settings.accent) applyAccent(settings.accent);
    accentButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-accent") === (settings.accent || "orange"));
    });

    accentButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.getAttribute("data-accent");
        applyAccent(name);
        accentButtons.forEach(function (b) { b.classList.toggle("active", b === btn); });
        OB.toast("Accent preview applied — save to keep it");
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var selectedAccent = "orange";
      accentButtons.forEach(function (b) {
        if (b.classList.contains("active")) selectedAccent = b.getAttribute("data-accent");
      });
      var next = {
        reduceMotion: reduce ? reduce.checked : false,
        compact: compact ? compact.checked : false,
        email: email ? email.checked : true,
        privateAccount: privateAccount ? privateAccount.checked : false,
        accent: selectedAccent
      };
      OB.store.set("ob_settings", next);
      document.documentElement.style.scrollBehavior = next.reduceMotion ? "auto" : "";
      document.body.classList.toggle("compact-feed", next.compact);
      OB.toast("Settings saved for this browser");
    });

    var nav = document.querySelector(".settings-nav");
    if (nav) {
      nav.addEventListener("click", function (event) {
        var link = event.target.closest("a[href^='#']");
        if (!link) return;
        nav.querySelectorAll("a").forEach(function (a) { a.classList.toggle("active", a === link); });
      });
    }

    var deactivate = $("deactivate-account");
    if (deactivate) {
      deactivate.addEventListener("click", function () {
        OB.toast("This is a demo — account deactivation is disabled.");
      });
    }
  }

  function initHelp() {
    var input = $("help-search");
    if (!input) return;
    var items = document.querySelectorAll(".faq-item");
    var empty = $("help-empty");
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (item) {
        var text = item.textContent.toLowerCase();
        var match = !q || text.indexOf(q) !== -1;
        item.classList.toggle("hidden", !match);
        if (match) shown++;
      });
      if (empty) empty.classList.toggle("hidden", shown !== 0 || !q);
    });
    var contact = $("help-contact");
    if (contact) {
      contact.addEventListener("click", function (event) {
        event.preventDefault();
        OB.toast("Demo support: hello@orangebird.example");
      });
    }
  }

  /* ----------------------------- global actions ----------------------------- */
  function initPostActions() {
    document.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-action]");
      if (btn) {
        var action = btn.getAttribute("data-action");
        var id = Number(btn.getAttribute("data-id"));
        if (action === "like" || action === "repost" || action === "bookmark") {
          event.preventDefault();
          event.stopPropagation();
          if (action === "like") {
            var liked = OB.toggleLike(id);
            var card = btn.closest(".post-card") || btn.closest(".post-card.detail");
            var buttons = document.querySelectorAll('[data-action="like"][data-id="' + id + '"]');
            buttons.forEach(function (b) {
              b.classList.toggle("liked", liked);
              b.setAttribute("aria-pressed", liked ? "true" : "false");
              var post = obGetPost(id);
              var countEl = b.querySelector(".action-count");
              if (countEl && post) countEl.textContent = Number(post.likes) + (liked ? 1 : 0);
            });
            OB.toast(liked ? "Liked" : "Like removed");
          } else if (action === "repost") {
            var reposted = OB.toggleRepost(id);
            document.querySelectorAll('[data-action="repost"][data-id="' + id + '"]').forEach(function (b) {
              b.classList.toggle("reposted", reposted);
              b.setAttribute("aria-pressed", reposted ? "true" : "false");
              var post = obGetPost(id);
              var countEl = b.querySelector(".action-count");
              if (countEl && post) countEl.textContent = Number(post.reposts) + (reposted ? 1 : 0);
            });
            OB.toast(reposted ? "Reposted" : "Repost removed");
          } else {
            var saved = OB.toggleBookmark(id);
            document.querySelectorAll('[data-action="bookmark"][data-id="' + id + '"]').forEach(function (b) {
              b.classList.toggle("saved", saved);
              b.setAttribute("aria-pressed", saved ? "true" : "false");
            });
            OB.toast(saved ? "Added to bookmarks" : "Removed from bookmarks");
          }
          return;
        }
        if (action === "reply") {
          event.preventDefault();
          event.stopPropagation();
          window.location.href = OB.postUrl(id);
          return;
        }
        if (action === "menu") {
          event.preventDefault();
          event.stopPropagation();
          OB.toast("Post menu is a demo — try like, repost or bookmark.");
          return;
        }
      }

      var buy = event.target.closest("[data-buy]");
      if (buy) {
        event.preventDefault();
        event.stopPropagation();
        OB.toast("\u201c" + buy.getAttribute("data-buy") + "\u201d added to cart (demo)");
      }

      var card = event.target.closest(".post-card[data-post-id]");
      if (card && !event.target.closest("a, button")) {
        window.location.href = OB.postUrl(card.getAttribute("data-post-id"));
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      var card = event.target.closest(".post-card[data-post-id]");
      if (card && event.target === card) {
        event.preventDefault();
        window.location.href = OB.postUrl(card.getAttribute("data-post-id"));
      }
    });
  }

  function initBookmarks() {
    var list = $("bookmarks-list");
    if (!list) return;
    var ids = OB.getBookmarks();
    var posts = obAllPosts().filter(function (p) { return ids.indexOf(Number(p.id)) !== -1; });
    renderFeed("bookmarks-list", posts);
    var count = $("bookmarks-count");
    if (count) count.innerHTML = "<b>" + posts.length + "</b> saved posts";
    var clear = $("clear-bookmarks");
    if (clear) {
      clear.addEventListener("click", function () {
        OB.store.set("ob_bookmarks", []);
        renderFeed("bookmarks-list", []);
        if (count) count.innerHTML = "<b>0</b> saved posts";
        OB.toast("Bookmarks cleared");
      });
    }
  }

  /* ----------------------------- boot dispatcher ----------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderSidebarWidgets();
    initPostActions();
    initHome();
    initExplore();
    initGallery();
    initSearchPage();
    initHashtagPage();
    initComposePage();
    initPostDetail();
    initBookmarks();
    initNotifications();
    initMessages();
    initServices();
    initServicePage();
    initProfilePage();
    initEditProfile();
    initUserPage();
    initPeoplePage();
    initSettings();
    initHelp();
    var yearEls = document.querySelectorAll("[data-year]");
    yearEls.forEach(function (el) { el.textContent = new Date().getFullYear(); });
  });
})();
