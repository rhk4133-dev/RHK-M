body{
    margin:0;
    font-family:Arial;
    background:#111;
    color:white;
}

.home{
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
}

.hero-card{
    text-align:center;
}

.hero-card button{
    padding:10px 20px;
    font-size:18px;
    border:none;
    background:#ff9800;
    color:white;
    border-radius:10px;
}

#searchBar{
    width:90%;
    margin:15px;
    padding:10px;
    font-size:16px;
    border-radius:10px;
    border:none;
}

.grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(120px,1fr));
    gap:15px;
    padding:15px;
}

.song-card{
    background:#222;
    padding:10px;
    border-radius:15px;
    text-align:center;
    cursor:pointer;
}

.song-card img{
    width:100%;
    border-radius:10px;
}

.player{
    position:fixed;
    inset:0;
    background-size:cover;
    background-position:center;
    backdrop-filter:blur(20px);
    display:none;
    flex-direction:column;
    align-items:center;
    justify-content:center;
}

.cd{
    width:200px;
    height:200px;
    border-radius:50%;
    background-size:cover;
    background-position:center;
    animation:spin 5s linear infinite;
    animation-play-state:paused;
}

.cd.playing{
    animation-play-state:running;
}

@keyframes spin{
    from{transform:rotate(0deg);}
    to{transform:rotate(360deg);}
}

.controls button,
.skip button,
.backBtn{
    margin:10px;
    padding:10px 15px;
    font-size:18px;
    border:none;
    border-radius:10px;
    background:#ff9800;
    color:white;
}