$module.controller('dropdown', ['$scope', '$rootScope', function($scope,$rootScope) {
  $scope.show = function() {
    event.stopPropagation();
    $scope.ddVisible = !$scope.ddVisible;
  };

  // $scope.select = false;



  angular.element(document).on("click", function(e) {
    $rootScope.$broadcast("documentClicked", angular.element(e.target));
  });

  angular.element('.dd-show').on("click", function(e) {
    $rootScope.$broadcast("documentClicked", angular.element(e.target));
  });

  $rootScope.$on("documentClicked", function(inner, target) {
    if (!$(target[0]).is(".dd-open") && !$(target[0]).parents(".dd-open").length > 0)
        $scope.$apply(function() {
          $scope.ddVisible = false;
        });
    });
}]);

// $module.controller('select', ['$scope', function($scope) {
//   $scope.show = function() {
//     event.stopPropagation();
//     $scope.ddVisible = !$scope.ddVisible;
//   };
// }]);
