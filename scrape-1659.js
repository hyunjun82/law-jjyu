const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrapeSave(csmSeq, ccfNo, cciNo, cnpClsNo) {
  const pageId = csmSeq + '-' + ccfNo + '-' + cciNo + '-' + cnpClsNo;
  const url = 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=' + csmSeq + '&ccfNo=' + ccfNo + '&cciNo=' + cciNo + '&cnpClsNo=' + cnpClsNo;
  const html = await fetchPage(url);
  const $ = cheerio.load(html);
  const titleEl = $('title').text();
  const titleParts = titleEl.split('>');
  const title = (titleParts[3] || titleParts[titleParts.length-1] || '').trim().replace('(본문) | 찾기쉬운 생활법령정보', '').trim();
  const allText = $('div.ovDivbox').text();
  const sections = [];
  $('div.plv1a').each(function(i, el) {
    const heading = $(el).clone().find('img,a,input,label').remove().end().text().trim();
    const content = [];
    let s = $(el).next();
    while (s.length && !s.hasClass('plv1a')) {
      const t = s.text().trim();
      if (t && !s.hasClass('plv2a') && !s.hasClass('ovImgDiv')) content.push(t);
      s = s.next();
    }
    if (heading) sections.push({heading: heading, content: content, notes: []});
  });
  const lawRefsSet = new Set();
  const matches = allText.match(/「[^」]+」/g) || [];
  matches.forEach(function(r) { lawRefsSet.add(r); });
  const lawRefs = Array.from(lawRefsSet);
  const result = {
    url: url,
    title: title,
    lastUpdated: '',
    sections: sections,
    lawRefs: lawRefs,
    pageId: pageId,
    csmSeq: String(csmSeq),
    ccfNo: String(ccfNo),
    cciNo: String(cciNo),
    cnpClsNo: String(cnpClsNo),
    fetchedAt: '2026-03-12'
  };
  fs.writeFileSync('source-data/' + pageId + '.json', JSON.stringify(result, null, 2));
  console.log('Saved: ' + pageId + ' (' + sections.length + ' sections, ' + lawRefs.length + ' lawRefs)');
}

Promise.all([
  scrapeSave(1659, 2, 1, 1),
  scrapeSave(1659, 2, 1, 2),
  scrapeSave(1659, 3, 1, 1),
  scrapeSave(1659, 3, 1, 2),
  scrapeSave(1659, 3, 1, 3),
  scrapeSave(1659, 3, 1, 4),
]).then(function() { console.log('Done'); }).catch(function(e) { console.error(e); });
