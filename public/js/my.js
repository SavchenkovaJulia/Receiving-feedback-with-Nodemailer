'use strict'
const app = angular.module('app', ['ngRoute']);
const socket = io.connect();

app.config(["$locationProvider", function
($locationProvider){
	$locationProvider.hashPrefix('');
	$locationProvider.html5Mode(true);
}]);

app.config(function ($routeProvider){
	$routeProvider
	.otherwise({
		redirectTo: "/"
	});
});


app.controller('MyCtrl', function($scope){
	$scope.SendMessage = function(){
		if(Object.keys($scope.contactForm).length<3){
			console.log("error");
			 return false;
		}
		socket.emit("sendContactForm", $scope.contactForm);
        $scope.contactForm={};
	}
	
	socket.on("messageStatus", function(data){
		$scope.result = data;
		console.log(data);
		$scope.$digest();
	})
	
})



