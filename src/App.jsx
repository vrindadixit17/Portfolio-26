import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import SkillsPage from "./pages/SkillsPage";
import WorksPage from "./pages/WorksPage";
import ContactPage from "./pages/ContactPage";
import { Navigate } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/works/:slug" element={<ProjectPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/works-projects" element={<WorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
<Route path="/" element={<Navigate to="/home" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
