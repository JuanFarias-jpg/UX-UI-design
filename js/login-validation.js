/* ==========================================
   LOGIN-VALIDATION.JS - Validación de Formulario
   ==========================================
   Este archivo maneja:
   - Validación en tiempo real del formulario
   - Mensajes de error accesibles
   - Prevención de envío con errores
   - Simulación de login (para el prototipo)
========================================== */

(function() {
  'use strict';

  // ===== ELEMENTOS DEL DOM =====
  const loginForm = document.querySelector('#login-form');
  const usernameInput = document.querySelector('#username');
  const passwordInput = document.querySelector('#password');
  const rememberCheckbox = document.querySelector('#remember');

  // ===== EXPRESIONES REGULARES =====
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ===== FUNCIONES DE VALIDACIÓN =====

  /**
   * Validar campo de usuario/email
   */
  function validateUsername(value) {
    if (!value || value.trim().length === 0) {
      return {
        valid: false,
        message: 'El usuario o correo es requerido'
      };
    }

    if (value.length < 3) {
      return {
        valid: false,
        message: 'Debe tener al menos 3 caracteres'
      };
    }

    // Si contiene @, validar como email
    if (value.includes('@') && !EMAIL_REGEX.test(value)) {
      return {
        valid: false,
        message: 'El formato del correo no es válido'
      };
    }

    return { valid: true };
  }

  /**
   * Validar contraseña
   */
  function validatePassword(value) {
    if (!value || value.trim().length === 0) {
      return {
        valid: false,
        message: 'La contraseña es requerida'
      };
    }

    if (value.length < 6) {
      return {
        valid: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      };
    }

    return { valid: true };
  }

  /**
   * Mostrar error en un campo
   */
  function showError(input, message) {
    const errorSpan = document.querySelector(`#${input.id}-error`);
    
    // Marcar input como inválido
    input.setAttribute('aria-invalid', 'true');
    input.classList.add('form-input--error');
    
    // Mostrar mensaje de error
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.removeAttribute('hidden');
      input.setAttribute('aria-describedby', errorSpan.id);
    }
  }

  /**
   * Limpiar error de un campo
   */
  function clearError(input) {
    const errorSpan = document.querySelector(`#${input.id}-error`);
    
    // Marcar input como válido
    input.setAttribute('aria-invalid', 'false');
    input.classList.remove('form-input--error');
    
    // Ocultar mensaje de error
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.setAttribute('hidden', '');
      input.removeAttribute('aria-describedby');
    }
  }

  /**
   * Validar un campo específico
   */
  function validateField(input) {
    let validation;

    if (input === usernameInput) {
      validation = validateUsername(input.value);
    } else if (input === passwordInput) {
      validation = validatePassword(input.value);
    }

    if (validation.valid) {
      clearError(input);
      return true;
    } else {
      showError(input, validation.message);
      return false;
    }
  }

  /**
   * Validar todo el formulario
   */
  function validateForm() {
    const usernameValid = validateField(usernameInput);
    const passwordValid = validateField(passwordInput);

    return usernameValid && passwordValid;
  }

  /**
   * Simular proceso de login (para el prototipo)
   */
  function simulateLogin(username, password, remember) {
    return new Promise((resolve, reject) => {
      // Simular delay de red
      setTimeout(() => {
        // Credenciales de prueba
        const validCredentials = [
          { user: 'admin', pass: 'admin123' },
          { user: 'usuario@test.com', pass: 'test123' },
          { user: 'demo', pass: 'demo123' }
        ];

        const isValid = validCredentials.some(
          cred => cred.user === username && cred.pass === password
        );

        if (isValid) {
          // Guardar sesión si "recordarme" está activo
          if (remember) {
            try {
              localStorage.setItem('wca-user', username);
              localStorage.setItem('wca-remember', 'true');
            } catch (e) {
              console.warn('No se pudo guardar la sesión');
            }
          }
          resolve({ success: true, user: username });
        } else {
          reject({ message: 'Usuario o contraseña incorrectos' });
        }
      }, 1500);
    });
  }

  /**
   * Mostrar estado de carga en el botón
   */
  function setLoadingState(loading) {
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    
    if (loading) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Iniciando sesión...';
      submitBtn.style.opacity = '0.7';
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Iniciar Sesión';
      submitBtn.style.opacity = '1';
    }
  }

  /**
   * Mostrar mensaje de error general
   */
  function showGeneralError(message) {
    // Buscar si ya existe un mensaje de error general
    let errorBox = loginForm.querySelector('.form-general-error');
    
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.className = 'form-general-error';
      errorBox.setAttribute('role', 'alert');
      loginForm.insertBefore(errorBox, loginForm.firstChild);
    }

    errorBox.textContent = message;
    errorBox.style.cssText = `
      padding: var(--space-3);
      background-color: rgba(220, 53, 69, 0.1);
      border: var(--border-width) solid var(--color-error);
      border-radius: var(--border-radius-md);
      color: var(--color-error);
      margin-bottom: var(--space-4);
    `;

    // Anunciar para lectores de pantalla
    if (window.WCAAccessibility) {
      window.WCAAccessibility.announce(message);
    }

    // Remover después de 5 segundos
    setTimeout(() => {
      errorBox.remove();
    }, 5000);
  }

  // ===== EVENT LISTENERS =====

  /**
   * Validación en tiempo real (al perder foco)
   */
  if (usernameInput) {
    usernameInput.addEventListener('blur', () => {
      if (usernameInput.value) {
        validateField(usernameInput);
      }
    });

    // Limpiar error al empezar a escribir
    usernameInput.addEventListener('input', () => {
      if (usernameInput.classList.contains('form-input--error')) {
        clearError(usernameInput);
      }
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('blur', () => {
      if (passwordInput.value) {
        validateField(passwordInput);
      }
    });

    passwordInput.addEventListener('input', () => {
      if (passwordInput.classList.contains('form-input--error')) {
        clearError(passwordInput);
      }
    });
  }

  /**
   * Envío del formulario
   */
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validar todo el formulario
      if (!validateForm()) {
        // Enfocar el primer campo con error
        const firstError = loginForm.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return;
      }

      // Obtener valores
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      const remember = rememberCheckbox.checked;

      // Mostrar estado de carga
      setLoadingState(true);

      try {
        // Simular login
        const result = await simulateLogin(username, password, remember);

        // Éxito - redirigir
        if (window.WCAAccessibility) {
          window.WCAAccessibility.announce('Inicio de sesión exitoso. Redirigiendo...');
        }

        // Guardar sesión activa (IMPORTANTE)
        try {
          localStorage.setItem('wca-session', 'active');
          localStorage.setItem('wca-user', username);
        } catch (e) {
          console.warn('No se pudo guardar la sesión');
        }

        setTimeout(() => {
          // Redirigir según el tipo de usuario
          if (username === 'admin') {
            window.location.href = 'admin.html';
          } else {
            window.location.href = 'perfil.html';
          }
        }, 1000);

      } catch (error) {
        // Error - mostrar mensaje
        setLoadingState(false);
        showGeneralError(error.message);
        passwordInput.value = ''; // Limpiar contraseña
        passwordInput.focus();
      }
    });
  }

  // ===== ESTILOS DINÁMICOS =====
  const style = document.createElement('style');
  style.textContent = `
    .form-input--error {
      border-color: var(--color-error) !important;
    }

    .form-input--error:focus {
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
    }

    .form-error {
      display: block;
      color: var(--color-error);
      font-size: var(--font-size-sm);
      margin-top: var(--space-1);
    }
  `;
  document.head.appendChild(style);

  // ===== INICIALIZACIÓN =====
  
  /**
   * Verificar si hay sesión guardada
   */
  function checkRememberedSession() {
    try {
      const rememberedUser = localStorage.getItem('wca-user');
      const shouldRemember = localStorage.getItem('wca-remember');

      if (rememberedUser && shouldRemember === 'true') {
        usernameInput.value = rememberedUser;
        rememberCheckbox.checked = true;
      }
    } catch (e) {
      console.warn('No se pudo verificar sesión guardada');
    }
  }

  checkRememberedSession();

  // ===== API PÚBLICA =====
  window.WCALogin = {
    validateForm,
    clearForm: () => {
      loginForm.reset();
      clearError(usernameInput);
      clearError(passwordInput);
    }
  };

})();

/* ==========================================
   NOTAS PARA TU COMPAÑERO:
   ==========================================
   
   CREDENCIALES DE PRUEBA:
   - admin / admin123 (redirige a admin.html)
   - usuario@test.com / test123 (redirige a perfil.html)
   - demo / demo123 (redirige a perfil.html)
   
   FUNCIONALIDADES:
   ✓ Validación en tiempo real
   ✓ Mensajes de error accesibles
   ✓ Estado de carga en botón
   ✓ "Recordarme" funcional
   ✓ Simula delay de red realista
   ✓ Anuncios para lectores de pantalla
   
   PARA CONECTAR CON BACKEND REAL:
   Reemplazar la función simulateLogin() con:
   
   async function login(username, password) {
     const response = await fetch('/api/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ username, password })
     });
     return response.json();
   }
   
========================================== */