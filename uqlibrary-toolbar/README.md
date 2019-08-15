# uqlibrary-toolbar

[![Codeship Status for uqlibrary/uqlibrary-toolbar](https://app.codeship.com/projects/64d70e20-e425-0133-076d-5e6dd4ce3e38/status?branch=polymer1.0)](https://app.codeship.com/projects/146247)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-toolbar.svg)](https://david-dm.org/uqlibrary/uqlibrary-toolbar)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-toolbar/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-toolbar?type=dev)

uqlibrary-toolbar displays a toolbar which takes an initialisation state, most fundamentally a title, but also including search and more actions display

Full documentation and demo can be found in [GitHub Pages](https://uqlibrary.github.io/uqlibrary-toolbar/uqlibrary-toolbar/).

## Events

| Event type                            | Event data             | Description                                                                                   |
| ------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| uqlibrary-toolbar-menu-clicked        | na                     | Hamburger menu on left is tapped                                                              |
| uqlibrary-toolbar-link-clicked        | item from appLinks     | Link in more menu on right clicked                                                            |
| uqlibrary-toolbar-search-submitted    | Submitted value        | The user has either pressed enter, clicked the search icon, or selected from the autocomplete |

### Getting Started

```sh
npm install -g bower web-component-tester polymer-cli
npm install
bower install
```

### Developing

* Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/).
* Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles)
* GitHub pages should be updated after every commit to `polymer1.0` branch by running `bin/generate-gh-pages.sh`
* A preview of the component can be viewed locally by running `npm start`. Use the second URL from the command output.

### Testing

Tests are run using the Web Component Tester. Either navigate to /tests/index.html in a browser or using the command line:

```sh
npm test
```
