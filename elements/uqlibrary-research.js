/**
 * By Jan-Willem Wisgerhof <j.wisgerhof@uq.edu.au>
 */
(function () {
  Polymer({
    is: 'uqlibrary-research',
    properties: {
      appTitle: {
        type: String,
        value: 'My Research'
      },
      // whether the account should autoload
      autoload: {
        type: Boolean,
        value: true,
        notify: true
      },
      // Accessibility issues fixes
      keyboardNavigationKeys: {
        type: String,
        value: 'space enter'
      },
      selectedTab: {
        type: Number,
        value: 0,
        observer: 'selectedTabChanged'
      },
      user: {
        type: Object,
        value: function () {
          return {};
        }
      }
    },
    ready: function () {
      this.set('$.toolbar.appTitle', this.appTitle);
      if (this.autoload) {
        this.$.account.get();
      }
    },
    /**
     * Callback for account loading event, get the classes from the user etc
     *
     * @param e
     */
    accountLoaded: function (e) {
      if (e.detail.hasSession) {
        if (e.detail.classes) {
          this.user = e.detail;
          this.$.trendingElement.user = this.user;
          this.$.trendingElement.isSearch = false;
          this.$.metricsElement.user = this.user;
          this.$.metricsElement.isSearch = false;
        }
      }
      else {
        // Not logged in
        this.$.account.login(window.location.href);
      }
    },
    /**
     * Called when tab changed, fires analytics event
     *
     * @param newValue
     * @param oldValue
     */
    selectedTabChanged: function (newValue, oldValue) {
      if (oldValue && newValue) {
        this.$.ga.addEvent('Research tab changed', newValue);
      }
    },
    /**
     * Callback from autosuggest, looks up authors name
     *
     * @param event
     */
    loadAutosuggest: function (event) {
      if (event.detail.value.length >= 2) {
        this.$.authorsSearchApi.get({lookupName: event.detail.value});
      }
    },
    /**
     * Handles receiving the above event, and formatting the authors to add to the autocomplete
     * dropdown
     *
     * @param event
     */
    autosuggestLoaded: function (event) {
      var suggestions = [];
      if (event.detail.length > 0) {
        event.detail.forEach(function (item) {
          item.name = item.title + ' ' + item.given_name + ' ' + item.family_name + ' (' + item.username + ')';
          item.recent = false;
          suggestions.push(item);
        });
        this.set('$.toolbar.suggestions', suggestions);
      }
    },
    /**
     * Search in the toolbar has been activated, do something
     *
     * @param event
     */
    performSearch: function (event) {
      if (event.detail.hasOwnProperty('searchTerm') && event.detail.searchTerm) {
        this.$.toolbar.deactivateSearch();
        var userId = event.detail.searchTerm;
        if (event.detail.searchTerm.username) {
          userId = event.detail.searchTerm.username;
        }
        this.set('$.trendingElement.isSearch', true);
        this.set('$.trendingElement.user', {id: userId});
        this.set('$.metricsElement.isSearch', true);
        this.set('$.metricsElement.user', {id: userId});
      }
    },
    /**
     * Something has been clicked
     *
     * @param e
     */
    appLinkClicked: function (e) {
      if (e.detail === '#ClearSearch') {
        this.$.toolbar.clearSearchForm();
        this.set('$.toolbar.appTitle', this.appTitle);
        this.set('$.trendingElement.isSearch', false);
        this.set('$.trendingElement.user', this.user);
        this.set('$.metricsElement.isSearch', false);
        this.set('$.metricsElement.user', this.user);
      }
    },
    /**
     * Callback for trending
     *
     * @param e
     */
    trendingResearchLoaded: function (e) {
      if (this.$.trendingElement.isSearch) {
        if (e.detail && e.detail.author_details && e.detail.author_details.length > 0) {
          var author = e.detail.author_details[0];
          if (this.user.id == author.aut_org_username) {
            this.set('$.toolbar.appTitle', this.appTitle);
          }
          else {
            this.set('$.toolbar.appTitle',
              author.aut_title + ' ' + author.aut_fname + ' ' + author.aut_lname + '\'s Research');
          }
        }
        else if (this.$.toolbar.searchFieldValue) {
          this.set('$.toolbar.appTitle', 'No Results Found');
        }
        else {
          this.set('$.toolbar.appTitle', this.appTitle);
        }
      }
    },
    /**
     * Show/hide main menu
     * */
    toggleMenuDrawer: function () {
      this.fire('uqlibrary-toggle-drawer');
    }
  });

})();