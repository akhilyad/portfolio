# Akhil Yadav – Portfolio

Personal portfolio built from the CV in `assets/files/Akhil_Yadav_Controls_Engineer_CV.pdf`. Plain HTML, CSS and JavaScript: no build step, no framework, no dependencies besides the Manrope web font.

The visual language is an "industrial technical console": a cool slate/cloud light palette, white cards on soft hairline edges with a diffuse ambient shadow, and a royal industrial blue accent. The layout is built on [vCard](https://github.com/codewithsadee/vcard-personal-portfolio) by codewithsadee (MIT, see `LICENSE`): a contact sidebar plus tabbed pages, with the nav at the bottom below 1024px and top-right from 1024px, where the sidebar also becomes a 290px sticky column beside the content.

## Pages

Tabs run in this order, so proof of work comes straight after the summary:

| Tab | Content |
| --- | --- |
| About | Summary, six Engineering Scope cards (each with a standards footnote), and the Systems & Industrial Platforms badge grid |
| Projects | Industrial Projects & Technical Studies: three industrial projects and four modelling and analytics studies as a one-column stack (visual left, text right once the card has room: tablets and windows from about 1220px), with a filter tab bar; project visuals open full size |
| Skills | The seven CV skill groups, certifications, languages |
| Resume | Experience and education timeline with every CV bullet (the CV download lives only in the sidebar) |
| Contact | Email (with a Copy button), LinkedIn, phone and GitHub cards |

Tabs are mirrored in the URL hash, so `index.html#resume` links straight to a page and the back button works. Any element with `data-nav-link="<page>"` switches pages, such as the "let's connect" link in the summary; only navbar tabs show the current page.

The Systems & Industrial Platforms grid uses uniform badge plates: logos are contained at 64px, and the CENTUM and STARDOM product shots fill their plate without distortion. ABB 800xA is the wide featured badge with a "Certified" stamp. Images live in `assets/images/toolbox/` and `assets/images/projects/`.

## Design tokens

All visual values live in the `#TOKENS` block at the top of `assets/css/style.css`:

- **Colour:** page `#F0F4F9`, cards `#FFFFFF`, insets and plates `#E8EEF5`; ghost chips `#F8FAFC` on a `#E2E8F0` hairline (the Tools card tints them blue); borders `#D8DFE8` / `#BCC7D4`; ink `#1E293B` / `#475569` / `#64748B`; accent `#0052CC` (hover `#2563EB`). A faint 40px engineering grid sits behind the cards. Light scheme only.
- **Type:** Manrope, sizes 12 / 14 / 16 / 18 / 24 / 26 / 32 px, two weights (400 and 600), 24px line height. JetBrains Mono (400, 600) for technical labels, context tags, chips and standards footnotes.
- **Spacing:** the 16-step scale from 5px to 100px, plus 16px and 24px card-rhythm steps; the page gutter is 16px below 768px and 30px from 768px.
- **Radius:** `0 20px`, 6 (chips), 8, 12, 14, 20 and 30px.
- **Elevation and motion:** resting cards use a two-layer ambient shadow (1px contact plus a soft 25px spread), buttons a 1px-3px one, hover and the floating nav a slightly deeper one, dialogs the deepest; 0.25s, 0.3s and 0.5s transitions.

Components reference tokens only. Every interactive element has hover, focus-visible and active states. Animations switch off for visitors who prefer reduced motion.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 5173
```

then visit <http://localhost:5173>.

## Editing

All content lives in `index.html`; there is no data file.

- **Projects:** each card is one `<li class="work-card">`: a 16:9 visual (260px wide beside the text on tablets, 300px on wide desktop cards, full width above the text otherwise), then a `work-body` holding the context and title, bullets, and a `work-foot` footer: chips, plus an optional `work-link` to an outbound file. The footer is the same on every card and pins to the bottom edge. To add one, copy a card and set `data-category` to one or more of `dcs`, `safety`, `solar`, `modelling`, separated by spaces. The filter counts update themselves. Every visual is the same 16:9 frame; pick one modifier: `work-visual-cover` for photos (full bleed) or `work-visual-plate` for diagrams and logos (contained at 80% on a `#E8EEF5` plate, multiply-blended so white-backed artwork takes the plate tone). The lightbox letterbox takes the card's frame colour; plates open on white.

- **Photo:** `assets/images/avatar.jpg` is the headshot, shown as a circle. Replace it with any square photo (ideally 300px or larger for sharp high-DPI screens); if the file is missing, the "AY" monogram shows instead.
- **CV download:** replace `assets/files/Akhil_Yadav_Controls_Engineer_CV.pdf` when the CV changes. The sidebar button opens it in a new tab and saves it under the same file name.
- **Contact:** there is no form. The email card's Copy button copies its `data-copy` value; where the Clipboard API is blocked it falls back to selecting and copying the address the older way.

## Deploy

Any static host works. This folder is pushed to <https://github.com/akhilyad/myportfolio> and served by GitHub Pages (Settings > Pages > deploy from the `main` branch, `/ (root)`) at <https://akhilyad.github.io/myportfolio/>, the address printed on the CV. All asset paths are relative (`./assets/...`), so the site works from that sub-path. The earlier Next.js version of the site is still in the repo history. The empty `.nojekyll` file tells Pages to serve the files as they are instead of running them through Jekyll, which keeps deploys fast. Static hosts cache aggressively, so after changing CSS or JS a visitor may need a hard refresh.

## Credits and licence

Layout adapted from vCard, Copyright (c) 2022 codewithsadee, MIT licensed (`LICENSE`). Icons are inline Feather-style strokes plus custom line art. The CV text and personal details are Akhil Yadav's own and are not covered by that licence.
