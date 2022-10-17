"use strict";

document.addEventListener("alpine:init", () => {
   Alpine.data("alpineMain", () => ({
      // Variables
      counter: 0,
      show: {
         calculator: true,
         results: false,
      },

      init() {
         this.welcome();
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

      // Functions
      welcome() {
         console.log(`Welcome to  ${app_config.name}, version ${app_config.version}. This application is brought to you by ${app_config.author}.`);
      }
   }))
})