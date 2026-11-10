// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Nalarin.ai - Automated E2E Test Suite (12 Kasus Uji P0)', () => {

  // TEST CASE 01: Verifikasi Tampilan Landing Page & Branding
  test('TC01 - Memastikan Landing Page memuat branding dan tombol navigasi utama', async ({ page }) => {
    await page.goto('/');

    // 1. Verifikasi elemen body termuat
    await expect(page.locator('body')).toBeVisible();

    // 2. Verifikasi tombol navigasi (Login & Pricing) terlihat di halaman
    await expect(page.getByRole('link', { name: /log in|masuk/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /pricing|harga/i }).first()).toBeVisible();

    // 3. Ambil screenshot bukti pengujian
    await page.screenshot({ path: 'tests/e2e/bukti-tc01-landing-page.png', fullPage: true });
  });

  // TEST CASE 02: Halaman Paket Berlangganan (Pricing Page)
  test('TC02 - Memastikan halaman Pricing menampilkan pilihan paket langganan', async ({ page }) => {
    await page.goto('/pricing');

    // 1. Verifikasi halaman pricing berhasil diakses
    await expect(page).toHaveURL(/.*pricing.*/i);
    await expect(page.locator('body')).toBeVisible();

    // 2. Verifikasi konten penawaran paket harga
    await expect(page.getByText(/ultimate|pro|free/i).first()).toBeVisible();

    await page.screenshot({ path: 'tests/e2e/bukti-tc02-pricing-page.png' });
  });

  // TEST CASE 03: Form Registrasi Pengguna Baru
  test('TC03 - Memastikan halaman Registrasi menampilkan form pendaftaran lengkap', async ({ page }) => {
    await page.goto('/register');

    await expect(page).toHaveURL(/.*register.*/i);

    // 1. Verifikasi input nama, email, dan password ada di halaman
    const inputName = page.locator('input[name="name"]').first();
    const inputEmail = page.locator('input[name="email"]').first();
    const inputPassword = page.locator('input[name="password"]').first();

    await expect(inputName).toBeVisible();
    await expect(inputEmail).toBeVisible();
    await expect(inputPassword).toBeVisible();

    // 2. Simulasi pengetikan data calon pengguna
    await inputName.fill('Calon Pengguna Nalarin');
    await inputEmail.fill('testing.nalarin@example.com');
    await inputPassword.fill('Rahasia123!');

    await expect(inputName).toHaveValue('Calon Pengguna Nalarin');
    await expect(inputEmail).toHaveValue('testing.nalarin@example.com');

    await page.screenshot({ path: 'tests/e2e/bukti-tc03-register-form.png' });
  });

  // TEST CASE 04: Validasi Form Login Kosong (Negative Test)
  test('TC04 - Validasi sistem saat menekan tombol login tanpa mengisi kredensial', async ({ page }) => {
    await page.goto('/login');

    const buttonSubmit = page.getByRole('button', { name: /masuk|login|sign in/i }).first();
    await expect(buttonSubmit).toBeVisible();

    // Klik tombol submit tanpa mengisi email & password
    await buttonSubmit.click();

    // Pengguna harus tetap ditahan di halaman login (tidak tembus ke dashboard)
    await expect(page).toHaveURL(/.*login.*/i);

    await page.screenshot({ path: 'tests/e2e/bukti-tc04-login-validation.png' });
  });

  // TEST CASE 05: Form Lupa Password (Forgot Password Recovery)
  test('TC05 - Memastikan halaman Lupa Password menampilkan form reset', async ({ page }) => {
    await page.goto('/forgot-password');

    await expect(page).toHaveURL(/.*forgot-password.*/i);

    const inputEmail = page.locator('input[name="email"]').first();
    await expect(inputEmail).toBeVisible();

    await inputEmail.fill('recovery@example.com');
    await expect(inputEmail).toHaveValue('recovery@example.com');

    await page.screenshot({ path: 'tests/e2e/bukti-tc05-forgot-password.png' });
  });

  // TEST CASE 06: Proteksi Rute Dashboard (Auth Guard Middleware)
  test('TC06 - Keamanan sistem: Memastikan /dashboard dicegat jika belum login', async ({ page }) => {
    // Mencoba akses dashboard tanpa sesi login
    await page.goto('/dashboard');

    // Sistem wajib me-redirect pengguna ke halaman login
    await expect(page).toHaveURL(/.*login.*/i);

    await page.screenshot({ path: 'tests/e2e/bukti-tc06-auth-guard-dashboard.png' });
  });

  // TEST CASE 07: Proteksi Modul Unggah Dokumen (Upload Material)
  test('TC07 - Keamanan sistem: Memastikan modul /upload dilindungi autentikasi', async ({ page }) => {
    await page.goto('/upload');

    // Sistem wajib mengarahkan ke halaman login
    await expect(page).toHaveURL(/.*login.*/i);

    await page.screenshot({ path: 'tests/e2e/bukti-tc07-auth-guard-upload.png' });
  });

  // TEST CASE 08: Proteksi Modul AI Chat Assistant
  test('TC08 - Keamanan sistem: Memastikan modul /chat dilindungi autentikasi', async ({ page }) => {
    await page.goto('/chat');

    await expect(page).toHaveURL(/.*login.*/i);

    await page.screenshot({ path: 'tests/e2e/bukti-tc08-auth-guard-chat.png' });
  });

  // TEST CASE 09: Proteksi Modul Generator Kuis AI (Quiz)
  test('TC09 - Keamanan sistem: Memastikan modul /quiz dilindungi autentikasi', async ({ page }) => {
    await page.goto('/quiz');

    await expect(page).toHaveURL(/.*login.*/i);

    await page.screenshot({ path: 'tests/e2e/bukti-tc09-auth-guard-quiz.png' });
  });

  // TEST CASE 10: Proteksi Modul Flashcards Pintar
  test('TC10 - Keamanan sistem: Memastikan modul /flashcards dilindungi autentikasi', async ({ page }) => {
    await page.goto('/flashcards');

    await expect(page).toHaveURL(/.*login.*/i);

    await page.screenshot({ path: 'tests/e2e/bukti-tc10-auth-guard-flashcards.png' });
  });

  // TEST CASE 11: Proteksi Modul Ruang Belajar Kolaboratif (Study Rooms)
  test('TC11 - Keamanan sistem: Memastikan modul /rooms dilindungi autentikasi', async ({ page }) => {
    await page.goto('/rooms');

    await expect(page).toHaveURL(/.*login.*/i);

    await page.screenshot({ path: 'tests/e2e/bukti-tc11-auth-guard-rooms.png' });
  });

  // TEST CASE 12: Pengujian Login Berhasil dengan Akun Demo Seeder & Masuk Dashboard
  test('TC12 - Login berhasil dengan akun tester demo dan verifikasi akses dashboard', async ({ page }) => {
    await page.goto('/login');

    const inputEmail = page.locator('input[name="email"]').first();
    const inputPassword = page.locator('input[type="password"]').first();
    const buttonSubmit = page.getByRole('button', { name: /masuk|login|sign in/i }).first();

    // Gunakan kredensial akun dari TesterDemoSeeder
    await inputEmail.fill('free@tester.com');
    await inputPassword.fill('password');

    await expect(inputEmail).toHaveValue('free@tester.com');
    await expect(inputPassword).toHaveValue('password');

    // Submit form login
    await buttonSubmit.click();

    // Verifikasi berhasil masuk ke dashboard (atau respon autentikasi)
    await expect(page).toHaveURL(/.*dashboard.*/i, { timeout: 15000 });
    await expect(page.locator('body')).toBeVisible();

    await page.screenshot({ path: 'tests/e2e/bukti-tc12-login-dashboard.png' });
  });

});

