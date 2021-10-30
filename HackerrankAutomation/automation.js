// node automation.js -url=https://www.hackerrank.com/ -config=config.json
// npm install puppeteer --core
//if any prob occurs check 20th oct class

let minimist = require("minimist");
let args = minimist(process.argv);
let fs = require("fs");
let puppeteer = require("puppeteer");
const { Agent } = require("http");

let configJSON = fs.readFileSync(args.config, "utf-8");
let configJSO = JSON.parse(configJSON);

//IIFE -> immediately invoked fucntion
(function () {})(); //this calls the funciton simultanously.

//await can be used only where aynch is used and only in functions.

async function init() {
  let browser = await puppeteer.launch({
    headless: false, //means we will be able to see the work
    args: ["--start-maximized"],
    defaultViewport: null,
  });
  let pages = await browser.pages();
  let page = pages[0];

  await page.goto(args.url);

  //wait and click on klogin
  await page.waitForSelector("a[data-event-action='Login']");
  await page.click("a[data-event-action='Login']");

  await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
  await page.click("a[href='https://www.hackerrank.com/login']");

  await page.waitForSelector("input[name='username']");
  await page.type("input[name='username']", configJSO.userid, { delay: 30 });

  await page.waitForSelector("input[name='password']");
  await page.type("input[name='password']", configJSO.password, { delay: 30 });

  // in interview they will ask about async and await not puppeteer
  // mouse.move shows moving mouse
  await page.waitForSelector("button[data-analytics='LoginPassword']");
  await page.click("button[data-analytics='LoginPassword']");

  await page.waitForSelector("a[data-analytics='NavBarContests']");
  await page.click("a[data-analytics='NavBarContests']");

  await page.waitForSelector("a[href='/administration/contests/']");
  await page.click("a[href='/administration/contests/']");

  //find number of pages
  await page.waitForSelector("a[data-attr1='Last']");
  let numPages = await page.$eval("a[data-attr1='Last']", function (atag) {
    let totalPages = parseInt(atag.getAttribute("data-page"));
    return totalPages;
  });

  for (let i = 1; i < numPages; i++) {
    await handleAllContestOfAPage(page, browser);
    await page.waitForSelector("a[data-attr1='Right']");
    await page.click("a[data-attr1='Right']");
  }

  console.log("finsihed");
}

async function handleAllContestOfAPage(page, browser) {
  //find all urls of first page
  await page.waitForSelector("a.backbone.block-center");
  let conurls = await page.$$eval("a.backbone.block-center", function (atags) {
    //creates array from 1st parameter tehn poass it to function
    let urls = [];
    for (let i = 0; i < atags.length; i++) {
      let url = atags[i].getAttribute("href");
      urls.push(url);
    }
    return urls;
  });

  for (let i = 0; i < conurls.length; i++) {
    let ctab = await browser.newPage();
    await handleAPage(ctab, args.url + conurls[i], config.moderator);
    await ctab.close();
    await ctab.waitFor(1000);
  }
}

async function handleAPage(ctab, fullCurl, moderator) {
  await ctab.bringToFront();
  await ctab.goto(fullCurl);
  await ctab.waitFor(1000);

  await page.waitForSelector("li[data-tab='moderators']");
  await page.click("li[data-tab='moderators']");

  await page.waitForSelector("input#moderator");
  await page.type("input#moderator", moderator, { delay: 50 });

  await page.keyboard.press("Enter");
}

init();
