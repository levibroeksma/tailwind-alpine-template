"use strict";

document.addEventListener("alpine:init", () => {
   Alpine.data("calculatorData", () => ({
      // Variables

      output: 0,

      init() {
         this.handleCalculations(192, 'cosmos', 'year', 1, 10.16, 2, 'euros')
      },

      handleCalculations(coins, coin_name, interest_payout_period, investment_duration, interest_rate, deviation) {
         const payout_periods_allowed = ["year", "month", "week", "day"];
         if (!payout_periods_allowed.includes(interest_payout_period)) return;

         const data_obj = {
            total_coins: coins,
            coin_name: coin_name,
            incremation_period: interest_payout_period,
            duration: investment_duration,
            interest_rate: interest_rate,
            deviation: deviation,
         };

         console.log(data_obj);

         console.log(' >> ', this.calculateInterest(data_obj));

      },

      submit() {

      },

      calculateInterest(data_obj) {
         if (!data_obj) return;
         this.output = data_obj.total_coins;
         let period_multiplier;
         switch (data_obj.incremation_period) {
            case 'year':
               const muliplier_year = data_obj.interest_rate / 100 + 1;

               for (let i = 0; i < data_obj.duration; i++) {
                  this.output = this.output * muliplier_year;
               }
               return { 'Output jaarlijkse uitbetaling': this.output }

            case 'month':
               const per_month = (data_obj.interest_rate / 100) / 12;
               const multiplier_per_month = per_month + 1;

               period_multiplier = data_obj.duration * 12;

               for (let i = 0; i < period_multiplier; i++) {
                  this.output = this.output * multiplier_per_month;
               }
               
               return { 'Output maandelijkse uitbetaling': this.output };

            case 'week': 
               const per_week = (data_obj.interest_rate / 100) / 52;
               const multiplier_per_week = per_week + 1 ;

               period_multiplier = data_obj.duration * 52;

               for (let i = 0; i < period_multiplier; i++) {
                  this.output = this.output * multiplier_per_week;
               }

               return { 'Output weekelijkse uitbetaling': this.output };

            case 'day': 
               const per_day = (data_obj.interest_rate / 100) / 365;
               const multiplier_per_day = per_day + 1 ;

               period_multiplier = data_obj.duration * 365;

               for (let i = 0; i < period_multiplier; i++) {
                  this.output = this.output * multiplier_per_day;
               }

               return { 'Output weekelijkse uitbetaling': this.output };

            default:
               break;
         }
      }




   }))
})