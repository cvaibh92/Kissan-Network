"use strict";
var users =[];
var app = angular.module("Code",[]);
var url = "/JSON/Users.json";
var sentmessages="/JSON/SentMessages.json";
app.controller("CodeController",function($scope,$http){

  $http.get(url)
    .then(function (response) {
	users =response.data.Users;
	$scope.users = response.data.Users;

	});
	
	$scope.selectedRow = null;  // initialize our variable to null
  $scope.setClickedRow = function(index,x){  //function that sets the value of selectedRow to current index
     $scope.selectedRow = index;
	 $("#list").hide();
	 
	
		$scope.d=x;	
		$("#details").show();
	 }

	$scope.goBack= function()
{
	$("#details,#message,#response,#sent").hide();
	
	$scope.users = users;
	$("#list").show();
}

$scope.sentMessages=function()
	{	
		$("#l1").removeClass("active");
		$("#l2").addClass("active");
		$("#details,#message,#response,#list").hide();
		$http.get(sentmessages)
		.then(function (response) {
		var x = (response.data).reverse();
		
		$scope.messages = x;
			
	});
		$("#sent").show();
	}
});
function sendMessage()
{	
	var data = {
	message : $("#text").val(),
	phone : $("#mobile").text(),
	name : $("#name").text()
	};
	$.ajax({
	type:'POST',
	data:data,
	url:'/sendMessage',
	datatype:'JSON'
	}).done(function(result){
	if((result.msg).length > 0)
	{
	 $("#response").show();
	 $("#message").slideUp();
	 
	}
	});
	
}
