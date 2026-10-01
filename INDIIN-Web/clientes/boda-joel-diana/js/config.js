/**
 * @file config.js
 * @description Configuración exclusiva para la Boda de Joel & Diana.
 * Carga las variables necesarias antes de ejecutar invitation-core.js
 */

const INVITATION_CONFIG = {
  // --- TIPO DE PROYECTO ---
  isDemo: false,

  // --- PAQUETE Y FUNCIONES ---
  plan: "vip", // 'esencial' | 'vip'
  soloAdultos: true, // true = muestra sección No Niños

  // --- DATOS DEL EVENTO ---
  nombrePrincipal: "Joel & Diana",
  fechaEvento: "2026-10-31T17:00:00",

  // --- RSVP Y CONTACTO ---
  telefonoWhatsApp: "529613658086",
  // URL de tu Google Apps Script Webhook
  sheetScriptUrl:
    "https://script.google.com/macros/s/AKfycbycg9lZTVAWWVeqil5Tu_SA8N83vHoqURp5JdrFMc_BC3qYdYRIiSFMBoqzVqtRn0Pd/exec",

  // --- ALMACENAMIENTO LOCAL ---
  storageKey: "rsvp_boda_joel_diana_2026_oct",
};
