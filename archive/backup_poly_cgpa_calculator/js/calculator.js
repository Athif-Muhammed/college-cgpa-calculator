/**
 * PolyCGPA - Core Calculation Engine
 */

const Calculator = {
    /**
     * Calculate SGPA from subjects
     * SGPA = Σ(Credits * Points) / Σ(Credits)
     */
    calculateSGPA(subjects) {
        if (!Array.isArray(subjects) || !subjects.length) {
            return { sgpa: 0, totalCredits: 0, totalPoints: 0, percentage: "0.0", academicClass: "N/A", isValid: false };
        }

        let totalCredits = 0;
        let totalPoints = 0;
        let hasBacklog = false;

        for (const s of subjects) {
            const credits = parseFloat(s.credits) || 0;
            const points = typeof s.points === "number" ? s.points : (typeof DataService !== "undefined" ? DataService.getGradePoints(s.grade) : 0);
            if ((s.grade || "").toUpperCase() === "F" || points === 0) hasBacklog = true;
            totalCredits += credits;
            totalPoints += (credits * points);
        }

        if (totalCredits <= 0) {
            return { sgpa: 0, totalCredits: 0, totalPoints: 0, percentage: "0.0", academicClass: "N/A", isValid: false };
        }

        const sgpa = Math.round((totalPoints / totalCredits) * 100) / 100;
        const percentage = (sgpa * 9.5).toFixed(1);
        const academicClass = hasBacklog ? "Fail / Re-appear (Backlog)" : (typeof DataService !== "undefined" ? DataService.getClass(sgpa) : "Pass");

        return {
            sgpa: parseFloat(sgpa.toFixed(2)),
            totalCredits: parseFloat(totalCredits.toFixed(1)),
            totalPoints: parseFloat(totalPoints.toFixed(2)),
            percentage,
            academicClass,
            isValid: true
        };
    },

    /**
     * Calculate CGPA across semesters
     * CGPA = Σ(SGPA * Credits) / Σ(Credits)
     */
    calculateCGPA(semesters) {
        if (!Array.isArray(semesters) || !semesters.length) {
            return { cgpa: 0, totalCredits: 0, totalPoints: 0, percentage: "0.0", academicClass: "N/A", completedSemesters: 0, isValid: false };
        }

        let totalCredits = 0;
        let totalPoints = 0;
        let completed = 0;

        for (const s of semesters) {
            if (s.included === false) continue;
            const sgpa = parseFloat(s.sgpa);
            const credits = parseFloat(s.credits);
            if (!isNaN(sgpa) && !isNaN(credits) && credits > 0) {
                totalCredits += credits;
                totalPoints += (sgpa * credits);
                completed++;
            }
        }

        if (totalCredits <= 0 || completed === 0) {
            return { cgpa: 0, totalCredits: 0, totalPoints: 0, percentage: "0.0", academicClass: "N/A", completedSemesters: 0, isValid: false };
        }

        const cgpa = Math.round((totalPoints / totalCredits) * 100) / 100;
        const percentage = (cgpa * 9.5).toFixed(1);
        const academicClass = typeof DataService !== "undefined" ? DataService.getClass(cgpa) : "Pass";

        return {
            cgpa: parseFloat(cgpa.toFixed(2)),
            totalCredits: parseFloat(totalCredits.toFixed(1)),
            totalPoints: parseFloat(totalPoints.toFixed(2)),
            percentage,
            academicClass,
            completedSemesters: completed,
            isValid: true
        };
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Calculator };
}
