angular.module("randomRecipe").controller("mainController", function($scope, $state, $http) {
    console.log("In Maincontroller!");

    $scope.editRecipe = function(recipeCopy){
        $state.go("manage-recipes.new", {recipeParameter: angular.copy(recipeCopy)})
    };


    $http({method: "GET", url: "http://angularkea1.azurewebsites.net/api/internships/GetAll"})
        .success(function(data) {
            $scope.dummyRecipes = data;
            alert("success");
        }).error(function(data) {
            alert("error");
        });


    $scope.filterRecipes = function(recipe){
        return recipe.type === "AwesomeRecipe";
    }


    $scope.categoryList = ["Starter", "Main Course", "Dessert"];

    $scope.dummyRecipes = [
        {name: "Pizza", link: "http://www.fanzyrecipes.com/pizza", category: "Main Course", description: "Nice 'n' easy"},
        {name: "Burger", link: "http://www.fanzyrecipes.com/burger", category: "Main Course", description: "Nice 'n' easy"},
        {name: "Ice Cream", link: "http://www.fanzyrecipes.com/icecream", category: "Dessert", description: "Nice 'n' easy"}
    ];
});