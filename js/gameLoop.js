let previousTime = performance.now();
let maze = getMaze(10);
let bread_crumbs = document.getElementById("icon_bread");
let textures = {'bread_crumbs': bread_crumbs};
let options = {'help': false, 'bread_crumbs': true};

function processInput(elapsedTime){

}

function update(elapsedTime){

}

function render(elapsedTime){
    let canvas = document.getElementById('canvas-main');
    let context = canvas.getContext('2d');
    renderMaze(canvas, context, options, maze, textures);
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
