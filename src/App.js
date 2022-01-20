import React from 'react';
import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom"
import CallSpread from './Components/StrategyFunctions/Spreads/CallSpread';
import PutSpread from './Components/StrategyFunctions/Spreads/PutSpread';
import ProtectiveCollar from './Components/StrategyFunctions/ProtectiveCollar/ProtectiveCollar';
import IronCondor from './Components/StrategyFunctions/IronCondor/IronCondor';
import About from './Components/Pages/About/About';
import Strategies from './Components/Pages/Strategies/Strategies';
import SelectStrategy from './Components/Pages/SelectStrategy/SelectStrategy';
import CustomNavbar from './Components/Navbar/CustomNavbar'
import HomePage from './Components/HomePage/HomePage'




function App() {
  return (
    <div className='App'>
      <HashRouter basename='/'>
      <CustomNavbar/>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/about' element={<About/>} />
          <Route path='/strategies' element={<Strategies/>} />
          <Route path='/varcalculator' element={<SelectStrategy/>}/>
          <Route path='/callspread' element={<CallSpread/>}/>
          <Route path='/putspread' element={<PutSpread/>}/>
          <Route path='/protectivecollar' element={<ProtectiveCollar/>}/>
          <Route path='/ironcondor' element={<IronCondor/>}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;
