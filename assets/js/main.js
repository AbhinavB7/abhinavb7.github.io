/**
 * High-End Minimalist Portfolio
 * Abhinav Bhamidipati
 * Premium Interactions & Animations
 */

(function() {
  "use strict";

  // ============================================
  // Preloader
  // ============================================
  const preloader = document.querySelector('#preloader');
  
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      setTimeout(() => preloader.remove(), 600);
    }
  });

  // ============================================
  // Header Toggle (Mobile)
  // ============================================
  const headerToggleBtn = document.querySelector('.header-toggle');
  const header = document.querySelector('#header');

  function headerToggle() {
    header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('active');
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  // Close mobile nav on link click
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (header.classList.contains('header-show')) {
        headerToggle();
      }
    });
  });

  // ============================================
  // Scroll Top Button
  // ============================================
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 
        ? scrollTop.classList.add('active') 
        : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  // ============================================
  // Typed.js Initialization
  // ============================================
  const selectTyped = document.querySelector('.typed');
  
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',').map(s => s.trim());
    
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2500,
      cursorChar: '|',
      showCursor: true
    });
  }

  // ============================================
  // Intersection Observer - Scroll Reveal
  // ============================================
  const revealElements = document.querySelectorAll('.reveal-element');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation for multiple elements entering at once
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // Navigation Scrollspy
  // ============================================
  const navLinks = document.querySelectorAll('.navmenu a');

  function navScrollspy() {
    const scrollPosition = window.scrollY + 200;

    navLinks.forEach(link => {
      const hash = link.getAttribute('href');
      if (!hash || !hash.startsWith('#')) return;
      
      const section = document.querySelector(hash);
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('load', navScrollspy);
  document.addEventListener('scroll', navScrollspy);

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // Isotope Portfolio Filter
  // ============================================
  const projectsGrid = document.querySelector('.projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (projectsGrid && typeof Isotope !== 'undefined') {
    // Wait for images to load
    imagesLoaded(projectsGrid, function() {
      const iso = new Isotope(projectsGrid, {
        itemSelector: '.project-card',
        layoutMode: 'fitRows',
        fitRows: {
          gutter: 32
        },
        transitionDuration: '0.1s',
        percentPosition: false,
        hiddenStyle: {
          opacity: 0
        },
        visibleStyle: {
          opacity: 1
        }
      });

      filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          // Update active state
          filterButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');

          // Filter items
          const filterValue = this.getAttribute('data-filter');
          iso.arrange({ filter: filterValue });
        });
      });
    });
  }

  // ============================================
  // GLightbox Initialization
  // ============================================
  if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true
    });
  }

  // ============================================
  // Handle Hash Links on Page Load
  // ============================================
  window.addEventListener('load', function() {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  // ============================================
  // Project Cards - Prevent Empty Links
  // ============================================
  document.querySelectorAll('.project-link.no-link').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
  });

  // ============================================
  // Subtle Parallax on Hero (Optional Enhancement)
  // ============================================
  const heroBg = document.querySelector('.hero-bg img');
  
  if (heroBg && window.innerWidth > 768) {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.3;
          heroBg.style.transform = `translateY(${rate}px)`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

})();
