/**
 * PolyCGPA CGPA Calculator Controller
 * Multi-semester cumulative GPA calculation with history autofill and printable summary.
 */

const CgpaController = {
    semesters: [],

    init() {
        this.bindEvents();
        this.loadInitialSemesters();
    },

    bindEvents() {
        const addSemBtn = document.getElementById("addSemesterRowBtn");
        const autoFillBtn = document.getElementById("autoFillHistoryBtn");
        const resetBtn = document.getElementById("resetCgpaBtn");
        const cgpaForm = document.getElementById("cgpaForm");
        const printBtn = document.getElementById("printCgpaBtn");

        if (addSemBtn) {
            addSemBtn.addEventListener("click", () => this.addSemesterRow());
        }

        if (autoFillBtn) {
            autoFillBtn.addEventListener("click", () => this.autoFillFromHistory());
        }

        if (resetBtn) {
            resetBtn.addEventListener("click", () => this.loadInitialSemesters());
        }

        if (cgpaForm) {
            cgpaForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.calculateAndDisplay();
            });
        }

        if (printBtn) {
            printBtn.addEventListener("click", () => window.print());
        }
    },

    loadInitialSemesters() {
        const user = typeof AuthService !== 'undefined' ? AuthService.getCurrentUser() : null;
        if (user && user.history && user.history.length > 0) {
            this.semesters = user.history.map(h => ({
                id: `sem_${h.semester}_${Date.now()}`,
                semester: h.semester,
                sgpa: h.sgpa,
                credits: h.credits
            }));
        } else {
            // Default 4 semesters template
            this.semesters = [
                { id: "s1", semester: 1, sgpa: 8.20, credits: 20 },
                { id: "s2", semester: 2, sgpa: 8.45, credits: 22 },
                { id: "s3", semester: 3, sgpa: 8.42, credits: 21 },
                { id: "s4", semester: 4, sgpa: 8.70, credits: 23 }
            ];
        }

        this.renderRows();
        this.calculateAndDisplay(false); // background calc
    },

    autoFillFromHistory() {
        const user = typeof AuthService !== 'undefined' ? AuthService.getCurrentUser() : null;
        if (!user || !user.history || user.history.length === 0) {
            App.toast("No saved semester history found in profile. Add semesters or calculate SGPA first.", "warning");
            return;
        }

        this.semesters = user.history.map(h => ({
            id: `sem_${h.semester}_${Date.now()}`,
            semester: h.semester,
            sgpa: h.sgpa,
            credits: h.credits
        }));

        this.renderRows();
        this.calculateAndDisplay(true);
        App.toast(`Loaded ${user.history.length} semesters from student record!`, "success");
    },

    renderRows() {
        const tbody = document.getElementById("cgpaTbody");
        if (!tbody) return;

        tbody.innerHTML = this.semesters.map((sem, idx) => `
            <tr data-id="${sem.id}">
                <td style="width: 140px; font-weight: 700;">
                    Semester ${sem.semester}
                </td>
                <td>
                    <input type="number" step="0.01" min="0" max="10" class="form-control sem-sgpa-input" value="${sem.sgpa}" placeholder="e.g. 8.45" required>
                </td>
                <td>
                    <input type="number" step="0.5" min="1" max="50" class="form-control sem-credits-input" value="${sem.credits}" placeholder="e.g. 21" required>
                </td>
                <td style="width: 120px; font-family: var(--font-mono); color: var(--accent-emerald-light); font-weight: 700;" class="sem-points-cell">
                    ${(sem.sgpa * sem.credits).toFixed(1)}
                </td>
                <td style="width: 60px; text-align: right;">
                    <button type="button" class="btn btn-danger btn-sm" onclick="CgpaController.removeRow('${sem.id}')" title="Remove">
                        ✕
                    </button>
                </td>
            </tr>
        `).join('');

        tbody.querySelectorAll(".sem-sgpa-input, .sem-credits-input").forEach(input => {
            input.addEventListener("input", () => this.syncFromDOM());
        });
    },

    syncFromDOM() {
        const rows = document.querySelectorAll("#cgpaTbody tr[data-id]");
        this.semesters = Array.from(rows).map((row, idx) => {
            const id = row.getAttribute("data-id");
            const sgpa = parseFloat(row.querySelector(".sem-sgpa-input").value) || 0;
            const credits = parseFloat(row.querySelector(".sem-credits-input").value) || 0;
            
            // update points cell
            const ptsCell = row.querySelector(".sem-points-cell");
            if (ptsCell) ptsCell.textContent = (sgpa * credits).toFixed(1);

            return { id, semester: idx + 1, sgpa, credits };
        });

        this.updateLiveHeader();
    },

    updateLiveHeader() {
        const result = Calculator.calculateCGPA(this.semesters);
        const cgpaBadge = document.getElementById("cgpaLiveScore");
        if (cgpaBadge && result.isValid) {
            cgpaBadge.textContent = result.cgpa.toFixed(2);
        }
    },

    addSemesterRow() {
        if (this.semesters.length >= 8) {
            App.toast("Polytechnic diplomas have a maximum of 6 to 8 terms.", "warning");
            return;
        }

        const nextSemNum = this.semesters.length + 1;
        this.semesters.push({
            id: `sem_${nextSemNum}_${Date.now()}`,
            semester: nextSemNum,
            sgpa: 8.50,
            credits: 22
        });

        this.renderRows();
        this.syncFromDOM();
        App.toast(`Semester ${nextSemNum} row added`, "info");
    },

    removeRow(id) {
        if (this.semesters.length <= 1) {
            App.toast("You need at least one semester to calculate CGPA.", "warning");
            return;
        }

        this.semesters = this.semesters.filter(s => s.id !== id);
        this.renderRows();
        this.syncFromDOM();
    },

    calculateAndDisplay(showToast = true) {
        this.syncFromDOM();
        const result = Calculator.calculateCGPA(this.semesters);

        if (!result.isValid) {
            if (showToast) App.toast(result.error || "Please check semester inputs.", "error");
            return;
        }

        // Display results in Card
        document.getElementById("cgpaResultValue").textContent = result.cgpa.toFixed(2);
        document.getElementById("cgpaTotalCredits").textContent = result.totalCredits;
        document.getElementById("cgpaTotalPoints").textContent = result.totalPoints.toFixed(1);
        document.getElementById("cgpaPercentage").textContent = `${result.percentage}%`;
        document.getElementById("cgpaClassDivision").textContent = result.academicClass;
        document.getElementById("cgpaCompletedSems").textContent = `${result.completedSemesters} Semesters`;

        const resultCard = document.getElementById("cgpaResultCard");
        if (resultCard) {
            resultCard.style.display = "block";
            resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        if (showToast) App.toast(`CGPA calculated: ${result.cgpa.toFixed(2)} (${result.academicClass})`, "success");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    CgpaController.init();
});
