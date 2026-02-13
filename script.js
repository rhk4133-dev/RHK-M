// 🔥 Extract YouTube ID
function getId(url){
    return url.split("youtu.be/")[1].split("?")[0];
}

// 🎵 Your URLs (Add all here)
const urls = [
"https://youtu.be/h13lbNkUaEg?si=hCi6NlP0NLrRY1tp",
"https://youtu.be/sf7VoyW_5ro?si=5m7Xq7roYeiWWyka",
"https://youtu.be/EtGh9oC2SZ0?si=lTjs3KqA-ThC5Imv",
"https://youtu.be/yh3C2JU-m_Y?si=Vl8ExqC8yfTtgrSG",
"https://youtu.be/1PxT9i4-uTc?si=Jv3N7sQsW3A6J-t3"
];

let songs = [];
let player;
let currentIndex = 0;

const songGrid = document.getElementById("songGrid");
const playerView = document.getElementById("playerView");
const cd = document.getElementById("cd");
const nowTitle = document.getElementById("nowTitle");

// 🔥 Load Songs with Real YouTube Titles
urls.forEach((url, index) => {

    const videoId = getId(url);
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    fetch(`https://www.youtube.com/oembed?url=${url}&format=json`)
    .then(res => res.json())
    .then(data => {

        const song = {
            name: data.title,
            file: videoId,
            img: thumbnail
        };

        songs.push(song);

        const card = document.createElement("div");
        card.className = "song-card";
        card.innerHTML = `
            <img src="${thumbnail}" 
            onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
            <h3>${data.title}</h3>
        `;
        card.onclick = () => playSong(index);
        songGrid.appendChild(card);

    });
});

// 🎬 YouTube Player
function onYouTubeIframeAPIReady(){
    player = new YT.Player('youtubePlayer',{
        height:'0',
        width:'0',
        playerVars:{ autoplay:0, controls:0 }
    });
}

// ▶ Play
function playSong(index){
    currentIndex = index;
    const song = songs[index];

    player.loadVideoById(song.file);
    player.playVideo();

    nowTitle.innerText = song.name;
    cd.style.backgroundImage = `url('${song.img}')`;
    cd.classList.add("playing");

    playerView.style.display = "flex";
}

// ⏯ Toggle
function togglePlay(){
    if(player.getPlayerState() === 1){
        player.pauseVideo();
        cd.classList.remove("playing");
        document.getElementById("playBtn").innerText="▶";
    }else{
        player.playVideo();
        cd.classList.add("playing");
        document.getElementById("playBtn").innerText="⏸";
    }
}

function nextSong(){
    currentIndex = (currentIndex+1)%songs.length;
    playSong(currentIndex);
}

function prevSong(){
    currentIndex = (currentIndex-1+songs.length)%songs.length;
    playSong(currentIndex);
}

function plus10(){
    player.seekTo(player.getCurrentTime()+10,true);
}

function minus10(){
    player.seekTo(player.getCurrentTime()-10,true);
}

function goBack(){
    playerView.style.display="none";
    player.pauseVideo();
}

function searchSong(){
    let input = document.getElementById("searchBar").value.toLowerCase();
    document.querySelectorAll(".song-card").forEach(card=>{
        card.style.display = card.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}

function enterApp(){
    document.getElementById("homePage").style.display="none";
    document.getElementById("musicApp").style.display="block";
}