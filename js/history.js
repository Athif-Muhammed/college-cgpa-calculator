/**
 * PolyCGPA History & Analytics Controller
 * Renders interactive canvas trend charts, SGPA comparison bars, statistical badges, and semester records.
 */

const HistoryController = {
    init() {
        this.bindEvents();
        this.renderAll();
    },

    bindEvents() {
        const printTranscriptBtn = document.getElementById("printTranscriptBtn");
        const clearBtn = document.getElementById("clearHistoryFromPageBtn");

        if (printTranscriptBtn) {
            printTranscriptBtn.addEventListener("click", () => window.print());
        }

        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                if (confirm("Are you sure you want to clear all your saved semester records?")) {
                    AuthService.clearAllHistory();
                    App.toast("History cleared.", "warning");
                    this.renderAll();
                }
            });
        }

        // Resize handler for responsive canvas redraws
        window.addEventListener("resize", () => {
            this.drawTrendChart();
            this.drawSgpaBarChart();
        });
    },

    renderAll() {
        const user = AuthService.getCurrentUser();
        const history = user ? (user.history || []) : [];
        const analytics = Calculator.getAnalytics(history);

        // Update Stat Badges
        document.getElementById("histCGPA").textContent = analytics.cgpa.toFixed(2);
        document.getElementById("histTotalCredits").textContent = analytics.totalCredits;
        document.getElementById("histAverageSGPA").textContent = analytics.averageSGPA.toFixed(2);
        
        const highEl = document.getElementById("histHighestSem");
        if (highEl) {
            highEl.textContent = analytics.highestSem 
                ? `Sem ${analytics.highestSem.semester} (${analytics.highestSem.sgpa.toFixed(2)})` 
                : "N/A";
        }

        const lowEl = document.getElementById("histLowestSem");
        if (lowEl) {
            lowEl.textContent = analytics.lowestSem 
                ? `Sem ${analytics.lowestSem.semester} (${analytics.lowestSem.sgpa.toFixed(2)})` 
                : "N/A";
        }

        // Render Canvas Charts
        this.drawTrendChart(analytics.trendData);
        this.drawSgpaBarChart(analytics.trendData);

        // Render Grade Distribution
        this.renderGradeDistribution(analytics.gradeDistribution);

        // Render Detailed Semester Cards
        this.renderSemesterCards(history);
    },

    // -------------------------------------------------------------
    // CANVAS CHART: CGPA PROGRESSION LINE CHART
    // -------------------------------------------------------------
    drawTrendChart(trendData) {
        const canvas = document.getElementById("cgpaTrendCanvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = (rect.height || 260) * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height || 260;
        const padding = { top: 30, right: 30, bottom: 40, left: 45 };

        ctx.clearRect(0, 0, width, height);

        if (!trendData || trendData.length === 0) {
            ctx.fillStyle = "#85A396";
            ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("No semester data to plot yet.", width / 2, height / 2);
            return;
        }

        // Y-scale: 5 to 10
        const minY = 5.0;
        const maxY = 10.0;

        const getY = (val) => {
            const clamped = Math.max(minY, Math.min(maxY, val));
            return height - padding.bottom - ((clamped - minY) / (maxY - minY)) * (height - padding.top - padding.bottom);
        };

        const getX = (index) => {
            if (trendData.length === 1) return width / 2;
            return padding.left + (index / (trendData.length - 1)) * (width - padding.left - padding.right);
        };

        // Grid lines
        ctx.strokeStyle = "rgba(26, 56, 44, 0.6)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        for (let yVal = 5; yVal <= 10; yVal += 1) {
            const y = getY(yVal);
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();

            // Label
            ctx.fillStyle = "#85A396";
            ctx.font = "11px 'JetBrains Mono', monospace";
            ctx.textAlign = "right";
            ctx.fillText(`${yVal}.0`, padding.left - 8, y + 4);
        }
        ctx.setLineDash([]);

        // Plot Area Fill
        const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
        gradient.addColorStop(0, "rgba(16, 185, 129, 0.35)");
        gradient.addColorStop(1, "rgba(16, 185, 129, 0.0)");

        ctx.beginPath();
        trendData.forEach((d, i) => {
            const x = getX(i);
            const y = getY(d.cgpa);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        // Close path for gradient
        const lastX = getX(trendData.length - 1);
        const firstX = getX(0);
        const bottomY = getY(minY);
        ctx.lineTo(lastX, bottomY);
        ctx.lineTo(firstX, bottomY);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Stroke Line
        ctx.beginPath();
        trendData.forEach((d, i) => {
            const x = getX(i);
            const y = getY(d.cgpa);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = "#10B981";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Points & Labels
        trendData.forEach((d, i) => {
            const x = getX(i);
            const y = getY(d.cgpa);

            // Point Dot
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = "#10B981";
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#07110D";
            ctx.stroke();

            // Score Pill
            ctx.fillStyle = "#F0FDF4";
            ctx.font = "bold 11px 'JetBrains Mono', monospace";
            ctx.textAlign = "center";
            ctx.fillText(`${d.cgpa.toFixed(2)}`, x, y - 10);

            // Semester X label
            ctx.fillStyle = "#85A396";
            ctx.font = "600 12px 'Plus Jakarta Sans', sans-serif";
            ctx.fillText(`Sem ${d.semester}`, x, height - 12);
        });
    },

    // -------------------------------------------------------------
    // CANVAS CHART: SGPA COMPARISON BAR CHART
    // -------------------------------------------------------------
    drawSgpaBarChart(trendData) {
        const canvas = document.getElementById("sgpaBarCanvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = (rect.height || 260) * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height || 260;
        const padding = { top: 30, right: 20, bottom: 40, left: 35 };

        ctx.clearRect(0, 0, width, height);

        if (!trendData || trendData.length === 0) {
            ctx.fillStyle = "#85A396";
            ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("No semester SGPA to compare.", width / 2, height / 2);
            return;
        }

        const barWidth = Math.min(48, (width - padding.left - padding.right) / (trendData.length * 1.6));
        const totalSlot = (width - padding.left - padding.right) / trendData.length;

        // Y: 0 to 10
        const getY = (val) => height - padding.bottom - (val / 10.0) * (height - padding.top - padding.bottom);

        trendData.forEach((d, i) => {
            const centerX = padding.left + (i * totalSlot) + (totalSlot / 2);
            const x = centerX - (barWidth / 2);
            const y = getY(d.sgpa);
            const barH = (height - padding.bottom) - y;

            // Bar fill with rounded top
            const grad = ctx.createLinearGradient(0, y, 0, height - padding.bottom);
            grad.addColorStop(0, "#14B8A6");
            grad.addColorStop(1, "rgba(20, 184, 166, 0.2)");

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barH, [6, 6, 0, 0]);
            ctx.fill();

            // Value text
            ctx.fillStyle = "#F0FDF4";
            ctx.font = "bold 11px 'JetBrains Mono', monospace";
            ctx.textAlign = "center";
            ctx.fillText(`${d.sgpa.toFixed(2)}`, centerX, y - 8);

            // Sem label
            ctx.fillStyle = "#85A396";
            ctx.font = "600 12px 'Plus Jakarta Sans', sans-serif";
            ctx.fillText(`S${d.semester}`, centerX, height - 12);
        });
    },

    // -------------------------------------------------------------
    // GRADE DISTRIBUTION BREAKDOWN
    // -------------------------------------------------------------
    renderGradeDistribution(gradeDist) {
        const container = document.getElementById("analyticsGradeDistContainer");
        if (!container) return;

        const scale = DataService.getGradingScale();
        let totalGrades = 0;
        Object.values(gradeDist).forEach(count => totalGrades += count);

        if (totalGrades === 0) {
            container.innerHTML = `
                <p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px;">
                    Subject-level grade data will appear once you save SGPA calculations with subject details.
                </p>
            `;
            return;
        }

        container.innerHTML = scale.map(g => {
            const count = gradeDist[g.grade] || gradeDist[g.alias] || 0;
            const pct = totalGrades > 0 ? Math.round((count / totalGrades) * 100) : 0;
            return `
                <div class="dist-row">
                    <span class="dist-label">${g.alias || g.grade}</span>
                    <div class="dist-track">
                        <div class="dist-fill" style="width: ${pct}%; background: ${g.color || 'var(--accent-emerald)'};"></div>
                    </div>
                    <span class="dist-count">${count} (${pct}%)</span>
                </div>
            `;
        }).join('');
    },

    // -------------------------------------------------------------
    // SEMESTER CARDS & TRANSCRIPT TABLE
    // -------------------------------------------------------------
    renderSemesterCards(history) {
        const container = document.getElementById("semesterCardsList");
        if (!container) return;

        if (!history || history.length === 0) {
            container.innerHTML = `
                <div class="content-card" style="text-align: center; padding: 40px 20px;">
                    <p style="color: var(--text-muted); margin-bottom: 14px;">No semester records found in your student profile.</p>
                    <a href="sgpa.html" class="btn btn-primary btn-sm">+ Calculate and Save Semester SGPA</a>
                </div>
            `;
            return;
        }

        container.innerHTML = history.map(sem => {
            const percent = (sem.sgpa * 9.5).toFixed(1);
            const classDiv = DataService.getClass(sem.sgpa);
            const subjects = sem.subjects || [];

            return `
                <div class="content-card" style="margin-bottom: 20px;">
                    <div class="card-header-flex">
                        <div>
                            <span class="badge" style="margin-bottom: 6px;">TERM RECORD</span>
                            <h3 class="card-title">Semester ${sem.semester}</h3>
                            <p class="card-subtitle">Recorded on ${sem.date || 'Academic Session'}</p>
                        </div>
                        <div style="display: flex; align-items: center; gap: 20px;">
                            <div style="text-align: right;">
                                <span style="font-size: 11px; color: var(--text-muted); display: block;">SEMESTER SGPA</span>
                                <strong style="font-size: 24px; font-family: var(--font-mono); color: var(--accent-emerald);">${sem.sgpa.toFixed(2)}</strong>
                            </div>
                            <div style="text-align: right;">
                                <span style="font-size: 11px; color: var(--text-muted); display: block;">CREDITS EARNED</span>
                                <strong style="font-size: 20px; font-family: var(--font-mono);">${sem.credits}</strong>
                            </div>
                        </div>
                    </div>

                    ${subjects.length > 0 ? `
                        <div class="table-responsive" style="margin-top: 14px;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Subject Name</th>
                                        <th style="width: 100px;">Credits</th>
                                        <th style="width: 100px;">Grade</th>
                                        <th style="width: 110px;">Grade Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${subjects.map(sub => `
                                        <tr>
                                            <td>${sub.name}</td>
                                            <td>${sub.credits}</td>
                                            <td><span class="badge badge-grade grade-${(sub.grade || 'A').replace('+', '_PLUS')}">${sub.grade}</span></td>
                                            <td style="font-family: var(--font-mono);">${sub.points !== undefined ? sub.points : DataService.getGradePoints(sub.grade)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : `
                        <p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">
                            Overall Performance: <strong>${percent}% (${classDiv})</strong>
                        </p>
                    `}

                    <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 14px;" class="no-print">
                        <a href="sgpa.html?sem=${sem.semester}" class="btn btn-secondary btn-sm">
                            Recalculate SGPA
                        </a>
                        <button class="btn btn-danger btn-sm" onclick="HistoryController.deleteSem(${sem.semester})">
                            Delete Record
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    deleteSem(semNum) {
        if (confirm(`Remove Semester ${semNum} from saved history?`)) {
            AuthService.deleteSemesterResult(semNum);
            App.toast(`Semester ${semNum} deleted.`, "info");
            this.renderAll();
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    HistoryController.init();
});
