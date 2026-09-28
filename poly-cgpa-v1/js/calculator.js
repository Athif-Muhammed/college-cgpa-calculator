/**
 * PolyCGPA - Core Calculation Engine
 * Precision calculation functions for SGPA, CGPA, Target Planner, and SBTE Kerala Classification.
 */

const Calculator = {
    /**
     * Calculate SGPA from subjects list
     * Formula: SGPA = Σ(Credits_i * GradePoints_i) / Σ(Credits_i)
     * Ignores 0-credit audit courses in GPA weighting.
     * @param {Array<{ name: string, credits: number|string, grade?: string, points?: number, isAudit?: boolean }>} subjects
     * @returns {Object}
     */
    calculateSGPA(subjects) {
        if (!Array.isArray(subjects) || subjects.length === 0) {
            return {
                sgpa: 0,
                totalCredits: 0,
                totalPoints: 0,
                percentage: "0.0",
                academicClass: "N/A",
                gradeCount: {},
                hasBacklog: false,
                isValid: false,
                error: "Please provide at least one credit course."
            };
        }

        let totalCredits = 0;
        let totalWeightedPoints = 0;
        let hasBacklog = false;
        let creditCoursesCount = 0;
        const gradeCount = {};

        for (const sub of subjects) {
            const credits = parseFloat(sub.credits) || 0;
            const isAudit = sub.isAudit === true || credits === 0;

            let points = typeof sub.points === "number" ? sub.points : null;
            if (points === null && sub.grade) {
                points = typeof DataService !== "undefined" ? DataService.getGradePoints(sub.grade) : 0;
            } else if (points === null) {
                points = 0;
            }

            const gradeKey = (sub.grade || "S").toString().toUpperCase();
            gradeCount[gradeKey] = (gradeCount[gradeKey] || 0) + 1;

            if (gradeKey === "F" || points === 0) {
                hasBacklog = true;
            }

            // Skip zero-credit audit courses from credit weighting
            if (isAudit) {
                continue;
            }

            if (credits < 0) {
                return {
                    sgpa: 0,
                    totalCredits: 0,
                    totalPoints: 0,
                    percentage: "0.0",
                    academicClass: "N/A",
                    gradeCount: {},
                    hasBacklog: false,
                    isValid: false,
                    error: `Invalid credits (${sub.credits}) for subject "${sub.name || 'Course'}".`
                };
            }

            totalCredits += credits;
            totalWeightedPoints += (credits * points);
            creditCoursesCount++;
        }

        if (totalCredits === 0) {
            return {
                sgpa: 0,
                totalCredits: 0,
                totalPoints: 0,
                percentage: "0.0",
                academicClass: "N/A",
                gradeCount,
                hasBacklog,
                isValid: false,
                error: "At least one course with credits > 0 is required."
            };
        }

        const rawSGPA = totalWeightedPoints / totalCredits;
        const sgpa = Math.round(rawSGPA * 100) / 100;
        const percentage = (sgpa * 9.5).toFixed(1);
        const academicClass = hasBacklog 
            ? "Fail / Re-appear (Backlog)" 
            : (typeof DataService !== "undefined" ? DataService.getClass(sgpa) : "Pass");

        return {
            sgpa: parseFloat(sgpa.toFixed(2)),
            totalCredits: parseFloat(totalCredits.toFixed(1)),
            totalPoints: parseFloat(totalWeightedPoints.toFixed(2)),
            percentage,
            gradeCount,
            hasBacklog,
            academicClass,
            creditCoursesCount,
            isValid: true,
            error: null
        };
    },

    /**
     * Calculate CGPA across multiple semesters
     * Formula: CGPA = Σ(SGPA_s * Credits_s) / Σ(Credits_s)
     * @param {Array<{ semester: number|string, sgpa: number|string, credits: number|string }>} semesters
     * @returns {Object}
     */
    calculateCGPA(semesters) {
        if (!Array.isArray(semesters) || semesters.length === 0) {
            return {
                cgpa: 0,
                totalCredits: 0,
                totalPoints: 0,
                percentage: "0.0",
                academicClass: "N/A",
                completedSemesters: 0,
                isValid: false,
                error: "Please enter at least one semester."
            };
        }

        let totalCredits = 0;
        let totalWeightedPoints = 0;
        let validSemestersCount = 0;

        for (const sem of semesters) {
            const sgpa = parseFloat(sem.sgpa);
            const credits = parseFloat(sem.credits);

            if (isNaN(sgpa) || isNaN(credits)) continue;
            if (sgpa < 0 || sgpa > 10) {
                return {
                    cgpa: 0,
                    totalCredits: 0,
                    totalPoints: 0,
                    percentage: "0.0",
                    academicClass: "N/A",
                    completedSemesters: 0,
                    isValid: false,
                    error: `Invalid SGPA (${sem.sgpa}) in Semester ${sem.semester}. Range is 0.00 - 10.00.`
                };
            }
            if (credits <= 0) {
                return {
                    cgpa: 0,
                    totalCredits: 0,
                    totalPoints: 0,
                    percentage: "0.0",
                    academicClass: "N/A",
                    completedSemesters: 0,
                    isValid: false,
                    error: `Invalid credits (${sem.credits}) in Semester ${sem.semester}. Credits must be > 0.`
                };
            }

            totalCredits += credits;
            totalWeightedPoints += (sgpa * credits);
            validSemestersCount++;
        }

        if (validSemestersCount === 0 || totalCredits === 0) {
            return {
                cgpa: 0,
                totalCredits: 0,
                totalPoints: 0,
                percentage: "0.0",
                academicClass: "N/A",
                completedSemesters: 0,
                isValid: false,
                error: "Please provide valid SGPA and credit values."
            };
        }

        const rawCGPA = totalWeightedPoints / totalCredits;
        const cgpa = Math.round(rawCGPA * 100) / 100;
        const percentage = (cgpa * 9.5).toFixed(1);
        const academicClass = typeof DataService !== "undefined" ? DataService.getClass(cgpa) : "Pass";

        return {
            cgpa: parseFloat(cgpa.toFixed(2)),
            totalCredits: parseFloat(totalCredits.toFixed(1)),
            totalPoints: parseFloat(totalWeightedPoints.toFixed(2)),
            percentage,
            academicClass,
            completedSemesters: validSemestersCount,
            isValid: true,
            error: null
        };
    },

    /**
     * Target CGPA Planner
     * Calculates the average SGPA required in remaining semesters to achieve a target CGPA.
     * @param {number} currentTotalPoints - Σ(SGPA_completed * Credits_completed)
     * @param {number} currentTotalCredits - Σ(Credits_completed)
     * @param {number} targetCGPA - Desired cumulative CGPA (e.g. 8.5)
     * @param {number} remainingCredits - Total credits left in upcoming semesters
     * @returns {Object}
     */
    calculateRequiredSGPA(currentTotalPoints, currentTotalCredits, targetCGPA, remainingCredits) {
        const totalDiplomaCredits = currentTotalCredits + remainingCredits;
        if (totalDiplomaCredits <= 0 || remainingCredits <= 0) {
            return { possible: false, requiredSGPA: 0, message: "No remaining credits to plan." };
        }

        const requiredTotalPoints = targetCGPA * totalDiplomaCredits;
        const pointsNeeded = requiredTotalPoints - currentTotalPoints;
        const requiredSGPA = pointsNeeded / remainingCredits;

        if (requiredSGPA > 10.0) {
            return {
                possible: false,
                requiredSGPA: parseFloat(requiredSGPA.toFixed(2)),
                message: `Mathematically impossible. You would need an average SGPA of ${requiredSGPA.toFixed(2)} (max possible is 10.00).`
            };
        }

        if (requiredSGPA <= 0) {
            return {
                possible: true,
                requiredSGPA: 0.0,
                message: "You have already secured enough points to meet this target CGPA!"
            };
        }

        return {
            possible: true,
            requiredSGPA: parseFloat(requiredSGPA.toFixed(2)),
            message: `You need an average SGPA of ${requiredSGPA.toFixed(2)} across the remaining ${remainingCredits} credits.`
        };
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Calculator };
}
