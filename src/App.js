import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Pomodoro, Tasks, InvalidRoute, Login, Signup } from "./pages";
import { RedirectAuth, RequiresAuth } from "./utils";

function App() {
  return (
    <div className="theme-wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequiresAuth />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/pomodoro/:id" element={<Pomodoro />} />
        </Route>
        <Route element={<RedirectAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </div>
  );
}

export default App;
