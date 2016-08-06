'use strict'
var _ = require('underscore')

var Cell = function () {
  this.wallRight = true
  this.wallBottom = true
}

var Maze = function (sizeX, sizeY) {
  var self = this
  this.grid = []

  for (var y = 0; y < sizeY; y++) {
    this.grid.push([])
    for (var x = 0; x < sizeX; x++) {
      this.grid[y].push(new Cell())
    }
  }

  this.getCell = function (x, y) {
    return self.grid[y][x]
  }
}

var mazeGen = {}

mazeGen.randomDfs = function (sizeX, sizeY) {
  var maze = new Maze(sizeX, sizeY)
  var log = []

  var backTrack = function () {
    var index = _.findLastIndex(log, function (position) {
      return getRandomAdjacentPosition(position) !== null
    })
    
    index = index === -1 ? 0 : index + 1;
    log = log.slice(0, index)
  }

  var getRandomAdjacentPosition = function (position) {
    var possiblePositions = []
    if (position.y !== 0) {
      possiblePositions.push({x: position.x, y: position.y - 1}) // Up
    }
    if (position.y !== sizeY - 1) {
      possiblePositions.push({x: position.x, y: position.y + 1}) // Down
    }
    if (position.x !== 0) {
      possiblePositions.push({x: position.x - 1, y: position.y}) // Left
    }
    if (position.x !== sizeX - 1) {
      possiblePositions.push({x: position.x + 1, y: position.y}) // Right
    }

    possiblePositions = possiblePositions.filter(function (position) {
      return ! maze.getCell(position.x, position.y).walked
    })
    return possiblePositions.length === 0 ? null : possiblePositions[_.random(possiblePositions.length - 1)]
  }

  var addNextCell = function () {
    // Get next position
    var nextPosition = getRandomAdjacentPosition(_.last(log))
    if (!nextPosition) {
      return false
    }

    // Remove appropriate wall
    var lastPosition = _.last(log)
    if (nextPosition.y === lastPosition.y) {
      if (nextPosition.x < lastPosition.x) {
        maze.getCell(nextPosition.x, nextPosition.y).wallRight = false
      } else {
        maze.getCell(lastPosition.x, lastPosition.y).wallRight = false
      }
    } else {
      if (nextPosition.y < lastPosition.y) {
        maze.getCell(nextPosition.x, nextPosition.y).wallBottom = false
      } else {
        maze.getCell(lastPosition.x, lastPosition.y).wallBottom = false
      }
    }
    
    // Append position to log
    log.push(nextPosition)
    maze.getCell(nextPosition.x, nextPosition.y).walked = true
    
    return true
  }

  var start = {x: _.random(sizeX - 1), y: _.random(sizeY - 1)}
  console.log(start)
  maze.getCell(start.x, start.y).walked = true
  log.push(start)
  while (log.length > 0) {
    if (!addNextCell()) {
      backTrack()
    }
  }
  return maze
}

module.exports = mazeGen
