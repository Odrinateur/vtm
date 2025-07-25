import type { Scenario, ResultatScenario } from "../assets/scenarios.mock";
import { useState } from "react";

interface ScenarioFormProps {
    scenario: Scenario;
    editMode: boolean;
    scenarioComparaison?: Scenario | null;
    resultatsComparaison?: ResultatScenario | null;
    tableMode: boolean;
}

export default function ScenarioForm({
    scenario,
    editMode,
    scenarioComparaison,
    resultatsComparaison,
    tableMode,
}: ScenarioFormProps) {
    const [collapsedSections, setCollapsedSections] = useState<
        Record<string, boolean>
    >({});
    const [collapsedCultures, setCollapsedCultures] = useState<
        Record<number, boolean>
    >({});
    // const [tableMode, setTableMode] = useState(false); // supprimé, on utilise la prop

    const formatNumber = (num: number) => num.toFixed(2);

    const getComparisonIndicator = (current: number, comparison?: number) => {
        if (!comparison) return null;
        const diff = current - comparison;
        if (Math.abs(diff) < 0.01) return null;

        return (
            <span
                className={`ml-2 text-sm font-medium ${
                    diff > 0 ? "text-green-600" : "text-red-600"
                }`}
            >
                ({diff > 0 ? "+" : ""}
                {formatNumber(diff)})
            </span>
        );
    };

    const toggleSection = (sectionName: string) => {
        setCollapsedSections((prev) => ({
            ...prev,
            [sectionName]: !prev[sectionName],
        }));
    };

    const toggleCulture = (index: number) => {
        setCollapsedCultures((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const addCulture = () => {
        // Logique pour ajouter une nouvelle culture
        console.log("Ajouter une nouvelle culture");
    };

    // Supprimer le switch Formulaire/Tableau du JSX
    if (tableMode && scenario.cultures.length > 0) {
        return (
            <div className="space-y-6">
                {/* Mode tableau */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Culture
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Surface (ha)
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rendement (T/ha)
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Semis
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Récolte
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Couvert
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Biomasse
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {scenario.cultures.map((ligneCulture, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">
                                        {ligneCulture.culture.culture}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.culture.surface}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.culture.rendement}
                                        {scenarioComparaison &&
                                            scenarioComparaison.cultures[
                                                index
                                            ] &&
                                            getComparisonIndicator(
                                                ligneCulture.culture.rendement,
                                                scenarioComparaison.cultures[
                                                    index
                                                ]?.culture.rendement
                                            )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.culture.semis}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.culture.recolte}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.interculture?.couvert ||
                                            "N/A"}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.interculture?.biomasse ||
                                            "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* IAE (Infrastructure Agro-Écologique) - Section repliable */}
            <div className="border border-gray-200 rounded-lg">
                <button
                    onClick={() => toggleSection("iae")}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                >
                    <h3 className="text-lg font-semibold text-gray-900">
                        IAE (Infrastructure Agro-Écologique)
                    </h3>
                    <svg
                        className={`w-5 h-5 transition-transform ${
                            collapsedSections.iae ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
                {!collapsedSections.iae && (
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pourcentage d'IAE
                                </label>
                                {editMode ? (
                                    <input
                                        type="number"
                                        value={scenario.iae.pourcentageIAE}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        step="0.1"
                                    />
                                ) : (
                                    <p className="text-gray-900 font-medium">
                                        {scenario.iae.pourcentageIAE}%
                                        {getComparisonIndicator(
                                            scenario.iae.pourcentageIAE,
                                            scenarioComparaison?.iae
                                                .pourcentageIAE
                                        )}
                                    </p>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Taille moyenne des parcelles (ha)
                                </label>
                                {editMode ? (
                                    <input
                                        type="number"
                                        value={
                                            scenario.iae.tailleMoyenneParcelles
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        step="0.1"
                                    />
                                ) : (
                                    <p className="text-gray-900 font-medium">
                                        {scenario.iae.tailleMoyenneParcelles} ha
                                        {getComparisonIndicator(
                                            scenario.iae.tailleMoyenneParcelles,
                                            scenarioComparaison?.iae
                                                .tailleMoyenneParcelles
                                        )}
                                    </p>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Certification environnementale
                                </label>
                                {editMode ? (
                                    <select
                                        value={
                                            scenario.iae
                                                .certificationEnvironnementale
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="NA">NA</option>
                                        <option value="HVE">HVE</option>
                                        <option value="AB">AB</option>
                                    </select>
                                ) : (
                                    <p className="text-gray-900 font-medium">
                                        {
                                            scenario.iae
                                                .certificationEnvironnementale
                                        }
                                        {scenarioComparaison &&
                                            scenario.iae
                                                .certificationEnvironnementale !==
                                                scenarioComparaison.iae
                                                    .certificationEnvironnementale && (
                                                <span className="ml-2 text-sm text-blue-600 font-medium">
                                                    (vs{" "}
                                                    {
                                                        scenarioComparaison.iae
                                                            .certificationEnvironnementale
                                                    }
                                                    )
                                                </span>
                                            )}
                                    </p>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Utilisation d'un OAD
                                </label>
                                {editMode ? (
                                    <select
                                        value={
                                            scenario.iae.utilisationOAD
                                                ? "true"
                                                : "false"
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="false">Non</option>
                                        <option value="true">Oui</option>
                                    </select>
                                ) : (
                                    <p className="text-gray-900 font-medium">
                                        {scenario.iae.utilisationOAD
                                            ? "Oui"
                                            : "Non"}
                                        {scenarioComparaison &&
                                            scenario.iae.utilisationOAD !==
                                                scenarioComparaison.iae
                                                    .utilisationOAD && (
                                                <span className="ml-2 text-sm text-blue-600 font-medium">
                                                    (vs{" "}
                                                    {scenarioComparaison.iae
                                                        .utilisationOAD
                                                        ? "Oui"
                                                        : "Non"}
                                                    )
                                                </span>
                                            )}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chaulage - Section repliable */}
            <div className="border border-gray-200 rounded-lg">
                <button
                    onClick={() => toggleSection("chaulage")}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                >
                    <h3 className="text-lg font-semibold text-gray-900">
                        Chaulage des sols acides
                    </h3>
                    <svg
                        className={`w-5 h-5 transition-transform ${
                            collapsedSections.chaulage
                                ? "transform rotate-180"
                                : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
                {!collapsedSections.chaulage && (
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Amendement calcique
                                </label>
                                {editMode ? (
                                    <input
                                        type="number"
                                        value={
                                            scenario.chaulage.amendementCalcique
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        step="0.1"
                                    />
                                ) : (
                                    <p className="text-gray-900 font-medium">
                                        {scenario.chaulage.amendementCalcique}
                                        {getComparisonIndicator(
                                            scenario.chaulage
                                                .amendementCalcique,
                                            scenarioComparaison?.chaulage
                                                .amendementCalcique
                                        )}
                                    </p>
                                )}
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantité t/hectare
                                </label>
                                {editMode ? (
                                    <input
                                        type="number"
                                        value={
                                            scenario.chaulage.quantiteHectare
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        step="0.1"
                                    />
                                ) : (
                                    <p className="text-gray-900 font-medium">
                                        {scenario.chaulage.quantiteHectare} t/ha
                                        {getComparisonIndicator(
                                            scenario.chaulage.quantiteHectare,
                                            scenarioComparaison?.chaulage
                                                .quantiteHectare
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Cultures - Section avec bouton d'ajout */}
            <button
                onClick={addCulture}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
                + Ajouter une culture
            </button>
            <div className="space-y-4">
                {scenario.cultures.map((ligneCulture, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg"
                    >
                        <button
                            onClick={() => toggleCulture(index)}
                            className="w-full px-4 py-3 flex items-center justify-between bg-green-50 hover:bg-green-100 transition-colors rounded-t-lg"
                        >
                            <div className="flex items-center space-x-4">
                                <h4 className="text-md font-medium text-gray-800">
                                    {ligneCulture.culture.culture}
                                </h4>
                                <div className="flex space-x-4 text-sm text-gray-600">
                                    <span>
                                        {ligneCulture.culture.surface} ha
                                    </span>
                                    <span>
                                        {ligneCulture.culture.rendement} T/ha
                                    </span>
                                    <span>
                                        {ligneCulture.culture.semis} →{" "}
                                        {ligneCulture.culture.recolte}
                                    </span>
                                </div>
                            </div>
                            <svg
                                className={`w-5 h-5 transition-transform ${
                                    collapsedCultures[index]
                                        ? "transform rotate-180"
                                        : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {!collapsedCultures[index] && (
                            <div className="p-4">
                                {/* Informations culture */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-green-50 p-3 rounded">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Surface (ha)
                                        </label>
                                        {editMode ? (
                                            <input
                                                type="number"
                                                value={
                                                    ligneCulture.culture.surface
                                                }
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                step="0.1"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium">
                                                {ligneCulture.culture.surface}{" "}
                                                ha
                                            </p>
                                        )}
                                    </div>
                                    <div className="bg-green-50 p-3 rounded">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Rendement (T/ha)
                                        </label>
                                        {editMode ? (
                                            <input
                                                type="number"
                                                value={
                                                    ligneCulture.culture
                                                        .rendement
                                                }
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                step="0.1"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium">
                                                {ligneCulture.culture.rendement}{" "}
                                                T/ha
                                                {scenarioComparaison &&
                                                    scenarioComparaison
                                                        .cultures[index] &&
                                                    getComparisonIndicator(
                                                        ligneCulture.culture
                                                            .rendement,
                                                        scenarioComparaison
                                                            .cultures[index]
                                                            ?.culture.rendement
                                                    )}
                                            </p>
                                        )}
                                    </div>
                                    <div className="bg-green-50 p-3 rounded">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Semis
                                        </label>
                                        {editMode ? (
                                            <input
                                                type="date"
                                                value={
                                                    ligneCulture.culture.semis
                                                }
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium">
                                                {ligneCulture.culture.semis}
                                            </p>
                                        )}
                                    </div>
                                    <div className="bg-green-50 p-3 rounded">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Récolte
                                        </label>
                                        {editMode ? (
                                            <input
                                                type="date"
                                                value={
                                                    ligneCulture.culture.recolte
                                                }
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium">
                                                {ligneCulture.culture.recolte}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Section Interculture si elle existe */}
                                {ligneCulture.interculture && (
                                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                        <h5 className="font-medium text-gray-800 mb-3">
                                            Interculture
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Couvert
                                                </label>
                                                <p className="text-gray-900 font-medium">
                                                    {
                                                        ligneCulture
                                                            .interculture
                                                            .couvert
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Biomasse
                                                </label>
                                                <p className="text-gray-900 font-medium">
                                                    {
                                                        ligneCulture
                                                            .interculture
                                                            .biomasse
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Semis
                                                </label>
                                                <p className="text-gray-900 font-medium">
                                                    {
                                                        ligneCulture
                                                            .interculture.semis
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Destruction
                                                </label>
                                                <p className="text-gray-900 font-medium">
                                                    {
                                                        ligneCulture
                                                            .interculture
                                                            .destruction
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Sections amendements et fertilisation peuvent être ajoutées ici */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
