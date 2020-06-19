var app = angular.module('inuWoofyTime', ["ngRoute"]);


/* Controller used to get all the http requests */
app.controller('myCtrl', function($scope, $http) {
	$scope.selectedBreed = null;
	$scope.alertMsg = '';
	$scope.successMsg = '';

	/* Get two random images from DogAPI */
	/* https://dog.ceo/dog-api/ */
	$http({
	  	method : "GET",
	    url : "https://dog.ceo/api/breeds/image/random/2"
	}).then(function mySuccess(response) {
	  	$scope.image = response.data.message[0];
	  	$scope.image2 = response.data.message[1];
	}, function myError(response) {
		$scope.image = response.statusText;
		$scope.image2 = response.statusText;
	});


	/* Function that gets one random image of the selected breed from TheDogAPI */
	/* https://docs.thedogapi.com/ */
	$scope.getBreedImg = function(){
		$http({
		  	method : "GET",
		    url : "https://api.thedogapi.com/v1/images/search?breed_id=" + this.selectedBreed.id,
		    headers: {
	   			'x-api-key': '17da672b-531a-4dd3-b20a-bb6857ef6d5f'
	 		}
		}).then(function mySuccess(response) {
		  	$scope.breedInfo = response.data;
		}, function myError(response) {
			$scope.breedInfo = response.statusText;
		});
	}


	/* Function that gets 6 random images of the selected breed from TheDogAPI */
	$scope.getBreedImgs = function(){
		$http({
		  	method : "GET",
		    url : "https://api.thedogapi.com/v1/images/search?breed_id=" + this.selectedBreed2.id + "&limit=6",
		    headers: {
	   			'x-api-key': '17da672b-531a-4dd3-b20a-bb6857ef6d5f'
	 		}
		}).then(function mySuccess(response) {
		  	$scope.breedImgs = response.data;
		}, function myError(response) {
			$scope.breedImgs = response.statusText;
		});
	}


	/* Creates formdata that is to be used for uploading image to TheDogAPI */
	//https://www.encodedna.com/angularjs/tutorial/angularjs-file-upload-using-http-post-formdata-webapi.htm
	var formdata = new FormData();

	/* Function that gets the file data and append it to formdata, and then render the image to the given target */
    $scope.getTheFiles = function (files) {
        formdata.append("file", files[0])
        console.log(formdata);

        var reader = new FileReader();
		reader.onload = function(e) {
		    // get loaded data and render thumbnail.
		    document.getElementById("preview").src = e.target.result;
		};
		// read the image file as a data URL.
		reader.readAsDataURL(files[0]);
    };


    /* Function that uploads the image selected by the user to TheDogAPI */
	$scope.upload = function(){
		$http({
		  	method : "POST",
		    url : "https://api.thedogapi.com/v1/images/upload",
		    data : formdata,
		    headers: {
	   			'x-api-key': '17da672b-531a-4dd3-b20a-bb6857ef6d5f',
	   			'Content-Type': undefined 
	 		}
		}).then(function mySuccess(response) {
		    $scope.successMsg = "Image is uploaded. The link will be https://cdn2.thedogapi.com/images/" + response.data.id + ".jpg";
		    console.log(response.data);
		}, function myError(response) {
			$scope.alertMsg = response.data.message;
			console.log(response.data);
		});
	}


	/* Get the list of dog breeds and then to be populated as a dropdown list */
	$http({
	  	method : "GET",
	    url : "https://api.thedogapi.com/v1/breeds",
	    headers: {
   			'x-api-key': '17da672b-531a-4dd3-b20a-bb6857ef6d5f'
 		}
	}).then(function mySuccess(response) {
	  	$scope.listBreeds = response.data;
	}, function myError(response) {
		$scope.listBreeds = response.statusText;
	});
});


/* Routing - routes to the url when it fits the criteria */
app.config(["$routeProvider", function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "templates/home.html"
        })
        .when("/breeds", {
        	templateUrl: "templates/breeds.html"
        })
        .when("/images", {
        	templateUrl: "templates/images.html"
        })
        .when("/upload", {
        	templateUrl: "templates/upload.html"
        })
        .when("/disclaimer", {
        	templateUrl: "templates/disclaimer.html"
        })
}]);


/* Custom directive that is to be used to get the access to the file input element */
//https://www.encodedna.com/angularjs/tutorial/angularjs-file-upload-using-http-post-formdata-webapi.htm
app.directive('ngFiles', ['$parse', function ($parse) {

	function linkFunction(scope, element, attrs) {
		var onChange = $parse(attrs.ngFiles);
		element.on('change', function (event) {
			onChange(scope, { $files: event.target.files });
		});
	};

	return {
		link: linkFunction
	}
} ])