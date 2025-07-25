import { Link } from "react-router-dom";
import Layout from "../Layout";
import exploitations from "../assets/exploitations.mock";
import {
    scenarios,
    resultatsScenarios,
    importData,
} from "../assets/scenarios.mock";
import type { Scenario, ResultatScenario } from "../assets/scenarios.mock";
import ScenarioForm from "../components/ScenarioForm";
import ChartsSidebar from "../components/ChartsSidebar";

interface ScenarioPageProps {
    type: "T0" | "previsionnel";
    id: string;
    editMode?: boolean;
    showCharts: boolean;
    setShowCharts: (show: boolean) => void;
    scenario: Scenario;
    onScenarioUpdate: (s: Scenario) => void;
    scenarioComparaison?: Scenario;
    resultatsComparaison?: ResultatScenario;
    tableMode: boolean;
    onImport?: () => void; // ajout
}

export default function ScenarioPage({
    type,
    id,
    editMode,
    showCharts,
    setShowCharts,
    scenario,
    onScenarioUpdate,
    scenarioComparaison,
    resultatsComparaison,
    tableMode,
    onImport,
}: ScenarioPageProps) {
    const exploitation = exploitations.find((exp) => exp.id === id);
    const resultats = resultatsScenarios.find(
        (r) => r.scenarioId === scenario?.id
    );
    // Pour la comparaison avec T0 (si on est sur le scénario prévisionnel)
    const scenarioT0 =
        type === "previsionnel"
            ? scenarios.find((s) => s.exploitationId === id && s.type === "T0")
            : null;
    const resultatsT0 = scenarioT0
        ? resultatsScenarios.find((r) => r.scenarioId === scenarioT0.id)
        : null;

    if (!exploitation || !scenario) {
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
        const importedData = importData[scenario.id];
        if (importedData) {
            onScenarioUpdate({ ...importedData });
            if (typeof onImport === "function") onImport();
            // Mettre à jour dans le tableau global (simulation)
            const index = scenarios.findIndex((s) => s.id === scenario.id);
            if (index !== -1) {
                scenarios[index] = { ...importedData };
            }
        }
    };

    return (
        <div className="flex gap-4">
            {/* Contenu principal */}
            <div className={`flex-1 ${showCharts ? "w-2/3" : "w-full"}`}>
                <div className="flex flex-col h-full">
                    {/* Contenu du scénario */}
                    <div className="flex-1 bg-white rounded-lg border-gray-200 overflow-hidden">
                        {scenario.isEmpty ? (
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
                                        {scenario.type === "T0"
                                            ? "Importer les données"
                                            : "Importer depuis T0"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full overflow-y-auto">
                                <ScenarioForm
                                    scenario={scenario}
                                    editMode={editMode ?? false}
                                    scenarioComparaison={
                                        scenarioComparaison ?? scenarioT0
                                    }
                                    resultatsComparaison={
                                        resultatsComparaison ?? resultatsT0
                                    }
                                    tableMode={tableMode}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar des charts */}
            {showCharts && !scenario.isEmpty && (
                <div className="w-1/3  border-gray-200 bg-white relative">
                    <ChartsSidebar
                        scenario={scenario ?? undefined}
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
