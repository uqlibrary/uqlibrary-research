# uqlibrary-research

[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-research.svg)](https://david-dm.org/uqlibrary/uqlibrary-research)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-research/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-research?type=dev)

uqlibrary-research displays various academic data to the end user

Full documentation can be found in [GitHub Pages](http://uqlibrary.github.io/uqlibrary-research/uqlibrary-research/).
Demo is [here](http://uqlibrary.github.io/uqlibrary-research/uqlibrary-research/demo/).

## Getting Started

```sh
npm install -g bower gulp-cli web-component-tester
npm install
bower install
```

### Running with live data locally

Add `dev-app.library.uq.edu.au` to your `/etc/hosts` or equivalent file.

```sh
gulp live
```

This comments out the calls to create the Mock cookies in index.html.  Note the browser often caches the html so check the source for the calls and do a hard refresh if they aren't commented out.

If you still have the mock cookies in your browser, delete them via your browser.

If you don't have data, you can search for other users via the search function.

## Developing

* Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/).
* Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles).
* GitHub pages should be updated after every commit to `polymer1.0` branch by running `bin/generate-gh-pages.sh`

## Testing

Tests are run using the Web Component Tester.

```sh
npm test
```
