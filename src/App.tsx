import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ExploitationPage from "./pages/ExploitationPage";
import ScenarioPage from "./pages/ScenarioPage";
import ComparaisonPage from "./pages/ComparaisonPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exploitation/:id" element={<ExploitationPage />} />
            <Route path="/exploitation/:id/scenario/:type" element={<ScenarioPage />} />
            <Route path="/exploitation/:id/comparaison" element={<ComparaisonPage />} />
        </Routes>
    );
}
