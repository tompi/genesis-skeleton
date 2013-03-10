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
