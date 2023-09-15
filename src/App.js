import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";

import Card from "./pages/card";
import Home from "./pages/home";
import Login from "./pages/login";
import CardsList from "./pages/cards-list";

import './App.css';
import CardView from './pages/card-view';

function App() {
  return (
    <ErrorBoundary fallback={<div>error boundary here</div>}>
      <Routes>
        <Route path="card/:cardId" element={<CardView />} />
        <Route path="card" element={<Card />} />
        <Route path="login/*" element={<Login />} />
        <Route path="*" element={<Home />} />
        <Route path="cards-list" element={<CardsList />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
