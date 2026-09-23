/**
 * PolyCGPA - Core Calculation Engine
 * Pure calculation functions for SGPA, CGPA, Percentage, and Division.
 */

const Calculator = {
    /**
     * Calculate SGPA from subjects
     * @param {Array<{ name: string, credits: number, grade?: string, points?: number }>} subjects
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
                isValid: false,
                error: "Please provide at least one subject."
            };
        }

        let totalCredits = 0;
        let totalWeightedPoints = 0;
        const gradeCount = {};

        for (const sub of subjects) {
            const credits = parseFloat(sub.credits) || 0;
            let points = typeof sub.points === "number" ? sub.points : null;

            if (points === null && sub.grade) {
                points = typeof DataService !== "undefined" ? DataService.getGradePoints(sub.grade) : 0;
            } else if (points === null) {
                points = 0;
            }

            if (credits <= 0) {
                return {
                    sgpa: 0,
                    totalCredits: 0,
                    totalPoints: 0,
                    percentage: "0.0",
                    academicClass: "N/A",
                    gradeCount: {},
                    isValid: false,
                    error: `Invalid credits (${sub.credits}) for subject "${sub.name || 'Course'}".`
                };
            }

            const gradeKey = (sub.grade || "A+").toUpperCase();
            gradeCount[gradeKey] = (gradeCount[gradeKey] || 0) + 1;

            totalCredits += credits;
            totalWeightedPoints += (credits * points);
        }

        if (totalCredits === 0) {
            return {
                sgpa: 0,
                totalCredits: 0,
                totalPoints: 0,
                percentage: "0.0",
                academicClass: "N/A",
                gradeCount: {},
                isValid: false,
                error: "Total credits must be greater than zero."
            };
        }

        const rawSGPA = totalWeightedPoints / totalCredits;
        const sgpa = Math.round(rawSGPA * 100) / 100;
        const percentage = (sgpa * 9.5).toFixed(1);
        const academicClass = typeof DataService !== "undefined" ? DataService.getClass(sgpa) : "Pass";

        return {
            sgpa: parseFloat(sgpa.toFixed(2)),
            totalCredits,
            totalPoints: parseFloat(totalWeightedPoints.toFixed(2)),
            percentage,
            gradeCount,
            academicClass,
            isValid: true,
            error: null
        };
    },

    /**
     * Calculate CGPA from semesters
     * @param {Array<{ semester: number|string, sgpa: number, credits: number }>} semesters
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
                    error: `Invalid credits (${sem.credits}) in Semester ${sem.semester}.`
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
            totalCredits,
            totalPoints: parseFloat(totalWeightedPoints.toFixed(2)),
            percentage,
            academicClass,
            completedSemesters: validSemestersCount,
            isValid: true,
            error: null
        };
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Calculator };
}
