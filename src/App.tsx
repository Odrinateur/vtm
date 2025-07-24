import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ExploitationPage from "./pages/ExploitationPage";
import ScenarioPage from "./pages/ScenarioPage";
import ComparaisonPage from "./pages/ComparaisonPage";
import AdminPage from "./pages/AdminPage";
import AdminClimatPage from "./pages/admin/AdminClimatPage";
import AdminEngraisPage from "./pages/admin/AdminEngraisPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exploitation/:id" element={<ExploitationPage />} />
            <Route path="/exploitation/:id/scenario/:type" element={<ScenarioPage />} />
            <Route path="/exploitation/:id/comparaison" element={<ComparaisonPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/climat" element={<AdminClimatPage />} />
            <Route path="/admin/engrais" element={<AdminEngraisPage />} />
            <Route path="/admin/pra" element={<AdminPage />} />
            <Route path="/admin/amendements" element={<AdminPage />} />
            <Route path="/admin/pro" element={<AdminPage />} />
            <Route path="/admin/materiel" element={<AdminPage />} />
        </Routes>
    );
}
