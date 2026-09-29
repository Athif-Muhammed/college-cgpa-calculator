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
poly-cgpa-calculator/
├── web/                       # Web Application (Frontend)
│   ├── index.html             # Homepage
│   ├── sgpa.html              # Semester SGPA Calculator
│   ├── cgpa.html              # Cumulative CGPA Calculator
│   ├── login.html             # User login page
│   ├── css/
│   │   └── style.css          # Stylesheet
│   └── js/
│       ├── app.js             # Auth & UI helper
│       ├── calculator.js      # Pure SGPA & CGPA math engine
│       └── data.js            # Computer Engineering Revision 2021 subjects & credits
├── cli/                       # C Console Application
│   └── PolyCGPA.c             # Standalone C calculator
├── docs/                      # Project documentation & reports
│   ├── PolyCGPA_Project_Report.html
│   └── PolyCGPA_Project_Report.pdf
├── archive/                   # Backups & previous versions
│   └── backup_poly_cgpa_calculator/
└── README.md                  # Project root documentation
```

---

## 🚀 How to Run

### Web Application
Open `web/index.html` in any web browser. No server setup or external dependencies required.

### C Console Application
Compile and run `cli/PolyCGPA.c` with any standard C compiler (e.g., GCC):
```bash
gcc cli/PolyCGPA.c -o PolyCGPA
./PolyCGPA
```
