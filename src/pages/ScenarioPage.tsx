import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "../Layout";
import exploitations from "../assets/exploitations.mock";
import { scenarios, resultatsScenarios } from "../assets/scenarios.mock";
import ScenarioForm from "../components/ScenarioForm";
import ChartsSidebar from "../components/ChartsSidebar";

export default function ScenarioPage() {
    const { id, type } = useParams<{ id: string; type: 'T0' | 'previsionnel' }>();
    const [showCharts, setShowCharts] = useState(false);
    const [editMode, setEditMode] = useState(false);
    
    const exploitation = exploitations.find(exp => exp.id === id);
    const scenario = scenarios.find(s => s.exploitationId === id && s.type === type);
    const resultats = resultatsScenarios.find(r => r.scenarioId === scenario?.id);
    
    // Pour la comparaison avec T0 (si on est sur le scénario prévisionnel)
    const scenarioT0 = type === 'previsionnel' ? scenarios.find(s => s.exploitationId === id && s.type === 'T0') : null;
    const resultatsT0 = scenarioT0 ? resultatsScenarios.find(r => r.scenarioId === scenarioT0.id) : null;

    if (!exploitation || !scenario) {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Scénario non trouvé</h1>
                    <Link to={`/exploitation/${id}`} className="text-blue-600 hover:underline">
                        Retour à l'exploitation
                    </Link>
                </div>
            </Layout>
        );
    }

    const handleImportData = () => {
        // Simulation d'import de données
        alert("Fonctionnalité d'import à implémenter");
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const navigateToOtherScenario = () => {
        const otherType = type === 'T0' ? 'previsionnel' : 'T0';
        return `/exploitation/${id}/scenario/${otherType}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex">
            {/* Contenu principal */}
            <div className="flex-1">
                <Layout>
                    <div className="space-y-6">
                        {/* En-tête */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{exploitation.nom}</h1>
                                <h2 className="text-xl text-gray-700 mt-1">{scenario.nom}</h2>
                                <p className="text-sm text-gray-500">Année : {scenario.annee}</p>
                            </div>
                            <div className="flex space-x-2">
                                <Link 
                                    to={`/exploitation/${id}`}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    ← Retour
                                </Link>
                                <button
                                    onClick={() => setShowCharts(!showCharts)}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    {showCharts ? 'Masquer' : 'Afficher'} Charts
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleImportData}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    📁 Importer données
                                </button>
                                <button
                                    onClick={toggleEditMode}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        editMode 
                                            ? 'bg-green-600 text-white hover:bg-green-700' 
                                            : 'bg-gray-600 text-white hover:bg-gray-700'
                                    }`}
                                >
                                    {editMode ? '✓ Sauvegarder' : '✏️ Modifier'}
                                </button>
                            </div>
                            <div className="flex space-x-2">
                                <Link
                                    to={navigateToOtherScenario()}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    → {type === 'T0' ? 'Prévision' : 'T0'}
                                </Link>
                                <Link
                                    to={`/exploitation/${id}/comparaison`}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    Comparaison
                                </Link>
                            </div>
                        </div>

                        {/* Formulaire du scénario */}
                        <div className="bg-white rounded-lg shadow-sm border">
                            <ScenarioForm 
                                scenario={scenario} 
                                editMode={editMode}
                                scenarioComparaison={scenarioT0}
                                resultatsComparaison={resultatsT0}
                            />
                        </div>
                    </div>
                </Layout>
            </div>

            {/* Sidebar des charts */}
            {showCharts && (
                <ChartsSidebar 
                    scenario={scenario}
                    resultats={resultats}
                    onClose={() => setShowCharts(false)}
                />
            )}
        </div>
    );
}