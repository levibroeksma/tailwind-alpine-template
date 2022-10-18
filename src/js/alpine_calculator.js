"use strict";

document.addEventListener("alpine:init", () => {
   Alpine.data("calculatorData", () => ({
      // Variables

      output: 0,
      counter: 0,
      myChart: null,
      amount_of_years: [1, 5, 10, 15, 20, 25, 30, 35, 40],
      payout_frequencies: ["day", "week", "month", "year"],
      selected_frequency: [],

      value_arr: [],
      label_arr: [],

      form: {
         amount_coins: 1.00000000,
         interest_rate: 3.00,
         duration: 1,
         interest_payout_frequency: 'year',
         deviation: 0
      },

      show: {
         calculator: true,
         results: false,
         chart: false
      },

      init() {

      },

      buildChart(period) {

         if (this.selected_frequency === 'year') {
            // waardes om te ontvangen
            for (let i = 0; i < this.value_arr.length; i++) {
               if (i === 0) {
                  this.label_arr.push('start')
               } else {
                  this.label_arr.push(`year ${i}`);
               };
            };
         } else if (this.selected_frequency === 'month') {
            // waardes om te ontvangen
            for (let i = 0; i < this.value_arr.length; i++) {
               if (i === 0) {
                  this.label_arr.push('start')
               } else {
                  this.label_arr.push(`${i} month(s)`);
               };
            };
         } else if (this.selected_frequency === 'week') {
            // waardes om te ontvangen
            for (let i = 0; i < this.value_arr.length; i++) {
               if (i === 0) {
                  this.label_arr.push('start')
               } else {
                  this.label_arr.push(`${i} week(s)`);
               };
            };
         } else if (this.selected_frequency === 'day') {
            // waardes om te ontvangen
            for (let i = 0; i < this.value_arr.length; i++) {
               if (i === 0) {
                  this.label_arr.push('start')
               } else {
                  this.label_arr.push(`${i} day(s)`);
               };
            };
         }


         const data = {
            labels: this.label_arr,
            datasets: [{
               label: '# increase of coins',
               data: this.value_arr,
               backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
               ],
               borderColor: [
                  'rgba(255, 99, 132, 1)'
               ],
               borderWidth: 1
            }]
         };

         const config = {
            type: 'line',
            data: data,
            options: {}
         };

         if (this.label_arr.length !== this.value_arr.length) return;
         // Initiate chart
         this.myChart = new Chart(
            document.getElementById('myChart'),
            config
         );

         this.show.chart = true;
      },

      destroyChart() {
         if (this.myChart !== null) {
            this.myChart.destroy();
            this.myChart = null;
         };
      },

      handleCalculations(data_obj) {
         // Check if value is correct
         const payout_periods_allowed = ["year", "month", "week", "day"];
         if (data_obj && !payout_periods_allowed.includes(data_obj.interest_payout_frequency)) return;
         this.selected_frequency = data_obj.interest_payout_frequency;
         //
         const results = this.calculateInterest(data_obj);
         this.showResults(results.Coins);

         // FIXME: fix that if deviation level is there you run code 3 times with different value of interest

      },

      submit() {
         // Format inputs correctly
         this.form.amount_coins = parseFloat(this.form.amount_coins);
         this.form.interest_rate = parseFloat(this.form.interest_rate);
         this.form.duration = parseInt(this.form.duration);
         this.form.deviation = parseInt(this.form.deviation);
         // initiate calculations
         this.handleCalculations(this.form);

      },

      calculateInterest(data_obj) {
         if (!data_obj) return;

         try {
            this.output = data_obj.amount_coins;

            let period_multiplier;
            switch (data_obj.interest_payout_frequency) {
               case 'year':
                  const muliplier_year = data_obj.interest_rate / 100 + 1;
                  this.value_arr = [];

                  for (let i = 0; i < data_obj.duration; i++) {
                     this.output = this.output * muliplier_year;
                     this.value_arr.push(this.output);
                  };

                  // add start amount to array for chart
                  this.value_arr.splice(0, 0, data_obj.amount_coins);

                  this.buildChart(data_obj.interest_payout_frequency);

                  return { 'Coins': this.output, 'period': data_obj.duration };

               // TODO: Boven is klaar, onder moet gedaan worden.
               case 'month':
                  const per_month = (data_obj.interest_rate / 100) / 12;
                  const multiplier_per_month = per_month + 1;
                  this.value_arr = [];

                  period_multiplier = data_obj.duration * 12;

                  for (let i = 0; i < period_multiplier; i++) {
                     this.output = this.output * multiplier_per_month;
                     this.value_arr.push(this.output);
                  };
                  console.log(this.value_arr);

                  this.value_arr.splice(0, 0, data_obj.amount_coins);
                  this.buildChart(data_obj.interest_payout_frequency);

                  return { 'Coins': this.output, 'period': data_obj.duration };

               case 'week':
                  const per_week = (data_obj.interest_rate / 100) / 52;
                  const multiplier_per_week = per_week + 1;

                  period_multiplier = data_obj.duration * 52;

                  for (let i = 0; i < period_multiplier; i++) {
                     this.output = this.output * multiplier_per_week;
                  };

                  return { 'Coins': this.output, 'period': data_obj.duration };

               case 'day':
                  const per_day = (data_obj.interest_rate / 100) / 365;
                  const multiplier_per_day = per_day + 1;

                  period_multiplier = data_obj.duration * 365;

                  for (let i = 0; i < period_multiplier; i++) {
                     this.output = this.output * multiplier_per_day;
                  };

                  return { 'coins': this.output, 'period': data_obj.duration };

               default:
                  break;
            }

         } catch (e) {
            console.error(e);
         }
      },

      showResults(result) {
         this.show.results = true;
         this.show.calculator = false;
         this.counter = 0;
         const calculation = setInterval(() => {
            this.counter += 1;
         }, 5);

         setTimeout(() => {
            clearInterval(calculation);
            this.counter = result.toFixed(8);
         }, 1000);
      },

      resetCalculator() {
         this.destroyChart();
         this.show.results = false;
         this.show.calculator = true;
         this.show.chart = false;
         this.label_arr = [];
      }

   }));
});