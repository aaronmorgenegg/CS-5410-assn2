game_data = {};

function ititialize(){
    // Initializes the textures, options, and calls gameLoop
    bread_crumbs = document.getElementById("icon_bread");
    player = document.getElementById("icon_mouse");
    cheese = document.getElementById("icon_cheese");
    home = document.getElementById("icon_home");
    textures = {
        'bread_crumbs': bread_crumbs,
        'start': home,
        'end': cheese,
        'path_marker': bread_crumbs,
        'help_marker': bread_crumbs,
        'player': player
    };
    options = {
        'show_help': false,
        'show_path': false,
        'show_visited': false,
        'show_score': false
    };
    maze = getMaze(10);
    game_data = {
        'textures': textures,
        'options':options,
        'maze':maze,
        'scores':[],
        'time':{
            'previous':performance.now(),
            'current':0,
            'elapsed':0,
            'running':0
        },
        'player':{
            'coord':{
                'x': 0,
                'y':0
            },
            'score':0,
            'name': undefined,
            'shortest_path': maze['shortest_path'],
            'input': ''
        }
    };
    document.addEventListener('keydown', onKeyDown);
    requestAnimationFrame(gameLoop);
}

function processInput(){

}

function update(){
    updateInput();
    updateEndGame();
}

function render(){
    canvas = document.getElementById('canvas_main');
    context = canvas.getContext('2d');

    renderMaze(canvas, context);
    renderTime();
    renderScore();
    renderHighScores();
}

function gameLoop(){
    updateTime();

    processInput();
    update();
    render();

    // Event-based model, makes a request to the browser to loop when its ready. Allows the browser to do other things
    requestAnimationFrame(gameLoop)
}

ititialize();
