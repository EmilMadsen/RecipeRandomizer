angular.module("randomRecipe").controller("newEditRecipeController", function($scope, $state, $stateParams, $http){
    $scope.recipe = {};
    $scope.recipe.category = {};
    $scope.validURL = {};

    $scope.recipe = $stateParams.recipeParameter;

    $scope.saveRecipe = function(){
        console.log("Save Recipe!!!");
        console.log($scope.recipe);

        if($scope.recipeForm.link.$valid){
            console.log("Valid URL");
            $scope.validURL = true;
        }else {
            console.log("InValid URL");
            $scope.validURL = false;
        }

        if ($scope.recipeForm.$valid) {
            console.log("Valid Recipe");
            //console.log("DropDown category = "+$scope.$parent.startCategory);
            console.log($scope.recipe);
            $scope.recipe.type = "AwesomeRecipe";

            $scope.$parent.dummyRecipes.push($scope.recipe);

            if($scope.recipe._id === undefined)
            {
                //Create
                console.log("CREATING_______-------");

                $http({method: "POST",
                    data: $scope.recipe ,
                    url: "http://angularkea1.azurewebsites.net/api/internships/Create"})
                    .success(function(data) {
                        $scope.dummyRecipes = data;
                        alert("success");
                        $scope.$parent.dummyRecipes.push($scope.recipe)
                    }).error(function(data) {
                    alert("error");
                });
            }
            else
            {
                //Update
                console.log("UPDATING_______-------");
                $http({method: "POST",
                    data: $scope.recipe ,
                    url: "http://angularkea1.azurewebsites.net/api/internships/Update/" + $scope.recipe._id}) // Nøgle?!
                    .success(function(data) {
                        $scope.dummyRecipes = data;
                        alert("success");
                    }).error(function(data) {
                    alert("error");
                });
            }

            //$scope.$parent.dummyInternships.push($scope.internship);
            $state.go("manage-recipes.all")
        }
        else{
            console.log("Form not Valid")
        }

    };
});