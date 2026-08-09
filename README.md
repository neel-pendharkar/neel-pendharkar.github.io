# Personal site

A modular, zero-build static site hosted by GitHub Pages.

## Structure

- `index.html` — semantic page shell
- `data/workout.json` — workout content; edit this to change the routine
- `assets/css/site.css` — visual design and responsive layout
- `assets/js/app.js` — renders exercises and remembers daily progress
- `archive/legacy-content.md` — content from the previous homepage
- `kubernetes/` — restricted development workload and private NodePort service

## Preview locally

Serve the directory with any static file server. For example:

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>.

The Kubernetes development deployment is available inside the tailnet at
<http://100.97.93.127:30107/>.
