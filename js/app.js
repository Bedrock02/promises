var BASE = "https://api.github.com"
var EMBER_REPO = "/emberjs/ember.js"
var REPO = BASE + "/repos" + EMBER_REPO
var COLLABS = REPO + "/collaborators"
var COMMIT = REPO + "/commits"
var SEARCH = BASE + "/search/repositories?q=ember"

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
  model: function() {return {}},
  setupController: function(controller, model) {
    //search git
    $.get(SEARCH).then(function(data) {
      return data.items[0].full_name
    }).then(function(repo_name) {
      repo_url = BASE + "/repos/" + repo_name + "/commits"
      return $.get(repo_url)
    }).then(function(commits) {
      controller.set('model', commits[0])
    })

  },
  actions: {
    submit: function() {alert('hi')
    return false}
  }
});

LastCommitController = Ember.ObjectController.extend({});

