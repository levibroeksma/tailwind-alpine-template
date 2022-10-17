"use strict";

document.addEventListener("alpine:init", () => {
   Alpine.data("alpineMain", () => ({
      // Variables
      init() {
         this.welcome();
      },

      // Functions
      welcome() {
         console.log(`Welcome to  ${app_config.name}, version ${app_config.version}. This application is brought to you by ${app_config.author}.`);
      }
   }))
})