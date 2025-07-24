import { Download, Plus, Edit, Trash2 } from "lucide-react";
import {
    amendementsCalciques,
    type AmendementCalcique,
} from "../../assets/admin-data";
import { useState } from "react";
import AdminLayout from "./Layout";

export default function AdminAmendementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<keyof AmendementCalcique>("nom");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredData = amendementsCalciques
        .filter(
            (amendement) =>
                amendement.nom
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                amendement.source
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortDirection === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

    const handleSort = (field: keyof AmendementCalcique) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const exportToCSV = () => {
        const headers = [
            "Amendement",
            "Valeur Neutralisante",
            "FE_VN",
            "Source",
        ];
        const csvContent = [
            headers.join(","),
            ...filteredData.map((amendement) =>
                [
                    amendement.nom,
                    amendement.valeurNeutralisante,
                    amendement.feVN,
                    amendement.source,
                ].join(",")
            ),
        ].join("\n");
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "amendements_calciques.csv";
        link.click();
    };

    return (
        <AdminLayout
            title="Base de données Engrais"
            actions={
                <>
                    <button
                        onClick={exportToCSV}
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Exporter CSV
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un amendement
                    </button>
                </>
            }
        >
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">
                            Amendements Calciques
                        </h2>
                        <p className="text-gray-600">
                            Base de données des amendements calciques avec
                            valeurs neutralisantes et facteurs d'émission
                        </p>
                    </div>
                    <div className="text-sm text-gray-500">
                        {filteredData.length} entrée(s) sur{" "}
                        {amendementsCalciques.length}
                    </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Rechercher par nom d'amendement ou source..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort("nom")}
                                >
                                    <div className="flex items-center">
                                        Amendement Calcique
                                        {sortField === "nom" && (
                                            <span className="ml-1">
                                                {sortDirection === "asc"
                                                    ? "↑"
                                                    : "↓"}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() =>
                                        handleSort("valeurNeutralisante")
                                    }
                                >
                                    <div className="flex items-center">
                                        Valeur Neutralisante (%)
                                        {sortField ===
                                            "valeurNeutralisante" && (
                                            <span className="ml-1">
                                                {sortDirection === "asc"
                                                    ? "↑"
                                                    : "↓"}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort("feVN")}
                                >
                                    <div className="flex items-center">
                                        FE_VN (kg eqCO2/kg VN)
                                        {sortField === "feVN" && (
                                            <span className="ml-1">
                                                {sortDirection === "asc"
                                                    ? "↑"
                                                    : "↓"}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort("source")}
                                >
                                    <div className="flex items-center">
                                        Source
                                        {sortField === "source" && (
                                            <span className="ml-1">
                                                {sortDirection === "asc"
                                                    ? "↑"
                                                    : "↓"}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredData.map((amendement, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {amendement.nom}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {(
                                                amendement.valeurNeutralisante *
                                                100
                                            ).toFixed(1)}
                                            %
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {amendement.feVN.toFixed(8)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {amendement.source}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    À propos des amendements calciques
                </h3>
                <div className="text-blue-800 text-sm space-y-2">
                    <p>
                        Les amendements calciques sont utilisés pour corriger
                        l'acidité des sols et améliorer leur structure.
                    </p>
                    <p>
                        <strong>Valeur Neutralisante :</strong> Capacité de
                        l'amendement à neutraliser l'acidité du sol, exprimée en
                        pourcentage par rapport à l'oxyde de calcium (CaO)
                    </p>
                    <p>
                        <strong>FE_VN :</strong> Facteur d'émission par unité de
                        valeur neutralisante (kg équivalent CO2 par kg de valeur
                        neutralisante)
                    </p>
                    <p>
                        <strong>Source :</strong> Référentiel technique utilisé
                        (GES'TIM+)
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
