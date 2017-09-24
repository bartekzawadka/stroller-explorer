'use strict';

angular.module('strollerExplorer.imagePreview', ['ngRoute']).controller('ImagePreviewCtrl', function($scope,
                                                                                                     $http,
                                                                                                     $routeParams,
                                                                                                     $location,
                                                                                                     $q, $filter,
                                                                                                     DialogService){

    $scope.images = [];
    $scope.$parent.showBack = true;

    DialogService.showLoader();

    $http.get('http://192.168.50.1:4000/api/image/'+$routeParams.id).then(function(res){

        if(!res || !res.data || !res.data.chunks){

            DialogService.closeDialog();

            DialogService.showMessage(null,
                "No data received",
                "Server response was successful, but no image data sent",
                true, function(){
                    $location.path('/');
                });
            return;
        }

        var requests = [];
        for(var k in res.data.chunks){
           requests.push($http.get("http://192.168.50.1:4000/api/chunk/"+res.data.chunks[k]));
        }

        $q.all(requests).then(function(requests){

            DialogService.closeDialog();

            var dataSorted = $filter('orderBy')(requests, 'data.index');
            $scope.images = dataSorted.map(function(item){return item.data.image});
        }, function(e){
            DialogService.closeDialog();

            DialogService.showMessage(null, "Error", e, true);
        })

    }, function (e) {

        DialogService.closeDialog();

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