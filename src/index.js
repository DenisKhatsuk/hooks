import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <HookSwitcher />
    </div>
  );
};

const HookSwitcher = () => {
  const [ color, setColor ] = useState('grey');
  const [ fontSize, setFontSize ] = useState('14');

  return (
    <div style = {{ 
      padding: '10px', 
      backgroundColor: color,
      fontSize: `${fontSize}px` 
    }}>
      Hello World!
      <button onClick = { () => setColor('grey') }>Dark</button>
      <button onClick = { () => setColor('white') }>Light</button>
      <button onClick = { () => setFontSize((fontSize) => +fontSize + 2) }>+</button>
      <button onClick = { () => setFontSize((fontSize) => +fontSize - 2) }>-</button>
    </div>
  );
};

ReactDOM.render(<App />,
  document.getElementById('root')
);
