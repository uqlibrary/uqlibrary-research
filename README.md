# uqlibrary-research

uqlibrary-research displays various academic data to the end user

Example of full documentation can be found at [GitHub Pages](http://uqlibrary.github.io/uqlibrary-research).

### Getting Started
```
npm install && bower install
```

### Running locally
Add dev-app.library.uq.edu.au to your /etc/hosts or equivalent file

```
gulp serve
```

### Developing
- Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/). 
- Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles).
- GitHub pages should be updated after every commit to Master by running the "generate-gh-pages.sh" in the /bin/ directory

### Testing
Tests are run using the Web Component Tester. Either navigate to /tests/index.html in a browser or using the command line:
```
wct --local all
```