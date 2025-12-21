import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [],
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "DeepNeurax Admin",
        "app.components.LeftMenu.navbrand.workplace": "Innovation Hub",
        "Auth.form.welcome.title": "Welcome to DeepNeurax",
        "Auth.form.welcome.subtitle": "Manage your AI platform content",
      },
    },
    head: {
      favicon: "/favicon.png",
    },
    // Disable video tutorials for a cleaner UI
    tutorials: false,
    // Notifications that appear on the top right
    notifications: { release: false },
  },
  bootstrap(app: StrapiApp) {
    console.log('DeepNeurax Admin Initialized');
  },
};
