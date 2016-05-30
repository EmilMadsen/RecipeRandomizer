
angular.module("randomRecipe").factory("recipeAPIService",function($q, $resource){

    var recipes = [];
    var deferred;

    var recipeResource = $resource(
        //"http://angularkea2.azurewebsites.net/api/internships/:id", // Christian Kirschbergs API
        "http://kearecipeapi.herokuapp.com/recipes/:id", // Node gruppe

        {id:'@id'},
        {
            'update': {method: 'PUT'} //definerer vores egen update metode fordi den ikke findes i ressource
        }
    );

    return{
        getRecipes : function(){
            deferred = $q.defer();
            recipeResource.query(function(data){
                recipes = data;
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        },
        getRecipe : function(recipe_id){
            deferred = $q.defer();
            recipeResource.get(recipe_id, function(data){
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        },
        saveRecipe : function(recipe){
            deferred = $q.defer();

            if(recipe._id === undefined)
            {
                recipeResource.save(recipe, function(data){
                    recipe._id = data._id;
                    recipes.push(recipe);
                    deferred.resolve(data);
                }, function(error){
                    deferred.reject(error);
                });
            } else
            {
                new recipeResource(recipe).$update({id: recipe._id}, function(data){
                    for(var i = 0; i < recipes.length; i++)
                    {
                        if (recipes[i]._id === recipe._id )
                        {
                            recipes[i] = recipe;
                        }
                    }
                    deferred.resolve(data);
                }, function(error){
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        },
        deleteRecipe : function(recipe){
            deferred = $q.defer();
            recipeResource.delete({id: recipe._id}, function(data){
                var index = recipes.indexOf(recipe._id); // Finder objektets placering i listen
                recipes.splice(index - 1 ,1); // minus index med 1, da "splice" metoden er nul index'eret
                deferred.resolve(recipes);
            }, function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
});
