<h1 align="center">
vikindor.github.io
</h1>

<div align="center">

[![pages](https://img.shields.io/badge/GitHub%20Pages-live-brightgreen)](https://vikindor.github.io/)

</div>

Source code of my personal website containing portfolio and pet projects, hosted on GitHub Pages.

The site is intentionally kept lightweight and framework-free, focusing on clean markup, simple structure, and maintainability.

## 🌐 Live

**https://vikindor.github.io/**

## ✨ Features

- Static GitHub Pages website
- English / Russian localization (client-side i18n)
- Single HTML source (no duplicated pages)
- External CSS stylesheet
- Dynamic GitHub stars and Usersctipts installs counters
- Responsive layout
- No analytics, no tracking, no third-party scripts

## 🛠️ Tech stack

- HTML5  
- CSS3
- Vanilla JavaScript

## 📁 Project structure

```text
index.html          # Single-page site
css/                # Stylesheets
data/
  i18n/              # Localization files (en / ru)
  projects.json      # Projects links
  metrics.json       # GitHub stars & installs data
icons/               # UI icons
images/              # Images and assets
```

## ℹ️ Notes

- Localization is handled via a simple client-side i18n mechanism using JSON dictionaries
- GitHub stars and Userscripts installs counters are fetched dynamically from a static JSON file
- The project intentionally avoids build tools, bundlers, and frameworks
- Designed to stay simple, readable, and easy to maintain
