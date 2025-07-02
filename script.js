// document.addEventListener("DOMContentLoaded", () => {
//   const themeToggle = document.getElementById("toggleTheme");
//   const body = document.body;

//   const currentTheme = localStorage.getItem("theme") || "dark";
//   if (currentTheme === "light") {
//     body.classList.add("light-mode");
//     themeToggle.textContent = "☀️";
//   }

//   themeToggle.addEventListener("click", () => {
//     body.classList.toggle("light-mode");
//     if (body.classList.contains("light-mode")) {
//       themeToggle.textContent = "☀️";
//       localStorage.setItem("theme", "light");
//     } else {
//       themeToggle.textContent = "🌙";
//       localStorage.setItem("theme", "dark");
//     }
//   });
// });

// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  let navToggle = document.querySelector('.nav-toggle');

  if (!navToggle) {
    navToggle = document.createElement('div');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = `<span></span><span></span><span></span>`;
    navbar.insertBefore(navToggle, navLinks);
  }

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');

    const spans = navToggle.querySelectorAll('span');
    if (navToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans.forEach(span => {
        span.style.transform = 'none';
        span.style.opacity = '1';
      });
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans.forEach(span => {
        span.style.transform = 'none';
        span.style.opacity = '1';
      });
    }
  });
});

// Also observe experience and certification cards
const experienceCards = document.querySelectorAll('.experience-card');
const certificationCards = document.querySelectorAll('.certification-card');

experienceCards.forEach(card => observer.observe(card));
certificationCards.forEach(card => observer.observe(card));

// Header Shrink on Scroll (Debounced)
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const handleScroll = debounce(() => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
}, 10);

window.addEventListener('scroll', handleScroll);

// Project Cards Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.project-card').forEach(card => {
  observer.observe(card);
});

// Smooth Scroll for Anchor Links (Fallback)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Form Loading State
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  });
}
function toggleChat() {
  const chatWindow = document.getElementById('chatbotWindow');
  chatWindow.classList.toggle('hidden');
}


// Smooth Image Loading
document.querySelectorAll('img').forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';
  img.addEventListener('load', () => {
    img.style.opacity = '1';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card');

  const revealCards = () => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', revealCards);
  revealCards(); // reveal already visible cards on load
});

const originalTitle = document.title;
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "👀 Come back!";
  } else {
    document.title = originalTitle;
  }
});
