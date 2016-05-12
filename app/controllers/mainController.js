angular.module("randomRecipe").controller("mainController", function($scope, $state, $http) {
    console.log("In Maincontroller!");

    $scope.editRecipe = function(recipeCopy){
        $state.go("manage-recipes.new", {recipeParameter: angular.copy(recipeCopy)})
    };

    $scope.filterRandomRecipes = function(recipe){
        return recipe._id === $scope.randomRecipeId;
    }

    $scope.randomRecipeId = {};
    $scope.getRandomRecipe = function(){
        var randomRecipeNumber = Math.floor(Math.random() * $scope.recipyList.length);
        var currentNumber = 0;
        console.log("We are getting a random Recipe")
        angular.forEach($scope.recipyList, function(value){
            if (currentNumber === randomRecipeNumber){
                $scope.randomRecipeId = value._id;
                $state.go("random");
            }
            currentNumber++;
        });
    };

    $http({method: "GET", url: "http://angularkea1.azurewebsites.net/api/internships/GetAll"})
        .success(function(data) {
            $scope.dummyRecipes = data;
            angular.forEach($scope.dummyRecipes, function(value){
                if(value.type === "AwesomeRecipe"){ // Could have made a call to "filterRecipes", but bad practice
                    $scope.recipyList.push(value);
                }
            });
            console.log($scope.recipyList);
            alert("success");
        }).error(function(data) {
            alert("error");
        });


    $scope.filterRecipes = function(recipe){
        return recipe.type === "AwesomeRecipe";
    };


    $scope.categoryList = ["Starter", "Main Course", "Dessert"];
    $scope.cuisineList = ["African","Asian","European","NorthAmerican", "Oceanian", "SouthAmerican"];
    $scope.timeList = ["15 min","30 min","45 min","1 hour", "1½ hour","2 hours","3 hours", "+4 hours"];

    $scope.recipyList = [];

    $scope.dummyRecipes = [
        {name: "Pizza", link: "http://www.fanzyrecipes.com/pizza", category: "Main Course", description: "Nice 'n' easy"},
        {name: "Burger", link: "http://www.fanzyrecipes.com/burger", category: "Main Course", description: "Nice 'n' easy"},
        {name: "Ice Cream", link: "http://www.fanzyrecipes.com/icecream", category: "Dessert", description: "Nice 'n' easy"}
    ];
});