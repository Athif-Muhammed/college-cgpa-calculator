/**
 * PolyCGPA Authentication & Profile Service
 * Manages user accounts, active session, student profile, and localStorage data persistence.
 */

const STORAGE_KEYS = {
    ACTIVE_USER: "polycgpa_active_user",
    USERS_DB: "polycgpa_users_db",
    THEME: "polycgpa_theme"
};

// Seed demo student with realistic semester data
const DEMO_STUDENT = {
    id: "POLY2024-CSE-042",
    name: "Aarav Sharma",
    email: "aarav.sharma@polytechnic.edu",
    password: "password123",
    college: "Government Polytechnic College",
    department: "cse",
    semester: 4,
    avatar: null,
    createdAt: new Date().toISOString(),
    history: [
        {
            semester: 1,
            sgpa: 8.20,
            credits: 20,
            date: "2023-12-15",
            subjects: [
                { name: "Communication Skills in English", credits: 3, grade: "A", points: 9 },
                { name: "Engineering Mathematics I", credits: 4, grade: "B+", points: 8 },
                { name: "Applied Physics", credits: 3, grade: "A", points: 9 },
                { name: "Applied Chemistry", credits: 3, grade: "B", points: 7 },
                { name: "Basic Electrical & Electronics Engg", credits: 3, grade: "A+", points: 10 },
                { name: "Basic Workshop Practice Lab", credits: 2, grade: "A+", points: 10 },
                { name: "Physics & Chemistry Lab", credits: 2, grade: "A", points: 9 }
            ]
        },
        {
            semester: 2,
            sgpa: 8.45,
            credits: 20,
            date: "2024-05-20",
            subjects: [
                { name: "Applied Mathematics II", credits: 4, grade: "A", points: 9 },
                { name: "Environmental Sustainability", credits: 2, grade: "A+", points: 10 },
                { name: "C Programming & Logic Building", credits: 4, grade: "A+", points: 10 },
                { name: "Engineering Graphics & CAD", credits: 3, grade: "B+", points: 8 },
                { name: "Digital Fundamentals", credits: 3, grade: "B+", points: 8 },
                { name: "C Programming Lab", credits: 2, grade: "A+", points: 10 },
                { name: "Digital Electronics Lab", credits: 2, grade: "A", points: 9 }
            ]
        },
        {
            semester: 3,
            sgpa: 8.42,
            credits: 23,
            date: "2024-12-10",
            subjects: [
                { name: "Discrete Mathematics", credits: 4, grade: "A+", points: 10 },
                { name: "Data Structures Using C/C++", credits: 4, grade: "A", points: 9 },
                { name: "Computer Organization & Architecture", credits: 3, grade: "A+", points: 10 },
                { name: "Database Management Systems", credits: 4, grade: "B+", points: 8 },
                { name: "Object Oriented Programming in Java", credits: 4, grade: "A", points: 9 },
                { name: "Data Structures Lab", credits: 2, grade: "A+", points: 10 },
                { name: "DBMS & SQL Lab", credits: 2, grade: "A+", points: 10 }
            ]
        },
        {
            semester: 4,
            sgpa: 8.70,
            credits: 22,
            date: "2025-05-25",
            subjects: [
                { name: "Operating System Concepts", credits: 4, grade: "A+", points: 10 },
                { name: "Computer Networks & Protocols", credits: 4, grade: "A", points: 9 },
                { name: "Software Engineering & Agile", credits: 3, grade: "A+", points: 10 },
                { name: "Web Development Technologies", credits: 4, grade: "A+", points: 10 },
                { name: "Python Programming", credits: 3, grade: "B+", points: 8 },
                { name: "Linux & OS Lab", credits: 2, grade: "A+", points: 10 },
                { name: "Web Development Lab", credits: 2, grade: "A+", points: 10 }
            ]
        }
    ]
};

const AuthService = {
    // Initialize database in LocalStorage if not exists
    _initDB() {
        let users = [];
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.USERS_DB);
            if (raw) {
                users = JSON.parse(raw);
            }
        } catch (e) {
            console.error("Error reading users db:", e);
        }

        // Seed demo student if not present
        if (!users.some(u => u.email === DEMO_STUDENT.email || u.id === DEMO_STUDENT.id)) {
            users.push(DEMO_STUDENT);
            localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
        }

        return users;
    },

    // Get current logged-in user
    getCurrentUser() {
        this._initDB();
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
            if (raw) {
                const session = JSON.parse(raw);
                // Return fresh data from DB
                const users = this._getUsers();
                const fresh = users.find(u => u.id === session.id || u.email === session.email);
                return fresh || session;
            }
        } catch (e) {
            console.error("Error getting active user:", e);
        }
        return null;
    },

    // Internal helper to get all users
    _getUsers() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.USERS_DB);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    },

    // Save users DB
    _saveUsers(users) {
        localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
    },

    // Register a new student
    register(studentData) {
        this._initDB();
        const users = this._getUsers();

        const cleanEmail = (studentData.email || "").trim().toLowerCase();
        const cleanId = (studentData.id || "").trim();

        if (!cleanEmail || !studentData.password || !studentData.name) {
            return { success: false, error: "Please fill in all required fields." };
        }

        if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
            return { success: false, error: "An account with this email already exists." };
        }

        if (cleanId && users.some(u => u.id && u.id.toLowerCase() === cleanId.toLowerCase())) {
            return { success: false, error: "This Student ID is already registered." };
        }

        const newUser = {
            id: cleanId || `POLY-${Date.now().toString().slice(-6)}`,
            name: studentData.name.trim(),
            email: cleanEmail,
            password: studentData.password,
            college: studentData.college ? studentData.college.trim() : "State Polytechnic Institute",
            department: studentData.department || "cse",
            semester: parseInt(studentData.semester, 10) || 1,
            avatar: null,
            createdAt: new Date().toISOString(),
            history: []
        };

        users.push(newUser);
        this._saveUsers(users);

        // Auto login
        this.login(cleanEmail, studentData.password);
        return { success: true, user: newUser };
    },

    // Login student
    login(identifier, password, remember = true) {
        this._initDB();
        const users = this._getUsers();
        const cleanId = (identifier || "").trim().toLowerCase();

        const user = users.find(u => 
            (u.email.toLowerCase() === cleanId || (u.id && u.id.toLowerCase() === cleanId)) && 
            u.password === password
        );

        if (!user) {
            return { success: false, error: "Invalid Email/Student ID or password." };
        }

        const sessionData = {
            id: user.id,
            email: user.email,
            name: user.name,
            department: user.department,
            semester: user.semester,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(sessionData));
        return { success: true, user };
    },

    // Login as Demo Student
    loginDemo() {
        this._initDB();
        return this.login(DEMO_STUDENT.email, DEMO_STUDENT.password);
    },

    // Logout
    logout() {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
        window.location.href = "login.html";
    },

    // Update student profile
    updateProfile(updatedFields) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return { success: false, error: "Not logged in." };

        const users = this._getUsers();
        const index = users.findIndex(u => u.id === currentUser.id || u.email === currentUser.email);

        if (index === -1) return { success: false, error: "User record not found." };

        users[index] = {
            ...users[index],
            name: updatedFields.name || users[index].name,
            college: updatedFields.college !== undefined ? updatedFields.college : users[index].college,
            department: updatedFields.department || users[index].department,
            semester: updatedFields.semester ? parseInt(updatedFields.semester, 10) : users[index].semester,
            avatar: updatedFields.avatar !== undefined ? updatedFields.avatar : users[index].avatar
        };

        this._saveUsers(users);
        localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(users[index]));
        return { success: true, user: users[index] };
    },

    // Save or update a semester result in student's history
    saveSemesterResult(semesterResult) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return { success: false, error: "Not logged in." };

        const users = this._getUsers();
        const index = users.findIndex(u => u.id === currentUser.id || u.email === currentUser.email);
        if (index === -1) return { success: false, error: "User not found." };

        const history = users[index].history || [];
        const semNumber = parseInt(semesterResult.semester, 10);

        const existingIdx = history.findIndex(h => parseInt(h.semester, 10) === semNumber);

        const entry = {
            semester: semNumber,
            sgpa: parseFloat(semesterResult.sgpa),
            credits: parseFloat(semesterResult.credits || semesterResult.totalCredits),
            date: new Date().toISOString().split('T')[0],
            subjects: semesterResult.subjects || []
        };

        if (existingIdx >= 0) {
            history[existingIdx] = entry;
        } else {
            history.push(entry);
        }

        // Sort ascending
        history.sort((a, b) => a.semester - b.semester);
        users[index].history = history;

        this._saveUsers(users);
        return { success: true, history };
    },

    // Delete a semester from history
    deleteSemesterResult(semNumber) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return { success: false, error: "Not logged in." };

        const users = this._getUsers();
        const index = users.findIndex(u => u.id === currentUser.id || u.email === currentUser.email);
        if (index === -1) return { success: false, error: "User not found." };

        users[index].history = (users[index].history || []).filter(h => parseInt(h.semester, 10) !== parseInt(semNumber, 10));
        this._saveUsers(users);
        return { success: true, history: users[index].history };
    },

    // Clear all history for current student
    clearAllHistory() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return { success: false, error: "Not logged in." };

        const users = this._getUsers();
        const index = users.findIndex(u => u.id === currentUser.id || u.email === currentUser.email);
        if (index === -1) return { success: false, error: "User not found." };

        users[index].history = [];
        this._saveUsers(users);
        return { success: true };
    },

    // Session Route Guard for portal pages
    requireAuth() {
        const user = this.getCurrentUser();
        if (!user) {
            // Check if there are query parameters or just redirect
            window.location.href = "login.html";
            return null;
        }
        return user;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthService, STORAGE_KEYS, DEMO_STUDENT };
}
