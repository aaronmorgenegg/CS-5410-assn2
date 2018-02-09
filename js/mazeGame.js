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
