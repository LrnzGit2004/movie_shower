import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieShower from "./pages/MovieShower";
import ThermostatApp from "./pages/Thermostat";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-shower" element={<MovieShower />} />
        <Route path="/thermostat" element={<ThermostatApp />} />
      </Routes>
    </Router>
  );
}
