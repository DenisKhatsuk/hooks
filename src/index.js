import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div>
        <button onClick = { () => setValue((value) => value + 1 ) }>+</button>
        <button onClick = { () => setVisible(false) }>Hide</button>
        <ClassCounter value = { value } />
        <HookCounter value = { value } />
        <Notification />
      </div>
    );
  } else {
    return (
      <button onClick = { () => setVisible(true) }>Show</button>
    );
  }
};

class ClassCounter extends Component {
  componentDidMount() {
    console.log('[Class]: mount');
  }
  
  componentDidUpdate() {
    console.log('[Class]: update');
  }

  componentWillUnmount() {
    console.log('[Class]: unmount');
  }

  render() {
    const { value } = this.props;
    return <div>{ value }</div>
  }

};

const Notification = () => {

  const [ isVisible, setVisibility ] = useState(true);

  useEffect(() => {
    console.log('[Notification]: mount')
    return () => console.log('[Notification]: unmount');
  }, []);

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setVisibility(false);
    }, 1500);
    return () => clearTimeout(notificationTimeout);
  }, []);

  useEffect(() => {
    console.log('[Notification]: update');
  });
  if (isVisible) {
    return <div><p>Notification</p></div>;
  } else {
    return null;
  }
};

const HookCounter = ({ value }) => {
  // useEffect(() => {
  //   console.log('[func]: useEffect()');
  //   return () => {
  //     console.log('clear');
  //   };
  // }, [ value ]);

  return <div>{ value }</div>
};

ReactDOM.render(<App />,
  document.getElementById('root'));