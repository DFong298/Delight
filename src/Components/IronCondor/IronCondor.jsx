import React, { useEffect, useState } from 'react';
import axios from 'axios';

const condorPremium = (longCall, shortCall, longPut, shortPut, calls, puts) => {
    if (puts){
        var longPutIndex = 0;
        var shortPutIndex = 0;
        for (var i = 0; i < puts.length; i++){
            if (puts[i].strike == longPut){
                longPutIndex = i;
                break;
            }
        }
        for (var i = 0; i < puts.length; i++){
            if (puts[i].strike == shortPut){
                shortPutIndex = i;
                break;
            }
        }
    }
    if(calls){
        var longCallIndex = 0;
        var shortCallIndex = 0;
        for (var i = 0; i < calls.length; i++){
            if (calls[i].strike == longCall){
                longCallIndex = i;
                break
            }
        }
        for (var i = 0; i < calls.length; i++){
            if (calls[i].strike == shortCall){
                shortCallIndex = i;
                break
            }
        }
    }
    return ((calls[shortCallIndex].lastPrice - calls[longCallIndex].lastPrice) + (puts[shortPutIndex].lastPrice - puts[longPutIndex].lastPrice))
}

const maxLoss = (longCall, shortCall, longPut, shortPut, calls, puts) => {
    var premium = condorPremium(longCall, shortCall, longPut, shortPut, calls, puts);
    return (longCall - shortCall - premium);
}

const breakEvenCall = (longCall, shortCall, longPut, shortPut, calls, puts) => {
    var premium = condorPremium(longCall, shortCall, longPut, shortPut, calls, puts);
    return (+shortCall + +premium);
}

const breakEvenPut = (longCall, shortCall, longPut, shortPut, calls, puts) => {
    var premium = condorPremium(longCall, shortCall, longPut, shortPut, calls, puts);
    return (shortPut - premium);
}

const IronCondor = () => {
    const [ticker, setTicker] = useState('');
    const [shortPutStrike, setShortPut] = useState('');
    const [longPutStrike, setLongPut] = useState('');
    const [shortCallStrike, setShortCall] = useState('');
    const [longCallStrike, setLongCall] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {if (data != null){
        var callData = data.optionChain.result[0].options[0].calls;
        var putData = data.optionChain.result[0].options[0].puts;
        console.log(callData);
        console.log(putData);
        console.log("Your break even prices are: " + breakEvenPut(longCallStrike, shortCallStrike, longPutStrike, shortPutStrike, callData, putData) + " and " + breakEvenCall(longCallStrike, shortCallStrike, longPutStrike, shortPutStrike, callData, putData));
        console.log("Your maximum loss is: " + maxLoss(longCallStrike, shortCallStrike, longPutStrike, shortPutStrike, callData, putData));
        console.log("Your maximum profit is: " + condorPremium(longCallStrike, shortCallStrike, longPutStrike, shortPutStrike, callData, putData));
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
            <label> Short Put Strike Price: 
                <input
                type='number'
                placeholder='Enter Strike Price'
                value={shortPutStrike}
                onChange={(e) => setShortPut(e.target.value)}/>
            </label>
            <label>Long Put Strike Price:
                <input
                type='number'
                placeholder='Enter Strike Price'
                value={longPutStrike}
                onChange={(e) => setLongPut(e.target.value)}/>
            </label>
            <label>Short Call Strike Price:
                <input
                type='number'
                placeholder='Enter Strike Price'
                value={shortCallStrike}
                onChange={(e) => setShortCall(e.target.value)}/>
            </label>
            <label>Long Call Strike Price:
                <input
                type='number'
                placeholder='Enter Strike Price'
                value={longCallStrike}
                onChange={(e) => setLongCall(e.target.value)}/>
            </label>
            <input type='submit' value='Calculate P/L and BE Price'/>
        </form>
    )
    
}

export default IronCondor;
