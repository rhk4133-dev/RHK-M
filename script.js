// Add all your YouTube IDs here
const playlist = [
    { id: 'hoNb6HuNmU0', title: 'Khairiyat', artist: 'Arijit Singh', color: '#00f2ff' },
    { id: '5Eqb_-j3FDA', title: 'Pasoori', artist: 'Ali Sethi', color: '#39ff14' },
    { id: 'LK7-_dgAVQE', title: 'Tauba Tauba', artist: 'Karan Aujla', color: '#bc13fe' },
    { id: 'hxMNYkLN7tI', title: 'Aaj Ki Raat', artist: 'Stree 2', color: '#ff0055' },
    { id: 'kmjeMrjOjFA', title: 'Taambdi Chaamdi', artist: 'Kratex', color: '#ffcc00' },
    { id: 'sCbbMZ-q4-I', title: 'Lut Gaye', artist: 'Jubin Nautiyal', color: '#0044ff' }
];

let player;
const songGrid = document.getElementById('song-grid');
const masterPlay = document.getElementById('master-play');

// 1. Initialize the UI
playlist.forEach((song) => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
        <img src="https://img.youtube.com/vi/${song.id}/hqdefault.jpg">
        <h4>${song.title}</h4>
        <p style="color:#777; font-size:12px">${song.artist}</p>
    `;
    card.onclick = () => loadSong(song);
    songGrid.appendChild(card);
});

// 2. Load YouTube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-engine', {
        height: '0', width: '0',
        events: { 'onStateChange': onStateChange }
    });
}

function loadSong(song) {
    player.loadVideoById(song.id);
    document.getElementById('current-title').innerText = song.title;
    document.getElementById('current-artist').innerText = song.artist;
    document.getElementById('current-thumb').src = `https://img.youtube.com/vi/${song.id}/default.jpg`;
    
    // Update Neon Theme Color dynamically
    document.documentElement.style.setProperty('--neon-main', song.color);
    masterPlay.innerText = '⏸';
}

function onStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        masterPlay.innerText = '⏸';
        updateProgress();
    } else {
        masterPlay.innerText = '▶';
    }
}

function updateProgress() {
    setInterval(() => {
        if (player && player.getCurrentTime) {
            const perc = (player.getCurrentTime() / player.getDuration()) * 100;
            document.getElementById('progress').style.width = perc + "%";
        }
    }, 1000);
}

masterPlay.onclick = () => {
    const state = player.getPlayerState();
    state === 1 ? player.pauseVideo() : player.playVideo();
};
