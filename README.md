<h1 align="center">
vikindor.github.io
</h1>

<div align="center">

[![pages](https://img.shields.io/badge/GitHub%20Pages-live-brightgreen)](https://vikindor.github.io/)

</div>

Source code of my personal website containing portfolio and pet projects, hosted on GitHub Pages.  
The site is lightweight and framework-free, focusing on clean markup, simple structure, and maintainability.

## 🌐 Link

**https://vikindor.github.io/**

## 🛠️ Tech stack

- HTML5
- CSS3
- JavaScript
- GitHub Actions
- Gist

## 📁 Project structure

```text
index.html                  # Main page
support.html                # Contact methods and feedback form link
privacy-policy.html         # Privacy policy (EN)
privacy-policy-ru.html      # Privacy policy (RU)
.github/workflows/
  update-metrics.yml        # Fetch project metrics and update the Gist
css/
  styles.css                # Shared components and main page styles
  support.css               # Support page styles
  privacy-policy.css        # Styles for both privacy policy pages
data/
  i18n/                     # Localization files
  projects.json             # Metrics sources configuration
fonts/                      # Locally hosted web fonts
images/                     # Images and UI icons
js/
  i18n.js                   # Language menu, translations, and language-page navigation
  metrics.js                # Display project metrics and release dates
  popup.js                  # Contact popovers and copying on the main page
  copy.js                   # Contact copying with feedback on the support page
legacy/                     # Archived previous visual version
```

## ℹ️ Notes

- Localization is handled via a simple client-side i18n mechanism using JSON dictionaries
- GitHub stars and userscript install counts are fetched via GitHub Actions and stored in a static JSON Gist file
- The previous visual version is preserved under `/legacy/`
