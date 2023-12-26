import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Request from './components/Request';
import Response from './components/Response';

import AppContext from './AppContext';
import NavBar from './components/Navbar';

import './App.css';

const initialState = {
  response: {},
  loading: false,
  keyPair: {},
  url: '',
  reqMethod: "GET",
  queryParams: [
    {
      id: uuidv4(),
      keyItem: '',
      valueItem: '',
    },
  ],
  headers: [
    {
      id: uuidv4(),
      keyItem: '',
      valueItem: '',
    },
  ],
  body: '{\n\t\n}'
};
function reducer(state, action) {
  switch (action.type) {
    case 'setResponse':
      return { ...state, response: action.payload }
    case 'setLoading':
      return { ...state, loading: action.payload }
    case 'setKeyPair':
      return { ...state, keyPair: action.payload }
    case 'setUrl':
      return { ...state, url: action.payload }
    case 'setRequest':
      return { ...state, reqMethod: action.payload }
    case "setQueryParams":
      return { ...state, queryParams: action.payload,  }
    case "setHeaders":
      return { ...state, headers: action.payload }
    case "setBody":
      return { ...state, body: action.payload }
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <AppContext.Provider value={{ state, dispatch }}>
          <NavBar />
          <main component="main" sx={{ p: 3 }}>
            <div className='container'>
              <Request />
              <Response />
            </div>
          </main>
      </AppContext.Provider>
    </>
  );
};

export default App;
