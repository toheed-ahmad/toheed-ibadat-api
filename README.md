# 🕋 Yade-Ilahi (Toheed Ibadat) API

An efficient, lightweight, and structured Node.js & Express REST API designed to serve multilingual Islamic content (Urdu, Hindi, Arabic, and English) from local JSON data files. Built for fast integration with mobile (Flutter/React Native), web, and desktop applications.

---

## 🚀 Features

* 🌍 **Multilingual Support:** Delivers data structured in Arabic, Urdu, Hindi, and English formats.
* 📦 **Dynamic Module Routing:** Automatically resolves and maps data files (`durood_sharif.json`, `masnoon_duain.json`, etc.) based on `meta.json`.
* 📑 **Granular Filtering:** Fetch entire modules or deep-dive into specific chapters dynamically.
* ⚡ **High Performance & Lightweight:** Zero database dependencies—reads directly from optimized local JSON storage using asynchronous streams.
* 🔒 **CORS Enabled:** Ready to be consumed by web apps and cross-platform mobile apps without cross-origin issues.

---

## 📂 Project Directory Structure

To ensure the API runs flawlessly, your local directory setup must match the structural blueprint below:

```text
D:\src\toheed-ibadat-api\
├── data\
│   ├── meta\
│   │   └── meta.json            # Central registry for app info & modules
│   ├── durood_sharif.json       # Virtues of Durood Sharif Data
│   ├── masnoon_duain.json       # Supplications Data
│   ├── kalma_iman.json          # Faith & Kalmas Data
│   ├── Namaz.json               # Prayer Rules & Text Data
│   ├── roza.json                # Fasting Data
│   ├── zakat.json               # Zakat Data
│   ├── haj.json                 # Hajj & Umrah Data
│   └── qurbani.json             # Qurbani Rules & Duas
├── routes\
│   └── api.js                   # Express Route Controllers
├── package.json                 # Dependencies & Start Scripts
└── server.js                    # Application Entry Point