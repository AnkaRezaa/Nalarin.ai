// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Konfigurasi Pengujian Otomatis Nalarin.ai
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  timeout: 30000,
  
  // Folder untuk menyimpan hasil screenshot & trace
  outputDir: './test-results',

  // Laporan HTML disimpan di playwright-report
  reporter: [
    ['html', { outputFolder: './playwright-report', open: 'never' }],
    ['list']
  ],

  use: {
    baseURL: process.env.APP_URL || 'http://127.0.0.1:8000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Di lokal gunakan Google Chrome laptop (0 MB download), di CI gunakan Chromium standar
        ...(process.env.CI ? {} : { channel: 'chrome' }),
      },
    },
  ],
});

