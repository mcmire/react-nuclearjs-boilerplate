# react-nuclearjs-boilerplate

A boilerplate for setting up a React + NuclearJS project.

## Features

* The frontend is a [React] + [NuclearJS] app. All files are written in
  ES2015, transpiled using [Webpack] + [Babel].
* The backend is an Express server; its main purpose is to serve endpoints that
  the frontend needs to access data from the database. In development mode, the
  server contains a middleware that builds the frontend using Webpack. In
  production mode, it assumes that Webpack has bundled the app and serves the
  built files (located in `build/`).
* This project is set up to minimize the amount of times you need to restart the
  server or even the page you're working on. The tools involved that make this
  possible are [webpack-hot-middleware], [react-transform-hmr] and Webpack's
  [hot module replacement] capabilities. This isn't perfect but here's what
  we've got so far:
    * When a React component is updated, the page will instantly hot-swap the
      new code into the page and re-render that component using the newly
      updated version.
    * When any other frontend file is updated, the page will reload itself. (You
      could reasonably hot-swap the file depending on what it is but it requires
      manually tapping into Webpack's HMR feature.)
    * When the routes file is updated on the backend, the server will re-require
      it without a need for the server to be restarted. Currently, this means
      that the page has to be reloaded manually. There's a upcoming change
      to webpack-hot-middleware that will improve this process, so when that
      happens, I'll update this.
* The backend is configured to connect to a Postgres database using [Knex].
* A test harness is in place using [Karma] + [Jasmine] to test React components
  and other parts of the frontend.
* If you're using an editor that can run ESLint automatically when you save a
  file, such as Vim with Syntastic, `.eslintrc` files are available at various
  levels to make this possible.

## Developing

* This project comes with a script to install dependencies and initialize the
  database. So the very first thing you want to do after cloning this repo is to
  run `bin/setup`.
* To run the app server and test server, run `npm run start`.
* To view the app in a browser, go to <http://localhost:3000>.
* To view the tests in a browser, go to <http://localhost:9876/debug.html>.
* To create a production build of the app, run `npm run build`.
* If you need to add or remove routes that the backend is serving, you can do so
  by modifying `backend/routes.js`.
* `.env` contains environment variables that the app needs to run in both
  development and production mode (specifically on Heroku).
* Database settings are kept in `knexfile.js`.
* There are two Webpack configuration files, one for development
  (`webpack.development.config.js`) and another for production
  (`webpack.production.config.js`).
* App servers and development scripts are located in `resources/`.

## Inspiration

This boilerplate was hand-rolled from these sources:

* <https://github.com/glenjamin/ultimate-hot-reloading-example>
* <https://github.com/jlongster/backend-with-webpack>
* <https://github.com/christianalfoni/webpack-express-boilerplate>

[React]: http://facebook.github.io/react
[NuclearJS]: https://optimizely.github.io/nuclear-js/
[Webpack]: http://webpack.github.io/
[Babel]: https://babeljs.io/
[webpack-hot-middleware]: https://github.com/glenjamin/webpack-hot-middleware
[react-transform-hmr]: https://github.com/gaearon/react-transform-hmr
[hot module replacement]: http://webpack.github.io/docs/hot-module-replacement-with-webpack.html
[Knex]: http://knexjs.org/
[Karma]: https://karma-runner.github.io
[Jasmine]: http://jasmine.github.io/
