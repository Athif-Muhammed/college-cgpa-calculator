/**
 * PolyCGPA - Auth & UI Helper
 */

const App = {
    init() {
        this.initAuthUI();
    },

    // Simple Auth UI
    initAuthUI() {
        const authContainer = document.getElementById("navAuth");
        if (!authContainer) return;

        const user = localStorage.getItem("polycgpa_user");
        if (user) {
            authContainer.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 13px; font-weight: 600; color: var(--text);">👤 ${this.escapeHTML(user)}</span>
                    <button type="button" class="btn btn-secondary btn-sm" id="signOutBtn" title="Sign Out">Sign Out</button>
                </div>
            `;
            document.getElementById("signOutBtn")?.addEventListener("click", () => {
                localStorage.removeItem("polycgpa_user");
                alert("You have signed out.");
                window.location.reload();
            });
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="btn btn-primary btn-sm">Sign In</a>
            `;
        }
    },

    escapeHTML(str) {
        if (typeof str !== "string") return "";
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});