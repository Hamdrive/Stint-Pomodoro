import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Pomodoro, Tasks, InvalidRoute } from "./pages";

function App() {
  return (
    <div className="theme-wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </div>
  );
}

export default App;
