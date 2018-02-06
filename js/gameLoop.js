let previousTime = performance.now();

function getCell(){
    // Returns an empty cell
    return {'u': false, 'r': false, 'd': false, 'l':false};
}

function getGrid(size){
    // Returns a grid of size X size, filled with empty cells
    grid = [];
    grid.size = size;
    for(i = 0; i < size; i++){
        row = [];
        for(j = 0; j < size; j++){
            row.push(getCell())
        }
        grid.push(row);
    }
    return grid;
}

function getOppositeDirection(direction){
    if (direction === 'r') return 'l';
    if (direction === 'u') return 'd';
    if (direction === 'l') return 'r';
    if (direction === 'd') return 'u';
}

function randomPrims(grid){
    current_row = getRandomNumber(grid.size);
    current_col = getRandomNumber(grid.size);
    current_cell = grid[current_row][current_col];
    visited = [current_cell];
    walls = [[current_cell, 'u'], [current_cell, 'r'], [current_cell, 'd'], [current_cell, 'l']];
    while(walls.length >= 0){
        previous_cell = current_cell;
        random_wall = walls[getRandomNumber(walls.length)];
        if(random_wall[1] === 'u' && current_row > 0){
            current_row -= 1;
        } else if(random_wall[1] === 'r' && current_col < grid.size){
            current_col += 1;
        } else if(random_wall[1] === 'd' && current_row < grid.size){
            current_row += 1;
        } else if(random_wall[1] === 'l' && current_col > 0){
            current_col -= 1;
        }
        if(!(grid[current_row][current_col] in visited)){
            current_cell = grid[current_row][current_col];
            previous_cell[random_wall[1]] = true;
            current_cell[getOppositeDirection(random_wall[1])] = true;
            // TODO add walls to the list
        }

        // TODO remove wall
    }
}

function getMaze(size){
    grid = getGrid(size);
    maze = randomPrims(grid);
}

function processInput(elapsedTime){

}

function update(elapsedTime){

}

function render(elapsedTime){

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
