
var carvoyantConfig = angular.module('carvoyantConfig', []);

carvoyantConfig.constant({
	carvoyantBaseApi: 'https://api.carvoyant.com/v1/api/',
	carvoyantOAuth2Uri: 'https://auth.carvoyant.com/oauth/authorize',
	carvoyantClientId: 'c9y7z9bqh6ntqfna56a6xp4p',
	googleMapsKey: 'AIzaSyBfO4TcUaBaeMoIkUODVbBEf1tjE47rZ14'
});

var carvoyantApp = angular.module('carvoyantClient', [
	'ngRoute',
	'carvoyantConfig',
	'carvoyantControllers',
	'carvoyantService'
]);

carvoyantApp.factory('UserInfo', function () {
	return {
		account: null,
		vehicles: null
	};
});

carvoyantApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
		templateUrl: 'templates/login.html',
		controller: 'LoginController'
	})
		.when('/authorized', {
		template: '<div>Authorized</div>',
		controller: 'AuthorizedController'
	})
		.when('/vehicles', {
		templateUrl: 'templates/vehicles.html',
		controller: 'CarvoyantController'
	});
}]);
