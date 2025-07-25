import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../Layout";
import exploitations, {
    type ContexteExploitation,
} from "../assets/exploitations.mock";
import {
    scenarios,
    resultatsScenarios,
    importData,
} from "../assets/scenarios.mock";
import ScenarioForm from "../components/ScenarioForm";
import ChartsSidebar from "../components/ChartsSidebar";

interface ScenarioPageProps {
    type: "T0" | "previsionnel";
    id: string;
    editMode?: boolean;
    onEditModeChange?: (edit: boolean) => void;
    onSave?: (newContexte: ContexteExploitation) => void;
}

export default function ScenarioPage({
    type,
    id,
    editMode,
}: ScenarioPageProps) {
    const [showCharts, setShowCharts] = useState(false);
    const [currentScenario, setCurrentScenario] = useState(() =>
        scenarios.find((s) => s.exploitationId === id && s.type === type)
    );

    useEffect(() => {
        const found = scenarios.find(
            (s) => s.exploitationId === id && s.type === type
        );
        setCurrentScenario(found);
        setShowCharts(false); // optionnel : ferme les graphiques lors du changement
    }, [id, type]);

    const exploitation = exploitations.find((exp) => exp.id === id);
    const resultats = resultatsScenarios.find(
        (r) => r.scenarioId === currentScenario?.id
    );

    // Pour la comparaison avec T0 (si on est sur le scénario prévisionnel)
    const scenarioT0 =
        type === "previsionnel"
            ? scenarios.find((s) => s.exploitationId === id && s.type === "T0")
            : null;
    const resultatsT0 = scenarioT0
        ? resultatsScenarios.find((r) => r.scenarioId === scenarioT0.id)
        : null;

    if (!exploitation || !currentScenario) {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        Scénario non trouvé
                    </h1>
                    <Link
                        to={`/exploitation/${id}`}
                        className="text-blue-600 hover:underline"
                    >
                        Retour à l'exploitation
                    </Link>
                </div>
            </Layout>
        );
    }

    const handleImportData = () => {
        const importedData = importData[currentScenario.id];
        if (importedData) {
            setCurrentScenario({ ...importedData });
            // Mettre à jour dans le tableau global (simulation)
            const index = scenarios.findIndex(
                (s) => s.id === currentScenario.id
            );
            if (index !== -1) {
                scenarios[index] = { ...importedData };
            }
        }
    };

    const navigateToOtherScenario = () => {
        const otherType = type === "T0" ? "previsionnel" : "T0";
        return `/exploitation/${id}/scenario/${otherType}`;
    };

    return (
        <div className="flex">
            {/* Contenu principal */}
            <div className="flex-1">
                <div className="flex flex-col h-full p-6">
                    {/* Actions */}
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border mb-6">
                        <div className="flex space-x-2">
                            <Link
                                to={navigateToOtherScenario()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {type === "T0"
                                    ? "Scénario Prévisionnel"
                                    : "Scénario T0"}
                            </Link>
                            <button
                                onClick={() => setShowCharts(!showCharts)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {showCharts ? "Masquer" : "Afficher"} Perf agro
                                détaillées
                            </button>
                        </div>
                    </div>

                    {/* Contenu du scénario */}
                    <div className="flex-1 bg-white rounded-lg border overflow-hidden">
                        {currentScenario.isEmpty ? (
                            <div className="flex items-center justify-center h-full py-10">
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-12 h-12 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        Scénario vide
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        Aucune donnée n'a été importée pour ce
                                        scénario.
                                    </p>
                                    <button
                                        onClick={handleImportData}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        {currentScenario.type === "T0"
                                            ? "Importer les données"
                                            : "Importer depuis T0"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full overflow-y-auto">
                                <ScenarioForm
                                    scenario={currentScenario}
                                    editMode={editMode ?? false}
                                    scenarioComparaison={scenarioT0}
                                    resultatsComparaison={resultatsT0}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar des charts */}
            {showCharts && !currentScenario.isEmpty && (
                <div className="w-1/3 h-screen overflow-y-auto border-l border-gray-200 bg-white relative">
                    <ChartsSidebar
                        scenario={currentScenario ?? undefined}
                        resultats={resultats ?? undefined}
                        scenarioT0={scenarioT0 ?? undefined}
                        resultatsT0={resultatsT0 ?? undefined}
                        onClose={() => setShowCharts(false)}
                    />
                </div>
            )}
        </div>
    );
}
