import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId: 'kjhvhq',
    baseUrl: "http://localhost:3000/testing-cypress"
  },
});
