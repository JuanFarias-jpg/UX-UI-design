/* ==========================================
   REGISTRO-VALIDATION.JS - Validación de Registro
   ==========================================
   Funcionalidades:
   - Validación de todos los campos
   - Verificar edad mínima (12 años)
   - Coincidir contraseñas
   - Registrar usuario
========================================== */

(function() {
  'use strict';

  // ===== ELEMENTOS DEL DOM =====
  const registroForm = document.querySelector('#registro-form');
  const fullnameInput = document.querySelector('#fullname');
  const usernameInput = document.querySelector('#username');
  const emailInput = document.querySelector('#email');
  const birthdateInput = document.querySelector('#birthdate');
  const countryInput = document.querySelector('#country');
  const passwordInput = document.querySelector('#password');
  const passwordConfirmInput = document.querySelector('#password-confirm');
  const termsCheckbox = document.querySelector('#terms');

  // ===== EXPRESIONES REGULARES =====
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/; // 3-20 caracteres, solo alfanuméricos, - y _

  // ===== FUNCIONES DE VALIDACIÓN =====

  /**
   * Validar nombre completo
   */
  function validateFullname(value) {
    if (!value || value.trim().length === 0) {
      return { valid: false, message: 'El nombre es requerido' };
    }
    if (value.trim().length < 3) {
      return { valid: false, message: 'El nombre debe tener al menos 3 caracteres' };
    }
    if (!/^[a-zA-Z\s áéíóúñ]*$/.test(value)) {
      return { valid: false, message: 'El nombre solo puede contener letras y espacios' };
    }
    return { valid: true };
  }

  /**
   * Validar nombre de usuario
   */
  function validateUsername(value) {
    if (!value || value.trim().length === 0) {
      return { valid: false, message: 'El nombre de usuario es requerido' };
    }
    if (!USERNAME_REGEX.test(value)) {
      return { 
        valid: false, 
        message: 'Usuario inválido. Usa 3-20 caracteres (letras, números, - y _)' 
      };
    }
    return { valid: true };
  }

  /**
   * Validar email
   */
  function validateEmail(value) {
    if (!value || value.trim().length === 0) {
      return { valid: false, message: 'El correo es requerido' };
    }
    if (!EMAIL_REGEX.test(value)) {
      return { valid: false, message: 'El formato del correo no es válido' };
    }
    return { valid: true };
  }

  /**
   * Validar fecha de nacimiento
   */
  function validateBirthdate(value) {
    if (!value) {
      return { valid: false, message: 'La fecha de nacimiento es requerida' };
    }

    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 12) {
      return { 
        valid: false, 
        message: 'Debes tener al menos 12 años para registrarte' 
      };
    }

    return { valid: true };
  }

  /**
   * Validar país
   */
  function validateCountry(value) {
    if (!value || value.trim().length === 0) {
      return { valid: false, message: 'El país es requerido' };
    }
    return { valid: true };
  }

  /**
   * Validar contraseña
   */
  function validatePassword(value) {
    if (!value || value.trim().length === 0) {
      return { valid: false, message: 'La contraseña es requerida' };
    }
    if (value.length < 8) {
      return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
    }
    return { valid: true };
  }

  /**
   * Validar confirmación de contraseña
   */
  function validatePasswordConfirm(password, passwordConfirm) {
    if (!passwordConfirm || passwordConfirm.trim().length === 0) {
      return { valid: false, message: 'Confirma tu contraseña' };
    }
    if (password !== passwordConfirm) {
      return { valid: false, message: 'Las contraseñas no coinciden' };
    }
    return { valid: true };
  }

  /**
   * Validar términos
   */
  function validateTerms(checked) {
    if (!checked) {
      return { valid: false, message: 'Debes aceptar los términos y condiciones' };
    }
    return { valid: true };
  }

  /**
   * Mostrar error en un campo
   */
  function showError(input, message) {
    const errorSpan = document.querySelector(`#${input.id}-error`);
    
    input.setAttribute('aria-invalid', 'true');
    input.classList.add('form-input--error');
    
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
    
    input.setAttribute('aria-invalid', 'false');
    input.classList.remove('form-input--error');
    
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

    if (input === fullnameInput) {
      validation = validateFullname(input.value);
    } else if (input === usernameInput) {
      validation = validateUsername(input.value);
    } else if (input === emailInput) {
      validation = validateEmail(input.value);
    } else if (input === birthdateInput) {
      validation = validateBirthdate(input.value);
    } else if (input === countryInput) {
      validation = validateCountry(input.value);
    } else if (input === passwordInput) {
      validation = validatePassword(input.value);
    }

    if (validation && validation.valid) {
      clearError(input);
      return true;
    } else if (validation) {
      showError(input, validation.message);
      return false;
    }
    return true;
  }

  /**
   * Validar todo el formulario
   */
  function validateForm() {
    const fullnameValid = validateField(fullnameInput);
    const usernameValid = validateField(usernameInput);
    const emailValid = validateField(emailInput);
    const birthdateValid = validateField(birthdateInput);
    const countryValid = validateField(countryInput);
    const passwordValid = validateField(passwordInput);

    const passwordConfirmValidation = validatePasswordConfirm(
      passwordInput.value, 
      passwordConfirmInput.value
    );
    if (!passwordConfirmValidation.valid) {
      showError(passwordConfirmInput, passwordConfirmValidation.message);
    } else {
      clearError(passwordConfirmInput);
    }

    const termsValidation = validateTerms(termsCheckbox.checked);
    const termsError = document.querySelector('#terms-error');
    if (!termsValidation.valid) {
      termsError.textContent = termsValidation.message;
      termsError.removeAttribute('hidden');
    } else {
      termsError.textContent = '';
      termsError.setAttribute('hidden', '');
    }

    return (
      fullnameValid &&
      usernameValid &&
      emailValid &&
      birthdateValid &&
      countryValid &&
      passwordValid &&
      passwordConfirmValidation.valid &&
      termsValidation.valid
    );
  }

  /**
   * Registrar usuario
   */
  function registerUser() {
    const userData = {
      fullname: fullnameInput.value.trim(),
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      birthdate: birthdateInput.value,
      country: countryInput.value,
      password: passwordInput.value, // En producción sería hasheada en el servidor
      newsletter: document.querySelector('#newsletter').checked,
      registeredAt: new Date().toISOString()
    };

    // Guardar en localStorage (para este prototipo)
    try {
      localStorage.setItem('wca-user', userData.username);
      localStorage.setItem('wca-session', 'active');
      localStorage.setItem(`wca-profile-${userData.username}`, JSON.stringify(userData));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage');
    }

    return userData;
  }

  /**
   * Mostrar estado de carga
   */
  function setLoadingState(loading) {
    const submitBtn = registroForm.querySelector('button[type="submit"]');
    
    if (loading) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creando cuenta...';
      submitBtn.style.opacity = '0.7';
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Crear cuenta';
      submitBtn.style.opacity = '1';
    }
  }

  /**
   * Mostrar notificación
   */
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.setAttribute('role', 'alert');
    
    const colors = {
      success: 'var(--color-success)',
      error: 'var(--color-error)'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: calc(var(--header-height) + var(--space-4));
      right: var(--space-4);
      background: ${colors[type]};
      color: white;
      padding: var(--space-4) var(--space-6);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-lg);
      z-index: var(--z-modal);
      animation: slideInRight 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // ===== EVENT LISTENERS =====

  /**
   * Validación en tiempo real (al perder foco)
   */
  [fullnameInput, usernameInput, emailInput, birthdateInput, countryInput, passwordInput].forEach(input => {
    if (input) {
      input.addEventListener('blur', () => {
        if (input.value) {
          validateField(input);
        }
      });

      input.addEventListener('input', () => {
        if (input.classList.contains('form-input--error')) {
          clearError(input);
        }
      });
    }
  });

  /**
   * Validación de confirmación de contraseña
   */
  if (passwordConfirmInput) {
    passwordConfirmInput.addEventListener('blur', () => {
      if (passwordConfirmInput.value) {
        const validation = validatePasswordConfirm(
          passwordInput.value,
          passwordConfirmInput.value
        );
        if (validation.valid) {
          clearError(passwordConfirmInput);
        } else {
          showError(passwordConfirmInput, validation.message);
        }
      }
    });

    passwordConfirmInput.addEventListener('input', () => {
      if (passwordConfirmInput.classList.contains('form-input--error')) {
        clearError(passwordConfirmInput);
      }
    });
  }

  /**
   * Envío del formulario
   */
  if (registroForm) {
    registroForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validar formulario
      if (!validateForm()) {
        const firstError = registroForm.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return;
      }

      setLoadingState(true);

      try {
        // Simular delay de registro
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Registrar usuario
        const userData = registerUser();

        if (window.WCAAccessibility) {
          window.WCAAccessibility.announce('Cuenta creada exitosamente. Redirigiendo...');
        }

        showNotification('✓ Cuenta creada exitosamente');

        // Redirigir al perfil
        setTimeout(() => {
          window.location.href = 'perfil.html';
        }, 1000);

      } catch (error) {
        setLoadingState(false);
        showNotification('Error al crear la cuenta', 'error');
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

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

})();

/* ==========================================
   NOTAS:
   ==========================================
   
   VALIDACIONES IMPLEMENTADAS:
   ✓ Nombre completo (3+ caracteres, solo letras)
   ✓ Usuario (3-20 caracteres, alfanuméricos, - y _)
   ✓ Email (formato válido)
   ✓ Fecha nacimiento (mínimo 12 años)
   ✓ País (requerido)
   ✓ Contraseña (8+ caracteres)
   ✓ Confirmación de contraseña (coinciden)
   ✓ Términos aceptados
   
   FLUJO:
   1. Usuario completa formulario
   2. Se valida en tiempo real (blur)
   3. Al enviar se valida todo
   4. Se registra en localStorage
   5. Se redirige a perfil.html
   
========================================== */