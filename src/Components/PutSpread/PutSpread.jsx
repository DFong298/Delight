import React, { useEffect, useState } from 'react';
import axios from 'axios';

const putSpreadProfit = (highStrike, lowStrike, puts) => {
    if (puts){
        var highIndex = 0;
        for (var i=0; i < puts.length; i++){
            if (puts[i].strike == highStrike){
                highIndex = i;
                break;
            }
        }
        var lowIndex = puts.length - 1;
        for (var i=0; i < puts.length; i++){
            if (puts[i].strike == lowStrike){
                lowIndex = i;
                break;
            }
        }

        var spreadWidth = highStrike - lowStrike;
        var premiumSpent = puts[highIndex].lastPrice - puts[lowIndex].lastPrice;
        return (spreadWidth - premiumSpent);
    }
}

const spreadMaxLoss = (highStrike, lowStrike, puts) => {
    if (puts){
        var highIndex = 0;
        for (var i=0; i < puts.length; i++){
            if (puts[i].strike == highStrike){
                highIndex = i;
                break;
            }
        }
        var lowIndex = puts.length - 1;
        for (var i=0; i < puts.length; i++){
            if (puts[i].strike == lowStrike){
                lowIndex = i;
                break;
            }
        }

        var premiumSpent = puts[highIndex].lastPrice - puts[lowIndex].lastPrice;
        return premiumSpent;
    }
}

const PutSpread = () =>{
    const [ticker, setTicker] = useState('');
    const [lowStrike, setLow] = useState('');
    const [highStrike, setHigh] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {if (data != null){
        console.log("Your maximum profit is: " + putSpreadProfit(highStrike, lowStrike, data.optionChain.result[0].options[0].puts));
        console.log("Your maximum loss is: " + spreadMaxLoss(highStrike, lowStrike, data.optionChain.result[0].options[0].puts));
    }}, [data])

    const handleSubmit = async (event) => {
        event.preventDefault();
        var options = {
            method: 'GET',
            url: 'https://yfapi.net/v7/finance/options/' + ticker,
            params: {},
            headers: {
              'x-api-key': 'Z0vg8MtmfgC9Cp5J7wCJ70DHAf7hBQB2f6KwgDje'
            }
          };
          
          await axios.request(options).then(function (response) {
            setData(response.data);
          }).catch(function (error) {
            console.error(error);
          });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Ticker:
                <input
                type='text'
                placeholder='Enter Stock Ticker'
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}/>
            </label>
            <label>Higher Strike Price:
                <input
                type='number'
                placeholder='Enter Strike Price'
                value={highStrike}
                onChange={(e) => setHigh(e.target.value)}/>
            </label>
            <label>Lower Strike Price:
                <input
                type='number'
                placeholder='Enter Strike Price'
                value={lowStrike}
                onChange={(e) => setLow(e.target.value)}/>
            </label>
            <input type='submit' value='Calculate Put Spread P/L'/>
        </form>
    )
}

export default PutSpread;
