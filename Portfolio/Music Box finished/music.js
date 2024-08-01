const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/favorite.girl.mp3',
        displayName: 'Favorite Girl',
        cover: 'assets/pfp8.jpeg',
        artist: 'Justin Bieber',
    },
    {
        path: 'assets/senorita.mp3',
        displayName: 'Señorita',
        cover: 'assets/pfp.6.jpg',
        artist: 'Shawn Mendes, Camila Cabello',
    },
    {
        path: 'assets/lover.mp3',
        displayName: 'Lover',
        cover: 'assets/pfp7.jpeg',
        artist: 'Taylor Swift ft. Shawn Mendes',
    },
    {
        path: 'assets/hawai.mp3',
        displayName: 'Harleys In Hawaii',
        cover: 'assets/pfp.4.jpg',
        artist: 'Katty perry',
    },
    {
        path: 'assets/Judas.2.mp3',
        displayName: 'Judas',
        cover: 'assets/gojonew.jpg',
        artist: 'Lady Gaga',
    },
    {
        path: 'assets/Locked Away.mp3',
        displayName: 'Locked Away',
        cover: 'assets/pfp9.jpeg',
        artist: 'R. City ft. Adam Levine',
    },
    {
        path: 'assets/rewrite the star.mp3',
        displayName: ' Rewrite The Stars',
        cover: 'assets/rwt.jpeg',
        artist: 'Anne-Marie & James Arthur',
    },
    {
        path: 'assets/aty.mp3',
        displayName: ' A Thousand Years',
        cover: 'assets/aty.jpeg',
        artist: 'Christina Perri ',
    },
    {
        path: 'assets/bloodline X pony.3.mp3',
        displayName: 'Bloodline',
        cover: 'assets/pfp.3.jpg',
        artist: 'Katty Parry',
    }
    
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);