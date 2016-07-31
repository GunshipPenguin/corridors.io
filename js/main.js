// Constants
MAZESIZEX = 20 // X dimension of the generated maze (Number of cells)
MAZESIZEY = 20 // Y dimension of the generated maze (Number of cells)
CELLSIZE = 200 // Size of each cell
WALLWIDTH = 0.1 // 1 is whole cell, 0 is nothing
WALLHEIGHT = 1 // Relative to CELLSIZE

function newCell (cell) {
  // Add in right and bottom walls
  if (cell.wallRight) {
    if (cell.posX !== MAZESIZEX - 1 || cell.posY !== MAZESIZEY - 1) { // Leave an exit in the bottom right hand corner
      var wallGeometry = new THREE.BoxGeometry(WALLWIDTH * CELLSIZE, WALLHEIGHT * CELLSIZE, CELLSIZE)

      var wallMatrix = new THREE.Matrix4()
      wallMatrix.setPosition(new THREE.Vector3(cell.posX * CELLSIZE + CELLSIZE / 2, 0, cell.posY * CELLSIZE))
      wallGeometry.applyMatrix(wallMatrix)

      mazeGeometry.merge(wallGeometry)
    }
  }
  if (cell.wallBottom) {
    var wallGeometry = new THREE.BoxGeometry(CELLSIZE, WALLHEIGHT * CELLSIZE, WALLWIDTH * CELLSIZE)

    var wallMatrix = new THREE.Matrix4()
    wallMatrix.setPosition(new THREE.Vector3(cell.posX * CELLSIZE, 0, cell.posY * CELLSIZE + CELLSIZE / 2))
    wallGeometry.applyMatrix(wallMatrix)

    mazeGeometry.merge(wallGeometry)
  }

  // Add in top and left walls
  if (cell.posY === 0) { // Top wall
    var wallGeometry = new THREE.BoxGeometry(CELLSIZE, WALLHEIGHT * CELLSIZE, WALLWIDTH * CELLSIZE)

    var wallMatrix = new THREE.Matrix4()
    wallMatrix.setPosition(new THREE.Vector3(cell.posX * CELLSIZE, 0, cell.posY * CELLSIZE - CELLSIZE / 2))
    wallGeometry.applyMatrix(wallMatrix)

    mazeGeometry.merge(wallGeometry)
  }
  if (cell.posX === 0) { // Left wall
    var wallGeometry = new THREE.BoxGeometry(WALLWIDTH * CELLSIZE, WALLHEIGHT * CELLSIZE, CELLSIZE)

    var wallMatrix = new THREE.Matrix4()
    wallMatrix.setPosition(new THREE.Vector3(cell.posX * CELLSIZE - CELLSIZE / 2, 0, cell.posY * CELLSIZE))
    wallGeometry.applyMatrix(wallMatrix)

    mazeGeometry.merge(wallGeometry)
  }
  return
}

// Scene and camera
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000)
camera.position.set(0, 1, 0)

// Renderer
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Ambient Light
var light = new THREE.AmbientLight(0x676767)
scene.add(light)

// Floor
var geometry = new THREE.PlaneGeometry(MAZESIZEX * CELLSIZE, MAZESIZEY * CELLSIZE)
var gmap = THREE.ImageUtils.loadTexture('images/metal.jpg')
gmap.wrapS = THREE.RepeatWrapping
gmap.wrapT = THREE.RepeatWrapping
gmap.repeat.x = 70 / 20 * MAZESIZEX
gmap.repeat.y = 70 / 20 * MAZESIZEY
var material = new THREE.MeshLambertMaterial({map: gmap, side: THREE.DoubleSide})
var plane = new THREE.Mesh(geometry, material)
plane.rotation.set(1.57, 0, 0)
plane.position.set((CELLSIZE * MAZESIZEX) / 2 - CELLSIZE / 2, -CELLSIZE / 2, (CELLSIZE * MAZESIZEY) / 2 - CELLSIZE / 2)
scene.add(plane)

// Ceiling
var geometry = new THREE.PlaneGeometry(MAZESIZEX * CELLSIZE, MAZESIZEY * CELLSIZE)
var gmap = THREE.ImageUtils.loadTexture('images/rock.jpg')
gmap.wrapS = THREE.RepeatWrapping
gmap.wrapT = THREE.RepeatWrapping
gmap.repeat.x = 20 / 20 * MAZESIZEX
gmap.repeat.y = 20 / 20 * MAZESIZEY
var material = new THREE.MeshLambertMaterial({map: gmap, side: THREE.DoubleSide})
var plane = new THREE.Mesh(geometry, material)
plane.rotation.set(1.57, 0, 0)
plane.position.set((CELLSIZE * MAZESIZEX) / 2 - CELLSIZE / 2, CELLSIZE / 2, (CELLSIZE * MAZESIZEY) / 2 - CELLSIZE / 2)
scene.add(plane)

mazeGeometry = new THREE.Geometry()

// Create all cells
var maze = genMaze(MAZESIZEX, MAZESIZEY)
for (var y = 0; y < MAZESIZEY; y++) {
  for (var x = 0; x < MAZESIZEX; x++) {
    newCell(maze[y][x])
  }
}

// Maze wall material
var mazeMaterial = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('images/brick.jpg')})
mazeMesh = new THREE.Mesh(mazeGeometry, mazeMaterial)
scene.add(mazeMesh)

// Controls
var controls = new mazeControls(camera)
controls.collidableMesh = mazeMesh
scene.add(controls.getObject())

var render = function () {
  requestAnimationFrame(render)

  controls.update()

  renderer.render(scene, camera)
}

var onWindowResize = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)

render()