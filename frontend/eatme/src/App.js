import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/home' element={<HomePage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
