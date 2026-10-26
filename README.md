# Louise' Arsenal — Portfolio

Personal portfolio of **John Louise R. Bergabeña**, an IT graduate and web developer based in
Toledo City, Cebu, Philippines.

Built as a dependency-free static site (HTML + CSS + vanilla JS) and deployed on GitHub Pages / Vercel.

## Sections

- **Hero** — introduction, availability, résumé download
- **About** — background, quick facts, education timeline, skills & tools
- **Projects** — three featured systems built for Toledo City CDRRMO
  ([CDRRMO resilience portal](https://tcdrrm.vercel.app), Fieldnote situational report maker,
  CBTU personnel & partner logbook) plus earlier academic builds
- **Internship** — OJT at Toledo City CDRRMO, with photo gallery
- **Certifications** — HackerRank and SoloLearn credentials, viewable in a modal
- **Credentials** — résumé download and portfolio declaration
- **Contact** — contact details, socials, and a FormSubmit-powered message form

## Structure

```
index.html      # all markup
style.css       # design tokens, layout shell, nav, hero, footer
sections.css    # about, projects, internship, certifications, contact, modals
script.js       # nav, scroll effects, reveal animations, gallery, modals, form
images/         # optimized project screenshots and portraits (WebP)
files/          # certificates, résumé, downloadable assets
```

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

No build step, no package manager required.
