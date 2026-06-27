/* Osama Feshier — site interactions */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky nav state ---- */
  var nav = document.getElementById("nav");
  var scrollTicking = false;
  var onScroll = function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        if (window.scrollY > 12) nav.classList.add("is-scrolled");
        else nav.classList.remove("is-scrolled");
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---- Skills: capability board ---- */
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function meterHtml(depth) {
    return [0, 1, 2]
      .map(function (step) {
        return (
          '<span class="skill-pill__dot' +
          (step < depth ? " is-on" : "") +
          '"></span>'
        );
      })
      .join("");
  }

  var skillIcons = {
    agents:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v5"></path><path d="M6.5 8.5 3 12l3.5 3.5"></path><path d="M17.5 8.5 21 12l-3.5 3.5"></path><rect x="7" y="8" width="10" height="8" rx="3"></rect><path d="M9 19h6"></path></svg>',
    mlops:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 16.5V7.5"></path><path d="M12 20V4"></path><path d="M20 13.5v-3"></path><circle cx="4" cy="16.5" r="2"></circle><circle cx="12" cy="20" r="2"></circle><circle cx="20" cy="13.5" r="2"></circle><path d="M5.8 15.6 10.3 9"></path><path d="M13.9 16.7 18 14.5"></path></svg>',
    ml: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5a3 3 0 1 0 0 .01"></path><path d="M6.2 9.2a2.4 2.4 0 1 0 0 .01"></path><path d="M17.8 9.2a2.4 2.4 0 1 0 0 .01"></path><path d="M7.8 10.6 10 8.2"></path><path d="M16.2 10.6 14 8.2"></path><path d="M8.6 15.8h6.8"></path><path d="M6.5 18.5c1.5-2 3.4-3 5.5-3s4 .9 5.5 3"></path></svg>',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="6.5" rx="6.5" ry="2.5"></ellipse><path d="M5.5 6.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5"></path><path d="M5.5 11.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5"></path></svg>',
    engineering:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h16"></path><path d="M4 16h16"></path><path d="M8 4v16"></path><path d="M16 4v16"></path><path d="M4 12h16"></path></svg>',
    infra:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8.5A4 4 0 0 1 10 5h6a4 4 0 0 1 0 8H8a3 3 0 0 1-2-4.5"></path><path d="M8 17h8"></path><path d="M9.5 20h5"></path></svg>',
  };

  var stackLayers = [
    {
      name: "Generative AI & Agents",
      icon: "agents",
      summary:
        "Agent workflows, RAG systems, and LLM product flows built for real enterprise teams.",
      skills: [
        { name: "LLMs", level: "Lead", depth: 3 },
        { name: "Multi-Agent", level: "Lead", depth: 3 },
        { name: "LangChain", level: "Strong", depth: 2 },
        { name: "LlamaIndex", level: "Strong", depth: 2 },
      ],
    },
    {
      name: "Core Data Science",
      icon: "data",
      summary:
        "Python-first analytics, statistics, and time-series work that turns messy data into decisions.",
      skills: [
        { name: "Python", level: "Lead", depth: 3 },
        { name: "Statistics", level: "Lead", depth: 3 },
        { name: "Time Series", level: "Strong", depth: 2 },
        { name: "R", level: "Strong", depth: 2 },
      ],
    },
    {
      name: "Machine Learning",
      icon: "ml",
      summary:
        "Classical ML and computer-vision systems shaped for production, not just notebooks.",
      skills: [
        { name: "scikit-learn", level: "Lead", depth: 3 },
        { name: "CNNs", level: "Lead", depth: 3 },
        { name: "TensorFlow", level: "Strong", depth: 2 },
        { name: "OpenCV", level: "Strong", depth: 2 },
      ],
    },
    {
      name: "Data Engineering",
      icon: "engineering",
      summary:
        "Pipelines and data movement that keep analytics and ML systems reliable at scale.",
      skills: [
        { name: "SQL", level: "Strong", depth: 2 },
        { name: "PySpark", level: "Strong", depth: 2 },
        { name: "Airflow", level: "Working", depth: 1 },
        { name: "Kafka", level: "Working", depth: 1 },
      ],
    },
    {
      name: "MLOps & Engineering",
      icon: "mlops",
      summary:
        "From experiment to service: versioning, delivery, and deployment discipline around models and agents.",
      skills: [
        { name: "CI/CD", level: "Strong", depth: 2 },
        { name: "Git", level: "Strong", depth: 2 },
        { name: "ONNX", level: "Strong", depth: 2 },
        { name: "CRISP-DM", level: "Lead", depth: 3 },
      ],
    },
    {
      name: "Infrastructure & Platforms",
      icon: "infra",
      summary:
        "Cloud and platform layers used to run production workloads without drama.",
      skills: [
        { name: "Linux", level: "Strong", depth: 2 },
        { name: "AWS", level: "Strong", depth: 2 },
        { name: "Databricks", level: "Strong", depth: 2 },
      ],
    },
  ];

  var stack = document.getElementById("skillsStack");
  if (stack) {
    stack.innerHTML =
      '<div class="skills-board__meta reveal">' +
      '<p class="skills-board__summary">Visible by default for quick recruiter scans: each signal shows where I lead, where I ship confidently, and where I work hands-on in production.</p>' +
      '<div class="skills-board__legend" aria-label="Mastery legend">' +
      '<span class="skills-legend"><span class="skills-legend__meter">' +
      meterHtml(3) +
      "</span><span>Lead</span></span>" +
      '<span class="skills-legend"><span class="skills-legend__meter">' +
      meterHtml(2) +
      "</span><span>Strong</span></span>" +
      '<span class="skills-legend"><span class="skills-legend__meter">' +
      meterHtml(1) +
      "</span><span>Working</span></span>" +
      "</div>" +
      "</div>" +
      stackLayers
        .map(function (layer) {
          var skillsHtml = layer.skills
            .map(function (skill) {
              return (
                '<li class="skill-pill" aria-label="' +
                escapeHtml(skill.name + " — " + skill.level) +
                '">' +
                '<span class="skill-pill__name">' +
                escapeHtml(skill.name) +
                "</span>" +
                '<span class="skill-pill__meta">' +
                '<span class="skill-pill__level">' +
                escapeHtml(skill.level) +
                "</span>" +
                '<span class="skill-pill__meter" aria-hidden="true">' +
                meterHtml(skill.depth) +
                "</span>" +
                "</span>" +
                "</li>"
              );
            })
            .join("");

          return (
            '<article class="skills-domain reveal" role="listitem">' +
            '<div class="skills-domain__lead">' +
            '<span class="skills-domain__icon" aria-hidden="true">' +
            (skillIcons[layer.icon] || "") +
            "</span>" +
            '<div class="skills-domain__copy">' +
            '<h3 class="skills-domain__name">' +
            escapeHtml(layer.name) +
            "</h3>" +
            '<p class="skills-domain__summary">' +
            escapeHtml(layer.summary) +
            "</p>" +
            "</div>" +
            "</div>" +
            '<ul class="skills-domain__skills" aria-label="' +
            escapeHtml(layer.name + " skills") +
            '">' +
            skillsHtml +
            "</ul>" +
            "</article>"
          );
        })
        .join("");
  }

  /* ---- Projects Filtering ---- */
  var filterContainer = document.querySelector(".projects-filter");
  var projectsGrid = document.querySelector(".projects");
  if (filterContainer && projectsGrid) {
    var buttons = filterContainer.querySelectorAll(".filter-btn");
    var cards = projectsGrid.querySelectorAll(".card");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.classList.contains("is-active")) return;

        buttons.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        var filterValue = btn.getAttribute("data-filter");
        var delay = reduce ? 0 : 220;

        projectsGrid.classList.add("is-filtering");

        setTimeout(function () {
          cards.forEach(function (card) {
            var categories = (card.getAttribute("data-category") || "").split(
              " ",
            );
            if (
              filterValue === "all" ||
              categories.indexOf(filterValue) !== -1
            ) {
              card.classList.remove("is-filtered-out");
              card.classList.add("is-visible");
            } else {
              card.classList.add("is-filtered-out");
            }
          });
          projectsGrid.classList.remove("is-filtering");
        }, delay);
      });
    });
  }

  /* ---- Reveal-on-scroll + animate skill fills ---- */
  var revealEls = document.querySelectorAll(
    ".section__title, .section__kicker, .section__desc, .about__text, .about__pillars li, .skills-board__meta, .skills-domain, .card, .edu__item, .contact__link",
  );
  revealEls.forEach(function (el) {
    el.classList.add("reveal");
  });

  /* ---- Experience: accordion + reveal ---- */
  var expEntries = document.querySelectorAll(".exp-entry");
  var expReveals = document.querySelectorAll(".exp-reveal");

  /* Accordion — one detail panel open at a time */
  expEntries.forEach(function (entry) {
    var trigger = entry.querySelector(".exp-entry__trigger");
    if (!trigger) return;
    trigger.addEventListener("click", function () {
      var isOpen = trigger.getAttribute("aria-expanded") === "true";
      expEntries.forEach(function (other) {
        var otherTrigger = other.querySelector(".exp-entry__trigger");
        if (otherTrigger && otherTrigger !== trigger) {
          otherTrigger.setAttribute("aria-expanded", "false");
        }
      });
      trigger.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });

  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    expReveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach(function (el) {
      io.observe(el);
    });

    /* Experience observer — fire all entries when the section enters view */
    var expSection = document.getElementById("experience");
    if (expSection && expReveals.length) {
      var expIO = new IntersectionObserver(
        function (entries) {
          if (!entries[0].isIntersecting) return;
          expReveals.forEach(function (el) {
            el.classList.add("is-visible");
          });
          expIO.unobserve(expSection);
        },
        { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
      );
      expIO.observe(expSection);
    }
  }

  /* ============================================================
     HERO — Interactive Engineering Grid, Choreography
     ============================================================ */
  if (reduce) {
    /* Reduced motion: instant reveal, static grid only */
    var heroInstant = document.querySelector(".hero");
    if (heroInstant) {
      heroInstant.classList.add("is-loaded");
      document.querySelectorAll(".stat__num").forEach(function (el) {
        el.textContent = el.dataset.target + (el.dataset.suffix || "");
      });
    }
    return;
  }

  var hero = document.querySelector(".hero");
  if (!hero) return;

  /* -- Interactive Engineering Grid --
     A subtle 2D canvas grid overlay that illuminates grid lines
     near the cursor, with a fluorescent rose signal dot snapping
     to the nearest intersection. Blends into the obsidian base. */
  var gridCanvas = document.getElementById("hero-field");
  var grid = {
    ctx: gridCanvas ? gridCanvas.getContext("2d") : null,
    mx: -9999,
    my: -9999,
    tx: -9999,
    ty: -9999,
    size: 46,
    w: 0,
    h: 0,
    dpr: window.devicePixelRatio || 1,
    radius: 180,

    init: function () {
      if (!this.ctx) return;
      this.resize();
      var self = this;
      window.addEventListener("resize", function () {
        self.resize();
      });
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        self.tx = e.clientX - r.left;
        self.ty = e.clientY - r.top;
      });
      hero.addEventListener("mouseleave", function () {
        self.tx = -9999;
        self.ty = -9999;
      });
    },

    resize: function () {
      if (!gridCanvas) return;
      var rect = hero.getBoundingClientRect();
      this.w = rect.width;
      this.h = rect.height;
      gridCanvas.width = rect.width * this.dpr;
      gridCanvas.height = rect.height * this.dpr;
    },

    draw: function () {
      var ctx = this.ctx;
      if (!ctx || this.w === 0) {
        requestAnimationFrame(function () {
          grid.draw();
        });
        return;
      }

      ctx.save();
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.clearRect(0, 0, this.w, this.h);

      // Smooth cursor tracking (lerp)
      this.mx += (this.tx - this.mx) * 0.1;
      this.my += (this.ty - this.my) * 0.1;
      var mx = this.mx,
        my = this.my;
      var onScreen = mx > -500 && my > -500;
      var r = this.radius;
      var gs = this.size;
      var r2 = r * r;

      if (onScreen) {
        var sc = Math.floor((mx - r) / gs) - 1;
        var ec = Math.ceil((mx + r) / gs) + 1;
        var sr = Math.floor((my - r) / gs) - 1;
        var er = Math.ceil((my + r) / gs) + 1;

        // Vertical grid lines — circular crop, radial falloff
        for (var c = sc; c <= ec; c++) {
          var x = c * gs;
          if (x < 0 || x > this.w) continue;
          var dx = Math.abs(x - mx);
          if (dx > r) continue;
          // How far vertically the circle extends at this x
          var halfChord = Math.sqrt(r2 - dx * dx);
          var y1 = Math.max(0, my - halfChord);
          var y2 = Math.min(this.h, my + halfChord);
          if (y2 <= y1) continue;
          // Radial falloff: cubic for a soft candle-glow edge
          var t = 1 - dx / r;
          t = t * t * t;
          var alpha = t * 0.22;
          ctx.strokeStyle = "rgba(46,41,72," + alpha.toFixed(3) + ")";
          ctx.lineWidth = dx < gs * 0.3 ? 1.4 : 0.9;
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }

        // Horizontal grid lines — circular crop, radial falloff
        for (var row = sr; row <= er; row++) {
          var y = row * gs;
          if (y < 0 || y > this.h) continue;
          var dy = Math.abs(y - my);
          if (dy > r) continue;
          var halfChord = Math.sqrt(r2 - dy * dy);
          var x1 = Math.max(0, mx - halfChord);
          var x2 = Math.min(this.w, mx + halfChord);
          if (x2 <= x1) continue;
          var t = 1 - dy / r;
          t = t * t * t;
          var alpha = t * 0.22;
          ctx.strokeStyle = "rgba(46,41,72," + alpha.toFixed(3) + ")";
          ctx.lineWidth = dy < gs * 0.3 ? 1.4 : 0.9;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }
      }

      ctx.restore();
      requestAnimationFrame(function () {
        grid.draw();
      });
    },
  };

  /* -- Portrait parallax -- */
  var portraitInner = document.querySelector(".hero__portrait-inner");
  var px = 0,
    py = 0,
    cx = 0,
    cy = 0;

  hero.addEventListener("mousemove", function (e) {
    var r = hero.getBoundingClientRect();
    cx = ((e.clientX - r.left) / r.width - 0.5) * -10;
    cy = ((e.clientY - r.top) / r.height - 0.5) * -10;
  });

  hero.addEventListener("mouseleave", function () {
    cx = 0;
    cy = 0;
  });

  function updateParallax() {
    px += (cx - px) * 0.08;
    py += (cy - py) * 0.08;
    if (portraitInner) {
      portraitInner.style.transform =
        "translate3d(" + px.toFixed(2) + "px," + py.toFixed(2) + "px,0)";
    }
    requestAnimationFrame(updateParallax);
  }

  /* -- Counter animation -- */
  function animateCounter(el, from, to, duration, delay, suffix) {
    setTimeout(function () {
      var start = performance.now();
      function tick(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 5);
        var current = Math.round(from + (to - from) * eased);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay);
  }

  /* -- Kick everything off -- */
  grid.init();
  grid.draw();
  updateParallax();

  /* Trigger load choreography */
  requestAnimationFrame(function () {
    hero.classList.add("is-loaded");
    /* Animate stat counters */
    var stats = document.querySelectorAll(".stat__num");
    stats.forEach(function (el, i) {
      var target = parseInt(el.dataset.target, 10);
      var suffix = el.dataset.suffix || "";
      animateCounter(el, 0, target, 900, 500 + i * 120, suffix);
    });
  });
})();
