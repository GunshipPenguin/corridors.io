'use strict'

var controlsUtils = {}

/**
 * Attempts to obtain a pointer lock on the specified element. Returns true
 * if a pointer lock was obtained false otherwise.
 *
 * @param {Element} element Element to request a pointer lock on
 * @return {Boolean} true of a pointer lock was obtained, false otherwise
 */
controlsUtils.obtainPointerLock = function (element) {
  var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document

  if (havePointerLock) {
    element.requestPointerLock = element.requestPointerLock ||
      element.mozRequestPointerLock ||
      element.webkitRequestPointerLock

    element.requestPointerLock()
  }
  return havePointerLock
}

/**
 * Sets a pointerlockchange event listener.
 *
 * @param  {Function} pointerLockChange The listener to set
 */
controlsUtils.setPointerLockChange = function (listener) {
  document.addEventListener('pointerlockchange', listener, false)
  document.addEventListener('mozpointerlockchange', listener, false)
  document.addEventListener('webkitpointerlockchange', listener, false)
}

/**
 * Sets a pointerlockerror event listener.
 *
 * @param  {type} listener The listener to set
 */
controlsUtils.setPointerLockError = function (pointerLockError) {
  document.addEventListener('pointerlockerror', pointerLockError, false)
  document.addEventListener('mozpointerlockerror', pointerLockError, false)
  document.addEventListener('webkitpointerlockerror', pointerLockError, false)
}

/**
 * Returns true if there is currently a pointerlock on the specified element,
 * false otherwise.
 *
 * @param  {Element} element The element to check for a pointerlock on
 * @return {Boolean} true if there is a pointerlock on element, false otherwise
 */
controlsUtils.hasPointerLock = function (element) {
  return document.pointerLockElement === element ||
    document.mozPointerLockElement === element ||
    document.webkitPointerLockElement === element
}

module.exports = controlsUtils
