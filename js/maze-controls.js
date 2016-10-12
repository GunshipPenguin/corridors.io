'use strict'
var THREE = require('three')
var DEFAULT_MOVE_SPEED = 50
var DEFAULT_SLOW_DOWN_SPEED = 5

var MazeControls = function (camera) {
  var moveSpeed = DEFAULT_MOVE_SPEED
  this.setMoveSpeed = function (newMoveSpeed) {
    moveSpeed = newMoveSpeed
  }

  var slowDownSpeed = DEFAULT_SLOW_DOWN_SPEED
  this.setSlowDownSpeed = function (newSlowDownSpeed) {
    slowDownSpeed = newSlowDownSpeed
  }

	// Mesh that controls cannot pass through
  var collidableMesh = null
  this.setCollidableMesh = function (newCollidableMesh) {
    collidableMesh = newCollidableMesh
  }

  // Object representing current movement
  var movement = {
    forward: false,
    backward: false,
    left: false,
    right: false
  }
  var velocity = new THREE.Vector3()

  var prevTime = window.performance.now()

  var yawObject = new THREE.Object3D()
  yawObject.add(camera)
  this.getObject = function () {
    return yawObject
  }

  var obtainPointerLock = function (event) {
    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document
    if (havePointerLock) {
      var element = document.body
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock
      element.requestPointerLock()

      var pointerLockChange = function () {
        if (document.pointerLockElement === document.body || document.mozPointerLockElement === document.body || document.webkitPointerLockElement === document.body) {
          // Pointer was locked, hook mousemove events
          document.addEventListener('mousemove', onMouseMove, false)
        } else {
          // Pointer was unlocked, unhook mousemove events
          document.removeEventListener('mousemove', onMouseMove, false)
        }
      }

      var pointerLockError = function (event) {
        window.alert('There was an error with pointerlock')
      }

      // Hook pointer lock state change events
      document.addEventListener('pointerlockchange', pointerLockChange, false)
      document.addEventListener('mozpointerlockchange', pointerLockChange, false)
      document.addEventListener('webkitpointerlockchange', pointerLockChange, false)

      // Hook pointer lock error events
      document.addEventListener('pointerlockerror', pointerLockError, false)
      document.addEventListener('mozpointerlockerror', pointerLockError, false)
      document.addEventListener('webkitpointerlockerror', pointerLockError, false)
    } else {
      window.alert('Your browser does not seem to support the pointerlock API')
    }
  }

  document.addEventListener('click', obtainPointerLock, false)

  var onMouseMove = function (event) {
    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0

    yawObject.rotation.y -= movementX * 0.003
  }

  var onKeyDown = function (event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        movement.forward = true
        break

      case 37: // left
      case 65: // a
        movement.left = true
        break

      case 40: // down
      case 83: // s
        movement.backward = true
        break

      case 39: // right
      case 68: // d
        movement.right = true
        break
    }
  }

  var onKeyUp = function (event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        movement.forward = false
        break

      case 37: // left
      case 65: // a
        movement.left = false
        break

      case 40: // down
      case 83: // s
        movement.backward = false
        break

      case 39: // right
      case 68: // d
        movement.right = false
        break
    }
  }

  document.addEventListener('keydown', onKeyDown, false)
  document.addEventListener('keyup', onKeyUp, false)

  this.checkCollision = function (movementVector) {
    if (collidableMesh) {
      var ray = new THREE.Raycaster(yawObject.position, movementVector.clone().normalize(), 0, movementVector.length() * 3)
      var collisions = ray.intersectObject(collidableMesh)
      return (collisions.length > 0 && collisions[0].distance < movementVector.length())
    } else {
      return false
    }
  }

  this.update = function () {
    var time = window.performance.now()
    var delta = (time - prevTime) / 1000

    velocity.x -= velocity.x * slowDownSpeed * delta
    velocity.z -= velocity.z * slowDownSpeed * delta

    if (movement.forward) {
      velocity.z -= moveSpeed * delta
    }
    if (movement.backward) {
      velocity.z += moveSpeed * delta
    }
    if (movement.left) {
      velocity.x -= moveSpeed * delta
    }
    if (movement.right) {
      velocity.x += moveSpeed * delta
    }

    var deltaVec = velocity.clone()
    deltaVec.applyEuler(yawObject.rotation)
    deltaVec.multiplyScalar(delta)

    if (!this.checkCollision(deltaVec)) {
      yawObject.translateZ(velocity.z * delta)
      yawObject.translateX(velocity.x * delta)
    }
    prevTime = time
  }
}

module.exports = MazeControls
