angular.module('strollerExplorer').factory('DialogService', function($mdDialog){
   return {
       showMessage: function(ev, title, message, isError, callback){
           $mdDialog.show({
               controller: 'DialogCtrl',
               templateUrl: '../pages/dialogs/message.html',
               parent: angular.element(document.body),
               targetEvent: ev,
               clickOutsideToClose: false,
               fullscreen: true,
               locals: {
                   data: {
                       title: title,
                       message: message,
                       isError: isError
                   }
               },
               onComplete: callback
           });
       },
       showLoader: function(ev, message, callback){
           $mdDialog.show({
               controller: function($scope, data){
                   $scope.message = data.message;
               },
               templateUrl: '../pages/dialogs/loader.html',
               parent: angular.element(document.body),
               targetEvent: ev,
               clickOutsideToClose: false,
               fullscreen: true,
               locals: {
                   data: {
                       message: message
                   }
               },
               onComplete: callback
           });

       }
   }
}).controller('DialogCtrl', function($scope, $mdDialog, data){
    $scope.isError = data.isError;
    $scope.title = data.title;
    $scope.message = data.message;

    $scope.close = function(){
        $mdDialog.cancel();
    }
});