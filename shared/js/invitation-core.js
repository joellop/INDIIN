/**
 * @file invitation-core.js
 * @description Motor central para la lógica interactiva de las invitaciones Invitta.
 * Maneja la lectura de parámetros URL, control de audio, animaciones de scroll,
 * cuenta regresiva y procesamiento del formulario RSVP (con localStorage y Webhooks).
 *
 * Requiere que se defina globalmente el objeto `INVITATION_CONFIG` antes de su ejecución.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicialización de iconos
  if (window.lucide) lucide.createIcons();

  // 1. Configuración de datos del evento (Obtenidos de INVITATION_CONFIG o URL)
  const urlParams = new URLSearchParams(window.location.search);
  const planActivo = (
    urlParams.get("plan") || INVITATION_CONFIG.plan
  ).toLowerCase();

  const rawPases = parseInt(urlParams.get("pases"), 10);
  const pasesMaximos = !isNaN(rawPases) && rawPases > 0 ? rawPases : 2;

  const rawInvitado = urlParams.get("invitado") || "";
  const nombreInvitadoURL = decodeURIComponent(
    rawInvitado.replace(/\+/g, " "),
  ).trim();

  // Variables para referenciar elementos del DOM
  const planBadge = document.getElementById("planBadge");
  const mensajeEsencial = document.getElementById("mensaje-esencial");
  const mensajeVip = document.getElementById("mensaje-vip");
  const galeriaBadge = document.getElementById("galeria-badge");
  const galeriaVipExtra = document.getElementById("galeria-vip-extra");
  const featureItinerario = document.getElementById("feature-itinerario");
  const featurePadrinos = document.getElementById("feature-padrinos");
  const featureHoteles = document.getElementById("feature-hoteles");
  const featurePases = document.getElementById("feature-pases");
  const featureNoNinos = document.getElementById("feature-no-ninos");
  const personalizedTicketBadge = document.getElementById(
    "personalizedTicketBadge",
  );
  const bgMusic = document.getElementById("bgMusic");

  // Elementos del formulario RSVP
  const guestNameInput = document.getElementById("guestName");
  const guestNameError = document.getElementById("guestNameError");
  const assignedTicketsText = document.getElementById("assignedTicketsText");
  const guestTicketsSelect = document.getElementById("guestTickets");
  const sendBtn = document.getElementById("sendWhatsAppRSVP");
  const rsvpCardContainer = document.getElementById("rsvpCardContainer");

  // Control de audio
  const envelopeScreen = document.getElementById("envelopeScreen");
  const unsealBtn = document.getElementById("unsealBtn");
  const invitationContent = document.getElementById("invitationContent");
  const toggleMusicBtn = document.getElementById("toggleMusicBtn");
  const musicStatusText = document.getElementById("musicStatusText");

  // ==========================================
  // MÓDULO 1: RENDERIZADO CONDICIONAL (VIP vs Esencial / Módulos opcionales)
  // ==========================================

  // Ocultar sección de no niños si no está activa en la configuración
  if (!INVITATION_CONFIG.soloAdultos && featureNoNinos) {
    featureNoNinos.classList.add("hidden");
  }

  // Renderizar contenido basado en el plan
  if (planActivo === "esencial") {
    if (planBadge)
      planBadge.textContent = INVITATION_CONFIG.isDemo
        ? "Demo: Paquete Esencial"
        : "Nuestra Boda";
    if (mensajeEsencial) mensajeEsencial.classList.remove("hidden");
    if (mensajeVip) mensajeVip.classList.add("hidden");
    if (galeriaBadge) galeriaBadge.textContent = "3 Fotos";
    if (galeriaVipExtra) galeriaVipExtra.classList.add("hidden");
    if (featureItinerario) featureItinerario.classList.add("hidden");
    if (featurePadrinos) featurePadrinos.classList.add("hidden");
    if (featureHoteles) featureHoteles.classList.add("hidden");
    if (featurePases) featurePases.classList.add("hidden");
    if (personalizedTicketBadge)
      personalizedTicketBadge.classList.add("hidden");
  } else {
    // Modo VIP
    if (planBadge)
      planBadge.textContent = INVITATION_CONFIG.isDemo
        ? "Demo: Paquete Signature VIP"
        : "Invitación Especial";
    if (mensajeEsencial) mensajeEsencial.classList.add("hidden");
    if (mensajeVip) mensajeVip.classList.remove("hidden");
    if (galeriaBadge) galeriaBadge.textContent = "Álbum Completo";
    if (galeriaVipExtra) galeriaVipExtra.classList.remove("hidden");
    if (featureItinerario) featureItinerario.classList.remove("hidden");
    if (featurePadrinos) featurePadrinos.classList.remove("hidden");
    if (featureHoteles) featureHoteles.classList.remove("hidden");
    if (featurePases) featurePases.classList.remove("hidden");
    if (personalizedTicketBadge)
      personalizedTicketBadge.classList.remove("hidden");
  }

  // ==========================================
  // MÓDULO 2: PRELLENADO DE FORMULARIO Y PASES
  // ==========================================
  if (nombreInvitadoURL && guestNameInput) {
    guestNameInput.value = nombreInvitadoURL;
  }

  if (assignedTicketsText) {
    assignedTicketsText.textContent =
      pasesMaximos === 1 ? "1 lugar individual" : `${pasesMaximos} lugares`;
  }

  if (guestTicketsSelect) {
    guestTicketsSelect.innerHTML = ""; // Limpiar
    for (let i = 1; i <= pasesMaximos; i++) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent =
        i === 1 ? "1 Persona (Pase Individual)" : `${i} Personas`;
      if (i === pasesMaximos) opt.selected = true; // Seleccionar el máximo por defecto
      guestTicketsSelect.appendChild(opt);
    }
  }

  // ==========================================
  // MÓDULO 3: CONTROLADOR DE AUDIO Y SOBRE VIRTUAL
  // ==========================================
  if (unsealBtn) {
    unsealBtn.addEventListener("click", () => {
      envelopeScreen.classList.add("opacity-0", "pointer-events-none");

      if (bgMusic) {
        bgMusic.volume = 0.6;
        bgMusic
          .play()
          .catch((err) => console.log("Audio esperando interacción:", err));
      }

      setTimeout(() => {
        envelopeScreen.classList.add("hidden");
        if (invitationContent) invitationContent.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "instant" });
        initScrollReveal(); // Iniciar animaciones de scroll
      }, 500);
    });
  }

  if (toggleMusicBtn && bgMusic) {
    toggleMusicBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play();
        if (musicStatusText) musicStatusText.textContent = "Música";
        toggleMusicBtn.classList.remove("opacity-50");
      } else {
        bgMusic.pause();
        if (musicStatusText) musicStatusText.textContent = "Silencio";
        toggleMusicBtn.classList.add("opacity-50");
      }
    });
  }

  // ==========================================
  // MÓDULO 4: ANIMACIONES AL HACER SCROLL
  // ==========================================
  function initScrollReveal() {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObserver.observe(el));
  }

  // ==========================================
  // MÓDULO 5: CUENTA REGRESIVA
  // ==========================================
  const weddingDate = new Date(INVITATION_CONFIG.fechaEvento).getTime();
  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");

  function updateCountdown() {
    if (!daysEl) return; // Si no hay contador en la página, salir

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown(); // Ejecutar inmediatamente
  setInterval(updateCountdown, 1000); // Actualizar cada segundo

  // ==========================================
  // MÓDULO 6: RSVP Y LOCALSTORAGE
  // ==========================================

  // Si es una demo, opcionalmente limpiamos el storage al cargar para que siempre puedan probar el formulario
  if (INVITATION_CONFIG.isDemo && INVITATION_CONFIG.clearStorageOnLoad) {
    localStorage.removeItem(INVITATION_CONFIG.storageKey);
  }

  // Renderizar vista de confirmación si ya existe en localStorage
  function renderAsistenciaYaConfirmada() {
    if (!rsvpCardContainer) return;

    const waDestino = INVITATION_CONFIG.telefonoWhatsApp
      ? `https://wa.me/${INVITATION_CONFIG.telefonoWhatsApp}?text=${encodeURIComponent("Hola " + INVITATION_CONFIG.nombrePrincipal + ", deseo consultar o modificar los datos de mi confirmación.")}`
      : `https://wa.me/?text=${encodeURIComponent("Hola " + INVITATION_CONFIG.nombrePrincipal + ", deseo consultar o modificar los datos de mi confirmación.")}`;

    // Contenido extra para demos
    const demoRefreshBtn = INVITATION_CONFIG.isDemo
      ? `<button onclick="localStorage.removeItem('${INVITATION_CONFIG.storageKey}'); location.reload();" class="text-[11px] text-gold-dark hover:underline font-bold mt-1 cursor-pointer">↻ Probar formulario nuevamente (Modo Demo)</button>`
      : "";

    rsvpCardContainer.innerHTML = `
      <div class="text-center py-4 space-y-4">
        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
          <i data-lucide="check-check" class="w-8 h-8"></i>
        </div>
        
        <div>
          <span class="text-xs uppercase tracking-widest text-gold-dark font-mono font-bold block mb-1">Estado de Respuesta</span>
          <h4 class="serif text-2xl sm:text-3xl italic text-wedding-text font-bold">¡Asistencia ya Registrada!</h4>
        </div>
        
        <p class="text-sm sm:text-base text-wedding-muted leading-relaxed max-w-sm mx-auto">
          Tu confirmación para este evento ya ha sido guardada previamente en este dispositivo.
        </p>

        <div class="pt-2 border-t border-wedding-border/60 flex flex-col items-center gap-3">
          <p class="text-xs text-wedding-muted">¿Deseas modificar tus pases o cancelar?</p>
          <a 
            href="${waDestino}" 
            target="_blank"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-wedding-bg hover:bg-gold/15 text-wedding-text border border-wedding-border hover:border-gold rounded-full text-xs font-bold transition-all"
          >
            <i data-lucide="message-circle" class="w-4 h-4 text-emerald-600"></i> Contactar a los Novios
          </a>
          ${demoRefreshBtn}
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  }

  // Comprobación inicial de localStorage
  if (localStorage.getItem(INVITATION_CONFIG.storageKey) === "true") {
    renderAsistenciaYaConfirmada();
  }

  // Validación visual del nombre
  if (guestNameInput) {
    guestNameInput.addEventListener("input", () => {
      if (guestNameInput.value.trim().length > 0) {
        guestNameInput.classList.remove("border-rose-500", "bg-rose-50/30");
        guestNameInput.classList.add("border-wedding-border");
        if (guestNameError) guestNameError.classList.add("hidden");
      }
    });
  }

  // Acción de Confirmar
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const name = guestNameInput ? guestNameInput.value.trim() : "";

      // Validación estricta
      if (name.length < 3) {
        if (guestNameInput) {
          guestNameInput.classList.remove("border-wedding-border");
          guestNameInput.classList.add("border-rose-500", "bg-rose-50/30");
          guestNameInput.focus();
        }
        if (guestNameError) {
          guestNameError.classList.remove("hidden");
          if (window.lucide) lucide.createIcons();
        }
        return;
      }

      const isAttending =
        document.getElementById("guestAttendance").value === "si";

      // Obtener el número de pases si el feature está activo y el usuario asiste
      const ticketsCount =
        featurePases &&
        !featurePases.classList.contains("hidden") &&
        isAttending
          ? document.getElementById("guestTickets").value
          : isAttending
            ? "1"
            : "0";

      // 1. Envío silencioso a Google Sheets (Si hay Webhook configurado)
      if (INVITATION_CONFIG.sheetScriptUrl) {
        const payload = {
          nombre: name,
          asistencia: isAttending ? "si" : "no",
          pases: ticketsCount,
        };

        fetch(INVITATION_CONFIG.sheetScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((err) => console.log("Registro Sheets en cola:", err));
      }

      // 2. Marcar localmente para no repetir
      localStorage.setItem(INVITATION_CONFIG.storageKey, "true");

      // 3. Preparar texto y abrir WhatsApp
      const attendanceText = isAttending
        ? "¡Confirmo que sí asistiré con gusto! 🎉"
        : "Lamentablemente no podré asistir, les envío mis mejores deseos.";

      const ticketsText =
        featurePases &&
        !featurePases.classList.contains("hidden") &&
        isAttending
          ? ` (${ticketsCount} personas confirmadas)`
          : "";

      const message = `¡Hola ${INVITATION_CONFIG.nombrePrincipal}! Soy ${name}. ${attendanceText}${ticketsText}.`;

      const waUrl = INVITATION_CONFIG.telefonoWhatsApp
        ? `https://wa.me/${INVITATION_CONFIG.telefonoWhatsApp}?text=${encodeURIComponent(message)}`
        : `https://wa.me/?text=${encodeURIComponent(message)}`;

      window.open(waUrl, "_blank");

      // 4. Cambiar UI
      renderAsistenciaYaConfirmada();
    });
  }
});
