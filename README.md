# TypeScript Lab

A personal learning app with 11 modules, coding exercises, strict TypeScript checks, behavioral tests, hints, solutions, saved drafts, and a final school appointment-service exercise.

## Development setup

1. Install Node.js 22 or newer. Python 3 is optional, needed only to regenerate curriculum data.
2. Extract the ZIP and open the `typescript-lab` folder in VS Code.
3. Open a terminal in that folder and run:

```bash
npm run dev
```

4. Visit http://localhost:8000.

The server reloads your browser when files inside `dist` change. Stop it with Ctrl+C. Unsaved editor changes in the app are saved to browser storage on each input. To use a different port in Windows PowerShell:

```powershell
$env:PORT=8080
npm run dev
```

No `npm install`, database, environment file, API key or build step is required. There are no npm dependencies. The browser-compatible TypeScript 5.9.3 compiler and its standard libraries are included.

### Checks

```bash
npm test
npm run check
```

The assessment verifier checks all worked solutions and ensures starter answers cannot pass. It does not test browser interactions.

### Edit modules

Edit `generate.py`, then run:

```bash
npm run curriculum
npm test
```

On macOS/Linux, if Python is named `python3`, run `python3 generate.py` instead. Generation updates `dist/modules.json`. Each module has lessons, examples, starter code, solutions, hints, runtime tests and compile-time contracts. UI changes go directly in the HTML, CSS and JavaScript files.

## Structure

| File | Purpose |
|---|---|
| `dist/index.html` | App layout |
| `dist/style.css` | Responsive styles |
| `dist/app.js` | Editor, navigation, progress export/import |
| `dist/runner.js` | Compiler checking and assessment execution |
| `dist/modules.json` | Generated curriculum |
| `dist/typescript.js`, `dist/lib/` | Bundled TypeScript compiler and type definitions |
| `generate.py` | Editable curriculum source |
| `verify.cjs` | Assessment verification |
| `dev.cjs` | Local development server with automatic reload |

The application is written in vanilla JavaScript. TypeScript is taught and compiled inside the exercises; this is not a Next.js or React project.

## Upload to GitHub

Create an empty GitHub repository. Run these commands in this folder, replacing YOUR_USERNAME and YOUR_REPOSITORY:

```bash
git init
git add .
git commit -m "Add TypeScript learning lab"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

If the repository already contains files, copy these files into its existing checkout and commit normally instead.

## Optional GitHub Pages deployment

The included workflow publishes `dist` when you push to `main`. In repository Settings → Pages, choose GitHub Actions as the source. All app assets use relative paths for compatibility with repository URLs. Pages is separate from the original private Site; check your repository and hosting visibility before publishing.

## Progress and practice limitations

Drafts and progress stay in the current browser and origin. Use Export progress and Import progress to move between devices or hosting locations. There are no user accounts or server-side storage.

Exercise code runs in a disposable Web Worker with a six-second timeout. This is personal practice assessment, not secure exam grading or a sandbox for hostile code. Solutions and tests are bundled in public assets. Use fictional school data in exercises. Passing the course is a foundation; rebuild exercises independently and continue with larger projects to develop fluency.

Optional browser WebMCP module navigation is included when supported; it was not tested in a supported browser context.

## Third-party licensing

TypeScript is licensed under Apache 2.0. Preserve `dist/TypeScript-LICENSE.txt` and `dist/TypeScript-ThirdPartyNoticeText.txt`. A license for the original app code has not been selected; add your preferred LICENSE before inviting others to reuse it.
