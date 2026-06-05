<h1 align="center">
vikindor.github.io
</h1>

<div align="center">

[![pages](https://img.shields.io/badge/GitHub%20Pages-live-brightgreen)](https://vikindor.github.io/)

</div>

Source code of my personal website containing portfolio and pet projects, hosted on GitHub Pages.  
The site is lightweight and framework-free, focusing on clean markup, simple structure, and maintainability.

## 🌐 Live

**https://vikindor.github.io/**

## 🛠️ Tech stack

- HTML5
- CSS3
- JavaScript
- GitHub Actions
- Gist

## 📁 Project structure

```text
index.html                  # Main portfolio page
privacy-policy.html         # Privacy policy (EN)
privacy-policy-ru.html      # Privacy policy (RU)
legacy/                     # Archived previous visual version
.github/                    # GitHub Actions workflow
css/                        # Stylesheets
data/
  i18n/                     # Localization files
  projects.json             # Metrics sources configuration
js/                         # JavaScript files
icons/                      # UI icons
images/                     # Images and assets
```

## ℹ️ Notes

- Localization is handled via a simple client-side i18n mechanism using JSON dictionaries
- GitHub stars and userscript install counts are fetched via GitHub Actions and stored in a static JSON Gist file
- The previous visual version is preserved under `/legacy/`
- No analytics, no tracking, no third-party hosted scripts
