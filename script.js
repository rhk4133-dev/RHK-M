let player;
let cassette = document.getElementById("cassette");
let currentIndex = 0;

const playlist = [
"h13lbNkUaEg",
"sf7VoyW_5ro",
"EtGh9oC2SZ0",
"yh3C2JU-m_Y",
"1PxT9i4-uTc",
"Q-_cu_78eIA",
"0pVMxbQh-Lc",
"NeXbmEnpSz0",
"palMj0iq-3g",
"LbrJZgyqp5w",
"vipdDXKHT_0",
"ElIizBi-rEc",
"DL8BsPDe4ck",
"N5BmQz4AmFI",
"CQSzGF9VAak",
"pPGcYXZhCPY",
"YjoKyFJf4CU",
"aorAeMA06i0",
"vmu53OX935A",
"wc-pzBaSiPA",
"PMzTLWTWLZU",
"g5O5ufz8w34",
"5Eqb_-j3FDA",
"uXgzCjAv-9k",
"Zu6z3qUPu1s",
"sX4Bxks_VlI",
"hoNb6HuNmU0",
"LK7-_dgAVQE",
"Pm7sWFzcPes",
"yu8nxs1gw48",
"wiur_AGatGU",
"LAdp3ZHeP4Q",
"rUeyfai1ddc",
"FCDAnPFJUPA",
"AN8-o7ckg6k"
];

function onYouTubeIframeAPIReady(){
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: playlist[currentIndex],
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function playVideo(){
    player.playVideo();
    cassette.style.animationPlayState = "running";
}

function pauseVideo(){
    player.pauseVideo();
    cassette.style.animationPlayState = "paused";
}

function nextSong(){
    currentIndex++;
    if(currentIndex >= playlist.length){
        currentIndex = 0;
    }
    player.loadVideoById(playlist[currentIndex]);
    cassette.style.animationPlayState = "running";
}

function prevSong(){
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = playlist.length - 1;
    }
    player.loadVideoById(playlist[currentIndex]);
    cassette.style.animationPlayState = "running";
}

function onPlayerStateChange(event){
    if(event.data === YT.PlayerState.ENDED){
        nextSong();
    }
    if(event.data === YT.PlayerState.PAUSED){
        cassette.style.animationPlayState = "paused";
    }
}

function startListening(){

    if (!('webkitSpeechRecognition' in window)){
        alert("Voice not supported in this browser");
        return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    document.getElementById("status").innerText = "Listening...";

    recognition.onresult = function(event){
        let speech = event.results[0][0].transcript.toLowerCase();
        document.getElementById("status").innerText = "You said: " + speech;

        if(speech.includes("next")){
            nextSong();
        }
        else if(speech.includes("previous") || speech.includes("back")){
            prevSong();
        }
        else if(speech.includes("pause")){
            pauseVideo();
        }
        else if(speech.includes("play")){
            playVideo();
        }
    };
}