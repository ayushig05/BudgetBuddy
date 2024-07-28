import { 
  BrowserRouter as Router, 
  Route, 
  Routes 
} from "react-router-dom";
import Auth from "./components/pages/auth";
import Tracker from "./components/pages/tracker";
import "./index.css";

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
