const puppeteer = require('puppeteer');
const chai = require('chai');

chai.config.includeStack = true;
chai.config.showDiff = true;

global.expect = chai.expect;

const APP_URL = 'http://localhost:8081';

before(async function() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(APP_URL);

  global.browser = browser;
  global.page = page;
});

after(function() {
  browser.close();
});

