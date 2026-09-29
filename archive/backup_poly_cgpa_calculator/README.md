# PolyCGPA — Polytechnic SGPA & CGPA Calculator

A minimal, fast, and responsive web application designed for polytechnic and technical diploma students to calculate Semester SGPA and Cumulative CGPA.

---

## ✨ Features

- **⚡ SGPA Calculator**: Preloaded with 6-semester curricula for 5 major diploma branches (Computer, Electronics, Electrical, Civil, Mechanical). Allows editing credits, picking letter grades (O, A+, A, B+, B, C, P, F), and adding custom subjects.
- **🎯 CGPA Calculator**: Calculates cumulative weighted average across multiple semesters with instant percentage (`CGPA × 9.5`) and division classification.
- **🏠 Interactive Home Hub**: Contains on-page instant SGPA & CGPA quick calculators with zero friction.
- **👤 Lightweight Demo Login**: Instant 1-click demo profile (Aarav Sharma - CSE) or customizable student header without any databases or complex auth setup.
- **🌓 Dark & Light Modes**: Clean emerald theme with smooth theme toggling.
- **🖨️ Print Support**: Clean printable result cards and summary reports.

---

## 📂 Minimal Project Structure

```
├── index.html         # Home page with quick SGPA / CGPA calculators
├── sgpa.html          # Dedicated Semester SGPA Calculator
├── cgpa.html          # Dedicated Cumulative CGPA Calculator
├── css/
│   └── style.css      # Unified responsive stylesheet (Dark/Light mode)
├── js/
│   ├── data.js        # Branches, grading scales & 6-semester subjects
│   ├── calculator.js  # Pure SGPA & CGPA math engine
│   └── app.js         # Theme toggle, demo profile modal, and UI helpers
└── README.md          # Project documentation
```

---

## 🚀 Getting Started

No build tools, servers, or dependencies required. Simply open `index.html` in any modern web browser:

```bash
# Open directly in browser (Windows)
start index.html
```

Or serve via any static file server:
```bash
npx serve .
# or
python -m http.server 8080
```
