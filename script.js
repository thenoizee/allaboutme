<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Latest Activity Dashboard</title>
    <!-- Tailwind CSS for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800 p-8">

    <div class="max-w-4xl mx-auto space-y-8">
        <!-- Main title -->
        <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">Latest Activity Dashboard</h1>

        <!-- Google Sheets Data -->
        <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h2 class="text-2xl font-semibold mb-4 text-gray-900">Daily Data</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                <div class="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                    <span class="font-medium text-gray-600">Mood:</span>
                    <span id="mood" class="font-bold text-gray-900">Loading...</span>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                    <span class="font-medium text-gray-600">Laptop Time:</span>
                    <span id="laptoptime" class="font-bold text-gray-900">Loading...</span>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                    <span class="font-medium text-gray-600">Phone Time:</span>
                    <span id="phonetime" class="font-bold text-gray-900">Loading...</span>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                    <span class="font-medium text-gray-600">TTR:</span>
                    <span id="TTR" class="font-bold text-gray-900">Loading...</span>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                    <span class="font-medium text-gray-600">Retainers:</span>
                    <span id="retainers" class="font-bold text-gray-900">Loading...</span>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                    <span class="font-medium text-gray-600">Productiveness:</span>
                    <span id="productiveness" class="font-bold text-gray-900">Loading...</span>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                    <span class="font-medium text-gray-600">Working:</span>
                    <span id="working" class="font-bold text-gray-900">Loading...</span>
                </div>
            </div>
        </div>

        <!-- Last.fm Data -->
        <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h2 class="text-2xl font-semibold mb-4 text-gray-900">Music Activity</h2>
            <div class="flex items-center space-x-6">
                <img id="album-art" src="" alt="Album art" class="w-24 h-24 rounded-lg shadow-md" style="display: none;">
                <div>
                    <p id="now-playing-status" class="text-sm font-medium text-green-600 mb-1"></p>
                    <h3 id="song-name" class="text-xl font-bold text-gray-900 mb-1">Loading...</h3>
                    <p id="artist-name" class="text-lg text-gray-600">Loading...</p>
                </div>
            </div>
        </div>

        <!-- Trakt.tv Data -->
        <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h2 class="text-2xl font-semibold mb-4 text-gray-900">Latest Watched</h2>
            <div class="flex items-center space-x-6">
                <img id="trakt-poster" src="" alt="Trakt latest watched item" class="w-32 h-48 rounded-lg shadow-md object-cover" style="display: none;">
                <div>
                    <h3 id="trakt-title" class="text-xl font-bold text-gray-900">Loading...</h3>
                    <p id="trakt-type" class="text-lg text-gray-600">Loading...</p>
                </div>
            </div>
        </div>

    </div>

    <script>
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
        function fetchTraktData() {
            const username = 'thesamsterz';
            // IMPORTANT: You must get your own Trakt Client ID from their website.
            // Replace 'YOUR_TRAKT_CLIENT_ID' with your actual key.
            const traktClientId = 'a665238e7b3dcaee356fb87705257e74e21adf6a04835f337423bb0104c39edb';

            const traktUrl = `https://api.trakt.tv/users/${username}/history?extended=full&limit=1`;

            fetch(traktUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'trakt-api-version': '2',
                    'trakt-api-key': traktClientId
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    const latestItem = data[0];
                    let title = 'N/A';
                    let type = 'N/A';
                    let posterUrl = '';

                    if (latestItem.movie) {
                        title = latestItem.movie.title;
                        type = 'Movie';
                        // Using a placeholder image with the title as it's more reliable
                        // than fetching a poster from Trakt's specific image API endpoints
                        posterUrl = `https://placehold.co/200x300/e2e8f0/1a202c?text=${encodeURIComponent(title)}`;
                    } else if (latestItem.episode) {
                        const showTitle = latestItem.show.title;
                        const episodeTitle = latestItem.episode.title;
                        const seasonNumber = latestItem.episode.season;
                        const episodeNumber = latestItem.episode.number;
                        title = `${showTitle} S${seasonNumber}E${episodeNumber} - ${episodeTitle}`;
                        type = 'TV Episode';
                        posterUrl = `https://placehold.co/200x300/e2e8f0/1a202c?text=${encodeURIComponent(showTitle)}`;
                    }

                    document.getElementById('trakt-title').textContent = title;
                    document.getElementById('trakt-type').textContent = type;

                    const posterElement = document.getElementById('trakt-poster');
                    posterElement.src = posterUrl;
                    posterElement.alt = title;
                    posterElement.style.display = 'block';

                }
            })
            .catch(error => {
                console.error('Error fetching data from Trakt.tv:', error);
                document.getElementById('trakt-title').textContent = 'Error fetching data';
                document.getElementById('trakt-type').textContent = '';
            });
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
    </script>
</body>
</html>
