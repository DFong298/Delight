import React, { useState } from 'react';
import axios from 'axios';
import './ProtectiveCollar.css'

const calcPremium = (callStrike, putStrike, calls, puts) => {
    if (puts){
        var putIndex = 0;
        for (var i=0; i < puts.length; i++){
            if (puts[i].strike == putStrike){
                putIndex = i;
                break;
            }
        }
    }
    if (calls){
        var callIndex = 0;
        for (var i=0; i < calls.length; i++){
            if (calls[i].strike == callStrike){
                callIndex = i;
                break;
            }
        }
    }
    if (puts && calls){
        return (calls[callIndex].lastPrice - puts[putIndex].lastPrice);
    }
}

const getCurrentProfit = (callStrike, putStrike, calls, puts, costBasis, currentPrice) => {
    var collarPremium = calcPremium(callStrike, putStrike, calls, puts);
    return (currentPrice - costBasis + collarPremium);
}

const getMinProfit = (callStrike, putStrike, calls, puts, costBasis) => {
    var collarPremium = calcPremium(callStrike, putStrike, calls, puts);
    return (putStrike - costBasis + collarPremium);
}

const getMaxProfit = (callStrike, putStrike, calls, puts, costBasis) => {
    var collarPremium = calcPremium(callStrike, putStrike, calls, puts);
    return (callStrike - costBasis + collarPremium);
}

const ProtectiveCollar = () => {
    const [ticker, setTicker] = useState('');
    const [costBasis, setCost] = useState('');
    const [putStrike, setPut] = useState('');
    const [callStrike, setCall] = useState('');
    const [minProfit, setMinProfit] = useState('');
    const [maxProfit, setMaxProfit] = useState('');
    const [currentprofit, setCurrentProfit] = useState('');
    const [optionsData, setOptions] = useState(null);
    const [currentPrice, setPrice] = useState(null);


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
          
          await axios.request(options).then(function (responseOption) {
            setOptions(responseOption.data);
          }).catch(function (error) {
            console.error(error);
          });

        var stockPrice = {
            method: 'GET',
            url: 'https://yfapi.net/v11/finance/quoteSummary/' + ticker,
            params: {modules: 'summaryDetail'},
            headers: {
                'x-api-key': 'Z0vg8MtmfgC9Cp5J7wCJ70DHAf7hBQB2f6KwgDje'
            }
        };
    
        await axios.request(stockPrice).then(function (responseStock) {
            setPrice(responseStock.data);
            var callData = optionsData.optionChain.result[0].options[0].calls;
            var putData = optionsData.optionChain.result[0].options[0].puts;
            var priceData = currentPrice.quoteSummary.result[0].summaryDetail.bid.raw;
            setMinProfit((100*getMinProfit(callStrike, putStrike, callData, putData, costBasis)).toFixed(2));
            setMaxProfit((100*getMaxProfit(callStrike, putStrike, callData, putData, costBasis)).toFixed(2));
            setCurrentProfit((100*getCurrentProfit(callStrike, putStrike, callData, putData, costBasis, priceData)).toFixed(2))
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <div className='protective-collar'>
            <div className='page-box'>
            <div className='collar-title'>Protective Collar</div>
            <div className='collar-options'>Strike of Options:</div>
            <div className='cost-basis'>Cost of Shares:</div>
            <>
                <form onSubmit={handleSubmit}>
                    <label className='collar-ticker-label'>Ticker
                        <div className='collar-line'></div>
                        <input
                        type='text'
                        className='collar-input'
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}/>
                    </label>
                    <label className='collar-low-strike'> <div className='collar-option'>&#160;Put Strike Price</div>
                        <div className='collar-line'></div>
                        <input
                        type='text'
                        className='collar-input'
                        value={putStrike}
                        onChange={(e) => setPut(e.target.value)}/>
                    </label>
                    <label className='collar-high-strike'><div className='collar-option'>&#160;&#160;Call Strike Price</div>
                        <div className='collar-line'></div>
                        <input
                        type='text'
                        className='collar-input'
                        value={callStrike}
                        onChange={(e) => setCall(e.target.value)}/>
                    </label>
                    <label className='cost-basis-label'> <div className='cb-label'> Cost Basis of Share </div>
                        <div className='collar-line'></div>
                        <input
                        type='text'
                        className='collar-input'
                        value={costBasis}
                        onChange={(e) => setCost(e.target.value)}/>
                    </label>
                    <button className='collar-submit' type='submit'>Calculate</button>
                </form>
                <div className='collar-gain'>
                    <div className='collar-green-line'></div>
                    <div className='collar-gain-text'>Max Profit</div>
                    <div className='collar-max-profit'>{maxProfit}</div>
                </div>
                <div className='collar-loss'>
                    <div className='collar-red-line'></div>
                    <div className='collar-profit-text'>Min Profit</div>
                    <div className='collar-min-profit'>{minProfit}</div>
                </div>
                <div className='collar-current'>
                    <div className='collar-current-line'></div>
                    <div className='collar-current-text'>Current profit</div>
                    <div className='collar-current-profit'>{currentprofit}</div>
                </div>
                
            </>
            </div>
        </div>
    )
    
}

export default ProtectiveCollar
