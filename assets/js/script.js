// Animações e interatividade para o portfólio

document.addEventListener('DOMContentLoaded', function() {
  // Navbar mobile toggle
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

  // Removido o efeito de navbar scroll fixo conforme solicitado

  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial-item');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  let currentTestimonial = 0;

  // Função para mostrar um depoimento específico
  function showTestimonial(index) {
    testimonials.forEach(item => item.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('is-active'));
    
    testimonials[index].style.display = 'block';
    dots[index].classList.add('is-active');
    currentTestimonial = index;
  }

  // Adicionar evento de clique aos dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
    });
  });

  // Avançar para o próximo depoimento automaticamente
  setInterval(() => {
    let next = currentTestimonial + 1;
    if (next >= testimonials.length) next = 0;
    showTestimonial(next);
  }, 5000);

  // Smooth scroll para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
          
          // Fechar menu mobile se estiver aberto
          const navMenu = document.getElementById('navMenu');
          const burger = document.querySelector('.navbar-burger');
          if (navMenu.classList.contains('is-active')) {
            navMenu.classList.remove('is-active');
            burger.classList.remove('is-active');
          }
        }
      }
    });
  });

  // Animação de entrada para elementos com data-aos
  const animatedElements = document.querySelectorAll('[data-aos]');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });
});
