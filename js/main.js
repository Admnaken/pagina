/* ============================================================
   ADMINISTRACIÓN NAKEN — main.js
   Funcionalidades: menú mobile, FAQ accordion, validación de
   formulario de contacto. Sin librerías externas.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- MENÚ MOBILE ---------- */
    var hamburger = document.getElementById('hamburger');
    var mainNav = document.getElementById('mainNav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function () {
            var isOpen = mainNav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Cerrar el menú al elegir un link (mobile)
        mainNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mainNav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- FAQ ACCORDION ---------- */
    var faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var expanded = btn.getAttribute('aria-expanded') === 'true';
            var answer = document.getElementById(btn.getAttribute('aria-controls'));

            // Cerrar los demás (acordeón simple)
            faqButtons.forEach(function (otherBtn) {
                if (otherBtn !== btn) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    var otherAnswer = document.getElementById(otherBtn.getAttribute('aria-controls'));
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                }
            });

            btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            if (answer) {
                answer.style.maxHeight = expanded ? null : answer.scrollHeight + 'px';
            }
        });
    });

    /* ---------- FORMULARIO DE CONTACTO ---------- */
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var valid = true;

            var required = form.querySelectorAll('[required]');
            required.forEach(function (field) {
                var wrapper = field.closest('.form-field');
                var value = field.value.trim();
                var fieldValid = value.length > 0;

                if (field.type === 'email' && fieldValid) {
                    fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                }

                if (!fieldValid) {
                    valid = false;
                    if (wrapper) wrapper.classList.add('invalid');
                } else if (wrapper) {
                    wrapper.classList.remove('invalid');
                }
            });

            if (!valid) return;

            // NOTA PARA QUIEN IMPLEMENTE:
            // Este formulario no tiene backend propio. Para que los envíos
            // lleguen por email o a una planilla, conectar aquí un servicio
            // externo (por ejemplo Formspree, Google Forms/Apps Script, o un
            // endpoint propio) y reemplazar este bloque por el fetch/POST
            // correspondiente. Mientras tanto solo se muestra la confirmación
            // visual y se limpia el formulario.
            var successMsg = document.getElementById('formSuccess');
            if (successMsg) successMsg.classList.add('show');
            form.reset();
        });
    }

});
