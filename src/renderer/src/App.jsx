import React, { useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PouchDB from 'pouchdb-browser';

import Request from './components/Request';
import Response from './components/Response';
import History from './components/History';

import AppContext from './AppContext';
import NavBar from './components/Navbar';

import { isEmpty } from './utils/helpers';

import './App.css';

const db = new PouchDB('epic');

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
  body: '{\n\t\n}',
  history: []
};
function reducer(state, action) {
  switch (action.type) {
    case 'setResponse':
      return { ...state, response: action.payload };
    case 'setLoading':
      return { ...state, loading: action.payload };
    case 'setKeyPair':
      return { ...state, keyPair: action.payload };
    case 'setUrl':
      return { ...state, url: action.payload };
    case 'setRequest':
      return { ...state, reqMethod: action.payload };
    case "setQueryParams":
      return { ...state, queryParams: action.payload,  }
    case "setHeaders":
      return { ...state, headers: action.payload };
    case "setBody":
      return { ...state, body: action.payload };
    case 'addToHistory':
      return { ...state, history: [ ...state.history, action.payload ] };
    case 'setHistory':
      return { ...state, history: action.payload };
    case 'setCurrentItem':
      const item = action.payload;
      const newState = {
          ...state,
          url: item.url,
          reqMethod: item.method,
          queryParams: isEmpty(item.params) ? initialState.queryParams : item.params,
          headers: isEmpty(item.headers) ? initialState.headers :  item.headers,
          body: isEmpty(item.body) ? initialState.body :  item.data,
      }
      
      return { ...newState }
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <AppContext.Provider value={{ state, dispatch, db }}>
          <NavBar />
          <main component="main" sx={{ p: 3 }}>
            <div className='container parent'>
              <div className='left'>
                <History/>
              </div>
              <div className='right'>
                <Request />
                <Response />
              </div>
            </div>
          </main>
      </AppContext.Provider>
    </>
  );
};

export default App;
