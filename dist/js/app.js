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
      .when('/home', { templateUrl: 'app/partials/home.html'  })
      .when('/program', { templateUrl: 'app/partials/program.html'  })
      .when('/spillested', { templateUrl: 'app/partials/spillested.html'  })
      .when('/stjerner', { controller: 'app.controllers.stjernerCtrl', templateUrl: 'app/partials/stjerner.html'  })
      .when('/paamelding', {templateUrl: 'app/partials/paamelding.html'  })
      .when('/tidligere', {templateUrl: 'app/partials/tidligere.html'  })
      .when('/underholdning', {templateUrl: 'app/partials/underholdning.html'  })
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
    'app.controllers.stjernerCtrl',
    'app.services.api'
  ])
  .run(['$rootScope', 'app.services.api', function($root, api) {
    $root.package = api.get({ entity: 'package' });
  }])
;

angular.module('app.controllers').controller('stjernerCtrl', ['$scope', function stjernerCtrl($scope) {
    $scope.stjerner = ['Kalle', 'Falle'];
}]);

angular.module('app.controllers.stjernerCtrl', []).controller('app.controllers.stjernerCtrl', ['$scope',

function($scope) {
    $scope.stjerner = [
    {
        "name": "Trond Hantveit",
        "club": "TopBridge BC",
        "image": "http://askerbk.org/var/ezwebin_site/storage/images/kretser/nbf-buskerud/klubber/asker-bk/nyheter/bridgefaglige-kvelder-med-trond-hantveit./1914906-4-nor-NO/Bridgefaglige-kvelder-med-Trond-Hantveit..jpg"
    }, {
        "name": "Karl Olav Nybø Hansen",
        "club": "Lyngdal BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/karl%20olav.jpg"
    }, {
        "name": "Tom Anders Høiland",
        "club": "Kristiansands BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/tom%20h%C3%B8iland.jpg"
    }, {
        "name": "Randi Nyheim",
        "club": "Nøtterøy BK",
        "image": "/img/stjerner/randinyheim.jpg"
    }, {
        "name": "Roy Olsen",
        "club": "Kristiansands BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/roy%20olsen.jpg"
    }, {
        "name": "Odin S. Svendsen",
        "club": "bliBest.bridge",
        "image": "http://www.kristiansandbk.org/Bilder%20spillere/odin.gif"
    }, {
        "name": "Helge Stornes",
        "club": "Kristiansands BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/stornes.jpg"
    }, {
        "name": "Geir Brekka",
        "club": "Kristiansands BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/kaninen%20i%20KM%20lag.jpg"
    }, {
        "name": "Karl Christian Baumann",
        "club": "Kristiansands BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/baumann.jpg"
    }, {
        "name": "Frank Erik Svindahl",
        "club": "Kristiansands BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/svinet.jpg"
    }, {
        "name": "Øystein Jensen",
        "club": "Kristiansands BK",
        "image": "http://www.kristiansandbk.org/Bilder%20spillere/o%20jensen.jpg"
    }, {
        "name": "Per Elvin Pedersen",
        "club": "Arendals BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/perelvin.jpg"
    }, {
        "name": "Jan Arild Olsen",
        "club": "Arendals BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/jan%20arild.jpg"
    }, {
        "name": "Tore Olsen",
        "club": "Fløde BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/tore%20olsen.jpg"
    }, {
        "name": "Petter H. Lindqvist",
        "club": "Arendals BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/Petter%20lindqvist.jpg"
    }, {
        "name": "Espen Lindqvist",
        "club": "Arendals BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/espen.jpg"
    }, {
        "name": "Stig Henning Dybdahl",
        "club": "Ringebu/Fåvang BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/kunstneren.jpg"
    }, {
        "name": "Geir Larsen",
        "club": "Stavanger BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/Geir%20Larsen.jpg"
    }, {
        "name": "Martin Reinertsen",
        "club": "Farsund BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/reinertsen.jpg"
    }, {
        "name": "Atle Grefstad",
        "club": "BK Gann",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/boots.jpg"
    }, {
        "name": "Jon Solli Hansen",
        "club": "Kristiansands BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/hurralegen.jpg"
    }, {
        "name": "Nils  Kvangraven",
        "club": "Kristiansands BK",
        "image": "http://www.mrbridge.no/var/ezwebin_site/storage/images/kretser/nbf-moere-og-romsdal/nyheter/flott-bulletin-fraa-km-par/1917175-1-nor-NO/Flott-bulletin-fraa-KM-par.jpg"
    }, {
        "name": "David Ueland",
        "club": "Nærbø BK",
        "image": "http://open2012.ruter7.com/file/page/stjernespillere/david.jpg"
    }, {
        "name": "Ståle Frøyland",
        "club": "Statoil BK",
        "image": "/img/stjerner/staale.jpg"
    }];
}]);

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
    "        <div class=\"row-fluid\">" +
    "            <div class=\"span7\">" +
    "                <h3>Hotell Caledonien 1. og 2. Juni</h3>" +
    "                <p>Vi samler eliten og nybegynnere i en fantastisk hyggelig turnering i Kristiansand." +
    "                    I år spiller vi på" +
    "                    <a href=\"http://www.radissonblu.no/hotel-kristiansand\">hotell Caledonien</a>.</p>" +
    "                <h3>Program</h3>" +
    "                <p>" +
    "                    <b>Fredag 31. mai</b>" +
    "                    <ul>" +
    "                        <li>" +
    "                            <b>18.00-02:00</b> Bridgepub på vinkjelleren, hotel caledonien. Vi har hele" +
    "                            kjelleren for oss selv</li>" +
    "                    </ul>" +
    "                    <b>Lørdag 1. juni</b>" +
    "                    <ul>" +
    "                        <li>" +
    "                            <b>10:00-18:00</b> Hovedturnering. 500 per spiller, inkludert kaffe og lunch." +
    "                        </li>" +
    "                        <li>" +
    "                            <b>13:30-14:30</b> Caledoniens berømte lunsjbuffet.</li>" +
    "                        <li>" +
    "                            <b>19:30-02:00</b> 3-retters gallamiddag og så konsert med Stein Roger Sordal" +
    "                            og co. 500 per person.</li>" +
    "                    </ul>" +
    "                    <b>Søndag 2. juni</b>" +
    "                    <ul>" +
    "                        <li>" +
    "                            <b>10:00-16:00</b> Åpen gruppe. 200 per spiller, inkludert kaffe og te." +
    "                        </li>" +
    "                        <li>" +
    "                            <b>10:00-16:00</b> Eliteturnering. 300 per spiller, inkludert kaffe og te." +
    "                        </li>" +
    "                    </ul>" +
    "                </p>" +
    "                <p><a href=\"#/paamelding\">Trykk her</a> for mer info og melde deg på.</p>" +
    "            </div>" +
    "            <div class=\"span5\">" +
    "                <div class=\"sponsor\">" +
    "                    <a href=\"http://www.personalsjefen.org\" alt=\"Personalsjefen\">" +
    "                    <img src=\"/img/small/personalsjefen.png\" alt=\"Sponsor\" />" +
    "                    </a>" +
    "                </div>" +
    "                <div class=\"smallpic\">" +
    "                    <img src=\"/img/small/knuste-helgemo.png\" alt=\"Knuste Helgemo\" />" +
    "                </div>" +
    "                <div class=\"smallpic\">" +
    "                    <img src=\"/img/small/hotellfasade-small.png\" alt=\"Spille-hotellet\" />" +
    "                </div>" +
    "                <div class=\"smallpic ruter7logo\">" +
    "                    <a href=\"http://www.ruter7.com\" alt=\"Ruter7\">" +
    "                    <img src=\"/img/ruter7logo.png\" alt=\"Ruter7\" />" +
    "                    </a>" +
    "                </div>" +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</section>" +
    ""
  );

  $templateCache.put("app/partials/nav.html",
    "<div class=\"navbar navbar-fixed-top navbar-inverse\" bs-navbar>" +
    "  <div class=\"navbar-inner\">" +
    "      <ul class=\"nav\">" +
    "        <li data-match-route=\"/\"><a href=\"#/home\">Hjem</a></li>" +
    "        <li data-match-route=\"/spillested\"><a href=\"#/spillested\">Spillested/overnatting</a></li>" +
    "        <li data-match-route=\"/stjerner\"><a href=\"#/stjerner\">Stjerner</a></li>" +
    "        <li data-match-route=\"/paamelding\"><a href=\"#/paamelding\">Påmelding</a></li>" +
    "        <li data-match-route=\"/underholdning\"><a href=\"#/underholdning\">Underholdning</a></li>" +
    "        <li data-match-route=\"/tidligere\"><a href=\"#/tidligere\">Tidligere år</a></li>" +
    "      </ul>" +
    "  </div>" +
    "</div>" +
    ""
  );

  $templateCache.put("app/partials/paamelding.html",
    "<section id=\"about\">" +
    "    <div class=\"container-narrow\" autoscroll>" +
    "        <div class=\"row-fluid\">" +
    "            <div class=\"span7\">" +
    "                <h3>Påmelding</h3>" +
    "                <p>Husk at du må logge på bridge.no før du får muligheten til å melde deg" +
    "                    på turneringene.</p>" +
    "                <p>Lørdagens parturnering er for absolutt alle. Meld deg på som par akkurat" +
    "                    som du pleier, men har du mindre enn 30 mesterpoeng kan du bli trukket" +
    "                    ut til å spille med en av våre stjernespillere.</p>" +
    "                <p>" +
    "                " +
    "                    <b>Lørdag 1. juni</b>" +
    "                    <ul>" +
    "                        <li>" +
    "                            <b>10:00-18:00</b> Hovedturnering. 500 per spiller, inkludert kaffe og lunch." +
    "                            <ul>" +
    "                                <li>" +
    "                                    <a href=\"http://bridge.no/ruter/turneringsinfo/1/439\" class=\"paamelding\">" +
    "                                    <i class=\"icon-star\"></i> Meld på til hovedturnering med trukket stjernemakker" +
    "                                </a> (Du må ha mindre enn 30 mesterpoeng)" +
    "                                </li>" +
    "                                <li>" +
    "                                    <a href=\"http://bridge.no/ruter/turneringsinfo/1/438\" class=\"paamelding\">" +
    "                                    <i class=\"icon-star\"></i> Meld på til hovedturnering med egen makker" +
    "                                </a>" +
    "                                </li>" +
    "                            </ul>" +
    "                        </li>" +
    "                        <li>" +
    "                            <b>19:30-02:00</b> 3-retters gallamiddag og så konsert med Stein Roger Sordal" +
    "                            og co. 500 per person." +
    "                                <ul><li><a href=\"mailto:rune@ruter7.com\" class=\"paamelding\"><i class=\"icon-star\"></i> Mail Rune og si fra at du kommer</a></li></ul>" +
    "                            </li>" +
    "                    </ul>" +
    "                    <b>Søndag 2. juni</b>" +
    "                    <ul>" +
    "                        <li>" +
    "                            <b>10:00-16:00</b> Åpen gruppe. 200 per spiller, inkludert kaffe og te." +
    "                            <ul>" +
    "                                <li>" +
    "                                    <a href=\"http://bridge.no/ruter/turneringsinfo/1/440\" class=\"paamelding\"><i class=\"icon-star\"></i> Meld på til åpen pulje søndag</a>" +
    "                                </li>" +
    "                            </ul>" +
    "                        </li>" +
    "                        <li>" +
    "                            <b>10:00-16:00</b> Eliteturnering. 300 per spiller, inkludert kaffe og te. Denne er for stjernespillerne fra lørdagen." +
    "                            <ul>" +
    "                                <li>" +
    "                                    <a href=\"http://bridge.no/ruter/turneringsinfo/1/441\" class=\"paamelding\">" +
    "                                    <i class=\"icon-star\"></i> Meld på til eliteturneringen" +
    "                                </a>" +
    "                                </li>" +
    "                            </ul>" +
    "                        </li>" +
    "                    </ul>" +
    "                </p>" +
    "            </div>" +
    "            <div class=\"span5\">" +
    "                <div class=\"sponsor\">" +
    "                    <a href=\"http://www.personalsjefen.org\" alt=\"Personalsjefen\">" +
    "                    <img src=\"/img/small/personalsjefen.png\" alt=\"Sponsor\" />" +
    "                    </a>" +
    "                </div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/nina.png\" alt=\"Nina og Geir\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/sordal.png\" alt=\"Sordal\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/yngste.png\" alt=\"Yngstemann\" /></div>" +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</section>" +
    ""
  );

  $templateCache.put("app/partials/spillested.html",
    "<div class=\"container-narrow\">" +
    "  <div class=\"row-fluid\">" +
    "    <div>" +
    "      <h3>Velkommen til hotell Caledonien.</h3>" +
    "    </div>" +
    "  </div>" +
    "</div>" +
    "<section id=\"about\">" +
    "    <div class=\"container-narrow\" autoscroll>" +
    "        <div class=\"row-fluid\">" +
    "            <div class=\"span7\">" +
    "                <p>" +
    "                  Priser pr. rom pr. natt, inkludert frokost og mva:" +
    "                  <ul>" +
    "                      <li>Enkeltrom: <b>945,-</b></li>" +
    "                      <li>Dobbeltrom: <b>945,-</b></li>" +
    "                  </ul>" +
    "                  Bruk denne lenken for å bestille: <a href=\"http://www.radissonblu.no/booking-entrance?language=no&countrycode=NO&cityid=Kristiansand&paccode=Ruter7\">rabatterte rom.</a>" +
    "                    ( Husk å skrive inn riktig dato i høyre felt)" +
    "                </p>" +
    "            </div>" +
    "            <div class=\"span5\">" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell1.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell2.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell3.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell4.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell5.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell6.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell7.jpg\" alt=\"hotell\" /></div>" +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</section>" +
    ""
  );

  $templateCache.put("app/partials/stjerner.html",
    "<div class=\"container-narrow\">" +
    "  <div class=\"row-fluid\">" +
    "    <div>" +
    "      <h3>1. gruppe stjernespillere:</h3>" +
    "    </div>" +
    "    <ul class=\"stjerner\">" +
    "        <li ng-repeat=\"s in stjerner\">" +
    "    			<div class=\"mugshot\">" +
    "					<img alt=\"...\" src=\"{{s.image}}\"></div>" +
    "				<div class=\"bio\">" +
    "					<strong>{{s.name}}</strong>" +
    "					<p>" +
    "                    {{s.club}}" +
    "					</p>" +
    "				</div>" +
    "			</li>" +
    "    </ul>" +
    "  </div>" +
    "</div>" +
    ""
  );

  $templateCache.put("app/partials/tidligere.html",
    "<div class=\"container-narrow\">" +
    "    <div class=\"row-fluid\">" +
    "        <div>" +
    "            <h2>Tidligere år</h2>" +
    "        </div>" +
    "    </div>" +
    "</div>" +
    "<section id=\"about\">" +
    "    <div class=\"container-narrow\" autoscroll>" +
    "        <div class=\"row-fluid\">" +
    "            <div class=\"span7\">" +
    "                <h3>2012</h3>" +
    "                <p>" +
    "                    <a href=\"http://open2012.ruter7.com\">Bilder, resultater mm fra 2012.</a>" +
    "                </p>" +
    "                <h3>2011</h3>" +
    "                <ul>" +
    "                    <li>" +
    "                        <a href=\"https://picasaweb.google.com/snorreaalberg/Ruter72010#slideshow/5484885543852902178\"" +
    "                        alt=\"bilder\">Bilder</a>" +
    "                    </li>" +
    "                    <li>" +
    "                        <a href=\"http://nbfdata.bridge.no/Ruter/2011/Ruter7/Open.htm\" alt=\"Resultater\">Resultater</a>" +
    "                    </li>" +
    "                </ul>" +
    "                <h3>2010</h3>" +
    "                <ul>" +
    "                    <li>" +
    "                        <a href=\"https://picasaweb.google.com/snorreaalberg/Ruter7Open2011?authkey=Gv1sRgCIicp-_Vovvrfg#slideshow/5614660572087062274\"" +
    "                        alt=\"bilder\">Bilder</a>" +
    "                    </li>" +
    "                    <li>" +
    "                        <a href=\"http://nbfdata.bridge.no/Turnering/default.asp?Fil=ruter7Open2010\"" +
    "                        alt=\"Resultater\">Resultater Hovedturnering</a>" +
    "                    </li>" +
    "                    <li>" +
    "                        <a href=\"http://nbfdata.bridge.no/Turnering/default.asp?Fil=Ruter7OpenSingelGulPulje\"" +
    "                        alt=\"Resultater\">Resultater singel gul pulje</a>" +
    "                    </li>" +
    "                    <li>" +
    "                        <a href=\"http://nbfdata.bridge.no/Turnering/default.asp?Fil=Ruter7OpenSingelHvitPulje\"" +
    "                        alt=\"Resultater\">Resultater singel hvit pulje</a>" +
    "                    </li>" +
    "                </ul>" +
    "            </div>" +
    "            <div class=\"span5\">" +
    "                <div class=\"smallpic\">" +
    "                    <img src=\"/img/small/bente.png\" alt=\"Vinner lørdag\" />" +
    "                </div>" +
    "                <div class=\"smallpic\">" +
    "                    <img src=\"/img/small/sjur.png\" alt=\"Sjur m. makker\" />" +
    "                </div>" +
    "                <div class=\"smallpic\">" +
    "                    <img src=\"/img/small/sist.png\" alt=\"Sisteplassen\" />" +
    "                </div>" +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</section>" +
    ""
  );

  $templateCache.put("app/partials/underholdning.html",
    "<section id=\"about\">" +
    "    <div class=\"container-narrow\" autoscroll>" +
    "        <div class=\"row-fluid\">" +
    "            <div class=\"span7\">" +
    "                <h3>Underholdning</h3>" +
    "                <p>" +
    "                    Underholdningen lørdag kveld er booket. " +
    "                    Også i år kommer Sordal og spiller for oss. " +
    "                    Denne gang som trio. " +
    "                </p>" +
    "                <p>" +
    "                    Stein Roger er kjent fra en rekke musikkprosjekter. Her er to vidoer. " +
    "                    En fra soloprosjektet Sordal og en fra \"sommer på torvet\" med Radiojam." +
    "                </p>" +
    "                <p>" +
    "                    <a href=\"http://www.youtube.com/watch?v=BSmLXSPDEXY\">Radiojam LIVE Sommer På Torvet 2010</a>" +
    "                </p>" +
    "                <p>" +
    "                    Radiojam er et av Norges mest populære partyband, og underholdt opp til 3000                " +
    "                </p>                " +
    "                <p>" +
    "                    Lørdagens andre artist er plateaktuelle Egil Skram. " +
    "                    Han har en fantastisk stemme og med litt egenprodusert " +
    "                    og noen oldie goldies skal han være med å lokke bridgespillere ut på dansegulvet." +
    "                </p>" +
    "                <p>" +
    "                    En liten smakebit finner du her" +
    "                    <a href=\"https://soundcloud.com/karmakosmetix-music/egil-skram-it-aint-right\">" +
    "                        Egil Skram - It Ain't Right" +
    "                    </a>" +
    "                </p>" +
    "            </div>" +
    "            <div class=\"span5\">" +
    "                <div class=\"sponsor\">" +
    "                    <a href=\"http://www.personalsjefen.org\" alt=\"Personalsjefen\">" +
    "                    <img src=\"/img/small/personalsjefen.png\" alt=\"Sponsor\" />" +
    "                    </a>" +
    "                </div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/sordal.png\" alt=\"Sordal\" /></div>" +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</section>" +
    ""
  );

}]);
