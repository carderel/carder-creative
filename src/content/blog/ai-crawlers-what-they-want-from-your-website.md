---
title: AI Crawlers Are Reading Your Website. Here's What They're Looking For.
meta_title: AI Crawlers: What GPTBot and ClaudeBot Want | Carder Creative
meta_description: GPTBot, ClaudeBot, and PerplexityBot are crawling your site right now. What each one does, what they look for, and what to do about it.
date: 2026-08-18
author: Carder Creative
tags:
  - AI crawlers
  - AI visibility
  - GPTBot
  - ClaudeBot
  - PerplexityBot
  - AI search visibility
  - LLM visibility
  - generative engine optimization
  - AI-powered discovery
  - robots.txt AI
  - AI indexing
  - structured data
  - schema markup
  - llms.txt
  - AI referral traffic
  - AI citations
---

# AI Crawlers Are Reading Your Website. Here's What They're Looking For.

Right now, automated bots from OpenAI, Anthropic, Perplexity, and Google are visiting websites just like yours. Some are gathering content to train large language models. Others are indexing pages in real time to power AI search results  -  results that may cite your business, or your competitor's, the next time someone asks a relevant question.

These are AI crawlers, and they are operating at scale. Understanding what they are, what they want, and what they might do with your content is not optional anymore. It is basic digital infrastructure awareness for any business that cares about how it is found online.

---

## The Two Types of AI Crawlers  -  and Why the Distinction Matters

Not all AI crawlers are doing the same job. There are two fundamentally different categories, and confusing them leads to bad decisions.

**Training crawlers**  -  such as GPTBot and ClaudeBot  -  harvest content from across the web to build and update the knowledge base of large language models. When a training crawler reads your site, it may use that content to help a model understand your industry, your products, or how businesses like yours describe themselves. Being read by a training crawler does not mean you will be cited or recommended in AI answers. The content gets absorbed into model weights. There is no direct feedback loop to your website.

**Search and retrieval crawlers**  -  such as OAI-SearchBot and PerplexityBot  -  operate more like traditional search indexing. They are continuously reading web content to power real-time AI search results. When these crawlers read your page and judge it relevant, you may appear as a cited source in AI-generated answers. That citation can send actual referral traffic back to your site.

The practical difference shows up in the data. Crawl-to-refer ratios measure how often a crawler visits compared to how often it sends traffic back. Anthropic's ratio is nearly 50,000:1  -  ClaudeBot crawls an enormous volume of content and sends very little traffic in return, because its primary function is training, not search. OpenAI's combined ratio sits around 887:1. Perplexity's is approximately 118:1  -  meaning PerplexityBot is, by a wide margin, the crawler most likely to generate an actual referral visit from an AI answer.

If your goal is [AI search visibility](/ai-visibility-services/) and real clicks from AI-powered discovery, PerplexityBot and OAI-SearchBot are the crawlers most worth understanding.

---

## The Major AI Crawlers: A Quick Reference

| Crawler | Company | Type | Respects robots.txt |
|---|---|---|---|
| GPTBot | OpenAI | Training | Yes |
| OAI-SearchBot | OpenAI | Real-time search | Yes |
| ClaudeBot | Anthropic | Training | Yes |
| PerplexityBot | Perplexity.ai | Real-time search | Yes |
| Google-Extended | Google | AI Overviews training | Yes |
| CCBot | Common Crawl | Training data | Yes |

A few things worth noting about the growth picture. GPTBot jumped from the ninth most active crawler globally in May 2024 to third by May 2025  -  a sign of how quickly OpenAI has scaled its web presence. PerplexityBot recorded the highest growth rate of any crawler in that same period, with a 157,490% increase in raw requests, reflecting the speed at which Perplexity has expanded its real-time indexing. ClaudeBot, by contrast, fell 46% in requests over the same period. Training data collection and real-time search indexing follow very different operational rhythms, and that difference shows in the crawl volume trends.

---

## What AI Crawlers Are Actually Looking For

AI crawlers  -  particularly search and retrieval crawlers  -  are looking for content they can confidently synthesize and surface in an AI-generated answer. That means content that is:

- **Clearly written and direct.** Crawlers are not evaluating elegance. They are looking for factual, declarative sentences that say something specific. Vague, heavily hedged, or keyword-stuffed paragraphs are harder to synthesize into a useful answer.
- **Structured with real heading hierarchy.** H2s, H3s, and bullet lists give crawlers a navigable map of your content. Semantic HTML structure matters. A page where everything is styled to look like headings, but uses `<div>` tags instead of actual heading elements, is harder for crawlers to parse correctly.
- **Loaded in accessible HTML.** Most AI crawlers do not execute JavaScript. They read the HTML your server delivers. If critical content on your pages  -  product descriptions, business information, FAQs  -  is rendered only after JavaScript runs, there is a real chance AI crawlers are not reading it at all. PDFs are increasingly well-processed by major crawlers, but HTML text is still the baseline.
- **Consistent about your business identity.** Crawlers building a picture of your business will read your name, address, phone number, and category from whatever is in your crawlable text. If those details are inconsistent across pages, or only present inside JavaScript-rendered components, the picture they assemble may be incomplete or contradictory.
- **Accessible without authentication.** Content behind login walls, paywalls, or member portals is invisible to AI crawlers. If your most authoritative content is gated, it is not contributing to your AI visibility.
- **Marked up with structured data.** Schema markup  -  particularly Organization, LocalBusiness, FAQ, and Product schemas  -  gives crawlers explicitly labeled information about your entity. They still read your prose, but schema gives them structured anchors they can trust.

---

## Should You Block AI Crawlers?

This is a real decision with real tradeoffs, and there is no single right answer.

If you do not want your content used to train AI models, blocking GPTBot and ClaudeBot via `robots.txt` is reasonable. Both crawlers respect disallow rules. There are legitimate reasons a business  -  particularly one with proprietary or competitively sensitive content  -  might not want to contribute freely to model training. Making that choice is defensible.

The more complicated question is whether to block search and retrieval crawlers like OAI-SearchBot and PerplexityBot. Blocking those crawlers reduces your chances of being cited in AI search results. Given Perplexity's 118:1 crawl-to-refer ratio and its rapid growth, blocking PerplexityBot in particular has a direct cost to potential AI referral traffic.

For most businesses  -  especially those serving local or regional markets where appearing in an AI-powered answer about "the best [service] near [city]" has real commercial value  -  blanket blocking is probably not the right call. The tradeoff is worth thinking through explicitly rather than copying a robots.txt template and moving on.

A targeted approach makes more sense: block training crawlers if you have reason to, while keeping retrieval crawlers unblocked to preserve your AI search presence.

---

## What to Actually Do to Be Crawlable and Citable

Good AI crawlability is not a separate discipline from good technical SEO. It is the same work, checked against the specific behaviors of AI crawlers. Here is a practical checklist:

**Page accessibility**
- Ensure all pages that contain meaningful content are accessible without login
- Remove unnecessary redirect chains that may cause crawlers to stop before reaching the content
- Confirm your robots.txt is not blocking crawlers you want to reach you
- Submit a clean XML sitemap so crawlers have a clear map of your content

**HTML and content structure**
- Use semantic HTML: actual `<h1>`, `<h2>`, `<h3>` elements rather than styled divs
- Write content in accessible, human-readable prose  -  plain sentences with clear subjects and verbs
- Do not rely on JavaScript to render text that matters for your visibility
- Avoid burying key information in PDFs when it could live on an HTML page

**Entity and business data consistency**
- Place your business name, address, phone, and category in crawlable HTML on relevant pages  -  not only inside image alt text or JavaScript
- Ensure this information is consistent across all pages, Google Business Profile, directory listings, and third-party sources
- Implement Organization or LocalBusiness schema markup to give crawlers a structured, authoritative record of your entity

**Structured data**
- Add FAQ schema to pages that answer common customer questions  -  AI search crawlers pay attention to Q&A formats
- Use Product, Service, or Review schema where appropriate
- Validate your markup regularly with Google's Rich Results Test to catch errors

**An `llms.txt` file**
Some organizations are adding an `llms.txt` file to their site root  -  a plain-text document that explicitly tells AI models which content is intended to be read and how the organization wants to be understood. This is an emerging convention, not a widely standardized one. It is worth knowing about. For businesses with complex site architectures or multiple audience segments, it can serve as a helpful guide for AI systems navigating your content.

---

## Measuring AI Crawler Activity on Your Site

There is a meaningful difference between a crawler visiting your site and an AI system citing you in an answer. Here is how to see both.

**Crawl activity**  -  whether AI bots are actually visiting your pages  -  shows up in server logs. If you have access to raw server logs or CDN access logs, you can filter by user agent strings like `GPTBot`, `ClaudeBot`, `PerplexityBot`, and `OAI-SearchBot` to see how frequently each crawler visits and which pages it is reading. Cloudflare's bot analytics surface this data at the traffic level for sites using Cloudflare.

**Referral traffic from AI sources** shows up in GA4. Look for traffic from referral sources including `perplexity.ai`, `chatgpt.com`, `claude.ai`, and `you.com` in your referral and source/medium reports. This is confirmed activity  -  real users who landed on your site after being pointed there by an AI system.

The gap between high crawl volume and low referral traffic tells you something. It may mean AI systems are reading your content but not finding it citable. It may mean your schema or structure is not giving crawlers enough to work with. Or it may simply mean your topic area does not generate high-volume AI search queries yet. Either way, tracking both dimensions gives you more information than watching only one.

---

## Closing

AI crawlers are not a new category of problem. They are a new category of reader  -  one that processes your content faster, at larger scale, and through a different lens than a human would.

The businesses that end up [cited in AI search results](/blog/how-ai-systems-decide-what-businesses-to-recommend/) are not necessarily the ones who did something specific to optimize for AI. They are the ones whose websites were already easy to parse, whose content was already clear and direct, whose business information was already consistent, and whose authority was already built through real citations and real reviews.

AI-powered discovery does not reward tricks. It rewards the same foundations that have always made digital marketing work: accessible content, a coherent entity, a credible reputation, and the kind of clear, direct writing that actually answers a question.

The crawlers are already on your site. The question is what they find when they get there.

---

## Take the Next Step

**[Download the AI Visibility Checklist](/resources/)**  -  a practical resource covering the content signals, technical factors, and citation benchmarks that influence how AI systems find and reference your business.

**Request an AI Visibility Diagnostic**  -  Carder Creative will audit your site's crawlability, structured data, entity consistency, and AI referral performance, and map out exactly where the gaps are. [Learn more about our AI visibility services and start the conversation.](/ai-visibility-services/)
