const { Builder, By, until } = require('selenium-webdriver');

(async function testPieceDelete() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://localhost:8080/paper');

    // Wait for at least one piece to appear and count all pieces
    let piecesBefore = await driver.wait(
      async () => {
        let found = await driver.findElements(By.className('paperpiece'));
        return found.length > 0 ? found : false;
      },
      10000
    );
    const countBefore = piecesBefore.length;

    // Click the delete button of the first piece
    let deleteBtn = await piecesBefore[0].findElement(By.className('delete-btn'));
    await deleteBtn.click();

    // Wait until the number of pieces decreases by one
    await driver.wait(
      async () => {
        let piecesAfter = await driver.findElements(By.className('paperpiece'));
        return piecesAfter.length === countBefore - 1;
      },
      5000
    );

    console.log('Test passed: One piece deleted.');
  } catch (e) {
    console.log('Test failed:', e.message);
  } finally {
    await driver.quit();
  }
})();