var carvoyantService = angular.module('carvoyantService', ['carvoyantConfig']);

carvoyantService.service('CarvoyantService', function ($http, $q, carvoyantBaseApi) {
	this.buildCall = function (method, resource, accessToken, payload) {
		return {
			method: method,
			url: carvoyantBaseApi + resource,
			headers: {
				'Authorization': "Bearer " + accessToken
			}
		};
	};

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
