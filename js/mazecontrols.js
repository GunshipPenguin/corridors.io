var mazeControls = function (camera) {
  this.moveSpeed = 4000
  this.slowDownSpeed = 10

  this.collidableMesh = null

  // Internals
  var moveForward = false
  var moveBackward = false
  var moveLeft = false
  var moveRight = false
  var velocity = new THREE.Vector3()

  var prevTime = performance.now()

  var yawObject = new THREE.Object3D()
  yawObject.add(camera)

  document.addEventListener('click', function (event) {
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
        alert('There was an error with pointerlock')
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
      alert('Your browser does not seem to support the pointerlock API')
    }
  }, false)

  var onMouseMove = function (event) {
    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0

    yawObject.rotation.y -= movementX * 0.003
  }

  var onKeyDown = function (event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = true
        break

      case 37: // left
      case 65: // a
        moveLeft = true
        break

      case 40: // down
      case 83: // s
        moveBackward = true
        break

      case 39: // right
      case 68: // d
        moveRight = true
        break
    }
  }

  var onKeyUp = function (event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = false
        break

      case 37: // left
      case 65: // a
        moveLeft = false
        break

      case 40: // down
      case 83: // s
        moveBackward = false
        break

      case 39: // right
      case 68: // d
        moveRight = false
        break
    }
  }

  document.addEventListener('keydown', onKeyDown, false)
  document.addEventListener('keyup', onKeyUp, false)

  this.getObject = function () {
    return yawObject
  }

  this.checkCollision = function (movementVector) {
    if (this.collidableMesh) {
      var ray = new THREE.Raycaster(yawObject.position, movementVector.clone().normalize(), 0, movementVector.length() * 3)
      var collisions = ray.intersectObject(this.collidableMesh)
      return (collisions.length > 0 && collisions[0].distance < movementVector.length())
    } else {
      return false
    }
  }

  this.update = function () {
    var time = performance.now()
    var delta = (time - prevTime) / 1000

    velocity.x -= velocity.x * this.slowDownSpeed * delta
    velocity.z -= velocity.z * this.slowDownSpeed * delta

    if (moveForward) {
      velocity.z -= this.moveSpeed * delta
    }
    if (moveBackward) {
      velocity.z += this.moveSpeed * delta
    }
    if (moveLeft) {
      velocity.x -= this.moveSpeed * delta
    }
    if (moveRight) {
      velocity.x += this.moveSpeed * delta
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
