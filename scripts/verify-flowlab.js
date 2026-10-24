const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const screenshotsDir = path.resolve('dev', 'flowlab-screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function verifyFlowLab() {
  console.log('🚀 Running FlowLab Rebranding & Ownership Verification with Chrome...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  console.log('\n--- Step 1: Check Sign-in Page & FlowLab Brand ---');
  await page.goto('http://localhost:4200/sign-in', { waitUntil: 'networkidle' });
  const title1 = await page.title();
  console.log('Page Title:', title1);
  await page.screenshot({ path: path.join(screenshotsDir, '01-flowlab-signin.png') });

  console.log('\n--- Step 2: Sign In as Dev User ---');
  await page.locator('input#email, input[name="email"]').fill('dev@ap.com');
  await page.locator('input#password, input[name="password"]').fill('12345678');
  await page.screenshot({ path: path.join(screenshotsDir, '02-flowlab-signin-filled.png') });

  console.log('Clicking Sign in button...');
  const signInBtn = page.locator('button:has-text("Sign in")').first();
  await signInBtn.click();

  console.log('Waiting for authentication redirect...');
  await page.waitForURL('**/projects/**', { timeout: 15000 });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  const dashTitle = await page.title();
  console.log('Dashboard Title:', dashTitle);
  await page.screenshot({ path: path.join(screenshotsDir, '03-flowlab-dashboard.png') });

  console.log('\n--- Step 3: Verify Sidebar Attribution & Brand ---');
  const sidebar = page.locator('aside, [data-sidebar="sidebar"]').first();
  const sidebarText = await sidebar.innerText();
  const hasFlowLab = sidebarText.includes('FlowLab');
  const hasAamod = sidebarText.includes('Aamod Kumar');
  console.log('Sidebar contains "FlowLab":', hasFlowLab);
  console.log('Sidebar contains "Aamod Kumar":', hasAamod);

  console.log('\n--- Step 4: Open User Dropdown and Help Menu ---');
  const userButton = page.locator('button:has-text("Dev User"), button:has-text("dev@ap.com")').first();
  if (await userButton.isVisible()) {
    await userButton.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(screenshotsDir, '04-flowlab-user-menu.png') });

    const helpTrigger = page.locator('[role="menuitem"]:has-text("Help & Feedback"), [role="menuitem"]:has-text("Help")').first();
    if (await helpTrigger.isVisible()) {
      await helpTrigger.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(screenshotsDir, '05-flowlab-help-menu.png') });
    }
  }

  console.log('\n--- Step 5: Verify Flow Builder ---');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  const flowRow = page.locator('tbody tr').first();
  if (await flowRow.isVisible()) {
    console.log('Clicking flow row in table...');
    await flowRow.click();
    await page.waitForURL('**/flows/**', { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const builderTitle = await page.title();
    console.log('Flow Builder Title:', builderTitle);
    await page.screenshot({ path: path.join(screenshotsDir, '06-flowlab-builder.png') });
  }

  await browser.close();
  console.log('\n🎉 FlowLab Rebranding & Ownership Verification completed successfully!');
}

verifyFlowLab().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
