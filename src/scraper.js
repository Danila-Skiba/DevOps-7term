import { chromium } from 'playwright';
import { mkdir, rm, writeFile, rename } from 'node:fs/promises';

const BASE_URL = 'https://quotes.toscrape.com';
const RESULT = 'out/result.json';
const MAX_PAGES = 100;
const TIMEOUT = 15_000;

async function loadPage(page, pageNumber, action) {
  const [response] = await Promise.all([
    page.waitForResponse(
      (response) => {
        const url = new URL(response.url());

        return (
          url.origin === BASE_URL &&
          url.pathname === '/api/quotes' &&
          url.searchParams.get('page') === String(pageNumber)
        );
      },
      { timeout: TIMEOUT },
    ),
    action(),
  ]);

  if (!response.ok()) {
    throw new Error(
      `Ошибка загрузки страницы ${pageNumber}: HTTP ${response.status()}`,
    );
  }

  const data = await response.json();
  return data;
}

async function collectQuotes(page) {
  let expectedCount = 0;

  for (let pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
    const data = await loadPage(page, pageNumber, async () => {
      if (pageNumber === 1) {
        const response = await page.goto(`${BASE_URL}/scroll`, {
          waitUntil: 'domcontentloaded',
          timeout: TIMEOUT,
        });

        if (!response?.ok()) {
          throw new Error('Не удалось открыть страницу');
        }

        await page.addStyleTag({
          content: '#loading { position: fixed !important; bottom: 0; left: 0; }',
        });
      } else {
        await page.evaluate(async () => {
          window.scrollTo(0, 0);

          await new Promise((resolve) => {
            requestAnimationFrame(() => requestAnimationFrame(resolve));
          });

          window.scrollTo(0, document.documentElement.scrollHeight);
        });
      }
    });

    expectedCount += data.quotes.length;

    await page.waitForFunction(
      (count) => document.querySelectorAll('.quote').length >= count,
      expectedCount,
      { timeout: TIMEOUT },
    );

    console.log(
      `Страница ${pageNumber}: загружено карточек ${expectedCount}`,
    );

    if (!data.has_next) {
      const quotes = await page.locator('.quote').evaluateAll((cards) =>
        cards.map((card) => ({
          text: card.querySelector('.text')?.textContent?.trim() ?? '',
          author: card.querySelector('.author')?.textContent?.trim() ?? '',
          tags: Array.from(
            card.querySelectorAll('.tag'),
            (tag) => tag.textContent.trim(),
          ),
        })),
      );

      if (
        quotes.length === 0 ||
        quotes.some((quote) => !quote.text || !quote.author)
      ) {
        throw new Error('Цитаты отсутствуют или содержат пустые поля');
      }

      const unique = new Map();

      for (const quote of quotes) {
        const key = JSON.stringify([quote.text, quote.author]);

        if (!unique.has(key)) {
          unique.set(key, quote);
        }
      }

      return [...unique.values()];
    }
  }

  throw new Error(`Превышен предел ${MAX_PAGES} страниц`);
}

async function main() {
  await mkdir('out', { recursive: true });
  await rm(RESULT, { force: true });

  const browser = await chromium.launch({
    headless: true,
    timeout: TIMEOUT,
  });

  let quotes;

  try {
    const page = await browser.newPage();
    quotes = await collectQuotes(page);
  } finally {
    await browser.close();
  }

  await writeFile(
    RESULT,
    `${JSON.stringify(quotes, null, 2)}\n`,
    'utf8',
  );
}

main().catch((error) => {
  console.error(`Ошибка скрапера: ${error.message}`);
  process.exitCode = 1;
});
