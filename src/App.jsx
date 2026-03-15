import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/works/:slug" element={<ProjectPage />} />
        <Route path="/skills" element={<SkillsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
