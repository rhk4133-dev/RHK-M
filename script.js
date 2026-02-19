// Function to handle play/pause and the center icon
function setupVideoInteractions(videoElement) {
    const container = videoElement.parentElement;
    const icon = container.querySelector('.play_icon');

    container.addEventListener('click', () => {
        if (videoElement.paused) {
            videoElement.play();
            icon.style.opacity = '0';
        } else {
            videoElement.pause();
            icon.style.opacity = '1';
        }
    });
}

// Initialize existing videos
document.querySelectorAll('.video_player').forEach(setupVideoInteractions);

// Handle Uploads
document.getElementById('videoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        const container = document.getElementById('videoContainer');
        
        const newReel = document.createElement('div');
        newReel.className = 'video_container';
        newReel.innerHTML = `
            <video class="video_player" loop playsinline src="${url}"></video>
            <i class='bx bx-play play_icon'></i>
            <div class="footer">
                <h3>@Me</h3>
                <p>My New Reel!</p>
            </div>
        `;
        
        container.prepend(newReel);
        setupVideoInteractions(newReel.querySelector('.video_player'));
        
        // Auto-scroll to the top to see the new video
        container.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
