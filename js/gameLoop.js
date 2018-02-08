function ititialize(){
    // Initializes the textures, options, and calls gameLoop
    time = performance.now();
    bread_crumbs = document.getElementById("icon_bread");
    textures = {
        'bread_crumbs': bread_crumbs,
        'start': bread_crumbs,
        'end': bread_crumbs,
        'path_marker': bread_crumbs,
        'player': bread_crumbs
    };
    options = {
        'help': true,
        'show_path': true,
        'show_visited': true
    };
    maze = getMaze(5);
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
    gameLoop(game_data);
}

function processInput(game_data){

}

function update(game_data){

}

function render(game_data){
    canvas = document.getElementById('canvas-main');
    context = canvas.getContext('2d');

    renderMaze(canvas, context, game_data);
}

function gameLoop(game_data){
    game_data['time']['current'] = performance.now();
    game_data['time']['elapsed'] = game_data['time']['current'] - game_data['previous_time'];
    game_data['time']['previous'] = game_data['time']['current'];

    processInput(game_data);
    update(game_data);
    render(game_data);

    // Event-based model, makes a request to the browser to loop when its ready. Allows the browser to do other things
    requestAnimationFrame(gameLoop)
}

ititialize();
