// Carrusel de imagenes
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  });


// Animacion de iconos  
// --- Animación y toggle de los íconos ---
document.querySelectorAll('.icon-like').forEach(icon => {
  icon.addEventListener('click', e => {
    // Alterna entre vacío (regular) y lleno (solid)
    e.target.classList.toggle('liked');
    e.target.classList.toggle('fa-regular');
    e.target.classList.toggle('fa-solid');
  });
});

// --- Animación y scroll del ícono de comentario ---
document.querySelectorAll('.icon-comment').forEach(icon => {
  icon.addEventListener('click', e => {
    // Efecto visual pop
    e.target.classList.add('clicked');
    setTimeout(() => e.target.classList.remove('clicked'), 400);

    // Scroll suave hacia la sección de comentarios
    const seccionComentarios = document.getElementById('comentarios');
    if (seccionComentarios) {
      seccionComentarios.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

