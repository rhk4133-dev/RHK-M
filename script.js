const songs = [];

/* Auto 50 Songs */
for (let i = 1; i <= 50; i++) {
    songs.push({
        name: "RHK SONG " + i,
        file: "song" + i + ".mp3",
        img: "img" + i + ".jpg"
    });
}

const audio = document.getElementById("audio");
const songGrid = document.getElementById("songGrid");
const playerView = document.getElementById("playerView");
const cd = document.getElementById("cd");
const nowTitle = document.getElementById("nowTitle");
const playBtn = document.getElementById("playBtn");

function enterApp(){
    document.getElementById("homePage").style.display="none";
    document.getElementById("musicApp").style.display="block";
}

/* Load Songs */
songs.forEach(song=>{
    const card=document.createElement("div");
    card.className="song-card";
    card.innerHTML=`
        <img src="${song.img}">
        <h3>${song.name}</h3>
    `;
    card.onclick=()=>playSong(song);
    songGrid.appendChild(card);
});

function playSong(song){
    audio.src=song.file;
    audio.play();

    nowTitle.innerText=song.name;
    playBtn.innerText="⏸ Pause";

    playerView.style.backgroundImage=`url('${song.img}')`;
    playerView.style.display="flex";

    cd.style.backgroundImage=`url('${song.img}')`;
    cd.classList.add("playing");
}

function goBack(){
    playerView.style.display="none";
    audio.pause();
    cd.classList.remove("playing");
    playBtn.innerText="▶ Play";
}

/* Play / Pause Toggle */
function togglePlay(){
    if(audio.paused){
        audio.play();
        cd.classList.add("playing");
        playBtn.innerText="⏸ Pause";
    }else{
        audio.pause();
        cd.classList.remove("playing");
        playBtn.innerText="▶ Play";
    }
}

/* Forward / Backward 10 Seconds */
playerView.addEventListener("dblclick", function(e){

    let clickPosition = e.clientX;
    let screenWidth = window.innerWidth;

    if(clickPosition > screenWidth/2){
        audio.currentTime += 10; // forward
    }
    else{
        audio.currentTime -= 10; // backward
    }

});

/* Stop spinning when song ends */
audio.addEventListener("ended",()=>{
    cd.classList.remove("playing");
    playBtn.innerText="▶ Play";
});

function searchSong(){
    let input=document.getElementById("searchBar").value.toLowerCase();
    document.querySelectorAll(".song-card").forEach(card=>{
        card.style.display=card.innerText.toLowerCase().includes(input)?"block":"none";
    });
}