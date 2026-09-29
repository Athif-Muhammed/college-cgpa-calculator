/**
 * PolyCGPA - Computer Engineering (Revision 2021) Curriculum & Grading Data
 */

const GRADING_SCALE = [
    { grade: "S", points: 10 },
    { grade: "A", points: 9 },
    { grade: "B", points: 8 },
    { grade: "C", points: 7 },
    { grade: "D", points: 6 },
    { grade: "E", points: 5 },
    { grade: "F", points: 0 }
];

const SYLLABUS = {
    1: [
        { code: "1001", name: "Communication Skills in English", credits: 4.0 },
        { code: "1002", name: "Mathematics I", credits: 5.0 },
        { code: "1003", name: "Applied Physics I", credits: 3.0 },
        { code: "1004", name: "Applied Chemistry", credits: 3.0 },
        { code: "1005", name: "Engineering Graphics", credits: 1.5 },
        { code: "1007", name: "Applied Chemistry Lab", credits: 1.0 },
        { code: "1008", name: "Introduction to IT Systems Lab", credits: 2.0 },
        { code: "1009", name: "Sports and Yoga", credits: 1.0 }
    ],
    2: [
        { code: "2002", name: "Mathematics II", credits: 4.0 },
        { code: "2003", name: "Applied Physics II", credits: 3.0 },
        { code: "2031", name: "Fundamentals of Electrical & Electronics Engg", credits: 3.0 },
        { code: "2131", name: "Problem Solving and Programming", credits: 3.0 },
        { code: "2008", name: "Communication Skills in English Lab", credits: 1.5 },
        { code: "2006", name: "Applied Physics Lab", credits: 1.0 },
        { code: "2009", name: "Engineering Workshop Practice", credits: 1.5 },
        { code: "3009", name: "Summer Internship I", credits: 2.0 }
    ],
    3: [
        { code: "3131", name: "Computer Organisation", credits: 4.0 },
        { code: "3132", name: "Programming in C", credits: 3.0 },
        { code: "3133", name: "Database Management Systems", credits: 3.0 },
        { code: "3134", name: "Digital Computer Fundamentals", credits: 3.0 },
        { code: "3135", name: "Programming in C Lab", credits: 1.5 },
        { code: "3136", name: "Database Management System Lab", credits: 1.5 },
        { code: "3137", name: "Digital Computer Fundamentals Lab", credits: 1.5 },
        { code: "3138", name: "Web Technology Lab", credits: 2.5 }
    ],
    4: [
        { code: "4131", name: "Object Oriented Programming", credits: 4.0 },
        { code: "4132", name: "Computer Communication and Networks", credits: 3.0 },
        { code: "4133", name: "Data Structures", credits: 4.0 },
        { code: "4136", name: "Object Oriented Programming Lab", credits: 1.5 },
        { code: "4137", name: "Web Programming Lab", credits: 2.5 },
        { code: "4138", name: "Data Structures Lab", credits: 1.5 },
        { code: "4006", name: "Minor Project", credits: 2.0 },
        { code: "5009", name: "Summer Internship II", credits: 3.0 }
    ],
    5: [
        { code: "5131", name: "Embedded System and Real Time OS", credits: 4.0 },
        { code: "5132", name: "Operating System", credits: 4.0 },
        { code: "5133A", name: "Virtualisation Technology & Cloud Computing", credits: 4.0 },
        { code: "5137", name: "Embedded Systems and Real Time OS Lab", credits: 1.5 },
        { code: "5138", name: "System Administration Lab", credits: 1.5 },
        { code: "5139A", name: "Virtualisation Technology & Cloud Computing Lab", credits: 1.5 },
        { code: "5008", name: "Seminar", credits: 1.0 }
    ],
    6: [
        { code: "6001", name: "Entrepreneurship and Startup", credits: 4.0 },
        { code: "6131A", name: "Internet of Things", credits: 4.0 },
        { code: "6132A", name: "Open Elective", credits: 4.0 },
        { code: "6137", name: "Computer Network Engineering Lab", credits: 2.5 },
        { code: "6138", name: "Smart Device Programming Lab", credits: 1.5 },
        { code: "6139A", name: "Internet of Things Lab", credits: 1.5 },
        { code: "6009", name: "Major Project", credits: 4.0 }
    ]
};

const DataService = {
    getGradingScale() {
        return GRADING_SCALE;
    },

    getGradePoints(grade) {
        if (!grade) return 0;
        const g = GRADING_SCALE.find(item => item.grade === grade.toString().toUpperCase());
        return g ? g.points : 0;
    },

    getSubjects(semester) {
        const list = SYLLABUS[parseInt(semester, 10)];
        return list ? list.map(s => ({ ...s })) : [];
    },

    getClass(gpa) {
        const val = parseFloat(gpa);
        if (isNaN(val) || val <= 0) return "N/A";
        if (val >= 8.5) return "First Class with Distinction";
        if (val >= 6.75) return "First Class";
        if (val >= 5.5) return "Second Class";
        if (val >= 5.0) return "Pass Class";
        return "Fail / Backlog";
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GRADING_SCALE, SYLLABUS, DataService };
}
