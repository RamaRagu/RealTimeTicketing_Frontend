import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage";
import Config from "./Pages/Config";
import FrontPage from "./Pages/FrontPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Config" element={<Config />} />
        <Route path="/FrontPage" element={<FrontPage />} />{" "}
        {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
