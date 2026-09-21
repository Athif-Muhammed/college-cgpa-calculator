/**
 * Polytechnic Departments Data
 */
const DEPARTMENTS = [
    {
        id: "cse",
        name: "Computer Engineering",
        shortName: "Computer",
        code: "CSE",
        icon: "💻",
        totalSemesters: 6,
        description: "Software engineering, algorithms, networks, database systems and web technologies."
    },
    {
        id: "ece",
        name: "Electronics Engineering",
        shortName: "Electronics",
        code: "ECE",
        icon: "⚡",
        totalSemesters: 6,
        description: "Digital electronics, microprocessors, signal processing and communication systems."
    },
    {
        id: "eee",
        name: "Electrical Engineering",
        shortName: "Electrical",
        code: "EEE",
        icon: "🔋",
        totalSemesters: 6,
        description: "Power systems, electrical machines, control engineering and industrial automation."
    },
    {
        id: "civil",
        name: "Civil Engineering",
        shortName: "Civil",
        code: "CE",
        icon: "🏗️",
        totalSemesters: 6,
        description: "Structural design, surveying, construction technology, hydraulics and geotechnical engineering."
    },
    {
        id: "mech",
        name: "Mechanical Engineering",
        shortName: "Mechanical",
        code: "ME",
        icon: "⚙️",
        totalSemesters: 6,
        description: "Thermodynamics, machine design, manufacturing processes, fluid mechanics and CAD/CAM."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DEPARTMENTS };
}
