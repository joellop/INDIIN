/**
 * @file config-demo-boda.js
 * @description Configuración para la demo de bodas.
 */
const INVITATION_CONFIG = {
  isDemo: true,
  clearStorageOnLoad: true, // Limpia el storage para facilitar pruebas

  plan: "vip",
  soloAdultos: true,

  nombrePrincipal: "Joel & Diana",// <- Genérico
  fechaEvento: "2026-10-31T17:00:00", 

  telefonoWhatsApp: "", // Sin número fijo para demo
  sheetScriptUrl: "",

  storageKey: "invitta_rsvp_demo_boda",
};
