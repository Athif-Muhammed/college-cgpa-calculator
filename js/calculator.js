/**
 * PolyCGPA Calculator Engine
 * Handles all SGPA, CGPA, percentage, and statistical analytics computations.
 */

const Calculator = {
    /**
     * Calculate SGPA from an array of subjects
     * @param {Array<{ name: string, credits: number, grade: string, points?: number }>} subjects 
     * @returns {Object} Result object { sgpa, totalCredits, totalPoints, percentage, gradeCount, isValid, error }
     */
    calculateSGPA(subjects) {
        if (!Array.isArray(subjects) || subjects.length === 0) {
            return {
                sgpa: 0,
                totalCredits: 0,
                totalPoints: 0,
                percentage: 0,
                gradeCount: {},
                academicClass: "N/A",
                isValid: false,
                error: "Please add at least one subject."
            };
        }

        let totalCredits = 0;
        let totalWeightedPoints = 0;
        const gradeCount = {};

        for (const sub of subjects) {
            const credits = parseFloat(sub.credits) || 0;
            let points = typeof sub.points === 'number' ? sub.points : null;
            
            if (points === null) {
                if (typeof DataService !== 'undefined' && DataService.getGradePoints) {
                    points = DataService.getGradePoints(sub.grade);
                } else if (typeof getGradePoints === 'function') {
                    points = getGradePoints(sub.grade);
                } else {
                    points = 0;
                }
            }

            if (credits <= 0) {
                return {
                    sgpa: 0,
                    totalCredits: 0,
                    totalPoints: 0,
                    percentage: 0,
                    gradeCount: {},
                    academicClass: "N/A",
                    isValid: false,
                    error: `Invalid credits (${sub.credits}) for subject "${sub.name || 'Unnamed'}". Credits must be greater than 0.`
                };
            }

            const gradeKey = (sub.grade || "F").toUpperCase();
            gradeCount[gradeKey] = (gradeCount[gradeKey] || 0) + 1;

            totalCredits += credits;
            totalWeightedPoints += (credits * points);
        }

        if (totalCredits === 0) {
            return {
                sgpa: 0,
                totalCredits: 0,
                totalPoints: 0,
                percentage: 0,
                gradeCount: {},
                academicClass: "N/A",
                isValid: false,
                error: "Total credits cannot be zero."
            };
        }

        const rawSGPA = totalWeightedPoints / totalCredits;
        const sgpa = Math.round(rawSGPA * 100) / 100;
        const percentage = Math.round(sgpa * 9.5 * 10) / 10;
        
        let academicClass = "Pass";
        if (typeof DataService !== 'undefined' && DataService.getClass) {
            academicClass = DataService.getClass(sgpa);
        } else if (typeof getAcademicClass === 'function') {
            academicClass = getAcademicClass(sgpa);
        }

        return {
            sgpa: parseFloat(sgpa.toFixed(2)),
            totalCredits,
            totalPoints: Math.round(totalWeightedPoints * 100) / 100,
            percentage,
            gradeCount,
            academicClass,
            isValid: true,
            error: null
        };
    },

    /**
     * Calculate CGPA from an array of semesters
     * @param {Array<{ semester: number|string, sgpa: number, credits: number }>} semesters 
     * @returns {Object} Result object { cgpa, totalCredits, totalPoints, percentage, academicClass, isValid, error }
     */
    calculateCGPA(semesters) {
        if (!Array.isArray(semesters) || semesters.length === 0) {
            return {
                cgpa: 0,
                totalCredits: 0,
                totalPoints: 0,
                percentage: 0,
                academicClass: "N/A",
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
                    percentage: 0,
                    academicClass: "N/A",
                    isValid: false,
                    error: `Invalid SGPA (${sem.sgpa}) in Semester ${sem.semester}. SGPA must be between 0 and 10.`
                };
            }
            if (credits <= 0) {
                return {
                    cgpa: 0,
                    totalCredits: 0,
                    totalPoints: 0,
                    percentage: 0,
                    academicClass: "N/A",
                    isValid: false,
                    error: `Invalid Credits (${sem.credits}) in Semester ${sem.semester}. Credits must be greater than 0.`
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
                percentage: 0,
                academicClass: "N/A",
                isValid: false,
                error: "Please provide valid SGPA and credit values."
            };
        }

        const rawCGPA = totalWeightedPoints / totalCredits;
        const cgpa = Math.round(rawCGPA * 100) / 100;
        const percentage = Math.round(cgpa * 9.5 * 10) / 10;
        
        let academicClass = "Pass";
        if (typeof DataService !== 'undefined' && DataService.getClass) {
            academicClass = DataService.getClass(cgpa);
        } else if (typeof getAcademicClass === 'function') {
            academicClass = getAcademicClass(cgpa);
        }

        return {
            cgpa: parseFloat(cgpa.toFixed(2)),
            totalCredits,
            totalPoints: Math.round(totalWeightedPoints * 100) / 100,
            percentage,
            academicClass,
            completedSemesters: validSemestersCount,
            isValid: true,
            error: null
        };
    },

    /**
     * Compute comprehensive performance analytics from student history
     * @param {Array<Object>} semesterHistory 
     */
    getAnalytics(semesterHistory) {
        if (!Array.isArray(semesterHistory) || semesterHistory.length === 0) {
            return {
                totalSemesters: 0,
                cgpa: 0,
                currentSGPA: 0,
                totalCredits: 0,
                highestSem: null,
                lowestSem: null,
                averageSGPA: 0,
                gradeDistribution: {},
                trendData: []
            };
        }

        // Sort semesters sequentially
        const sorted = [...semesterHistory].sort((a, b) => parseInt(a.semester) - parseInt(b.semester));
        
        let highest = sorted[0];
        let lowest = sorted[0];
        let totalSGPA = 0;
        let cumulativeCredits = 0;
        let cumulativePoints = 0;
        const gradeDistribution = {};
        const trendData = [];

        sorted.forEach(sem => {
            const sgpa = parseFloat(sem.sgpa) || 0;
            const credits = parseFloat(sem.credits) || 0;

            if (sgpa > (parseFloat(highest.sgpa) || 0)) highest = sem;
            if (sgpa < (parseFloat(lowest.sgpa) || 0)) lowest = sem;

            totalSGPA += sgpa;
            cumulativeCredits += credits;
            cumulativePoints += (sgpa * credits);

            const runningCGPA = cumulativeCredits > 0 
                ? (cumulativePoints / cumulativeCredits).toFixed(2)
                : sgpa.toFixed(2);

            trendData.push({
                semester: sem.semester,
                label: `Sem ${sem.semester}`,
                sgpa: parseFloat(sgpa.toFixed(2)),
                cgpa: parseFloat(runningCGPA),
                credits: credits
            });

            // Aggregate subject grades if present
            if (Array.isArray(sem.subjects)) {
                sem.subjects.forEach(sub => {
                    const g = (sub.grade || "F").toUpperCase();
                    gradeDistribution[g] = (gradeDistribution[g] || 0) + 1;
                });
            }
        });

        const overallCGPA = cumulativeCredits > 0 
            ? parseFloat((cumulativePoints / cumulativeCredits).toFixed(2))
            : 0;

        const currentSGPA = sorted.length > 0 
            ? parseFloat((parseFloat(sorted[sorted.length - 1].sgpa) || 0).toFixed(2))
            : 0;

        const averageSGPA = sorted.length > 0 
            ? parseFloat((totalSGPA / sorted.length).toFixed(2))
            : 0;

        return {
            totalSemesters: sorted.length,
            cgpa: overallCGPA,
            currentSGPA: currentSGPA,
            totalCredits: cumulativeCredits,
            highestSem: highest ? { semester: highest.semester, sgpa: parseFloat(highest.sgpa) } : null,
            lowestSem: lowest ? { semester: lowest.semester, sgpa: parseFloat(lowest.sgpa) } : null,
            averageSGPA,
            gradeDistribution,
            trendData
        };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Calculator };
}
