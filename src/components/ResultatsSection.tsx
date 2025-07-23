import type { ResultatScenario, Scenario } from "../assets/scenarios.mock";

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

    return (
        <div className="space-y-8">
            {/* Indicateurs Transitions */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Indicateurs Transitions
                </h3>

                {/* Durée de couverture vivante */}
                <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Durée de couverture vivante
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h5 className="font-medium text-gray-700 mb-2">
                                Scénario T0
                            </h5>
                            <p className="text-2xl font-bold text-blue-600">
                                {formatNumber(resultatsT0?.ddc)} jours
                            </p>
                            <div className="mt-2 text-sm text-gray-600">
                                <p>Niveau "entrée": 255</p>
                                <p>Niveau "performance": 280</p>
                            </div>
                        </div>
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h5 className="font-medium text-gray-700 mb-2">
                                Scénario A
                            </h5>
                            <p className="text-2xl font-bold text-green-600">
                                {formatNumber(resultatsPrev?.ddc)} jours
                            </p>
                            <div className="mt-2 text-sm text-gray-600">
                                <p>Niveau "entrée": 255</p>
                                <p>Niveau "performance": 280</p>
                            </div>
                            {resultatsT0 && resultatsPrev && (
                                <div
                                    className={`mt-2 font-medium ${getEvolutionColor(
                                        resultatsT0.ddc,
                                        resultatsPrev.ddc
                                    )}`}
                                >
                                    {getEvolutionIcon(
                                        resultatsT0.ddc,
                                        resultatsPrev.ddc
                                    )}
                                    {formatNumber(
                                        resultatsPrev.ddc - resultatsT0.ddc
                                    )}{" "}
                                    jours
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Carbone humifié */}
                <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Carbone humifié
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-yellow-50 p-6 rounded-lg">
                            <h5 className="font-medium text-gray-700 mb-2">
                                Scénario T0
                            </h5>
                            <p className="text-2xl font-bold text-yellow-600">
                                {formatNumber(resultatsT0?.carboneHumifie)} T
                                C/ha
                            </p>
                            <div className="mt-2 text-sm text-gray-600">
                                <p>Niveau "entrée": 1,15</p>
                                <p>Niveau "performance": 1,45</p>
                            </div>
                        </div>
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h5 className="font-medium text-gray-700 mb-2">
                                Scénario A
                            </h5>
                            <p className="text-2xl font-bold text-green-600">
                                {formatNumber(resultatsPrev?.carboneHumifie)} T
                                C/ha
                            </p>
                            <div className="mt-2 text-sm text-gray-600">
                                <p>Niveau "entrée": 1,15</p>
                                <p>Niveau "performance": 1,45</p>
                            </div>
                            {resultatsT0 && resultatsPrev && (
                                <div
                                    className={`mt-2 font-medium ${getEvolutionColor(
                                        resultatsT0.carboneHumifie,
                                        resultatsPrev.carboneHumifie
                                    )}`}
                                >
                                    {getEvolutionIcon(
                                        resultatsT0.carboneHumifie,
                                        resultatsPrev.carboneHumifie
                                    )}
                                    {formatNumber(
                                        resultatsPrev.carboneHumifie -
                                            resultatsT0.carboneHumifie
                                    )}{" "}
                                    T C/ha
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bilan GES simplifié */}
            <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Bilan GES simplifié
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Scénario T0 */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-4">
                            Scénario T0
                        </h5>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Stockage:</span>
                                <span className="font-medium">
                                    {formatNumber(
                                        resultatsT0?.bilanGES.stockage
                                    )}{" "}
                                    T CO2 eq/ha
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Émissions totales:</span>
                                <span className="font-medium">
                                    {formatNumber(
                                        resultatsT0?.bilanGES.emissions.total
                                    )}{" "}
                                    T CO2 eq/ha
                                </span>
                            </div>
                            <div className="ml-4 space-y-1 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>• Fertilisations:</span>
                                    <span>
                                        {formatNumber(
                                            resultatsT0?.bilanGES.emissions
                                                .fertilisations
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>• Carburants:</span>
                                    <span>
                                        {formatNumber(
                                            resultatsT0?.bilanGES.emissions
                                                .carburants
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>• Chaulage:</span>
                                    <span>
                                        {formatNumber(
                                            resultatsT0?.bilanGES.emissions
                                                .chaulage
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-bold">
                                <span>Bilan net:</span>
                                <span
                                    className={
                                        resultatsT0?.bilanGES.bilanNet &&
                                        resultatsT0.bilanGES.bilanNet > 0
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }
                                >
                                    {formatNumber(
                                        resultatsT0?.bilanGES.bilanNet
                                    )}{" "}
                                    T CO2 eq/ha
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Scénario A */}
                    <div className="bg-green-50 p-6 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-4">
                            Scénario A
                        </h5>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Stockage:</span>
                                <span className="font-medium">
                                    {formatNumber(
                                        resultatsPrev?.bilanGES.stockage
                                    )}{" "}
                                    T CO2 eq/ha
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Émissions totales:</span>
                                <span className="font-medium">
                                    {formatNumber(
                                        resultatsPrev?.bilanGES.emissions.total
                                    )}{" "}
                                    T CO2 eq/ha
                                </span>
                            </div>
                            <div className="ml-4 space-y-1 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>• Fertilisations:</span>
                                    <span>
                                        {formatNumber(
                                            resultatsPrev?.bilanGES.emissions
                                                .fertilisations
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>• Carburants:</span>
                                    <span>
                                        {formatNumber(
                                            resultatsPrev?.bilanGES.emissions
                                                .carburants
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>• Chaulage:</span>
                                    <span>
                                        {formatNumber(
                                            resultatsPrev?.bilanGES.emissions
                                                .chaulage
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-bold">
                                <span>Bilan net:</span>
                                <span
                                    className={
                                        resultatsPrev?.bilanGES.bilanNet &&
                                        resultatsPrev.bilanGES.bilanNet > 0
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }
                                >
                                    {formatNumber(
                                        resultatsPrev?.bilanGES.bilanNet
                                    )}{" "}
                                    T CO2 eq/ha
                                </span>
                            </div>
                        </div>
                        {resultatsT0 && resultatsPrev && (
                            <div className="mt-4 pt-4 border-t">
                                <h6 className="font-medium text-gray-700 mb-2">
                                    Évolution vs T0
                                </h6>
                                <div
                                    className={`font-medium ${getEvolutionColor(
                                        resultatsT0.bilanGES.bilanNet,
                                        resultatsPrev.bilanGES.bilanNet
                                    )}`}
                                >
                                    {getEvolutionIcon(
                                        resultatsT0.bilanGES.bilanNet,
                                        resultatsPrev.bilanGES.bilanNet
                                    )}
                                    {formatNumber(
                                        resultatsPrev.bilanGES.bilanNet -
                                            resultatsT0.bilanGES.bilanNet
                                    )}{" "}
                                    T CO2 eq/ha
                                </div>
                            </div>
                        )}
                    </div>
                </div>

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
            {(resultatsT0?.emissionsParCulture.length ||
                resultatsPrev?.emissionsParCulture.length) && (
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Émissions par culture
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {resultatsT0 && (
                            <div>
                                <h5 className="font-medium text-gray-700 mb-3">
                                    Scénario T0
                                </h5>
                                <div className="space-y-2">
                                    {resultatsT0.emissionsParCulture.map(
                                        (culture, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-3 bg-gray-50 rounded"
                                            >
                                                <span className="text-sm">
                                                    {culture.culture}
                                                </span>
                                                <div className="text-right">
                                                    <div className="font-medium">
                                                        {formatNumber(
                                                            culture.emissions
                                                        )}{" "}
                                                        tCO2e/ha
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        FE:{" "}
                                                        {formatNumber(
                                                            culture.facteurEmissions
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                        {resultatsPrev && (
                            <div>
                                <h5 className="font-medium text-gray-700 mb-3">
                                    Scénario A
                                </h5>
                                <div className="space-y-2">
                                    {resultatsPrev.emissionsParCulture.map(
                                        (culture, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-3 bg-green-50 rounded"
                                            >
                                                <span className="text-sm">
                                                    {culture.culture}
                                                </span>
                                                <div className="text-right">
                                                    <div className="font-medium">
                                                        {formatNumber(
                                                            culture.emissions
                                                        )}{" "}
                                                        tCO2e/ha
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        FE:{" "}
                                                        {formatNumber(
                                                            culture.facteurEmissions
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
