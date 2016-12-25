'use strict'
var _ = require('underscore')

/**
 * @typedef {Object} Cell Internal representation of a cell in a Maze (has only right and bottom wall)
 * @property {Boolean} wallRight If the Cell has a right wall
 * @property {Boolean} wallBottom If the Cell has a  bottom wall
 */

/**
 * @typedef {Object} Walls Object representing the walls of the cell in a maze
 * @property {Boolean} top If the top wall exists
 * @property {Boolean} bottom If the bottom wall exists
 * @property {Boolean} right If the right wall exists
 * @property {Boolean} left If the left wall exists
 */

/**
 * @typedef {Object} Position Object representing the gposition of a cell in a Maze
 * @property {Number} x The X position of the cell
 * @property {Number} y The Y position of the cell
 */

/**
 * Creates a new Maze with the specified size. A Maze object represents an
 * entire maze as a grid of cells, each cell having a top, bottom left and right
 * wall. Each cell has an x and a y coordinate, with the (0, 0) coordinate being
 * the upper left hand corner of the maze. Internally, each cell is stored with
 * only a right and bottom wall, as to avoid walls overlapping, however the
 * external methods allow the setting of walls in all four cardinal directions,
 * converting supplied data to the 2 wall internal representation.
 *
 * @constructor
 * @param {Number} sizeX X dimension of the maze
 * @param {Number} sizeY Y dimension of the maze
 */
var Maze = function (sizeX, sizeY) {
  // 2D array to store all cells
  this._grid = []

  for (var y = 0; y < sizeY; y++) {
    this._grid.push([])
    for (var x = 0; x < sizeX; x++) {
      this._grid[y].push({wallRight: false, wallBottom: false})
    }
  }
}

/**
 * Sets all the walls in this maze to the specified state (true =  up, false =
 * down).
 *
 * @param  {type} wallState State to set walls to
 */
Maze.prototype.setAllWalls = function(wallState) {
  for (var y = 0; y < this.getY(); y++) {
    for (var x = 0; x < this.getX(); x++) {
      this._grid[y][x] = {wallRight: wallState, wallBottom: wallState}
    }
  }
}

/**
 * Returns an array of positions representing all valid adjacent possible
 * positions (ie. Not outside of the maze) to the left, right, top and bottom
 * of the specified position.
 *
 * @param  {Position} position Position to get positions around
 * @return {Array} Array of positions adjacent to position
 */
Maze.prototype.getAdjacentPositionsTo = function (position) {
  var possiblePositions = []

  var sizeX = this.getX()
  var sizeY = this.getY()

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
  return possiblePositions
}

/**
 * Set the state of the wall cell at position1 and position2.
 *
 * @param {Position} position1 Wall between this position and position2 will be modified
 * @param {Position} position2 Wall between this position and position1 will be modified
 * @param {Boolean} wallState State to set wall to (true = set, false = not set)
 */
Maze.prototype.setWallBetween = function (position1, position2, wallState) {
  if (position1.y === position2.y) {
    if (position1.x > position2.x) { // position1 to right of position2
      this.setWalls(position1, {left: wallState})
    } else { // position1 to left of position1
      this.setWalls(position1, {right: wallState})
    }
  } else {
    if (position1.y > position2.y) { // position1 below position2
      this.setWalls(position1, {top: wallState})
    } else { // position1 above position2
      this.setWalls(position1, {bottom: wallState})
    }
  }
}

/**
 * Sets the walls at the specified position in the maze. walls is a Walls object
 * describing whether the top, bottom, left and right walls exist. Any walls
 * not specified in walls will remain the same as they originally were.
 *
 * @param {Position} position Position of cell whose walls are to be modified
 * @param {Walls} walls Walls object representing walls to set
 */
Maze.prototype.setWalls = function (position, walls) {
  // Create the new walls object to work with
  var newWalls = _.extend(this.getWalls(position), walls)

  // Right and bottom
  this._getCell(position.x, position.y).wallBottom = newWalls.bottom
  this._getCell(position.x, position.y).wallRight = newWalls.right

  if (position.y > 0) { // Top
    this._getCell(position.x, position.y-1).wallBottom = newWalls.top
  }
  if (position.x > 0) { // Left
    this._getCell(position.x-1, position.y).wallRight = newWalls.left
  }
}

/**
 * Returns an Object representing the walls of the cell at position (x, y).
 *
 * @param {Position} position Position of the cell to get walls of
 * @return {Walls}
 */
Maze.prototype.getWalls = function (position) {
  var walls = {}

  walls.right = this._grid[position.y][position.x].wallRight
  walls.bottom = this._grid[position.y][position.x].wallBottom
  walls.top = position.y > 0 ? this._grid[position.y-1][position.x].wallBottom : true
  walls.left = position.x > 0 ? this._grid[position.y][position.x-1].wallRight : true

  return walls
}

/**
 * Return a reference to the internal Cell object at position x and y.
 *
 * @param {Number} x X position of the Cell to retrieve
 * @param {Number} y Y position of the Cell to retrieve
 * @return {Cell} The cell at position (x, y) in the maze
 */
Maze.prototype._getCell = function (x, y) {
  return this._grid[y][x]
}

/**
 * Get the X dimension of the maze.
 *
 * @return {Number} X dimension of the maze
 */
Maze.prototype.getX = function () {
  return _.first(this._grid).length
}

/**
 * Get the Y dimension of the maze
 *
 * @return {Number} Y dimension of the maze
 */
Maze.prototype.getY = function () {
  return this._grid.length
}

module.exports = Maze
