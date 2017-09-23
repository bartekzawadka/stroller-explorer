'use strict';

angular.module('strollerExplorer', [
    'strollerExplorer.imagesList',
    'strollerExplorer.imagePreview',
    'ngMaterial', 'ngRoute', 'ngMessages'
]).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/images', {
        templateUrl: 'pages/images-list/images-list.html',
        controller: 'ImagesListCtrl'})
        .when('/image', {
        templateUrl: 'pages/image-preview/image-preview.html',
        controller: 'ImagePreviewCtrl'})
        .otherwise({redirectTo: '/images'});
}]);