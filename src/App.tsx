import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ExploitationPage from "./pages/ExploitationPage";
import ScenarioPage from "./pages/ScenarioPage";
import ComparaisonPage from "./pages/ComparaisonPage";
import AdminPage from "./pages/AdminPage";
import AdminClimatPage from "./pages/admin/AdminClimatPage";
import AdminEngraisPage from "./pages/admin/AdminEngraisPage";
import AdminPRAPage from "./pages/admin/AdminPRAPage";
import AdminAmendementPage from "./pages/admin/AdminAmendementPage";
import AdminPROPage from "./pages/admin/AdminPROPage";
import AdminMaterielPage from "./pages/admin/AdminMaterielPage";

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
            <Route path="/admin/pra" element={<AdminPRAPage />} />
            <Route path="/admin/amendements" element={<AdminAmendementPage />} />
            <Route path="/admin/pro" element={<AdminPROPage />} />
            <Route path="/admin/materiel" element={<AdminMaterielPage />} />
        </Routes>
    );
}
