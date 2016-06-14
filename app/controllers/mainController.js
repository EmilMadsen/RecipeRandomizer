
angular.module("randomRecipe")
    .controller("mainController", function($scope, $state, recipeAPIService) {
    console.log("In Maincontroller!");

    $scope.allRecipes = [];
    $scope.randomRecipeId = {};
    //array af Strings til dropdown menuerne i recipe-form
    $scope.categoryList = ["Starter", "Main Course", "Dessert"];
    $scope.cuisineList = ["African","Asian","European","NorthAmerican", "Oceanian", "SouthAmerican"];
    $scope.timeList = ["15 min","30 min","45 min","1 hour", "1½ hour","2 hours","3 hours", "+4 hours"];

    //anmoder service om at hente alle recipe fra API'et
    recipeAPIService.getRecipes().then(function(recipes){

        console.log("Data Retrieved from API");

        $scope.allRecipes = recipes; //gemmer recipes i allRecipes

    },function(error){
        alert("error - Could not retrieve data from database");//pop-up med fejlmeddelelse
    });

    // Navigate to edit, by clicking on a recipe in the table (locally)
    $scope.editRecipe = function(recipeCopy){
        //Navigerer til edit view og giver kopi af klikket recipe som parameter
        $state.go("manage-recipes.new", {recipeParameter: angular.copy(recipeCopy)})
    };

    //returnerer true hvis id passer
    $scope.filterRandomRecipes = function(recipe){
        return recipe._id === $scope.randomRecipeId;
    };

    //udvælger tilfældig recipe udfra position i array og gemmer id
    $scope.getRandomRecipe = function(){
        var randomRecipeNumber = Math.floor(Math.random() * $scope.allRecipes.length);
        var currentNumber = 0;
        console.log("We are getting a random Recipe");
        angular.forEach($scope.allRecipes, function(value){
            if (currentNumber === randomRecipeNumber){
                $scope.randomRecipeId = value._id;
            }
            currentNumber++;
        });
    };
});