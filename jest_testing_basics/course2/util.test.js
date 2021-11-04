const puppeteer = require('puppeteer');
const {generateText, checkAndGenerate} = require('./util.js');

test('should output be "Marcos (28 years old)"',() =>{
  const text = generateText('Marcos',28);
  expect(text).toBe('Marcos (28 years old)');
  const text2 = generateText('Juliana',28);
  expect(text2).toBe('Juliana (28 years old)');
});

test('should output data-less text',() => {
  const text = generateText('',null);
  expect(text).toBe(' (null years old)');
});


test('should generate a valid text output', () => {
  const text = checkAndGenerate('Marcos',28);
  expect(text).toBe('Marcos (28 years old)');
});

test('should create an element with text and correct class',async () => {
  const browser = await puppeteer.launch({
   
   //tornar o primeiro atributo "true" e remover os demais, não abre o navegador
    headless: false,
    slowMo: 80,
    args: ['--window-size-1920,1080']
  });

  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/index.html');
  await page.click('input#name');
  await page.type('input#name','Anna');

  await page.click('input#age');
  await page.type('input#age','25');

  await page.click('#btnAddUser');

  const finalText = await page.$eval('.user-item',el => el.textContent);

  expect(finalText).toBe('Anna (25 years old)');
},10000); //Para garantir que as chamadas assíncronas não gerem erro após 5 segundos
