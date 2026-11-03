const CANONICAL_HOST = 'mandoubzain5g.com';
const PUBLIC_HOSTS = new Set([CANONICAL_HOST, `www.${CANONICAL_HOST}`]);

export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);
    if (PUBLIC_HOSTS.has(incoming.hostname)) {
      const canonical = new URL(incoming);
      canonical.protocol = 'https:';
      canonical.hostname = CANONICAL_HOST;
      canonical.port = '';
      if (incoming.origin !== canonical.origin) {
        // Preserve encoded Arabic paths and the complete query string.
        // This runs before static assets, whose relative links would otherwise
        // cause crawlers to keep discovering pages on the alternate port.
        return Response.redirect(canonical.href, 301);
      }
    }
    return env.ASSETS.fetch(request);
  },
};
