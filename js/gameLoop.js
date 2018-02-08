let previousTime = performance.now();
let maze = getMaze(20);

function processInput(elapsedTime){

}

function update(elapsedTime){

}

function render(elapsedTime){
    let canvas = document.getElementById('canvas-main');
    let context = canvas.getContext('2d');
    renderMaze(canvas, context, maze);
}

function gameLoop(){
    let currentTime = performance.now();
    let elapsedTime = currentTime - previousTime;
    previousTime = currentTime;

    processInput(elapsedTime);
    update(elapsedTime);
    render(elapsedTime);

    if(true){
        // Event-based model, makes a request to the browser to loop when its ready. Allows the browser to do other things
        requestAnimationFrame(gameLoop)
    }
}

gameLoop();
