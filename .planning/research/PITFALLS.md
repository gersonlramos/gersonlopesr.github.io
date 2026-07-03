# Pitfalls Research

**Domain:** Personal portfolio website for a hybrid Data Scientist / Data Engineer, hosted on GitHub Pages
**Researched:** 2026-07-03
**Confidence:** MEDIUM-HIGH (technical GitHub Pages/Jekyll pitfalls verified against official GitHub Docs and jekyll/jekyll issue tracker; content/positioning pitfalls synthesized from multiple independent career-advice sources — treat those as directional, not absolute)

## Critical Pitfalls

### Pitfall 1: Portfolio reads as a list of tutorials, not real work

**What goes wrong:**
The project list is a set of links to notebooks/repos with titles like "Titanic Survival Prediction" or "Customer Churn Analysis (Kaggle dataset)" and no framing. Visitors (especially recruiters skimming for seconds) can't tell this apart from a bootcamp homework list. This is the single most cited failure mode in data science portfolio critiques.

**Why it happens:**
Data professionals default to describing artifacts they already have (notebooks, repos) rather than re-framing them as "case studies" written for an outside reader. It's also just easier to link to what already exists than to write a narrative on top of it.

**How to avoid:**
- Every project gets a case-study page (not just a repo link) with a consistent structure: problem/context → approach/decisions → tools → result/impact.
- Avoid framing projects primarily by dataset name (e.g. "Titanic") — frame by the problem solved and the decision it enabled.
- Prefer projects built on non-generic data sources (own scraped data, real company data with details anonymized, Kaggle data reframed around a business question) over off-the-shelf tutorial datasets.

**Warning signs:**
- Project titles are dataset names, not problem statements.
- Project pages are literally an embedded notebook with no surrounding prose.
- Someone unfamiliar with the field can't explain in one sentence what each project is for.

**Phase to address:**
Content/case-study definition phase (before any project write-up is finalized) — this is a content-model decision, not something to retrofit after all case studies are written.

---

### Pitfall 2: No personal narrative or positioning — portfolio is generic

**What goes wrong:**
The "About" section is a plain bio/résumé restatement ("I am a data scientist with 3 years of experience in Python, SQL, ML...") with no clear value proposition — what kind of problems this person solves, for whom, and why they're distinctively good at it. Recruiters/clients land on a page indistinguishable from thousands of others.

**Why it happens:**
Technical professionals are trained to document facts (skills, tools, years) not to write positioning copy. Writing "why me" feels like self-promotion and is uncomfortable, so it gets skipped or reduced to a skills list.

**How to avoid:**
- Open the About/hero section with one sentence that states the professional's niche (e.g. hybrid DS/DE profile, the kinds of problems solved, the industries or project types of focus) — not a job-title restatement.
- Because this profile is intentionally hybrid (DS + DE), make the hybrid nature itself part of the pitch (e.g. "builds the pipeline and the model that runs on it") rather than presenting two disconnected skill lists.
- Validate the narrative against the stated goal ("sell capabilities") — every section should answer "so what does this mean for someone hiring/collaborating."

**Warning signs:**
- About section could be copy-pasted onto any other data professional's site without edits.
- No sentence on the homepage explains what makes this profile distinct (hybrid DS/DE, domain focus, etc).

**Phase to address:**
Content strategy / narrative phase, early — ideally before individual case studies are written, since the narrative should inform which projects get featured and how they're framed.

---

### Pitfall 3: Project write-ups describe code, not business/decision reasoning

**What goes wrong:**
Case studies list libraries and steps ("used pandas to clean the data, trained a RandomForest, got 0.89 F1") but never explain the "why" behind decisions or connect the work to an outcome. The project reads as technically competent but purpose-less — exactly the failure mode the project's own Core Value statement (PROJECT.md) is designed to avoid.

**Why it happens:**
It's much easier to narrate what code does (the author already knows this) than to reconstruct and articulate the reasoning and impact after the fact — that requires stepping back and thinking about the reader's perspective, not the code's.

**How to avoid:**
- Enforce a mandatory case-study template with explicit sections for: problem/context, why this approach (not just what), trade-offs considered, and result/impact (even if impact is estimated/simulated for personal/Kaggle-based projects — state that plainly rather than omitting it).
- For DE projects, translate technical outcomes into business-legible statements (e.g. "reduced pipeline runtime from 4h to 40min" or "automated a previously manual daily report") rather than only architecture description.
- End every case study with an explicit "so what" — a recommendation, decision enabled, or outcome — not just a metric.

**Warning signs:**
- A case study could be summarized entirely by its code diff.
- No sentence in the write-up would make sense to a non-technical hiring manager.
- Impact/result section is missing or vague ("this could be useful for...").

**Phase to address:**
Content/case-study phase — should be enforced via a template used for every project, not fixed per-project after the fact.

---

### Pitfall 4: Jekyll `baseurl` / relative path misconfiguration breaks the deployed site

**What goes wrong:**
Site looks correct when tested locally (`jekyll serve`) but CSS, images, or internal links break once deployed to GitHub Pages — classic symptom is an unstyled, "naked HTML" page in production. Root cause is nearly always inconsistent use of `site.baseurl`/`site.url` (or hardcoded absolute paths like `/css/style.css`) combined with GitHub Pages serving user sites at the domain root but project sites (`username.github.io/repo`) under a subpath.

**Why it happens:**
Local dev server and GitHub Pages serve the site from different base paths unless explicitly configured, and many Jekyll themes/tutorials assume one or the other. Developers copy asset paths from a theme without checking whether it matches user-site vs project-site hosting.

**How to avoid:**
- Confirm early which GitHub Pages hosting mode is used: user/organization site (`username.github.io`, served at domain root, `baseurl` should be empty) vs project site (`username.github.io/reponame`, needs correct `baseurl: "/reponame"`).
- Use Jekyll's `relative_url`/`absolute_url` Liquid filters (or `{{ site.baseurl }}`) consistently for all internal asset/link references — never hardcode root-relative paths.
- Test the production build (`bundle exec jekyll build` + serve the `_site` output, or push to a test branch and check the live Pages URL) before trusting local `jekyll serve` results, since local serve can mask baseurl bugs.

**Warning signs:**
- Site works in local dev but is unstyled/broken once live on the `github.io` URL.
- Links work when clicking from the homepage but 404 when navigating deeper (or vice versa).

**Phase to address:**
Technical setup/scaffolding phase — should be verified as part of the initial deploy pipeline, before content is layered on top.

---

### Pitfall 5: GitHub Pages Jekyll build fails silently or unpredictably (unsupported plugins, malformed front matter, Liquid errors)

**What goes wrong:**
Push succeeds, but the live site doesn't update — GitHub Pages' Jekyll build failed and (depending on notification settings) this can go unnoticed. Common causes per GitHub's own docs: using plugins not in the GitHub Pages allow-list, invalid dates in front matter (must be real calendar dates, `YYYY-MM-DD`), invalid Sass/SCSS, invalid Liquid syntax, or leftover `relative_permalinks` config (no longer supported).

**Why it happens:**
GitHub Pages' built-in Jekyll processor runs in a restricted "safe mode" with a limited, versioned plugin whitelist — different from an arbitrary local Jekyll install where any gem/plugin can be added. Developers install a plugin locally, it works in `jekyll serve`, then fails silently in GitHub's build.

**How to avoid:**
- Prefer deploying via a GitHub Actions workflow that runs `bundle exec jekyll build` in a controlled environment and uploads the artifact, rather than relying on GitHub's legacy built-in Jekyll processor — this removes the plugin whitelist restriction and makes build failures visible as a failed Actions run (with logs) rather than a silent no-op. GitHub's own docs now recommend GitHub Actions as the preferred deployment method.
- If using the legacy built-in processor, check the repository's Pages build history/email notifications after every push, don't assume success.
- Validate front matter dates and Liquid syntax; avoid deprecated config keys like `relative_permalinks`.

**Warning signs:**
- Site content visibly stale relative to the last commit.
- GitHub sends (or would send) a build-failure email that gets missed because notifications aren't checked.

**Phase to address:**
Technical setup/scaffolding phase — deployment pipeline choice (Actions vs legacy) should be decided upfront, since switching later requires rework.

---

### Pitfall 6: Custom domain + HTTPS gets stuck or never provisions

**What goes wrong:**
A custom domain is added, DNS "looks fine" in nslookup, but the "Enforce HTTPS" checkbox stays greyed out indefinitely, or the cert never issues. This is a well-documented, frequently recurring GitHub Pages problem.

**Why it happens (verified via GitHub Docs + community discussions):**
- Conflicting DNS records at the apex (`@`) — e.g. both `ALIAS/ANAME` and `A` records, or leftover records not pointing at GitHub Pages IPs — cause Let's Encrypt cert provisioning to silently get stuck even though basic DNS resolution looks correct.
- Using Cloudflare (or similar) with the proxy ("orange cloud") enabled hides the real DNS records from GitHub, blocking cert issuance — must be set to "DNS only" for the records pointing at GitHub Pages.
- A CAA record exists without an entry authorizing `letsencrypt.org`, which blocks issuance entirely.
- Static site generators or deploy scripts that force-push can overwrite the `CNAME` file created when the custom domain was configured, silently un-setting the custom domain.
- Cert issuance can legitimately take up to an hour, and "Enforce HTTPS" up to 24 hours — panicking and re-configuring mid-wait can restart the clock.

**How to avoid:**
- Set up custom domain DNS with only the records GitHub's docs specify (4 GitHub Pages A records + optionally one CNAME/ALIAS for `www`), remove any conflicting apex records.
- If using Cloudflare or another proxying DNS provider, disable proxy ("grey cloud") for the relevant records.
- Add a CAA record permitting `letsencrypt.org` if any CAA record exists.
- Ensure the `CNAME` file is committed to the repo and not overwritten by build tooling; if deploying via Actions/build scripts, explicitly preserve/re-add it.
- Wait the documented provisioning windows before troubleshooting further.

**Phase to address:**
Deployment/launch phase — this is a one-time infra setup, but should be scheduled with buffer time (hours, not minutes) before any "go live" deadline, since propagation and cert issuance are not instant.

---

### Pitfall 7: Large notebook exports / unoptimized images cause slow load times

**What goes wrong:**
Case study pages embed exported notebook HTML or many full-resolution screenshots/plots, resulting in multi-MB pages. Research on load-time/bounce correlation indicates the probability of visitors bouncing increases significantly as load time goes from 1s to 3s+ — directly undermining a portfolio's job of holding a recruiter's attention in a short window.

**Why it happens:**
Notebook/plot exports (especially with embedded PNGs from `matplotlib`/`seaborn` at default or retina resolution) are not optimized for web by default, and it's easy to paste them directly into a case-study page without resizing or compressing. A single unoptimized export can carry many MB of embedded base64 images.

**How to avoid:**
- Never embed raw `nbconvert --to html` output directly in a page (it also brings inconsistent styling, see Pitfall 8) — extract only the specific figures/tables needed and compress them.
- Resize images to the actual display width used by the site's layout (commonly 1200-2000px is enough) rather than shipping camera/plot-native resolution.
- Compress PNG/JPG assets (target well under 500KB per image) before committing them to the repo.
- If interactivity is genuinely valuable, prefer linking out to a hosted notebook (nbviewer, Colab, or the GitHub repo itself) rather than inlining the full notebook — keep the portfolio page itself lightweight and use it as the narrative layer.

**Warning signs:**
- Case study pages take noticeably longer to load than the homepage.
- Repo size balloons from committed image/notebook assets.
- Mobile data testing (not just desktop broadband) shows multi-second load times.

**Phase to address:**
Content/case-study production phase — should be a checklist item ("images optimized, notebooks not inlined raw") applied to every case study before publishing, and ideally automated via a pre-commit or CI image-size check.

---

### Pitfall 8: Embedding full Jupyter notebook exports breaks page styling/layout

**What goes wrong:**
Directly dropping an `nbconvert`-generated full HTML export into a page (or an iframe pointing at it) produces visual inconsistency — the notebook's own styling doesn't match the site's theme, and iframe height must be manually set or it clips/scrolls awkwardly.

**Why it happens:**
`nbconvert`'s full-document template ships its own CSS; it isn't designed to be merged into an arbitrary site's design system. The "basic" template is meant for embedding but still requires manual integration work most people skip.

**How to avoid:**
- Use `nbconvert --to html --template basic` (or `--template lab`/custom) and manually integrate the output into the site's own layout/CSS rather than iframing a full-document export.
- If an iframe is unavoidable, auto-resize it to content height via JS rather than a fixed height, and treat it as a fallback, not the primary format.
- Prefer converting the meaningful excerpts (code + key output/plots) into the site's own Markdown/HTML rather than embedding the whole notebook — this also directly supports Pitfall 1/3 fixes (narrative framing) since raw notebook exports read as tutorials, not case studies.

**Phase to address:**
Content/case-study phase — decide the "how case studies present code/output" pattern once, early, and apply consistently rather than solving it per-project.

---

### Pitfall 9: No clear call-to-action or contact path

**What goes wrong:**
Visitor finishes reading and has no obvious next step — contact info buried, no direct email/LinkedIn link near the top, or the only way to reach out is scrolling to a footer. Since this site is explicitly meant to act as a "hub" connecting to LinkedIn/Kaggle/GitHub (per PROJECT.md), a missing or weak CTA directly undermines the stated purpose.

**Why it happens:**
Technical builders focus on demonstrating capability (projects) and treat "contact" as an afterthought utility page rather than a primary conversion point.

**How to avoid:**
- Make contact/profile links (email, LinkedIn, GitHub, Kaggle) visible from every page — not just a dedicated Contact page — e.g. persistent header/footer links.
- Add a direct CTA at the end of the About section and after project highlights, not only on a separate "Contact" page.
- Keep the path to "real" profiles (LinkedIn especially, since that's likely where recruiters take the next action) to one click from anywhere on the site.

**Warning signs:**
- Contact info requires navigating to a dedicated page with no shortcuts elsewhere.
- No links to LinkedIn/Kaggle/GitHub visible above the fold on any page.

**Phase to address:**
Content/structure phase (navigation and layout decisions) — should be part of the site's base template, not a per-page afterthought.

---

### Pitfall 10: Cluttered navigation / too many sections dilutes the message

**What goes wrong:**
Extra pages get added over time (a blog stub, a "skills" page, a "certifications" page, a "testimonials" page) beyond the essential structure, diluting focus and increasing the chance a time-constrained visitor misses the important parts (projects, case studies, contact). Recruiters reportedly spend only seconds to a few minutes reviewing a portfolio, so every extra nav item is direct competition for attention.

**Why it happens:**
More sections feel like "more to show," and it's tempting to add every possible category of professional content. This also happens when scope creep pulls in ideas explicitly marked "out of scope" for v1 (per PROJECT.md, blog is deferred to v2).

**How to avoid:**
- Cap top-level navigation at the essential items already scoped in PROJECT.md: About, Projects, Experience, Contact (4 items) — resist adding more without a strong reason.
- Any new content idea should be evaluated against "does this help a recruiter decide in under a minute," not "is this true/interesting about me."
- Explicitly defer blog/extra sections to v2 as already decided, rather than letting them creep back in mid-build.

**Warning signs:**
- Top nav grows past 5-6 items.
- New pages get added that aren't in the original PROJECT.md requirements list.

**Phase to address:**
Content/structure phase, and should be re-checked at any milestone/scope-review point (per PROJECT.md's evolution process) to prevent scope creep.

---

### Pitfall 11: Portfolio content goes stale (outdated projects, dead links, old "currently" statements)

**What goes wrong:**
Site launches, then isn't revisited — project list stops reflecting the best recent work, external profile links break (LinkedIn URL changes, Kaggle rename), or text says things like "currently working on X" long after it's no longer true. An outdated portfolio signals inactivity, which is particularly damaging for a project whose explicit goal is continuous authority/visibility building (per PROJECT.md's "Context" section), not a one-time job search.

**Why it happens:**
Because this is a static site with no CMS (an explicit, deliberate constraint per PROJECT.md), updating requires editing files and redeploying — friction that's easy to defer indefinitely once the initial launch excitement fades.

**How to avoid:**
- Establish a lightweight content-maintenance cadence (e.g. quarterly review) as an explicit habit/checklist, not just a technical feature.
- Avoid time-sensitive language ("currently learning X," "as of 2026") in evergreen sections; where dates matter (e.g. project completion), state them explicitly so staleness is visible/intentional rather than ambiguous.
- Periodically verify external links (LinkedIn, Kaggle, GitHub) still resolve, since these are outside this project's control and can silently break.

**Warning signs:**
- No project added/updated in 6+ months.
- Bio references outdated role, employer, or "current" activity no longer accurate.

**Phase to address:**
Not a build phase per se — this is a post-launch maintenance practice. The roadmap should still note it (e.g. as a "definition of done" caveat or a short post-launch checklist) so it isn't silently dropped once the initial build phases complete.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|--------------------|-----------------|------------------|
| Using GitHub's legacy built-in Jekyll build (no Actions workflow) | Zero config, "just works" for a plain Jekyll theme | Restricted plugin whitelist, silent build failures, harder to debug | Acceptable for a very simple, plugin-free theme in v1; migrate to a GitHub Actions workflow if any custom plugin or build step is needed |
| Embedding full raw `nbconvert` HTML exports instead of curating content | Fast to publish an existing notebook as a "case study" | Inconsistent styling, slow pages, reads as tutorial not case study (reinforces Pitfall 1) | Never acceptable for the primary case-study format; only acceptable as a secondary "view full notebook" link |
| Skipping image optimization on first publish | Saves time during initial content push | Slow pages, worse mobile experience, higher bounce | Only acceptable temporarily if a pre-launch checklist item exists to fix it before final "done" |
| Hardcoding absolute paths (`/css/style.css`) instead of using `baseurl`/`relative_url` | Simpler to write initially | Breaks if hosting mode changes (user site vs project site) or repo is renamed | Acceptable only for a user site (`username.github.io`) that will never change domains/repo name — otherwise never |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|-----------------|--------------------|
| GitHub Pages (custom domain) | Assuming DNS "looking fine" in a basic check means HTTPS will provision | Verify exact record set matches GitHub's documented A/ALIAS records, check for conflicting CAA records, and account for up to ~1hr (cert) / 24hr (enforce HTTPS) provisioning delay |
| Cloudflare DNS + GitHub Pages | Leaving Cloudflare's proxy ("orange cloud") enabled on records pointing to GitHub Pages | Set relevant DNS records to "DNS only" (grey cloud) so GitHub can see/verify them for cert issuance |
| Jekyll + GitHub Pages plugins | Adding a plugin that works locally but isn't on GitHub Pages' safe-mode whitelist | Check the plugin against GitHub Pages' supported list, or switch to a GitHub Actions build (which lifts the restriction) |
| LinkedIn/Kaggle/GitHub profile links | Hardcoding profile URLs once and never revisiting them | Periodically verify these external links still resolve as part of a maintenance check |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|-----------------|
| Unoptimized notebook plot images (full-resolution PNG exports) | Case study pages take multiple seconds to load, especially on mobile | Resize to actual display width, compress before committing | Immediately noticeable even at v1 scale — this is a launch-day risk, not a future-scale issue |
| Repo growing large from committed raw datasets/large images | Slow clones, slow CI, GitHub soft repo-size warnings | Keep datasets out of the repo (link to source or a small sample); use Git LFS or external storage for anything non-trivial | Becomes a real problem once repo exceeds roughly 1GB (GitHub's general guidance threshold), well within reach if raw data/notebooks are committed carelessly |
| Iframe-embedded full notebook exports with fixed height | Content clipped or excessive whitespace across different notebooks | Use JS auto-resize, or avoid iframes for primary content | Breaks per-project as soon as notebook output length varies at all |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Committing API keys/credentials used to fetch project data into a public repo (common in DE pipeline projects) | Public exposure since GitHub Pages repos are public by nature | Never commit secrets; use `.gitignore` for local config, and if a live pipeline demo needs credentials, use a separate private repo/service and only publish outputs/screenshots on the portfolio |
| Exposing real employer/client data or proprietary details in a "real project" case study | Breach of confidentiality/NDA, legal risk | Anonymize/generalize any employer-derived project details; when in doubt, reframe as a similar personal/synthetic reproduction rather than the real dataset |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|--------------|--------------------|
| Homepage doesn't state who this person is/what they do within the first screen | Visitor bounces before understanding the value proposition | Lead with a one-line positioning statement + hybrid DS/DE framing above the fold |
| Project list with no filtering/grouping when both DS and DE projects are mixed | Visitor (e.g. a recruiter specifically hiring for DE) can't quickly find relevant work | Tag or group projects by type (DS/DE) so either persona can quickly filter to relevant work, even in a simple static-site way (e.g. category labels) |
| Case studies with no consistent structure across projects | Visitor has to re-orient for every project, increasing cognitive load and reducing time spent per project | Apply one consistent case-study template (problem → approach → tools → impact) across all projects |
| Contact/profile links only in a footer or dedicated page | Visitor loses momentum before converting to a LinkedIn/email contact | Keep contact/profile links persistently visible (header/footer on every page) |

## "Looks Done But Isn't" Checklist

- [ ] **Case studies:** Often missing an explicit "impact/result" section — verify every project write-up ends with a stated outcome or recommendation, not just a metric or "conclusion."
- [ ] **Deployment:** Often "works locally" but breaks live — verify the actual deployed GitHub Pages URL (not just `jekyll serve`) renders correctly with all CSS/assets before considering a phase done.
- [ ] **Custom domain/HTTPS:** Often looks configured (DNS resolves) but HTTPS never actually enforces — verify "Enforce HTTPS" is checked and functional in GitHub repo settings, not just that the domain loads over HTTP.
- [ ] **Mobile responsiveness:** Often tested only via browser dev-tools resize, not real devices — verify on an actual phone (or at minimum, throttled network + real viewport), since images/iframes can behave differently than a simple viewport resize suggests.
- [ ] **Contact/CTA:** Often present but buried — verify a first-time visitor can find a way to contact/connect within one click from the homepage, About, and any project page.
- [ ] **Content freshness:** Often accurate at launch but silently ages — verify no unqualified "currently..." language exists that will look stale in 6 months.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|-----------------|--------------------|
| Portfolio reads as tutorials (Pitfall 1/3) | MEDIUM | Rewrite existing case studies against the standard template; no code changes needed, just content rework per project |
| Baseurl/path misconfiguration (Pitfall 4) | LOW | Audit all asset/link references, switch to `relative_url`/`absolute_url` filters, redeploy and verify live |
| Custom domain HTTPS stuck (Pitfall 6) | LOW-MEDIUM | Re-check DNS records against GitHub's documented list, remove conflicting records/disable proxying, wait out provisioning windows |
| Slow-loading case studies from unoptimized images (Pitfall 7) | LOW | Batch-resize/compress existing images, replace in repo, no structural changes needed |
| Cluttered navigation (Pitfall 10) | LOW | Consolidate/remove non-essential pages back to the core 4 (About/Projects/Experience/Contact) |
| Stale content (Pitfall 11) | LOW (if caught early) / MEDIUM (if long neglected, requires broad content refresh) | Scheduled quarterly review; update project list, verify external links, refresh dated language |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|--------------------|-------------------|
| Portfolio reads as tutorials, not real work (1) | Content/case-study definition phase | Each project page follows problem→approach→tools→impact template; no page is a bare notebook/repo link |
| No personal narrative/positioning (2) | Content strategy/narrative phase (before case studies) | Homepage/About states a one-sentence value proposition distinct from a generic bio |
| Write-ups describe code, not reasoning/impact (3) | Content/case-study phase | Every case study has an explicit stated outcome/impact/decision, reviewable against template |
| Baseurl/path misconfiguration (4) | Technical setup/scaffolding phase | Deployed GitHub Pages URL (not local serve) renders with correct styling/links |
| Jekyll build fails silently (5) | Technical setup/scaffolding phase | Deployment pipeline (ideally GitHub Actions) chosen upfront; a test push confirms a visible build status/log |
| Custom domain/HTTPS misconfig (6) | Deployment/launch phase | "Enforce HTTPS" enabled and functioning in repo settings; verified with buffer time before any launch deadline |
| Slow load from large notebook/image assets (7) | Content production phase | Each case study's page weight/image sizes checked before publishing (checklist or automated size check) |
| Raw notebook embeds break styling (8) | Content/case-study phase | Case-study format decided once (curated HTML/Markdown, not raw nbconvert iframe) and applied consistently |
| No clear CTA/contact path (9) | Content/structure phase (base template) | Contact/profile links visible on every page template, not just a dedicated Contact page |
| Cluttered navigation (10) | Content/structure phase | Top nav has ≤4-6 items matching PROJECT.md's scoped structure (About/Projects/Experience/Contact) |
| Stale content over time (11) | Post-launch maintenance (not a build phase, but should be documented as ongoing practice) | A recurring (e.g. quarterly) review checklist exists and is referenced at milestone completion |

## Sources

- [About Jekyll build errors for GitHub Pages sites — GitHub Docs](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-jekyll-build-errors-for-github-pages-sites)
- [Troubleshooting Jekyll build errors for GitHub Pages sites — GitHub Docs](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/troubleshooting-jekyll-build-errors-for-github-pages-sites)
- [Troubleshooting custom domains and GitHub Pages — GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)
- [Securing your GitHub Pages site with HTTPS — GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Custom domain HTTPS not available even after DNS check successful — GitHub community discussion](https://github.com/orgs/community/discussions/184514)
- [Enforce HTTPS unavailable discussion — GitHub community](https://github.com/orgs/community/discussions/62225)
- [Jekyll's site.url and baseurl — Made Mistakes](https://mademistakes.com/mastering-jekyll/site-url-baseurl/)
- [baseurl/base-url project pages relative links issue — jekyll/jekyll#332](https://github.com/jekyll/jekyll/issues/332)
- [Absolute URL to main.css breaks styles on subdirectories — jekyll/jekyll#3639](https://github.com/jekyll/jekyll/issues/3639)
- [Converting NB to HTML and embedding without breaking CSS — jupyter/nbconvert#226](https://github.com/jupyter/nbconvert/issues/226)
- [Share your Jupyter Notebooks like a pro — blog.derlin.ch](https://blog.derlin.ch/share-your-jupyter-notebooks-like-a-pro/)
- [5 Portfolio Mistakes That Keep Data Scientists From Getting Hired — KDnuggets](https://www.kdnuggets.com/5-portfolio-mistakes-that-keep-data-scientists-from-getting-hired)
- [5 Data Science Portfolio Mistakes — Towards Data Science / Shawhin Talebi](https://medium.com/data-science/5-data-science-portfolio-mistakes-52f6e0ebbe4a)
- [How I Designed My Data Science Portfolio — Towards Data Science](https://towardsdatascience.com/how-i-designed-my-data-science-portfolio-f05f51ebfd9b/)
- [Building a Data Science Portfolio: Storytelling with Data — Dataquest](https://www.dataquest.io/blog/data-science-portfolio-project/)
- [The Data Engineer's GitHub Portfolio (2026 Edition) — pipeline2insights](https://pipeline2insights.substack.com/p/how-to-create-data-engineering-data-engineers-github-portfolio-in-2026)
- [Data Engineering Portfolio: 5 Projects That Get Hired — dataexpert.io](https://www.dataexpert.io/blog/data-engineering-portfolio-projects-get-hired)
- [Why Your Photography Portfolio Site Loads Slowly — FilterGrade (load-time/bounce data, general web-perf principle applied to portfolio context)](https://filtergrade.com/why-your-portfolio-site-loads-slowly/)
- [Common mistakes when creating a portfolio — Wix](https://www.wix.com/blog/common-portfolio-mistakes)
- [12 Things You Should Remove From Your Portfolio Website Immediately — Matt Olpinski](https://mattolpinski.com/articles/fix-your-portfolio/)
- [Personal Portfolio: Structure, Examples and Templates — uxfol.io](https://blog.uxfol.io/how-to-create-a-personal-portfolio/)

---
*Pitfalls research for: Personal data science/data engineering portfolio on GitHub Pages*
*Researched: 2026-07-03*
