'use strict'
var _ = require('underscore')
var Maze = require('./maze')

// Maze generator modules
var randomDfs = require('./maze_generators/random-dfs')

/**
 * Object containing functions that return generated mazes.
 */
var mazeGen = {}

/**
 * Return a maze generated using a ranommized depth-first-search algorithm.
 *
 * @param  {Number} sizeX X size of the maze to generate
 * @param  {Number} sizeY Y size of the maze to generate
 * @return {Maze} A new maze to
 */
mazeGen.randomDfs = function(sizeX, sizeY) {
  var maze = new Maze(sizeX, sizeY)
  maze.setAllWalls(true)

  var startPos = {x: _.random(sizeX - 1), y: _.random(sizeY - 1)}
  randomDfs(maze, startPos)

  return maze
}

module.exports = mazeGen
