function movePlayer(direction){
    // Move player in given direction if the movement is valid
    maze = game_data['maze'];
    pX = game_data['player']['coord']['x'];
    pY = game_data['player']['coord']['y'];

    if(direction === 'u'){
        if(maze[pX][pY]['u'] === true){
            game_data['player']['coord']['y'] -= 1;
            updatePlayer();
            return;
        }
    }
    if(direction === 'r'){
        if(maze[pX][pY]['r'] === true){
            game_data['player']['coord']['x'] += 1;
            updatePlayer();
            return;
        }
    }
    if(direction === 'd'){
        if(maze[pX][pY]['d'] === true){
            game_data['player']['coord']['y'] += 1;
            updatePlayer();
            return;
        }
    }
    if(direction === 'l'){
        if(maze[pX][pY]['l'] === true){
            game_data['player']['coord']['x'] -= 1;
            updatePlayer();
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
    document.getElementById('time').innerHTML = "Time: " + game_data['time']['running_seconds'];
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
        text += "Name: " + game_data['scores'][i]['name'] +
            " : Score: " + game_data['scores'][i]['score'] +
            " : Time: " + game_data['scores'][i]['time'] +
            " : Size: " + game_data['maze']['size'] + "<br>";
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
    game_data['options']['show_score'] = !game_data['options']['show_score']
}

function toggleShortestPathDisplay(){
    game_data['options']['show_path'] = !game_data['options']['show_path']
}

function toggleBreadcrumbsDisplay(){
    game_data['options']['show_visited'] = !game_data['options']['show_visited']
}

function updatePlayer(){
    maze = game_data['maze'];
    player = game_data['player'];
    pX = game_data['player']['coord']['x'];
    pY = game_data['player']['coord']['y'];

    // +5 for a correct square, -1 for incorrect square
    if(maze[pX][pY]['visited'] === false){
        if(maze['shortest_path'].indexOf(maze[pX][pY]) > -1){
            game_data['player']['score'] += 5;
        }
        else {
            game_data['player']['score'] -= 1;
        }
        maze[pX][pY]['visited'] = true;
    }

    if(player['shortest_path'].indexOf(maze[pX][pY]) > -1){
        game_data['player']['shortest_path'].shift();
    } else {
        game_data['player']['shortest_path'].splice(0, 0, maze[pX][pY]);
    }
}

function updateEndGame(){
    maze = game_data['maze'];
    pX = game_data['player']['coord']['x'];
    pY = game_data['player']['coord']['y'];
    if(maze[pX][pY] === maze['end_point']){
        high_score = {};
        high_score['time'] = game_data['time']['running_seconds'];
        high_score['score'] = game_data['player']['score'];
        high_score['size'] = game_data['maze']['size'] + "x" + game_data['maze']['size'];
        if(game_data['player']['name'] === undefined){
            high_score['name'] = prompt("Enter your name to save your high score:", "Anon");
            if(high_score['name'] === null || high_score['name'] === ""){
                high_score['name'] = "Anon";
            }
        } else{
            high_score['name'] = game_data['player']['name'];
        }
        game_data['scores'].push(high_score);
        updateMazeSize(game_data['maze']['size']);
    }
}
