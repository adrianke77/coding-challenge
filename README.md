# React Miniproject

This is a small project using React Hooks, and a tiny Express/Node server with local filesystem for backend.

It is intended as a basic example of coding style and ability.

## Available Scripts

In the project directory, you can run:

### `npm i`

Installs required Node modules from NPM for application, required for other scripts below.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run server`

Starts Express server with local filehosting for videos.

### `npm test`

Launches frontend test runner in the interactive watch mode.

### `npm run servertest`

Runs backend tests.

## Notes

CSS approach follows a modified BEM (Block-Element-Modifier) style. Classes are named using <page-name>-<element>--<modifier> sequence.

Pros of this approach include completely avoiding hierachial CSS issues (such as in SASS inheritance), very specific targeting of elements, and easy global search of relevant CSS classes.

Cons of this approach include long CSS class names and requiring multiple class names in many element declarations in JSX or HTML.
