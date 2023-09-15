import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';

import Card from './pages/card';
import Home from './pages/home-2';
import Login from './pages/login';

import './App.css';

function App() {
  return (
    <ErrorBoundary
     fallback={<div>error boundary here</div>}
    >
      <Routes>
        <Route path='card' element={<Card />} />
        <Route path='login/*' element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
