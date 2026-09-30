# Arcreed Exim House — SEO launch pack

Prepared September 30, 2026 for the planned public launch.

## Domain confirmation before launch

The requested domain was entered as **`arceedeximhouse.com`**, while the brand and website spell the name **Arcreed**. The sitemap, canonical tags, social metadata, and robots file in this package use the domain exactly as supplied: `https://arceedeximhouse.com`. Confirm that spelling and ownership before publishing. If the registered domain is different, replace the host consistently in those files and in the structured data before launch.

## What is ready in this folder

- `sitemap.xml` lists the five public pages intended for the main domain.
- `robots.txt` allows normal crawling and advertises the sitemap.
- The five listed HTML pages now have distinct titles and descriptions, canonical URLs, Open Graph/Twitter share metadata, and one shared 1200 × 630 preview image at `assets/og/arcreed-share-preview.png`.
- The home page includes basic `Organization` and `WebSite` JSON-LD using known brand information only.
- `journey.html` has `noindex,follow` and is excluded from the main-domain sitemap because the trade-journey experience is planned for a separate subdomain. Keep it crawlable so crawlers can see the `noindex` directive. When that subdomain is ready, give it its own sitemap and robots file and remove `noindex` there.

## Public page map

| Page | Canonical URL | Search intent to address |
| --- | --- | --- |
| Home | `https://arceedeximhouse.com/` | Arcreed Exim House; international trade and sourcing |
| Our story | `https://arceedeximhouse.com/about.html` | About Arcreed Exim House and its approach |
| What we do | `https://arceedeximhouse.com/capabilities.html` | Product sourcing, import/export support, trade coordination |
| Partners | `https://arceedeximhouse.com/partners.html` | International trade and business partnerships |
| Contact | `https://arceedeximhouse.com/contact.html` | Contact and trade enquiry |

These are starting themes, not researched search-volume claims. Before writing more SEO copy, confirm the actual customer markets, product categories, trade lanes, and services the business can support. Use those specifics naturally in page headings and helpful copy; avoid repeating phrases unnaturally.

## Before publishing

- [ ] Confirm the exact registered domain spelling, registrar access, and final preferred host (`https://arceedeximhouse.com` or another verified host).
- [ ] Point DNS to the chosen host and enable a valid HTTPS certificate.
- [ ] Configure permanent redirects from HTTP, `www`, and `/index.html` to the chosen canonical URLs. Do not leave multiple live home-page variants.
- [ ] Upload the entire site, including `robots.txt`, `sitemap.xml`, `assets/audio/`, `assets/og/`, and the video assets. Check that each listed page and its CSS, JavaScript, logo, and share image is publicly reachable without a login.
- [ ] Ensure the host returns HTTP 200 for each sitemap URL, serves the sitemap as XML and robots file as plain text, and returns a real 404 for unknown pages.
- [ ] Keep the main-site `journey.html` out of the sitemap and retain its `noindex,follow` until it moves. For the future subdomain, prepare separate canonical URLs, sitemap, and Search Console property.
- [ ] Activate the FormSubmit endpoint by submitting each form from the hosted site and confirming the activation email sent to `arcreedexim@gmail.com`; verify copies arrive at `info@arceedeximhouse.com` too. Forms route submissions through FormSubmit.
- [ ] Add a concise privacy notice explaining what information the enquiry forms collect, how it is used, and that submissions are processed by FormSubmit and emailed to the two business inboxes.
- [ ] Add and verify the public business contact details, operating markets, and service facts consistently on the site and any business profiles. Do not publish placeholder addresses, credentials, testimonials, or customer claims.
- [ ] Review the original page text, spelling, image/video rights, image alt text, and all calls to action on desktop and mobile.
- [ ] Check mobile load time. The site uses large background videos; retain efficient encodes/posters and avoid loading every video eagerly on mobile.
- [ ] Validate the structured data and page metadata after deployment. Check the rendered pages and ensure canonical URLs match the chosen host.

## Search engine setup after launch

1. Create a Google Search Console **Domain property** and verify ownership with its DNS TXT record. This covers the root domain and subdomains.
2. Add the matching Bing Webmaster Tools property (DNS verification is also suitable).
3. Submit `https://arceedeximhouse.com/sitemap.xml` in Search Console and Bing Webmaster Tools.
4. Use Search Console URL Inspection for the home page and the four main pages. Request indexing after confirming each live page is correct; a request is not a promise of instant indexing.
5. Review the Page Indexing, HTTPS, and Core Web Vitals reports as data becomes available. Fix crawl errors, wrong canonicals, accidental `noindex`, broken links, and mobile usability issues.
6. Publish useful, original updates over time: concrete service explanations, the markets served, practical trade guidance, and verifiable examples. Earn relevant mentions and links through real partners and industry participation; avoid paid link schemes or mass directory submissions.
7. Track branded searches separately from service searches. Review Search Console impressions, clicks, queries, and landing pages monthly, then improve pages based on the actual queries and qualified enquiries.

## Ranking expectation

No sitemap, metadata, or SEO checklist can guarantee the first position. A new domain may take time to be crawled and indexed, and ranking depends on the query, competition, content usefulness, reputation, and other signals. The first goal is correct indexing and a strong result for the exact business name; broader service terms need sustained, specific content and trustworthy references. Google explicitly says no one can guarantee a #1 ranking and that sitemap submission does not guarantee indexing or ranking.

## Official references

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google: Title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google: Request a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google: SEO and ranking guarantees](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)
