// const { TimeoutSettings } = require('puppeteer');

let page;

beforeAll(async () => {
    page = await browser.newPage();
});

afterAll(() => {
    page.close();
});

describe('Github page tests', () => {
    beforeAll(async () => {
        // page = await browser.newPage();
        await page.goto('https://github.com/team', {
            waitUntil: 'load',
            timeout: 120000,
        });
    });

    test("The h1 header content'", async () => {
        const firstLink = await page.$('header div div a');
        await firstLink.click();
        await page.waitForSelector('h1');
        const title2 = await page.title();
        expect(title2).toEqual(
            'GitHub for teams · Build like the best teams on the planet · GitHub',
        );
    });

    test('The first link attribute', async () => {
        const actual = await page.$eval('a', link => link.getAttribute('href'));
        expect(actual).toEqual('#start-of-content');
    });

    test('The page contains Sign in button', async () => {
        const btnSelector = '.btn-large-mktg.btn-mktg';
        await page.waitForSelector(btnSelector, {
            visible: true,
        });
        const actual = await page.$eval(btnSelector, link => link.textContent);
        expect(actual).toContain('Get started with Team');
    });
});

test('Second h1 header content', async () => {
    await page.goto('https://github.com/marketplace', {
        waitUntil: 'load',
        timeout: 140000,
    });
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual(
        'GitHub Marketplace · to improve your workflow · GitHub',
    );
});

test('Third h1 header content', async () => {
    await page.goto('https://github.com/explore', {
        waitUntil: 'load',
        timeout: 140000,
    });
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Explore GitHub');
});

test('Fourth h1 header content', async () => {
    await page.goto('https://github.com/', {
        waitUntil: 'load',
        timeout: 0,
    });
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Let’s build from here · GitHub');
});
