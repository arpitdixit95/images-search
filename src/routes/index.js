import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from '~/pages/home';
import NotFoundPage from '~/pages/not-found';

const Loader = () => (
  <div className='app-loading'> </div>
);

const waitingComponent = (Component) =>  (
  <React.Suspense fallback={<Loader />}>
    <Component />
  </React.Suspense>
);

const Router = () => (
  <Routes>
    <Route path='/' element={waitingComponent(HomePage)} />
    <Route path='*' element={waitingComponent(NotFoundPage)} />
  </Routes>
);

export default Router;