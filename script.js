function fetchData() {
    const sheetId = '1zFkn6MAbf_xnzsl3b605HCqCNRzNkZsuSmXe3GWAqzs';
    const apiKey = 'AIzaSyBaDaPUmaa4Fch3HHQXUZPKVKB7TOU4LfU';
    const sheetRange = 'Sheet1!A:F';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            if (rows && rows.length > 1) {
                const lastRow = rows[rows.length - 1]; 
				
                const mood = lastRow[0];
                const laptoptime = lastRow[1];
				const phonetime = lastRow[2];
				const TTR = lastRow[3];
				const retainers = lastRow[4];
				const productiveness = lastRow[5];

                document.getElementById('mood').textContent = mood || 'No data';
                document.getElementById('laptoptime').textContent = laptoptime || 'No data';
				document.getElementById('phonetime').textContent = phonetime || 'No data';
				document.getElementById('TTR').textContent = TTR || 'No data';
				document.getElementById('retainers').textContent = retainers || 'No data';
				document.getElementById('productiveness').textContent = productiveness || 'No data';



            } else {
                document.getElementById('mood').textContent = 'No data found';
                document.getElementById('laptoptime').textContent = 'No data found';
				document.getElementById('phonetime').textContent = 'No data found';
				document.getElementById('TTR').textContent = 'No data found';
				document.getElementById('retainers').textContent = 'No data found';
				document.getElementById('productiveness').textContent = 'No data found';
				
            }
        })
        .catch(error => {
            console.error('Error fetching latest data:', error);
            document.getElementById('mood').textContent = 'Error loading latest data';
            document.getElementById('laptoptime').textContent = 'Error loading latest data';
			document.getElementById('phonetime').textContent = 'Error loading latest data';
			document.getElementById('TTR').textContent = 'Error loading latest data';
			document.getElementById('retainers').textContent = 'Error loading latest data';
			document.getElementById('productiveness').textContent = 'Error loading latest data';


        });
}

// Fetch data immediately on page load
fetchData();

// Automatically refresh the data every 60 seconds
setInterval(fetchData, 60000);