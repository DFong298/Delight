import React from 'react'
import './Strategies.css'
import callSpread from '../../../Assets/callSpread.png'
import putSpread from '../../../Assets/putSpread.png'
import pCollar from '../../../Assets/pCollar.png'
import Condor from '../../../Assets/Condor.png'

const Strategies = () => {
    return (
        <div className='strats'>
            <div className='strat-page'>
                <h1 className='strat-title'>Options Strategies</h1>
                <br></br>
                <h2 className='sub-header'>Bull Call Spread</h2>
                <br></br>
                <div className='main-text'>
                    A bull call spread is when a trader buys an out-of-the-money (OTM) call option on a stock, and sells another call option that is even 
                    further OTM. The call that is sold reduces the total premium spent, but it also limits the upside profit. This strategy is used when the trader has a bullish sentiment
                    on the underlying. The maximum profit from this strategy is capped by the call that is sold, and the maximum loss is simply the total premium spent after buying and 
                    selling the calls.
                </div>
                <br></br>
                <br></br>
                <div className='chart-container'>
                <img className='chart' src={callSpread} alt='Chart showing the bull call spread'/>
                </div>
                <br></br>
                <h2 className='sub-header'>Bear Put Spread</h2>
                <br></br>
                <div className='main-text'> 
                    A put call spread is when a trader buys an out-of-the-money (OTM) put option on a stock, and sells another put option that is even
                    further OTM. The put sold reduces the premium total spent, but also bottlenecks the maximum profit. This strategy is used when the trader expects a moderate decline
                    in the underlying's price. The maximum loss is simply the total premium spent after buying and selling the puts.
                </div>
                <br></br>
                <div className='chart-container'>
                <img className='chart' src={putSpread} alt='Chart showing the bear put spread'/>
                </div>
                <br></br>
                <h2 className='sub-header'>Protective Collar</h2>
                <br></br>
                <div className='main-text'>
                    A protective collar is when a trader buys an out-of-the-money (OTM) put option while simultaneously selling an OTM call. This is usually used when the trader is already
                    holding the stock and has made substantial gains. The strategy protects againt a violent drop in the price, but also limits the the profits of the shares, should the price 
                    continue to skyrocket. Ideally, the premiums of the put bought and call sold are similar, so this protection has minimal cost. 
                </div>
                <br></br>
                <div className='chart-container'>
                <img className='chart' src={pCollar} alt='Chart for a protective collar'/>
                </div>
                <br></br>
                <h2 className='sub-header'>Iron Condor</h2>
                <br></br>
                <div className='main-text'>
                    An iron condor is constructed using 4 different options. The trader sells an out-of-the-money (OTM) put and an OTM call. They then buy a put and a call that is even further
                    OTM. An iron condor is used when the trader believes that the price of the underlying stock will not move much before the expiry of the options. Ideally, the spread between 
                    the two calls and the two puts are both the same. The aim is to cash in on the premium, whilst holding positions to protect against volatile movements. The maximum loss occurs
                    when the underlying stock's price moves further than the strike price of the options bought.
                </div>
                <br></br>
                <div className='chart-container'>
                <img className='chart' src={Condor} alt='Chart for an iron condor'/>
                </div>
                <br></br>
                <br></br>
                <div className='disclaimer'>
                    All images are courtesy of <a classname='strat-links' href='https://www.investopedia.com/trading/options-strategies/' target='_blank'>Investopedia</a>. I do not own any of the charts.
                </div>
            </div>
        </div>
    )
}

export default Strategies
