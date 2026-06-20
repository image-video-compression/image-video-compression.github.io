# Image and Video Compression Survey

Interactive bibliography website for our IEEE TCSVT survey paper on image and video compression.

**Live site:** `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## Deploy to GitHub Pages (5 minutes)

### Step 1 — Create a GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it (e.g. `tcsvt-compression-survey`)
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Push the site

```bash
cd /Users/khawari/Documents/TCSVT_Survey
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under *Source*, select **Deploy from a branch**
3. Choose branch **main**, folder **/ (root)**
4. Click **Save**

Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/` within ~60 seconds.

> **Note:** The `.nojekyll` file is already included so GitHub Pages serves the JS data files correctly.

---

## Customise the site

Open `index.html` and replace the placeholder values:

| Placeholder | Replace with |
|---|---|
| `Author One` / `Author Two` … | Your real author names |
| `University A` / `University B` … | Author affiliations |
| `A1` / `A2` … (avatar initials) | Author initials |
| Abstract text | Your paper abstract |
| `https://github.com/YOUR_USERNAME/YOUR_REPO` | Your real repo URL |
| BibTeX block | Your real citation |
| `2025` (submission year) | Your submission year |

---

## File structure

```
TCSVT_Survey/
├── index.html          ← Main page (hero + bibliography)
├── submit.html         ← Submit a paper
├── papers.json         ← Bibliography data (610 papers)
├── submissions.json    ← User-submitted papers
├── css/style.css       ← All styles
├── js/
│   ├── app.js          ← Table, search, pagination
│   ├── charts.js       ← Chart.js visualisations
│   ├── papers-data.js  ← Inline paper data (auto-generated)
│   ├── venues-data.js  ← Venue dropdown data
│   └── submit.js       ← Submission form logic
└── .nojekyll           ← Required for GitHub Pages
```
