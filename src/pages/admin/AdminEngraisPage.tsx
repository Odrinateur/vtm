import { useState } from "react";
import { Download, Plus, Edit, Trash2 } from "lucide-react";
import { engraisMineraux, type EngraisMineral } from "../../assets/admin-data";
import AdminLayout from "./Layout";

export default function AdminEngraisPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<keyof EngraisMineral>("nom");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [filterType, setFilterType] = useState<string>("all");

    const filteredData = engraisMineraux.filter((engrais) => {
        const matchesSearch =
            engrais.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            engrais.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "all" || engrais.type === filterType;
        return matchesSearch && matchesType;
    });

    const sortedData = [...filteredData].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (typeof aVal === "string" && typeof bVal === "string") {
            return sortDirection === "asc"
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
            return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        }

        return 0;
    });

    const handleSort = (field: keyof EngraisMineral) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const exportToCSV = () => {
        const headers = [
            "Nom",
            "Type",
            "N (%)",
            "P (%)",
            "K (%)",
            "FE (kg eqCO2)",
            "Unité",
            "Prix (€/t)",
            "FRAC GAZF",
        ];
        const csvContent = [
            headers.join(","),
            ...sortedData.map((engrais) =>
                [
                    `"${engrais.nom}"`,
                    `"${engrais.type}"`,
                    engrais.concentrationN,
                    engrais.concentrationP,
                    engrais.concentrationK,
                    engrais.fe,
                    `"${engrais.unite}"`,
                    engrais.prix,
                    engrais.fracGazf,
                ].join(",")
            ),
        ].join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "engrais_mineraux.csv";
        link.click();
    };

    const uniqueTypes = [...new Set(engraisMineraux.map((e) => e.type))];

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
                        Ajouter un engrais
                    </button>
                </>
            }
        >
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">
                            Engrais minéraux
                        </h2>
                        <p className="text-sm text-gray-600">
                            Référentiel des engrais minéraux avec facteurs
                            d'émission
                        </p>
                    </div>
                    <div className="text-sm text-gray-500">
                        {filteredData.length} entrée(s) sur{" "}
                        {engraisMineraux.length}
                    </div>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">Tous les types</option>
                        {uniqueTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Rechercher un engrais..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort("nom")}
                                >
                                    Nom
                                    {sortField === "nom" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort("type")}
                                >
                                    Type
                                    {sortField === "type" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort("concentrationN")}
                                >
                                    N (%)
                                    {sortField === "concentrationN" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort("concentrationP")}
                                >
                                    P (%)
                                    {sortField === "concentrationP" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort("concentrationK")}
                                >
                                    K (%)
                                    {sortField === "concentrationK" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort("fe")}
                                >
                                    FE
                                    {sortField === "fe" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort("fracGazf")}
                                >
                                    FRAC GAZF
                                    {sortField === "fracGazf" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedData.map((engrais, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        <div
                                            className="max-w-xs truncate"
                                            title={engrais.nom}
                                        >
                                            {engrais.nom}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {engrais.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {engrais.concentrationN || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {engrais.concentrationP || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {engrais.concentrationK || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {engrais.fe}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {engrais.fracGazf}
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

            <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    À propos de cette base de données
                </h3>
                <div className="text-purple-800 text-sm space-y-2">
                    <p>
                        <strong>N, P, K :</strong> Concentrations en azote,
                        phosphore et potassium (en pourcentage).
                    </p>
                    <p>
                        <strong>FE (Facteur d'Émission) :</strong> Émissions de
                        GES en kg équivalent CO₂ par unité d'élément nutritif.
                    </p>
                    <p>
                        <strong>FRAC GAZF :</strong> Fraction des émissions
                        gazeuses (NH₃-N + NOₓ-N) par kg d'azote appliqué.
                    </p>
                    <p className="pt-2 font-medium">
                        Source : Annexe 3 sur Label Bas Carbone
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
