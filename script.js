document.addEventListener("DOMContentLoaded", () => {
    // Console log to confirm site is ready
    console.log("Gaming Hub Loaded Successfully");

    // Optional: Add a visual effect when clicking a video card
    const cards = document.querySelectorAll('.video-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = "#ff4444";
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = "#333";
        });
    });
});
