import type { ContexteExploitation } from "../assets/exploitations.mock";
import { useState } from "react";

interface ContexteSectionProps {
    contexte: ContexteExploitation;
    editMode?: boolean;
    onEditModeChange?: (edit: boolean) => void;
    onSave?: (newContexte: ContexteExploitation) => void;
}

// Types utilitaires pour les clés

type AnalyseSolKey = keyof ContexteExploitation["analyseSol"];
type ContexteClimatiqueKey = keyof ContexteExploitation["contexteClimatique"];
type CalculsKey = keyof ContexteExploitation["calculs"];

export default function ContexteSection({
    contexte,
    editMode: editModeProp,
}: ContexteSectionProps) {
    const [editMode, setEditMode] = useState(editModeProp ?? false);
    const [localContexte, setLocalContexte] = useState(contexte);

    // Sync with parent editMode
    if (editModeProp !== undefined && editModeProp !== editMode) {
        setEditMode(editModeProp);
    }
    // Sync with contexte prop
    if (contexte !== localContexte && !editMode) {
        setLocalContexte(contexte);
    }

    const handleChange = (
        section: "analyseSol" | "contexteClimatique" | "calculs",
        field: AnalyseSolKey | ContexteClimatiqueKey | CalculsKey,
        value: number | string
    ) => {
        setLocalContexte((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Analyse de sol
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Densité apparente
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={
                                    localContexte.analyseSol.densiteApparente
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "analyseSol",
                                        "densiteApparente",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.analyseSol.densiteApparente}
                            </p>
                        )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Teneur en MO (%)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={localContexte.analyseSol.teneurMO}
                                onChange={(e) =>
                                    handleChange(
                                        "analyseSol",
                                        "teneurMO",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.analyseSol.teneurMO}%
                            </p>
                        )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Teneur en Carbone Organique (%)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={localContexte.analyseSol.teneurCarbone}
                                onChange={(e) =>
                                    handleChange(
                                        "analyseSol",
                                        "teneurCarbone",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.analyseSol.teneurCarbone}%
                            </p>
                        )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Profondeur analyse (mm)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={
                                    localContexte.analyseSol.profondeurAnalyse
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "analyseSol",
                                        "profondeurAnalyse",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.analyseSol.profondeurAnalyse} mm
                            </p>
                        )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Argile (g/kg)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={localContexte.analyseSol.argile}
                                onChange={(e) =>
                                    handleChange(
                                        "analyseSol",
                                        "argile",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.analyseSol.argile} g/kg
                            </p>
                        )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            CaCO3 (g/kg)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={localContexte.analyseSol.caco3}
                                onChange={(e) =>
                                    handleChange(
                                        "analyseSol",
                                        "caco3",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.analyseSol.caco3} g/kg
                            </p>
                        )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            pH
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={localContexte.analyseSol.ph}
                                onChange={(e) =>
                                    handleChange(
                                        "analyseSol",
                                        "ph",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.analyseSol.ph}
                            </p>
                        )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            C/N
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={localContexte.analyseSol.cn}
                                onChange={(e) =>
                                    handleChange(
                                        "analyseSol",
                                        "cn",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.analyseSol.cn}
                            </p>
                        )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Taux de cailloux (%)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={localContexte.analyseSol.tauxCailloux}
                                onChange={(e) =>
                                    handleChange(
                                        "analyseSol",
                                        "tauxCailloux",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.analyseSol.tauxCailloux}%
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {/* Contexte climatique */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Contexte climatique et seuils régionnaux
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Température (°C)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={
                                    localContexte.contexteClimatique.temperature
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "contexteClimatique",
                                        "temperature",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.contexteClimatique.temperature}°C
                            </p>
                        )}
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            ETP (mm)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={localContexte.contexteClimatique.etp}
                                onChange={(e) =>
                                    handleChange(
                                        "contexteClimatique",
                                        "etp",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.contexteClimatique.etp} mm
                            </p>
                        )}
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Irrigation (mm)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={
                                    localContexte.contexteClimatique.irrigation
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "contexteClimatique",
                                        "irrigation",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.contexteClimatique.irrigation} mm
                            </p>
                        )}
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Précipitation (mm)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={
                                    localContexte.contexteClimatique
                                        .precipitation
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "contexteClimatique",
                                        "precipitation",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.contexteClimatique.precipitation} mm
                            </p>
                        )}
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            DDC moyenne PRA
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={
                                    localContexte.contexteClimatique
                                        .ddcMoyennePRA
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "contexteClimatique",
                                        "ddcMoyennePRA",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.contexteClimatique.ddcMoyennePRA}
                            </p>
                        )}
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            IFT moyen régional
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={
                                    localContexte.contexteClimatique
                                        .iftMoyenRegional
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "contexteClimatique",
                                        "iftMoyenRegional",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm">
                                {contexte.contexteClimatique.iftMoyenRegional}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {/* Calculs */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Calculs automatiques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Rapport MO sur Argile
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={localContexte.calculs.rapportMOArgile}
                                onChange={(e) =>
                                    handleChange(
                                        "calculs",
                                        "rapportMOArgile",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm font-semibold">
                                {contexte.calculs.rapportMOArgile}%
                            </p>
                        )}
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Masse de terre fine (tonne/ha)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={
                                    localContexte.calculs.masseTerreFineTonneHa
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "calculs",
                                        "masseTerreFineTonneHa",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm font-semibold">
                                {contexte.calculs.masseTerreFineTonneHa}
                            </p>
                        )}
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Masse de MO (tonne/ha)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={localContexte.calculs.masseMOTonneHa}
                                onChange={(e) =>
                                    handleChange(
                                        "calculs",
                                        "masseMOTonneHa",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm font-semibold">
                                {contexte.calculs.masseMOTonneHa}
                            </p>
                        )}
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Stock de carbone organique (T/ha)
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={
                                    localContexte.calculs
                                        .stockCarboneOrganiqueTHa
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "calculs",
                                        "stockCarboneOrganiqueTHa",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm font-semibold">
                                {contexte.calculs.stockCarboneOrganiqueTHa}
                            </p>
                        )}
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Coefficient intermédiaire K2
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={
                                    localContexte.calculs
                                        .coefficientIntermediaireK2
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "calculs",
                                        "coefficientIntermediaireK2",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm font-semibold">
                                {contexte.calculs.coefficientIntermediaireK2}%
                            </p>
                        )}
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Coefficient de minéralisation K
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                                value={
                                    localContexte.calculs
                                        .coefficientMineralisationK
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "calculs",
                                        "coefficientMineralisationK",
                                        e.target.value
                                    )
                                }
                            />
                        ) : (
                            <p className="text-gray-900 text-sm font-semibold">
                                {contexte.calculs.coefficientMineralisationK}%
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
