var app = angular.module("app", ['ngRoute']);
    app.controller("homeCtrl", function ($scope, $http) {

        $scope.SendData = function () {
           // use $.param jQuery function to serialize data from JSON
            var data = $.param({
                name: $scope.name,
                email: $scope.email
            });
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                }
            }

            $http.post('/newuser', data, config)
            .success(function (data, status, headers, config) {
              console.log("data="&&data);
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
            $scope.name="";
            $scope.email="";
        };


    });
