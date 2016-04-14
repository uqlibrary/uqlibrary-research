/**
 * By Jan-Willem Wisgerhof <j.wisgerhof@uq.edu.au>
 */
(function () {
  Polymer({
    is: 'uqlibrary-research-trending',
    properties: {
      // use these to display different sections of page
      cards: {
        type: Array,
        value: function () {
          return [
            {
              'type': 'altmetric',
              'title': 'Altmetric Score'
            },
            {
              'type': 'thomson',
              'title': 'Web of Science Citation Count'
            },
            {
              'type': 'scopus',
              'title': 'Scopus Citation Count'
            }
          ];
        }
      },
      // are we pulling in the account user, or are we searching for a user
      isSearch: {
        type: Boolean,
        value: false,
        notify: true
      },
      // list of the currently viewed users publications
      publications: {
        type: Array,
        value: [],
      },
      user: {
        type: Object,
        notify: true,
        observer: '_userChanged'
      }
    },
    /**
     * Call back for when pubs are loaded from the API
     *
     * @param e
     */
    trendingPublicationsLoaded: function (e) {
      this.setPublications(e.detail);
      this.hideNoResultsMessage = !this.isEmptyResults();
    },
    /**
     * Add the pubs to the new value, fire loaded event
     *
     * @param val
     */
    setPublications: function(val) {
      this.publications = val;
      this.fire('uqlibrary-research-trending-loaded', val);
    },
    /**
     * User changed callback, means we probably need to load up
     * a new user
     *
     * @private
     */
    _userChanged: function () {
      if (this.user.hasOwnProperty('id')) {
        this.$.api.get({ 'username': this.user.id });
      }
    },
    /**
     * If we get null values, we want to display zeroes
     *
     * @param value
     * @returns {*}
     */
    zeroIfNone: function (value) {
      var _value = parseFloat(value).toFixed(0);
      if (_value == 0)
        return '';
      if (_value > 0)
        return '+' + _value;
      return _value;
    },
    /**
     * Formats the difference in the given trending statistic
     *
     * If the passed in value is positive, adds a + sign and returns value
     * otherwise returns nothing
     *
     * @param value
     * @returns {*}
     */
    differenceFormat: function (value) {
      var _value = parseFloat(value).toFixed(0);
      if (_value == 0)
        return '';
      if (_value > 0)
        return '+' + _value;
      return _value;
    },
    showYear: function (value) {
      var date = moment(value);
      if (date.isValid()) {
        return date.format('YYYY');
      }
      return value;
    },
    /**
     * Makes authors display nicer
     *
     * @param value
     * @returns {*}
     */
    formatAuthors: function (value) {
      return value.replace(/;/g, ', ');
    },
    /**
     * Kit!!
     *
     * @returns {boolean|*}
     */
    isEmptyResults: function () {
      return !this.publications.hasOwnProperty('altmetric') && !this.publications.hasOwnProperty('thomson') && !this.publications.hasOwnProperty('scopus') || this.publications.hasOwnProperty('altmetric') && this.publications.altmetric.length == 0 && (this.publications.hasOwnProperty('thomson') && this.publications.thomson.length == 0) && (this.publications.hasOwnProperty('scopus') && this.publications.scopus.length == 0);
    },
    _computeHidden: function (card, publications) {
      return !publications[card['type']] || publications[card['type']].length == 0;
    },
    _computeItems: function (card, publications) {
      return publications[card['type']];
    },
    _computeHref: function (pub) {
      return 'https://espace.library.uq.edu.au/view/' + pub.rek_pid;
    },
    _computeHidden2: function (pub) {
      return pub.difference == 0;
    },
    _computeHidden3: function (card, index, publications) {
      return index == publications[card['type']].length - 1;
    }
  });
})();