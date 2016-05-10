/**
 * By Jan-Willem Wisgerhof <j.wisgerhof@uq.edu.au>
 */
(function () {
  Polymer({
    is: 'uqlibrary-research',
    properties: {
      /**
       * Whether to show the hamburger menu
       */
      standAlone: {
        type: Object,
        value: true
      },

      headerTitle: {
        type: String,
        value: 'My research'
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
      this.set('$.toolbar.headerTitle', this.headerTitle);
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
          this.set('user', e.detail);
          this.set('$.trendingElement.user', this.user);
          this.set('$.metricsElement.isSearch', false);
          this.set('$.metricsElement.user', this.user);
          this.set('$.trendingElement.isSearch', false);
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
          item.text = item.title + ' ' + item.given_name + ' ' + item.family_name + ' (' + item.username + ')';
          item.recent = false;
          suggestions.push(item);
        });
        this.$.toolbar.suggestions = suggestions;

        // this.set('$.toolbar.suggestions', suggestions);
      }
    },
    /**
     * Search in the toolbar has been activated, do something
     *
     * @param event
     */
    performSearch: function (event) {
      if (typeof(event.detail.searchItem) !== 'undefined') {

        var userId = event.detail.searchItem;

        if (event.detail.searchItem.username) {
          userId = event.detail.searchItem.username;
        }

        this.set('$.trendingElement.isSearch', true);
        this.set('$.trendingElement.user', {id: userId});
        this.set('$.metricsElement.isSearch', true);
        this.set('$.metricsElement.user', {id: userId});

        this.$.toolbar.searchTerm = '';
        this.$.toolbar.appLinks = [ { label: 'Clear search', action: 'clear' } ];
      }
    },
    /**
     * Something has been clicked
     *
     * @param e
     */
    appLinkClicked: function (e) {

      if (e.detail.action === 'clear') {
        this.$.toolbar.appLinks = [];

        this.set('$.toolbar.headerTitle', this.headerTitle);
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
            this.set('$.toolbar.headerTitle', this.headerTitle);
          }
          else {
            this.set('$.toolbar.headerTitle',
              author.aut_title + ' ' + author.aut_fname + ' ' + author.aut_lname + '\'s research');
          }
        }
        else if (this.$.toolbar.searchFieldValue) {
          this.set('$.toolbar.headerTitle', 'No Results Found');
        }
        else {
          this.set('$.toolbar.headerTitle', this.headerTitle);
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