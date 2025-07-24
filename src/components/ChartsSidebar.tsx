import type { Scenario, ResultatScenario } from "../assets/scenarios.mock";

interface ChartsSidebarProps {
    scenario: Scenario;
    resultats?: ResultatScenario;
    scenarioT0?: Scenario;
    resultatsT0?: ResultatScenario;
    onClose: () => void;
}

export default function ChartsSidebar({
    scenario,
    resultats,
    scenarioT0,
    resultatsT0,
    onClose,
}: ChartsSidebarProps) {
    const formatNumber = (num: number | undefined) => {
        if (num === undefined) return "N/A";
        return num.toFixed(2);
    };

    const getEvolutionColor = (current: number | undefined, t0: number | undefined) => {
        if (current === undefined || t0 === undefined) return "text-gray-500";
        const diff = current - t0;
        if (diff > 0) return "text-green-600";
        if (diff < 0) return "text-red-600";
        return "text-gray-500";
    };

    const getEvolutionIcon = (current: number | undefined, t0: number | undefined) => {
        if (current === undefined || t0 === undefined) return "";
        const diff = current - t0;
        if (diff > 0) return "↗";
        if (diff < 0) return "↘";
        return "→";
    };

    const getDeltaIndicator = (current: number | undefined, t0: number | undefined, unit: string = "") => {
        if (!current || !t0 || scenario.type === "T0") return null;
        
        const diff = current - t0;
        if (Math.abs(diff) < 0.01) return null;

        return (
            <div className={`text-xs font-medium ${getEvolutionColor(current, t0)} mt-1`}>
                {getEvolutionIcon(current, t0)} {diff > 0 ? "+" : ""}{formatNumber(diff)} {unit} vs T0
            </div>
        );
    };

    // Données pour les graphiques simplifiés
    const surfaceData = scenario.cultures.map((c) => ({
        culture: c.culture.culture,
        surface: c.culture.surface,
        rendement: c.culture.rendement,
    }));

    const emissionsData = resultats?.emissionsParCulture || [];

    return (
        <div className="fixed right-0 top-0 w-1/3 bg-white shadow-xl border-l border-gray-200 h-screen overflow-y-auto z-50">
            {/* En-tête */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Perf agro détaillées - {scenario.nom}
                    </h3>
                    {scenario.type === "previsionnel" && scenarioT0 && (
                        <p className="text-sm text-gray-600 mt-1">
                            Évolution par rapport au scénario T0
                        </p>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <div className="p-4 space-y-6">
                {/* Indicateurs clés */}
                {resultats && (
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-4">
                            Indicateurs clés
                        </h4>
                        <div className="space-y-4">
                            {/* DDC */}
                            <div className="bg-white p-3 rounded border">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">
                                        DDC
                                    </span>
                                    <span className="font-bold text-blue-600">
                                        {formatNumber(resultats.ddc)} j
                                    </span>
                                </div>
                                {getDeltaIndicator(resultats.ddc, resultatsT0?.ddc, "j")}
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full bg-blue-500"
                                            style={{
                                                width: `${Math.min(
                                                    (resultats.ddc / 365) * 100,
                                                    100
                                                )}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>0</span>
                                        <span>365j</span>
                                    </div>
                                </div>
                            </div>

                            {/* Carbone humifié */}
                            <div className="bg-white p-3 rounded border">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">
                                        Carbone humifié
                                    </span>
                                    <span className="font-bold text-yellow-600">
                                        {formatNumber(resultats.carboneHumifie)} T C/ha
                                    </span>
                                </div>
                                {getDeltaIndicator(resultats.carboneHumifie, resultatsT0?.carboneHumifie, "T C/ha")}
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full bg-yellow-500"
                                            style={{
                                                width: `${Math.min(
                                                    (resultats.carboneHumifie / 3) * 100,
                                                    100
                                                )}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>0</span>
                                        <span>3 T C/ha</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bilan GES */}
                            <div className="bg-white p-3 rounded border">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">
                                        Bilan GES net
                                    </span>
                                    <span
                                        className={`font-bold ${
                                            resultats.bilanGES.bilanNet > 0
                                                ? "text-red-600"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {formatNumber(resultats.bilanGES.bilanNet)} T CO2 eq/ha
                                    </span>
                                </div>
                                {getDeltaIndicator(resultats.bilanGES.bilanNet, resultatsT0?.bilanGES.bilanNet, "T CO2 eq/ha")}
                                <div className="mt-2 text-xs text-gray-500">
                                    <div className="flex justify-between">
                                        <span>
                                            Stockage: {formatNumber(resultats.bilanGES.stockage)}
                                            {getDeltaIndicator(resultats.bilanGES.stockage, resultatsT0?.bilanGES.stockage) && (
                                                <span className={`ml-1 ${getEvolutionColor(resultats.bilanGES.stockage, resultatsT0?.bilanGES.stockage)}`}>
                                                    ({resultats.bilanGES.stockage && resultatsT0?.bilanGES.stockage && 
                                                      (resultats.bilanGES.stockage - resultatsT0.bilanGES.stockage > 0 ? "+" : "") + 
                                                      formatNumber(resultats.bilanGES.stockage - resultatsT0.bilanGES.stockage)})
                                                </span>
                                            )}
                                        </span>
                                        <span>
                                            Émissions: {formatNumber(resultats.bilanGES.emissions.total)}
                                            {getDeltaIndicator(resultats.bilanGES.emissions.total, resultatsT0?.bilanGES.emissions.total) && (
                                                <span className={`ml-1 ${getEvolutionColor(resultats.bilanGES.emissions.total, resultatsT0?.bilanGES.emissions.total)}`}>
                                                    ({resultats.bilanGES.emissions.total && resultatsT0?.bilanGES.emissions.total && 
                                                      (resultats.bilanGES.emissions.total - resultatsT0.bilanGES.emissions.total > 0 ? "+" : "") + 
                                                      formatNumber(resultats.bilanGES.emissions.total - resultatsT0.bilanGES.emissions.total)})
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Comparaison des cultures T0 vs Prévisionnel */}
                {scenario.type === "previsionnel" && scenarioT0 && (
                    <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-4">
                            Évolution des cultures
                        </h4>
                        <div className="space-y-3">
                            {scenario.cultures.map((culture, index) => {
                                const cultureT0 = scenarioT0.cultures[index];
                                if (!cultureT0) return null;

                                return (
                                    <div key={index} className="bg-white p-3 rounded border">
                                        <div className="font-medium text-sm text-gray-800 mb-2">
                                            {culture.culture.culture}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="text-gray-600">Surface:</span>
                                                <div className="font-medium">
                                                    {culture.culture.surface} ha
                                                    {culture.culture.surface !== cultureT0.culture.surface && (
                                                        <span className={`ml-1 ${getEvolutionColor(culture.culture.surface, cultureT0.culture.surface)}`}>
                                                            ({culture.culture.surface - cultureT0.culture.surface > 0 ? "+" : ""}{formatNumber(culture.culture.surface - cultureT0.culture.surface)})
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Rendement:</span>
                                                <div className="font-medium">
                                                    {culture.culture.rendement} T/ha
                                                    {culture.culture.rendement !== cultureT0.culture.rendement && (
                                                        <span className={`ml-1 ${getEvolutionColor(culture.culture.rendement, cultureT0.culture.rendement)}`}>
                                                            ({culture.culture.rendement - cultureT0.culture.rendement > 0 ? "+" : ""}{formatNumber(culture.culture.rendement - cultureT0.culture.rendement)})
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Émissions par culture */}
                {emissionsData.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-4">
                            Émissions par culture
                        </h4>
                        <div className="space-y-3">
                            {emissionsData.map((item, index) => {
                                const maxEmissions = Math.max(...emissionsData.map((d) => d.emissions));
                                const percentage = maxEmissions > 0 ? (item.emissions / maxEmissions) * 100 : 0;

                                // Trouver l'émission T0 correspondante pour comparaison
                                const emissionT0 = resultatsT0?.emissionsParCulture.find(
                                    e => e.culture === item.culture
                                );

                                return (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">{item.culture}</span>
                                            <div className="text-right">
                                                <span>{formatNumber(item.emissions)} tCO2e/ha</span>
                                                {emissionT0 && getDeltaIndicator(item.emissions, emissionT0.emissions, "tCO2e/ha")}
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full bg-red-500"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            FE: {formatNumber(item.facteurEmissions)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Répartition des surfaces */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-4">
                        Répartition des surfaces
                    </h4>
                    <div className="space-y-3">
                        {surfaceData.map((item, index) => {
                            const totalSurface = surfaceData.reduce((sum, d) => sum + d.surface, 0);
                            const percentage = totalSurface > 0 ? (item.surface / totalSurface) * 100 : 0;

                            return (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{item.culture}</span>
                                        <span>{item.surface} ha ({percentage.toFixed(1)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full bg-green-500"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
