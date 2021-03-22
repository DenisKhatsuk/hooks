import React, { Component, useEffect, useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [value, setValue] = useState(1);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div>
        <button onClick = { () => setValue((value) => value + 1 ) }>+</button>
        <button onClick = { () => setVisible(false) }>Hide</button>
        {/* <ClassCounter value = { value } />
        <HookCounter value = { value } />
        <Notification /> */}
        <PlanetInfo id = { value }/>
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

const getPlanet = (id) => {
  return fetch(`https://swapi.dev/api/planets/${id}/`)
    .then((res) => res.json())
    .then((data) => data);
};

const useRequest = (request) => {

  const initialState = useMemo(() => ({
    data: null,
    loading: true,
    error: null,
  }), []);
  const [ dataState, setDataState ] = useState(initialState);

  useEffect(() => {
    let isCancelled = false;
    setDataState(initialState);
    request()
      .then((data) => {
        return !isCancelled && setDataState({
          data,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        return !isCancelled && setDataState({
          data: null,
          loading: false,
          error,
        })
      });
    return () => isCancelled = true;
  }, [request, initialState]);

  return dataState;
};

const usePlanetInfo = (id) => {
  const request = useCallback(() => getPlanet(id), [id]);
  return useRequest(request);
};

const PlanetInfo = ({ id }) => {

  const { data: planet, loading, error } = usePlanetInfo(id);

  if (error) return <div>Something went wrong!</div>;

  if (loading) return <div>Loading ...</div>;

  return (
    <div>
      { id } - { planet.name }
    </div>
  );
};

ReactDOM.render(<App />,
  document.getElementById('root'));