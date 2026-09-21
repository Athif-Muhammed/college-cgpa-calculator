/**
 * PolyCGPA Global App Utilities & UI Helpers
 */

const App = {
    init() {
        this.initTheme();
        this.initMobileSidebar();
        this.initUserHeader();
        this.initModals();
        this.highlightActiveNav();
    },

    // -------------------------------------------------------------
    // THEME MANAGEMENT (Dark / Mint Light)
    // -------------------------------------------------------------
    initTheme() {
        const savedTheme = localStorage.getItem("polycgpa_theme") || "dark";
        if (savedTheme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }

        const themeToggles = document.querySelectorAll(".theme-toggle-btn");
        themeToggles.forEach(btn => {
            btn.addEventListener("click", () => this.toggleTheme());
            this.updateThemeButton(btn, savedTheme);
        });
    },

    toggleTheme() {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        const newTheme = isLight ? "dark" : "light";

        if (newTheme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }

        localStorage.setItem("polycgpa_theme", newTheme);

        const themeToggles = document.querySelectorAll(".theme-toggle-btn");
        themeToggles.forEach(btn => this.updateThemeButton(btn, newTheme));
        this.toast(`Switched to ${newTheme} mode`, "info");
    },

    updateThemeButton(btn, theme) {
        if (!btn) return;
        btn.innerHTML = theme === "light" 
            ? '<span>🌙</span> Dark Mode' 
            : '<span>☀️</span> Light Mode';
    },

    // -------------------------------------------------------------
    // MOBILE NAVIGATION DRAWER
    // -------------------------------------------------------------
    initMobileSidebar() {
        const toggleBtn = document.getElementById("sidebarToggleBtn");
        const sidebar = document.querySelector(".portal-sidebar");
        const backdrop = document.getElementById("sidebarBackdrop");

        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener("click", () => {
                sidebar.classList.toggle("open");
                if (backdrop) backdrop.classList.toggle("show");
            });
        }

        if (backdrop) {
            backdrop.addEventListener("click", () => {
                if (sidebar) sidebar.classList.remove("open");
                backdrop.classList.remove("show");
            });
        }
    },

    // -------------------------------------------------------------
    // USER HEADER BINDING
    // -------------------------------------------------------------
    initUserHeader() {
        if (typeof AuthService === 'undefined') return;
        const user = AuthService.getCurrentUser();
        if (!user) return;

        // Populate avatar initials & student name
        const nameEls = document.querySelectorAll(".current-user-name");
        const deptEls = document.querySelectorAll(".current-user-dept");
        const semEls = document.querySelectorAll(".current-user-sem");
        const avatarEls = document.querySelectorAll(".user-avatar");

        const initials = user.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "ST";
        const deptObj = typeof DataService !== 'undefined' ? DataService.getDepartmentById(user.department) : null;
        const deptName = deptObj ? deptObj.name : (user.department || "Polytechnic");

        nameEls.forEach(el => el.textContent = user.name);
        deptEls.forEach(el => el.textContent = deptName);
        semEls.forEach(el => el.textContent = `Semester ${user.semester || 1}`);
        avatarEls.forEach(el => {
            el.textContent = initials;
            el.setAttribute("title", user.name);
        });

        // Logout triggers
        const logoutBtns = document.querySelectorAll(".logout-btn");
        logoutBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                AuthService.logout();
            });
        });
    },

    // -------------------------------------------------------------
    // ACTIVE NAV LINK HIGHLIGHTER
    // -------------------------------------------------------------
    highlightActiveNav() {
        const path = window.location.pathname;
        const page = path.split("/").pop() || "index.html";

        const navLinks = document.querySelectorAll(".nav-link, .sidebar-nav a");
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href && (href === page || (page === "" && href === "index.html"))) {
                link.classList.add("active");
            }
        });
    },

    // -------------------------------------------------------------
    // MODALS SETUP
    // -------------------------------------------------------------
    initModals() {
        const closeBtns = document.querySelectorAll("[data-close-modal]");
        closeBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const modal = btn.closest(".modal");
                if (modal) modal.classList.remove("active");
            });
        });

        // Click outside modal content to close
        document.querySelectorAll(".modal").forEach(modal => {
            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    modal.classList.remove("active");
                }
            });
        });
    },

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add("active");
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove("active");
    },

    // -------------------------------------------------------------
    // TOAST NOTIFICATION SYSTEM
    // -------------------------------------------------------------
    toast(message, type = "success") {
        let container = document.getElementById("toast-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "toast-container";
            container.className = "toast-container";
            document.body.appendChild(container);
        }

        const icons = {
            success: "✓",
            error: "✕",
            info: "ℹ",
            warning: "⚠"
        };

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || "✓"}</span>
            <span class="toast-text">${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 10);

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});