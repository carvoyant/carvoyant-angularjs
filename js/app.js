
// Create a config module to store system configuration items
var carvoyantConfig = angular.module('carvoyantConfig', []);

carvoyantConfig.constant({
	// This is the production Carvoyant environment
	carvoyantBaseApi: 'https://api.carvoyant.com/v1/api/',
	carvoyantOAuth2Uri: 'https://auth.carvoyant.com/oauth/authorize',

	// This is the sandbox Carvoyant environment
//	carvoyantBaseApi: 'https://sandbox-api.carvoyant.com/sandbox/api/',
//	carvoyantOAuth2Uri: 'https://sandbox-auth.carvoyant.com/sandbox/oauth/authorize',
	
	// A production Carvoyant developer id
	carvoyantClientId: 'c9y7z9bqh6ntqfna56a6xp4p',
	
	// Google Maps API Key
	googleMapsKey: 'AIzaSyBfO4TcUaBaeMoIkUODVbBEf1tjE47rZ14'
});

// Create the basic Carvoyant client module
var carvoyantApp = angular.module('carvoyantClient', [
	'ngRoute',
	'carvoyantConfig',
	'carvoyantControllers',
	'carvoyantService'
]);

carvoyantApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		// Presents the screen allowing the user to initiate login
		.when('/', {
		templateUrl: 'templates/login.html',
		controller: 'LoginController'
	})
		// This is the URL that the Carvoyant authorization server redirects the user to.
		// The controller will store the user access token and then redirect to the /vehicles route.
		// The template specified here is never actually used.
		.when('/authorized', {
		template: '<div>Authorized</div>',
		controller: 'AuthorizedController'
	})
		// After the user is logged in, this will display basic Carvoyant account information.
		.when('/vehicles', {
		templateUrl: 'templates/vehicles.html',
		controller: 'CarvoyantController'
	});
}]);