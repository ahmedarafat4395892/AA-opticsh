// ===== SMOOTH SCROLL NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu after clicking
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
  function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // ===== SCROLL ANIMATIONS =====
  function animateOnScroll() {
    const animateElements = document.querySelectorAll('.scroll-animate');
    
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100 && elementBottom > 0) {
        element.classList.add('active');
      }
    });
  }

  // ===== MOBILE MENU TOGGLE =====
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  function handleNavbarScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
  }

  // ===== SERVICE BUTTON INTERACTIONS =====
  const serviceButtons = document.querySelectorAll('.service-button');
  
  serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
      const section = this.closest('.service-section');
      const sectionTitle = section.querySelector('.section-title').textContent;
      
      // Create a simple alert for demonstration
      alert(`شكراً لاهتمامك بـ ${sectionTitle}! سنتواصل معك قريباً.`);
      
      // In a real application, this would open a contact form or redirect to a details page
    });
  });

  // ===== CTA BUTTON SMOOTH SCROLL =====
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }

  // ===== SCROLL EVENT LISTENERS =====
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    // Debounce scroll events for better performance
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(function() {
      highlightNavigation();
      animateOnScroll();
      handleNavbarScroll();
    });
  });

  // ===== INITIAL ANIMATIONS =====
  // Trigger animations on page load
  animateOnScroll();
  highlightNavigation();

  // ===== INTERSECTION OBSERVER FOR BETTER PERFORMANCE =====
  // Alternative to scroll event for animations (more efficient)
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-animate').forEach(element => {
      observer.observe(element);
    });
  }

  // ===== SMOOTH REVEAL FOR HERO ELEMENTS =====
  const heroElements = document.querySelectorAll('.hero .fade-in');
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
    }, index * 200);
  });

  // ===== PARALLAX EFFECT FOR FLOATING CIRCLES =====
  const floatingCircles = document.querySelectorAll('.floating-circle');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    floatingCircles.forEach((circle, index) => {
      const speed = 0.5 + (index * 0.2);
      const yPos = -(scrolled * speed);
      circle.style.transform = `translateY(${yPos}px)`;
    });
  });

  // ===== CONSOLE MESSAGE =====
  console.log('🚀 Nexton-X website loaded successfully!');
  console.log('✨ All animations and interactions are ready.');
});

// ===== WINDOW RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      document.querySelector('.nav-menu').classList.remove('active');
      document.querySelector('.hamburger').classList.remove('active');
    }
  }, 250);
});

// ===== PREVENT SCROLL RESTORATION ON PAGE RELOAD =====
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// ===== SMOOTH SCROLL TO TOP ON PAGE LOAD =====
window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});
