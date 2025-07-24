import { Download, Plus, Edit, Trash2 } from "lucide-react";
import { praGrandEst, type PRAGrandEst } from "../../assets/admin-data";
import { useState } from "react";
import AdminLayout from "./Layout";

export default function AdminPRAPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] =
        useState<keyof PRAGrandEst>("nomPRACommune");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredData = praGrandEst
        .filter((pra) =>
            pra.nomPRACommune.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (aValue === null && bValue === null) return 0;
            if (aValue === null) return sortDirection === "asc" ? 1 : -1;
            if (bValue === null) return sortDirection === "asc" ? -1 : 1;

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

    const handleSort = (field: keyof PRAGrandEst) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const exportToCSV = () => {
        const headers = [
            "Nom PRA et Commune",
            "DDC Moy PRA 22",
            "DDC Q3 PRA 22",
        ];
        const csvContent = [
            headers.join(","),
            ...filteredData.map((pra) =>
                [pra.nomPRACommune, pra.ddcMoyPRA22, pra.ddcQ3PRA22].join(",")
            ),
        ].join("\n");
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "pra_grand_est.csv";
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
                        Ajouter une PRA
                    </button>
                </>
            }
        >
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">
                            Petites Régions Agricoles du Grand-Est
                        </h2>
                        <p className="text-gray-600">
                            Données DDC (Degrés Jours de Croissance) moyennes et
                            Q3 pour les PRA du Grand-Est en 2022
                        </p>
                    </div>
                    <div className="text-sm text-gray-500">
                        {filteredData.length} entrée(s) sur {praGrandEst.length}
                    </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Rechercher par nom de PRA ou commune..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                                    onClick={() => handleSort("nomPRACommune")}
                                >
                                    <div className="flex items-center">
                                        Nom PRA et Commune
                                        {sortField === "nomPRACommune" && (
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
                                    onClick={() => handleSort("ddcMoyPRA22")}
                                >
                                    <div className="flex items-center">
                                        DDC Moy PRA 22
                                        {sortField === "ddcMoyPRA22" && (
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
                                    onClick={() => handleSort("ddcQ3PRA22")}
                                >
                                    <div className="flex items-center">
                                        DDC Q3 PRA 22
                                        {sortField === "ddcQ3PRA22" && (
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
                            {filteredData.map((pra, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {pra.nomPRACommune}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {pra.ddcMoyPRA22}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {pra.ddcQ3PRA22 !== null ? (
                                                pra.ddcQ3PRA22
                                            ) : (
                                                <span className="text-gray-400 italic">
                                                    Non renseigné
                                                </span>
                                            )}
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
                    À propos des données PRA
                </h3>
                <div className="text-blue-800 text-sm space-y-2">
                    <p>
                        Les Petites Régions Agricoles (PRA) sont des zones
                        géographiques homogènes du point de vue des conditions
                        naturelles et des orientations de production.
                    </p>
                    <p>
                        <strong>DDC Moy PRA 22 :</strong> Degrés Jours de
                        Croissance moyens pour l'année 2022
                    </p>
                    <p>
                        <strong>DDC Q3 PRA 22 :</strong> Troisième quartile des
                        DDC pour l'année 2022 (75% des valeurs sont inférieures
                        à cette valeur)
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
