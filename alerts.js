function loadAlerts() {
    const list = document.getElementById('alerts-list');
    const ticker = document.getElementById('ticker-content');

    // Load stored reports
    const reports = JSON.parse(localStorage.getItem('vigil_reports')) || [];
    if (list) {
        list.innerHTML = reports.map(r => `
            <div class="alert-item">
                <span class="tag">${r.type.toUpperCase()}</span>
                <p style="font-size: 13px; margin-top:5px;">${r.description}</p>
                <small style="color: #444; font-size: 10px;">ID: ${r.id} // ${r.timestamp}</small>
            </div>
        `).join('');
    }

    // Load Ticker
    if (ticker) {
        const intel = ["SACHET: Rain alert Hyderabad //", "NDMA: Heatwave active //", "VIGIL: Nodes Online //"];
        ticker.innerHTML = intel.map(i => `<span class="ticker__item">${i}</span>`).join("");
    }
}

window.addEventListener('DOMContentLoaded', loadAlerts);