const cheerio = require('cheerio');
const fs = require('fs');
const https = require('https');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', reject);
  });
}

function scrapePage(html, pageId, url) {
  const $ = cheerio.load(html);
  const pageTitle = $('title').text();
  const ovDivbox = $('div.ovDivbox');

  const sections = [];
  const lawRefsSet = new Set();
  const numbersMap = new Map();

  const headings = ovDivbox.find('div.plv1a');

  headings.each((idx, heading) => {
    const $heading = $(heading);
    const cleanHeading = $heading
      .clone()
      .find('img, a, input, label')
      .remove()
      .end()
      .text()
      .trim();

    const subheadings = [];
    const content = [];

    let sibling = $heading.next();
    while (sibling.length > 0 && !sibling.hasClass('plv1a')) {
      const text = sibling.text().trim();

      if (text) {
        if (sibling.hasClass('plv2a')) {
          const cleanText = sibling
            .clone()
            .find('img, a')
            .remove()
            .end()
            .text()
            .trim();
          if (cleanText) subheadings.push(cleanText);
        } else if (sibling.hasClass('plv3a') || sibling.hasClass('plv4a')) {
          const cleanText = sibling
            .clone()
            .find('input, label, img')
            .remove()
            .end()
            .text()
            .trim();
          if (cleanText) content.push(cleanText);
        }
      }
      sibling = sibling.next();
    }

    if (cleanHeading) {
      sections.push({
        heading: cleanHeading,
        subheadings: [...new Set(subheadings)],
        content,
        notes: []
      });
    }
  });

  const fullText = ovDivbox.text();

  const lawRefPattern = /「([^」]+)」\s*제(\d+)조/g;
  let match;
  while ((match = lawRefPattern.exec(fullText)) !== null) {
    lawRefsSet.add(JSON.stringify({
      text: match[0],
      law: match[1],
      article: parseInt(match[2])
    }));
  }

  const patterns = [
    { pattern: /(\d+)년/g, unit: '년' },
    { pattern: /(\d+)개월/g, unit: '개월' },
    { pattern: /(\d+)일/g, unit: '일' },
    { pattern: /(\d+)원/g, unit: '원' },
    { pattern: /(\d+)명/g, unit: '명' },
    { pattern: /(\d+)%/g, unit: '%' }
  ];

  patterns.forEach(({ pattern, unit }) => {
    let m;
    while ((m = pattern.exec(fullText)) !== null) {
      const key = m[0];
      if (!numbersMap.has(key)) {
        numbersMap.set(key, {
          value: parseInt(m[1]),
          unit: unit,
          context: m[0]
        });
      }
    }
  });

  return {
    pageId,
    title: pageTitle,
    url,
    sections,
    lawRefs: Array.from(lawRefsSet).map(s => JSON.parse(s)),
    numbers: Array.from(numbersMap.values())
  };
}

async function main() {
  const url = 'https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1141&ccfNo=1&cciNo=1&cnpClsNo=1';
  const pageId = '1141-1-1-1';

  try {
    const html = await fetchPage(url);
    const data = scrapePage(html, pageId, url);

    const outDir = './source-data';
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    fs.writeFileSync(`${outDir}/${pageId}.json`, JSON.stringify(data, null, 2), 'utf-8');

    console.log(`✓ Saved ${pageId}`);
    console.log(`  Sections: ${data.sections.length}`);
    console.log(`  Laws: ${data.lawRefs.length}`);
    console.log(`  Numbers: ${data.numbers.length}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
