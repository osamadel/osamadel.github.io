/* Osama Feshier — site interactions */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky nav state ---- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById('navToggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---- Skills data → cards ---- */
  var skills = [
    { name: 'Machine Learning', tools: 'scikit-learn · TensorFlow', level: 'Expert', pct: 95 },
    { name: 'Python', tools: 'pandas · numpy · PySpark', level: 'Expert', pct: 95 },
    { name: 'GenAI · Agentic RAG', tools: 'Claude · Llama-Index · LangChain', level: 'Experienced', pct: 85 },
    { name: 'LLMs · Multi-Agent', tools: 'tool use · orchestration', level: 'Experienced', pct: 82 },
    { name: 'Statistics', tools: 'statsmodels · pingouin', level: 'Experienced', pct: 80 },
    { name: 'SQL', tools: 'Postgres · Oracle', level: 'Experienced', pct: 80 },
    { name: 'Databricks', tools: 'Spark · Delta Lake', level: 'Skillful', pct: 72 },
    { name: 'MLOps & Git', tools: 'CI/CD · CRISP-DM', level: 'Skillful', pct: 70 },
    { name: 'Computer Vision', tools: 'OpenCV · CNNs', level: 'Skillful', pct: 68 },
    { name: 'Numerical Optimization', tools: '', level: 'Skillful', pct: 68 },
    { name: 'Linux', tools: '', level: 'Skillful', pct: 66 },
    { name: 'Airflow · Kafka', tools: 'orchestration · streaming', level: 'Growing', pct: 50 },
    { name: 'Time Series', tools: '', level: 'Growing', pct: 45 },
    { name: 'AWS', tools: 'cloud ML', level: 'Growing', pct: 42 },
    { name: 'R', tools: 'statistical modeling', level: 'Growing', pct: 40 }
  ];

  var grid = document.getElementById('skillsGrid');
  if (grid) {
    grid.innerHTML = skills.map(function (s) {
      var tools = s.tools ? '<span class="skill__tools">' + s.tools + '</span>' : '';
      return '' +
        '<div class="skill reveal">' +
          '<div class="skill__top">' +
            '<span class="skill__name">' + s.name + tools + '</span>' +
            '<span class="skill__level">' + s.level + '</span>' +
          '</div>' +
          '<div class="skill__bar"><span class="skill__fill" data-pct="' + s.pct + '"></span></div>' +
        '</div>';
    }).join('');
  }

  /* ---- Reveal-on-scroll + animate skill bars ---- */
  var revealEls = document.querySelectorAll(
    '.section__title, .section__kicker, .about__text, .about__pillars li, .skill, .card, .edu__item, .contact__link'
  );
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  /* ---- Timeline cascade reveal ---- */
  var tlEls = document.querySelectorAll('.tl-cascade');
  var tlSubEls = document.querySelectorAll('.tl-sub-reveal');

  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    document.querySelectorAll('.skill__fill').forEach(function (f) { f.style.width = f.dataset.pct + '%'; });
    tlEls.forEach(function (el) { el.classList.add('is-visible'); });
    tlSubEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        var fill = entry.target.querySelector ? entry.target.querySelector('.skill__fill') : null;
        if (fill) fill.style.width = fill.dataset.pct + '%';
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });

    /* Timeline observer — fires all items when the section enters view, stagger handled by CSS */
    var timelineSection = document.getElementById('experience');
    if (timelineSection) {
      var tlIO = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        tlEls.forEach(function (el) { el.classList.add('is-visible'); });
        /* Sub-cards reveal after a beat — delay so parent cascade has started */
        setTimeout(function () {
          tlSubEls.forEach(function (el) { el.classList.add('is-visible'); });
        }, 400);
        tlIO.unobserve(timelineSection);
      }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
      tlIO.observe(timelineSection);
    }
  }

  /* ============================================================
     HERO OVERDRIVE — Signal Field, Signal Wave, Choreography
     ============================================================ */
  if (reduce) {
    /* Reduced motion: instant reveal, no canvases */
    var heroInstant = document.querySelector('.hero');
    if (heroInstant) {
      heroInstant.classList.add('is-loaded');
      document.querySelectorAll('.stat__num').forEach(function (el) {
        el.textContent = el.dataset.target + (el.dataset.suffix || '');
      });
    }
    return;
  }

  var hero = document.querySelector('.hero');
  if (!hero) return;

  /* -- Signal Field (interactive data-point network) -- */
  var fieldCanvas = document.getElementById('hero-field');
  var field = {
    dots: [],
    mouse: { x: -9999, y: -9999 },
    w: 0, h: 0, dpr: 1, ctx: null,
    proximity: 110,
    cursorRadius: 160,

    init: function () {
      this.ctx = fieldCanvas.getContext('2d');
      this.dpr = window.devicePixelRatio || 1;
      this.resize();
      this.seed();

      var self = this;
      window.addEventListener('resize', function () { self.resize(); self.seed(); });
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        self.mouse.x = e.clientX - r.left;
        self.mouse.y = e.clientY - r.top;
      });
      hero.addEventListener('mouseleave', function () {
        self.mouse.x = -9999;
        self.mouse.y = -9999;
      });
    },

    resize: function () {
      var rect = hero.getBoundingClientRect();
      fieldCanvas.width = rect.width * this.dpr;
      fieldCanvas.height = rect.height * this.dpr;
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.w = rect.width;
      this.h = rect.height;
    },

    seed: function () {
      var area = this.w * this.h;
      var count = Math.min(Math.floor(area / 18000), 80);
      this.dots = [];
      for (var i = 0; i < count; i++) {
        this.dots.push({
          x: Math.random() * this.w,
          y: Math.random() * this.h,
          baseAlpha: 0.06 + Math.random() * 0.1,
          alpha: 0,
          size: 0.8 + Math.random() * 1.2,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          bright: false
        });
      }
    },

    draw: function (globalAlpha) {
      var ctx = this.ctx;
      ctx.clearRect(0, 0, this.w, this.h);

      var dots = this.dots;
      var len = dots.length;
      var mx = this.mouse.x;
      var my = this.mouse.y;
      var cr = this.cursorRadius;
      var cr2 = cr * cr;

      /* Update positions & proximity */
      for (var i = 0; i < len; i++) {
        var d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > this.w) d.vx *= -1;
        if (d.y < 0 || d.y > this.h) d.vy *= -1;
        d.x = Math.max(0, Math.min(this.w, d.x));
        d.y = Math.max(0, Math.min(this.h, d.y));

        var dx = d.x - mx;
        var dy = d.y - my;
        var dist2 = dx * dx + dy * dy;
        d.bright = dist2 < cr2;
        var prox = d.bright ? Math.max(0, 1 - Math.sqrt(dist2) / cr) : 0;
        d.alpha = d.baseAlpha + prox * 0.55;
      }

      /* Draw connections */
      var prox2 = this.proximity * this.proximity;
      for (var i = 0; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
          var dx = dots[i].x - dots[j].x;
          var dy = dots[i].y - dots[j].y;
          var d2 = dx * dx + dy * dy;
          if (d2 < prox2) {
            var lineA = (1 - d2 / prox2) * 0.12 * globalAlpha;
            ctx.strokeStyle = 'rgba(52,235,135,' + lineA + ')';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      /* Draw dots */
      for (var i = 0; i < len; i++) {
        var d = dots[i];
        var a = d.alpha * globalAlpha;
        if (a < 0.005) continue;
        ctx.fillStyle = d.bright
          ? 'rgba(52,235,135,' + a + ')'
          : 'rgba(143,164,153,' + (a * 0.6) + ')';
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  /* -- Signal Wave removed -- */

  /* -- Portrait parallax -- */
  var portraitInner = document.querySelector('.hero__portrait-inner');
  var px = 0, py = 0, cx = 0, cy = 0;

  hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect();
    cx = ((e.clientX - r.left) / r.width - 0.5) * -10;
    cy = ((e.clientY - r.top) / r.height - 0.5) * -10;
  });

  hero.addEventListener('mouseleave', function () {
    cx = 0;
    cy = 0;
  });

  function updateParallax() {
    px += (cx - px) * 0.08;
    py += (cy - py) * 0.08;
    if (portraitInner) {
      portraitInner.style.transform = 'translate3d(' + px.toFixed(2) + 'px,' + py.toFixed(2) + 'px,0)';
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

  /* -- Render loop -- */
  var rafId;
  var heroVisible = true;

  function renderLoop() {
    if (heroVisible) {
      field.draw(1);
    }
    rafId = requestAnimationFrame(renderLoop);
  }

  /* Pause when hero is off-screen or tab is hidden */
  if ('IntersectionObserver' in window) {
    var heroIO = new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    heroIO.observe(hero);
  }

  document.addEventListener('visibilitychange', function () {
    heroVisible = !document.hidden;
  });

  /* -- Kick everything off -- */
  field.init();
  renderLoop();
  updateParallax();

  /* Trigger load choreography */
  requestAnimationFrame(function () {
    hero.classList.add('is-loaded');

    /* Animate stat counters */
    var stats = document.querySelectorAll('.stat__num');
    stats.forEach(function (el, i) {
      var target = parseInt(el.dataset.target, 10);
      var suffix = el.dataset.suffix || '';
      animateCounter(el, 0, target, 900, 500 + i * 120, suffix);
    });
  });

})();
