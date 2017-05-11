myApp.controller('changeForm', ['$scope', '$http', changeForm]);

function changeForm($scope, $http) {
  var $that = this;

  this.data = {};

  this.phoneDis = false;

  this.nextReqStep = function (num) {
    if(num == 'pass') this.phoneDis ? delete this.data.phone : delete this.data.email;

    $http({
      method: 'GET',
      url: '/result-'+$that.formStep+'.json'
    }).then(function successCallback(response) {
      var data = response.data;

      switch(data.result) {
        case 'ok': $that.formStep = num;
        case 'error': $that.errors = data.fields;
      }

    }, function errorCallback(response) {
    });
  };

  this.nextStep = function (num) {
    $that.formStep = num;
  }
}


myApp.controller('regFormOne', ['$scope', regFormOne]);
function regFormOne($scope) {
}

myApp.controller('regFormPass', ['$scope', regFormPass]);
function regFormPass($scope) {
}

myApp.controller('regFormPhone', ['$scope', regFormPhone]);
function regFormPhone($scope) {
}

myApp.controller('formProfile', ['$scope', '$http', formProfile]);
function formProfile($scope, $http) {
  var $that = this;

  $http({
    method: 'GET',
    url: '/profile.json'
  }).then(function successCallback(response) {
    var data = response.data;
    $that.data = data;
  }, function errorCallback(response) {
  });
}
