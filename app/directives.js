/**
 * Created by mork on 10/05/2016.
 */
angular.module("randomRecipe") //reference to internship module
    .directive("enterToSubmit", function(){
        return function (scope, element, attrs){ //Link funktionen (scope er fra den controller der er i kontrol hvor directive indsættes)

            //Key codes - A number which represents an actual key on the keyboard
            element.bind("keydown keypress", function (event) { //element The keydown event occurs when the key is pressed, followed immediately by the keypress event. Then the keyup event is generated when the key is released.

                if(event.which === 13) {
                 scope.$apply(function (){
                     scope.$eval(attrs.enterToSubmit);
                 });

                 event.preventDefault(); //Cancel event.
                }
            });
        }
    });