import React, { useState } from 'react'
import axios from 'axios'
import './Spread.css'

const callSpreadProfit = (lowStrike, highStrike, calls) => {
  if (calls){
    var lowIndex = 0;
    for (var i=0; i < calls.length; i++){
      if (calls[i].strike == lowStrike){
        lowIndex = i;
        break
      }
    }
    var highIndex = calls.length - 1;
    for (var i=0; i < calls.length; i++){
      if (calls[i].strike == highStrike){
        highIndex = i;
        break
      }
    }

    var spreadWidth = highStrike - lowStrike;
    var premiumSpent = calls[lowIndex].lastPrice - calls[highIndex].lastPrice;
    return (spreadWidth - premiumSpent);
  }
}

const spreadMaxLoss = (lowStrike, highStrike, calls) => {
  if (calls){
    var lowIndex = 0;
    for (var i=0; i < calls.length; i++){
      if (calls[i].strike == lowStrike){
        lowIndex = i;
        break
      }
    }
    var highIndex = calls.length - 1;
    for (var i=0; i < calls.length; i++){
      if (calls[i].strike == highStrike){
        highIndex = i;
        break
      }
  }
  
  var premiumSpent = calls[lowIndex].lastPrice - calls[highIndex].lastPrice;
  return premiumSpent;
}
}

const CallSpread = () => {
    const [ticker, setTicker] = useState('')
    const [lowStrike, setLow] = useState('')
    const [highStrike, setHigh] = useState('')
    const [maxLoss, setMaxLoss] = useState('')
    const [maxProfit, setMaxProfit] = useState('')
    const [data, setData] = useState(null)

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
          setMaxLoss(100*spreadMaxLoss(lowStrike, highStrike, data.optionChain.result[0].options[0].calls).toFixed(2))
          setMaxProfit(100*callSpreadProfit(lowStrike, highStrike, data.optionChain.result[0].options[0].calls).toFixed(2))
        }).catch(function (error) {
          console.error(error);
        });


    }

    return (
      <div>    
        <div className='page-box'>
        <div className='spread-title'>Bull Call Spread</div>
        <div className='option-bought'>Strike of Call:</div>
        <>
          <form onSubmit={handleSubmit}>
              <label className='spread-ticker-label'>Ticker
                <div className='spread-line'></div>
                  <input 
                  className='spread-input'
                  type='text' 
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}/>
              </label>
            
              <label className='spread-low-strike'>&#160;&#160;Bought
                <div className='spread-line'></div>
                <input
                className='spread-input'
                type='text'
                value={lowStrike}
                onChange={(e) => setLow(e.target.value)}/>
              </label>

              <label className='spread-high-strike'><div className='sold'>Sold</div>
                <div className='spread-line'></div>
                <input
                className='spread-input'
                type='text'
                value={highStrike}
                onChange={(e) => setHigh(e.target.value)}/>
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

export default CallSpread
