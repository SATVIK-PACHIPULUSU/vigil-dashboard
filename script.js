/**
 * VIGIL SYSTEM CONTROL
 * Main script handling Clock, GPS, and Report Submission
 */

// --- 1. SYSTEM INITIALIZATION ---
// Using DOMContentLoaded is safer than window.onload
document.addEventListener('DOMContentLoaded', () => {
    initClock();
    
    // Only run Map/GPS if those elements exist on the current page
    if (document.getElementById('map')) {
        initDashboardMap();
    }
    
    if (document.getElementById('coords')) {
        initGPS();
    }

    // Call loadAlerts from alerts.js if it exists
    if (typeof loadAlerts === 'function') {
        loadAlerts();
    }
});

// --- 2. SYSTEM CLOCK (Fixes the Timing Issue) ---
function initClock() {
    const clock = document.getElementById('clock');
    if (!clock) return;

    const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        clock.innerText = `${timeString} HRS`;
    };

    updateTime(); // Run immediately
    setInterval(updateTime, 1000); // Update every second
}

// --- 3. REPORT CLASSIFICATION ---
let selectedType = "";

// Matches the 'onclick' in your report.html
function selectType(btn, type) {
    // Remove 'selected' class from all buttons in the grid
    const buttons = document.querySelectorAll('.class-btn');
    buttons.forEach(b => b.classList.remove('selected'));
    
    // Add 'selected' class to the clicked button
    btn.classList.add('selected');
    selectedType = type;
}

// --- 4. FORM VALIDATION & STORAGE ---
function validateReport() {
    const desc = document.getElementById('sitReport').value;
    const coords = document.getElementById('coords').value;

    // Basic Validation
    if (!selectedType) {
        alert("CRITICAL ERROR: NO INCIDENT TYPE SELECTED");
        return;
    }
    if (desc.length < 5) {
        alert("ERROR: SITUATION REPORT TOO SHORT");
        return;
    }

    // Create Report Object
    const id = "VIG-" + Math.floor(1000 + Math.random() * 9000);
    const report = {
        id: id,
        type: selectedType,
        description: desc,
        location: coords,
        timestamp: new Date().toLocaleTimeString()
    };

    // Save to LocalStorage
    const existing = JSON.parse(localStorage.getItem('vigil_reports')) || [];
    existing.unshift(report); // Add new report to the top
    localStorage.setItem('vigil_reports', JSON.stringify(existing));

    alert(`TRANSMISSION SUCCESSFUL: ${id}`);
    
    // Redirect back to dashboard to see the new alert
    window.location.href = "index.html";
}

// --- 5. GPS TRACKING ---
function initGPS() {
    const coordsInput = document.getElementById('coords');
    if (!coordsInput) return;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                coordsInput.value = `LAT: ${lat} // LONG: ${lon}`;
            },
            (error) => {
                coordsInput.value = "GPS: SIGNAL LOST / DENIED";
                console.error("GPS Error:", error);
            }
        );
    } else {
        coordsInput.value = "GPS: NOT SUPPORTED";
    }
}

// --- 6. DASHBOARD MAP (Fallback if map.js fails) ---
function initDashboardMap() {
    // Check if Leaflet (L) is loaded
    if (typeof L === 'undefined') return;

    const map = L.map('map', { zoomControl: false }).setView([17.3850, 78.4867], 13);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB'
    }).addTo(map);

    // Optional: Pulse at center
    L.circle([17.3850, 78.4867], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 500
    }).addTo(map);
}
