function getCell(){
    // Returns an empty cell, where false means a wall exists, true means
    // a path exists, and undefined means an outside edge exists.
    return {'u': false, 'r': false, 'd': false, 'l':false, 'visited': false, 'coord': {'row': undefined, 'col': undefined}};
}

function getGrid(size){
    // Returns a grid of size X size, filled with empty cells
    grid = [];
    grid.size = size;

    for(i = 0; i < size; i++){
        row = [];
        for(j = 0; j < size; j++){
            cell = getCell();
            cell['coord']['row'] = i;
            cell['coord']['col'] = j;
            row.push(cell)

        }
        grid.push(row);
    }

    // edge cases -- literally
    for(i = 0; i < size; i++){
        grid[i][0]['l'] = undefined;
        grid[0][i]['u'] = undefined;
        grid[i][size-1]['r'] = undefined;
        grid[size-1][i]['d'] = undefined;
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
    row = cell['coord']['row'];
    col = cell['coord']['col'];
    if(cell['u'] === false){
        walls.push({'wall': cell['u'], 'direction': 'u', 'coord': {'row': row, 'col': col}});
    }
    if(cell['r'] === false){
        walls.push({'wall': cell['r'], 'direction': 'r', 'coord': {'row': row, 'col': col}});
    }
    if(cell['d'] === false){
        walls.push({'wall': cell['d'], 'direction': 'd', 'coord': {'row': row, 'col': col}});
    }
    if(cell['l'] === false){
        walls.push({'wall': cell['l'], 'direction': 'l', 'coord': {'row': row, 'col': col}});
    }
    return walls
}

function getAdjacentCell(grid, wall){
    current_row = wall['coord']['row'];
    current_col = wall['coord']['col'];
    if(wall['direction'] === 'u'){
        return grid[current_row-1][current_col];
    }
    if(wall['direction'] === 'r'){
        return grid[current_row][current_col+1];
    }
    if(wall['direction'] === 'd'){
        return grid[current_row+1][current_col];
    }
    if(wall['direction'] === 'l'){
        return grid[current_row][current_col-1];
    }
}

function randomPrims(grid){
    current_row = getRandomNumber(grid.size);
    current_col = getRandomNumber(grid.size);
    current_cell = grid[current_row][current_col];
    current_cell['visited'] = true;
    walls = getCellWalls(current_cell);

    while(walls.length > 0){
        current_wall_index = getRandomNumber(walls.length);
        current_wall = walls[current_wall_index];
        current_row = current_wall['coord']['row'];
        current_col = current_wall['coord']['col'];
        current_cell = grid[current_row][current_col];
        current_adj_cell = getAdjacentCell(grid, current_wall);

        if(current_adj_cell['visited']===false){
            current_cell[current_wall['direction']] = true;
            current_adj_cell[getOppositeDirection(current_wall['direction'])] = true;
            current_adj_cell['visited'] = true;
            console.log(walls);
            walls = walls.concat(getCellWalls(current_adj_cell));
            console.log(walls);
            current_wall = true;
        }

        walls.splice(current_wall_index, 1);
    }

    return grid;
}

function getMaze(size){
    grid = getGrid(size);
    maze = randomPrims(grid);
    return maze;
}

//
// ~~~~ TEST CODE ~~~~
//

//
// function printMaze(maze){
//     maze_str = "";
//     for(i = 0; i < maze.size; i++){
//         for(j = 0; j < maze.size; j++){
//             if(maze[i][j]['d']===undefined || maze[i][j]['d']===false){
//                 maze_str += "_";
//             } else {
//                 maze_str += " ";
//             }
//             if(maze[i][j]['r']===undefined || maze[i][j]['r']===false){
//                 maze_str += "|";
//             } else {
//                 maze_str += " ";
//             }
//         }
//         maze_str += "\n";
//     }
//     console.log(maze_str);
// }
//
//
// // console.log("Making Maze of size 10x10...");
// grid = getGrid(10);
// printMaze(grid);
//
// maze = getMaze(10);
// printMaze(maze);