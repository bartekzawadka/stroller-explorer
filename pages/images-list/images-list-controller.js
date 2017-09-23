'use strict';

angular.module('strollerExplorer.imagesList', ['ngRoute'])
    .controller('ImagesListCtrl', function($scope, $http, DialogService){

        $scope.images = [];
        $scope.$parent.showBack = false;

        $http.get('http://192.168.50.1:4000/api/images').then(function(res){
            $scope.images = res.data;
        }, function (e) {
            var error = "";
            if(e && e.message){
                error = e.message;
            }else if(e && e.statusText){
                error = e.statusText;
            }else{
                error = "Connection could not be established";
            }

            DialogService.showMessage(null, "Error", error, true);
        });

});