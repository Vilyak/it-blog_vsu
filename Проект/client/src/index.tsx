import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./redux";
import {Provider} from "react-redux";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App/>
      </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
