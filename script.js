document.addEventListener("DOMContentLoaded", function () {
    // Replace with your Google Sheet ID and API key
    const sheetId = '1zFkn6MAbf_xnzsl3b605HCqCNRzNkZsuSmXe3GWAqzs';
    const apiKey = 'AIzaSyBaDaPUmaa4Fch3HHQXUZPKVKB7TOU4LfU';
    const range = 'Sheet1!A2:B2'; // Adjust this based on where your data is

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Assuming the first column contains mood and the second contains activity
            const mood = data.values[0][0];
            const activity = data.values[0][1];

            document.getElementById('mood').textContent = mood;
            document.getElementById('activity').textContent = activity;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('mood').textContent = 'Error loading mood';
            document.getElementById('activity').textContent = 'Error loading activity';
        });
});
