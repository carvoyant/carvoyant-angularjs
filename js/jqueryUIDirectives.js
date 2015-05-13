carvoyantApp.directive('jqUiElement', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'EA',
		link: function (scope, iElement, attrs) {
			//iElement is the actual DOM element of the directive,
			//so you can bind to it with jQuery
			if (iElement[0].type == "submit") {
				$(iElement).button();
			}
		}
	};
}]);