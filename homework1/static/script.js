// Function to accept an application
function acceptApplication() {
    const name = document.getElementById('applicantName').value;
    const zipcode = document.getElementById('zipcode').value;

    fetch('/api/accept_application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, zipcode }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('applicationResponse').innerText = `Application accepted. Your application number is: ${data.application_number}`;
        })
        .catch(error => console.error('Error accepting application:', error));
}

// Function to check application status
function checkStatus() {
    const applicationNumber = document.getElementById('applicationNumber').value;

    fetch(`/api/check_status/${applicationNumber}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('statusResponse').innerText = `Status: ${data.status}`;
        })
        .catch(error => console.error('Error checking status:', error));
}

// Function to change application status
function changeStatus() {
    const applicationNumber = document.getElementById('applicationNumberChange').value;
    const newStatus = document.getElementById('newStatus').value;

    fetch('/api/change_status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ application_number: applicationNumber, status: newStatus }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('statusResponse').innerText = `Status updated: ${data.message}`;
        })
        .catch(error => console.error('Error changing status:', error));
}
