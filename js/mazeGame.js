function movePlayer(direction){
    // Move player in given direction if the movement is valid
    maze = game_data['maze'];
    pX = game_data['player']['coord']['x'];
    pY = game_data['player']['coord']['y'];

    if(direction === 'u'){
        if(maze[pX][pY]['u'] === true){
            py -= 1;
            return;
        }
    }
    if(direction === 'r'){
        if(maze[pX][pY]['r'] === true){
            pX += 1;
            return;
        }
    }
    if(direction === 'd'){
        if(maze[pX][pY]['d'] === true){
            py += 1;
            return;
        }
    }
    if(direction === 'u'){
        if(maze[pX][pY]['l'] === true){
            pX -= 1;
            return;
        }
    }
}

function updateMazeSize(size){
    // Resets maze to given size when button is pressed
    resetGame();
    game_data['maze'] = getMaze(size);
}

function resetGame(){
    game_data['player']['coord'] = {'x': 0, 'y': 0};
    game_data['player']['score'] = 0;
}

function renderTime(){
    document.getElementById('time').innerHTML = "Time: " + Math.floor(game_data['time']['running'] / 1000);
}

function renderScore(){
    if(game_data['options']['show_score']) {
        document.getElementById('score').innerHTML = "Score: " + game_data['player']['score'];
    } else {
        document.getElementById('score').innerHTML = "Score: Hidden";
    }
}

function renderHighScores(){
    text = "High Scores: <br>";
    for(i = 0; i < game_data['scores'].length; i++){
        text += game_data['scores'][i]['name'] + " : " + game_data['scores'][i]['score'] + "<br>";
    }
    document.getElementById('high_scores').innerHTML = text;
}

function updateTime(){
    // console.log(game_data['time']);
    game_data['time']['current'] = performance.now();
    game_data['time']['elapsed'] = (game_data['time']['current'] - game_data['time']['previous']);
    game_data['time']['running'] += game_data['time']['elapsed'];
    game_data['time']['previous'] = game_data['time']['current'];
}

function toggleScoreDisplay(){
    game_data['options']['show_score'] = !game_data['options']['show_score']
}

function toggleShortestPathDisplay(){
    game_data['options']['show_path'] = !game_data['options']['show_path']
}

function toggleBreadcrumbsDisplay(){
    game_data['options']['show_visited'] = !game_data['options']['show_visited']
}
