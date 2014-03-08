var BASE = "https://api.github.com"
var EMBER_REPO = "/emberjs/ember.js"
var REPO = BASE + "/repos" + EMBER_REPO
var COLLABS = REPO + "/collaborators"
var COMMIT = REPO + "/commits"
var SEARCH = BASE + "/search/repositories?q="

App = Ember.Application.create();

App.Router.map(function() {
  this.route("collaborators");
  this.route("last_commit")
});

App.CollaboratorsRoute = Ember.Route.extend({
	model: function() {
		return [];
	},
 	setupController: function(controller, model) {
    $.get(COLLABS, function(data) {
     controller.set('model', data);
    })
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.LastCommitRoute = Ember.Route.extend({
  model: function() {
     return App.LastCommit.find("ba");
  }
});

App.LastCommit = Ember.Object.extend({
  sha: "Loading...",
  repo: null,
  load: function(query) {
    _this = this ;
  $.get(SEARCH + query).then(function(data) {
      _this.set('repo', data.items[0].full_name)
      return _this.repo;
    }).then(function(repo_name) {
      repo_url = BASE + "/repos/" + repo_name + "/commits"
      return $.get(repo_url)
    }).then(function(commits) {
      _this.setProperties(commits[0]);
    })
  }
});

App.LastCommit.reopenClass({
  find: function(query) {
    var last_commit = App.LastCommit.create();
    last_commit.load(query);
    return last_commit;
  }
})

LastCommitController = Ember.ObjectController.extend({});

