"use strict";

document.addEventListener("alpine:init", () => {
    Alpine.data("alpineMain", () => ({
        // Variables
        counter: 0,
        init() {
            this.test("Levi Broeksma")
        },

        // Functions
        test(name) {
            console.log(`Welcome, this is a template build by ${name}`)
        }
    }))
})