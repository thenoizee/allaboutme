function fetchData() {
    const sheetId = '1zFkn6MAbf_xnzsl3b605HCqCNRzNkZsuSmXe3GWAqzs';
    const apiKey = 'AIzaSyBaDaPUmaa4Fch3HHQXUZPKVKB7TOU4LfU';
    const sheetRange = 'Sheet1!A:C';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            if (rows && rows.length > 1) {
                const lastRow = rows[rows.length - 1];
                const mood = lastRow[0];
                const activity = lastRow[1];
				const screentime = lastRow[2];
                document.getElementById('mood').textContent = mood || 'No data';
                document.getElementById('activity').textContent = activity || 'No data';
				document.getElementById('screentime').textContent = screentime || 'No data';
            } else {
                document.getElementById('mood').textContent = 'No data found';
                document.getElementById('activity').textContent = 'No data found';
				document.getElementById('screentime').textContent = 'No data found';
				
            }
        })
        .catch(error => {
            console.error('Error fetching latest data:', error);
            document.getElementById('mood').textContent = 'Error loading latest data';
            document.getElementById('activity').textContent = 'Error loading latest data';
			document.getElementById('screentime').textContent = 'Error loading latest data';
        });
}

// Fetch data immediately on page load
fetchData();

// Automatically refresh the data every 60 seconds
setInterval(fetchData, 60000);