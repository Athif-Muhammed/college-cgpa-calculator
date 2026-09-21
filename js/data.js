/**
 * PolyCGPA Data Helper Module
 * Exposes clean lookup and helper functions for departments, subjects and grades
 */

const DataService = {
    // Get all registered departments
    getDepartments() {
        return typeof DEPARTMENTS !== 'undefined' ? DEPARTMENTS : [];
    },

    // Get department by ID
    getDepartmentById(deptId) {
        if (!deptId) return null;
        return this.getDepartments().find(d => d.id.toLowerCase() === deptId.toLowerCase()) || null;
    },

    // Get subjects for a specific department and semester
    getSubjects(deptId, semester) {
        if (!deptId || !semester) return [];
        const semNum = parseInt(semester, 10);
        if (typeof SUBJECTS_DATA !== 'undefined' && SUBJECTS_DATA[deptId] && SUBJECTS_DATA[deptId][semNum]) {
            // Return clone of subject array so caller modifications don't mutate base
            return JSON.parse(JSON.stringify(SUBJECTS_DATA[deptId][semNum]));
        }
        return [];
    },

    // Get grading scale
    getGradingScale() {
        return typeof GRADING_SCALE !== 'undefined' ? GRADING_SCALE : [];
    },

    // Get grade point by grade string
    getGradePoints(grade) {
        if (typeof getGradePoints === 'function') {
            return getGradePoints(grade);
        }
        return 0;
    },

    // Convert CGPA to percentage
    getPercentage(cgpa) {
        if (typeof cgpaToPercentage === 'function') {
            return cgpaToPercentage(cgpa);
        }
        return (parseFloat(cgpa || 0) * 9.5).toFixed(1);
    },

    // Get division classification
    getClass(cgpa) {
        if (typeof getAcademicClass === 'function') {
            return getAcademicClass(cgpa);
        }
        return "Pass";
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataService };
}
