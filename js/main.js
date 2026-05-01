/**
 * MAJESTIQUE LANDMARKS — Main JavaScript
 * Version: 1.0
 * Description: Homepage interactions and animations
 */

(function () {
  'use strict';

  /* =============================================
     PRELOADER
     Hard dismiss after 2.5s — never blocks page
  ============================================= */
  const preloader = document.getElementById('preloader');

  function dismissPreloader() {
    if (preloader) preloader.classList.add('done');
  }

  // Guaranteed dismiss: 2.5 seconds max
  setTimeout(dismissPreloader, 2500);
  // Also dismiss on window load (fires earlier if assets load fast)
  window.addEventListener('load', () => setTimeout(dismissPreloader, 400));
  // Dismiss on any user interaction
  document.addEventListener('click',   dismissPreloader, { once: true });
  document.addEventListener('keydown', dismissPreloader, { once: true });
  document.addEventListener('touchstart', dismissPreloader, { once: true });


  /* =============================================
     STICKY HEADER + BACK TO TOP
  ============================================= */
  const header  = document.getElementById('header');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 80;
    header.classList.toggle('scrolled', scrolled);
    backTop.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });


  /* =============================================
     MOBILE NAVIGATION
  ============================================= */
  const navToggle = document.getElementById('navToggle');
  const nav       = document.getElementById('nav');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* =============================================
     ACTIVE NAV LINK ON SCROLL
  ============================================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 140) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });


  /* =============================================
     PROJECT SHOWCASE TABS
  ============================================= */
  const ptabs    = document.querySelectorAll('.ptab');
  const scItems  = document.querySelectorAll('.sc-item');

  ptabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const idx = this.dataset.i;
      ptabs.forEach(t => t.classList.remove('active'));
      scItems.forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      const target = document.querySelector(`.sc-item[data-i="${idx}"]`);
      if (target) target.classList.add('active');
    });
  });


  /* =============================================
     SCROLL REVEAL ANIMATIONS
  ============================================= */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* =============================================
     ANIMATED COUNTERS
  ============================================= */
  const counters = document.querySelectorAll('.sbs-num[data-t]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.t, 10);
      const dur    = 1800;
      const steps  = 60;
      const inc    = target / steps;
      let   cur    = 0;
      let   count  = 0;

      const timer = setInterval(() => {
        cur += inc;
        count++;
        if (count >= steps) {
          cur = target;
          clearInterval(timer);
        }
        // Format thousands with comma
        el.textContent = cur >= 1000
          ? Math.floor(cur / 1000) + ',' + String(Math.floor(cur % 1000)).padStart(3, '0')
          : Math.floor(cur);
      }, dur / steps);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));


  /* =============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target   = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* =============================================
     BACK TO TOP
  ============================================= */
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* =============================================
     CONTACT FORM SUBMIT (UI only — connect to backend as needed)
  ============================================= */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn      = this.querySelector('button[type="submit"]');
      const original = btn.innerHTML;

      btn.innerHTML        = '<i class="fas fa-check"></i> Thank you! We\'ll be in touch soon.';
      btn.style.background = '#2a7a2a';
      btn.disabled         = true;

      setTimeout(() => {
        btn.innerHTML        = original;
        btn.style.background = '';
        btn.disabled         = false;
        this.reset();
      }, 4000);
    });
  }

})();
