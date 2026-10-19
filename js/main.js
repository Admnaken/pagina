/* ============================================================
   ADMINISTRACIÓN NAKEN — main.js
   Menú mobile, preguntas frecuentes y formulario de contacto
   (envía al servidor de la administración). Sin librerías.
   ============================================================ */

var NAKEN_API = 'https://script.google.com/macros/s/AKfycbzhU8dbssSczc_UBYqb6l_-n5dHIqIOqsqL6vFXypnX_hlX9oj0SmJHGOKh46e0uVlkHA/exec';
var NAKEN_WA = '5491164410369';

document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Año del pie ---------- */
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    /* ---------- Menú mobile ---------- */
    var hamburger = document.getElementById('hamburger');
    var mainNav = document.getElementById('mainNav');
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function () {
            var open = mainNav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
            hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        });
        mainNav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                mainNav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
    }

    /* ---------- Preguntas frecuentes ---------- */
    var botones = document.querySelectorAll('.faq-question');
    function abrir(btn, si) {
        var resp = document.getElementById(btn.getAttribute('aria-controls'));
        btn.setAttribute('aria-expanded', si ? 'true' : 'false');
        if (resp) resp.style.maxHeight = si ? resp.scrollHeight + 'px' : null;
    }
    botones.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var estaAbierta = btn.getAttribute('aria-expanded') === 'true';
            botones.forEach(function (o) { if (o !== btn) abrir(o, false); });
            abrir(btn, !estaAbierta);
        });
    });
    // Enlace directo a una pregunta (#faq-a3): se abre sola.
    if (location.hash) {
        var dest = document.querySelector('[aria-controls="' + location.hash.slice(1) + '"]');
        if (dest) abrir(dest, true);
    }

    /* ---------- Formulario de contacto ---------- */
    var form = document.getElementById('contactForm');
    if (!form) return;

    // ?motivo=diagnostico preselecciona el motivo (botones "Pónganla a prueba").
    var motivos = { propuesta: 'Propuesta de administración', diagnostico: 'Diagnóstico de la última liquidación', demostracion: 'Ver las herramientas funcionando', recorrida: 'Recorrida del edificio' };
    var m = new URLSearchParams(location.search).get('motivo');
    if (m && motivos[m] && form.motivo) form.motivo.value = motivos[m];

    var estado = document.getElementById('formStatus');
    function mostrar(tipo, html) { estado.className = 'form-status ' + tipo; estado.innerHTML = html; estado.focus(); }
    function textoWhatsApp(d) {
        return 'Hola, soy ' + d.nombre + '. ' + d.motivo + ' para ' + d.consorcio + (d.unidades ? ' (' + d.unidades + ' unidades)' : '') + '. ' + d.mensaje;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valido = true;
        form.querySelectorAll('[required]').forEach(function (campo) {
            var envoltura = campo.closest('.form-field');
            var v = campo.value.trim();
            var ok = v.length > 0;
            if (ok && campo.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            if (envoltura) envoltura.classList.toggle('invalid', !ok);
            if (!ok) valido = false;
        });
        if (!valido) {
            var primero = form.querySelector('.invalid input, .invalid textarea, .invalid select');
            if (primero) primero.focus();
            return;
        }

        var d = {
            action: 'contactoWeb',
            nombre: form.nombre.value.trim(), email: form.email.value.trim(), telefono: form.telefono.value.trim(),
            consorcio: form.consorcio.value.trim(), unidades: form.unidades.value.trim(),
            motivo: form.motivo.value, mensaje: form.mensaje.value.trim(), sitio: form.sitio.value
        };
        var boton = form.querySelector('button[type="submit"]');
        var textoBoton = boton.textContent;
        boton.disabled = true; boton.textContent = 'Enviando…';

        var ctrl = 'AbortController' in window ? new AbortController() : null;
        var corte = setTimeout(function () { if (ctrl) ctrl.abort(); }, 25000);
        fetch(NAKEN_API, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(d),
            signal: ctrl ? ctrl.signal : undefined
        }).then(function (r) { return r.json(); }).then(function (res) {
            if (!res || !res.ok) throw new Error((res && res.error) || 'No se pudo enviar.');
            form.reset();
            mostrar('ok', '<strong>Recibimos tu consulta.</strong> Te respondemos a la brevedad, por email o por teléfono.');
        }).catch(function (err) {
            var wa = 'https://wa.me/' + NAKEN_WA + '?text=' + encodeURIComponent(textoWhatsApp(d));
            mostrar('err', '<strong>No se pudo enviar el formulario' + (err && err.message && err.name !== 'AbortError' && err.name !== 'TypeError' ? ': ' + err.message : '') + '.</strong> Tus datos siguen cargados. ' +
                'Podés <a href="' + wa + '" target="_blank" rel="noopener">mandarlos por WhatsApp</a> o escribir a <a href="mailto:gerencia@administracionnaken.com.ar">gerencia@administracionnaken.com.ar</a>.');
        }).then(function () {
            clearTimeout(corte);
            boton.disabled = false; boton.textContent = textoBoton;
        });
    });
});
