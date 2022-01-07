import React from 'react';
import './App.css';
import CallSpread from './Components/CallSpread/CallSpread';
import PutSpread from './Components/PutSpread/PutSpread';
import ProtectiveCollar from './Components/ProtectiveCollar/ProtectiveCollar';
import IronCondor from './Components/IronCondor/IronCondor';

function App() {
  return (
    <div className='App'>
      <h1>Options P/L Calculator</h1>
      <h2>Call Spread</h2>
      <CallSpread/>
      <h2>Put Spread</h2>
      <PutSpread/>
      <h2>Protective Collar</h2>
      <ProtectiveCollar/>
      <h2>Iron Condor</h2>
      <IronCondor/>
    </div>
  );
}

export default App;
