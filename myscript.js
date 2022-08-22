function setAudio(color) {
    let notes = [];
    let noteClasses = document.querySelectorAll(`.${color}`)

    noteClasses.forEach((note) => {
        notes.push(note.classList[1]);
    });

    var i = 0;
    noteClasses.forEach((note) => {
        note.audio = new Audio(`notes/${color}/${notes[i]}.mp3`);
        note.addEventListener("mousedown", () => {
            note.isClicked = true;
            note.audio.pause()
            note.audio.currentTime = 0;
            note.audio.volume = 1;
            note.audio.play();
            note.classList[0] === "black" ? note.style.backgroundColor = "#4e4e4f" : note.style.backgroundColor = "#c4c0b5";
        });
        i++;

        ["mouseup", "mouseout"].forEach((evt) => {
            note.addEventListener(evt, () => {
                note.isClicked = false;
                note.style.backgroundColor = null;
                aud_fade(note, evt);
            });
        });

    });
}

let reverb = false;
window.addEventListener("keypress", (event) => {
    if (event.key === ' ' || event.key === 'Spacebar') {
        reverb = true;
    }
});

window.addEventListener("keyup", (event) => {
    reverb = false;
    if (event.key === ' ' || event.key === 'Spacebar') {
        let allNotes = document.querySelectorAll(".black, .white");
        allNotes.forEach((note) => {
            if (!note.isClicked) {
                aud_fade(note);
            }
        });
    }
});

function aud_fade(note, evt = "mouseup") {
    if (reverb || note.audio.volume < 1 & evt === "mouseout") {
        return;
    }
    else if (Math.round(note.audio.volume * 10) > 0.2) {
        note.audio.volume -= 0.2;
        setTimeout(aud_fade, 20, note);
    }
}

setAudio("white");
setAudio("black");