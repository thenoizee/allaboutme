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

// Function to fetch the latest song from Last.fm
// This function includes the "Now Playing" status and a clickable song title link.
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
                const trackUrl = latestTrack.url;
                const isNowPlaying = latestTrack['@attr'] && latestTrack['@attr'].nowplaying === 'true';

                const songNameElement = document.getElementById('song-name');
                if (songNameElement) {
                    songNameElement.textContent = songName || 'No song found';
                    if (trackUrl) {
                        const link = document.createElement('a');
                        link.href = trackUrl;
                        link.textContent = songName;
                        link.target = "_blank";
                        songNameElement.innerHTML = '';
                        songNameElement.appendChild(link);
                    }
                }

                document.getElementById('artist-name').textContent = artistName || 'No artist found';

                if (albumArt) {
                    const albumArtElement = document.getElementById('album-art');
                    if (albumArtElement) {
                        albumArtElement.src = albumArt;
                        albumArtElement.alt = `${songName} album art`;
                        albumArtElement.style.display = 'block';
                    }
                }

                const nowPlayingElement = document.getElementById('now-playing-status');
                if (nowPlayingElement) {
                    nowPlayingElement.textContent = isNowPlaying ? 'Now Playing' : 'Last Played';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data from Last.fm:', error);
        });
}

// Function to fetch the latest watched movie or episode from Trakt.tv
// This function uses the original third-party widget URL and cannot display the title from the image.
function fetchTraktData() {
    const username = 'thesamsterz';
    const traktPosterUrl = `https://trakt-widgets.vercel.app/${username}/watched/poster`;

    const posterElement = document.getElementById('trakt-poster');

    if (posterElement) {
        posterElement.src = traktPosterUrl;
        posterElement.alt = `Latest watched by ${username}`;
        posterElement.style.display = 'block';
    }

    // Since the widget returns an image, there is no JSON data to parse.
    // We will set a generic title here.
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
window.onload = function() {
    fetchData();
    fetchLastFmData();
    fetchTraktData();

    // Automatically refresh the data every 60 seconds
    setInterval(fetchData, 60000);
    setInterval(fetchLastFmData, 60000);
    setInterval(fetchTraktData, 60000);
};
