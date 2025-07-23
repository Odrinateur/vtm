import type { ContexteExploitation } from "../assets/exploitations.mock";

interface ContexteSectionProps {
    contexte: ContexteExploitation;
}

export default function ContexteSection({ contexte }: ContexteSectionProps) {
    return (
        <div className="space-y-8">
            {/* Analyse de sol */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Analyse de sol
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type de sol
                        </label>
                        <p className="text-gray-900">
                            {contexte.analyseSol.typeSol}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Densité apparente
                        </label>
                        <p className="text-gray-900">
                            {contexte.analyseSol.densiteApparente}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Teneur en MO (%)
                        </label>
                        <p className="text-gray-900">
                            {contexte.analyseSol.teneurMO}%
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Teneur en Carbone Organique (%)
                        </label>
                        <p className="text-gray-900">
                            {contexte.analyseSol.teneurCarbone}%
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profondeur analyse (mm)
                        </label>
                        <p className="text-gray-900">
                            {contexte.analyseSol.profondeurAnalyse} mm
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Argile (g/kg)
                        </label>
                        <p className="text-gray-900">
                            {contexte.analyseSol.argile} g/kg
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            CaCO3 (g/kg)
                        </label>
                        <p className="text-gray-900">
                            {contexte.analyseSol.caco3} g/kg
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            pH
                        </label>
                        <p className="text-gray-900">
                            {contexte.analyseSol.ph}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            C/N
                        </label>
                        <p className="text-gray-900">
                            {contexte.analyseSol.cn}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Taux de cailloux (%)
                        </label>
                        <p className="text-gray-900">
                            {contexte.analyseSol.tauxCailloux}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Contexte climatique */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Contexte climatique et seuils régionnaux
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Zone climatique
                        </label>
                        <p className="text-gray-900">
                            {contexte.contexteClimatique.zoneClimatique}
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Température (°C)
                        </label>
                        <p className="text-gray-900">
                            {contexte.contexteClimatique.temperature}°C
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ETP (mm)
                        </label>
                        <p className="text-gray-900">
                            {contexte.contexteClimatique.etp} mm
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Irrigation (mm)
                        </label>
                        <p className="text-gray-900">
                            {contexte.contexteClimatique.irrigation} mm
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Précipitation (mm)
                        </label>
                        <p className="text-gray-900">
                            {contexte.contexteClimatique.precipitation} mm
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Petite Région Agricole (PRA)
                        </label>
                        <p className="text-gray-900 text-sm">
                            {contexte.contexteClimatique.pra}
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            DDC moyenne PRA
                        </label>
                        <p className="text-gray-900">
                            {contexte.contexteClimatique.ddcMoyennePRA}
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            IFT moyen régional
                        </label>
                        <p className="text-gray-900">
                            {contexte.contexteClimatique.iftMoyenRegional}
                        </p>
                    </div>
                </div>
            </div>

            {/* Calculs */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Calculs automatiques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rapport MO sur Argile
                        </label>
                        <p className="text-gray-900 font-semibold">
                            {contexte.calculs.rapportMOArgile}%
                        </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Masse de terre fine (tonne/ha)
                        </label>
                        <p className="text-gray-900 font-semibold">
                            {contexte.calculs.masseTerreFineTonneHa}
                        </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Masse de MO (tonne/ha)
                        </label>
                        <p className="text-gray-900 font-semibold">
                            {contexte.calculs.masseMOTonneHa}
                        </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock de carbone organique (T/ha)
                        </label>
                        <p className="text-gray-900 font-semibold">
                            {contexte.calculs.stockCarboneOrganiqueTHa}
                        </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Coefficient intermédiaire K2
                        </label>
                        <p className="text-gray-900 font-semibold">
                            {contexte.calculs.coefficientIntermediaireK2}%
                        </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Coefficient de minéralisation K
                        </label>
                        <p className="text-gray-900 font-semibold">
                            {contexte.calculs.coefficientMineralisationK}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
