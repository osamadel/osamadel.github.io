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

  /* ---- Skills data → cards ---- */
  var skills = [
    {
      name: "Machine Learning",
      tools: "scikit-learn · TensorFlow",
      level: "Expert",
      pct: 95,
    },
    {
      name: "Python",
      tools: "pandas · numpy · PySpark",
      level: "Expert",
      pct: 95,
    },
    {
      name: "GenAI · Agentic RAG",
      tools: "Claude · Llama-Index · LangChain",
      level: "Experienced",
      pct: 85,
    },
    {
      name: "LLMs · Multi-Agent",
      tools: "tool use · orchestration",
      level: "Experienced",
      pct: 82,
    },
    {
      name: "Statistics",
      tools: "statsmodels · pingouin",
      level: "Experienced",
      pct: 80,
    },
    { name: "SQL", tools: "Postgres · Oracle", level: "Experienced", pct: 80 },
    {
      name: "Databricks",
      tools: "Spark · Delta Lake",
      level: "Skillful",
      pct: 72,
    },
    {
      name: "MLOps & Git",
      tools: "CI/CD · CRISP-DM",
      level: "Skillful",
      pct: 70,
    },
    {
      name: "Computer Vision",
      tools: "OpenCV · CNNs",
      level: "Skillful",
      pct: 68,
    },
    { name: "Numerical Optimization", tools: "", level: "Skillful", pct: 68 },
    { name: "Linux", tools: "", level: "Skillful", pct: 66 },
    {
      name: "Airflow · Kafka",
      tools: "orchestration · streaming",
      level: "Growing",
      pct: 50,
    },
    { name: "Time Series", tools: "", level: "Growing", pct: 45 },
    { name: "AWS", tools: "cloud ML", level: "Growing", pct: 42 },
    { name: "R", tools: "statistical modeling", level: "Growing", pct: 40 },
  ];

  var grid = document.getElementById("skillsGrid");
  if (grid) {
    grid.innerHTML = skills
      .map(function (s) {
        var tools = s.tools
          ? '<span class="skill__tools">' + s.tools + "</span>"
          : "";
        return (
          "" +
          '<div class="skill reveal">' +
          '<div class="skill__top">' +
          '<span class="skill__name">' +
          s.name +
          tools +
          "</span>" +
          '<span class="skill__level">' +
          s.level +
          "</span>" +
          "</div>" +
          '<div class="skill__bar"><span class="skill__fill" data-pct="' +
          s.pct +
          '"></span></div>' +
          "</div>"
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

  /* ---- Reveal-on-scroll + animate skill bars ---- */
  var revealEls = document.querySelectorAll(
    ".section__title, .section__kicker, .about__text, .about__pillars li, .skill, .card, .edu__item, .contact__link",
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
    document.querySelectorAll(".skill__fill").forEach(function (f) {
      f.style.width = f.dataset.pct + "%";
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
          var fill = entry.target.querySelector
            ? entry.target.querySelector(".skill__fill")
            : null;
          if (fill) fill.style.width = fill.dataset.pct + "%";
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
