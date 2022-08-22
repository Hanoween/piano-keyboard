function setAudio(color) {
    let notes = [];
    let noteClasses = document.querySelectorAll(`.${color}`)

    noteClasses.forEach((note) => {
        notes.push(note.classList[1]);
    });
    var i = 0;
    noteClasses.forEach((note) => {
        note.audio = new Audio(`notes/${color}/${notes[i]}.mp3`);
        i++
    });
}

function playAudio() {
    let mouseDown = false;
    var i = 0;
    allNotes.forEach((note) => {
        ["mousedown", "mouseover"].forEach((evt) => {
            note.addEventListener(evt, () => {
                if (evt === "mousedown") {
                    note.isClicked = true;
                    mouseDown = true;
                }
                if (evt === "mousedown" || (slide && mouseDown && evt === "mouseover")) {
                    note.audio.pause()
                    note.audio.currentTime = 0;
                    note.audio.volume = 1;
                    note.audio.play();
                    note.classList[0] === "black" ? note.style.backgroundColor = "#4e4e4f" : note.style.backgroundColor = "#c4c0b5";
                }
            });
        });
        i++;
        ["mouseup", "mouseout"].forEach((evt) => {
            note.addEventListener(evt, () => {
                if (evt === "mouseup") mouseDown = false;
                note.isClicked = false;
                note.style.backgroundColor = null;
                aud_fade(note, evt);
            });
        });
    });
}

function setReverb() {
    let reverbKey = document.querySelector("#reverb");
    window.addEventListener("keypress", (event) => {
        if (event.key === ' ' || event.key === 'Spacebar') {
            reverbKey.style.backgroundColor = "#4d77d1";
            reverb = true;
        }
    });

    window.addEventListener("keyup", (event) => {
        reverb = false;
        if (event.key === ' ' || event.key === 'Spacebar') {
            reverbKey.style.backgroundColor = null;
            allNotes.forEach((note) => {
                if (!note.isClicked) {
                    aud_fade(note);
                }
            });
        }
    });
}

function aud_fade(note, evt = "mouseup") {
    if (reverb || note.audio.volume < 1 & evt === "mouseout") {
        return;
    }
    else if (Math.round(note.audio.volume * 10) > 0.2) {
        note.audio.volume -= 0.2;
        setTimeout(aud_fade, 20, note);
    }
}

function setSlide() {
    let slideButton = document.querySelector("#slide");
    slideButton.addEventListener("click", () => {
        if (slide) {
            slideButton.style.backgroundColor = "#e81e54";
            slideButton.innerHTML = "<h3>slide: OFF</h3>"
            slide = false;
        }
        else {
            slideButton.style.backgroundColor = null;
            slideButton.innerHTML = "<h3>slide: ON</h3>"
            slide = true;
        }
    })
}

function recordAudio() {
}

function start() {

}

let slide = true;
let reverb = false;
let allNotes = document.querySelectorAll(".black, .white");
setReverb();
setSlide();
setAudio("white");
setAudio("black");
playAudio();