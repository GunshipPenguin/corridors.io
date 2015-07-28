function cell(posX, posY){
	this.posX = posX;
	this.posY = posY;
	
	this.walked = false;
	
	this.wallRight = true;
	this.wallBottom = true;
	
	//Return a list of all cells adjancent to this one where walked != false
	this.possibleCells = function(){
		var possibleCells = [];
		if(this.posX != 0 && grid[this.posY][this.posX-1].walked == false) { possibleCells.push(grid[this.posY][this.posX-1]); } //leftX
		if(this.posY != 0 && grid[this.posY-1][this.posX].walked == false) { possibleCells.push(grid[this.posY-1][this.posX]); } //topY
		if(this.posX != GRIDSIZEX-1 && grid[this.posY][this.posX+1].walked == false) { possibleCells.push(grid[this.posY][this.posX+1]); } //rightX
		if(this.posY != GRIDSIZEY-1 && grid[this.posY+1][this.posX].walked == false) { possibleCells.push(grid[this.posY+1][this.posX]); } //bottomY
		return possibleCells;
	}
	
	//Marks this cell as walked, chooses an adjancant cell, removes the appropriate wall, and returns that cell, if no cells are avaliable, return false
	this.chooseNextCell = function(){
		this.walked = true;
		
		possibilities = this.possibleCells();
		
		if(possibilities.length == 0){
			return false
		} else{
			var chosenCell = possibilities[Math.floor(Math.random() * possibilities.length)]
			
			//Remove appropriate wall
			if(chosenCell.posY == this.posY){
				if(chosenCell.posX<this.posX)
					chosenCell.wallRight = false;
				else
					this.wallRight = false;
			} else{
				if(chosenCell.posY<this.posY)
					chosenCell.wallBottom = false;
				else
					this.wallBottom = false;
			}
			return chosenCell;
		}
	}	
}

function backTrace(){
	for(var i=log.length-1;i>=0;i--){
		tempCell = log[i].chooseNextCell()
		if(tempCell){
			currCell = tempCell;
			log = log.slice(0, i+1);
			return true;
		}
	}
	return false;
}

function genMaze(sizeX, sizeY){
	GRIDSIZEX = sizeX; //X dimension of the maze
	GRIDSIZEY = sizeY; //Y dimension of the mase

	//Generate grid
	grid = [];
	for(var y=0;y<GRIDSIZEY;y++){
		grid.push([]);
		for(var x=0;x<GRIDSIZEX;x++){
			grid[y].push(new cell(x, y));
		}
	}

	log = [];
	startPoint = grid[Math.floor(Math.random() * GRIDSIZEY)][Math.floor(Math.random() * GRIDSIZEX)]
	currCell = startPoint;
	while(true){
		nextCell = currCell.chooseNextCell();
		if(nextCell){ //If nextCell exists, push currentCell on to the log and make currCell = nextCell
			log.push(currCell);
			currCell = nextCell;
		}else{ //If there is nowhere to go, backtrace until there is a way to continue
			if(! backTrace()){
				break;
			}
		}
	}
	return grid;
}
