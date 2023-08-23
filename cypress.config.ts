import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 25_000,

  e2e: {
    testIsolation: true,
    specPattern: ["cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", "cypress/integration/**/*.spec.ts"],
    supportFile: "cypress/support/commands/index.ts"
  },
  env: {}
});
