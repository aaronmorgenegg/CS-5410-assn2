function getCell(){
    // Returns an empty cell, where false means a wall exists, true means
    // a path exists, and undefined means an outside edge exists.
    return {'u': false,
            'r': false,
            'd': false,
            'l':false,
            'visited': false,
            'coord': {'x': undefined, 'y': undefined},
            'shortest_path': undefined
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

    for(i = 0; i < grid.size;i++){
        for(j=0;j<grid.size;j++){
            grid[i][j]['visited'] = false;
        }
    }
}

function getMaze(size){
    grid = getGrid(size);
    randomPrims(grid);
    grid.startPoint = {'coord': {'x': 0, 'y': 0}};
    grid.endPoint = {'coord': {'x': grid.size-1, 'y': grid.size-1}};
    // saveShortestPaths(grid); // TODO fix this
    return grid;
}

function getConnectedCell(maze, coord, direction){
    x = coord['x'];
    y = coord['y'];
    if(direction==='u'){
        if(maze[x][y][direction] === true){
            return {'x':x, 'y':y-1};
        }
    }
    if(direction==='r'){
        if(maze[x][y][direction] === true){
            return {'x':x+1, 'y':y};
        }
    }
    if(direction==='d'){
        if(maze[x][y][direction] === true){
            return {'x':x, 'y':y+1};
        }
    }
    if(direction==='l'){
        if(maze[x][y][direction] === true){
            return {'x':x-1, 'y':y};
        }
    }
}

function getShortestPath(maze, startPoint, endPoint){
    // Solves the maze, returning a list of coordinates to cells in the path
    // if(startPoint===endPoint) return [endPoint['coord']];
    solutions = [[startPoint['coord']]];
    directions = ['u', 'r', 'd', 'l'];
    while(solutions.length > 0){
        console.log(solutions);
        path = solutions.pop();
        for(i = 0; i < directions.length; i++){
            // Add new paths spreading in each viable direction
            new_path = path.slice();
            connected_cell = getConnectedCell(maze, path[path.length-1], directions[i]);
            if(connected_cell !== undefined){
                new_path.push(connected_cell);
                if(maze[connected_cell['x']][connected_cell['y']] === endPoint){
                    return (new_path);
                }
                if(maze[connected_cell['x']][connected_cell['y']]['visited']===false) {
                    solutions.push(new_path);
                    maze[connected_cell['x']][connected_cell['y']]['visited'] = true;
                }
            }
        }
    }
}

function saveShortestPaths(maze){
    // Computes the shortest path for every single cell
    for(i = 0; i < maze.size; i++){
        for(j = 0; j < maze.size; j++){
            cell = maze[i][j];
            cell['shortest_path'] = getShortestPath(maze, cell, maze.endPoint);
        }
    }
}

function renderMaze(canvas, context, maze){

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
    for(i = 0; i < maze.size; i++){
        for(j = 0; j < maze.size; j++){
            xOffset = canvas.width/maze.size;
            yOffset = canvas.height/maze.size;
            cellBorder = {'y1': j*yOffset, 'x1': i*xOffset, 'y2': j*yOffset+yOffset, 'x2': i*xOffset+xOffset};
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
    }
    context.strokeStyle = '#f00';
    context.lineWidth = 3;
    context.stroke();
}
