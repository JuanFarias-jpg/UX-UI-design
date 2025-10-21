<script>
  const preguntas = document.querySelectorAll('.pregunta');
  const respuestas = document.querySelectorAll('.respuesta');
  const arrows = document.querySelectorAll('.arrow');

  preguntas.forEach((pregunta, i) => {
    pregunta.addEventListener('click', () => {
      const isOpen = respuestas[i].classList.contains('respuesta-opened');

      // Cierra todas las demás
      respuestas.forEach(r => r.classList.remove('respuesta-opened'));
      arrows.forEach(a => a.classList.remove('arrow-rotated'));

      // Si no estaba abierta, la abrimos
      if (!isOpen) {
        respuestas[i].classList.add('respuesta-opened');
        arrows[i].classList.add('arrow-rotated');
      }
    });
  });
</script>
