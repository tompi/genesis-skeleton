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
