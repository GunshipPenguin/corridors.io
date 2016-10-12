# Corridors.io
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Generates a maze using a randomized depth first searc algorithm and turns it into a 3d maze using three.js. The user is placed in the upper left hand corner of the maze and must try to find his/her way to the bottom right hand corner of the maze, which is marked by a hole in the wall.

## Controls
* WASD / Arrow keys - Move
* Mouse - Adjust yaw / look

## Building

Ensure that you have npm installed and run: 

`npm install && npm run bundle`

This will bundle all the js and put it in `public_html/game.js`, after you have that file, just open `public_html/index.html` in a web browser.


## Style
This project uses the JS standard code style.

To run eslint, use:

`npm run lint`

## License
All code licensed under the MIT license (See LICENSE file). All images licensed under CC0 / Public domain.


## Todo
* Add more maze generators
* Add a page allowing the user to select a maze generator / maze size
* Document everything
* Add tests
