import { Download, Plus, Edit, Trash2 } from "lucide-react";
import { materielDelais, type MaterielDelais } from "../../assets/admin-data";
import { useState } from "react";
import AdminLayout from "./Layout";

export default function AdminMaterielPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] =
        useState<keyof MaterielDelais>("materielDelais");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredData = materielDelais
        .filter(
            (materiel) =>
                materiel.materielDelais
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                materiel.materiel
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                materiel.delais.toLowerCase().includes(searchTerm.toLowerCase())
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

    const handleSort = (field: keyof MaterielDelais) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const exportToCSV = () => {
        const headers = ["Matériel", "Délais", "Facteur d'ajustement"];
        const csvContent = [
            headers.join(","),
            ...filteredData.map((materiel: MaterielDelais) =>
                [
                    materiel.materiel,
                    materiel.delais,
                    materiel.facteurAjustement,
                ].join(",")
            ),
        ].join("\n");
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "materiel_delais.csv";
        link.click();
    };

    const getFacteurColor = (facteur: number) => {
        if (facteur <= 0.3) return "bg-green-100 text-green-800";
        if (facteur <= 0.5) return "bg-yellow-100 text-yellow-800";
        if (facteur <= 0.75) return "bg-orange-100 text-orange-800";
        return "bg-red-100 text-red-800";
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
                        Ajouter un matériel
                    </button>
                </>
            }
        >
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">
                            Matériel d'épandage et Délais
                        </h2>
                        <p className="text-gray-600">
                            Facteurs d'ajustement pour les émissions selon le
                            matériel d'épandage et les délais d'enfouissement
                        </p>
                    </div>
                    <div className="text-sm text-gray-500">
                        {filteredData.length} entrée(s) sur{" "}
                        {materielDelais.length}
                    </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Rechercher par matériel ou délai..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                                    onClick={() => handleSort("materielDelais")}
                                >
                                    <div className="flex items-center">
                                        Configuration
                                        {sortField === "materielDelais" && (
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
                                    onClick={() => handleSort("materiel")}
                                >
                                    <div className="flex items-center">
                                        Matériel
                                        {sortField === "materiel" && (
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
                                    onClick={() => handleSort("delais")}
                                >
                                    <div className="flex items-center">
                                        Délais
                                        {sortField === "delais" && (
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
                                        handleSort("facteurAjustement")
                                    }
                                >
                                    <div className="flex items-center">
                                        Facteur d'Ajustement
                                        {sortField === "facteurAjustement" && (
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
                            {filteredData.map((materiel, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {materiel.materielDelais}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {materiel.materiel}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {materiel.delais || (
                                                <span className="text-gray-400 italic">
                                                    -
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFacteurColor(
                                                    materiel.facteurAjustement
                                                )}`}
                                            >
                                                {materiel.facteurAjustement}
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

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        À propos des facteurs d'ajustement
                    </h3>
                    <div className="text-blue-800 text-sm space-y-2">
                        <p>
                            Les facteurs d'ajustement permettent de moduler les
                            émissions d'ammoniac selon le matériel d'épandage et
                            le délai d'enfouissement.
                        </p>
                        <p>
                            <strong>Source :</strong> CITEPA, OMINEA février
                            2018
                        </p>
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                        Légende des facteurs
                    </h3>
                    <div className="text-green-800 text-sm space-y-2">
                        <div className="flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                                ≤ 0.3
                            </span>
                            <span>Très faible émission</span>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                                0.3 - 0.5
                            </span>
                            <span>Faible émission</span>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mr-2">
                                0.5 - 0.75
                            </span>
                            <span>Émission modérée</span>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2">
                                {">"} 0.75
                            </span>
                            <span>Forte émission</span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
