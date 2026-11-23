const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const headless = process.env.HEADLESS !== 'false';

async function run() {
  const options = new chrome.Options();

  if (headless) {
    options.addArguments('--headless=new');
  }

  options.addArguments('--no-sandbox', '--disable-dev-shm-usage');

  if (process.env.CHROME_BIN) {
    options.setChromeBinaryPath(process.env.CHROME_BIN);
  }

  const builder = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options);

  if (process.env.CHROMEDRIVER_PATH) {
    builder.setChromeService(new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH));
  }

  const driver = await builder.build();

  try {
    await driver.get(baseUrl);
    const confirmation = await driver.findElement(By.id('confirmation'));

    if (await confirmation.isDisplayed()) {
      throw new Error('A confirmação não deveria aparecer antes do envio do formulário.');
    }

    await driver.findElement(By.id('name')).sendKeys('Ana Silva');
    await driver.findElement(By.id('email')).sendKeys('ana@exemplo.com');
    await driver.findElement(By.id('password')).sendKeys('senha-segura-123');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(
      until.elementIsVisible(confirmation),
      5000,
      'A mensagem de confirmação não apareceu em até 5 segundos',
    );
    const actualText = await confirmation.getText();
    const expectedText = 'Cadastro confirmado para Ana Silva!';

    if (actualText !== expectedText) {
      throw new Error(`Mensagem inesperada: "${actualText}". Esperado: "${expectedText}".`);
    }

    console.log('✅ Teste aprovado: cadastro confirmado com sucesso.');
  } catch (error) {
    console.error('❌ Teste de cadastro falhou.');
    throw error;
  } finally {
    await driver.quit();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
