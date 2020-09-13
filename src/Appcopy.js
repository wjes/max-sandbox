import React from 'react';
import logo from './logo.svg';
import './App.css';

import PDF from './components/pdf'
import NivoSVG from './components/nivo/svg'
import NivoCanvas from './components/nivo/canvas'


function App() {
  return (
    <>
    <div style={{width: '50%', height: '700px', display: 'inline-block'}}>
        <h3 style={{marginLeft: '50px'}}>PDF</h3>
      <PDF />
    </div>
    <div style={{width: '50%', height: '350px', display: 'inline-block'}}>
      <div style={{width: '100%', height: '350px'}}>
        <h3 style={{marginLeft: '50px'}}>Nivo SVG</h3>
        <NivoSVG />
      </div>
      <div style={{width: '100%', height: '350px'}}>
        <h3 style={{marginLeft: '50px'}}>Nivo Canvas</h3>
        <NivoCanvas />
      </div>
    </div>
    <div style={{margin: '10px', fontSize: '10pt'}}>
      <p><a target="_blank" href='https://en.reactjs.org/docs/hooks-intro.html' >Introducción a React Hooks</a> </p>
      <p><a target="_blank" href='https://en.reactjs.org/docs/hooks-reference.html' >Referencia rápida de React Hooks</a></p>
      <p><a target="_blank" href='https://react-pdf.org/' >Biblioteca PDF</a> (<a href='https://www.npmjs.com/package/@react-pdf/renderer' >Github</a>)</p>
      <p><a target="_blank" href='https://nivo.rocks/' >Biblioteca NIVO</a> (<a href='https://github.com/plouc/nivo ' >Github</a>)</p>
      <p><a target="_blank" href='https://github.com/plouc/nivo/issues/906' >Issue canvas</a></p>
    </div>
    </>
  );
}

export default App;
