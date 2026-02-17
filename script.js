let player;
const cd = document.getElementById("cd");
const eyes = document.getElementById("eyes");
const talkBtn = document.getElementById("talkBtn");
const songTitle = document.getElementById("songTitle");

/* 🔥 ADD YOUR SONGS HERE */
const songs = {
    "believer": "h13lbNkUaEg",
    "shape of you": "sf7VoyW_5ro",
    "srivalli": "EtGh9oC2SZ0",
    "arabic kuthu": "yh3C2JU-m_Y",
    "tum hi ho": "1PxT9i4-uTc"
};

/* YouTube API */
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "0",
        width: "0",
        videoId: "",
        playerVars: { 'playsinline': 1 }
    });
}

/* Controls */
function playVideo() {
    player.playVideo();
    cd.classList.add("rotate");
    eyes.classList.add("active");
}

function pauseVideo() {
    player.pauseVideo();
    cd.classList.remove("rotate");
    eyes.classList.remove("active");
}

function forward10() {
    let current = player.getCurrentTime();
    player.seekTo(current + 10, true);
}

/* Voice Speak */
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

/* Voice Recognition */
function startListening() {

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = function(event) {

        let command = event.results[0][0].transcript.toLowerCase();

        console.log("User said:", command);

        if (command.includes("hey rhk")) {
            speak("Hello. Tell me which song you want to play.");
            return;
        }

        /* Clean command */
        command = command
            .replace("play", "")
            .replace("song", "")
            .replace("music", "")
            .trim();

        let found = false;

        for (let key in songs) {
            if (command.includes(key)) {

                player.loadVideoById(songs[key]);
                songTitle.innerText = "Playing: " + key;

                speak("Playing " + key);

                cd.classList.add("rotate");
                eyes.classList.add("active");

                found = true;
                break;
            }
        }

        if (!found) {
            speak("I could not recognize that song. Please say again clearly.");
        }
    };

    recognition.start();
}

talkBtn.addEventListener("click", startListening);