import { defineConfig, devices } from '@playwright/test';
import { makeTestAudio } from './tools/make-wav.ts';

// Testsignale schon beim Laden der Konfiguration erzeugen: Chromium braucht die Datei beim Start.
const audio = makeTestAudio('test-results/audio');
const fakeMic = (file: string) => ({
  launchOptions: {
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-audio-capture=${file}`, '--autoplay-policy=no-user-gesture-required'],
  },
  permissions: ['microphone'],
});

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173/',
    trace: 'retain-on-failure',
    // die bestehenden Tests prüfen deutsche Texte; ohne Angabe wäre die Browser-Sprache Englisch
    locale: 'de-DE',
  },
  webServer: {
    command: 'node tools/serve.mjs dist 4173',
    url: 'http://localhost:4173/',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /mic\./ },
    { name: 'ipad', use: { ...devices['iPad (gen 7) landscape'] }, testIgnore: /mic\./ },
    { name: 'phone', use: { ...devices['Pixel 7'] }, testIgnore: /mic\./ },
    { name: 'phone-quer', use: { ...devices['Pixel 7 landscape'] }, testIgnore: /mic\./ },
    { name: 'mic-chord-c', use: { ...devices['Desktop Chrome'], ...fakeMic(audio.chordC) }, testMatch: /mic\.chord/ },
    { name: 'mic-string-e', use: { ...devices['Desktop Chrome'], ...fakeMic(audio.stringE) }, testMatch: /mic\.tuner/ },
  ],
});
