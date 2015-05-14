
// The Carvoyant Service contains all of the calls into the Carvoyant API. The general pattern is for
// the service methods to take the access token to use and any parameters. They will make an async call
// that returns a promise to the caller.
var carvoyantService = angular.module('carvoyantService', ['carvoyantConfig']);

carvoyantService.service('CarvoyantService', function ($http, $q, carvoyantBaseApi) {
	
	// A helper method to prepare an API call
	this.buildCall = function (method, resource, accessToken, payload) {
		return {
			method: method,
			url: carvoyantBaseApi + resource,
			headers: {
				'Authorization': "Bearer " + accessToken
			}
		};
	};

	// Returns an array of all vehicles on the account
	this.getVehicles = function (accessToken) {
		var req = this.buildCall("GET", "vehicle/", accessToken);

		$http(req)
			.success(function (data, status, headers, config) {
			deferred.resolve(data.vehicle);
		})
			.error(function (data, status, headers, config) {
			deferred.resolve(null);
		});

		var deferred = $q.defer();
		return deferred.promise;
	};

	// Returns the basic Carvoyant account information
	this.getAccount = function (accessToken) {
		var req = this.buildCall("GET", "account/", accessToken);
		
		$http(req)
			.success(function (data, status, headers, config) {
			deferred.resolve(data.account[0]);
		})
			.error(function (data, status, headers, config) {
			deferred.resolve(null);
		});
		
		var deferred = $q.defer();
		return deferred.promise;
	};

	// Returns the details of a single Carvoyant vehicle	
	this.getVehicle = function (accessToken, vehicleId) {
		var req = this.buildCall("GET", "vehicle/" + vehicleId, accessToken);

		$http(req)
			.success(function (data, status, headers, config) {
			deferred.resolve(data.vehicle);
		})
			.error(function (data, status, headers, config) {
			deferred.resolve(null);
		});

		var deferred = $q.defer();
		return deferred.promise;
	};

});
