// utils.js - Helper Functions (CO5)
export function updateClock() {
    const clock = document.getElementById('clock');
    if (clock) {
        clock.innerText = new Date().toLocaleTimeString('en-IN', { hour12: false }) + " HRS";
    }
}

export function showStatus(msg, type) {
    const errorBox = document.getElementById('error-msg');
    errorBox.innerText = msg;
    errorBox.style.display = "block";
    errorBox.className = `p-3 rounded font-monospace fs-6 mb-4 ${type === 'error' ? 'bg-danger-subtle text-danger border border-danger' : 'bg-success-subtle text-success border border-success'}`;
}