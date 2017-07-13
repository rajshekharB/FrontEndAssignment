angular.module('sampleApp')
    .controller('homeController',function($scope,$http){
        $scope.message = "Home Page";
        $scope.stocks = [];

        var socket = io.connect('');
        socket.on('stocks', function (data) {
            $scope.stocks = data.stocks;
            $scope.$apply();
        });

        socket.emit('custom',{message:'Client Sending data to server...!!!'});
    })
    .controller('loginController',function($scope,$location){    
        $scope.login = function(){
            $location.path('home');  
        }        
    });
