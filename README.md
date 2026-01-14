# E-Commerce Reliability Platform 🚀
![Playwright Tests](https://github.com/limin77/quality-platform-2026/actions/workflows/playwright.yml/badge.svg)

## 🏗️ Architecture
This is a **Hybrid Test Automation Framework** designed for high reliability and low flakiness. It targets the "SauceDemo" e-commerce application.

* **Engine:** Playwright + TypeScript
* **Pipeline:** GitHub Actions (Dockerized)
* **Strategy:** 80% API Testing / 20% UI Testing

## 🚦 Live Status
The pipeline runs automatically on every commit. The badge above reflects the current health of the `main` branch.

## 📂 Project Structure
* `src/pages`: Page Object Models (UI Logic)
* `src/api`: API Controllers (Backend Logic)
* `tests/e2e`: Critical User Journeys
* `tests/api`: High-speed functional verification