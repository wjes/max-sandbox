import React from 'react';
import './App.css';

import PDF from './components/pdf'
import Barcode from './components/barcode'


function App() {
  return (
    <>
    <div style={{width: '50%'}}>
      {/*<PDF />*/}
      <Barcode />
    </div>
    </>
  );
}

export default App;
