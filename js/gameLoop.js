game_data = {};

function ititialize(){
    // Initializes the textures, options, and calls gameLoop
    time = performance.now();
    bread_crumbs = document.getElementById("icon_bread");
    player = document.getElementById("icon_mouse");
    cheese = document.getElementById("icon_cheese");
    home = document.getElementById("icon_home");
    textures = {
        'bread_crumbs': bread_crumbs,
        'start': home,
        'end': cheese,
        'path_marker': bread_crumbs,
        'player': player
    };
    options = {
        'show_help': true,
        'show_path': true,
        'show_visited': true
    };
    maze = getMaze(10);
    game_data = {
        'textures': textures,
        'options':options,
        'maze':maze,
        'time':{
            'previous':time,
            'current':time,
            'elapsed':time
        },
        'player':{
            'coord':{
                'x': 0,
                'y':0
            },
            'score':0
        }
    };
    gameLoop();
}

function processInput(){

}

function update(){
}

function render(){
    canvas = document.getElementById('canvas_main');
    context = canvas.getContext('2d');

    renderMaze(canvas, context);
}

function gameLoop(){
    game_data['time']['current'] = performance.now();
    game_data['time']['elapsed'] = game_data['time']['current'] - game_data['previous_time'];
    game_data['time']['previous'] = game_data['time']['current'];

    processInput();
    update();
    render();

    // Event-based model, makes a request to the browser to loop when its ready. Allows the browser to do other things
    requestAnimationFrame(gameLoop)
}

ititialize();
