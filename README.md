# PolyCGPA — Polytechnic CGPA Calculator & Student Portal

A modern, comprehensive web application built for Polytechnic engineering students and technical colleges. It provides automated semester SGPA calculations with official branch curricula, multi-semester CGPA tracking, visual performance analytics, saved transcript records, student profile management, and print-ready grade sheets.

---

## 🎨 Color Theme & Design

The application follows the official Polytechnic emerald and dark theme:
- **Canvas Dark Background**: `#07110D`
- **Surface & Sidebar**: `#0D1F18`
- **Card Background**: `#122820`
- **Primary Emerald Accent**: `#10B981`
- **Secondary Teal Accent**: `#14B8A6`
- **Light Mint Text & Badges**: `#F0FDF4`

---

## 🚀 Key Features

1. **Curated Branch Curricula (Semesters 1 to 6)**
   - Pre-loaded courses and credit weights for:
     - 💻 **Computer Engineering (CSE)**
     - ⚡ **Electronics Engineering (ECE)**
     - 🔋 **Electrical Engineering (EEE)**
     - 🏗️ **Civil Engineering (CE)**
     - ⚙️ **Mechanical Engineering (ME)**

2. **10-Point Technical Board Grading System**
   - `O` / `A+`: Grade Point 10 (90–100%) — Outstanding
   - `A`: Grade Point 9 (80–89%) — Excellent
   - `B+`: Grade Point 8 (70–79%) — Very Good
   - `B`: Grade Point 7 (60–69%) — Good
   - `C`: Grade Point 6 (50–59%) — Fair / Average
   - `P` / `D`: Grade Point 5 (40–49%) — Pass
   - `F`: Grade Point 0 (<40%) — Fail / Reappear

3. **Curated SGPA Calculator (`sgpa.html`)**
   - Branch & semester selection automatically loads official curriculum.
   - Dynamic subject table: edit credits, pick letter grades, add custom electives.
   - Real-time estimated SGPA and total credits.
   - Result card with grade distribution breakdown, save to student history, and print result card.

4. **Multi-Semester CGPA Calculator (`cgpa.html`)**
   - Enter SGPA and credits for multiple semesters.
   - 1-click **Auto-fill from Saved Profile** to import past records.
   - Computes weighted CGPA and official equivalent percentage (`Percentage = CGPA × 9.5`).

5. **Student Portal Overview (`dashboard.html`)**
   - Cumulative CGPA, Latest SGPA, Total Earned Credits, and Completed Semesters cards.
   - Visual academic progress bar toward 6-semester diploma graduation.
   - Recent results table with delete and recalculate actions.
   - Student Profile & Settings modals.

6. **History & Visual Analytics (`history.html`)**
   - Interactive HTML5 Canvas CGPA progression line chart.
   - Term-by-term SGPA comparison bar chart.
   - Highest / Lowest semester badges.
   - Overall grade distribution breakdown.
   - Printable full academic transcript (`@media print`).

7. **Authentication & Local Persistence (`login.html`)**
   - Student registration and login.
   - 1-Click **Demo Student Login** (Preloaded with Aarav Sharma, Computer Engg, 4 semesters of realistic grade cards).
   - LocalStorage persistence for multi-session support.

---

## 📁 Project Structure

```
college-cgpa-calculator/
│
├── index.html               # Landing page with live hero preview & portal navigation
├── login.html               # Student Login & Register with 1-click demo access
├── dashboard.html           # Student Portal Overview & academic progress meter
├── sgpa.html                # Dynamic SGPA Calculator with branch curricula & result cards
├── cgpa.html                # Multi-semester CGPA calculator with auto-history loader
├── history.html             # History & visual analytics (Canvas trend charts & transcripts)
│
├── css/
│   ├── style.css            # Base tokens, theme variables, navbar, hero & landing styles
│   ├── login.css            # Auth card, form inputs, toggle tabs & alerts
│   └── dashboard.css        # Portal sidebar, topbar, cards, tables, modals & print rules
│
├── js/
│   ├── auth.js              # LocalStorage authentication, demo student & profile service
│   ├── calculator.js        # Core SGPA/CGPA math engines and statistical helpers
│   ├── sgpa.js              # SGPA controller (dynamic table, live calc, result modal)
│   ├── cgpa.js              # CGPA controller (multi-sem inputs, history loader, calc)
│   ├── history.js           # Analytics controller (canvas charts, stats, transcript)
│   ├── data.js              # Data access helper for branches, subjects & grading
│   └── app.js               # Global UI utilities (theme switcher, toast alerts, mobile drawer)
│
├── data/
│   ├── departments.js       # 5 polytechnic engineering departments
│   ├── subjects.js          # 6-semester curricula with course codes & credits
│   └── grading.js           # 10-point scale grade rules & conversion formulas
│
└── README.md
```

---

## 🧮 Mathematical Formulas

- **Semester Grade Point Average (SGPA)**:
  $$\text{SGPA} = \frac{\sum (\text{Credits}_i \times \text{GradePoints}_i)}{\sum \text{Credits}_i}$$

- **Cumulative Grade Point Average (CGPA)**:
  $$\text{CGPA} = \frac{\sum (\text{SGPA}_i \times \text{Credits}_i)}{\sum \text{Credits}_i}$$

- **Equivalent Percentage**:
  $$\text{Percentage} = \text{CGPA} \times 9.5$$
