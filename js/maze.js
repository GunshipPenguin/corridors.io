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

Maze.prototype.getX = function () {
  return _.first(this.grid).length
}

Maze.prototype.getY = function () {
  return this.grid.length
}

module.exports = Maze
