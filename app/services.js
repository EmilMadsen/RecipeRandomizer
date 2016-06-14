
angular.module("randomRecipe")
    .factory("recipeAPIService",function($q, $resource){

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
            deferred = $q.defer();//defer lover at returnere noget når den får svar fra API
            recipeResource.query(function(data){ //hvis succes fra API kald
                recipes = data; //gemmes i lokalt array
                deferred.resolve(data); //sender det modtagede data retur
            }, function(error){ //hvis error fra API kald
                deferred.reject(error);
            });
            return deferred.promise; //returnerer promise til controlleren, succes eller erro
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
            deferred = $q.defer();//lover at returnere noget senere, error eller data

            if(recipe._id === undefined) //hvis id undefined = new recipe
            {
                recipeResource.save(recipe, function(data){ //kalder API save metoden
                    console.log("Object returned from create");
                    console.log(data);
                    recipe._id = data.id; //id created fra databasen gemmes i recipe._id
                    recipes.push(recipe); //tilføjer recipe til lokalt array recipes
                    deferred.resolve(data); //returnerer recipe til controlleren
                }, function(error){
                    deferred.reject(error);//returnerer error hvis rejected
                });
            } else
            {
                //Anmoder API om at opdatere recipe med valgt id via ovenfor definerede update metode.
                new recipeResource(recipe).$update({id: recipe._id}, function(data){
                    for(var i = 0; i < recipes.length; i++)
                    {
                        if (recipes[i]._id === recipe._id )
                        {
                            recipes[i] = recipe;
                        }
                    }
                    deferred.resolve(data);// sætter det lovede data
                }, function(error){
                    deferred.reject(error);//sætter error hvis rejected
                });
            }
            return deferred.promise; //returnerer som lovet data eller error
        },
        deleteRecipe : function(recipe){
            deferred = $q.defer();
            recipeResource.delete({id: recipe._id}, function(data){
                var index = recipes.indexOf(recipe._id)-1; // Finder objektets placering i listen
                recipes.splice(index ,1);
                deferred.resolve(recipes);
            }, function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
});
