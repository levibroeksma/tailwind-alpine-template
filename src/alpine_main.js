"use strict";
document.addEventListener("alpine:init", () => {
   Alpine.data("alpineMain", () => ({
      // Variables
      counter: 0,


      init() {
         this.showResults()
      },

      showResults() {
         const calculation = setInterval( () => {
            this.counter += 1;
         }, 5);

         setTimeout(() => {
            clearInterval(calculation);
            this.counter = 220.14;
         }, 1000);
      },


   }))
})