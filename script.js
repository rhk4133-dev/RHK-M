const categories = {
  "Kannada Hits": [
    {name:"KAGADADA DONIYALLI",file:"song1.mp3",img:"img1.jpg"},
    {name:"KANAVE KANAVE",file:"song2.mp3",img:"img2.jpg"}
  ],
  "Tamil Hits": [
    {name:"TAMIL SONG",file:"song3.mp3",img:"img3.jpg"}
  ],
  "Hindi Hits": [
    {name:"DIL LAGANA MANATHA",file:"song4.mp3",img:"img4.jpg"},
    {name:"ZARA ZARA",file:"song5.mp3",img:"img5.jpg"}
  ]
};

const audio=document.getElementById("audio");
const songGrid=document.getElementById("songGrid");
const playerView=document.getElementById("playerView");
const cd=document.getElementById("cd");
const nowTitle=document.getElementById("nowTitle");

function enterApp(){
document.getElementById("homePage").style.display="none";
document.getElementById("musicApp").style.display="block";
loadCategories();
}

/* Load Categories */
function loadCategories(){
songGrid.innerHTML="";
for(let category in categories){
const card=document.createElement("div");
card.className="song-card";
card.innerHTML=`<h3>${category}</h3>`;
card.onclick=()=>loadSongs(category);
songGrid.appendChild(card);
}
}

/* Load Songs of Category */
function loadSongs(category){
songGrid.innerHTML="";
categories[category].forEach(song=>{
const card=document.createElement("div");
card.className="song-card";
card.innerHTML=`
<img src="${song.img}">
<h3>${song.name}</h3>
`;
card.onclick=()=>playSong(song);
songGrid.appendChild(card);
});
}

/* Play Song */
function playSong(song){
audio.src=song.file;
audio.play();

nowTitle.innerText=song.name;

playerView.style.backgroundImage=`url(${song.img})`;
playerView.style.display="flex";

cd.style.backgroundImage=`url(${song.img})`;
cd.classList.add("playing");
}

/* Back */
function goBack(){
playerView.style.display="none";
audio.pause();
cd.classList.remove("playing");
}