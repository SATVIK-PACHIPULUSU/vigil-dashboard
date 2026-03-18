const reportForm = document.getElementById('incident-form');

reportForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Form Validation
    const type = document.getElementById('disaster-type').value;
    const loc = document.getElementById('location').value;

    if (!type || !loc) {
        alert("Please fill all fields!");
        return;
    }

    // 2. Local Storage
    const report = { type, loc, time: new Date().toLocaleTimeString() };
    let history = JSON.parse(localStorage.getItem('reports')) || [];
    history.push(report);
    localStorage.setItem('reports', JSON.stringify(history));

    // 3. Dynamic Input Handling (Feedback)
    const btn = e.target.querySelector('button');
    btn.innerText = "Sent!";
    setTimeout(() => { btn.innerText = "Send Urgent Report"; }, 2000);

    alert("Report saved to Local Storage and Sent!");
});