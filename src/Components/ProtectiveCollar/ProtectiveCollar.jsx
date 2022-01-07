import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    return (calls[callIndex].lastPrice - puts[putIndex].lastPrice);
}

const currentProfit = (callStrike, putStrike, calls, puts, costBasis, currentPrice) => {
    var collarPremium = calcPremium(callStrike, putStrike, calls, puts);
    return (currentPrice - costBasis + collarPremium);
}

const minProfit = (callStrike, putStrike, calls, puts, costBasis) => {
    var collarPremium = calcPremium(callStrike, putStrike, calls, puts);
    return (putStrike - costBasis + collarPremium);
}

const maxProfit = (callStrike, putStrike, calls, puts, costBasis) => {
    var collarPremium = calcPremium(callStrike, putStrike, calls, puts);
    return (callStrike - costBasis + collarPremium);
}

const ProtectiveCollar = () => {
    const [ticker, setTicker] = useState('');
    const [costBasis, setCost] = useState('');
    const [putStrike, setPut] = useState('');
    const [callStrike, setCall] = useState('');
    const [optionsData, setOptions] = useState(null);
    const [currentPrice, setPrice] = useState(null);

    useEffect(() => {if (optionsData != null && currentPrice != null){
        var callData = optionsData.optionChain.result[0].options[0].calls;
        var putData = optionsData.optionChain.result[0].options[0].puts;
        var priceData = currentPrice.quoteSummary.result[0].summaryDetail.bid.raw;
        console.log("Your current profit is: " + currentProfit(callStrike, putStrike, callData, putData, costBasis, priceData));
        console.log("Your minimum profit is: " + minProfit(callStrike, putStrike, callData, putData, costBasis));
        console.log("Your maximum profit is: " + maxProfit(callStrike, putStrike, callData, putData, costBasis));
    }}, [optionsData, currentPrice])

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
            <label> Cost Basis of Share: 
                <input
                type='number'
                placeholder='Enter Price'
                value={costBasis}
                onChange={(e) => setCost(e.target.value)}/>
            </label>
            <label>Put Strike Price:
                <input
                type='number'
                placeholder='Enter Strike Price'
                value={putStrike}
                onChange={(e) => setPut(e.target.value)}/>
            </label>
            <label>Call Strike Price:
                <input
                type='number'
                placeholder='Enter Strike Price'
                value={callStrike}
                onChange={(e) => setCall(e.target.value)}/>
            </label>
            <input type='submit' value='Calculate Profits'/>
        </form>
    )
    
}

export default ProtectiveCollar
