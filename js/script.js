var app = angular.module('myApp', ['ui.bootstrap','kendo.directives']);

app.controller("TabsParentController", function ($scope) {
 
    var setAllInactive = function() {
        angular.forEach($scope.workspaces, function(workspace) {
            workspace.active = false;
        });
    };
 	

    var today= new Date();
 	$scope.depart_min_date = today;

 	var tomorrow = new Date();
 	tomorrow.setDate(tomorrow.getDate() + 1);
 	$scope.return_min_date = tomorrow;

 	$scope.isFilled = true;
 	$scope.myForm ={};
 	$scope.isWarning_Message_show = true;
 	$scope.position = 1;
 	$scope.progress = 0;
 	$scope.months = ['January','Febrary','March','April','May','June','July','August','September','October','November','December'];

    $scope.workspaces =
    [
		{ id: 1, name: "Step 1",active:true, disabled: false, position: 1},
		{ id: 2, name: "Step 2",active:false, disabled: true, position: 2},
		{ id: 3, name: "Step 3",active:false, disabled: true, position: 3},
		{ id: 4, name: "Step 4",active:false, disabled: true, position: 4}
    ];
 	
 	$scope.cities = ["Seattle","New York","Miami","Los Angeles","Modesto"];

 	$scope.next = function(){
 		$scope.progress = $scope.position * 33;
 		$scope.position = $scope.position + 1;
 		if($scope.position == 4){

 			$scope.cities = ["Seattle","New York","Miami","Los Angeles","Modesto"];

			$scope.progress = 100;
 			
			var depart_date = $scope.myForm.depart_date;
			depart_date=depart_date.split("/");
			var new_depart_date=depart_date[2]+","+depart_date[0]+","+depart_date[1];
			var timestamp_depart = new Date(new_depart_date).getTime();

			var return_date = $scope.myForm.return_date;
			return_date=return_date.split("/");
			var new_return_date=return_date[2]+","+return_date[0]+","+return_date[1];
			var timestamp_return = new Date(new_return_date).getTime();

			var depart_hour_string = $scope.myForm.depart_time.split(" ")[0];
			depart_hour_string = depart_hour_string.split(":")[0];
			var depart_am_pm = $scope.myForm.depart_time.split(" ")[1];

			var depart_hour;
			if(depart_am_pm == "AM"){
				depart_hour = parseInt(depart_hour_string);
			} else {
				depart_hour = parseInt(depart_hour_string) + 12;
			}


			var return_hour_string = $scope.myForm.return_time.split(" ")[0];
			return_hour_string = return_hour_string.split(":")[0];
			var return_am_pm = $scope.myForm.return_time.split(" ")[1];

			var return_hour;
			if(return_am_pm == "AM"){
				return_hour = parseInt(return_hour_string);
			} else {
				return_hour = parseInt(return_hour_string) + 12;
			}

			$scope.Numhours = (timestamp_return - timestamp_depart)/86400000*24 + (return_hour - depart_hour);

			var depart_hour = $scope.myForm.depart_time;
			
			for(var i = 0 ; i < $scope.cities.length ; i++){
				if($scope.cities[i] == $scope.myForm.location){
					$scope.cities.splice(i,1);
					break;
				}
			}
 		}

 		if($scope.position == 3){

 			var depart_date = $scope.myForm.depart_date;
			depart_date=depart_date.split("/");
			
			var de_month = parseInt(depart_date[0]);
			var de_date = parseInt(depart_date[1]);
			var de_year = parseInt(depart_date[2]);

			timestamp_depart = $scope.months[de_month-1] + " " + de_date + ", " + de_year;

			var return_date = $scope.myForm.return_date;
			return_date=return_date.split("/");

			var re_month = parseInt(return_date[0]);
			var re_date = parseInt(return_date[1]);
			var re_year = parseInt(return_date[2]);

			timestamp_return = $scope.months[re_month-1] + " " + re_date + ", " + re_year;

			$scope.departing_date = timestamp_depart;
			$scope.returning_date = timestamp_return;


 		}
 		for(i=0 ; i < $scope.workspaces.length; i++)
 		{
 			$scope.workspaces[i].active = false;
 		}
 		$scope.workspaces[$scope.position-1].active = true;
 		$scope.workspaces[$scope.position-1].disabled = false;

 	}

 	$scope.change_status = function(tab_number){
 		if($scope.workspaces[tab_number].disabled == false){
 			if(tab_number == 3){
 				$scope.progress = 100;
 			} else {
 				$scope.progress = tab_number * 33;
 			}
 			$scope.position = tab_number+1;	
 		}
 	}

 	$scope.set_min_value = function(){
 		
 		var depart_date = $scope.myForm.depart_date;
		depart_date=depart_date.split("-");
		var new_depart_date=depart_date[1]+","+depart_date[2]+","+depart_date[0];
		var timestamp_depart = new Date(new_depart_date).getTime() + 86400000;
		var d = new Date(timestamp_depart);

 		$scope.return_min_date = d;
 	}
});