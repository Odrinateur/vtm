import { useParams, Link } from "react-router-dom";
import Layout from "../Layout";
import exploitations from "../assets/exploitations.mock";
import { scenarios, resultatsScenarios } from "../assets/scenarios.mock";

export default function ComparaisonPage() {
    const { id } = useParams<{ id: string }>();
    
    const exploitation = exploitations.find(exp => exp.id === id);
    const scenarioT0 = scenarios.find(s => s.exploitationId === id && s.type === 'T0');
    const scenarioPrev = scenarios.find(s => s.exploitationId === id && s.type === 'previsionnel');
    const resultatsT0 = resultatsScenarios.find(r => r.scenarioId === scenarioT0?.id);
    const resultatsPrev = resultatsScenarios.find(r => r.scenarioId === scenarioPrev?.id);

    if (!exploitation || !scenarioT0 || !scenarioPrev) {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Données de comparaison non trouvées</h1>
                    <Link to={`/exploitation/${id}`} className="text-blue-600 hover:underline">
                        Retour à l'exploitation
                    </Link>
                </div>
            </Layout>
        );
    }

    const formatNumber = (num: number | undefined) => {
        if (num === undefined) return "N/A";
        return num.toFixed(2);
    };

    const getDifference = (val1: number | undefined, val2: number | undefined) => {
        if (val1 === undefined || val2 === undefined) return null;
        const diff = val2 - val1;
        return {
            value: diff,
            percentage: val1 !== 0 ? (diff / Math.abs(val1)) * 100 : 0,
            isPositive: diff > 0
        };
    };

    const renderDifference = (diff: ReturnType<typeof getDifference>) => {
        if (!diff) return null;
        const color = diff.isPositive ? 'text-green-600' : 'text-red-600';
        const arrow = diff.isPositive ? '↗' : '↘';
        
        return (
            <div className={`text-sm font-medium ${color}`}>
                {arrow} {diff.isPositive ? '+' : ''}{formatNumber(diff.value)}
                {Math.abs(diff.percentage) > 0.1 && (
                    <span className="ml-1">({diff.isPositive ? '+' : ''}{diff.percentage.toFixed(1)}%)</span>
                )}
            </div>
        );
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{exploitation.nom}</h1>
                        <h2 className="text-xl text-gray-700 mt-1">Comparaison des scénarios</h2>
                    </div>
                    <Link 
                        to={`/exploitation/${id}`}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        ← Retour
                    </Link>
                </div>

                {/* Comparaison des indicateurs clés */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Indicateurs Transitions</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* DDC */}
                        <div className="text-center">
                            <h4 className="text-lg font-medium text-gray-800 mb-4">Durée de couverture vivante</h4>
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Scénario T0</div>
                                    <div className="text-2xl font-bold text-blue-600">{formatNumber(resultatsT0?.ddc)} j</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Scénario A</div>
                                    <div className="text-2xl font-bold text-green-600">{formatNumber(resultatsPrev?.ddc)} j</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <div className="text-sm text-gray-600 mb-1">Évolution</div>
                                    {renderDifference(getDifference(resultatsT0?.ddc, resultatsPrev?.ddc))}
                                </div>
                            </div>
                        </div>

                        {/* Carbone humifié */}
                        <div className="text-center">
                            <h4 className="text-lg font-medium text-gray-800 mb-4">Carbone humifié</h4>
                            <div className="space-y-4">
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Scénario T0</div>
                                    <div className="text-2xl font-bold text-yellow-600">{formatNumber(resultatsT0?.carboneHumifie)} T C/ha</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Scénario A</div>
                                    <div className="text-2xl font-bold text-green-600">{formatNumber(resultatsPrev?.carboneHumifie)} T C/ha</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <div className="text-sm text-gray-600 mb-1">Évolution</div>
                                    {renderDifference(getDifference(resultatsT0?.carboneHumifie, resultatsPrev?.carboneHumifie))}
                                </div>
                            </div>
                        </div>

                        {/* Bilan GES */}
                        <div className="text-center">
                            <h4 className="text-lg font-medium text-gray-800 mb-4">Bilan GES net</h4>
                            <div className="space-y-4">
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Scénario T0</div>
                                    <div className={`text-2xl font-bold ${resultatsT0?.bilanGES.bilanNet && resultatsT0.bilanGES.bilanNet > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        {formatNumber(resultatsT0?.bilanGES.bilanNet)} T CO2 eq/ha
                                    </div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Scénario A</div>
                                    <div className={`text-2xl font-bold ${resultatsPrev?.bilanGES.bilanNet && resultatsPrev.bilanGES.bilanNet > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        {formatNumber(resultatsPrev?.bilanGES.bilanNet)} T CO2 eq/ha
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <div className="text-sm text-gray-600 mb-1">Évolution</div>
                                    {renderDifference(getDifference(resultatsT0?.bilanGES.bilanNet, resultatsPrev?.bilanGES.bilanNet))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparaison détaillée des émissions GES */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Détail des émissions GES</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Scénario T0 */}
                        <div>
                            <h4 className="text-lg font-medium text-gray-800 mb-4">Scénario T0</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="text-sm font-medium">Stockage</span>
                                    <span className="font-bold">{formatNumber(resultatsT0?.bilanGES.stockage)} T CO2 eq/ha</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                                    <span className="text-sm font-medium">Émissions totales</span>
                                    <span className="font-bold text-red-600">{formatNumber(resultatsT0?.bilanGES.emissions.total)} T CO2 eq/ha</span>
                                </div>
                                <div className="ml-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>• Fertilisations</span>
                                        <span>{formatNumber(resultatsT0?.bilanGES.emissions.fertilisations)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>• Carburants</span>
                                        <span>{formatNumber(resultatsT0?.bilanGES.emissions.carburants)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>• Chaulage</span>
                                        <span>{formatNumber(resultatsT0?.bilanGES.emissions.chaulage)}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-t-2 border-blue-200">
                                    <span className="font-bold">Bilan net</span>
                                    <span className={`font-bold ${resultatsT0?.bilanGES.bilanNet && resultatsT0.bilanGES.bilanNet > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        {formatNumber(resultatsT0?.bilanGES.bilanNet)} T CO2 eq/ha
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Scénario A */}
                        <div>
                            <h4 className="text-lg font-medium text-gray-800 mb-4">Scénario A</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="text-sm font-medium">Stockage</span>
                                    <div className="text-right">
                                        <span className="font-bold">{formatNumber(resultatsPrev?.bilanGES.stockage)} T CO2 eq/ha</span>
                                        {renderDifference(getDifference(resultatsT0?.bilanGES.stockage, resultatsPrev?.bilanGES.stockage))}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                                    <span className="text-sm font-medium">Émissions totales</span>
                                    <div className="text-right">
                                        <span className="font-bold text-green-600">{formatNumber(resultatsPrev?.bilanGES.emissions.total)} T CO2 eq/ha</span>
                                        {renderDifference(getDifference(resultatsT0?.bilanGES.emissions.total, resultatsPrev?.bilanGES.emissions.total))}
                                    </div>
                                </div>
                                <div className="ml-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>• Fertilisations</span>
                                        <div className="text-right">
                                            <span>{formatNumber(resultatsPrev?.bilanGES.emissions.fertilisations)}</span>
                                            {renderDifference(getDifference(resultatsT0?.bilanGES.emissions.fertilisations, resultatsPrev?.bilanGES.emissions.fertilisations))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>• Carburants</span>
                                        <div className="text-right">
                                            <span>{formatNumber(resultatsPrev?.bilanGES.emissions.carburants)}</span>
                                            {renderDifference(getDifference(resultatsT0?.bilanGES.emissions.carburants, resultatsPrev?.bilanGES.emissions.carburants))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>• Chaulage</span>
                                        <div className="text-right">
                                            <span>{formatNumber(resultatsPrev?.bilanGES.emissions.chaulage)}</span>
                                            {renderDifference(getDifference(resultatsT0?.bilanGES.emissions.chaulage, resultatsPrev?.bilanGES.emissions.chaulage))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded border-t-2 border-green-200">
                                    <span className="font-bold">Bilan net</span>
                                    <div className="text-right">
                                        <span className={`font-bold ${resultatsPrev?.bilanGES.bilanNet && resultatsPrev.bilanGES.bilanNet > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {formatNumber(resultatsPrev?.bilanGES.bilanNet)} T CO2 eq/ha
                                        </span>
                                        {renderDifference(getDifference(resultatsT0?.bilanGES.bilanNet, resultatsPrev?.bilanGES.bilanNet))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparaison des pratiques */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Comparaison des pratiques</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* IAE */}
                        <div>
                            <h4 className="text-lg font-medium text-gray-800 mb-4">Infrastructure Agro-Écologique</h4>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600 mb-1">T0</div>
                                        <div className="text-lg font-bold text-blue-600">{scenarioT0.iae.pourcentageIAE}%</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600 mb-1">A</div>
                                        <div className="text-lg font-bold text-green-600">{scenarioPrev.iae.pourcentageIAE}%</div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Taille parcelles:</span>
                                        <span>{scenarioT0.iae.tailleMoyenneParcelles} ha → {scenarioPrev.iae.tailleMoyenneParcelles} ha</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Certification:</span>
                                        <span>{scenarioT0.iae.certificationEnvironnementale} → {scenarioPrev.iae.certificationEnvironnementale}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>OAD:</span>
                                        <span>{scenarioT0.iae.utilisationOAD ? 'Oui' : 'Non'} → {scenarioPrev.iae.utilisationOAD ? 'Oui' : 'Non'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chaulage */}
                        <div>
                            <h4 className="text-lg font-medium text-gray-800 mb-4">Chaulage</h4>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600 mb-1">T0</div>
                                        <div className="text-lg font-bold text-blue-600">{scenarioT0.chaulage.quantiteHectare} t/ha</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600 mb-1">A</div>
                                        <div className="text-lg font-bold text-green-600">{scenarioPrev.chaulage.quantiteHectare} t/ha</div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    {renderDifference(getDifference(scenarioT0.chaulage.quantiteHectare, scenarioPrev.chaulage.quantiteHectare))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparaison des cultures */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Comparaison des cultures</h3>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left p-3">Culture</th>
                                    <th className="text-center p-3">Surface T0</th>
                                    <th className="text-center p-3">Surface A</th>
                                    <th className="text-center p-3">Rendement T0</th>
                                    <th className="text-center p-3">Rendement A</th>
                                    <th className="text-center p-3">Évolution</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scenarioT0.cultures.map((cultureT0, index) => {
                                    const cultureA = scenarioPrev.cultures.find(c => c.culture.culture === cultureT0.culture.culture);
                                    return (
                                        <tr key={index} className="border-b border-gray-100">
                                            <td className="p-3 font-medium">{cultureT0.culture.culture}</td>
                                            <td className="p-3 text-center">{cultureT0.culture.surface} ha</td>
                                            <td className="p-3 text-center">{cultureA?.culture.surface || 'N/A'} ha</td>
                                            <td className="p-3 text-center">{cultureT0.culture.rendement} T/ha</td>
                                            <td className="p-3 text-center">{cultureA?.culture.rendement || 'N/A'} T/ha</td>
                                            <td className="p-3 text-center">
                                                {cultureA && renderDifference(getDifference(cultureT0.culture.rendement, cultureA.culture.rendement))}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {/* Nouvelles cultures dans le scénario A */}
                                {scenarioPrev.cultures
                                    .filter(cultureA => !scenarioT0.cultures.some(cT0 => cT0.culture.culture === cultureA.culture.culture))
                                    .map((cultureA, index) => (
                                        <tr key={`new-${index}`} className="border-b border-gray-100 bg-green-50">
                                            <td className="p-3 font-medium">{cultureA.culture.culture} <span className="text-green-600 text-xs">(Nouvelle)</span></td>
                                            <td className="p-3 text-center">-</td>
                                            <td className="p-3 text-center">{cultureA.culture.surface} ha</td>
                                            <td className="p-3 text-center">-</td>
                                            <td className="p-3 text-center">{cultureA.culture.rendement} T/ha</td>
                                            <td className="p-3 text-center">
                                                <span className="text-green-600 font-medium">Nouvelle culture</span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center space-x-4">
                    <Link
                        to={`/exploitation/${id}/scenario/T0`}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Modifier T0
                    </Link>
                    <Link
                        to={`/exploitation/${id}/scenario/previsionnel`}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                        Modifier Prévision
                    </Link>
                </div>
            </div>
        </Layout>
    );
}