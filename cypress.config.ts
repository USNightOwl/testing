import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: 'kjhvhq',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
