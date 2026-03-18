// --- SYSTEM INITIALIZATION ---
window.onload = () => {
    initClock();
    if (document.getElementById('map')) initDashboardMap();
    if (document.getElementById('alerts-list')) loadSavedAlerts();
    if (document.getElementById('coords')) initGPS();
};

// --- CO4: INTERACTIVITY (Clock) ---
function initClock() {
    setInterval(() => {
        const clock = document.getElementById('clock');
        if (clock) clock.innerText = new Date().toLocaleTimeString('en-IN', { hour12: false }) + " HRS";
    }, 1000);
}

// --- CO4: STORAGE (localStorage) ---
function loadSavedAlerts() {
    const list = document.getElementById('alerts-list');
    const reports = JSON.parse(localStorage.getItem('vigil_reports')) || [];
    // CO3: Array Method (map)
    list.innerHTML = reports.map(r => `
        <div class="alert-item" style="border-left: 3px solid #ff3b30; background: #181818; padding: 10px; margin-bottom: 10px;">
            <small style="color: #ff3b30; font-weight: bold;">${r.type.toUpperCase()}</small>
            <p style="font-size: 13px;">${r.desc}</p>
            <small style="color: #444;">ID: ${r.id} // ${r.time}</small>
        </div>
    `).join('');
}

// --- FORM VALIDATION ---
let selectedType = "";
function setType(btn, type) {
    document.querySelectorAll('.class-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedType = type;
}

function validateReport() {
    const desc = document.getElementById('sitReport').value;
    if (!selectedType || desc.length < 5) {
        alert("ERROR: INTEL INCOMPLETE"); return;
    }
    const id = "VIG-" + Math.floor(1000 + Math.random() * 9000);
    const report = { id, type: selectedType, desc, time: new Date().toLocaleTimeString() };

    const existing = JSON.parse(localStorage.getItem('vigil_reports')) || [];
    existing.unshift(report);
    localStorage.setItem('vigil_reports', JSON.stringify(existing));

    alert(`SUCCESS: ${id} TRANSMITTED`);
    window.location.href = "index.html";
}

// --- MAP & GPS ---
function initDashboardMap() {
    var map = L.map('map', { zoomControl: false }).setView([17.3850, 78.4867], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
}

function initGPS() {
    navigator.geolocation.getCurrentPosition(p => {
        document.getElementById('coords').value = `LAT: ${p.coords.latitude.toFixed(4)} // LONG: ${p.coords.longitude.toFixed(4)}`;
    });
}