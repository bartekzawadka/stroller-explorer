angular.module('strollerExplorer').factory('DialogService', function($mdDialog){
   return {
       showMessage: function(ev, title, message, isError, callback){
           $mdDialog.show({
               controller: 'DialogCtrl',
               templateUrl: '../pages/dialogs/message.html',
               parent: angular.element(document.body),
               targetEvent: ev,
               clickOutsideToClose: false,
               fullscreen: false,
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
       showLoader: function(ev){
           $mdDialog.show({
               controller: function($scope, data){
                   $scope.message = data.message;
               },
               templateUrl: '../pages/dialogs/loader.html',
               parent: angular.element(document.body),
               targetEvent: ev,
               clickOutsideToClose: false,
               fullscreen: false,
               locals: {
                   data: {
                       message: "Loading data, please wait..."
                   }
               }
           });

       },
       showConfirm: function(ev, title, message,
                             confirmButtonText, rejectButtonText,
                             confirmedCallback, rejectedCallback){
           if(!confirmButtonText)
               confirmButtonText = "OK";
           if(!rejectButtonText)
               rejectButtonText = "Cancel";
           var confirmDialog = $mdDialog.confirm()
               .title(title)
               .textContent(message)
               .targetEvent(ev)
               .ok(confirmButtonText)
               .cancel(rejectButtonText);

           $mdDialog.show(confirmDialog).then(confirmedCallback, rejectedCallback);
       },
       closeDialog: function(){
           $mdDialog.cancel();
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