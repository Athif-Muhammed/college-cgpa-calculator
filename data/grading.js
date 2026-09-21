/**
 * Polytechnic Grading System
 * 10-Point Scale used across State Boards of Technical Education
 */
const GRADING_SCALE = [
    {
        grade: "O",
        alias: "A+",
        points: 10,
        label: "Outstanding / A+",
        range: "90% - 100%",
        description: "Outstanding performance",
        color: "#10B981"
    },
    {
        grade: "A",
        alias: "A",
        points: 9,
        label: "Excellent / A",
        range: "80% - 89%",
        description: "Excellent performance",
        color: "#14B8A6"
    },
    {
        grade: "B+",
        alias: "B+",
        points: 8,
        label: "Very Good / B+",
        range: "70% - 79%",
        description: "Very good performance",
        color: "#06B6D4"
    },
    {
        grade: "B",
        alias: "B",
        points: 7,
        label: "Good / B",
        range: "60% - 69%",
        description: "Good performance",
        color: "#3B82F6"
    },
    {
        grade: "C",
        alias: "C",
        points: 6,
        label: "Fair / C",
        range: "50% - 59%",
        description: "Average / Fair performance",
        color: "#F59E0B"
    },
    {
        grade: "P",
        alias: "D",
        points: 5,
        label: "Pass / P",
        range: "40% - 49%",
        description: "Satisfactory / Pass",
        color: "#EAB308"
    },
    {
        grade: "F",
        alias: "F",
        points: 0,
        label: "Fail / F",
        range: "Below 40%",
        description: "Reappear / Backlog",
        color: "#EF4444"
    }
];

// Helper to convert grade string to grade points
function getGradePoints(gradeKey) {
    if (!gradeKey) return 0;
    const cleanKey = gradeKey.trim().toUpperCase();
    const match = GRADING_SCALE.find(g => 
        g.grade.toUpperCase() === cleanKey || 
        g.alias.toUpperCase() === cleanKey ||
        g.label.toUpperCase().includes(cleanKey)
    );
    return match ? match.points : 0;
}

// Convert CGPA to equivalent percentage: Standard formula Percentage = CGPA * 9.5
function cgpaToPercentage(cgpa) {
    if (!cgpa || isNaN(cgpa)) return 0;
    return (parseFloat(cgpa) * 9.5).toFixed(1);
}

// Class division classifier
function getAcademicClass(cgpa) {
    const val = parseFloat(cgpa);
    if (isNaN(val) || val <= 0) return "N/A";
    if (val >= 8.5) return "First Class with Distinction";
    if (val >= 6.75) return "First Class";
    if (val >= 5.5) return "Second Class";
    if (val >= 5.0) return "Pass Class";
    return "Fail / Needs Improvement";
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GRADING_SCALE, getGradePoints, cgpaToPercentage, getAcademicClass };
}
