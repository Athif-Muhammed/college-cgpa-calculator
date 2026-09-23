/**
 * PolyCGPA - App Utilities, Theme Controller & Auth Helper
 * Lightweight, zero-dependency helper for theme toggling, auth session, and notifications.
 */

const App = {
    init() {
        this.initTheme();
        this.initAuthUI();
        this.highlightActiveNav();
    },

    // -------------------------------------------------------------
    // THEME MANAGEMENT (Light by default, Dark toggle)
    // -------------------------------------------------------------
    initTheme() {
        const savedTheme = localStorage.getItem("polycgpa_theme") || "light";
        if (savedTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
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
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        const newTheme = isDark ? "light" : "dark";

        if (newTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
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
        btn.innerHTML = theme === "dark" 
            ? '<span>☀️</span> Light' 
            : '<span>🌙</span> Dark';
    },

    // -------------------------------------------------------------
    // SIMPLE AUTH / USER SESSION UI
    // -------------------------------------------------------------
    initAuthUI() {
        const authContainer = document.getElementById("navAuthContainer");
        if (!authContainer) return;

        const user = localStorage.getItem("polycgpa_user");
        if (user) {
            authContainer.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 13px; font-weight: 600; color: var(--text-main);">👤 ${this.escapeHTML(user)}</span>
                    <button class="btn btn-secondary btn-sm" id="signOutBtn" title="Sign Out">
                        Sign Out
                    </button>
                </div>
            `;
            const signOutBtn = document.getElementById("signOutBtn");
            if (signOutBtn) {
                signOutBtn.addEventListener("click", () => {
                    localStorage.removeItem("polycgpa_user");
                    this.initAuthUI();
                    this.toast("Signed out successfully", "info");
                });
            }
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="btn btn-primary btn-sm">
                    Sign In
                </a>
            `;
        }
    },

    escapeHTML(str) {
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
    },

    // -------------------------------------------------------------
    // ACTIVE NAV HIGHLIGHT
    // -------------------------------------------------------------
    highlightActiveNav() {
        const path = window.location.pathname;
        const page = path.split("/").pop() || "index.html";

        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href && (href === page || (page === "" && href === "index.html"))) {
                link.classList.add("active");
            }
        });
    },

    // -------------------------------------------------------------
    // TOAST NOTIFICATIONS
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

        setTimeout(() => toast.classList.add("show"), 10);
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});