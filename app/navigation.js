angular.module('randomRecipe')
    .config(function($stateProvider, $urlRouterProvider){

    console.log("In Navigation!");

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home', //part of the url url in browser, #/
        templateUrl: 'app/partials/home.html' //partial view here
    });

    $stateProvider.state('random', {
        url: '/random-recipe', //part of the url url in browser, #/
        templateUrl: 'app/partials/random-recipe.html' //partial view here
    });

    $stateProvider.state('week', {
        url: '/random-week', //part of the url url in browser, #/
        templateUrl: 'app/partials/recipe-week.html' //partial view here
    });

    //overordnet sub view til to yderligere subviews (nested subviews)
    $stateProvider.state('manage-recipes', {
        url: '/manage-recipes', //part of the url url in browser, #/
        templateUrl: 'app/partials/manage-recipes.html' //partial view here
    });

    $stateProvider.state('manage-recipes.new', {
        url: '/new',
        templateUrl: 'app/partials/recipe-form.html',
        controller: 'newEditRecipeController',//
        params: { recipeParameter: null }//sættes til null når der klikkes på new recipe - så tidligere parametre ikke kommer med.
    });

    $stateProvider.state('manage-recipes.all', {
        url: '/all',
        templateUrl: 'app/partials/all-recipes.html'
    });


    //.state('new-internship.a', {
    //    url: '/a',
    //    templateUrl: 'myHtmlFileA.html',
    //})
    //
    //.state('new-internship.b', {
    //    url: '/b',
    //    templateUrl: 'myHtmlFileB.html',
    //})


});