


angular.module("randomRecipe")
    .filter("recipeSearch", function(){
        return function(data, search) {//data = array Retrieved data og search er det vi leder efter.
            console.log(data);
            console.log(search);

            if(search === undefined) { //tjekker om det der søges efter er undefined hvis ja returnes data ufiltreret
                return data;
            }
            var result =
                _.filter(data, function (recipe) { //Bruger filter metode fra Underscore JavaScript library der tager data

                    return recipe.name && //testing if there are initials at all
                         recipe.name.toLowerCase().indexOf(search.toLowerCase()) !== -1; //initials is a string indexof returns the position of where the search is
                });

            console.log(result);

            return result;

        };
    })


;