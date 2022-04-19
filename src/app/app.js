import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '~/store';
import Router from '~/routes';
import { MainLayout } from '~/layouts';
import './app.scss';

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Router />
        </MainLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

export default App;
