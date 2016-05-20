angular.module("randomRecipe")
    .filter("recipeSearch", function(){
        return function(data, search) {//data = array RetrievedInternships taking in two argument data is the array angular knows it is the retrievedInternship and search is what we search for
            console.log(data);
            console.log(search);
            //dataresult = [];


            if(search === undefined) {
                return data;
            }
            var result =
                _.filter(data, function (recipe) { //data is all our internship internship just a name

                    return recipe.name && //testing if there are initials at all
                         recipe.name.toLowerCase().indexOf(search.toLowerCase()) !== -1; //|| //initials is a string indexof returns the position of where the search is
                    //internship.student && //testing if there are initials at all
                    //internship.student.indexOf(search);
                });

            console.log(result);

            return result;

        };
    });