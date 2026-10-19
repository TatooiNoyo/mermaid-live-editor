import { expect, test } from './test';

test.describe('Check actions', () => {
  test.beforeEach(async ({ editPage }) => {
    await editPage.toggleActions();
  });

  test('should expose diagram source as a Markdown code block', async ({ editPage }) => {
    const oldText = await editPage.markdownInput.inputValue();
    expect(oldText).toMatch(/^```mermaid\n[\s\S]+\n```$/);
    expect(oldText).not.toContain('![](');
    await editPage.typeInEditor('C --> HistoryTest', { bottom: true, newline: true });
    await expect(editPage.markdownInput).not.toHaveValue(oldText);
    await expect(editPage.markdownInput).toHaveValue(/C --> HistoryTest\n```$/);
  });

  test.skip('should load gists from URL', async ({ page }) => {
    await page
      .locator('#gist')
      .fill('https://gist.github.com/sidharthv96/6268a23e673a533dcb198f241fd7012a');
    await page.getByText('Load Gist').click();
    await expect(page.getByText('Go shopping!!')).toBeVisible();
  });

  test('should download png and svg', async ({ editPage }) => {
    const firstPngSize = await editPage.checkAndDownloadPNG(20_000);
    const firstSvgSize = await editPage.downloadSVG(10_000);

    // Verify downloaded file is different for different diagrams
    await editPage.toggleSampleDiagrams();
    await editPage.loadSampleDiagram('Entity Relationship');

    const secondPngSize = await editPage.checkAndDownloadPNG(20_000);
    const secondSvgSize = await editPage.downloadSVG(10_000);

    // Verify files are actually different
    expect(firstPngSize).not.toBe(secondPngSize);
    expect(firstSvgSize).not.toBe(secondSvgSize);
  });
});
