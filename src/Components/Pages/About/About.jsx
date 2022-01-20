import React from 'react'
import './About.css'

const About = () => {
    return (
        <div className='about'>
            <div className='about-page'>
                <h1 className='page-title'>About</h1>
                <br></br>
                <div className='main-text'>
                    This webapp is designed for traders who wish to dive deeper into options trading and learn about ways to utilize options strategies. It calculates important 
                    variables of different strategies, such as the maximum loss/profit of a bull call spread, or the break even price for a stock in an iron condor. There are many 
                    more setups and strategies with options contracts that are not listed on this webapp, which may be added at a later date. Due to the constraints of the API used 
                    to get options data, the expiry of all options will be he nearest expiry date (usually the upcoming Friday). 
                </div>
                <br></br>
                <h2 className='sub-header'>What Are Options?</h2>
                <br></br>
                <div className='main-text'>
                    An options contract is a financial derivative (contract between two parties linked to an underlying asset) that gives the buyer the <b>right</b> to buy/sell the 
                    underlying asset at a pre-determined price, and the seller the <b>obligation</b> to sell/buy said underlying asset at the pre-determined price. The buyer must pay
                    the seller an amount of cash upfront, called the premium. The premium is determined by the value of the option, which flucuates overtime, but decreases as the date 
                    approaches expiry. For more about options, visit this article from <a className='links' href='https://www.investopedia.com/terms/o/option.asp' target='_blank' >Investopedia</a>.
                </div>
                <br></br>
                <h2 className='sub-header'>About The Dev</h2>
                <br></br>
                <div className='main-text'>
                    My name is Dennis Fong, and I am a second year student at McMaster University's Software Engineering program. I am very enthusiastic about finance and investing, and
                    am hoping to pursue a career in the fintech industry. I also have a moderate risk tolerance, hence my interest in options trading. 
                </div>
                <br></br>
                <div className='main-text'>
                    My Linkedin can be found <a className='links' href='https://www.linkedin.com/in/dennis-fong-678bb3216' target='_blank'>here</a>, and github <a className='links' href='https://github.com/DFong298' target='_blank'>here</a>.
                </div>
                <br></br>
                <br></br>
                <div className='disclaimer'> 
                    <b>None of the content on this app constitutes financial advice.</b> Discretion of <b>ALL</b> trades and transactions are up to the trader. 
                    The Delight webapp is <b>NOT</b> responsible for any financial losses you may incur from the usage of the strategies listed.
                </div>
            </div>
        </div>
    )
}

export default About
