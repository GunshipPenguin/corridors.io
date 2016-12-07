'use strict'
var _ = require('underscore')

/**
 * Represents a cell in a maze. Each cell has a bottom and a right wall.
 * @typedef Cell
 * @type {Object}
 * @property {Boolean} wallRight If the right wall is present
 * @property {Boolean} wallBottom If the bottom wall is present
 */

/**
 * Construct a new Cell with its bottom and right wall up.
 *
 * @constructor
 */
var Cell = function () {
  this.wallRight = true
  this.wallBottom = true
}

/**
 * Represents a Maze
 * @typedef Maze
 * @type {Object}
 */

/**
 * Creates a new Maze with the specified size and fill it with cells all of
 * which have their right and bottom wall up.
 *
 * @constructor
 * @param {Number} sizeX X dimension of the maze
 * @param {Number} sizeY Y dimension of the maze
 */
var Maze = function (sizeX, sizeY) {
  this.grid = []

  for (var y = 0; y < sizeY; y++) {
    this.grid.push([])
    for (var x = 0; x < sizeX; x++) {
      this.grid[y].push(new Cell())
    }
  }
}

/**
 * Gets the Cell object representing the cell at the specified x and y
 * position of the maze.
 *
 * @param {Number} x X position of the Cell to retrieve
 * @param {Number} y Y position of the Cell to retrieve
 * @return {Cell} The cell at position (x, y) in the maze
 */
Maze.prototype.getCell = function (x, y) {
  return this.grid[y][x]
}

/**
 * Get the X dimension of this maze.
 *
 * @return {Number} X dimension of the maze
 */
Maze.prototype.getX = function () {
  return _.first(this.grid).length
}

/**
 * Get the Y dimension of this maze
 *
 * @return {Number} Y dimension of the maze
 */
Maze.prototype.getY = function () {
  return this.grid.length
}

module.exports = Maze
