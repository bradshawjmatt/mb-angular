//Define angular app, include the routing capability
var app = angular.module("app", ['ngRoute']);

  //define the controller, include the http library
    app.controller("homeCtrl", function ($scope, $http) {

      //Standard request headers
      var config = {
          headers : {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          }
      }

      //function for http post
      $scope.SendData = function () {
          // use $.param jQuery function to serialize data from JSON
          //populate data from bound text boxes on the html form
          var data = $.param({
              name: $scope.name,
              email: $scope.email
          });
          //try a post to the /newuser url with the data and headers
          $http.post('/newuser', data, config)
          .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
          })
          .error(function (data, status, header, config) {
              $scope.ResponseDetails = "Data: " + data +
                  "<hr />status: " + status +
                  "<hr />headers: " + header +
                  "<hr />config: " + config;
          });
            //reset the values on the text boxes
            $scope.name="";
            $scope.email="";
        };
        //function for http get
        $scope.GetData = function(){
          $http.get('/userlist', config)
            .success(function(data, status, headers, config){
            $scope.userList = data;
          })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
        };
    });
