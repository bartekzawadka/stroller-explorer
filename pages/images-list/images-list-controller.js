'use strict';

angular.module('strollerExplorer.imagesList', ['ngRoute'])
    .controller('ImagesListCtrl', function($scope, $http, DialogService, FileSaver, Blob){

        $scope.images = [];
        $scope.$parent.showBack = false;

        $scope.loadData = function() {
            $http.get('http://192.168.50.1:4000/api/images').then(function (res) {
                $scope.images = res.data;
            }, function (e) {
                var error = "";
                if (e && e.message) {
                    error = e.message;
                } else if (e && e.statusText) {
                    error = e.statusText;
                } else {
                    error = "Connection could not be established";
                }

                DialogService.showMessage(null, "Error", error, true);
            });
        };

        $scope.deleteImage = function(itemId){
            DialogService.showConfirm(this,
                "Delete item",
                "Do you want to remove this item? This operation cannot be undone",
                "Yes",
                "Cancel",
                function(){
                    $http.get('http://192.168.50.1:4000/api/image/delete/'+itemId).then(function(){
                        $scope.loadData();
                    }, function(e){
                       DialogService.showMessage(null, "Delete failed", e, true);
                    });
                }
                );
        };

        $scope.downloadImage = function(itemId){
            DialogService.showPrompt(this, 'Download image', 'Please enter file name to be downloaded',
                'OK',
                'Cancel',
                function (result) {
                    $http.get('http://192.168.50.1:4000/api/image/download/'+itemId+'/'+result).then(function(result){
                        if (!result || !result.data) {
                            DialogService.showMessage(null,
                                "Downloading file failed", "No file data received", true);
                            return;
                        }

                        var contentType = result.headers('Content-Type');

                        if (!contentType) {
                            DialogService.showMessage(null,
                                "Downloading file failed", "File content type was not specified by server", true);
                            return;
                        }

                        var cd = result.headers('Content-Disposition');
                        if(!cd) {
                            DialogService.showMessage(null,
                                "Downloading file failed", "Error reading file metadata. Expected header not found (Content-Disposition)", true);
                            return;
                        }

                        var cdSplits = cd.split('=');
                        var fName = 'Image';
                        if (cdSplits.length >= 2) {
                            fName = cdSplits[1];
                        }

                        var blob = new Blob([JSON.stringify(result.data)], { type: contentType });
                        FileSaver.saveAs(blob, fName);
                        },
                        function(e){
                            DialogService.showMessage(null, "Downloading file failed", e, true);
                        });
                });
        };

        $scope.loadData();
});