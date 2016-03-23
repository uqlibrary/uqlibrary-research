Polymer({
  is: 'uqlibrary-research-metrics',
  properties: {
    isSearch: {
      observer: 'searchChanged'
    },
    user: {
      type: Object,
      notify: true,
      observer: 'userChanged'
    }
  },
  created: function () {
  },
  userChanged: function (_, newValue) {
    console.log('userChanged ' + JSON.stringify(newValue));
    if (this.user.hasOwnProperty('id')) {
      this.$.api.get({username: this.user.id});
      this.$.apiStats.get({username: this.user.id});
    }
  },
  searchChanged: function (_, newValue) {
    this.metricsHeading = this.isSearch ? 'Metrics' : 'My Metrics';
  },
  setHindex: function (val) {
    this.hindex = val;
  },
  setStats: function (val) {
    this.stats = val;
  },
  ready: function () {
    var that = this;
    this.$.api.addEventListener('uqlibrary-api-academic-hindex-loaded', function (e) {
      that.setHindex(e.detail);
      that.hasHindexData = !that.isEmptyHindexResults();
    });
    this.$.apiStats.addEventListener('uqlibrary-api-academic-stats-loaded', function (e) {
      that.stats = {};
      if (e.detail && e.detail.stats)
        that.setStats(e.detail.stats.stats_fields);
      that.hasStatsData = !that.isEmptyStatsResults();
    });
  },
  zeroIfNone: function (value) {
    if (value == null) {
      return 0;
    }
    else {
      return value;
    }
  },
  isEmptyStatsResults: function () {
    return (
      !this.stats.hasOwnProperty('id')
      || this.stats.hasOwnProperty('id')
      && this.stats.id.count == 0)
      && (
        !this.stats.hasOwnProperty('thomson_citation_count_i')
        || this.stats.hasOwnProperty('thomson_citation_count_i')
        && (
          this.stats.thomson_citation_count_i == null
          || this.stats.thomson_citation_count_i.count == 0
          && this.stats.thomson_citation_count_i.sum == 0
        )
      ) && (
        !this.stats.hasOwnProperty('scopus_citation_count_i')
        || this.stats.hasOwnProperty('scopus_citation_count_i')
        && (
          this.stats.scopus_citation_count_i == null
          || this.stats.scopus_citation_count_i.count == 0
          && this.stats.scopus_citation_count_i.sum == 0
        )
      );
  },
  isEmptyHindexResults: function () {
    return (
      !this.hindex.hasOwnProperty('hindex_incites')
      || this.hindex.hasOwnProperty('hindex_incites')
      && this.hindex.hindex_incites == 0)
      && (!this.hindex.hasOwnProperty('hindex_scopus')
      || this.hindex.hasOwnProperty('hindex_scopus')
      && this.hindex.hindex_scopus == 0);
  },
  hostAttributes: {
    'layout': '',
    'center': ''
  },
  _computeHidden: function (hasHindexData, hasStatsData) {
    return hasHindexData || hasStatsData;
  },
  _computeHidden2: function (hasHindexData, hasStatsData) {
    return !hasHindexData && !hasStatsData;
  },
  _computeHref: function (user) {
    return 'https://espace.library.uq.edu.au/' + user.id;
  }
});
