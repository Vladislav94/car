myApp.controller('loadMark', ['$scope', '$http', loadMark]);
function loadMark($scope, $http) {


  this.loadSelect = function(opts) {
    console.log(opts);
  }
}

myApp.controller('selectCtrl', ['$scope', '$http', selectCtrl]);
function selectCtrl($scope, $http) {
  var $that = this;

  $http({
    method: 'GET',
    url: '/load-select.json'
  }).then(function successCallback(response) {
    var data = response.data;

    $that.selectData = data;
  }, function errorCallback(response) {
  });

  // $scope.$emit('myCustomEvent', 'Data to send');
}
