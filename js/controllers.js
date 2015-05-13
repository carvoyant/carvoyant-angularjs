
var carvoyantControllers = angular.module('carvoyantControllers', ['carvoyantConfig', 'uiGmapgoogle-maps']);

carvoyantControllers.config(function(uiGmapGoogleMapApiProvider, googleMapsKey) {
	uiGmapGoogleMapApiProvider.configure({
		key: googleMapsKey,
		v: '3.17',
		libraries: 'visualization'
	});
});

carvoyantControllers.controller('LoginController', ['$scope', '$window', '$location', '$route', 'carvoyantOAuth2Uri', 'carvoyantClientId', function ($scope, $window, $location, $route, carvoyantOAuth2Uri, carvoyantClientId) {
	$scope.login = function () {
		var redirectUri = encodeURIComponent($location.protocol() + "://" + $location.host() + ":" + $location.port() + "/#/authorized");
		var authServer = carvoyantOAuth2Uri;
		$window.location.href = authServer + "?redirect_uri=" + redirectUri + "&response_type=token&client_id=" + carvoyantClientId;
	};
}]);

carvoyantControllers.controller('AuthorizedController', ['$rootScope', '$routeParams', '$location', function ($rootScope, $routeParams, $location) {
	$rootScope.token = $routeParams.access_token;
	$location.search('').path('/vehicles');
}]);

carvoyantControllers.controller('CarvoyantController', ['$scope', '$rootScope', '$location', 'UserInfo', 'CarvoyantService', function ($scope, $rootScope, $location, UserInfo, CarvoyantService) {
	if ($rootScope.token == null) {
		$location.path("/");
	} else {
		CarvoyantService.getAccount($rootScope.token)
			.then(function (result) {
				$scope.account = result;
			}, function (result) {
				$scope.account = null;
			});
	
		CarvoyantService.getVehicles($rootScope.token)
			.then(function (result) {
				$scope.vehicles = result;
			}, function (result) {
				$scope.vehicles = null;
			});
	}

	$scope.selectVehicle = function (vehicleId) {
		CarvoyantService.getVehicle($rootScope.token, vehicleId)
			.then(function (result) {
				$scope.selectedVehicle = {
					vehicleId: result.vehicleId,
					name: result.name,
					label: result.label,
					vin: result.vin,
					lastWaypoint: result.lastWaypoint
				};
				
				if ($scope.selectedVehicle.lastWaypoint != null) {
					$scope.mapCenter = { latitude: $scope.selectedVehicle.lastWaypoint.latitude, longitude: $scope.selectedVehicle.lastWaypoint.longitude };
				} else {
					$scope.mapCenter = null;
				}
			}, function (result) {
				$scope.vehicles = null;
			});
	};

}]);
