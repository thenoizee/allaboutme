// Function to fetch data from Google Sheets
function fetchData() {
    const sheetId = '1zFkn6MAbf_xnzsl3b605HCqCNRzNkZsuSmXe3GWAqzs';
    const apiKey = 'AIzaSyBaDaPUmaa4Fch3HHQXUZPKVKB7TOU4LfU';
    const sheetRange = 'Sheet1!A:G';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            if (rows && rows.length > 1) {
                const lastRow = rows[rows.length - 1];
                document.getElementById('mood').textContent = lastRow[0] || 'No data';
                document.getElementById('laptoptime').textContent = lastRow[1] || 'No data';
                document.getElementById('phonetime').textContent = lastRow[2] || 'No data';
                document.getElementById('TTR').textContent = lastRow[3] || 'No data';
                document.getElementById('retainers').textContent = lastRow[4] || 'No data';
                document.getElementById('productiveness').textContent = lastRow[5] || 'No data';
                document.getElementById('working').textContent = lastRow[6] || 'No data';
            }
        })
        .catch(error => {
            console.error('Error fetching latest data:', error);
        });
}

// Function to fetch latest song from Last.fm
function fetchLastFmData() {
    const lastFmApiKey = 'bbe174cee73e51f0c2ef046f2b79689b';
    const username = 'thesamsterz';
    const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${lastFmApiKey}&format=json&limit=1`;

    fetch(lastFmUrl)
        .then(response => response.json())
        .then(data => {
            const recentTracks = data.recenttracks.track;
            if (recentTracks && recentTracks.length > 0) {
                const latestTrack = recentTracks[0];
                const songName = latestTrack.name;
                const artistName = latestTrack.artist['#text'];
                const albumArt = latestTrack.image[2]['#text'];

                document.getElementById('song-name').textContent = songName || 'No song found';
                document.getElementById('artist-name').textContent = artistName || 'No artist found';

                if (albumArt) {
                    document.getElementById('album-art').src = albumArt;
                    document.getElementById('album-art').alt = `${songName} album art`;
                    document.getElementById('album-art').style.display = 'block';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data from Last.fm:', error);
        });
}

// Function to fetch the latest watched movie or episode from Trakt.tv
// This function now uses the third-party widget URL
function fetchTraktData() {
    const username = 'thesamsterz';
    const traktPosterUrl = `https://trakt-widgets.vercel.app/${username}/watched/poster`;

    const posterElement = document.getElementById('trakt-poster');

    if (posterElement) {
        posterElement.src = traktPosterUrl;
        posterElement.alt = `Latest watched by ${username}`;
        posterElement.style.display = 'block';
    }

    // Since the widget URL returns an image directly, there's no need to fetch JSON data.
    // The browser handles the image loading automatically.
    // If you had text elements for title and type, they are no longer updated by this function.
    // You would either need to use a different widget view (like "text")
    // or remove those HTML elements.
    const titleElement = document.getElementById('trakt-title');
    const typeElement = document.getElementById('trakt-type');

    if (titleElement) {
        titleElement.textContent = 'Latest Trakt Item';
    }

    if (typeElement) {
        typeElement.textContent = 'Loading...';
    }
}

// Fetch data immediately on page load
fetchData();
fetchLastFmData();
fetchTraktData();

// Automatically refresh the data every 60 seconds
setInterval(fetchData, 60000);
setInterval(fetchLastFmData, 60000);
setInterval(fetchTraktData, 60000);

