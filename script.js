let player;
let currentVideo = "";

const talkBtn = document.getElementById("talkBtn");
const songTitle = document.getElementById("songTitle");

const songs = {
    "h13lbnkuaeg": "h13lbNkUaEg",
    "sf7voyw_5ro": "sf7VoyW_5ro",
    "etgh9oc2sz0": "EtGh9oC2SZ0",
    "yh3c2ju-m_y": "yh3C2JU-m_Y",
    "1pxt9i4-utc": "1PxT9i4-uTc",
    "q-_cu_78eia": "Q-_cu_78eIA",
    "0pvmxbqh-lc": "0pVMxbQh-Lc",
    "nexbmenpsz0": "NeXbmEnpSz0"
    // Add more if needed same pattern
};

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "300",
        width: "500",
        videoId: "",
        playerVars: { 'playsinline': 1 }
    });
}

function playVideo() {
    player.playVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function forward10() {
    let current = player.getCurrentTime();
    player.seekTo(current + 10, true);
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = function(event) {
        let command = event.results[0][0].transcript.toLowerCase();
        console.log(command);

        if (command.includes("hey rhk")) {
            speak("Hello. Which song do you want to play?");
            return;
        }

        let found = false;

        for (let key in songs) {
            if (command.includes(key)) {
                currentVideo = songs[key];
                player.loadVideoById(currentVideo);
                songTitle.innerText = "Playing: " + key;
                speak("Playing your song");
                found = true;
                break;
            }
        }

        if (!found) {
            speak("Song not found. Opening YouTube search.");
            window.open("https://www.youtube.com/results?search_query=" + command);
        }
    };

    recognition.start();
}

talkBtn.addEventListener("click", startListening);