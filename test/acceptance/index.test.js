
describe('acceptance test', function() {

  it('ui test', async function() {
    const selector = 'div.content';
    await page.waitFor(selector);
    await page.click(selector);
    await page.click(selector);
    const text = await page.$eval(selector, div => div.innerText);

    expect(text).to.be.equal('hello world hello world');
  });

});
