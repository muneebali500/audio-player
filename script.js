const musicContainer = document.getElementById(`music-container`);
const titleTrackEl = document.getElementById(`title`);
const progressContainer = document.getElementById(`progress-container`);
const progressBar = document.getElementById(`progress`);
const audioEl = document.getElementById(`audio`);
const trackImgEl = document.getElementById(`cover`);
const prevBtn = document.getElementById(`prev`);
const playBtn = document.getElementById(`play`);
const nextBtn = document.getElementById(`next`);

// Song titles
const songs = [`hey`, `summer`, `ukulele`];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    titleTrackEl.innerText = song;
    audioEl.src = `music/${song}.mp3`;
    trackImgEl.src = `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add(`play`);
    playBtn.querySelector(`.fas`).classList.add(`fa-pause`);
    playBtn.querySelector(`.fas`).classList.remove(`fa-play`);

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove(`play`);
    playBtn.querySelector(`.fas`).classList.remove(`fa-pause`);
    playBtn.querySelector(`.fas`).classList.add(`fa-play`);

    audio.pause();
}

function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Display progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = clickX / width * duration;
}

playBtn.addEventListener(`click`, () => {
    const isPlaying = musicContainer.classList.contains(`play`);

    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener(`click`, prevSong);
nextBtn.addEventListener(`click`, nextSong);

// Time/song update
audioEl.addEventListener(`timeupdate`, updateProgress);

progressContainer.addEventListener(`click`, setProgress);

audioEl.addEventListener(`ended`, nextSong);
