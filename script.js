// Handle Video Playback & Double Tap
function initReel(reel) {
    const video = reel.querySelector('.video_player');
    const heart = reel.querySelector('.center_heart');
    const likeIcon = reel.querySelector('.heart_main');

    // Tap to Play/Pause
    video.addEventListener('click', () => {
        video.paused ? video.play() : video.pause();
    });

    // Double Tap to Like
    let lastTap = 0;
    video.addEventListener('touchstart', (e) => {
        let currentTime = new Date().getTime();
        let tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            // Show Big Heart
            heart.style.transform = "translate(-50%, -50%) scale(1.2)";
            heart.style.opacity = "1";
            likeIcon.style.color = "red";
            
            setTimeout(() => {
                heart.style.transform = "translate(-50%, -50%) scale(0)";
                heart.style.opacity = "0";
            }, 800);
        }
        lastTap = currentTime;
    });
}

// Initialize
document.querySelectorAll('.reel').forEach(initReel);

// Upload Logic
document.getElementById('videoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        const container = document.getElementById('reelsContainer');
        const newReel = document.createElement('div');
        newReel.className = 'reel';
        newReel.innerHTML = `
            <video class="video_player" loop playsinline src="${url}"></video>
            <div class="sidebar">
                <div class="icon_group"><i class='bx bxs-heart heart_main'></i><span>0</span></div>
                <div class="icon_group"><i class='bx bx-message-rounded-dots'></i><span>0</span></div>
                <div class="icon_group"><i class='bx bx-paper-plane'></i></div>
            </div>
            <div class="footer">
                <div class="user_info"><strong>my_new_post</strong></div>
                <p>New upload! 🚀</p>
            </div>
            <i class='bx bxs-heart center_heart'></i>
        `;
        container.prepend(newReel);
        initReel(newReel);
        container.scrollTo({top: 0, behavior: 'smooth'});
    }
});
