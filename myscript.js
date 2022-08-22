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
            note.audio.pause()
            note.audio.currentTime = 0;
            note.audio.volume = 1;
            note.audio.play();
        });
        i++;
        ["mouseup", "mouseout"].forEach((evt) => {
            note.addEventListener(evt, () => {
                aud_fade(note, evt);        
            });
        });
    });
}

function aud_fade(note, evt) {
    if (note.audio.volume < 1 & evt === "mouseout") console.log(note.audio.volume);
    else if (Math.round(note.audio.volume * 10) > 0.2) {
        console.log(note.audio.volume);
        note.audio.volume -= 0.25;
        setTimeout(aud_fade, 70, note);
    }
}

setAudio("white");
setAudio("black");