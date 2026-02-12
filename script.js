
const songs=[
{name:"KAGADADA DONIYALLI",file:"song1.mp3",img:"img1.jpg"},
{name:"KANAVE KANAVE",file:"song2.mp3",img:"img2.jpg"},
{name:"TAMIL SONG",file:"song3.mp3",img:"img3.jpg"},
{name:"DIL LAGANA MANATHA",file:"song4.mp3",img:"img4.jpg"},
{name:"ZARA ZARA",file:"song5.mp3",img:"img5.jpg"}
];

const audio=document.getElementById("audio");
const songGrid=document.getElementById("songGrid");
const playerView=document.getElementById("playerView");
const cd=document.getElementById("cd");

function enterApp(){
document.getElementById("homePage").style.display="none";
document.getElementById("musicApp").classList.remove("hidden");
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

document.getElementById("nowTitle").innerText=song.name;

/* Background becomes image */
playerView.style.backgroundImage=`url(${song.img})`;
playerView.classList.remove("hidden");

/* CD image */
cd.style.backgroundImage=`url(${song.img})`;
cd.classList.add("playing");
}

function goBack(){
playerView.classList.add("hidden");
audio.pause();
cd.classList.remove("playing");
}

/* Search */
function searchSong(){
let input=document.getElementById("searchBar").value.toLowerCase();
document.querySelectorAll(".song-card").forEach(card=>{
card.style.display=card.innerText.toLowerCase().includes(input)?"block":"none";
});
}