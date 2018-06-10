var app =angular.module('contacts', ['ngRoute']);
	app.config(function($routeProvider) {
	
    $routeProvider
	.when("/add", {
        templateUrl : "./html/add.html"
    })
	.when("/list", {
        templateUrl : "./html/list.html"
    })
	.when("/edit", {
        templateUrl : "./html/edit.html"
    })
    .when("/", {
        templateUrl : "./html/first.html"
    });
	});

    app.service('sharedProperties', function () {
        var allContacts = [];

        return {
            getProperty: function () {
                return allContacts;
            },
            setProperty: function(value) {
                allContacts.push(value);
            },
			updateProperty: function(value){
				if(allContacts.length){
					for (var i = 0; i < allContacts.length; i++) {
						if (allContacts[i].email === value.email) {
							allContacts[i] = value;
							break;
						}
						}
				}
			}
        };
	});
	app.controller('Contacts', function ($scope, $rootScope) {
		
		$scope.contact ={};
	});

	app.controller('listContacts', function($scope, $rootScope, sharedProperties) {
		$scope.allContacts = sharedProperties.getProperty();
	});
	
	app.controller('addController', function($scope, $location, sharedProperties) {
		$scope.contact ={};
		$scope.editContact = false;
		$scope.add = function(valid){
			if(valid){
			$scope.contact.status = 'active'
			sharedProperties.setProperty($scope.contact)
		//	$rootScope.allContacts.push($scope.contact)
				alert('Contact Successfully Added.');		
				$location.path('/');	
			$scope.contact = {};
			}else{
				alert('Please fill the contact details.');
			}
		}
	});
	
	app.controller('editController', function($scope, $location, sharedProperties) {
		$scope.allContacts = sharedProperties.getProperty();
		//$scope.editContact = true;
		$scope.edit = function(cont){
			$scope.editContact = true;
			$scope.contact = cont;
			
		}
		$scope.save = function(){
			sharedProperties.updateProperty($scope.contact);
			$location.path('/');
		}
		$scope.delete = function(cont){
			cont.status = 'Inactive';
			sharedProperties.updateProperty(cont);
			$location.path('/');
		}
	});