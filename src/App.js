import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Tracker from "./pages/tracker";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
