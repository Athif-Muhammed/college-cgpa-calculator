/**
 * Polytechnic Subjects Data (Semesters 1 - 6)
 * Real-world polytechnic curricula for 5 core engineering branches
 */
const SUBJECTS_DATA = {
    // -------------------------------------------------------------
    // COMPUTER ENGINEERING (CSE)
    // -------------------------------------------------------------
    cse: {
        1: [
            { code: "1001", name: "Communication Skills in English", credits: 3 },
            { code: "1002", name: "Engineering Mathematics I", credits: 4 },
            { code: "1003", name: "Applied Physics", credits: 3 },
            { code: "1004", name: "Applied Chemistry", credits: 3 },
            { code: "1005", name: "Basic Electrical & Electronics Engg", credits: 3 },
            { code: "1006", name: "Basic Workshop Practice Lab", credits: 2 },
            { code: "1007", name: "Physics & Chemistry Lab", credits: 2 }
        ],
        2: [
            { code: "2001", name: "Applied Mathematics II", credits: 4 },
            { code: "2002", name: "Environmental Sustainability", credits: 2 },
            { code: "2003", name: "C Programming & Logic Building", credits: 4 },
            { code: "2004", name: "Engineering Graphics & CAD", credits: 3 },
            { code: "2005", name: "Digital Fundamentals", credits: 3 },
            { code: "2006", name: "C Programming Lab", credits: 2 },
            { code: "2007", name: "Digital Electronics Lab", credits: 2 }
        ],
        3: [
            { code: "3001", name: "Discrete Mathematics", credits: 4 },
            { code: "3002", name: "Data Structures Using C/C++", credits: 4 },
            { code: "3003", name: "Computer Organization & Architecture", credits: 3 },
            { code: "3004", name: "Database Management Systems", credits: 4 },
            { code: "3005", name: "Object Oriented Programming in Java", credits: 4 },
            { code: "3006", name: "Data Structures Lab", credits: 2 },
            { code: "3007", name: "DBMS & SQL Lab", credits: 2 }
        ],
        4: [
            { code: "4001", name: "Operating System Concepts", credits: 4 },
            { code: "4002", name: "Computer Networks & Protocols", credits: 4 },
            { code: "4003", name: "Software Engineering & Agile", credits: 3 },
            { code: "4004", name: "Web Development Technologies", credits: 4 },
            { code: "4005", name: "Python Programming", credits: 3 },
            { code: "4006", name: "Linux & OS Lab", credits: 2 },
            { code: "4007", name: "Web Development Lab", credits: 2 }
        ],
        5: [
            { code: "5001", name: "Mobile Application Development", credits: 4 },
            { code: "5002", name: "Information & Cyber Security", credits: 4 },
            { code: "5003", name: "Cloud Computing & DevOps", credits: 3 },
            { code: "5004", name: "Advanced Java / Full Stack", credits: 4 },
            { code: "5005", name: "Industrial Training / Seminar", credits: 2 },
            { code: "5006", name: "Mobile Apps Lab", credits: 2 },
            { code: "5007", name: "Mini Project & Evaluation", credits: 3 }
        ],
        6: [
            { code: "6001", name: "Artificial Intelligence & Machine Learning", credits: 4 },
            { code: "6002", name: "Internet of Things (IoT)", credits: 3 },
            { code: "6003", name: "Entrepreneurship & Startup Management", credits: 3 },
            { code: "6004", name: "Software Testing & QA", credits: 3 },
            { code: "6005", name: "IoT & Smart Systems Lab", credits: 2 },
            { code: "6006", name: "Major Capstone Project & Viva", credits: 6 }
        ]
    },

    // -------------------------------------------------------------
    // ELECTRONICS ENGINEERING (ECE)
    // -------------------------------------------------------------
    ece: {
        1: [
            { code: "1001", name: "Communication Skills in English", credits: 3 },
            { code: "1002", name: "Engineering Mathematics I", credits: 4 },
            { code: "1003", name: "Applied Physics", credits: 3 },
            { code: "1004", name: "Applied Chemistry", credits: 3 },
            { code: "1005", name: "Basic Electrical Engg", credits: 3 },
            { code: "1006", name: "Electronics Workshop Lab", credits: 2 },
            { code: "1007", name: "Applied Sciences Lab", credits: 2 }
        ],
        2: [
            { code: "2001", name: "Applied Mathematics II", credits: 4 },
            { code: "2002", name: "Electronic Devices & Circuits", credits: 4 },
            { code: "2003", name: "Network Analysis & Filter Design", credits: 3 },
            { code: "2004", name: "Engineering Graphics & CAD", credits: 3 },
            { code: "2005", name: "C Programming for Hardware", credits: 3 },
            { code: "2006", name: "Devices & Circuits Lab", credits: 2 },
            { code: "2007", name: "PCB Design Lab", credits: 2 }
        ],
        3: [
            { code: "3101", name: "Digital Electronics & Logic Design", credits: 4 },
            { code: "3102", name: "Analog Integrated Circuits", credits: 4 },
            { code: "3103", name: "Signals and Systems", credits: 3 },
            { code: "3104", name: "Electronic Measurements & Instrumentation", credits: 3 },
            { code: "3105", name: "Digital Logic Lab", credits: 2 },
            { code: "3106", name: "Analog Circuits Lab", credits: 2 }
        ],
        4: [
            { code: "4101", name: "Microprocessors & Microcontrollers", credits: 4 },
            { code: "4102", name: "Analog & Digital Communication", credits: 4 },
            { code: "4103", name: "Linear Control Systems", credits: 3 },
            { code: "4104", name: "Electromagnetic Waves & Transmission", credits: 3 },
            { code: "4105", name: "Microcontroller 8051/ARM Lab", credits: 2 },
            { code: "4106", name: "Communication Lab", credits: 2 }
        ],
        5: [
            { code: "5101", name: "Embedded Systems Design", credits: 4 },
            { code: "5102", name: "VLSI Design & VHDL/Verilog", credits: 4 },
            { code: "5103", name: "Optical & Satellite Communication", credits: 3 },
            { code: "5104", name: "Industrial Automation & PLC", credits: 3 },
            { code: "5105", name: "Embedded Systems Lab", credits: 2 },
            { code: "5106", name: "Mini Project & Seminar", credits: 3 }
        ],
        6: [
            { code: "6101", name: "Wireless & Mobile Communication (5G)", credits: 4 },
            { code: "6102", name: "Digital Signal Processing (DSP)", credits: 4 },
            { code: "6103", name: "Robotics & Computer Vision", credits: 3 },
            { code: "6104", name: "DSP & Simulation Lab", credits: 2 },
            { code: "6105", name: "Major Project & Viva", credits: 6 }
        ]
    },

    // -------------------------------------------------------------
    // ELECTRICAL ENGINEERING (EEE)
    // -------------------------------------------------------------
    eee: {
        1: [
            { code: "1001", name: "Communication Skills in English", credits: 3 },
            { code: "1002", name: "Engineering Mathematics I", credits: 4 },
            { code: "1003", name: "Applied Physics", credits: 3 },
            { code: "1004", name: "Applied Chemistry", credits: 3 },
            { code: "1005", name: "Fundamentals of Electrical Engg", credits: 4 },
            { code: "1006", name: "Electrical Wiring Lab", credits: 2 }
        ],
        2: [
            { code: "2001", name: "Applied Mathematics II", credits: 4 },
            { code: "2002", name: "Electrical Circuit Theory", credits: 4 },
            { code: "2003", name: "Electronic Devices & Transducers", credits: 3 },
            { code: "2004", name: "Engineering Graphics & CAD", credits: 3 },
            { code: "2005", name: "Electrical Circuits Lab", credits: 2 },
            { code: "2006", name: "Electronics Lab", credits: 2 }
        ],
        3: [
            { code: "3201", name: "DC Machines and Transformers", credits: 4 },
            { code: "3202", name: "Electrical & Electronic Measurements", credits: 3 },
            { code: "3203", name: "Generation of Electrical Power", credits: 3 },
            { code: "3204", name: "Analog Electronics", credits: 3 },
            { code: "3205", name: "DC Machines Lab", credits: 2 },
            { code: "3206", name: "Measurements Lab", credits: 2 }
        ],
        4: [
            { code: "4201", name: "AC Machines (Induction & Synchronous)", credits: 4 },
            { code: "4202", name: "Transmission & Distribution of Power", credits: 4 },
            { code: "4203", name: "Power Electronics & Drives", credits: 4 },
            { code: "4204", name: "Digital Electronics & Microcontrollers", credits: 3 },
            { code: "4205", name: "AC Machines Lab", credits: 2 },
            { code: "4206", name: "Power Electronics Lab", credits: 2 }
        ],
        5: [
            { code: "5201", name: "Switchgear & Protection", credits: 4 },
            { code: "5202", name: "Renewable Energy Technologies (Solar/Wind)", credits: 3 },
            { code: "5203", name: "Electric Vehicle (EV) Technology", credits: 4 },
            { code: "5204", name: "Industrial Automation (PLC & SCADA)", credits: 3 },
            { code: "5205", name: "Relay & Protection Lab", credits: 2 },
            { code: "5206", name: "Mini Project", credits: 3 }
        ],
        6: [
            { code: "6201", name: "Utilization of Electrical Energy & Traction", credits: 4 },
            { code: "6202", name: "Smart Grid & Power Quality", credits: 3 },
            { code: "6203", name: "Electrical Estimation & Costing", credits: 3 },
            { code: "6204", name: "CAD in Electrical Engineering Lab", credits: 2 },
            { code: "6205", name: "Major Project & Comprehensive Viva", credits: 6 }
        ]
    },

    // -------------------------------------------------------------
    // CIVIL ENGINEERING (CIVIL)
    // -------------------------------------------------------------
    civil: {
        1: [
            { code: "1001", name: "Communication Skills in English", credits: 3 },
            { code: "1002", name: "Engineering Mathematics I", credits: 4 },
            { code: "1003", name: "Applied Physics", credits: 3 },
            { code: "1004", name: "Applied Chemistry", credits: 3 },
            { code: "1005", name: "Engineering Mechanics", credits: 4 },
            { code: "1006", name: "Civil Engineering Workshop", credits: 2 }
        ],
        2: [
            { code: "2001", name: "Applied Mathematics II", credits: 4 },
            { code: "2002", name: "Building Materials & Construction", credits: 4 },
            { code: "2003", name: "Basic Surveying", credits: 3 },
            { code: "2004", name: "Engineering Drawing & Building Drafting", credits: 3 },
            { code: "2005", name: "Surveying Practice Lab I", credits: 2 },
            { code: "2006", name: "Material Testing Lab", credits: 2 }
        ],
        3: [
            { code: "3301", name: "Mechanics of Structures", credits: 4 },
            { code: "3302", name: "Advanced Surveying & GIS", credits: 3 },
            { code: "3303", name: "Hydraulics & Fluid Mechanics", credits: 4 },
            { code: "3304", name: "Concrete Technology", credits: 3 },
            { code: "3305", name: "Surveying Practice Lab II", credits: 2 },
            { code: "3306", name: "Hydraulics Lab", credits: 2 }
        ],
        4: [
            { code: "4301", name: "Design of Reinforced Concrete (RCC) Structures", credits: 4 },
            { code: "4302", name: "Geotechnical & Foundation Engineering", credits: 4 },
            { code: "4303", name: "Transportation & Highway Engineering", credits: 3 },
            { code: "4304", name: "Environmental & Sanitary Engineering", credits: 3 },
            { code: "4305", name: "Soil Mechanics Lab", credits: 2 },
            { code: "4306", name: "AutoCAD 2D/3D Civil Lab", credits: 2 }
        ],
        5: [
            { code: "5301", name: "Design of Steel Structures", credits: 4 },
            { code: "5302", name: "Estimating, Costing & Valuation", credits: 4 },
            { code: "5303", name: "Irrigation & Water Resources Engineering", credits: 3 },
            { code: "5304", name: "Construction Management & Safety", credits: 3 },
            { code: "5305", name: "Structural Detailing Lab", credits: 2 },
            { code: "5306", name: "Mini Project & Site Study", credits: 3 }
        ],
        6: [
            { code: "6301", name: "Earthquake Resistant Design", credits: 3 },
            { code: "6302", name: "Urban Planning & Smart Infrastructure", credits: 3 },
            { code: "6303", name: "Bridge & Tunnel Engineering", credits: 3 },
            { code: "6304", name: "BIM & Structural Modeling Lab", credits: 2 },
            { code: "6305", name: "Major Capstone Project & Viva", credits: 6 }
        ]
    },

    // -------------------------------------------------------------
    // MECHANICAL ENGINEERING (MECH)
    // -------------------------------------------------------------
    mech: {
        1: [
            { code: "1001", name: "Communication Skills in English", credits: 3 },
            { code: "1002", name: "Engineering Mathematics I", credits: 4 },
            { code: "1003", name: "Applied Physics", credits: 3 },
            { code: "1004", name: "Applied Chemistry", credits: 3 },
            { code: "1005", name: "Engineering Mechanics", credits: 4 },
            { code: "1006", name: "Mechanical Fitting & Carpentry Lab", credits: 2 }
        ],
        2: [
            { code: "2001", name: "Applied Mathematics II", credits: 4 },
            { code: "2002", name: "Material Science & Metallurgy", credits: 3 },
            { code: "2003", name: "Manufacturing Processes I (Casting/Welding)", credits: 4 },
            { code: "2004", name: "Machine Drawing & Computer Drafting", credits: 3 },
            { code: "2005", name: "Welding & Foundry Lab", credits: 2 },
            { code: "2006", name: "Material Testing Lab", credits: 2 }
        ],
        3: [
            { code: "3401", name: "Strength of Materials", credits: 4 },
            { code: "3402", name: "Thermal Engineering I", credits: 4 },
            { code: "3403", name: "Manufacturing Technology (Machining)", credits: 3 },
            { code: "3404", name: "Fluid Mechanics & Machinery", credits: 3 },
            { code: "3405", name: "Machine Shop Practice Lab", credits: 2 },
            { code: "3406", name: "Fluid Power Lab", credits: 2 }
        ],
        4: [
            { code: "4401", name: "Theory of Machines & Mechanisms", credits: 4 },
            { code: "4402", name: "Thermal Engineering II (IC Engines & RAC)", credits: 4 },
            { code: "4403", name: "Metrology & Quality Control", credits: 3 },
            { code: "4404", name: "Applied Electrical & Electronics in Mech", credits: 3 },
            { code: "4405", name: "Thermal Engg Lab", credits: 2 },
            { code: "4406", name: "SolidWorks / CAD Modeling Lab", credits: 2 }
        ],
        5: [
            { code: "5401", name: "Design of Machine Elements", credits: 4 },
            { code: "5402", name: "Industrial Engineering & Operations Research", credits: 3 },
            { code: "5403", name: "CNC Machines & Automation", credits: 4 },
            { code: "5404", name: "Refrigeration & Air Conditioning", credits: 3 },
            { code: "5405", name: "CNC Programming & CAM Lab", credits: 2 },
            { code: "5406", name: "Mini Project & Field Survey", credits: 3 }
        ],
        6: [
            { code: "6401", name: "Power Plant Engineering", credits: 3 },
            { code: "6402", name: "Mechatronics & Robotics", credits: 4 },
            { code: "6403", name: "Automobile Engineering", credits: 3 },
            { code: "6404", name: "Mechatronics & FEA Lab", credits: 2 },
            { code: "6405", name: "Major Capstone Project & Viva", credits: 6 }
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUBJECTS_DATA };
}
