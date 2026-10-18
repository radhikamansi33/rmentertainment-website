/**
 * SITE SETTINGS: edit this file to connect the enquiry form and contact details.
 */
window.RM = window.RM || {};

RM.config = {
  // The contact form has two buttons: "Send via WhatsApp" asks which founder to message,
  // then opens WhatsApp with the enquiry written out; "Send via Email" uses formEndpoint below.

  // Enquiries are delivered by email through FormSubmit (one-time activation needed,
  // see README). If this is empty, the form tells visitors honestly that nothing was sent.
  formEndpoint: "https://formsubmit.co/ajax/radhikamansi33@gmail.com",

  // The founders visitors can WhatsApp or call. Visitors choose whom to contact.
  // whatsapp: digits only, with country code. phone: for call links. display: as shown on the page.
  team: [
    { name: "Radhika Pancholi", whatsapp: "917412019188", phone: "+917412019188", display: "+91 74120 19188" },
    { name: "Mansi Rawat", whatsapp: "918824304341", phone: "+918824304341", display: "+91 88243 04341" }
  ],

  // Shown on the Contact page only when filled in (WhatsApp and phone come from team above).
  contact: {
    email: "radhikamansi33@gmail.com",
    instagram: "https://www.instagram.com/radhika__mansi/"
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
    "haldi-entry": "Haldi & Mehndi Entry",
    "choreography": "Choreography",
    "special-artists": "Special Artists",
    "virtual-sessions": "Virtual Sessions",
    "technical-rehearsals": "Technical Rehearsals",
    "rehearsals": "Rehearsals",
    "client-feedback": "Client Feedback"
  }
};