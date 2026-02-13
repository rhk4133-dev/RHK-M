let songs = [
    { name: "ದಿಲ್ ಲಗಾನಾ ಮನತಾ", file: "YOUTUBE_VIDEO_ID1", img: "img1.jpg" },
    { name: "ಕಾಗದದ ದೋಣಿಯಲ್ಲಿ", file: "YOUTUBE_VIDEO_ID2", img: "img2.jpg" },
    { name: "ಕನವೇ ಕನವೇ", file: "YOUTUBE_VIDEO_ID3", img: "img3.jpg" },
    { name: "ಜರಾ ಜರಾ", file: "YOUTUBE_VIDEO_ID4", img: "img4.jpg" },
    { name: "ಒರುಮ್ ಬ್ಲಡ್", file: "YOUTUBE_VIDEO_ID5", img: "img5.jpg" },
    { name: "ಕಾಂತಾರ", file: "YOUTUBE_VIDEO_ID6", img: "img6.jpg" }
];

const songGrid = document.getElementById("songGrid");
const playerView = document.getElementById("playerView");
const cd = document.getElementById("cd");
const nowTitle = document.getElementById("nowTitle");
const prevTitle = document.getElementById("prevTitle");
const currentTitle = document.getElementById("currentTitle");
const nextTitle = document.getElementById("nextTitle");

let currentIndex = 0;
let player; // YouTube Player

function enterApp() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("musicApp").style.display = "block";
}

songs.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "song-card";
    card.innerHTML = `<img src="${song.img}"><h3>${song.name}</h3>`;
    card.onclick = () => playSong(index);
    songGrid.appendChild(card);
});

function updateSlideTitles() {
    let prevIndex = currentIndex - 1;
    let nextIndex = currentIndex + 1;
    if (prevIndex < 0) prevIndex = songs.length - 1;
    if (nextIndex >= songs.length) nextIndex = 0;

    prevTitle.innerText = songs[prevIndex].name;
    currentTitle.innerText = songs[currentIndex].name;
    nextTitle.innerText = songs[nextIndex].name;
}

// Load YouTube Player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: songs[0].file,
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0
        },
        events: {
            'onReady': (e) => {},
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) nextSong();
}

function playSong(index) {
    currentIndex = index;
    const song = songs[index];

    if (player) player.loadVideoById(song.file);

    nowTitle.innerText = song.name;
    cd.style.backgroundImage = `url('${song.img}')`;
    cd.classList.add("playing");
    playerView.style.display = "flex";
    updateSlideTitles();
}

function togglePlay() {
    if (!player) return;
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        cd.classList.remove("playing");
        document.getElementById("playBtn").innerText = "▶";
    } else {
        player.playVideo();
        cd.classList.add("playing");
        document.getElementById("playBtn").innerText = "⏸";
    }
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
}

function plus10() { if(player) player.seekTo(player.getCurrentTime() + 10, true); }
function minus10() { if(player) player.seekTo(player.getCurrentTime() - 10, true); }

function goBack() {
    playerView.style.display = "none";
    if(player) player.pauseVideo();
    cd.classList.remove("playing");
}

function searchSong() {
    const input = document.getElementById("searchBar").value.toLowerCase();
    document.querySelectorAll(".song-card").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}