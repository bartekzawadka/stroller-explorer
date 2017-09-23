'use strict';

angular.module('strollerExplorer', [
    'strollerExplorer.imagesList',
    'strollerExplorer.imagePreview',
    'ngMaterial', 'ngRoute', 'ngMessages',
    'angular-loading-bar'
]).config(['$locationProvider', '$routeProvider','cfpLoadingBarProvider',
    function($locationProvider, $routeProvider, cfpLoadingBarProvider){
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    cfpLoadingBarProvider.includeSpinner = false;

    $routeProvider
        .when('/images', {
        templateUrl: 'pages/images-list/images-list.html',
        controller: 'ImagesListCtrl'})
        .when('/image/:id', {
        templateUrl: 'pages/image-preview/image-preview.html',
        controller: 'ImagePreviewCtrl'})
        .otherwise({redirectTo: '/images'});
}]).controller('MainController', function($scope){
    $scope.showBack = false;
});