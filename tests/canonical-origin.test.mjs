import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import worker from '../worker.mjs';

const urls = JSON.parse(await readFile(new URL('./coverage-urls.json', import.meta.url), 'utf8'));

test('all alternate origins in the 40-row Search Console export redirect without losing the path or query', async () => {
  assert.equal(urls.length, 40);
  for (const source of urls) {
    const expected = new URL(source);
    expected.protocol = 'https:';
    expected.hostname = 'mandoubzain5g.com';
    expected.port = '';
    let assetCalls = 0;
    const env = { ASSETS: { fetch(request) { assetCalls++; assert.equal(request.url, expected.href); return new Response('page', { status: 200 }); } } };
    const result = await worker.fetch(new Request(source), env);
    if (new URL(source).origin !== expected.origin) {
      assert.equal(result.status, 301, source);
      assert.equal(result.headers.get('Location'), expected.href, source);
      assert.equal(assetCalls, 0, 'redirect before asset handling');
      const final = await worker.fetch(new Request(result.headers.get('Location')), env);
      assert.equal(final.status, 200, 'canonical target must not redirect again');
    } else assert.equal(result.status, 200);
    assert.equal(assetCalls, 1);
  }
});

test('canonical assets, 404 responses and preview hostnames pass through unchanged', async () => {
  for (const url of ['https://mandoubzain5g.com/blog/', 'https://mandoubzain5g.com/sitemap.xml', 'https://mandoubzain5g.com/missing', 'http://localhost:8787/blog/', 'https://preview.workers.dev/blog/']) {
    const expected = new Response('asset', { status: url.includes('/missing') ? 404 : 200, headers: { 'x-asset': 'preserved' } });
    const result = await worker.fetch(new Request(url), { ASSETS: { fetch: request => { assert.equal(request.url, url); return expected; } } });
    assert.equal(result, expected);
    assert.equal(result.headers.get('x-asset'), 'preserved');
  }
});

test('www and other alternate public ports redirect to HTTPS without a port', async () => {
  for (const source of ['https://www.mandoubzain5g.com:8443/blog/?a=1&b=2', 'http://www.mandoubzain5g.com/about', 'https://mandoubzain5g.com:2053/blog/']) {
    const response = await worker.fetch(new Request(source), { ASSETS: { fetch() { throw new Error('must redirect first'); } } });
    const target = new URL(response.headers.get('Location'));
    assert.equal(response.status, 301);
    assert.equal(target.origin, 'https://mandoubzain5g.com');
    assert.equal(target.pathname, new URL(source).pathname);
    assert.equal(target.search, new URL(source).search);
  }
});
