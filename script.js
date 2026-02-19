// Play/Pause logic
const videos = document.querySelectorAll('.video_player');

for (const video of videos) {
    video.addEventListener('click', function () {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
}

// Simple upload simulation
function uploadVideo() {
    const fileInput = document.getElementById('videoInput');
    const container = document.querySelector('.app_videos');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const videoURL = URL.createObjectURL(file);

        const newVideoDiv = document.createElement('div');
        newVideoDiv.classList.add('video');
        newVideoDiv.innerHTML = `
            <video class="video_player" src="${videoURL}" loop></video>
            <div class="footer">
                <h3>@You</h3>
                <p>Just uploaded!</p>
            </div>
        `;
        
        container.prepend(newVideoDiv);
        alert("Video preview added to the top!");
    } else {
        alert("Please select a video file first.");
    }
}
