function movePlayer(direction){
    // Move player in given direction if the movement is valid
    maze = game_data['maze'];
    pX = game_data['player']['coord']['x'];
    pY = game_data['player']['coord']['y'];

    if(direction === 'u'){
        if(maze[pX][pY]['u'] === true){
            game_data['player']['coord']['y'] -= 1;
            return true;
        }
    }
    if(direction === 'r'){
        if(maze[pX][pY]['r'] === true){
            game_data['player']['coord']['x'] += 1;
            return true;
        }
    }
    if(direction === 'd'){
        if(maze[pX][pY]['d'] === true){
            game_data['player']['coord']['y'] += 1;
            return true;
        }
    }
    if(direction === 'l'){
        if(maze[pX][pY]['l'] === true){
            game_data['player']['coord']['x'] -= 1;
            return true;
        }
    }
    return false;
}

function resetGame(size){
    game_data['maze'] = getMaze(size);
    game_data['player']['coord'] = {'x': 0, 'y': 0};
    game_data['player']['score'] = 0;
    game_data['player']['shortest_path'] = game_data['maze']['shortest_path'];
    game_data['time'] = {
            'previous':performance.now(),
            'current':0,
            'elapsed':0,
            'running':0
        };
}

function renderTime(){
    document.getElementById('time').innerHTML = "Time: " + game_data['time']['running_seconds'];
}

function renderScore(){
    score = game_data['player']['score'] - game_data['time']['running_seconds'];
    if(game_data['options']['show_score']) {
        document.getElementById('score').innerHTML = "Score: " + score;
    } else {
        document.getElementById('score').innerHTML = "Score: Hidden";
    }
}

function renderHighScores(){
    text = "High Scores: <br>";
    for(i = 0; i < game_data['scores'].length; i++){
        text += "Name: " + game_data['scores'][i]['name'] +
            " : Score: " + game_data['scores'][i]['score'] +
            " : Time: " + game_data['scores'][i]['time'] +
            " : Size: " + game_data['scores'][i]['size'] + "<br>";
    }
    document.getElementById('high_scores').innerHTML = text;
}

function updateTime(){
    // console.log(game_data['time']);
    game_data['time']['current'] = performance.now();
    game_data['time']['elapsed'] = (game_data['time']['current'] - game_data['time']['previous']);
    game_data['time']['running'] += game_data['time']['elapsed'];
    game_data['time']['previous'] = game_data['time']['current'];
    game_data['time']['running_seconds'] = Math.floor(game_data['time']['running'] / 1000);
}

function toggleScoreDisplay(){
    game_data['options']['show_score'] = !game_data['options']['show_score'];
}

function toggleHelpDisplay(){
    game_data['options']['show_help'] = !game_data['options']['show_help'];
}

function toggleShortestPathDisplay(){
    game_data['options']['show_path'] = !game_data['options']['show_path'];
}

function toggleBreadcrumbsDisplay(){
    game_data['options']['show_visited'] = !game_data['options']['show_visited'];
}

function updatePlayer(){
    if(movePlayer(game_data['player']['input'])){
        maze = game_data['maze'];
        player = game_data['player'];
        pX = player['coord']['x'];
        pY = player['coord']['y'];

        // +5 for a correct square, -1 for incorrect square
        if (maze[pX][pY]['visited'] === false) {
            if (maze['shortest_path'].indexOf(maze[pX][pY]) > -1) {
                game_data['player']['score'] += 5;
            }
            else {
                game_data['player']['score'] -= 1;
            }
            maze[pX][pY]['visited'] = true;
        }

        if (player['shortest_path'].indexOf(maze[pX][pY]) > -1) {
            game_data['player']['shortest_path'].shift();
        } else {
            game_data['player']['shortest_path'].unshift(maze[pX][pY]);
        }
    }
}

function finalScore(){
    maze = game_data['maze'];
    score = game_data['player']['score'];

    // -1 point per second it takes to finish
    time_penalty = game_data['time']['running_seconds'];

    // + 25 bonus points for not messing up
    perfection_bonus = 25;
    for(i = 0; i < maze['size']; i++){
        for(j = 0; j < maze['size']; j++){
            if(maze['shortest_path'].indexOf(maze[i][j]) <= -1 && maze[i][j]['visited']){
                perfection_bonus = 0;
            }
        }
    }

    // bonus points based on size of the maze
    size_bonus = 2*maze['size'];

    return score - time_penalty + perfection_bonus + size_bonus;
}

function updateEndGame(){
    maze = game_data['maze'];
    pX = game_data['player']['coord']['x'];
    pY = game_data['player']['coord']['y'];
    if(maze[pX][pY] === maze['end_point']){
        high_score = {};
        high_score['time'] = game_data['time']['running_seconds'];
        high_score['score'] = finalScore();
        high_score['size'] = game_data['maze']['size'] + 'x' + game_data['maze']['size'];
        if(game_data['player']['name'] === undefined){
            high_score['name'] = prompt('Enter your name to save your high score:', 'Anon');
            if(high_score['name'] === null || high_score['name'] === ""){
                high_score['name'] = "Anon";
            }
        } else{
            high_score['name'] = game_data['player']['name'];
        }
        game_data['scores'].push(high_score);
        resetGame(game_data['maze']['size']);
    }
}

function updateInput(){
    input = game_data['player']['input'];
    if(input === 'h'){
        toggleHelpDisplay();
    } if(input === 'b'){
        toggleBreadcrumbsDisplay();
    } if(input === 'p'){
        toggleShortestPathDisplay();
    } if(input === 'y') {
        toggleScoreDisplay();
    } else{
        updatePlayer();
    }
    game_data['player']['input'] = '';
}

function onKeyDown(e){
    if(e.keyCode === 87 || e.keyCode === 73 || e.keyCode === 38){
        game_data['player']['input'] = 'u';
    }
    if(e.keyCode === 68 || e.keyCode === 76 || e.keyCode === 39){
        game_data['player']['input'] = 'r';
    }
    if(e.keyCode === 83 || e.keyCode === 75 || e.keyCode === 40){
        game_data['player']['input'] = 'd';
    }
    if(e.keyCode === 65 || e.keyCode === 74 || e.keyCode === 37){
        game_data['player']['input'] = 'l';
    }
    if(e.keyCode === 72){
        game_data['player']['input'] = 'h';
    }
    if(e.keyCode === 66){
        game_data['player']['input'] = 'b';
    }
    if(e.keyCode === 80){
        game_data['player']['input'] = 'p';
    }
    if(e.keyCode === 89){
        game_data['player']['input'] = 'y';
    }
}
