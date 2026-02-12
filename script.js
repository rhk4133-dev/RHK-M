const songs = [];
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

let currentIndex = 0;
let lastTap = 0;

function enterApp(){
document.getElementById("homePage").style.display="none";
document.getElementById("musicApp").style.display="block";
}

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
currentIndex = songs.indexOf(song);
audio.src=song.file;
audio.play();
nowTitle.innerText=song.name;
playerView.style.backgroundImage=`url('${song.img}')`;
playerView.style.display="flex";
cd.style.backgroundImage=`url('${song.img}')`;
cd.classList.add("playing");
document.getElementById("playBtn").innerText="⏸";
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
if(currentIndex>=songs.length){currentIndex=0;}
playSong(songs[currentIndex]);
}

function prevSong(){
currentIndex--;
if(currentIndex<0){currentIndex=songs.length-1;}
playSong(songs[currentIndex]);
}

playerView.addEventListener("click", function(e){
let currentTime=new Date().getTime();
let tapLength=currentTime-lastTap;

if(tapLength<300 && tapLength>0){
let screenWidth=window.innerWidth;
let clickX=e.clientX;

if(clickX>screenWidth/2){
audio.currentTime+=10;
}else{
audio.currentTime-=10;
}
}
lastTap=currentTime;
});

audio.addEventListener("ended", nextSong);

function searchSong(){
let input=document.getElementById("searchBar").value.toLowerCase();
document.querySelectorAll(".song-card").forEach(card=>{
card.style.display=card.innerText.toLowerCase().includes(input)?"block":"none";
});
}