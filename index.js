const audioFiles = [
    'audio/1.mp3',
    'audio/2.mp3',
    'audio/3.mp3',
    'audio/4.mp3',
    'audio/5.mp3',
    'audio/6.mp3',
    'audio/7.mp3',
    'audio/8.mp3',
    'audio/9.mp3',
    'audio/10.mp3'
];

let currentIndex = 0;
let currentAudio = null;
let currentButton = null;

const playButtons = document.querySelectorAll('.playButton');
const controlPlayPauseButton = document.getElementById('controlPlayPauseButton');
const nextButton = document.getElementById('nextButton');
const previousButton = document.getElementById('previousButton');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimeline() {
    if (currentAudio) {
        const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeDisplay.textContent = formatTime(currentAudio.currentTime);
        durationDisplay.textContent = formatTime(currentAudio.duration);
    }
}

function playAudio(audio, button) {
    if (currentAudio) {
        currentAudio.pause();
        currentButton.classList.remove('fa-pause');
        currentButton.classList.add('fa-play');
    }
    currentAudio = audio;
    currentButton = button;
    currentAudio.play();
    currentButton.classList.remove('fa-play');
    currentButton.classList.add('fa-pause');
    controlPlayPauseButton.classList.remove('fa-play');
    controlPlayPauseButton.classList.add('fa-pause');
    updateTimeline();
    setInterval(updateTimeline, 1000); // Update timeline every second
}

function handleAudioEnd() {
    nextButton.click();
}

function addToRecentPlaylist(song) {
    let recentPlaylist = JSON.parse(localStorage.getItem('recentPlaylist')) || [];
    if (!recentPlaylist.includes(song)) {
        recentPlaylist.push(song);
        if (recentPlaylist.length > 10) {
            recentPlaylist.shift();
        }
        localStorage.setItem('recentPlaylist', JSON.stringify(recentPlaylist));
    }
}

// Individual play/pause buttons
playButtons.forEach((button, index) => {
    const audioPlayer = new Audio(button.dataset.audio);
    audioPlayer.addEventListener('ended', handleAudioEnd);

    button.addEventListener('click', () => {
        if (currentAudio && currentAudio !== audioPlayer) {
            currentAudio.pause();
            currentButton.classList.remove('fa-pause');
            currentButton.classList.add('fa-play');
        }

        if (audioPlayer.paused) {
            playAudio(audioPlayer, button);
            currentIndex = index;
            addToRecentPlaylist(audioFiles[currentIndex]);
        } else {
            audioPlayer.pause();
            button.classList.remove('fa-pause');
            button.classList.add('fa-play');
            controlPlayPauseButton.classList.remove('fa-pause');
            controlPlayPauseButton.classList.add('fa-play');
        }
    });
});

// Control play/pause button
controlPlayPauseButton.addEventListener('click', () => {
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
            controlPlayPauseButton.classList.remove('fa-play');
            controlPlayPauseButton.classList.add('fa-pause');
            currentButton.classList.remove('fa-play');
            currentButton.classList.add('fa-pause');
        } else {
            currentAudio.pause();
            controlPlayPauseButton.classList.remove('fa-pause');
            controlPlayPauseButton.classList.add('fa-play');
            currentButton.classList.remove('fa-pause');
            currentButton.classList.add('fa-play');
        }
    }
});

// Previous button
previousButton.addEventListener('click', () => {
    if (currentAudio) {
        currentAudio.pause();
        currentButton.classList.remove('fa-pause');
        currentButton.classList.add('fa-play');
    }
    currentIndex = (currentIndex - 1 + audioFiles.length) % audioFiles.length;
    currentAudio = new Audio(audioFiles[currentIndex]);
    playAudio(currentAudio, playButtons[currentIndex]);
    addToRecentPlaylist(audioFiles[currentIndex]);
});

// Next button
nextButton.addEventListener('click', () => {
    if (currentAudio) {
        currentAudio.pause();
        currentButton.classList.remove('fa-pause');
        currentButton.classList.add('fa-play');
    }
    currentIndex = (currentIndex + 1) % audioFiles.length;
    currentAudio = new Audio(audioFiles[currentIndex]);
    playAudio(currentAudio, playButtons[currentIndex]);
    addToRecentPlaylist(audioFiles[currentIndex]);
});

// Seek functionality
progress.addEventListener('click', (e) => {
    if (currentAudio) {
        const rect = progress.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const totalWidth = progress.offsetWidth;
        const percentage = offsetX / totalWidth;
        currentAudio.currentTime = percentage * currentAudio.duration;
        updateTimeline();
    }
});

// Button

document.getElementById("forwardButton").addEventListener("click", function() {
    window.history.back();
});

document.getElementById("backButton").addEventListener("click", function() {
    window.history.forward();
});

// Toggle
document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('navbarToggle');
    var sidebar = document.querySelector('.sidebar');
    var mainContainer = document.querySelector('.main-container');
    var prevNextButtons = document.querySelector('.prev-next-buttons');

    toggleButton.addEventListener('click', function() {
        if (sidebar.style.display === 'none' || sidebar.style.display === '') {
            sidebar.style.display = 'block'; // Show the sidebar
            mainContainer.style.marginLeft = '196px'; // Adjust main container margin
            prevNextButtons.style.display = 'none'; // Hide prev-next buttons
        } else {
            sidebar.style.display = 'none'; // Hide the sidebar
            mainContainer.style.marginLeft = '0'; // Reset main container margin
            prevNextButtons.style.display = 'block'; // Show prev-next buttons
        }
    });
});



  



