'use strict'
var _ = require('underscore')

/**
 * Given a maze, position to start at, and a visited set, apply a randomized
 * depth-first-search algorithm to the maze.
 *
 * @param {type} maze Maze to apply the random dfs algorithm to
 * @param {type} position Current position to consider
 * @param {type} visited Object containing visited maze cells
 */
var randomDfs = function (maze, position, visited) {
  visited = typeof visited !== undefined ? visited : {}

  visited[getPositionString(position)] = true

  var positions = _.shuffle(maze.getAdjacentPositionsTo(position))

  positions.forEach(function (nextPosition) {
    if (!visited[getPositionString(nextPosition)]) {
      maze.setWallBetween(position, nextPosition, false)
      randomDfs(maze, nextPosition, visited)
    }
  })
}

/**
 * Given a position, return a string representing it.
 *
 * @param {Position} position description
 * @return {String} A string representing position
 */
var getPositionString = function (position) {
  return position.x.toString() + ',' + position.y.toString()
}

module.exports = randomDfs
