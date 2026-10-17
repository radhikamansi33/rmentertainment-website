/**
 * SITE SETTINGS: edit this file to connect the enquiry form and contact details.
 */
window.RM = window.RM || {};

RM.config = {
  // Enquiries are delivered by email through FormSubmit (one-time activation needed,
  // see README). If this is empty, the form tells visitors honestly that nothing was sent.
  formEndpoint: "https://formsubmit.co/ajax/radhikamansi33@gmail.com",

  // WhatsApp number (digits only, with country code) used for the optional follow-up message.
  whatsappNumber: "917412019188",

  // Shown on the Contact page only when filled in.
  contact: {
    whatsapp: "https://wa.me/917412019188",
    phone: "+917412019188",
    email: "radhikamansi33@gmail.com",
    instagram: ""
  },

  // Logo files tried in this order (see assets/images/logo/README.md).
  logoFiles: ["logo.png", "logo.jpg", "logo.jpeg", "logo.svg"],

  // Display names used for video captions.
  sectionLabels: {
    "home": "Home page",
    "about": "About page",
    "founders": "Founders page",
    "behind-the-scenes": "Behind the Scenes",
    "sangeet-entry": "Sangeet Entry",
    "varmala-entry": "Varmala Entry",
    "haldi-entry": "Haldi Entry",
    "choreography": "Choreography",
    "special-artists": "Special Artists",
    "virtual-sessions": "Virtual Sessions",
    "technical-rehearsals": "Technical Rehearsals",
    "rehearsals": "Rehearsals"
  }
};