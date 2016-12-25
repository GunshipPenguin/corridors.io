Maze = require('../js/maze.js')

describe("Maze", function () {
  var maze

  beforeEach(function() {
    maze = new Maze(5, 10)
  })

  it("creates a maze with the correct x and y sizes", function () {
    expect(maze).toBeDefined()
    expect(maze.getX()).toEqual(5)
    expect(maze.getY()).toEqual(10)
  });

  it("properly returns adjacent positions for a cell with 4 adjacent positions", function() {
    // (1, 1) should have adjacent positions to the top, bottom left and right
    position = {x: 1, y: 1}
    adjacentPositions = maze.getAdjacentPositionsTo(position)

    expect(adjacentPositions).toContain({x: 0, y: 1}) // Left
    expect(adjacentPositions).toContain({x: 2, y: 1}) // Right
    expect(adjacentPositions).toContain({x: 1, y: 0}) // Up
    expect(adjacentPositions).toContain({x: 1, y: 2}) // Down
  })

  it("properly returns adjacent positions for a cell with 3 adjacent positions", function() {
    // (0, 1) should have adjacent positions to the top, bottom and right
    position = {x: 0, y: 1}
    adjacentPositions = maze.getAdjacentPositionsTo(position)

    expect(adjacentPositions).toContain({x: 1, y: 1}) // Right
    expect(adjacentPositions).toContain({x: 0, y: 0}) // Up
    expect(adjacentPositions).toContain({x: 0, y: 2}) // Down
  })

  it("properly returns adjacent positions for a cell with 2 adjacent positions", function() {
    // (0, 0) should have adjacent positions to the right and bottom
    position = {x: 0, y: 0}
    adjacentPositions = maze.getAdjacentPositionsTo(position)

    expect(adjacentPositions).toContain({x: 1, y: 0}) // Right
    expect(adjacentPositions).toContain({x: 0, y: 1}) // Down
  })

  it("sets one wall at a single cell, not modifying the others", function() {
    position = {x: 1, y: 1}
    walls = {left: true}

    maze.setWalls(position, walls)

    expectedWalls = {left: true, right: false, bottom: false, top: false}

    expect(maze.getWalls(position)).toEqual(expectedWalls)
  })

  it("sets two walls at a single cell, not modifying the others", function() {
    position = {x: 1, y: 1}
    walls = {left: true, right: true}

    maze.setWalls(position, walls)

    expectedWalls = {left: true, right: true, bottom: false, top: false}

    expect(maze.getWalls(position)).toEqual(expectedWalls)
  })

  it("sets three walls at a single cell, not modifying the other", function() {
    position = {x: 1, y: 1}
    walls = {left: true, right: true, bottom: true}

    maze.setWalls(position, walls)

    expectedWalls = {left: true, right: true, bottom: true, top: false}

    expect(maze.getWalls(position)).toEqual(expectedWalls)
  })

  it("sets all four walls at a single cell", function() {
    maze.setAllWalls(true)

    position = {x: 1, y: 1}

    walls = {left: false, right: false, bottom: false, top: false}
    maze.setWalls(position, walls)
    returnedWalls = maze.getWalls(position)
    expect(returnedWalls).toEqual(walls)
  })

  it("sets the wall between two cells vertically top to bottom", function() {
    position1 = {x: 1, y: 1}
    position2 = {x: 1, y: 2}

    maze.setWallBetween(position1, position2, true)

    walls = maze.getWalls(position1)

    expect(walls.bottom).toEqual(true)
  })

  it("sets the wall between two cells vertically bottom to top", function() {
    position1 = {x: 1, y: 2}
    position2 = {x: 1, y: 1}

    maze.setWallBetween(position1, position2, true)

    walls = maze.getWalls(position1)

    expect(walls.top).toEqual(true)
  })

  it("sets the wall between two cells horizontally left to right", function() {
    position1 = {x: 1, y: 1}
    position2 = {x: 2, y: 1}

    maze.setWallBetween(position1, position2, true)

    walls = maze.getWalls(position1)

    expect(walls.right).toEqual(true)
  })

  it("sets the wall between two cells horizontally right to left", function() {
    position1 = {x: 2, y: 1}
    position2 = {x: 1, y: 1}

    maze.setWallBetween(position1, position2, true)

    walls = maze.getWalls(position1)

    expect(walls.left).toEqual(true)
  })
});
