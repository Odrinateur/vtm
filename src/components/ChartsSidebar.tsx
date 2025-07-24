import type { Scenario, ResultatScenario } from "../assets/scenarios.mock";

interface ChartsSidebarProps {
    scenario: Scenario;
    resultats?: ResultatScenario;
    onClose: () => void;
}

export default function ChartsSidebar({
    scenario,
    resultats,
    onClose,
}: ChartsSidebarProps) {
    const formatNumber = (num: number | undefined) => {
        if (num === undefined) return "N/A";
        return num.toFixed(2);
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
                <h3 className="text-lg font-semibold text-gray-900">
                    Perf agro détaillées - {scenario.nom}
                </h3>
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
                                        {formatNumber(resultats.carboneHumifie)}{" "}
                                        T C/ha
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full bg-yellow-500"
                                            style={{
                                                width: `${Math.min(
                                                    (resultats.carboneHumifie /
                                                        3) *
                                                        100,
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
                                        {formatNumber(
                                            resultats.bilanGES.bilanNet
                                        )}{" "}
                                        T CO2 eq/ha
                                    </span>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                    <div className="flex justify-between">
                                        <span>
                                            Stockage:{" "}
                                            {formatNumber(
                                                resultats.bilanGES.stockage
                                            )}
                                        </span>
                                        <span>
                                            Émissions:{" "}
                                            {formatNumber(
                                                resultats.bilanGES.emissions
                                                    .total
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
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
                                const maxEmissions = Math.max(
                                    ...emissionsData.map((d) => d.emissions)
                                );
                                const percentage =
                                    maxEmissions > 0
                                        ? (item.emissions / maxEmissions) * 100
                                        : 0;

                                return (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">
                                                {item.culture}
                                            </span>
                                            <span>
                                                {formatNumber(item.emissions)}{" "}
                                                tCO2e/ha
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full bg-red-500"
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            FE:{" "}
                                            {formatNumber(
                                                item.facteurEmissions
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Informations IAE */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-4">
                        Infrastructure Agro-Écologique
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">IAE</span>
                            <span className="font-medium">
                                {scenario.iae.pourcentageIAE}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="h-2 rounded-full bg-green-500"
                                style={{
                                    width: `${scenario.iae.pourcentageIAE}%`,
                                }}
                            ></div>
                        </div>

                        <div className="pt-2 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Taille parcelles:
                                </span>
                                <span className="font-medium">
                                    {scenario.iae.tailleMoyenneParcelles} ha
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Certification:
                                </span>
                                <span className="font-medium">
                                    {scenario.iae.certificationEnvironnementale}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">OAD:</span>
                                <span className="font-medium">
                                    {scenario.iae.utilisationOAD
                                        ? "Oui"
                                        : "Non"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Informations chaulage */}
                {(scenario.chaulage.amendementCalcique > 0 ||
                    scenario.chaulage.quantiteHectare > 0) && (
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-4">
                            Chaulage
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Amendement calcique:
                                </span>
                                <span className="font-medium">
                                    {scenario.chaulage.amendementCalcique}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Quantité:</span>
                                <span className="font-medium">
                                    {scenario.chaulage.quantiteHectare} t/ha
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
