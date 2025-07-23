import { Scenario, ResultatScenario } from "../assets/scenarios.mock";

interface ScenarioFormProps {
    scenario: Scenario;
    editMode: boolean;
    scenarioComparaison?: Scenario | null;
    resultatsComparaison?: ResultatScenario | null;
}

export default function ScenarioForm({ 
    scenario, 
    editMode, 
    scenarioComparaison, 
    resultatsComparaison 
}: ScenarioFormProps) {
    const formatNumber = (num: number) => num.toFixed(2);

    const getComparisonIndicator = (current: number, comparison?: number) => {
        if (!comparison) return null;
        const diff = current - comparison;
        if (Math.abs(diff) < 0.01) return null;
        
        return (
            <span className={`ml-2 text-sm font-medium ${diff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({diff > 0 ? '+' : ''}{formatNumber(diff)})
            </span>
        );
    };

    return (
        <div className="p-6 space-y-8">
            {/* IAE (Infrastructure Agro-Écologique) */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">IAE (Infrastructure Agro-Écologique)</h3>
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
                                {getComparisonIndicator(scenario.iae.pourcentageIAE, scenarioComparaison?.iae.pourcentageIAE)}
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
                                value={scenario.iae.tailleMoyenneParcelles}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                step="0.1"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">
                                {scenario.iae.tailleMoyenneParcelles} ha
                                {getComparisonIndicator(scenario.iae.tailleMoyenneParcelles, scenarioComparaison?.iae.tailleMoyenneParcelles)}
                            </p>
                        )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Certification environnementale
                        </label>
                        {editMode ? (
                            <select
                                value={scenario.iae.certificationEnvironnementale}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="NA">NA</option>
                                <option value="HVE">HVE</option>
                                <option value="AB">AB</option>
                            </select>
                        ) : (
                            <p className="text-gray-900 font-medium">
                                {scenario.iae.certificationEnvironnementale}
                                {scenarioComparaison && scenario.iae.certificationEnvironnementale !== scenarioComparaison.iae.certificationEnvironnementale && (
                                    <span className="ml-2 text-sm text-blue-600 font-medium">
                                        (vs {scenarioComparaison.iae.certificationEnvironnementale})
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
                                value={scenario.iae.utilisationOAD ? 'true' : 'false'}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="false">Non</option>
                                <option value="true">Oui</option>
                            </select>
                        ) : (
                            <p className="text-gray-900 font-medium">
                                {scenario.iae.utilisationOAD ? 'Oui' : 'Non'}
                                {scenarioComparaison && scenario.iae.utilisationOAD !== scenarioComparaison.iae.utilisationOAD && (
                                    <span className="ml-2 text-sm text-blue-600 font-medium">
                                        (vs {scenarioComparaison.iae.utilisationOAD ? 'Oui' : 'Non'})
                                    </span>
                                )}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Chaulage */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Chaulage des sols acides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amendement calcique
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                value={scenario.chaulage.amendementCalcique}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                step="0.1"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">
                                {scenario.chaulage.amendementCalcique}
                                {getComparisonIndicator(scenario.chaulage.amendementCalcique, scenarioComparaison?.chaulage.amendementCalcique)}
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
                                value={scenario.chaulage.quantiteHectare}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                step="0.1"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">
                                {scenario.chaulage.quantiteHectare} t/ha
                                {getComparisonIndicator(scenario.chaulage.quantiteHectare, scenarioComparaison?.chaulage.quantiteHectare)}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Cultures */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Rotation et ITK</h3>
                <div className="space-y-6">
                    {scenario.cultures.map((ligneCulture, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="text-lg font-medium text-gray-800 mb-4">
                                Culture {index + 1}: {ligneCulture.culture.culture}
                            </h4>
                            
                            {/* Informations culture */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="bg-green-50 p-3 rounded">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Surface (ha)</label>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={ligneCulture.culture.surface}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                            step="0.1"
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium">{ligneCulture.culture.surface} ha</p>
                                    )}
                                </div>
                                <div className="bg-green-50 p-3 rounded">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rendement (T/ha)</label>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            value={ligneCulture.culture.rendement}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                            step="0.1"
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium">
                                            {ligneCulture.culture.rendement} T/ha
                                            {scenarioComparaison && scenarioComparaison.cultures[index] && 
                                                getComparisonIndicator(
                                                    ligneCulture.culture.rendement, 
                                                    scenarioComparaison.cultures[index]?.culture.rendement
                                                )
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="bg-green-50 p-3 rounded">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Semis</label>
                                    {editMode ? (
                                        <input
                                            type="date"
                                            value={ligneCulture.culture.semis}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium">{ligneCulture.culture.semis}</p>
                                    )}
                                </div>
                                <div className="bg-green-50 p-3 rounded">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Récolte</label>
                                    {editMode ? (
                                        <input
                                            type="date"
                                            value={ligneCulture.culture.recolte}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium">{ligneCulture.culture.recolte}</p>
                                    )}
                                </div>
                            </div>

                            {/* Interculture */}
                            {ligneCulture.interculture && (
                                <div className="mb-6">
                                    <h5 className="font-medium text-gray-700 mb-3">Interculture</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="bg-yellow-50 p-3 rounded">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Couvert</label>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    value={ligneCulture.interculture.couvert}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{ligneCulture.interculture.couvert}</p>
                                            )}
                                        </div>
                                        <div className="bg-yellow-50 p-3 rounded">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Biomasse (T MS/ha)</label>
                                            {editMode ? (
                                                <input
                                                    type="number"
                                                    value={ligneCulture.interculture.biomasse}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                    step="0.1"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">
                                                    {ligneCulture.interculture.biomasse} T MS/ha
                                                    {scenarioComparaison && scenarioComparaison.cultures[index]?.interculture &&
                                                        getComparisonIndicator(
                                                            ligneCulture.interculture.biomasse,
                                                            scenarioComparaison.cultures[index]?.interculture?.biomasse
                                                        )
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="bg-yellow-50 p-3 rounded">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Semis</label>
                                            {editMode ? (
                                                <input
                                                    type="date"
                                                    value={ligneCulture.interculture.semis}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{ligneCulture.interculture.semis}</p>
                                            )}
                                        </div>
                                        <div className="bg-yellow-50 p-3 rounded">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Destruction</label>
                                            {editMode ? (
                                                <input
                                                    type="date"
                                                    value={ligneCulture.interculture.destruction}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{ligneCulture.interculture.destruction}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Fertilisation */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Amendements organiques */}
                                <div>
                                    <h5 className="font-medium text-gray-700 mb-3">Amendements organiques</h5>
                                    <div className="space-y-3">
                                        {ligneCulture.amendementOrganique1 && (
                                            <div className="bg-orange-50 p-3 rounded">
                                                <p className="text-sm font-medium text-gray-700">
                                                    {ligneCulture.amendementOrganique1.pro} - {ligneCulture.amendementOrganique1.quantite} {ligneCulture.amendementOrganique1.unite}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Enfouissement: {ligneCulture.amendementOrganique1.enfouissement ? 'Oui' : 'Non'}
                                                </p>
                                            </div>
                                        )}
                                        {ligneCulture.amendementOrganique2 && (
                                            <div className="bg-orange-50 p-3 rounded">
                                                <p className="text-sm font-medium text-gray-700">
                                                    {ligneCulture.amendementOrganique2.pro} - {ligneCulture.amendementOrganique2.quantite} {ligneCulture.amendementOrganique2.unite}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Enfouissement: {ligneCulture.amendementOrganique2.enfouissement ? 'Oui' : 'Non'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Fertilisation azotée */}
                                <div>
                                    <h5 className="font-medium text-gray-700 mb-3">Fertilisation azotée</h5>
                                    <div className="space-y-3">
                                        {[ligneCulture.fertilisationAzotee1, ligneCulture.fertilisationAzotee2, ligneCulture.fertilisationAzotee3]
                                            .filter(Boolean)
                                            .map((ferti, idx) => (
                                                <div key={idx} className="bg-blue-50 p-3 rounded">
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {ferti!.formeEngrais} - {ferti!.quantite} {ferti!.unite}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Inhibiteur: {ferti!.inhibiteurNitrification ? 'Oui' : 'Non'}
                                                    </p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Fumure de fond */}
                            {ligneCulture.fumureFond && (
                                <div className="mt-4">
                                    <h5 className="font-medium text-gray-700 mb-3">Fumure de fond</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-purple-50 p-3 rounded">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phosphate P (kg P/ha)</label>
                                            <p className="text-gray-900 font-medium">{ligneCulture.fumureFond.phosphateP} kg P/ha</p>
                                        </div>
                                        <div className="bg-purple-50 p-3 rounded">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Potasse K (kg K/ha)</label>
                                            <p className="text-gray-900 font-medium">{ligneCulture.fumureFond.potasseK} kg K/ha</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}