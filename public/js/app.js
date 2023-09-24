const data = {
    session: Date.now(),
    drawings: []
};

const sketchPad = new SketchPad(document.querySelector('#sketchPadContainer'));

function start() {
    if(filename.value == '') {
        alert('Please type a name!');
        return;
    }
    
    filename.style.display = 'none';
    startBtn.style.display = 'none';
    saveBtn.style.display = 'block';
    sketchPadContainer.classList.add('show');
}

function save() {
    if (sketchPad.paths.length == 0) {
        alert("Draw something");
        return;
    }
    data.drawings = sketchPad.paths;

    const aTag = document.createElement('a');
    aTag.setAttribute('href', 
    `data:text/plain;charset=utf-8,${JSON.stringify(data)}`);
    aTag.setAttribute('download', `${filename.value}.json`);
    aTag.click();

    sketchPad.reset();
    filename.style.display = 'block';
    startBtn.style.display = 'block';
    saveBtn.style.display = 'none';
}