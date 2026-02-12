let currentIndex = 0;
let selectedCategory = "love";

const songs = [
{name:"KAGADADA DONIYALLI",file:"song1.mp3",img:"img1.jpg",type:"love"},
{name:"KANAVE KANAVE",file:"song2.mp3",img:"img2.jpg",type:"love"},
{name:"DIL LAGANA MANATHA",file:"song3.mp3",img:"img3.jpg",type:"love"},

{name:"SCARY NIGHT",file:"song4.mp3",img:"img4.jpg",type:"horror"},
{name:"DARK SHADOW",file:"song5.mp3",img:"img5.jpg",type:"horror"},

{name:"HIP HOP BEAT",file:"song1.mp3",img:"img1.jpg",type:"hiphop"},
{name:"RAP KING",file:"song2.mp3",img:"img2.jpg",type:"hiphop"}
];

const audio=document.getElementById("audio");
const songGrid=document.getElementById("songGrid");
const playerView=document.getElementById("playerView");
const cd=document.getElementById("cd");
const nowTitle=document.getElementById("nowTitle");

function selectCategory(type){
selectedCategory = type;
}

function enterApp(){
document.getElementById("homePage").style.display="none";
document.getElementById("musicApp").style.display="block";
loadSongs();
}

function loadSongs(){
songGrid.innerHTML="";
let filtered = songs.filter(song=>song.type===selectedCategory);

filtered.forEach((song,index)=>{
const card=document.createElement("div");
card.className="song-card";
card.innerHTML=`
<img src="${song.img}">
<h3>${song.name}</h3>
`;
card.onclick=()=>playSong(index);
songGrid.appendChild(card);
});
}

function playSong(index){
let filtered = songs.filter(song=>song.type===selectedCategory);
currentIndex=index;
let song=filtered[index];

audio.src=song.file;
audio.play();

nowTitle.innerText=song.name;
playerView.style.backgroundImage=`url(${song.img})`;
playerView.style.display="flex";

cd.style.backgroundImage=`url(${song.img})`;
cd.classList.add("playing");
}

function nextSong(){
let filtered=songs.filter(song=>song.type===selectedCategory);
currentIndex++;
if(currentIndex>=filtered.length){
currentIndex=0;
}
playSong(currentIndex);
}

function prevSong(){
let filtered=songs.filter(song=>song.type===selectedCategory);
currentIndex--;
if(currentIndex<0){
currentIndex=filtered.length-1;
}
playSong(currentIndex);
}

function goBack(){
playerView.style.display="none";
audio.pause();
cd.classList.remove("playing");
}

audio.addEventListener("ended",nextSong);

function searchSong(){
let input=document.getElementById("searchBar").value.toLowerCase();
document.querySelectorAll(".song-card").forEach(card=>{
card.style.display=card.innerText.toLowerCase().includes(input)?"block":"none";
});
}