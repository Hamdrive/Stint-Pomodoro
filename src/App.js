import { Route, Routes } from "react-router-dom";
import { Home, Pomodoro, Tasks } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/pomodoro" element={<Pomodoro />} />
    </Routes>
  );
}

export default App;
