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
		/**
		 * Show/hide main menu
		 * */
		togglePanel: function () {
			this.$.drawerPanel.togglePanel();
		},
		ready: function () {
			var that = this;
			this.set('$.toolbar.appTitle', this.appTitle);
			this.$.account.addEventListener('uqlibrary-api-account-loaded', function (e) {
				if (e.detail.hasSession) {
					if (e.detail.classes) {
						that.user = e.detail;
						that.$.trendingElement.user = that.user;
						that.$.trendingElement.isSearch = false;
						that.$.metricsElement.user = that.user;
						that.$.metricsElement.isSearch = false;
					}
				} else {
					// Not logged in
					that.$.account.login(window.location.href);
				}
			});
			if (this.autoload) {
				this.$.account.get();
			}
		},
		selectedTabChanged: function (newValue, oldValue) {
			if (oldValue && newValue) {
				this.$.ga.addEvent('Research tab changed', newValue);
			}
		},
		loadAutosuggest: function (event) {
			if (event.detail.value.length >= 2) {
				this.$.autorsSearchApi.get({ lookupName: event.detail.value });
			}
		},
		autosuggestLoaded: function (event) {
			var suggestions = [];
			if (event.detail.length > 0) {
				event.detail.forEach(function (item) {
					item.text = item.title + ' ' + item.given_name + ' ' + item.family_name + ' (' + item.username + ')';
					suggestions.push(item);
				});
				this.set('$.toolbar.suggestions', suggestions);
			}
		},
		performSearch: function (event) {
			this.$.toolbar.deactivateSearch();
			var userId = event.detail.searchTerm;
			if (event.detail.searchItem) {
				userId = event.detail.searchItem.username;
			}
			this.set('$.trendingElement.isSearch', true);
			this.set('$.trendingElement.user', { id: userId });
			this.set('$.metricsElement.isSearch', true);
			this.set('$.metricsElement.user', { id: userId });
		},
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
		trendingResearchLoaded: function (e) {
			if (this.$.trendingElement.isSearch) {
				if (e.detail && e.detail.author_details && e.detail.author_details.length > 0) {
					var author = e.detail.author_details[0];
					if (this.user.id == author.aut_org_username) {
						this.set('$.toolbar.appTitle', this.appTitle);
					} else {
						this.set('$.toolbar.appTitle', author.aut_title + ' ' + author.aut_fname + ' ' + author.aut_lname + '\'s Research');
					}
				} else if (this.$.toolbar.searchFieldValue) {
					this.set('$.toolbar.appTitle', 'No Results Found');
				} else {
					this.set('$.toolbar.appTitle', this.appTitle);
				}
			}
		},
		toggleMenuDrawer: function () {
			this.$.drawerPanel.togglePanel();
		},
		hostAttributes: {
			'layout': '',
			'center': ''
		}
	});

})();