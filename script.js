/* AUTO GENERATE 50 SONGS */
const songs = [];

for (let i = 1; i <= 50; i++) {
    songs.push({
        name: "SONG " + i,
        file: "song" + i + ".mp3",
        img: "img" + i + ".jpg"
    });
}

const audio = document.getElementById("audio");
const songGrid = document.getElementById("songGrid");
const playerView = document.getElementById("playerView");
const nowTitle = document.getElementById("nowTitle");

/* Enter App */
function enterApp() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("musicApp").style.display = "block";
}

/* Load Songs with Animation Delay */
songs.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "song-card";
    card.style.animationDelay = `${index * 0.05}s`;

    card.innerHTML = `
        <div class="neon-border">
            <img src="${song.img}">
            <h3>${song.name}</h3>
        </div>
    `;

    card.onclick = () => playSong(song);
    songGrid.appendChild(card);
});

/* Play Song */
function playSong(song) {

    audio.src = song.file;
    audio.play();

    nowTitle.innerText = song.name;

    playerView.style.backgroundImage = `url(${song.img})`;
    playerView.style.display = "flex";

    document.querySelector(".visualizer").classList.add("active");
}

/* Go Back */
function goBack() {
    playerView.style.display = "none";
    audio.pause();
    document.querySelector(".visualizer").classList.remove("active");
}

/* Search */
function searchSong() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    document.querySelectorAll(".song-card").forEach(card => {
        card.style.display =
            card.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}