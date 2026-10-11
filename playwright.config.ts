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

// eigener Port je Arbeitskopie (E2E_PORT), sonst nutzt ein paralleler Lauf den Server einer anderen Kopie mit
const port = process.env.E2E_PORT || '4173';

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${port}/ukulele/`,
    trace: 'retain-on-failure',
    // die bestehenden Tests prüfen deutsche Texte; ohne Angabe wäre die Browser-Sprache Englisch
    locale: 'de-DE',
  },
  webServer: {
    command: `node tools/serve.mjs dist ${port}`,
    url: `http://localhost:${port}/ukulele/`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /mic\./ },
    { name: 'ipad', use: { ...devices['iPad (gen 7) landscape'] }, testIgnore: /mic\./ },
    { name: 'phone', use: { ...devices['Pixel 7'] }, testIgnore: /mic\./ },
    { name: 'phone-quer', use: { ...devices['Pixel 7 landscape'] }, testIgnore: /mic\./ },
    { name: 'mic-chord-c', use: { ...devices['Desktop Chrome'], ...fakeMic(audio.chordC) }, testMatch: /mic\.chord/ },
    { name: 'mic-string-e', use: { ...devices['Desktop Chrome'], ...fakeMic(audio.stringE) }, testMatch: /mic\.tuner/ },
    { name: 'mic-bass-e', use: { ...devices['Desktop Chrome'], ...fakeMic(audio.bassE) }, testMatch: /mic\.bass/ },
  ],
});
