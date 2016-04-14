Polymer({
  is: 'uqlibrary-research-metrics',
  properties: {
    // are we pulling in the account user, or are we searching for a user
    isSearch: {
      observer: 'searchChanged'
    },
    user: {
      type: Object,
      notify: true,
      observer: 'userChanged'
    }
  },
  /**
   * If the outer container changes the user, load up the new
   * user with their stats
   */
  userChanged: function () {
    if (this.user.hasOwnProperty('id')) {
      this.$.api.get({username: this.user.id});
      this.$.apiStats.get({username: this.user.id});
    }
  },
  /**
   * Called when the search changes, just changes title
   */
  searchChanged: function () {
    this.metricsHeading = this.isSearch ? 'Metrics' : 'My Metrics';
  },
  setHindex: function (val) {
    this.hindex = val;
  },
  setStats: function (val) {
    this.stats = val;
  },
  /**
   * Callback for hindex api
   * @param e
   */
  hIndexLoaded: function (e) {
    this.setHindex(e.detail);
    this.hasHindexData = !this.isEmptyHindexResults();
  },
  academicStatsLoaded: function (e) {
    this.stats = {};
    if (e.detail && e.detail.stats) {
      this.setStats(e.detail.stats.stats_fields);
    }
    this.hasStatsData = !this.isEmptyStatsResults();
  },
  /**
   * Want to display zeros for nuill values
   * @param value
   * @returns {*}
   */
  zeroIfNone: function (value) {
    return (value == null) ? 0 : value;
  },
  /**
   * Jesus Kit....not even going to try
   *
   * @returns {boolean|*}
   */
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
  /**
   * Jesus Kit....not even going to try
   *
   * @returns {boolean|*}
   */
  isEmptyHindexResults: function () {
    return (
      !this.hindex.hasOwnProperty('hindex_incites')
      || this.hindex.hasOwnProperty('hindex_incites')
      && this.hindex.hindex_incites == 0)
      && (!this.hindex.hasOwnProperty('hindex_scopus')
      || this.hindex.hasOwnProperty('hindex_scopus')
      && this.hindex.hindex_scopus == 0);
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
