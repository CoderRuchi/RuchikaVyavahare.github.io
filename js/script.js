document.addEventListener('DOMContentLoaded', () => {
  // Loader
  const loader = document.querySelector('.loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('fade-out'), 1200);
  });

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'light') themeIcon.classList.replace('fa-moon', 'fa-sun');

  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.classList.replace(newTheme === 'light' ? 'fa-moon' : 'fa-sun', newTheme === 'light' ? 'fa-sun' : 'fa-moon');
  });

  // Typed.js
  new Typed('.typed', {
    strings: ['Ruchika', 'a Developer', 'a Designer', 'a Problem Solver', 'a Creator'],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    smartBackspace: true
  });

  // AOS Initialization
  AOS.init({
    duration: 1000,
    easing: 'ease-out',
    once: true,
    mirror: false
  });

  // Navigation Toggle
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active', isActive);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Skills Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
      AOS.refresh();
    });
  });

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.setAttribute('data-aos', 'fade-up');
        } else {
          card.style.display = 'none';
        }
      });
      AOS.refreshHard();
    });
  });

  // Project Carousel
  const carouselInner = document.querySelector('.carousel-inner');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  let currentIndex = 0;
  const cardWidth = 33.333; // Percentage width per card

  const updateCarousel = () => {
    carouselInner.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
  };

  nextBtn.addEventListener('click', () => {
    if (currentIndex < projectCards.length - 3) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Particles.js
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 1000 } },
        color: { value: '#00d9a6' },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true },
        size: { value: 4, random: true },
        line_linked: { enable: true, distance: 120, color: '#00d9a6', opacity: 0.3, width: 1 },
        move: { enable: true, speed: 3, direction: 'none', random: true, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' }
        }
      }
    });
  }

  // Back to Top
  const backToTopBtn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('active', window.pageYOffset > 400);
  });

  // Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnIcon = submitBtn.querySelector('i');

      btnText.textContent = 'Sending...';
      btnIcon.classList.replace('fa-paper-plane', 'fa-spinner');
      btnIcon.classList.add('fa-spin');

      try {
        const response = await fetch('https://formspree.io/f/your-form-id', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          btnText.textContent = 'Sent!';
          btnIcon.classList.replace('fa-spinner', 'fa-check');
          btnIcon.classList.remove('fa-spin');
          contactForm.reset();
          setTimeout(() => {
            btnText.textContent = 'Send Message';
            btnIcon.classList.replace('fa-check', 'fa-paper-plane');
          }, 3000);
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        btnText.textContent = 'Error';
        btnIcon.classList.replace('fa-spinner', 'fa-exclamation-circle');
        btnIcon.classList.remove('fa-spin');
        setTimeout(() => {
          btnText.textContent = 'Send Message';
          btnIcon.classList.replace('fa-exclamation-circle', 'fa-paper-plane');
        }, 3000);
      }
    });
  }

  // Skill Progress Animation
  const skillCards = document.querySelectorAll('.skill-card');
  const animateProgressBars = () => {
    skillCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85 && !card.classList.contains('animated')) {
        const progressBar = card.querySelector('.progress-bar');
        progressBar.style.width = progressBar.getAttribute('style').match(/width:\s*(\d+)%/)[1] + '%';
        card.classList.add('animated');
      }
    });
  };

  window.addEventListener('scroll', animateProgressBars);
  animateProgressBars();

  // Dynamic Footer Year
  document.getElementById('year').textContent = new Date().getFullYear();
});