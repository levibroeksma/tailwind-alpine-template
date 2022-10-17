// Compound interest tool

const handleCalculations = (coins, interest_payout_period, investment_duration, interest_rate, deviation, output, deposit) => {
    // In here, one function with 3 different ouputs (based on deviation) should be generated
    const min = interest_rate - deviation;
    const max = interest_rate + deviation;
    
    const low = calculateInterest(coins, interest_payout_period, investment_duration, min, deposit);
    const predicted = calculateInterest(coins, interest_payout_period,investment_duration, interest_rate, deposit);
    const high = calculateInterest(coins, interest_payout_period,investment_duration, max, deposit);

    // Below here should be a chart created to show low, expected and high prediction in case of FIAT
    // If not FIAT, only predicted should be shown since interest rate should be stable due to staking rewards.
}

const calculateInterest = (coins, interest_payout_period, investment_duration, interest_rate , deposit) => {
    // Calculation for a year
    if(!deposit) {
        switch(interest_payout_period) {
            case 'year':
                const yearly_interest = (interest_rate / 100) + 1;
                let compound_of_coins_yearly_period;

                for (let i = 0; i < investment_duration; i++) {
                    compound_of_coins_yearly_period = compound_of_coins_yearly_period * yearly_interest;
                };
                
                return compound_of_coins_yearly_period;

            case 'month':
                // Here the value of interest_payout_period = 12
                const monthly_interst = ((interest_rate / 100) / 12) + 1;
                let compound_of_coins_monthly_period = coins;
                // calcluate amount of month (12 * investment period)
                for (let i = 0; i < (12 * investment_duration); i++) {
                    compound_of_coins_monthly_period = compound_of_coins_monthly_period * monthly_interst;
                };

                return compound_of_coins_monthly_period;

            case 'week':
                // here the value of interest_payout_value = 52;
                const weekly_interest = ((interest_rate / 100) / interest_payout_period) + 1;
                let compound_of_coins_weekly_period = coins;

                for (let i = 0; i < (52 * investment_duration); i++) {
                    compound_of_coins_weekly_period = compound_of_coins_weekly_period * weekly_interest;                    
                };

                return compound_of_coins_weekly_period;
        }
    }
}