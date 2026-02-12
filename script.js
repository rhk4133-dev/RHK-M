const songs = [];

for (let i = 1; i <= 50; i++) {
    songs.push({
        name: "RHK SONG " + i,
        file: "song" + i + ".mp3",
        img: "img" + i + ".jpg"
    });
}

/* Kannada Names */
songs[0].name = "ದಿಲ್ ಲಗಾನಾ ಮನತಾ";
songs[1].name = "ಕಾಗದದ ದೋಣಿಯಲ್ಲಿ";
songs[2].name = "ಕನವೇ ಕನವೇ";
songs[3].name = "ಜರಾ ಜರಾ";
songs[4].name = "ಒರುಮ್ ಬ್ಲಡ್";
songs[5].name = "ಕಾಂತಾರ";

const audio = document.getElementById("audio");
const songGrid = document.getElementById("songGrid");
const playerView = document.getElementById("playerView");
const cd = document.getElementById("cd");
const nowTitle = document.getElementById("nowTitle");

const prevTitle = document.getElementById("prevTitle");
const currentTitle = document.getElementById("currentTitle");
const nextTitle = document.getElementById("nextTitle");

let currentIndex = 0;

function enterApp(){
    document.getElementById("homePage").style.display="none";
    document.getElementById("musicApp").style.display="block";
}

songs.forEach((song,index)=>{
    const card=document.createElement("div");
    card.className="song-card";
    card.innerHTML=`
        <img src="${song.img}">
        <h3>${song.name}</h3>
    `;
    card.onclick=()=>playSong(index);
    songGrid.appendChild(card);
});

function updateSlideTitles(){
    let prevIndex = currentIndex - 1;
    let nextIndex = currentIndex + 1;

    if(prevIndex < 0) prevIndex = songs.length - 1;
    if(nextIndex >= songs.length) nextIndex = 0;

    prevTitle.innerText = songs[prevIndex].name;
    currentTitle.innerText = songs[currentIndex].name;
    nextTitle.innerText = songs[nextIndex].name;
}

function playSong(index){
    currentIndex=index;
    const song=songs[index];

    audio.src=song.file;
    audio.play();

    nowTitle.innerText=song.name;

    playerView.style.backgroundImage=`url('${song.img}')`;
    playerView.style.display="flex";

    cd.style.backgroundImage=`url('${song.img}')`;
    cd.classList.add("playing");

    document.getElementById("playBtn").innerText="⏸";

    updateSlideTitles();
}

function togglePlay(){
    if(audio.paused){
        audio.play();
        cd.classList.add("playing");
        document.getElementById("playBtn").innerText="⏸";
    }else{
        audio.pause();
        cd.classList.remove("playing");
        document.getElementById("playBtn").innerText="▶";
    }
}

function nextSong(){
    currentIndex++;
    if(currentIndex>=songs.length) currentIndex=0;
    playSong(currentIndex);
}

function prevSong(){
    currentIndex--;
    if(currentIndex<0) currentIndex=songs.length-1;
    playSong(currentIndex);
}

function plus10(){ audio.currentTime+=10; }
function minus10(){ audio.currentTime-=10; }

function goBack(){
    playerView.style.display="none";
    audio.pause();
    cd.classList.remove("playing");
}

function searchSong(){
    let input=document.getElementById("searchBar").value.toLowerCase();
    document.querySelectorAll(".song-card").forEach(card=>{
        card.style.display=card.innerText.toLowerCase().includes(input)?"block":"none";
    });
}

audio.addEventListener("ended",nextSong);