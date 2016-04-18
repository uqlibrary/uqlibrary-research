# uqlibrary-research

uqlibrary-research displays various academic data to the end user

Example of full documentation can be found at [GitHub Pages](http://uqlibrary.github.io/uqlibrary-research).

### Getting Started
```
npm install && bower install
```

### Running with live data locally
Add dev-app.library.uq.edu.au to your /etc/hosts or equivalent file

Comment out the cookies which control mock data in demo.html (or create a new file)

```
gulp serve
```

If you still have the mock cookies in your browser, delete them via your browser.

Use the Masquerading function at app.library.uq.edu.au/v1/home to masquerade as a user with data you are interested in


### Developing
- Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/). 
- Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles).
- GitHub pages should be updated after every commit to Master by running the "generate-gh-pages.sh" in the /bin/ directory

### Testing
Tests are run using the Web Component Tester. Either navigate to /tests/index.html in a browser or using the command line:
```
wct --local all
```