# PolyCGPA — Computer Engineering SGPA & CGPA Calculator

A simple, fast, and accurate SGPA and CGPA calculator for **Diploma in Computer Engineering (Revision 2021)** students under the **State Board of Technical Education (SBTE), Kerala**.

---

## ⚡ Features

- **Semester SGPA Calculator (`sgpa.html`)**:
  - Preloaded with all 6 semesters of Computer Engineering courses and official credits.
  - Supports electives for Semester 5 and Semester 6.
  - Instant live calculation of SGPA, equivalent percentage (`SGPA × 9.5`), and academic class.

- **Cumulative CGPA Calculator (`cgpa.html`)**:
  - Weighted CGPA calculation across all completed semesters (120 total diploma credits).
  - Instant live percentage (`CGPA × 9.5`) and division classification.
  - Printable scorecards.

---

## 📂 Project Structure

```
├── index.html         # Homepage
├── sgpa.html          # Semester SGPA Calculator
├── cgpa.html          # Cumulative CGPA Calculator
├── css/
│   └── style.css      # Minimal responsive stylesheet
├── js/
│   ├── data.js        # Computer Engineering Revision 2021 subjects & credits
│   ├── calculator.js  # Pure SGPA & CGPA math engine
│   └── app.js         # Auth & UI helper
└── backup_poly_cgpa_calculator/ # Complete backup of original multi-branch codebase
```

---

## 🚀 How to Run

Simply open `index.html` in any browser. No servers or dependencies required.
