import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import CallSpread from './Components/CallSpread/CallSpread';
import PutSpread from './Components/PutSpread/PutSpread';
import ProtectiveCollar from './Components/ProtectiveCollar/ProtectiveCollar';
import IronCondor from './Components/IronCondor/IronCondor';

function App() {
  return (
    <div className='App'>
      <Navbar />
    </div>
  );
}

export default App;
