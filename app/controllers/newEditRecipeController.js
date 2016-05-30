angular.module("randomRecipe")
    .controller("newEditRecipeController", function($scope, $state, $stateParams, recipeAPIService){ //Dependencies injections

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

           // $scope.recipe.type = "AwesomeRecipe";

            recipeAPIService.saveRecipe($scope.recipe).then(function(data){
                console.log("Recipe: " + $scope.recipe.name + " is saved");
                //allRecipes = recipeAPIService.allRecipes;
                $state.go("manage-recipes.all")
            },function(error){
                alert("error : " + error);
            });
        }
        else{
            console.log("Form not Valid")
        }
    };

    $scope.deleteRecipe = function(){
        recipeAPIService.deleteRecipe($scope.recipe).then(function(data){
            $scope.$parent.allRecipes = data;
            console.log("Wierd list from API ----")
            console.log(recipeAPIService.allRecipes);
            $state.go("manage-recipes.all")
        },function(error){
            alert("error : " + error)
        })
    }
});