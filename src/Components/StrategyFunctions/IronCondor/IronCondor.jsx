import React, { useState } from 'react';
import axios from 'axios';
import './IronCondor.css';

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

const calcMaxLoss = (longCall, shortCall, longPut, shortPut, calls, puts) => {
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
    const [highBE, setHighBE] = useState('');
    const [lowBE, setLowBE] = useState('');
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
            setHighBE(breakEvenCall(longCallStrike, shortCallStrike, longPutStrike, shortPutStrike, data.optionChain.result[0].options[0].calls, data.optionChain.result[0].options[0].puts).toFixed(2));
            setLowBE(breakEvenPut(longCallStrike, shortCallStrike, longPutStrike, shortPutStrike, data.optionChain.result[0].options[0].calls, data.optionChain.result[0].options[0].puts).toFixed(2));
            setMaxLoss((100*calcMaxLoss(longCallStrike, shortCallStrike, longPutStrike, shortPutStrike, data.optionChain.result[0].options[0].calls, data.optionChain.result[0].options[0].puts)).toFixed(2));
            setMaxProfit((100*condorPremium(longCallStrike, shortCallStrike, longPutStrike, shortPutStrike, data.optionChain.result[0].options[0].calls, data.optionChain.result[0].options[0].puts)).toFixed(2));
          }).catch(function (error) {
            console.error(error);
          });
    }


    return (
        <div>
            <div className='page-box'>
                <div className='condor-title'>Iron Condor</div>
                <div className='condor-calls'>Strike of Calls:</div>
                <div className='condor-puts'>Strike of Puts:</div>
                <form onSubmit={handleSubmit}>
                    <label className='ticker-label'><div className='label'>Ticker</div>
                        <div className='condor-line'></div>
                        <input
                        type='text'
                        className='condor-input'
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}/>
                    </label>
                    <label className='long-put-label'><div className='label'>Bought</div>
                        <div className='condor-line'></div>
                        <input
                        type='text'
                        className='condor-input'
                        value={longPutStrike}
                        onChange={(e) => setLongPut(e.target.value)}/>
                    </label>
                    <label className='short-put-label'><div className='label'>Sold</div>
                        <div className='condor-line'></div>
                        <input
                        type='text'
                        className='condor-input'
                        value={shortPutStrike}
                        onChange={(e) => setShortPut(e.target.value)}/>
                    </label>
                    <label className='long-call-label'><div className='label'>Bought</div>
                        <div className='condor-line'></div>
                        <input
                        type='text'
                        className='condor-input'
                        value={longCallStrike}
                        onChange={(e) => setLongCall(e.target.value)}/>
                    </label>
                    <label className='short-call-label'><div className='label'>Sold</div>
                        <div className='condor-line'></div>
                        <input
                        type='text'
                        className='condor-input'
                        value={shortCallStrike}
                        onChange={(e) => setShortCall(e.target.value)}/>
                    </label>
                    <button type='submit' className='condor-submit'>Calculate</button>
                </form>
                <div className='condor-profit'>
                    <div className='condor-green-line'></div>
                    <div className='condor-gain-text'>Max Profit</div>
                    <div className='condor-max-profit'>{maxProfit}</div>
                </div>
                <div className='condor-loss'>
                    <div className='condor-red-line'></div>
                    <div className='condor-loss-text'>Max Loss</div>
                    <div className='condor-max-loss'>{maxLoss}</div>
                </div>
                <div className='condor-BE'>
                    <div className='condor-BE-line'></div>
                    <div className='condor-BE-text'>Break Evens</div>
                    <div className='condor-BE-prices'>{lowBE}|{highBE}</div>
                </div>
                </div>
        </div>
    )
    
}

export default IronCondor;
