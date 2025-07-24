import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Download, Plus } from "lucide-react";
import { zonesClimatiques, ZoneClimatique } from "../../assets/admin-data";

export default function AdminClimatPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<keyof ZoneClimatique>("zone");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredData = zonesClimatiques.filter(zone =>
        zone.zone.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    const handleSort = (field: keyof ZoneClimatique) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const exportToCSV = () => {
        const headers = ["Zone climatique", "ETP Annuelle (mm)", "Pluie Annuelle (mm)", "Temp. Moy. Annuelle (°C)"];
        const csvContent = [
            headers.join(","),
            ...sortedData.map(zone => [
                `"${zone.zone}"`,
                zone.etpAnnuelle,
                zone.pluieAnnuelle,
                zone.tempMoyAnnuelle
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "zones_climatiques.csv";
        link.click();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link 
                                to="/admin" 
                                className="flex items-center text-gray-600 hover:text-gray-900 mr-6"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Retour à l'admin
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Base de données Climat</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={exportToCSV}
                                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Exporter CSV
                            </button>
                            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter une zone
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">
                                Zones climatiques ({sortedData.length})
                            </h2>
                            <p className="text-sm text-gray-600">
                                Données climatiques de référence pour les calculs SIMEOS
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher une zone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                                        onClick={() => handleSort("zone")}
                                    >
                                        Zone climatique
                                        {sortField === "zone" && (
                                            <span className="ml-1">
                                                {sortDirection === "asc" ? "↑" : "↓"}
                                            </span>
                                        )}
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort("etpAnnuelle")}
                                    >
                                        ETP Annuelle (mm)
                                        {sortField === "etpAnnuelle" && (
                                            <span className="ml-1">
                                                {sortDirection === "asc" ? "↑" : "↓"}
                                            </span>
                                        )}
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort("pluieAnnuelle")}
                                    >
                                        Pluie Annuelle (mm)
                                        {sortField === "pluieAnnuelle" && (
                                            <span className="ml-1">
                                                {sortDirection === "asc" ? "↑" : "↓"}
                                            </span>
                                        )}
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort("tempMoyAnnuelle")}
                                    >
                                        Temp. Moy. Annuelle (°C)
                                        {sortField === "tempMoyAnnuelle" && (
                                            <span className="ml-1">
                                                {sortDirection === "asc" ? "↑" : "↓"}
                                            </span>
                                        )}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedData.map((zone, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {zone.zone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {zone.etpAnnuelle}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {zone.pluieAnnuelle}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {zone.tempMoyAnnuelle}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        À propos de cette base de données
                    </h3>
                    <div className="text-blue-800 text-sm space-y-2">
                        <p>
                            <strong>ETP (Évapotranspiration Potentielle) :</strong> Quantité d'eau évapotranspirée par une culture de référence dans des conditions optimales.
                        </p>
                        <p>
                            <strong>Précipitations :</strong> Cumul annuel moyen des précipitations pour la zone climatique.
                        </p>
                        <p>
                            <strong>Température moyenne :</strong> Température moyenne annuelle de la zone climatique.
                        </p>
                        <p className="pt-2 font-medium">
                            Source : Base de données SIMEOS DEMO
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}