import type { ResultatScenario, Scenario } from "../assets/scenarios.mock";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ResultatsSectionProps {
    resultatsT0?: ResultatScenario;
    resultatsPrev?: ResultatScenario;
    scenarioT0?: Scenario;
    scenarioPrev?: Scenario;
}

export default function ResultatsSection({
    resultatsT0,
    resultatsPrev,
    scenarioT0,
    scenarioPrev,
}: ResultatsSectionProps) {
    const formatNumber = (num: number | undefined) => {
        if (num === undefined) return "N/A";
        return num.toFixed(2);
    };

    const getEvolutionColor = (
        t0: number | undefined,
        prev: number | undefined
    ) => {
        if (t0 === undefined || prev === undefined) return "text-gray-500";
        const diff = prev - t0;
        if (diff > 0) return "text-green-600";
        if (diff < 0) return "text-red-600";
        return "text-gray-500";
    };

    const getEvolutionIcon = (
        t0: number | undefined,
        prev: number | undefined
    ) => {
        if (t0 === undefined || prev === undefined) return "→";
        const diff = prev - t0;
        if (diff > 0) return "↗";
        if (diff < 0) return "↘";
        return "→";
    };

    // Données pour les graphiques
    const ddcData = [
        { name: 'T0', value: resultatsT0?.ddc || 0, color: '#3B82F6' },
        { name: 'Prévisionnel', value: resultatsPrev?.ddc || 0, color: '#10B981' }
    ];

    const carboneData = [
        { name: 'T0', value: resultatsT0?.carboneHumifie || 0, color: '#F59E0B' },
        { name: 'Prévisionnel', value: resultatsPrev?.carboneHumifie || 0, color: '#10B981' }
    ];

    const emissionsData = resultatsT0 && resultatsPrev ? [
        { 
            name: 'Fertilisations', 
            T0: resultatsT0.bilanGES.emissions.fertilisations,
            Prévisionnel: resultatsPrev.bilanGES.emissions.fertilisations
        },
        { 
            name: 'Carburants', 
            T0: resultatsT0.bilanGES.emissions.carburants,
            Prévisionnel: resultatsPrev.bilanGES.emissions.carburants
        },
        { 
            name: 'Chaulage', 
            T0: resultatsT0.bilanGES.emissions.chaulage,
            Prévisionnel: resultatsPrev.bilanGES.emissions.chaulage
        }
    ] : [];

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

    return (
        <div className="space-y-8">
            {/* Tableau des indicateurs de transition */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Indicateurs de Transition
                </h3>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Indicateur
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Scénario T0
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Scénario Prévisionnel
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Évolution
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Graphique
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* DDC */}
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    Durée de couverture vivante (DDC)
                                    <div className="text-xs text-gray-500 mt-1">
                                        Niveau "entrée": 255j | Niveau "performance": 280j
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className="text-2xl font-bold text-blue-600">
                                        {formatNumber(resultatsT0?.ddc)} j
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className="text-2xl font-bold text-green-600">
                                        {formatNumber(resultatsPrev?.ddc)} j
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {resultatsT0 && resultatsPrev && (
                                        <div className={`font-medium ${getEvolutionColor(resultatsT0.ddc, resultatsPrev.ddc)}`}>
                                            {getEvolutionIcon(resultatsT0.ddc, resultatsPrev.ddc)}
                                            {formatNumber(resultatsPrev.ddc - resultatsT0.ddc)} j
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="w-20 h-20 mx-auto">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={ddcData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={20}
                                                    outerRadius={35}
                                                    dataKey="value"
                                                >
                                                    {ddcData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </td>
                            </tr>

                            {/* Carbone humifié */}
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    Carbone humifié
                                    <div className="text-xs text-gray-500 mt-1">
                                        Niveau "entrée": 1,15 | Niveau "performance": 1,45
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className="text-2xl font-bold text-yellow-600">
                                        {formatNumber(resultatsT0?.carboneHumifie)} T C/ha
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className="text-2xl font-bold text-green-600">
                                        {formatNumber(resultatsPrev?.carboneHumifie)} T C/ha
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {resultatsT0 && resultatsPrev && (
                                        <div className={`font-medium ${getEvolutionColor(resultatsT0.carboneHumifie, resultatsPrev.carboneHumifie)}`}>
                                            {getEvolutionIcon(resultatsT0.carboneHumifie, resultatsPrev.carboneHumifie)}
                                            {formatNumber(resultatsPrev.carboneHumifie - resultatsT0.carboneHumifie)} T C/ha
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="w-20 h-20 mx-auto">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={carboneData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={20}
                                                    outerRadius={35}
                                                    dataKey="value"
                                                >
                                                    {carboneData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bilan GES simplifié - Tableau */}
            <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Bilan GES simplifié
                </h4>
                
                <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Composant
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Scénario T0
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Scénario Prévisionnel
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Évolution
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    Stockage
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-blue-600 font-semibold">
                                    {formatNumber(resultatsT0?.bilanGES.stockage)} T CO2 eq/ha
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-green-600 font-semibold">
                                    {formatNumber(resultatsPrev?.bilanGES.stockage)} T CO2 eq/ha
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {resultatsT0 && resultatsPrev && (
                                        <div className={`font-medium ${getEvolutionColor(resultatsT0.bilanGES.stockage, resultatsPrev.bilanGES.stockage)}`}>
                                            {getEvolutionIcon(resultatsT0.bilanGES.stockage, resultatsPrev.bilanGES.stockage)}
                                            {formatNumber(resultatsPrev.bilanGES.stockage - resultatsT0.bilanGES.stockage)}
                                        </div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    Émissions totales
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-blue-600 font-semibold">
                                    {formatNumber(resultatsT0?.bilanGES.emissions.total)} T CO2 eq/ha
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-green-600 font-semibold">
                                    {formatNumber(resultatsPrev?.bilanGES.emissions.total)} T CO2 eq/ha
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {resultatsT0 && resultatsPrev && (
                                        <div className={`font-medium ${getEvolutionColor(resultatsT0.bilanGES.emissions.total, resultatsPrev.bilanGES.emissions.total)}`}>
                                            {getEvolutionIcon(resultatsT0.bilanGES.emissions.total, resultatsPrev.bilanGES.emissions.total)}
                                            {formatNumber(resultatsPrev.bilanGES.emissions.total - resultatsT0.bilanGES.emissions.total)}
                                        </div>
                                    )}
                                </td>
                            </tr>
                            <tr className="bg-blue-50">
                                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                                    Bilan net
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center font-bold">
                                    <span className={resultatsT0?.bilanGES.bilanNet && resultatsT0.bilanGES.bilanNet > 0 ? "text-red-600" : "text-blue-600"}>
                                        {formatNumber(resultatsT0?.bilanGES.bilanNet)} T CO2 eq/ha
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center font-bold">
                                    <span className={resultatsPrev?.bilanGES.bilanNet && resultatsPrev.bilanGES.bilanNet > 0 ? "text-red-600" : "text-green-600"}>
                                        {formatNumber(resultatsPrev?.bilanGES.bilanNet)} T CO2 eq/ha
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {resultatsT0 && resultatsPrev && (
                                        <div className={`font-bold ${getEvolutionColor(resultatsT0.bilanGES.bilanNet, resultatsPrev.bilanGES.bilanNet)}`}>
                                            {getEvolutionIcon(resultatsT0.bilanGES.bilanNet, resultatsPrev.bilanGES.bilanNet)}
                                            {formatNumber(resultatsPrev.bilanGES.bilanNet - resultatsT0.bilanGES.bilanNet)}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Graphique des émissions */}
                {emissionsData.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h5 className="text-lg font-semibold text-gray-800 mb-4">
                            Comparaison des émissions par source
                        </h5>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={emissionsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="T0" fill="#3B82F6" name="Scénario T0" />
                                    <Bar dataKey="Prévisionnel" fill="#10B981" name="Scénario Prévisionnel" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Seuils de référence */}
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <h6 className="font-medium text-gray-700 mb-2">
                        Seuils de référence (Hors Transitions)
                    </h6>
                    <div className="text-sm text-gray-600">
                        <p>Niveau "entrée": 4 tCO2e/ha</p>
                        <p>Niveau "performance": 2,5 tCO2e/ha ou -15%</p>
                    </div>
                </div>
            </div>

            {/* Émissions par culture */}
            {(resultatsT0?.emissionsParCulture.length || resultatsPrev?.emissionsParCulture.length) && (
                <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">
                        Émissions par culture
                    </h4>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Culture
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Scénario T0
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Scénario Prévisionnel
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Facteur d'émissions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {resultatsT0?.emissionsParCulture.map((cultureT0, index) => {
                                    const culturePrev = resultatsPrev?.emissionsParCulture.find(
                                        c => c.culture === cultureT0.culture
                                    );
                                    return (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                {cultureT0.culture}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-blue-600 font-semibold">
                                                {formatNumber(cultureT0.emissions)} tCO2e/ha
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-green-600 font-semibold">
                                                {culturePrev ? formatNumber(culturePrev.emissions) : "N/A"} tCO2e/ha
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                                                FE: {formatNumber(cultureT0.facteurEmissions)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
