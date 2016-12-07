# Corridors.io
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![license](https://img.shields.io/github/license/gunshippenguin/corridors.io.svg)]()
[![Website](https://img.shields.io/website-up-down-green-red/https/corridors.io.svg?maxAge=2592000)](https://corridors.io)

Generates a maze using a randomized depth first search algorithm and turns it into a 3d maze using three.js. The user is placed in the upper left hand corner of the maze and must try to find his/her way to the bottom right hand corner of the maze, which is marked by a hole in the wall.

## Controls
* WASD / Arrow keys - Move
* Mouse - Adjust yaw / look

## Building

Ensure that you have npm installed and run:

`npm install`

Then run:

`npm run build-dev`

This will bundle all the js and put it in `public_html/game.js`. After you have game.js, just open `public_html/index.html` in a web browser.

To bundle all the js and minify it, run:

`npm run build-release`

## Documentation

This project uses [JSDoc](http://usejsdoc.org/).

To generate HTML from JSDoc comments, use:

`npm run doc`

This will output all documentation in the `doc` directory.

## Style
This project uses the [JS standard code style](http://standardjs.com).

To run eslint, use:

`npm run lint`

## License
All code licensed under the MIT license (See LICENSE file). All images licensed under CC0 / Public domain.


## Todo
* Add more maze generators
* Add a page allowing the user to select a maze generator / maze size
* Document everything
* Add tests
