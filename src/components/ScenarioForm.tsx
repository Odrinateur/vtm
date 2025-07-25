import type { Scenario, ResultatScenario } from "../assets/scenarios.mock";
import { useState } from "react";
import { materielDelais, engraisMineraux } from "../assets/admin-data";

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

    const getComparisonIndicator = (
        current: number | string | boolean,
        comparison?: number | string | boolean
    ) => {
        if (comparison === undefined || comparison === null) return null;
        if (typeof current === "number" && typeof comparison === "number") {
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
        }
        if (typeof current === "boolean" && typeof comparison === "boolean") {
            if (current === comparison) return null;
            return (
                <span className="ml-2 text-sm font-medium text-blue-600">
                    (vs {comparison ? "Oui" : "Non"})
                </span>
            );
        }
        if (typeof current === "string" && typeof comparison === "string") {
            if (current === comparison) return null;
            return (
                <span className="ml-2 text-sm font-medium text-blue-600">
                    (vs {comparison})
                </span>
            );
        }
        return null;
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
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amendement org. (type)
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amendement org. (qté)
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amendement org. (unité)
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fertilisation N (forme)
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fertilisation N (qté)
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fertilisation N (unité)
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fumure fond (P)
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fumure fond (K)
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
                                        {scenarioComparaison &&
                                            getComparisonIndicator(
                                                ligneCulture.culture.surface ??
                                                    0,
                                                (
                                                    scenarioComparaison
                                                        ?.cultures?.[index] ||
                                                    {}
                                                ).culture?.surface ?? 0
                                            )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.culture.rendement}
                                        {scenarioComparaison &&
                                            getComparisonIndicator(
                                                ligneCulture.culture
                                                    .rendement ?? 0,
                                                (
                                                    scenarioComparaison
                                                        ?.cultures?.[index] ||
                                                    {}
                                                ).culture?.rendement ?? 0
                                            )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.culture.semis}
                                        {scenario.type === "previsionnel" &&
                                            scenarioComparaison &&
                                            scenarioComparaison.cultures[
                                                index
                                            ] &&
                                            ligneCulture.culture.semis !==
                                                scenarioComparaison.cultures[
                                                    index
                                                ]?.culture.semis && (
                                                <span className="ml-2 text-sm text-blue-600 font-medium">
                                                    (T0:{" "}
                                                    {
                                                        scenarioComparaison
                                                            .cultures[index]
                                                            ?.culture.semis
                                                    }
                                                    )
                                                </span>
                                            )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.culture.recolte}
                                        {scenario.type === "previsionnel" &&
                                            scenarioComparaison &&
                                            scenarioComparaison.cultures[
                                                index
                                            ] &&
                                            ligneCulture.culture.recolte !==
                                                scenarioComparaison.cultures[
                                                    index
                                                ]?.culture.recolte && (
                                                <span className="ml-2 text-sm text-blue-600 font-medium">
                                                    (T0:{" "}
                                                    {
                                                        scenarioComparaison
                                                            .cultures[index]
                                                            ?.culture.recolte
                                                    }
                                                    )
                                                </span>
                                            )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.interculture?.couvert}
                                        {scenario.type === "previsionnel" &&
                                            scenarioComparaison &&
                                            scenarioComparaison.cultures[
                                                index
                                            ] &&
                                            ligneCulture.interculture
                                                ?.couvert !==
                                                scenarioComparaison.cultures[
                                                    index
                                                ]?.interculture?.couvert && (
                                                <span className="ml-2 text-sm text-blue-600 font-medium">
                                                    (T0:{" "}
                                                    {
                                                        scenarioComparaison
                                                            .cultures[index]
                                                            ?.interculture
                                                            ?.couvert
                                                    }
                                                    )
                                                </span>
                                            )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.interculture?.biomasse}
                                        {scenarioComparaison &&
                                            getComparisonIndicator(
                                                ligneCulture.interculture
                                                    ?.biomasse ?? 0,
                                                (
                                                    scenarioComparaison
                                                        ?.cultures?.[index] ||
                                                    {}
                                                ).interculture?.biomasse ?? 0
                                            )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.amendementOrganique1?.pro}
                                        {ligneCulture.amendementOrganique1
                                            ?.pro !==
                                            scenarioComparaison?.cultures[index]
                                                ?.amendementOrganique1?.pro && (
                                            <span className="ml-2 text-sm text-blue-600 font-medium">
                                                (T0:{" "}
                                                {
                                                    scenarioComparaison
                                                        ?.cultures?.[index]
                                                        ?.amendementOrganique1
                                                        ?.pro
                                                }
                                                )
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {
                                            ligneCulture.amendementOrganique1
                                                ?.quantite
                                        }
                                        {ligneCulture.amendementOrganique1
                                            ?.quantite !==
                                            scenarioComparaison?.cultures[index]
                                                ?.amendementOrganique1
                                                ?.quantite && (
                                            <span className="ml-2 text-sm text-blue-600 font-medium">
                                                (T0:{" "}
                                                {
                                                    scenarioComparaison
                                                        ?.cultures[index]
                                                        ?.amendementOrganique1
                                                        ?.quantite
                                                }
                                                )
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {
                                            ligneCulture.amendementOrganique1
                                                ?.unite
                                        }
                                        {ligneCulture.amendementOrganique1
                                            ?.unite !==
                                            scenarioComparaison?.cultures[index]
                                                ?.amendementOrganique1
                                                ?.unite && (
                                            <span className="ml-2 text-sm text-blue-600 font-medium">
                                                (T0:{" "}
                                                {
                                                    scenarioComparaison
                                                        ?.cultures[index]
                                                        ?.amendementOrganique1
                                                        ?.unite
                                                }
                                                )
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {
                                            ligneCulture.fertilisationAzotee1
                                                ?.engraisMineral
                                        }
                                        {ligneCulture.fertilisationAzotee1
                                            ?.engraisMineral !==
                                            scenarioComparaison?.cultures[index]
                                                ?.fertilisationAzotee1
                                                ?.engraisMineral && (
                                            <span className="ml-2 text-sm text-blue-600 font-medium">
                                                (T0:{" "}
                                                {
                                                    scenarioComparaison
                                                        ?.cultures[index]
                                                        ?.fertilisationAzotee1
                                                        ?.engraisMineral
                                                }
                                                )
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {
                                            ligneCulture.fertilisationAzotee1
                                                ?.quantite
                                        }
                                        {ligneCulture.fertilisationAzotee1
                                            ?.quantite !==
                                            scenarioComparaison?.cultures[index]
                                                ?.fertilisationAzotee1
                                                ?.quantite && (
                                            <span className="ml-2 text-sm text-blue-600 font-medium">
                                                (T0:{" "}
                                                {
                                                    scenarioComparaison
                                                        ?.cultures[index]
                                                        ?.fertilisationAzotee1
                                                        ?.quantite
                                                }
                                                )
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {
                                            ligneCulture.fertilisationAzotee1
                                                ?.unite
                                        }
                                        {ligneCulture.fertilisationAzotee1
                                            ?.unite !==
                                            scenarioComparaison?.cultures[index]
                                                ?.fertilisationAzotee1
                                                ?.unite && (
                                            <span className="ml-2 text-sm text-blue-600 font-medium">
                                                (T0:{" "}
                                                {
                                                    scenarioComparaison
                                                        ?.cultures[index]
                                                        ?.fertilisationAzotee1
                                                        ?.unite
                                                }
                                                )
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.fumureFond?.phosphateP}
                                        {scenarioComparaison &&
                                            getComparisonIndicator(
                                                ligneCulture.fumureFond
                                                    ?.phosphateP ?? 0,
                                                (
                                                    scenarioComparaison
                                                        ?.cultures?.[index] ||
                                                    {}
                                                ).fumureFond?.phosphateP ?? 0
                                            )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ligneCulture.fumureFond?.potasseK}
                                        {scenarioComparaison &&
                                            getComparisonIndicator(
                                                ligneCulture.fumureFond
                                                    ?.potasseK ?? 0,
                                                (
                                                    scenarioComparaison
                                                        ?.cultures?.[index] ||
                                                    {}
                                                ).fumureFond?.potasseK ?? 0
                                            )}
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
                                        {getComparisonIndicator(
                                            scenario.iae
                                                .certificationEnvironnementale,
                                            scenarioComparaison?.iae
                                                .certificationEnvironnementale
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
                                        {getComparisonIndicator(
                                            scenario.iae.utilisationOAD,
                                            scenarioComparaison?.iae
                                                .utilisationOAD
                                        )}
                                    </p>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Consommation de carburant
                                </label>
                                {editMode ? (
                                    <input
                                        type="number"
                                        value={
                                            scenario.iae.consommationCarburant
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        step="0.1"
                                    />
                                ) : (
                                    <p className="text-gray-900 font-medium">
                                        {scenario.iae.consommationCarburant}
                                        {getComparisonIndicator(
                                            scenario.iae.consommationCarburant,
                                            scenarioComparaison?.iae
                                                .consommationCarburant
                                        )}
                                    </p>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type de carburant
                                </label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        value={scenario.iae.typeCarburant}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        step="0.1"
                                    />
                                ) : (
                                    <p className="text-gray-900 font-medium">
                                        {scenario.iae.typeCarburant}
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre d'hectares
                                </label>
                                {editMode ? (
                                    <input
                                        type="number"
                                        value={scenario.chaulage.nombreHectare}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        step="0.1"
                                    />
                                ) : (
                                    <p className="text-gray-900 font-medium">
                                        {scenario.chaulage.nombreHectare} ha
                                        {getComparisonIndicator(
                                            scenario.chaulage.nombreHectare,
                                            scenarioComparaison?.chaulage
                                                .nombreHectare
                                        )}
                                    </p>
                                )}
                            </div>
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
                            className="w-full px-4 py-3 flex items-center justify-between transition-colors rounded-t-lg bg-gray-50 hover:bg-gray-100"
                        >
                            <div className="flex items-center space-x-4">
                                <h4 className="text-md font-semibold text-gray-800">
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
                                                {getComparisonIndicator(
                                                    ligneCulture.culture
                                                        .surface,
                                                    (
                                                        scenarioComparaison
                                                            ?.cultures?.[
                                                            index
                                                        ] || {}
                                                    ).culture?.surface
                                                )}
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
                                                {getComparisonIndicator(
                                                    ligneCulture.culture
                                                        .rendement,
                                                    (
                                                        scenarioComparaison
                                                            ?.cultures?.[
                                                            index
                                                        ] || {}
                                                    ).culture?.rendement
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

                                {/* Interculture */}
                                {ligneCulture.interculture && (
                                    <div className="mb-6">
                                        <h5 className="font-medium text-gray-700 mb-3">
                                            Interculture
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="bg-yellow-50 p-3 rounded">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Couvert
                                                </label>
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        value={
                                                            ligneCulture
                                                                .interculture
                                                                .couvert
                                                        }
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 font-medium">
                                                        {
                                                            ligneCulture
                                                                .interculture
                                                                .couvert
                                                        }
                                                        {scenario.type ===
                                                            "previsionnel" &&
                                                            scenarioComparaison &&
                                                            scenarioComparaison
                                                                .cultures[index]
                                                                ?.interculture &&
                                                            ligneCulture
                                                                .interculture
                                                                .couvert !==
                                                                scenarioComparaison
                                                                    .cultures[
                                                                    index
                                                                ]?.interculture
                                                                    ?.couvert && (
                                                                <span className="ml-2 text-sm text-blue-600 font-medium">
                                                                    (T0:{" "}
                                                                    {
                                                                        scenarioComparaison
                                                                            .cultures[
                                                                            index
                                                                        ]
                                                                            ?.interculture
                                                                            ?.couvert
                                                                    }
                                                                    )
                                                                </span>
                                                            )}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="bg-yellow-50 p-3 rounded">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Biomasse (T MS/ha)
                                                </label>
                                                {editMode ? (
                                                    <input
                                                        type="number"
                                                        value={
                                                            ligneCulture
                                                                .interculture
                                                                .biomasse
                                                        }
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                        step="0.1"
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 font-medium">
                                                        {
                                                            ligneCulture
                                                                .interculture
                                                                .biomasse
                                                        }{" "}
                                                        T MS/ha
                                                        {getComparisonIndicator(
                                                            ligneCulture
                                                                .interculture
                                                                .biomasse ?? 0,
                                                            (
                                                                scenarioComparaison
                                                                    ?.cultures?.[
                                                                    index
                                                                ] || {}
                                                            ).interculture
                                                                ?.biomasse ?? 0
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="bg-yellow-50 p-3 rounded">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Semis
                                                </label>
                                                {editMode ? (
                                                    <input
                                                        type="date"
                                                        value={
                                                            ligneCulture
                                                                .interculture
                                                                .semis
                                                        }
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 font-medium">
                                                        {
                                                            ligneCulture
                                                                .interculture
                                                                .semis
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div className="bg-yellow-50 p-3 rounded">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Destruction
                                                </label>
                                                {editMode ? (
                                                    <input
                                                        type="date"
                                                        value={
                                                            ligneCulture
                                                                .interculture
                                                                .destruction
                                                        }
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 font-medium">
                                                        {
                                                            ligneCulture
                                                                .interculture
                                                                .destruction
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Fertilisation */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Amendements organiques */}
                                    <div>
                                        <h5 className="font-medium text-gray-700 mb-3">
                                            Amendements organiques
                                        </h5>
                                        <div className="space-y-3">
                                            {ligneCulture.amendementOrganique1 && (
                                                <div className="bg-orange-50 p-3 rounded">
                                                    {editMode ? (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                                                            <input
                                                                type="text"
                                                                value={
                                                                    ligneCulture
                                                                        .amendementOrganique1
                                                                        .pro
                                                                }
                                                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                                placeholder="Type"
                                                                // onChange={...}
                                                            />
                                                            <input
                                                                type="number"
                                                                value={
                                                                    ligneCulture
                                                                        .amendementOrganique1
                                                                        .quantite
                                                                }
                                                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                                placeholder="Quantité"
                                                                step="0.1"
                                                                // onChange={...}
                                                            />
                                                            <input
                                                                type="text"
                                                                value={
                                                                    ligneCulture
                                                                        .amendementOrganique1
                                                                        .unite
                                                                }
                                                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                                placeholder="Unité"
                                                                // onChange={...}
                                                            />
                                                            {/* Pour le select enfouissement (amendement organique) */}
                                                            {editMode ? (
                                                                <select
                                                                    value={
                                                                        ligneCulture
                                                                            .amendementOrganique1
                                                                            ?.enfouissementMaterielDelais ||
                                                                        ""
                                                                    }
                                                                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                                    // onChange={...}
                                                                >
                                                                    <option value="">
                                                                        Sélectionner
                                                                        un
                                                                        matériel/délai
                                                                    </option>
                                                                    {materielDelais.map(
                                                                        (m) => (
                                                                            <option
                                                                                key={
                                                                                    m.materielDelais
                                                                                }
                                                                                value={
                                                                                    m.materielDelais
                                                                                }
                                                                            >
                                                                                {
                                                                                    m.materielDelais
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            ) : (
                                                                <span>
                                                                    {ligneCulture
                                                                        .amendementOrganique1
                                                                        ?.enfouissementMaterielDelais ||
                                                                        ""}
                                                                </span>
                                                            )}
                                                            <label className="flex items-center text-xs">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        ligneCulture
                                                                            .amendementOrganique1
                                                                            .inhibiteurNitrification
                                                                    }
                                                                    className="mr-1"
                                                                    // onChange={...}
                                                                />
                                                                Inhibiteur
                                                            </label>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <p className="text-sm font-medium text-gray-700">
                                                                {
                                                                    ligneCulture
                                                                        .amendementOrganique1
                                                                        .pro
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                    ligneCulture
                                                                        .amendementOrganique1
                                                                        .quantite
                                                                }{" "}
                                                                {
                                                                    ligneCulture
                                                                        .amendementOrganique1
                                                                        .unite
                                                                }
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                Enfouissement:{" "}
                                                                {ligneCulture
                                                                    .amendementOrganique1
                                                                    .enfouissementMaterielDelais ||
                                                                    ""}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                Inhibiteur:{" "}
                                                                {ligneCulture
                                                                    .amendementOrganique1
                                                                    .inhibiteurNitrification
                                                                    ? "Oui"
                                                                    : "Non"}
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                            {/* Même logique pour amendementOrganique2 si besoin */}
                                        </div>
                                    </div>

                                    {/* Fertilisation azotée */}
                                    <div>
                                        <h5 className="font-medium text-gray-700 mb-3">
                                            Fertilisation azotée
                                        </h5>
                                        <div className="space-y-3">
                                            {[
                                                ligneCulture.fertilisationAzotee1,
                                                ligneCulture.fertilisationAzotee2,
                                                ligneCulture.fertilisationAzotee3,
                                            ]
                                                .filter(Boolean)
                                                .map((ferti, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="bg-blue-50 p-3 rounded"
                                                    >
                                                        {editMode ? (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                                                                {/* Pour le select forme d'engrais (fertilisation azotée) */}
                                                                <select
                                                                    value={
                                                                        ferti?.engraisMineral ||
                                                                        ""
                                                                    }
                                                                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                                    // onChange={...}
                                                                >
                                                                    <option value="">
                                                                        Sélectionner
                                                                        un
                                                                        engrais
                                                                    </option>
                                                                    {engraisMineraux.map(
                                                                        (e) => (
                                                                            <option
                                                                                key={
                                                                                    e.nom
                                                                                }
                                                                                value={
                                                                                    e.nom
                                                                                }
                                                                            >
                                                                                {
                                                                                    e.nom
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                                <input
                                                                    type="number"
                                                                    value={
                                                                        ferti!
                                                                            .quantite
                                                                    }
                                                                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                                    placeholder="Quantité"
                                                                    step="0.1"
                                                                    // onChange={...}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        ferti!
                                                                            .unite
                                                                    }
                                                                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                                    placeholder="Unité"
                                                                    // onChange={...}
                                                                />
                                                                <label className="flex items-center text-xs">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={
                                                                            ferti!
                                                                                .inhibiteurNitrification
                                                                        }
                                                                        className="mr-1"
                                                                        // onChange={...}
                                                                    />
                                                                    Inhibiteur
                                                                </label>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <p className="text-sm font-medium text-gray-700">
                                                                    {
                                                                        ferti!
                                                                            .engraisMineral
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        ferti!
                                                                            .quantite
                                                                    }{" "}
                                                                    {
                                                                        ferti!
                                                                            .unite
                                                                    }
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    Inhibiteur:{" "}
                                                                    {ferti!
                                                                        .inhibiteurNitrification
                                                                        ? "Oui"
                                                                        : "Non"}
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Fumure de fond */}
                                {ligneCulture.fumureFond && (
                                    <div className="mt-4">
                                        <h5 className="font-medium text-gray-700 mb-3">
                                            Fumure de fond
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-purple-50 p-3 rounded">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Phosphate P (kg P/ha)
                                                </label>
                                                {editMode ? (
                                                    <input
                                                        type="number"
                                                        value={
                                                            ligneCulture
                                                                .fumureFond
                                                                .phosphateP
                                                        }
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                        step="0.1"
                                                        // onChange={...}
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 font-medium">
                                                        {
                                                            ligneCulture
                                                                .fumureFond
                                                                .phosphateP
                                                        }{" "}
                                                        kg P/ha
                                                        {getComparisonIndicator(
                                                            ligneCulture
                                                                .fumureFond
                                                                .phosphateP ??
                                                                0,
                                                            (
                                                                scenarioComparaison
                                                                    ?.cultures?.[
                                                                    index
                                                                ] || {}
                                                            ).fumureFond
                                                                ?.phosphateP ??
                                                                0
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="bg-purple-50 p-3 rounded">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Potasse K (kg K/ha)
                                                </label>
                                                {editMode ? (
                                                    <input
                                                        type="number"
                                                        value={
                                                            ligneCulture
                                                                .fumureFond
                                                                .potasseK
                                                        }
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                        step="0.1"
                                                        // onChange={...}
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 font-medium">
                                                        {
                                                            ligneCulture
                                                                .fumureFond
                                                                .potasseK
                                                        }{" "}
                                                        kg K/ha
                                                        {getComparisonIndicator(
                                                            ligneCulture
                                                                .fumureFond
                                                                .potasseK ?? 0,
                                                            (
                                                                scenarioComparaison
                                                                    ?.cultures?.[
                                                                    index
                                                                ] || {}
                                                            ).fumureFond
                                                                ?.potasseK ?? 0
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
