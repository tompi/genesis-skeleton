angular
  .module('app', [
    'app.controllers',
    'app.directives',
    'app.templates'
  ])
  .config(['$locationProvider', '$routeProvider', function($location, $router) {
    $router
      .when('/', {
        redirectTo: '/home'
      })
      .when('/home', {
        templateUrl: 'app/partials/home.html'
      })
      .when('/guide', {
        controller: 'app.controllers.guide',
        templateUrl: 'app/partials/guide.html'
      })
      .otherwise({
        controller: 'app.controllers.error',
        templateUrl: 'app/partials/error/index.html'
      })
    ;
  }])
;

angular
  .module('app.controllers.error', [])
  .controller('app.controllers.error', [
    '$scope',
    '$location',
    function($scope, $location) {
      $scope.error  = $location.search().err || 404;
      $scope.url    = $location.url().replace(/(.*?).err=.*/, '$1');
    }
  ])
;

angular.module('app.controllers.guide', [])
  .controller('app.controllers.guide', [
    '$scope',
    function($scope) {
      var sections = [
        { id:       "requirements" }
      , { id:       "installation" }
      , { parent:   "installation", id: "download"  }
      , { parent:   "installation", id: "git"       }
      , { parent:   "installation", id: "upgrading" }
      ];

      $scope.toc = function(section) {
        var list  = [];
        var id    = section ? section.id : undefined;

        angular.forEach(sections, function(child) {
          if (child.parent === id) {
            list.push(child);
          }
        });

        return list;
      };

      var $parents = function($parent) {
        var list = [];

        // Ignore self-referencing parent
        $parent = $parent.$parent;

        // Traverse up until there are no more grandparents
        do {
          list.unshift($parent.section.id);

          $parent = $parent.$parent;
        } while($parent.section && $parent.$parent.section);

        return list;
      };

      $scope.id = function() {
        return $parents(this).join('-');
        // return this.section.id;
      };

      $scope.label = function() {
        var label = this.section.id;

        return label[0].toUpperCase() + label.slice(1);
      };

      $scope.template = function() {
        var ids = $parents(this);

        return 'app/partials/guide/' + ids.join('/') + '.html';
      };
    }
  ])
;

angular
  .module('app.controllers', [
    'app.controllers.error',
    'app.controllers.guide',
    'app.services.api'
  ])
  .run(['$rootScope', 'app.services.api', function($root, api) {
    $root.package = api.get({ entity: 'package' });
  }])
;

angular
  .module('app.directives', [
    '$strap.directives',
    'app.directives.issues'
  ])
;

angular
  .module('app.directives.issues', [
    'app.services.github'
  ])
  .directive('appIssues', ['app.services.github', function(github) {
    return {
      replace:    false,
      restrict:   'A',
      template:   '<span ng-transclude />&nbsp;<span class="badge" ng-bind="issues.data.length" />',
      transclude: true,
      link:       function($scope, $element, attrs, controller) {
        $scope.issues = github.query({ section: 'issues'});
      }
    };
  }])
;

angular
  .module('app.services.api', [
    'ngResource'
  ])
  .factory('app.services.api', [
    '$location',
    '$resource',
    function($location, $resource) {
      var api = $resource('/api/:entity');

      return api;
    }
  ])
;

angular
  .module('app.services.github', [
    'ngResource'
  ])
  .factory('app.services.github', ['$resource', function($resource) {

    var api = $resource('https://api.github.com/repos/:owner/:repo/:section', {
      owner:        'ericclemmons',
      repo:         'genesis-skeleton'
    }, {
      query: {
        method:     'JSONP',
        params:     {
          callback: 'JSON_CALLBACK',
          state:    'open'
        },
        isArray:    false
      }
    });

    return api;
  }])
;

angular
  .module('app.services', [
    'app.services.api',
    'app.services.githubApi'
  ])
;

angular.module("app.templates", []).run(["$templateCache", function($templateCache) {

  $templateCache.put("app/partials/error/404.html",
    "<h3><em>404</em> - This page could not be found</h3>" +
    "" +
    "<p>" +
    "  The URL <code>{{ url }}</code> could not be loaded." +
    "</p>" +
    ""
  );

  $templateCache.put("app/partials/error/500.html",
    "<h3><em>500</em> - This page encountered an error</h3>" +
    "" +
    "<p>" +
    "  The URL <code>{{ url }}</code> encountered an error and could not be loaded." +
    "</p>" +
    ""
  );

  $templateCache.put("app/partials/error/index.html",
    "<section id=\"error\">" +
    "  <div class=\"container-narrow\" ng-include src=\"'partials/error/' + error + '.html'\">" +
    "    <h3>Sorry, there was an error.</h3>" +
    "" +
    "    <p>" +
    "      Please go back and try your request again." +
    "    </p>" +
    "  </div>" +
    "</section>" +
    ""
  );

  $templateCache.put("app/partials/guide.html",
    "<section id=\"guide\">" +
    "  <div class=\"container-narrow\">" +
    "    <div class=\"row-fluid\">" +
    "      <div class=\"well well-small span3\">" +
    "" +
    "        <div ng-repeat=\"section in toc()\" ng-include=\"'app/partials/guide/toc.html'\"></div>" +
    "" +
    "      </div>" +
    "" +
    "      <div class=\"span9\">" +
    "" +
    "        <h2>Guide</h2>" +
    "" +
    "        <p>" +
    "          This guide will take you throw the logical steps of how to install" +
    "          Genesis Skeleton, the folder structure &amp; conventions, how to" +
    "          manage both client &amp; server-side dependencies, and more." +
    "        </p>" +
    "" +
    "        <section ng-repeat=\"section in toc()\" ng-include=\"'app/partials/guide/section.html'\"></section>" +
    "      </div>" +
    "" +
    "    </div>" +
    "  </div>" +
    "</section>"
  );

  $templateCache.put("app/partials/guide/installation.html",
    "<h3>Installation</h3>" +
    "" +
    "<p>" +
    "  Because this project is a Skeleton, it is meant to be the <em>beginning</em>" +
    "  of your app.  If you'd like to utlize it within an existing project, you should" +
    "  follow the <a href=\"#/guide#installation-upgrading\">Upgrading</a> instructions." +
    "</p>" +
    ""
  );

  $templateCache.put("app/partials/guide/installation/download.html",
    "<h4>Download <small>(Preferred)</small></h4>" +
    "" +
    "<p>" +
    "  <small>This method is preferred as it doesn't clutter your project's history with that of Genesis Skeleton.</small>" +
    "</p>" +
    "" +
    "<p>" +
    "  <a href=\"https://github.com/ericclemmons/genesis-skeleton/archive/master.zip\" class=\"btn btn-small\"><strong>Download</strong> (.zip)</a>" +
    "  the latest release, unzip it, &amp; rename the folder to match your own project's name, such as:" +
    "  <code>~/Sites/my-project</code>." +
    "</p>" +
    ""
  );

  $templateCache.put("app/partials/guide/installation/git.html",
    "<h4>Git</h4>" +
    "" +
    "<p>" +
    "  <small>If you intend to constantly stay up-to-date with this project, then this method may be best.</small>" +
    "</p>" +
    "" +
    "<p>" +
    "  Rather than using <code>git clone</code>, it is recommended to create a project" +
    "  on Github, follow their instructions, and already have a repository created &amp;" +
    "  cloned." +
    "" +
    "</p>" +
    "" +
    "<pre class=\"pre-scrollable\">" +
    "$ cd ~/Sites/my-project" +
    "<br>" +
    "$ git remote add genesis git://github.com/ericclemmons/genesis-skeleton.git" +
    "<br>" +
    "$ git fetch && git merge genesis/master" +
    "</pre>" +
    ""
  );

  $templateCache.put("app/partials/guide/installation/upgrading.html",
    "<h4>Upgrading</h4>" +
    "" +
    "<strong>TODO</strong>" +
    ""
  );

  $templateCache.put("app/partials/guide/requirements.html",
    "<h3>Requirements</h3>" +
    "" +
    "<ol>" +
    "  <li><a href=\"http://nodejs.org/\">NodeJS</a> with NPM.</li>" +
    "  <li><a href=\"http://gruntjs.com/\">GruntJS</a> <code>npm install -g grunt-cli</code>.</li>" +
    "  <li><a href=\"http://twitter.github.com/bower/\">Bower</a> <code>npm install -g bower</code>.</li>" +
    "</ol>" +
    "" +
    "<p>" +
    "  <small>GruntJS &amp; Bower both recommend being <strong>globally</strong> installed.</small>" +
    "</p>" +
    ""
  );

  $templateCache.put("app/partials/guide/section.html",
    "<div id=\"{{ id() }}\" ng-include=\"template()\"></div>" +
    "" +
    "<section ng-repeat=\"section in toc(section)\" ng-include=\"'app/partials/guide/section.html'\"></section>" +
    ""
  );

  $templateCache.put("app/partials/guide/toc.html",
    "<ul class=\"nav nav-list\">" +
    "  <li>" +
    "    <a ng-href=\"#/guide/#{{ id() }}\">{{ label() }}</a>" +
    "    <li ng-repeat=\"section in toc(section)\" ng-include=\"'app/partials/guide/toc.html'\" />" +
    "  </li>" +
    "</ul>"
  );

  $templateCache.put("app/partials/header.html",
    "<div class=\"container-narrow\">" +
    "  <div class=\"row-fluid\">" +
    "" +
    "    <div>" +
    "      <h2>Ruter7 open <em>2013</em>.</h2>" +
    "    </div>" +
    "" +
    "  </div>" +
    "</div>" +
    ""
  );

  $templateCache.put("app/partials/home.html",
    "<header ng-include=\"'app/partials/header.html'\"></header>" +
    "<section id=\"about\">" +
    "    <div class=\"container-narrow\" autoscroll>" +
    "        <h3>Velkommen til bridgefest!</h3>" +
    "        <p>Turneringen som samler eliten og nybegynnere i en fantastisk turnering." +
    "            I år utvider vi med turneringer også på søndag. Lørdagens stjernespillere" +
    "            samles i en lukket Kryssimpturnering, mens vi øvrige skal forsøke oss i" +
    "            en åpen handikapturnering.</p>" +
    "        <p>Lørdagens parturnering er for absolutt alle. Meld deg på som par akkurat" +
    "            som du pleier, men har du mindre enn 30 mesterpoeng kan du bli trukket" +
    "            ut til å spille med en av våre stjernespillere. Se under påmelding for" +
    "            detaljer.</p>" +
    "        <p>Etter den sosiale turneringen lørdag lover vi en minneverdig kveld!! Inger" +
    "            Lene Hangeland og hennes far Torbjørn disker opp med mat i gourmetklassen!!" +
    "            Lakserose, indrefilet av hjort og vaniljepanacotta er årets meny.</p>" +
    "        <p>Lørdag kveld kommer 2 av landsdelens aller beste musikere for å underholde." +
    "            Først ut er Transit og etterpå skal Sordal få bridgespillere</p>" +
    "    </div>" +
    "</section>" +
    ""
  );

  $templateCache.put("app/partials/nav.html",
    "<div class=\"navbar navbar-fixed-top navbar-inverse\" bs-navbar>" +
    "  <div class=\"navbar-inner\">" +
    "    <div class=\"container-narrow\">" +
    "      <ul class=\"nav\">" +
    "        <li data-match-route=\"/\"><a href=\"#/home\">Hjem</a></li>" +
    "        <li data-match-route=\"/program\"><a href=\"#/guide\">Program</a></li>" +
    "        <li data-match-route=\"/stjerner\"><a href=\"#/guide\">Stjerner</a></li>" +
    "        <li data-match-route=\"/paamelding\"><a href=\"#/guide\">Påmelding</a></li>" +
    "        <li data-match-route=\"/overnatting\"><a href=\"#/guide\">Overnatting</a></li>" +
    "        <li data-match-route=\"/kart\"><a href=\"#/guide\">Kart</a></li>" +
    "      </ul>" +
    "    </div>" +
    "  </div>" +
    "</div>" +
    ""
  );

}]);
