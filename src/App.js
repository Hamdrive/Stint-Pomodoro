import { Route, Routes } from "react-router-dom";
import { Home, Tasks } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/timer" />
    </Routes>
  );
}

export default App;
