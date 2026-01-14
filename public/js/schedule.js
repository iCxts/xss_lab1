// Fetch and display schedule
async function loadSchedule() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const day = params.get('day');
    const student = params.get('student');

    const display = document.getElementById('schedule-display');
    const studentInfo = document.getElementById('student-info');

    // VULNERABLE: Using innerHTML with unsanitized input (DOM-based XSS)
    if (student) {
        studentInfo.innerHTML = '<div class="welcome-msg">Welcome, ' + student + '!</div>';
    }

    if (day) {
        try {
            const response = await fetch('/api/schedule');
            const scheduleData = await response.json();

            if (scheduleData[day]) {
                let html = '<h2>' + day.charAt(0).toUpperCase() + day.slice(1) + '</h2>';
                html += '<table><thead><tr><th>Class</th></tr></thead><tbody>';
                scheduleData[day].forEach(item => {
                    html += '<tr><td>' + item + '</td></tr>';
                });
                html += '</tbody></table>';
                display.innerHTML = html;
            } else {
                // VULNERABLE: Day parameter reflected without sanitization
                display.innerHTML = '<p>No schedule found for: ' + day + '</p>';
            }
        } catch (error) {
            display.innerHTML = '<p>Error loading schedule</p>';
        }
    }
}

// Load on page load and hash change
window.addEventListener('load', loadSchedule);
window.addEventListener('hashchange', loadSchedule);
