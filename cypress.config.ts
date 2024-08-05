import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
      home_url:"/",
      exercises_url:"/danh-sach-bai-tap",
      do_exercise_url:"/lam-bai",
    },
    projectId: 'kjhvhq',
    baseUrl: "http://localhost:3000/testing-cypress"
  },
});
