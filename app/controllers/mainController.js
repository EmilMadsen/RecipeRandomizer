angular.module("randomRecipe").controller("mainController", function($scope, $state, recipeAPIService) {
    console.log("In Maincontroller!");

    $scope.allData = [];
    $scope.allRecipes = [];
    $scope.randomRecipeId = {};
    $scope.categoryList = ["Starter", "Main Course", "Dessert"];
    $scope.cuisineList = ["African","Asian","European","NorthAmerican", "Oceanian", "SouthAmerican"];
    $scope.timeList = ["15 min","30 min","45 min","1 hour", "1½ hour","2 hours","3 hours", "+4 hours"];


    recipeAPIService.getRecipes().then(function(recipes){
        $scope.allData = recipes;
        console.log("Data Retrieved from API");

        $scope.allRecipes = recipes;
        /*
        angular.forEach($scope.allData, function(recipe){
            $scope.allRecipes.push(recipe);
        });
        */

    },function(error){
        alert("error - Could not retrieve data from database");
    });

    // Navigate to edit, by clicking on a recipe in the table
    $scope.editRecipe = function(recipeCopy){
        $state.go("manage-recipes.new", {recipeParameter: angular.copy(recipeCopy)})
    };

    /*
    $scope.filterRecipes = function(recipe){
        return recipe.type === "AwesomeRecipe";
    };
    */

    $scope.filterRandomRecipes = function(recipe){
        return recipe._id === $scope.randomRecipeId;
    };

    $scope.getRandomRecipe = function(){
        var randomRecipeNumber = Math.floor(Math.random() * $scope.allRecipes.length);
        var currentNumber = 0;
        console.log("We are getting a random Recipe");
        angular.forEach($scope.allRecipes, function(value){
            if (currentNumber === randomRecipeNumber){
                $scope.randomRecipeId = value._id;
                $state.go("random");
            }
            currentNumber++;
        });
    };

/*
    $http({method: "GET", url: "http://angularkea1.azurewebsites.net/api/internships/GetAll"})
        .success(function(data) {
            $scope.dummyRecipes = data;
            angular.forEach($scope.dummyRecipes, function(value){
                if(value.type === "AwesomeRecipe"){ // Could have made a call to "filterRecipes", but bad practice
                    $scope.allRecipes.push(value);
                }
            });
            console.log($scope.allRecipes);
            alert("success");
        }).error(function(data) {
            alert("error");
        });
*/
});