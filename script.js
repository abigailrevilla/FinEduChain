/* ════════════════════════════════════════════════════════════════════════
   FinEduChain Premium JS Interactions Script (Updated)
   Includes: Particles Background, Typewriter, Mobile Menu, Scroll Reveal,
             Wallet Link Simulation, Form Validation, Stats Counters,
             and Scroll Parallax Effect
   ════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════
     1. FIXED NAVBAR SCROLL SOLID EFFECT
  ══════════════════════════════════════════ */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('solid');
      } else {
        nav.classList.remove('solid');
      }
    }, { passive: true });
  }

  /* ══════════════════════════════════════════
     2. MOBILE BURGER MENU
  ══════════════════════════════════════════ */
  const burg = document.getElementById('burg');
  const mobnav = document.getElementById('mobnav');
  if (burg && mobnav) {
    burg.addEventListener('click', () => {
      const isOpen = mobnav.classList.toggle('open');
      burg.classList.toggle('open', isOpen);
    });
  }

  // Global helper to close mobile nav
  window.closeMob = () => {
    if (mobnav && burg) {
      mobnav.classList.remove('open');
      burg.classList.remove('open');
    }
  };

  /* ══════════════════════════════════════════
     3. TYPEWRITER EFFECT (HERO SUBTITLE)
  ══════════════════════════════════════════ */
  const twText = document.getElementById('tw-text');
  if (twText) {
    const phrases = [
      "educación financiera personalizada.",
      "trazabilidad inmutable en Blockchain.",
      "mentoría constante apoyada por IA.",
      "contratos inteligentes transparentes.",
      "un historial crediticio portátil."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        twText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30; // speed up when deleting
      } else {
        twText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 70; // normal typing speed
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at full phrase
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
      }

      setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typewriter
    setTimeout(typeEffect, 1000);
  }

  /* ══════════════════════════════════════════
     4. SCROLL REVEAL (INTERSECTION OBSERVER)
  ══════════════════════════════════════════ */
  const revealElements = document.querySelectorAll('.rv');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          // Once revealed, no need to observe again
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ══════════════════════════════════════════
     5. TOAST NOTIFICATIONS HELPER
  ══════════════════════════════════════════ */
  function showToast(toastId, message, isError = false) {
    const toast = document.getElementById(toastId);
    if (!toast) return;
    
    const toastText = toast.querySelector('#toast-text');
    const toastIcon = toast.querySelector('#toast-icon');

    if (toastText) toastText.textContent = message;
    
    if (isError) {
      toast.classList.add('error');
      if (toastIcon) {
        toastIcon.className = 'fa-solid fa-circle-exclamation';
      }
    } else {
      toast.classList.remove('error');
      if (toastIcon) {
        toastIcon.className = 'fa-solid fa-circle-check';
      }
    }

    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  /* ══════════════════════════════════════════
     6. FORM VALIDATION (REGISTRATION)
  ══════════════════════════════════════════ */
  const regForm = document.getElementById('registration-form');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const apPaterno = document.getElementById('ap-paterno').value.trim();
      const apMaterno = document.getElementById('ap-materno').value.trim();
      const nombres = document.getElementById('nombres').value.trim();
      const genero = document.getElementById('genero').value;
      const tipoDoc = document.getElementById('tipo-doc').value;
      const correo = document.getElementById('correo').value.trim();
      const celular = document.getElementById('celular').value.trim();
      const authDatos = document.getElementById('auth-datos').checked;

      // Simple Validation Checks
      if (!apPaterno || !apMaterno || !nombres || !genero || !tipoDoc || !correo || !celular) {
        showToast('form-toast', 'Por favor complete todos los campos obligatorios (*).', true);
        return;
      }

      // Email Format Check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        showToast('form-toast', 'Por favor ingrese un correo electrónico válido.', true);
        return;
      }

      // Mobile Number Format Check (Peru numbers start with 9, 9 digits)
      const phoneRegex = /^9\d{8}$/;
      if (!phoneRegex.test(celular)) {
        showToast('form-toast', 'El número de celular debe empezar con 9 y tener 9 dígitos.', true);
        return;
      }

      // Consent check
      if (!authDatos) {
        showToast('form-toast', 'Debe autorizar el tratamiento de datos para la evaluación crediticia.', true);
        return;
      }

      // Success Mock
      showToast('form-toast', '¡Registro enviado! Su diagnóstico financiero con IA se está generando.');
      regForm.reset();
      
      // Update simulated wallet display to a new address representing the success
      const simulatedAddress = document.getElementById('simulated-address');
      if (simulatedAddress) {
        setTimeout(() => {
          simulatedAddress.textContent = '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('').substring(0, 6).toUpperCase() + '...' + Math.floor(Math.random()*9000 + 1000);
          simulatedAddress.style.color = 'var(--cyan)';
        }, 1000);
      }
    });
  }

  /* ══════════════════════════════════════════
     7. WALLET LINK SIMULATION (LOGIN PAGE)
  ══════════════════════════════════════════ */
  const loginWalletBtn = document.getElementById('btn-login-wallet');
  const loginForm = document.getElementById('login-form');

  if (loginWalletBtn) {
    loginWalletBtn.addEventListener('click', () => {
      loginWalletBtn.classList.add('connected');
      
      const mockAddress = '0x' + Array.from({length: 10}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase() + '...' + Array.from({length: 4}, () => Math.floor(Math.random()*10)).join('');
      const btnText = document.getElementById('wallet-btn-text');
      if (btnText) {
        btnText.textContent = `Wallet Vinculada: ${mockAddress}`;
      }
      
      const icon = loginWalletBtn.querySelector('i');
      if (icon) {
        icon.className = 'fa-solid fa-circle-check';
      }

      showToast('login-toast', 'Wallet vinculada con éxito. Autenticando identidad auto-soberana...');
      
      // Auto submit or redirect mock after login
      setTimeout(() => {
        showToast('login-toast', '¡Acceso concedido! Redireccionando...');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      }, 2000);
    });
  }

  /* CREDENTIALS LOGIN MOCK */
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value.trim();
      const pass = document.getElementById('login-password').value;

      if (!email || !pass) {
        showToast('login-toast', 'Por favor complete todos los campos obligatorios.', true);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('login-toast', 'Por favor ingrese un correo válido.', true);
        return;
      }

      showToast('login-toast', 'Iniciando sesión...');
      
      setTimeout(() => {
        showToast('login-toast', '¡Acceso concedido! Redireccionando...');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1200);
      }, 1000);
    });
  }

  /* ══════════════════════════════════════════
     8. ANIMATED STATISTICS COUNTERS (NEW)
  ══════════════════════════════════════════ */
  const statsSection = document.querySelector('.stats-grid');
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statsSection && statNumbers.length > 0) {
    let countersAnimated = false;

    function animateCounters() {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        const duration = 1600; // ms
        let startTime = null;

        function updateStep(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          // Easing cubic ease-out
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(easeProgress * target);
          
          stat.textContent = `${currentValue}%`;

          if (progress < 1) {
            requestAnimationFrame(updateStep);
          } else {
            stat.textContent = `${target}%`; // Ensure exact match at the end
          }
        }

        requestAnimationFrame(updateStep);
      });
    }

    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
        statsObserver.disconnect(); // stop observing
      }
    }, {
      threshold: 0.1
    });

    statsObserver.observe(statsSection);
  }

  /* ══════════════════════════════════════════
     9. SCROLL PARALLAX BACKGROUND FOR REGISTER
  ══════════════════════════════════════════ */
  const registerSection = document.getElementById('register');
  const registerBgContainer = document.getElementById('register-bg-container');
  
  if (registerSection && registerBgContainer) {
    window.addEventListener('scroll', () => {
      const rect = registerSection.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate how much the section is scrolled in relation to the viewport
      if (rect.top < viewHeight && rect.bottom > 0) {
        const scrolledPercentage = (viewHeight - rect.top) / (viewHeight + rect.height);
        
        // Translate bg wrapper Y slightly (e.g. from -50px to 50px)
        const translateY = (scrolledPercentage - 0.5) * 85; 
        registerBgContainer.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
    }, { passive: true });
  }

  /* ══════════════════════════════════════════
     10. INTERACTIVE HERO PARTICLES CANVAS
  ══════════════════════════════════════════ */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    const mouse = { x: -9999, y: -9999, radius: 130 };

    function initCanvasSize() {
      const container = canvas.parentElement;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 0.6;
        this.alpha = Math.random() * 0.4 + 0.15;
        this.color = Math.random() > 0.4 ? '#00f2fe' : '#0072ff'; // Cyan or Bright Blue
      }

      update() {
        // Normal drift speed
        this.x += this.vx;
        this.y += this.vy;

        // Interaction with mouse cursor (Repulsion)
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.hypot(dx, dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          // Push particles away
          this.x += (dx / distance) * force * 3.5;
          this.y += (dy / distance) * force * 3.5;
        }

        // Screen boundary wrap
        if (this.x < -15) this.x = width + 15;
        if (this.x > width + 15) this.x = -15;
        if (this.y < -15) this.y = height + 15;
        if (this.y > height + 15) this.y = -15;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function createParticles() {
      initCanvasSize();
      particles = [];
      
      // Particle density based on screen size
      const densityFactor = 7500;
      const count = Math.min(130, Math.floor((width * height) / densityFactor));
      
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    // Connect close particles with lines
    function drawConnections() {
      const maxDistance = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = '#00f2fe';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    // Connect particles to mouse
    function drawMouseConnections() {
      if (mouse.x === -9999) return;
      
      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / mouse.radius) * 0.3;
          ctx.strokeStyle = '#ffb300'; // Gold accent for mouse lines
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.restore();
        }
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawConnections();
      drawMouseConnections();
      
      requestAnimationFrame(animate);
    }

    // Init & Listeners
    createParticles();
    animate();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        createParticles();
      }, 250);
    }, { passive: true });

    // Track mouse coordinates inside Hero container
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }, { passive: true });

      heroSection.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
      }, { passive: true });

      // Mobile touch support
      heroSection.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          const rect = canvas.getBoundingClientRect();
          mouse.x = e.touches[0].clientX - rect.left;
          mouse.y = e.touches[0].clientY - rect.top;
        }
      }, { passive: true });

      heroSection.addEventListener('touchend', () => {
        mouse.x = -9999;
        mouse.y = -9999;
      }, { passive: true });
    }
  }

/* ══════════════════════════════════════════
     11. ACTIVE NAV LINK ON SCROLL
  ══════════════════════════════════════════ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
});
