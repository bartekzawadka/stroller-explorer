angular.module('strollerExplorer').directive('imageViewer', function () {
    return {
        restrict: 'E',
        scope: {
            images: '='
        },
        templateUrl: 'directives/image-viewer/image-viewer.html',
        controller: function ($scope, $window) {

            var wthRatio = 1280 * (1.0) / 720;
            $scope.imageWidth = 300;
            $scope.imageHeight = 300;

                $scope.$watch('images', function (n) {
                    if (n && n.length > 0) {
                        loadImages();
                    }
                }, true);

            angular.element($window).bind('resize', function () {
                resize();
            });

            var loadImages = function () {

                var img = new Image();
                img.onload = function () {
                    wthRatio = img.width / img.height;
                    $scope.imageHeight = img.height;
                    $scope.imageWidth = img.width;

                    resize();
                    $('.imageViewerContainer').ThreeSixty({
                        totalFrames: $scope.images.length,
                        currentFrame: 1,
                        width: "100%",
                        height: "100%",
                        imgArray: $scope.images,
                        progress: '.spinner',
                        imgList: '.threesixty_images',
                        filePrefix: '',
                        ext: '.png',
                        onReady: function(){
                            resize();
                        }
                    });
                };
                img.src = $scope.images[0];
            };

            var resize = function () {
                var wrapper = $('#imageViewerWrapper')[0];

                $('#imageViewerWrapper').css('height', window.innerHeight - wrapper.offsetTop);

                var imcHeight = wrapper.clientHeight;
                var imcWidth = wrapper.clientWidth;
                var windRatio = imcWidth / imcHeight;


                if (wthRatio > 1 && windRatio > 1) {
                    if (windRatio >= wthRatio) {
                        $scope.imageWidth = imcHeight * wthRatio;
                        $scope.imageHeight = imcHeight;
                    } else {
                        $scope.imageWidth = imcWidth;
                        $scope.imageHeight = (1.0 / wthRatio) * imcWidth;
                    }
                } else if (wthRatio > 1 && windRatio <= 1) {
                    $scope.imageWidth = imcWidth;
                    $scope.imageHeight = (1.0 / wthRatio) * imcWidth;
                } else if (wthRatio <= 1 && windRatio > 1) {
                    $scope.imageWidth = imcHeight * wthRatio;
                    $scope.imageHeight = imcHeight;
                } else {
                    if (wthRatio <= windRatio) {
                        $scope.imageWidth = imcHeight * wthRatio;
                        $scope.imageHeight = imcHeight;
                    } else {
                        $scope.imageWidth = imcWidth;
                        $scope.imageHeight = (1.0 / wthRatio) * imcWidth;
                    }
                }

                var imgSelector = $('ol.threesixty_images li img');

                angular.forEach(imgSelector, function (i) {
                    i.width = $scope.imageWidth;
                    i.height = $scope.imageHeight;
                });

                $('.imageViewerContainer').css('width', $scope.imageWidth);
            };
        }
    }
});