/**
 * PolyCGPA SGPA Calculator Controller
 * Manages department/semester selection, dynamic subject table, live calculations, result card, and saving.
 */

const SgpaController = {
    currentDept: "cse",
    currentSem: 3,
    subjects: [],

    init() {
        this.bindEvents();
        this.parseURLParams();
        this.loadDepartmentAndSemester();
    },

    // Read URL query params if linked from elsewhere (e.g. sgpa.html?dept=cse&sem=2)
    parseURLParams() {
        const params = new URLSearchParams(window.location.search);
        const deptParam = params.get("dept");
        const semParam = params.get("sem");

        const user = typeof AuthService !== 'undefined' ? AuthService.getCurrentUser() : null;

        if (deptParam && DataService.getDepartmentById(deptParam)) {
            this.currentDept = deptParam;
        } else if (user && user.department) {
            this.currentDept = user.department;
        }

        if (semParam && parseInt(semParam) >= 1 && parseInt(semParam) <= 6) {
            this.currentSem = parseInt(semParam);
        } else if (user && user.semester) {
            this.currentSem = user.semester;
        }

        const deptSelect = document.getElementById("selectDepartment");
        const semSelect = document.getElementById("selectSemester");

        if (deptSelect) deptSelect.value = this.currentDept;
        if (semSelect) semSelect.value = this.currentSem;
    },

    bindEvents() {
        const deptSelect = document.getElementById("selectDepartment");
        const semSelect = document.getElementById("selectSemester");
        const addSubjectBtn = document.getElementById("addSubjectBtn");
        const resetBtn = document.getElementById("resetBtn");
        const calcForm = document.getElementById("sgpaForm");
        const saveResultBtn = document.getElementById("saveResultBtn");
        const printResultBtn = document.getElementById("printResultBtn");

        if (deptSelect) {
            deptSelect.addEventListener("change", (e) => {
                this.currentDept = e.target.value;
                this.loadDepartmentAndSemester();
            });
        }

        if (semSelect) {
            semSelect.addEventListener("change", (e) => {
                this.currentSem = parseInt(e.target.value, 10);
                this.loadDepartmentAndSemester();
            });
        }

        if (addSubjectBtn) {
            addSubjectBtn.addEventListener("click", () => this.addCustomSubjectRow());
        }

        if (resetBtn) {
            resetBtn.addEventListener("click", () => this.loadDepartmentAndSemester());
        }

        if (calcForm) {
            calcForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.calculateAndShowResult();
            });
        }

        if (saveResultBtn) {
            saveResultBtn.addEventListener("click", () => this.saveCurrentResult());
        }

        if (printResultBtn) {
            printResultBtn.addEventListener("click", () => window.print());
        }
    },

    loadDepartmentAndSemester() {
        const rawSubjects = DataService.getSubjects(this.currentDept, this.currentSem);
        this.subjects = rawSubjects.map((sub, index) => ({
            id: `sub_${index}_${Date.now()}`,
            name: sub.name,
            code: sub.code || "",
            credits: sub.credits || 4,
            grade: "A+", // Default pleasant grade
            points: 10
        }));

        this.renderSubjectRows();
        this.updateLiveStats();
    },

    renderSubjectRows() {
        const tbody = document.getElementById("subjectsTbody");
        if (!tbody) return;

        if (this.subjects.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center; padding: 24px; color: var(--text-muted);">
                        No default subjects found. Click "+ Add Custom Subject" below to add courses.
                    </td>
                </tr>
            `;
            return;
        }

        const gradingScale = DataService.getGradingScale();

        tbody.innerHTML = this.subjects.map((sub, idx) => `
            <tr data-id="${sub.id}">
                <td style="width: 40px; font-weight: 700; color: var(--text-muted); text-align: center;">
                    ${idx + 1}
                </td>
                <td>
                    <input type="text" class="table-subject-input sub-name-input" value="${sub.name}" placeholder="Subject Title / Course Name" required>
                    ${sub.code ? `<small style="color:var(--text-dim); display:block; margin-top:2px;">Code: ${sub.code}</small>` : ''}
                </td>
                <td style="width: 130px;">
                    <select class="form-control sub-credits-input" style="padding: 8px 10px;">
                        <option value="1" ${sub.credits === 1 ? 'selected' : ''}>1 Credit</option>
                        <option value="2" ${sub.credits === 2 ? 'selected' : ''}>2 Credits (Lab)</option>
                        <option value="3" ${sub.credits === 3 ? 'selected' : ''}>3 Credits</option>
                        <option value="4" ${sub.credits === 4 ? 'selected' : ''}>4 Credits (Core)</option>
                        <option value="5" ${sub.credits === 5 ? 'selected' : ''}>5 Credits</option>
                        <option value="6" ${sub.credits === 6 ? 'selected' : ''}>6 Credits (Project)</option>
                    </select>
                </td>
                <td style="width: 170px;">
                    <select class="form-control sub-grade-input" style="padding: 8px 10px;">
                        ${gradingScale.map(g => `
                            <option value="${g.alias || g.grade}" data-points="${g.points}" ${g.points === sub.points ? 'selected' : ''}>
                                ${g.label} (${g.points} pts)
                            </option>
                        `).join('')}
                    </select>
                </td>
                <td style="width: 60px; text-align: right;">
                    <button type="button" class="btn btn-danger btn-sm" onclick="SgpaController.removeSubjectRow('${sub.id}')" title="Remove Subject">
                        ✕
                    </button>
                </td>
            </tr>
        `).join('');

        // Attach change listeners to live update
        tbody.querySelectorAll(".sub-credits-input, .sub-grade-input, .sub-name-input").forEach(input => {
            input.addEventListener("change", () => this.syncSubjectsFromDOM());
        });
    },

    syncSubjectsFromDOM() {
        const rows = document.querySelectorAll("#subjectsTbody tr[data-id]");
        this.subjects = Array.from(rows).map(row => {
            const id = row.getAttribute("data-id");
            const name = row.querySelector(".sub-name-input").value;
            const credits = parseFloat(row.querySelector(".sub-credits-input").value) || 0;
            const gradeSelect = row.querySelector(".sub-grade-input");
            const selectedOpt = gradeSelect.options[gradeSelect.selectedIndex];
            const grade = gradeSelect.value;
            const points = parseFloat(selectedOpt.getAttribute("data-points")) || 0;

            return { id, name, credits, grade, points };
        });

        this.updateLiveStats();
    },

    updateLiveStats() {
        const result = Calculator.calculateSGPA(this.subjects);
        const liveCreditsEl = document.getElementById("liveTotalCredits");
        const liveSgpaEl = document.getElementById("liveSGPA");

        if (liveCreditsEl) liveCreditsEl.textContent = `${result.totalCredits} Credits`;
        if (liveSgpaEl) liveSgpaEl.textContent = result.isValid ? result.sgpa.toFixed(2) : "0.00";
    },

    addCustomSubjectRow() {
        const newId = `custom_${Date.now()}`;
        this.subjects.push({
            id: newId,
            name: `Elective / Additional Subject ${this.subjects.length + 1}`,
            credits: 3,
            grade: "A",
            points: 9
        });
        this.renderSubjectRows();
        this.updateLiveStats();
        App.toast("Custom subject row added", "info");
    },

    removeSubjectRow(id) {
        if (this.subjects.length <= 1) {
            App.toast("You need at least one subject to calculate SGPA.", "warning");
            return;
        }
        this.subjects = this.subjects.filter(s => s.id !== id);
        this.renderSubjectRows();
        this.updateLiveStats();
    },

    calculateAndShowResult() {
        this.syncSubjectsFromDOM();
        const result = Calculator.calculateSGPA(this.subjects);

        if (!result.isValid) {
            App.toast(result.error || "Please check your inputs.", "error");
            return;
        }

        const deptObj = DataService.getDepartmentById(this.currentDept);
        const deptTitle = deptObj ? deptObj.name : this.currentDept.toUpperCase();

        // Populate Result Modal
        document.getElementById("resSemLabel").textContent = `SEMESTER ${this.currentSem} RESULT • ${deptTitle}`;
        document.getElementById("resSgpaValue").textContent = result.sgpa.toFixed(2);
        document.getElementById("resClassDiv").textContent = result.academicClass;
        document.getElementById("resCreditsValue").textContent = `${result.totalCredits}`;
        document.getElementById("resPointsValue").textContent = `${result.totalPoints}`;
        document.getElementById("resPercentValue").textContent = `${result.percentage}%`;

        // Render Grade Distribution Bars
        const distContainer = document.getElementById("resGradeDistribution");
        if (distContainer) {
            const scale = DataService.getGradingScale();
            const totalSubs = this.subjects.length;

            distContainer.innerHTML = scale.map(g => {
                const count = result.gradeCount[g.grade] || result.gradeCount[g.alias] || 0;
                if (count === 0 && (g.grade === "P" || g.grade === "F")) return ""; // omit zeroed fails for cleaner view
                const pct = totalSubs > 0 ? Math.round((count / totalSubs) * 100) : 0;
                return `
                    <div class="dist-row">
                        <span class="dist-label">${g.alias || g.grade}</span>
                        <div class="dist-track">
                            <div class="dist-fill" style="width: ${pct}%; background: ${g.color || 'var(--accent-emerald)'};"></div>
                        </div>
                        <span class="dist-count">${count}</span>
                    </div>
                `;
            }).join('');
        }

        // Store active calculation result
        this.lastCalculation = {
            semester: this.currentSem,
            sgpa: result.sgpa,
            credits: result.totalCredits,
            totalPoints: result.totalPoints,
            percentage: result.percentage,
            subjects: this.subjects
        };

        App.openModal("sgpaResultModal");
    },

    saveCurrentResult() {
        if (!this.lastCalculation) return;

        const res = AuthService.saveSemesterResult(this.lastCalculation);
        if (res.success) {
            App.toast(`Semester ${this.lastCalculation.semester} SGPA (${this.lastCalculation.sgpa.toFixed(2)}) saved to your profile!`, "success");
            App.closeModal("sgpaResultModal");
        } else {
            App.toast("Please log in to save your results to profile.", "warning");
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    SgpaController.init();
});
