const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function playVideo() {
//    if (video.paused) {
//     video.play();
//    } else {
//     video.pause(); 
//    }

    const method = video.paused ? "play" : "pause" ;
    video[method]();
}

function updateButton () {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip () {
    //console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeButton () {
    //console.log(video.value);
    //console.log(this.value);
    //console.log(video);
    video[this.name] = this.value;
}

function progressUpdate () {
    const percent = (video.currentTime / video.duration) * 100 ;
    // console.log(percent);
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
    // console.log(e);
    const scrubTime = ( e.offsetX / progress.offsetWidth ) * video.duration
    video.currentTime = scrubTime;
}

video.addEventListener("click", playVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressUpdate);

ranges.forEach(buttons => buttons.addEventListener("change", rangeButton));
ranges.forEach(buttons => buttons.addEventListener("mousemove", rangeButton));

toggle.addEventListener("click", playVideo);
skipButtons.forEach(buttons => buttons.addEventListener("click", skip));

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => mouseDown = true);
progress.addEventListener("mouseup", () => mouseDown = false);