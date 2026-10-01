/**
 * @file landing.js
 * @description Lógica interactiva de la Landing Page: Animaciones al hacer scroll y renderizado dinámico de paquetes.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializar iconos de Lucide
  if (window.lucide) lucide.createIcons();

  // 2. Animación de scroll (Intersection Observer)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  document.querySelectorAll(".pull-up").forEach((el) => observer.observe(el));

  // 3. Diccionario dinámico con redacción y rutas apuntando a la carpeta /demos/
  const packageSpecs = {
    boda: {
      demoFile: "demos/demo-boda.html", // Ruta actualizada
      label: "Boda o Aniversario",
      esencial: [
        { text: "Sobre virtual animado con monograma de novios", active: true },
        {
          text: "Mensaje de Novios: Frase o dedicatoria inicial emotiva",
          active: true,
          strong: true,
        },
        {
          text: "Nuestros Padres: Mención y bendición de los padres de los novios",
          active: true,
          strong: true,
        },
        {
          text: "Temporizador dinámico: Cuenta regresiva real en vivo",
          active: true,
          strong: true,
        },
        {
          text: "Galería de fotos: Hasta 3 fotografías de la pareja",
          active: true,
        },
        {
          text: "Vigencia web: Invitación online activa durante 3 meses",
          active: true,
        },
        {
          text: "Canción romántica de fondo con reproductor interactivo",
          active: true,
        },
        {
          text: "Ubicación GPS interactiva (Google Maps, Waze y Uber)",
          active: true,
        },
        {
          text: "Mesa de regalos (Liverpool, Amazon y cuenta CLABE)",
          active: true,
        },
        {
          text: "Sin Corte de Honor (Padrinos de velación, anillos, arras y lazo)",
          active: false,
        },
        {
          text: "Sin itinerario por fases ni hospedaje recomendado para foráneos",
          active: false,
        },
      ],
      signature: [
        {
          text: "Todo lo incluido en el Paquete Esencial",
          active: true,
          strong: true,
        },
        {
          text: "Mensaje de Novios: Carta de bienvenida extendida con firma digital",
          active: true,
          strong: true,
        },
        {
          text: "Nuestros Padres: Sección destacada con bendición y agradecimiento",
          active: true,
          strong: true,
        },
        {
          text: "Galería de fotos: Hasta 10 fotografías en alta resolución",
          active: true,
          strong: true,
        },
        {
          text: "Vigencia web: Invitación activa durante 12 meses (1 año completo)",
          active: true,
          strong: true,
        },
        {
          text: "Corte de Honor completa (Padrinos de velación, anillos, arras y lazo)",
          active: true,
        },
        {
          text: "Itinerario cronológico por bloques (misa, cóctel, banquete y baile)",
          active: true,
        },
        {
          text: "Hoteles recomendados con tarifas especiales para invitados",
          active: true,
        },
        {
          text: "Formulario con conteo de pases (1, 2 o más) directo a WhatsApp",
          active: true,
        },
        {
          text: "Entrega prioritaria y cambios de datos ilimitados",
          active: true,
        },
      ],
    },
    xv: {
      demoFile: "demos/demo-xv.html", // Ruta actualizada
      label: "XV Años o Cumpleaños",
      esencial: [
        { text: "Sobre virtual con corona táctil animada", active: true },
        {
          text: "Mensaje de la Quinceañera: Frase emotiva de bienvenida",
          active: true,
          strong: true,
        },
        {
          text: "Mis Padres: Sección especial de agradecimiento y bendición de los papás",
          active: true,
          strong: true,
        },
        {
          text: "Temporizador dinámico: Cuenta regresiva real en vivo hacia la fiesta",
          active: true,
          strong: true,
        },
        {
          text: "Galería de fotos: Hasta 3 fotografías de la sesión previa",
          active: true,
        },
        {
          text: "Vigencia web: Invitación online activa durante 3 meses",
          active: true,
        },
        {
          text: "Canción pop/fiesta preferida con ecualizador animado",
          active: true,
        },
        {
          text: "Ubicación GPS, mapa interactivo y sugerencia de dress code",
          active: true,
        },
        {
          text: "Mesa de regalos (Wishlist de Amazon o lluvia de sobres)",
          active: true,
        },
        { text: "Sin sección de padrinos emblemáticos", active: false },
        {
          text: "Sin itinerario detallado de la fiesta ni selección de pases",
          active: false,
        },
      ],
      signature: [
        {
          text: "Todo lo incluido en el Paquete Esencial",
          active: true,
          strong: true,
        },
        {
          text: "Mensaje de la Quinceañera: Carta con dedicatoria a amigos y familia",
          active: true,
          strong: true,
        },
        {
          text: "Mis Padrinos: Sección con padrinos de vestido, brindis, cojín y regalo sorpresa",
          active: true,
          strong: true,
        },
        {
          text: "Galería de fotos: Hasta 10 fotografías de estudio/sesión previa",
          active: true,
          strong: true,
        },
        {
          text: "Vigencia web: Invitación activa durante 12 meses (1 año completo)",
          active: true,
          strong: true,
        },
        {
          text: "Itinerario detallado de la fiesta (recepción, vals, brindis y DJ set)",
          active: true,
        },
        {
          text: "Formulario de confirmación con selección de pases a WhatsApp",
          active: true,
        },
        {
          text: "Efectos de destello neón y tipografía personalizada",
          active: true,
        },
        {
          text: "Entrega exprés en 24 horas y soporte prioritario",
          active: true,
        },
      ],
    },
    fiesta: {
      demoFile: "demos/demo-fiesta.html", // Ruta actualizada
      label: "Graduación o Fiesta",
      esencial: [
        {
          text: "Sobre virtual interactivo con apertura animada",
          active: true,
        },
        {
          text: "Mensaje de Graduados: Dedicatoria o frase conmemorativa de generación",
          active: true,
          strong: true,
        },
        {
          text: "Temporizador dinámico: Cuenta regresiva oficial en tiempo real",
          active: true,
          strong: true,
        },
        {
          text: "Galería de fotos: Hasta 3 fotografías de la generación o festejo",
          active: true,
        },
        {
          text: "Vigencia web: Invitación online activa durante 3 meses",
          active: true,
        },
        {
          text: "Música ambiental festiva con reproductor interactivo",
          active: true,
        },
        {
          text: "Ubicación GPS, indicaciones de Valet Parking y dress code",
          active: true,
        },
        { text: "Aviso simple de asistencia directo a WhatsApp", active: true },
        {
          text: "Sin itinerario detallado por fases de la noche",
          active: false,
        },
        {
          text: "Sin selector con desglose estructurado de pases",
          active: false,
        },
      ],
      signature: [
        {
          text: "Todo lo incluido en el Paquete Esencial",
          active: true,
          strong: true,
        },
        {
          text: "Mensaje de Graduados: Discurso y reseña generacional completa",
          active: true,
          strong: true,
        },
        {
          text: "Galería de fotos: Hasta 10 fotografías de recuerdo de la generación",
          active: true,
          strong: true,
        },
        {
          text: "Vigencia web: Invitación activa durante 12 meses (1 año completo)",
          active: true,
          strong: true,
        },
        {
          text: "Cronograma completo de la noche (recepción, cena, brindis y after)",
          active: true,
        },
        {
          text: "Formulario de registro con conteo de acompañantes directo a WhatsApp",
          active: true,
        },
        {
          text: "Entrega prioritaria y soporte personalizado para ajustes",
          active: true,
        },
      ],
    },
  };

  // Configuración centralizada de WhatsApp
  const WHATSAPP_CONFIG = {
    telefono: "529613658086",
    mensajeGeneral:
      "Hola INDIIN, deseo más información sobre las invitaciones digitales.",
  };

  const footerBtn = document.getElementById("btnWhatsappFooter");
  if (footerBtn) {
    footerBtn.href = `https://wa.me/${WHATSAPP_CONFIG.telefono}?text=${encodeURIComponent(WHATSAPP_CONFIG.mensajeGeneral)}`;
  }

  // 4. Función de actualización reactiva
  function updateCardContent(card) {
    const tier = card.getAttribute("data-tier");
    const select = card.querySelector(".package-select");
    const eventType = select.value;
    const spec = packageSpecs[eventType];
    const items = spec[tier];

    // A. Renderizar viñetas
    const listEl = card.querySelector(".features-list");
    listEl.innerHTML = items
      .map((item) => {
        if (item.active) {
          return `
          <li class="flex items-center gap-2 text-champagne ${item.strong ? "font-medium" : ""}">
            <i data-lucide="check" class="w-4 h-4 text-gold shrink-0"></i>
            <span>${item.text}</span>
          </li>
        `;
        } else {
          return `
          <li class="flex items-center gap-2 text-gray-600 line-through">
            <i data-lucide="x" class="w-4 h-4 text-gray-700 shrink-0"></i>
            <span>${item.text}</span>
          </li>
        `;
        }
      })
      .join("");

    // B. Parámetros de URL
    const demoPlanParam = tier === "esencial" ? "esencial" : "vip";
    const demoLink = card.querySelector(".package-demo-link");
    demoLink.href = `${spec.demoFile}?plan=${demoPlanParam}`;

    // C. Mensaje de WhatsApp
    const orderBtn = card.querySelector(".package-order-btn");
    const tierNames = {
      esencial: "Esencial ($650 MXN)",
      signature: "Signature VIP ($1,190 MXN)",
    };
    const msg = `Hola INDIIN, me interesa contratar el Paquete ${tierNames[tier]} para mi evento de ${spec.label}.`;
    orderBtn.href = `https://wa.me/${WHATSAPP_CONFIG.telefono}?text=${encodeURIComponent(msg)}`;

    // D. Reinicializar iconos
    lucide.createIcons();
  }

  // 5. Inicializar y registrar eventos
  document.querySelectorAll(".package-card").forEach((card) => {
    updateCardContent(card);
    card.querySelector(".package-select").addEventListener("change", () => {
      updateCardContent(card);
    });
  });
});
