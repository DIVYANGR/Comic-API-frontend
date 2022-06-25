import { Routes, Route } from "react-router-dom";
import Comic from './Comic'

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Comic />} />
        <Route path=":id" element={<Comic />} />
      </Route>
    </Routes>

  );
}

export default App;