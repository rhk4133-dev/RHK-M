// 1. Your Real Firebase Configuration from screenshot
const firebaseConfig = {
  apiKey: "AIzaSyD0mBdvC_eYXpZ7TJx8TphlD2Q34gVM6bI",
  authDomain: "instaclone-f2b50.firebaseapp.com",
  projectId: "instaclone-f2b50",
  storageBucket: "instaclone-f2b50.firebasestorage.app",
  messagingSenderId: "858120667519",
  appId: "1:858120667519:web:4292fdbd703fadf5e61a4a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// --- FUNCTION: UPLOAD REEL ---
document.getElementById('videoInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    alert("Uploading to Cloud... please wait.");
    const ref = storage.ref().child(`reels/${Date.now()}_${file.name}`);
    
    await ref.put(file);
    const url = await ref.getDownloadURL();

    // Save link to Database
    await db.collection("reels").add({
        videoUrl: url,
        likes: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert("Reel Posted Successfully!");
});

// --- FUNCTION: LOAD REELS ---
function loadReels() {
    db.collection("reels").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        const container = document.getElementById('reelsContainer');
        container.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            container.innerHTML += `
                <div class="reel">
                    <video loop playsinline src="${data.videoUrl}" onclick="this.paused?this.play():this.pause()"></video>
                    <div class="sidebar">
                        <i class='bx bxs-heart'></i><span>${data.likes}</span>
                        <i class='bx bx-message-rounded-dots'></i>
                    </div>
                </div>`;
        });
    });
}

loadReels();
