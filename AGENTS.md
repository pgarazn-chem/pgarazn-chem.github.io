# AGENTS.md — pgarazn-chem.github.io

Personal academic website for Pablo García Aznar, built on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme. The source branch is `main`; GitHub Actions builds the site and publishes it to `gh-pages` at <https://pgarazn-chem.github.io>.

Most work here is content, YAML configuration, or Liquid/CSS — not application code.

## Project premise

This is **not a generic al-folio template** and not the upstream demo site. It is Pablo García Aznar's personal academic site: a computational chemist finishing a PhD at ITQ (UPV-CSIC) and starting a postdoc at ENS de Lyon. The working goal is a professional, accessible upgrade:

- Make the research narrative clear: 2D catalysts, DFT, machine learning, sustainable chemistry.
- Make the most useful things easy to reach: publications, CV, email, ORCID.
- Improve visual polish and readability while keeping the site fast, accessible, and academic.
- Prefer targeted, reversible changes over wholesale template rewrites.

When in doubt, preserve real personal content and remove/hide demo content rather than inventing facts.

## Non-negotiables

- Never edit `_site/` or the `gh-pages` branch; both are generated.
- This is a **personal** GitHub Pages site: keep `url: https://pgarazn-chem.github.io` and `baseurl:` empty in `_config.yml`.
- Do **not** run `bin/deploy` unless explicitly asked — it rewrites and force-pushes `gh-pages`. Deployment normally happens automatically on push to `main`.
- Prettier must pass; formatting is a CI gate. Use the repo config, not generic line-width advice.

## Local development

```bash
docker compose pull && docker compose up    # http://localhost:8080
docker compose up --build                   # after Gemfile/Dockerfile/dependency changes
docker compose down
```

`bin/entry_point.sh` runs Jekyll with livereload. It restarts Jekyll only when `_config.yml` changes; other content rebuilds through Jekyll's watcher.

### Python environment (local, uv)

Use a project-local `.venv`; do not install Python packages globally.

```bash
uv venv --python 3.13 .venv
uv pip install --python .venv/bin/python -r requirements.txt
.venv/bin/python bin/update_scholar_citations.py   # citation updates
.venv/bin/rendercv render _data/cv.yml --settings assets/rendercv/settings.yaml
```

Re-run the `uv pip install` command after changing `requirements.txt`. `.venv` is gitignored. Keep `bibtexparser<2` pinned: `scholarly` 1.7.x still imports the v1 API and breaks on bibtexparser 2.x.

### Formatting and verification

```bash
npm ci                                 # when Node/npm is available
npx prettier . --write
npx prettier . --check
# In this workspace Node may be absent; Bun is available:
bun install --no-save
bun x prettier . --write
bun x prettier . --check
```

- `.prettierrc` sets `printWidth: 150` and enables `@shopify/prettier-plugin-liquid`.
- `_scripts/**` and `_data/citations.yml` are intentionally in `.prettierignore`; do not format `_scripts/` with Prettier.
- Pre-commit hooks also check trailing whitespace, EOF, YAML, and large files.

### Production-like build (without Docker)

```bash
JEKYLL_ENV=production bundle exec jekyll build
# CI then runs:
purgecss -c purgecss.config.js
```

Requires Ruby 3.3.5, ImageMagick, and an upgraded `nbconvert` (see `.github/workflows/deploy.yml`).

## Where content actually lives

- **Home / bio:** `_pages/about.md` — includes the primary CV/email/ORCID actions.
- **Research:** `_pages/research.md` — public research narrative at `/research/`.
- **Contact:** `_pages/contact.md` — email, CV, affiliations, and academic profiles.
- **CV:** `_data/cv.yml` (RenderCV format; `_pages/cv.md` selects `cv_format: rendercv`) and `assets/rendercv/*.yaml`. The CV PDF path appears in `_data/socials.yml`, `_pages/cv.md`, `_pages/about.md`, and `_pages/contact.md`; keep them in sync.
- **Publications:** `_bibliography/papers.bib`; the publications page uses jekyll-scholar via `{% bibliography %}`. Venue and coauthor data live in `_data/venues.yml` and `_data/coauthors.yml`. Author highlighting is configured for `García-Aznar` / `Pablo`. Mark featured papers with `selected = {true}`.
- **Contact and social links:** `_data/socials.yml`
- **Blog:** `_posts/YYYY-MM-DD-title.md` (hidden from the main nav)
- **News:** `_news/*.md` (`inline: true` entries appear on the home page)
- **Projects / teachings / books:** `_projects/`, `_teachings/`, `_books/`; these collections are `output: false`, and the demo index pages are hidden from navigation.

Much of `_posts/`, `_projects/`, `_books/`, `_teachings/`, `_pages/about_einstein.md`, and `_data/citations.yml` is still upstream demo content. Do not treat it as biographical or factual source material. `_pages/about_einstein.md` is explicitly excluded in `_config.yml`; `_pages/repositories.md` and `_pages/dropdown.md` are hidden demo pages.

## Design direction

- Accent color is a restrained academic blue/teal, defined in `_sass/_variables.scss` and applied in `_sass/_themes.scss`.
- Keep the public navigation focused: about, publications, research, CV, contact. Do not re-add demo pages (repositories, submenus, books) without a reason.
- Prefer clean typography, generous spacing, short paragraphs, and clear calls to action. Do not reintroduce template marketing language.
- Put reusable component styles in `_sass/_components.scss`; avoid inline styles and one-off layouts when an existing Bootstrap/al-folio component works.
- Accessibility is part of "better looking": maintain contrast, keyboard focus, alt text, and the skip-to-content link.

## CI/CD gotchas

- Pushing to `main` triggers **Deploy site**, a production build, and a push to `gh-pages` (changes usually appear after a few minutes).
- The main real gate is the **Prettier** workflow. `.github/workflows/broken-links.yml` is hard-coded to run only in `alshedivat/al-folio`, so it is skipped here; `broken-links-site.yml` checks the built `_site` after deployment.
- Editing `_data/cv.yml` triggers the RenderCV workflow, which regenerates and commits `assets/rendercv/rendercv_output/`. Do not hand-edit generated output there.
- `bin/update_scholar_citations.py` needs `scholar_userid` in `_data/socials.yml`. It is currently commented out, so the scheduled citation update cannot fetch new data.
- CI injects `giscus.repo` into `_config.yml` during the build; a blank local value is expected unless you are testing comments.

## Conventions and references

- Commit messages use `<type>: <subject>` with types `feat`, `fix`, `docs`, `style`, `config`, `chore`. Stage explicit paths, not `git add .`. See `.github/GIT_WORKFLOW.md`.
- Before large changes, read `.github/copilot-instructions.md` and the relevant path-specific guide in `.github/instructions/` (Markdown, YAML, BibTeX, Liquid, or JavaScript).
- For customization and content workflows, see `.github/agents/customize.agent.md`; for root-level documentation, see `.github/agents/docs.agent.md`.
- Site-wide behavior and feature flags are in `_config.yml`. When changing config, verify with a local build and check for YAML errors.
