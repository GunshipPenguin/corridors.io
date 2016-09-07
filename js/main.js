'use strict'
var THREE = require('three')
var mazeGenerators = require('./maze-generators')
var MazeControls = require('./maze-controls')
var meshGenerator = require('./mesh-generator')

// Constants
var MAZESIZEX = 20 // X dimension of the generated maze (Number of cells)
var MAZESIZEY = 20 // Y dimension of the generated maze (Number of cells)

var render = function () {
  window.requestAnimationFrame(render)
  controls.update()
  renderer.render(scene, camera)
}

var onWindowResize = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

var scene = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000)
camera.position.set(0, 1, 0)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var maze = mazeGenerators.randomDfs(MAZESIZEX, MAZESIZEY)

var wallMesh = meshGenerator.getWallMesh(maze)
scene.add(wallMesh)

var ceilingMesh = meshGenerator.getCeilingMesh(maze)
scene.add(ceilingMesh)

var floorMesh = meshGenerator.getFloorMesh(maze)
scene.add(floorMesh)

scene.add(new THREE.AmbientLight(0x676767))

var controls = new MazeControls(camera)
controls.collidableMesh = wallMesh
scene.add(controls.getObject())

window.addEventListener('resize', onWindowResize, false)

render()
