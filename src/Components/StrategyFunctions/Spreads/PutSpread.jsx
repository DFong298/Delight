import React, { useState } from 'react';
import axios from 'axios';
import './Spread.css';


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
    const [maxLoss, setMaxLoss] = useState('');
    const [maxProfit, setMaxProfit] = useState('');
    const [data, setData] = useState(null);



    const handleSubmit = async (event) => {
        event.preventDefault();
        var options = {
            method: 'GET',
            url: 'https://yfapi.net/v7/finance/options/' + ticker,
            params: {},
            headers: {
              'x-api-key': process.env.REACT_APP_DELIGHT_API_KEY
            }
          };
          
          await axios.request(options).then(function (response) {
            setData(response.data);
            setMaxLoss(100*spreadMaxLoss(highStrike, lowStrike, data.optionChain.result[0].options[0].puts).toFixed(2))
            setMaxProfit(100*putSpreadProfit(highStrike, lowStrike, data.optionChain.result[0].options[0].puts).toFixed(2))
          }).catch(function (error) {
            console.error(error);
          });
    }

    return (
        <div>
            <div className='page-box'>
            <div className='spread-title'>Bear Put Spread</div>
            <div className='option-bought'>Strike of Put:</div>
                <>
                <form onSubmit={handleSubmit}>
                    <label className='spread-ticker-label'>Ticker
                        <div className='spread-line'></div>
                        <input
                        type='text'
                        className='spread-input'
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}/>
                    </label>
                    <label className='spread-low-strike'> &#160;&#160;Bought
                        <div className='spread-line'></div>
                        <input
                        type='text'
                        className='spread-input'
                        value={highStrike}
                        onChange={(e) => setHigh(e.target.value)}/>
                    </label>
                    <label className='spread-high-strike'><div className='sold'>Sold</div>
                        <div className='spread-line'></div>
                        <input
                        type='text'
                        className='spread-input'
                        value={lowStrike}
                        onChange={(e) => setLow(e.target.value)}/>
                    </label>
                    <button className='spread-submit' type='submit'>Calculate</button>
                </form>
                    <div className='spread-gain'>
                        <div className='spread-green-line'></div>
                        <div className='spread-gain-text'>Max Profit</div>
                        <div className='spread-max-profit'>{maxProfit}</div>
                    </div>
                    <div className='spread-loss'>
                        <div className='spread-red-line'></div>
                        <div className='spread-loss-text'>Max Loss</div>
                        <div className='spread-max-loss'>{maxLoss}</div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default PutSpread;
