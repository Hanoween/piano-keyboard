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
            note.audio.play();
        });
        i++;
        ["mouseup", "mouseout"].forEach((evt) => {
            note.addEventListener(evt, () => {
                note.audio.pause();
                note.audio.currentTime = 0;
            });
        });
    });
}

setAudio("white");
setAudio("black");