'use strict'
var THREE = require('three')

// Mesh generation constants
var CELLSIZE = 200 // Size of each cell
var WALLWIDTH = 0.1 // 1 is whole cell, 0 is nothing
var WALLHEIGHT = 1 // Relative to CELLSIZE

var mazeRenderer = {}
mazeRenderer.getWallMesh = function (maze) {
  var wallGeometry = new THREE.Geometry()

  for (var y = 0; y < maze.getY(); y++) {
    for (var x = 0; x < maze.getX(); x++) {
      var currCell = maze.getCell(x, y)

      // Add right wall
      if (currCell.wallRight) {
        if (x !== maze.getX() - 1 || y !== maze.getY() - 1) { // Leave an exit in the bottom right hand corner
          wallGeometry.merge(getRightWallGeometry(x, y))
        }
      }
      // Add bottom wall
      if (currCell.wallBottom) {
        wallGeometry.merge(getBottomWallGeometry(x, y))
      }
      // Add top wall
      if (y === 0) {
        wallGeometry.merge(getTopWallGeometry(x, y))
      }
      // Add left wall
      if (x === 0) {
        wallGeometry.merge(getLeftWallGeometry(x, y))
      }
    }
  }

  var wallMaterial = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('images/brick.jpg')})
  return new THREE.Mesh(wallGeometry, wallMaterial)
}

mazeRenderer.getCeilingMesh = function (maze) {
  var geometry = new THREE.PlaneGeometry(maze.getX() * CELLSIZE, maze.getY() * CELLSIZE)
  var gmap = THREE.ImageUtils.loadTexture('images/rock.jpg')
  gmap.wrapS = THREE.RepeatWrapping
  gmap.wrapT = THREE.RepeatWrapping
  gmap.repeat.x = 20 / 20 * maze.getX()
  gmap.repeat.y = 20 / 20 * maze.getY()
  var material = new THREE.MeshLambertMaterial({map: gmap, side: THREE.DoubleSide})
  var plane = new THREE.Mesh(geometry, material)
  plane.rotation.set(1.57, 0, 0)
  plane.position.set((CELLSIZE * maze.getX()) / 2 - CELLSIZE / 2, CELLSIZE / 2, (CELLSIZE * maze.getY()) / 2 - CELLSIZE / 2)
  return plane
}

mazeRenderer.getFloorMesh = function (maze) {
  var geometry = new THREE.PlaneGeometry(maze.getX() * CELLSIZE, maze.getY() * CELLSIZE)
  var gmap = THREE.ImageUtils.loadTexture('images/metal.jpg')
  gmap.wrapS = THREE.RepeatWrapping
  gmap.wrapT = THREE.RepeatWrapping
  gmap.repeat.x = 70 / 20 * maze.getX()
  gmap.repeat.y = 70 / 20 * maze.getY()
  var material = new THREE.MeshLambertMaterial({map: gmap, side: THREE.DoubleSide})
  var plane = new THREE.Mesh(geometry, material)
  plane.rotation.set(1.57, 0, 0)
  plane.position.set((CELLSIZE * maze.getX()) / 2 - CELLSIZE / 2, -CELLSIZE / 2, (CELLSIZE * maze.getY()) / 2 - CELLSIZE / 2)
  return plane
}

function getRightWallGeometry (x, y) {
  var wallGeometry = new THREE.BoxGeometry(WALLWIDTH * CELLSIZE, WALLHEIGHT * CELLSIZE, CELLSIZE)
  var matrix = new THREE.Matrix4().setPosition(new THREE.Vector3(x * CELLSIZE + CELLSIZE / 2, 0, y * CELLSIZE))
  wallGeometry.applyMatrix(matrix)
  return wallGeometry
}

function getLeftWallGeometry (x, y) {
  var wallGeometry = new THREE.BoxGeometry(WALLWIDTH * CELLSIZE, WALLHEIGHT * CELLSIZE, CELLSIZE)
  var matrix = new THREE.Matrix4().setPosition(new THREE.Vector3(x * CELLSIZE - CELLSIZE / 2, 0, y * CELLSIZE))
  wallGeometry.applyMatrix(matrix)
  return wallGeometry
}

function getTopWallGeometry (x, y) {
  var wallGeometry = new THREE.BoxGeometry(CELLSIZE, WALLHEIGHT * CELLSIZE, WALLWIDTH * CELLSIZE)
  var matrix = new THREE.Matrix4().setPosition(new THREE.Vector3(x * CELLSIZE, 0, y * CELLSIZE - CELLSIZE / 2))
  wallGeometry.applyMatrix(matrix)
  return wallGeometry
}

function getBottomWallGeometry (x, y) {
  var wallGeometry = new THREE.BoxGeometry(CELLSIZE, WALLHEIGHT * CELLSIZE, WALLWIDTH * CELLSIZE)
  var matrix = new THREE.Matrix4().setPosition(new THREE.Vector3(x * CELLSIZE, 0, y * CELLSIZE + CELLSIZE / 2))
  wallGeometry.applyMatrix(matrix)
  return wallGeometry
}

module.exports = mazeRenderer
