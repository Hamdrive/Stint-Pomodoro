import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" />
      <Route path="/timer" />
    </Routes>
  );
}

export default App;
