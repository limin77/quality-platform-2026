# 🚀 Modern Quality Assurance Platform (2026 Edition)

An enterprise-grade End-to-End (E2E) testing framework built to demonstrate a scalable, "Shift-Left" quality strategy. This project integrates functional, visual, accessibility, and API testing into a single unified pipeline.

**🔗 [View Live Enterprise Dashboard](https://limin77.github.io/quality-platform-2026/)**

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Core Framework** | **Playwright** + **TypeScript** | Fast, reliable browser automation with strict typing. |
| **Visual Testing** | **Pixel-Diff Strategy** | Automated visual regression to catch UI drift (Linux-calibrated). |
| **Accessibility** | **Axe-Core** (`@axe-core/playwright`) | WCAG 2.1 compliance scanning for legal/inclusivity checks. |
| **API Testing** | **Playwright Request** | Direct backend validation (Microservices testing). |
| **Reporting** | **Allure Enterprise** | Historical trend analysis, graphs, and defect categorization. |
| **CI/CD** | **GitHub Actions** | Automated pipeline triggering on Pull Requests. |
| **Quality Gate** | **Husky** + **ESLint** | Pre-commit hooks to enforce code standards. |
| **Infrastructure** | **Docker** | Containerized execution for environment consistency. |

---

## ⚡ Key Features Implemented

### 1. Automated Accessibility Compliance ♿
Integrated `axe-core` to scan every page for WCAG violations automatically.
- **Why?** Ensures the product is usable by everyone and meets legal standards (GovTech/FinTech requirement).
- **Strategy:** Soft-assertions for known legacy issues; Hard-fails for new violations.

### 2. Visual Regression System 🎨
Pixel-perfect comparison against "Golden Master" snapshots.
- **Feature:** Dockerized snapshot generation ensures `win32` vs `linux` font rendering matches 100%.
- **Outcome:** Eliminates "It looks fine on my machine" bugs.

### 3. Network Resilience & Mocking 🛡️
Tests simulate network failures (e.g., 500 Errors, Slow 3G) using Playwright's Interception API.
- **Scenario:** Verifies the app degrades gracefully when the Image CDN crashes.

### 4. Self-Healing CI Pipeline 🤖
- **HTML Reporting:** Instant feedback for devs.
- **Allure Dashboard:** Long-term trend analysis for QA Management.
- **Auto-Deploy:** Pipeline automatically builds and hosts the report on GitHub Pages.

---

## 🏃‍♂️ How to Run

### Prerequisites
- Node.js (v20+)
- Docker (Optional, for containerized run)

### Quick Start

    # 1. Install Dependencies
    npm ci

    # 2. Run All Tests (Headless)
    npx playwright test

    # 3. Open Enterprise Report
    npm run report:allure && npm run view:allure

### Run Specific Suites

    # Visual Regression Only
    npm run test:visual

    # Accessibility Checks Only
    npx playwright test accessibility.spec.ts

---

## 📊 Pipeline Status
![CI/CD](https://github.com/limin77/quality-platform-2026/actions/workflows/playwright.yml/badge.svg)