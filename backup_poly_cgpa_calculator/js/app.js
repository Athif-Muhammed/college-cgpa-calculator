/**
 * PolyCGPA - App & Auth Helper
 */
const App = {
    init() {
        const auth = document.getElementById("navAuth");
        if (!auth) return;

        const user = localStorage.getItem("polycgpa_user");
        if (user) {
            auth.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:13px; font-weight:600;">👤 ${user}</span>
                    <button type="button" class="btn btn-secondary btn-sm" id="signOutBtn">Sign Out</button>
                </div>
            `;
            document.getElementById("signOutBtn")?.addEventListener("click", () => {
                localStorage.removeItem("polycgpa_user");
                window.location.reload();
            });
        } else {
            auth.innerHTML = `<a href="login.html" class="btn btn-primary btn-sm">Sign In</a>`;
        }
    }
};

document.addEventListener("DOMContentLoaded", () => App.init());