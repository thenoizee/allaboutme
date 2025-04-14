// Function to fetch data from Google Sheets (existing data from your spreadsheet)
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
    const lastFmApiKey = 'bbe174cee73e51f0c2ef046f2b79689b'; // Replace with your Last.fm API key
    const username = 'thesamsterz'; // Replace with your Last.fm username
    const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${lastFmApiKey}&format=json&limit=1`;

    fetch(lastFmUrl)
        .then(response => response.json())
        .then(data => {
            const recentTracks = data.recenttracks.track;
            if (recentTracks && recentTracks.length > 0) {
                const latestTrack = recentTracks[0]; // Get the most recent track
                const songName = latestTrack.name;
                const artistName = latestTrack.artist['#text'];
                const albumArt = latestTrack.image[2]['#text']; // Get medium-sized album art

                document.getElementById('song-name').textContent = songName || 'No song found';
                document.getElementById('artist-name').textContent = artistName || 'No artist found';

                if (albumArt) {
                    document.getElementById('album-art').src = albumArt;
                    document.getElementById('album-art').alt = `${songName} album art`;
                    document.getElementById('album-art').style.display = 'block'; // Show the album art
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data from Last.fm:', error);
        });
}

// Function to fetch the latest watched movie or episode from Trakt.tv
function fetchTraktData() {
    const traktApiKey = '46c509e2cef42228978ae6a69b138628a6399c0bf28b729b7883b19ab9b082eb'; // Your Trakt API key
    const username = 'thesamsterz'; // Trakt.tv username
    const traktUrl = `https://api.trakt.tv/users/${username}/history?limit=1`;

    fetch(traktUrl, {
        headers: {
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key': traktApiKey, // Correct header for API key
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const latestWatch = data[0];
                const title = latestWatch.movie ? latestWatch.movie.title : latestWatch.episode.title;
                const type = latestWatch.movie ? 'Movie' : 'TV Episode';

                document.getElementById('trakt-title').textContent = title || 'No title found';
                document.getElementById('trakt-type').textContent = type || 'No type found';

                const posterUrl = latestWatch.movie
                    ? latestWatch.movie.images?.poster?.thumb
                    : latestWatch.show?.images?.poster?.thumb;

                if (posterUrl) {
                    document.getElementById('trakt-poster').src = posterUrl;
                    document.getElementById('trakt-poster').alt = `${title} poster`;
                    document.getElementById('trakt-poster').style.display = 'block';
                } else {
                    document.getElementById('trakt-poster').style.display = 'none';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data from Trakt.tv:', error);
        });
}

// Fetch data immediately on page load
fetchData();
fetchLastFmData();
fetchTraktData();

// Automatically refresh the data every 60 seconds
setInterval(fetchData, 60000);
setInterval(fetchLastFmData, 60000);
setInterval(fetchTraktData, 60000);
