/**
 * By Jan-Willem Wisgerhof <j.wisgerhof@uq.edu.au>
 */
(function () {
  Polymer({
    is: 'uqlibrary-research-trending',
    properties: {
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
      isSearch: {
        type: Boolean,
        value: false,
        notify: true
      },
      publications: {
        type: Array,
        value: function () {
          return [];
        }
      },
      user: {
        type: Object,
        notify: true,
        observer: '_userChanged'
      }
    },
    created: function () {
    },
    ready: function () {
      var that = this;
      this.$.api.addEventListener('uqlibrary-api-academic-trending-publication', function (e) {
        that.setPublications(e.detail);
        that.hideNoResultsMessage = !that.isEmptyResults();
      });
    },
    setPublications: function(val) {
      this.publications = val;
      this.fire('uqlibrary-research-trending-loaded', val);
    },
    _userChanged: function () {
      if (this.user.hasOwnProperty('id')) {
        this.$.api.get({ 'username': this.user.id });
      }
    },
    zeroIfNone: function (value) {
      var _value = parseFloat(value).toFixed(0);
      if (_value == 0)
        return '';
      if (_value > 0)
        return '+' + _value;
      return _value;
    },
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
    formatAuthors: function (value) {
      return value.replace(/;/g, ', ');
    },
    isEmptyResults: function () {
      return !this.publications.hasOwnProperty('altmetric') && !this.publications.hasOwnProperty('thomson') && !this.publications.hasOwnProperty('scopus') || this.publications.hasOwnProperty('altmetric') && this.publications.altmetric.length == 0 && (this.publications.hasOwnProperty('thomson') && this.publications.thomson.length == 0) && (this.publications.hasOwnProperty('scopus') && this.publications.scopus.length == 0);
    },
    hostAttributes: {
      'layout': '',
      'center': ''
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