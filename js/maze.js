function getCell(){
    // Returns an empty cell, where false means a wall exists, true means
    // a path exists, and undefined means an outside edge exists.
    return {'u': false,
            'r': false,
            'd': false,
            'l':false,
            'visited': false,
            'coord': {'x': undefined, 'y': undefined}
    };
}

function getGrid(size){
    // Returns a grid of size X size, filled with empty cells
    grid = [];
    grid.size = size;

    for(i = 0; i < size; i++){
        row = [];
        for(j = 0; j < size; j++){
            cell = getCell();
            cell['coord']['x'] = i;
            cell['coord']['y'] = j;
            row.push(cell)

        }
        grid.push(row);
    }

    // edge cases -- literally
    for(i = 0; i < size; i++){
        grid[i][0]['u'] = undefined;
        grid[size-1][i]['r'] = undefined;
        grid[i][size-1]['d'] = undefined;
        grid[0][i]['l'] = undefined;
    }
    return grid;
}

function getOppositeDirection(direction){
    if (direction === 'r') return 'l';
    if (direction === 'u') return 'd';
    if (direction === 'l') return 'r';
    if (direction === 'd') return 'u';
}

function getCellWalls(cell){
    // Get non-edge cell walls
    walls = [];
    x = cell['coord']['x'];
    y = cell['coord']['y'];
    if(cell['u'] === false){
        walls.push({'direction': 'u', 'coord': {'x': x, 'y': y}});
    }
    if(cell['r'] === false){
        walls.push({'direction': 'r', 'coord': {'x': x, 'y': y}});
    }
    if(cell['d'] === false){
        walls.push({'direction': 'd', 'coord': {'x': x, 'y': y}});
    }
    if(cell['l'] === false){
        walls.push({'direction': 'l', 'coord': {'x': x, 'y': y}});
    }
    return walls;
}

function getAdjacentCell(grid, wall){
    // Given a wall, get the cell on the other side of the wall
    current_x = wall['coord']['x'];
    current_y = wall['coord']['y'];
    if(wall['direction'] === 'u'){
        return grid[current_x][current_y-1];
    }
    if(wall['direction'] === 'r'){
        return grid[current_x+1][current_y];
    }
    if(wall['direction'] === 'd'){
        return grid[current_x][current_y+1];
    }
    if(wall['direction'] === 'l'){
        return grid[current_x-1][current_y];
    }
}

function clearVisited(grid){
    // Sets all visited attributes to false
    for(i = 0; i < grid.size;i++){
        for(j=0;j<grid.size;j++){
            grid[i][j]['visited'] = false;
        }
    }
}

function randomPrims(grid){
    current_x = getRandomNumber(grid.size);
    current_y = getRandomNumber(grid.size);
    current_cell = grid[current_x][current_y];
    current_cell['visited'] = true;
    walls = getCellWalls(current_cell);

    while(walls.length > 0){
        current_wall_index = getRandomNumber(walls.length);
        current_wall = walls[current_wall_index];
        current_x = current_wall['coord']['x'];
        current_y = current_wall['coord']['y'];
        current_cell = grid[current_x][current_y];
        current_adj_cell = getAdjacentCell(grid, current_wall);

        if(current_adj_cell['visited']===false){
            current_cell[current_wall['direction']] = true;
            current_adj_cell[getOppositeDirection(current_wall['direction'])] = true;
            current_adj_cell['visited'] = true;
            walls = walls.concat(getCellWalls(current_adj_cell));
            current_wall = true;
        }

        walls.splice(current_wall_index, 1);
    }

    clearVisited(grid);
}

function getMaze(size){
    grid = getGrid(size);
    randomPrims(grid);
    grid.startPoint = grid[0][0];
    grid.endPoint = grid[grid.size-1][grid.size-1];
    grid.shortest_path = getShortestPath(grid, grid.startPoint, grid.endPoint);
    return grid;
}

function getConnectedCell(maze, coord, direction){
    x = coord['x'];
    y = coord['y'];
    if(direction==='u'){
        if(maze[x][y][direction] === true){
            return maze[x][y-1];
        }
    }
    if(direction==='r'){
        if(maze[x][y][direction] === true){
            return maze[x+1][y];
        }
    }
    if(direction==='d'){
        if(maze[x][y][direction] === true){
            return maze[x][y+1];
        }
    }
    if(direction==='l'){
        if(maze[x][y][direction] === true){
            return maze[x-1][y];
        }
    }
}

function getShortestPath(maze, startPoint, endPoint){
    // Solves the maze, returning a list of coordinates to cells in the path
    solutions = [[startPoint]];
    directions = ['u', 'r', 'd', 'l'];
    while(solutions.length > 0){
        path = solutions.pop();
        for(i = 0; i < directions.length; i++){
            // Add new paths spreading in each viable direction
            new_path = path.slice();
            connected_cell = getConnectedCell(maze, new_path[new_path.length-1]['coord'], directions[i]);
            if(connected_cell !== undefined){
                if(connected_cell['visited'] !== true){
                    new_path.push(connected_cell);
                    if (connected_cell === endPoint){
                        clearVisited(maze);
                        return new_path;
                    }
                    solutions.push(new_path);
                    connected_cell['visited'] = true;
                }
            }
        }
    }
    clearVisited(maze);
}

function renderMazeWalls(context, maze, cellBorder){
    if(maze[i][j]['u'] !== true){
        context.moveTo(cellBorder['x1'], cellBorder['y1']);
        context.lineTo(cellBorder['x2'], cellBorder['y1']);
    }
    if(maze[i][j]['r'] !== true){
        context.moveTo(cellBorder['x2'], cellBorder['y1']);
        context.lineTo(cellBorder['x2'], cellBorder['y2']);
    }
    if(maze[i][j]['d'] !== true){
        context.moveTo(cellBorder['x2'], cellBorder['y2']);
        context.lineTo(cellBorder['x1'], cellBorder['y2']);
    }
    if(maze[i][j]['l'] !== true){
        context.moveTo(cellBorder['x1'], cellBorder['y2']);
        context.lineTo(cellBorder['x1'], cellBorder['y1']);
    }
}

function renderMazeShortestPath(context, maze, cellBorder, textures, options){
    if(options['show_path']) {
        if (maze['shortest_path'].indexOf(maze[i][j]) > -1) { // if cell is in shortest path
            xAvg = (cellBorder['x1'] + cellBorder['x2']) / 2;
            yAvg = (cellBorder['y1'] + cellBorder['y2']) / 2;
            context.drawImage(img = textures['bread_crumbs'], x = xAvg - 10, y = yAvg - 10, width = 10, height = 10);
        }
    }
}

function renderMazeVisited(context, maze, cellBorder, textures, options){
    if(options['show_visited']) {
        if (maze[i][j]['visited']) {
            xAvg = (cellBorder['x1'] + cellBorder['x2']) / 2;
            yAvg = (cellBorder['y1'] + cellBorder['y2']) / 2;
            context.drawImage(img = textures['bread_crumbs'], x = xAvg - 10, y = yAvg - 10, width = 20, height = 20);
        }
    }
}

function renderPlayer(context, maze, textures, player, xOffset, yOffset){
    context.drawImage(
        img = textures['player'],
        x = xOffset*player['coord']['x'],
        y = yOffset*player['coord']['y'],
        width = xOffset,
        height = yOffset
    );
}

function renderMaze(canvas, context, game_data){
    maze = game_data['maze'];
    textures = game_data['textures'];
    player = game_data['player'];

    // clearCanvas(canvas, context);

    // Background
    drawRectangle(context,
        {
            x : 0,
            y : 0,
            width : canvas.width,
            height : canvas.height,
            fill : 'rgba(55, 55, 55, 1)',
            stroke : 'rgba(0, 0, 0, 1)'
        }
    );
    context.beginPath();
    xOffset = canvas.width/maze.size;
    yOffset = canvas.height/maze.size;
    for(i = 0; i < maze.size; i++){
        for(j = 0; j < maze.size; j++){
            cellBorder = {
                'xOffset': xOffset,
                'yOffset': yOffset,
                'y1': j*yOffset,
                'x1': i*xOffset,
                'y2': j*yOffset+yOffset,
                'x2': i*xOffset+xOffset
            };

            renderMazeWalls(context, maze, cellBorder);
            renderMazeShortestPath(context, maze, cellBorder, textures, options);
            renderMazeVisited(context, maze, cellBorder, textures, options);
        }
    }

    renderPlayer(context, maze, textures, player, xOffset, yOffset);

    context.strokeStyle = '#f00';
    context.lineWidth = 3;
    context.stroke();
}
