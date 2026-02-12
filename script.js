const songs = [
    "song1.mp3",
    "song2.mp3",
    "song3.mp3",
    "song4.mp3",
    "song5.mp3"
];

const audio = document.getElementById("audio");
const title = document.getElementById("song-title");
const cd = document.getElementById("cd");

let currentSong = 0;
let isPlaying = false;

function loadSong(index) {
    audio.src = songs[index];
    title.innerText = "Song " + (index + 1);
}

function playPause() {
    if (!isPlaying) {
        audio.play();
        cd.style.animationPlayState = "running";
        isPlaying = true;
    } else {
        audio.pause();
        cd.style.animationPlayState = "paused";
        isPlaying = false;
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    cd.style.animationPlayState = "running";
    isPlaying = true;
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    cd.style.animationPlayState = "running";
    isPlaying = true;
}

function selectSong(index) {
    currentSong = index;
    loadSong(currentSong);
    audio.play();
    cd.style.animationPlayState = "running";
    isPlaying = true;
}

loadSong(currentSong);
