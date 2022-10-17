"use strict";

document.addEventListener("alpine:init", () => {
   Alpine.data("calculatorData", () => ({
      // Variables

      output: 0,
      counter: 0,

      amount_of_years: [1,5,10,15,20,25,30,35,40],
      payout_frequencies: ["day", "week", "month", "year"],

      form:{
         amount_coins: 1.00000000,
         interest_rate: 3.00,
         duration: 1,
         interest_payout_frequency: 'year',
         deviation: 0
      },

      init() {
         // this.handleCalculations(192, 'cosmos', 'year', 1, 10.16, 2, 'euros');
      },

      handleCalculations(data_obj) {
         const payout_periods_allowed = ["year", "month", "week", "day"];

         if (!payout_periods_allowed.includes(data_obj.interest_payout_frequency)) return;

         if(data_obj && data_obj.deviation === 0) {
            const results = this.calculateInterest(data_obj);
            this.showResults(results.Coins);
         }; 

         // TODO: fix that if deviation level is there you run code 3 times with different value of interest

      },

      submit() {
         this.form.amount_coins = parseFloat(this.form.amount_coins);
         this.form.interest_rate = parseFloat(this.form.interest_rate);
         this.form.duration = parseInt(this.form.duration);
         this.form.deviation = parseInt(this.form.deviation);

         // console.log(this.form);
         this.handleCalculations(this.form);
         
      },

      calculateInterest(data_obj, deviation) {
         if (!data_obj) return;

         this.output = data_obj.amount_coins;

         let period_multiplier;
         switch (data_obj.interest_payout_frequency) {
            case 'year':
               const muliplier_year = data_obj.interest_rate / 100 + 1;

               for (let i = 0; i < data_obj.duration; i++) {
                  this.output = this.output * muliplier_year;
               }
               return { 'Coins': this.output, 'period': data_obj.duration };

            case 'month':
               const per_month = (data_obj.interest_rate / 100) / 12;
               const multiplier_per_month = per_month + 1;

               period_multiplier = data_obj.duration * 12;

               for (let i = 0; i < period_multiplier; i++) {
                  this.output = this.output * multiplier_per_month;
               }
               
               return { 'Coins': this.output, 'period': data_obj.duration };

            case 'week': 
               const per_week = (data_obj.interest_rate / 100) / 52;
               const multiplier_per_week = per_week + 1 ;

               period_multiplier = data_obj.duration * 52;

               for (let i = 0; i < period_multiplier; i++) {
                  this.output = this.output * multiplier_per_week;
               }

               return { 'Coins': this.output, 'period': data_obj.duration };

            case 'day': 
               const per_day = (data_obj.interest_rate / 100) / 365;
               const multiplier_per_day = per_day + 1 ;

               period_multiplier = data_obj.duration * 365;

               for (let i = 0; i < period_multiplier; i++) {
                  this.output = this.output * multiplier_per_day;
               }

               return { 'coins': this.output, 'period': data_obj.duration };

            default:
               break;
         }
      },

      showResults(result) {
         this.show.results = true;
         this.show.calculator = false;
         this.counter = 0;
         const calculation = setInterval( () => {
            this.counter += 1;
         }, 5);

         setTimeout(() => {
            clearInterval(calculation);
            this.counter = result;
         }, 1000);
      },

      goBack() {
         this.show.results = !this.show.results;
         this.show.calculator = !this.show.calculator;
      }

   }))
})