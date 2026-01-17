import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

/**
 * Configure BDD (Cucumber)
 */
const bddConfig = defineBddConfig({
  paths: ['tests/features/*.feature'],
  require: ['tests/steps/*.ts'],
  outputDir: 'tests/generated-bdd',
});

export default defineConfig({
  testDir: './tests', // <--- Point to the ROOT tests folder
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'], // Keep the standard report
    ['allure-playwright'], // Add the Enterprise report
  ],
  use: {
    trace: 'on-first-retry',
  },

  /* Split tests into two "Projects" so they show up separately in the report */
  projects: [
    /* Project 1: Standard E2E & API Tests */
    {
      name: 'E2E Tests',
      testDir: './tests', // Look in the main folder
      // Ignore the BDD files here so they don't run twice
      testIgnore: ['**/generated-bdd/**', '**/features/**'],
      use: { ...devices['Desktop Chrome'] },
    },

    /* Project 2: BDD Enterprise Tests */
    {
      name: 'BDD Tests',
      testDir: bddConfig, // Look ONLY at the BDD generated files
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
