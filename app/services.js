
angular.module("randomRecipe").factory("recipeAPIService",function($q, $resource){

    var recipes = [];

    var recipeResource = $resource(
        "http://angularkea2.azurewebsites.net/api/internships/:id", // Christian Kirschberg
        //"http://kearecipeapi.herokuapp.com/recipes/:id", // Node gruppe
        //"https://fast-garden-76696.herokuapp.com/customers/:id",
        {id:'@id'},
        {
            'update': {method: 'PUT'}
        }
    );

    return{
        getRecipes : function(){
            var deferred = $q.defer();
            recipeResource.query(function(data){
                recipes = data;
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        },
        getRecipe : function(recipe_id){
            var deferred = $q.defer();
            recipeResource.get(recipe_id, function(data){
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        },
        createRecipe : function(recipe){
            var deferred = $q.defer();
            recipeResource.save(recipe, function(data){
                recipes.push(recipe);
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        },
        updateRecipe : function(recipe){
            var deferred = $q.defer();
            new recipeResource(recipe).$update({id: recipe._id}, function(data){
                recipes.push(recipe);
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        },
        deleteRecipe : function(recipe_id){
            var deferred = $q.defer();
            recipeResource.delete(recipe, function(data){
                deferred.resolve(data);
                recipes.push(recipe);
            }, function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
});
