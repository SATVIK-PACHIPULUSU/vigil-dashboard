/**
 * VIGIL DATA FEED
 * Handles the Live Intel Sidebar and the Bottom Ticker
 */

function loadAlerts() {
    const list = document.getElementById('alerts-list');
    const ticker = document.getElementById('ticker-content');

    // --- 1. LOAD SIDEBAR ALERTS (From LocalStorage) ---
    // Retrieve reports saved by script.js
    const reports = JSON.parse(localStorage.getItem('vigil_reports')) || [];

    if (list) {
        if (reports.length === 0) {
            list.innerHTML = `<div class="alert-item" style="border-left: 3px solid #666; opacity: 0.5;">
                                <p>NO ACTIVE INCIDENTS REPORTED</p>
                              </div>`;
        } else {
            // Mapping through reports to create HTML blocks
            list.innerHTML = reports.map(r => `
                <div class="alert-item">
                    <span class="tag" style="color: #ff3b30; font-weight: bold; font-size: 10px;">
                        ${(r.type || 'UNKNOWN').toUpperCase()}
                    </span>
                    <p style="font-size: 13px; margin: 5px 0;">${r.description || 'No details provided.'}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <small style="color: #444; font-size: 9px;">ID: ${r.id}</small>
                        <small style="color: #007aff; font-size: 9px;">${r.timestamp || ''}</small>
                    </div>
                </div>
            `).join('');
        }
    }

    // --- 2. LOAD LIVE TICKER (Intel Bar) ---
    if (ticker) {
        // Static system messages + dynamic count of active reports
        const systemIntel = [
            "SYSTEM STATUS: ALL NODES ONLINE //",
            `ACTIVE INCIDENTS: ${reports.length.toString().padStart(2, '0')} //`,
            "NDMA: REGIONAL WEATHER ALERT ACTIVE //",
            "VIGIL: ENCRYPTED DATA CHANNEL STABLE //",
            "SACHET: FLASH FLOOD WARNING FOR LOW-LYING AREAS //"
        ];

        // Combine system intel with any recent incident types
        const recentTypes = reports.slice(0, 3).map(r => `REPORT: ${r.type.toUpperCase()} IN ZONE //`);
        const fullIntel = [...systemIntel, ...recentTypes];

        // CRITICAL FIX: Using backticks for the template literal
        ticker.innerHTML = fullIntel.map(text => `
            <span class="ticker__item" style="padding-right: 50px;">${text}</span>
        `).join("");
    }
}

// Ensure the feed loads as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', loadAlerts);

// Optional: Refresh the feed every 30 seconds to keep counts updated
setInterval(loadAlerts, 30000);
