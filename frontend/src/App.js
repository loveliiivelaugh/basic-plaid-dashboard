import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
const Dashboard = lazy(() => import('./components/Dashboard'));
const PlaidVisuals = lazy(() => import('./components/PlaidVisuals'));
const SignIn = lazy(() => import('./components/SignIn'));


const App = () => {
  const [data, setData] = useState();
  const routes = [
    { path: '/', element: <SignIn setData={setData}/> },
    { path: '/dashboard', element: <Dashboard content={( <PlaidVisuals data={data} loading={!data}/> )}/> },
  ];
  return (
  <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Routes>
        {routes.map(route => <Route key={route.path}{...route} />)}
      </Routes>
    </Router>
  </Suspense>
  )
}

export default App;
