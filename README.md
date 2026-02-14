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

## ✨ Features

- Static GitHub Pages website
- English / Russian localization (client-side i18n)
- Single HTML source (no duplicated pages)
- CSS stylesheet
- JS for dynamic GitHub stars and Usersctipts installs counters
- Responsive layout
- No analytics, no tracking, no third-party scripts

## 🛠️ Tech stack

- HTML5
- CSS3
- JavaScript
- GitHub Actions

## 📁 Project structure

```text
index.html          # Single-page site
.github/            # GitHub Actions workflow
css/                # Stylesheets
data/
  i18n/             # Localization files
  projects.json     # Projects links
  metrics.json      # GitHub stars & installs data
js/                 # JavaScript files
icons/              # UI icons
images/             # Images and assets
```

## ℹ️ Notes

- Localization is handled via a simple client-side i18n mechanism using JSON dictionaries
- GitHub stars and userscript install counts are fetched via GitHub Actions and stored in a static JSON file
- Designed to stay simple, readable, and easy to maintain
