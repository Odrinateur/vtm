import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, Download, Upload, Plus, Edit, Trash2 } from "lucide-react";
import { pros, PRO } from "../../assets/admin-data";
import { useState } from "react";

export default function AdminPROPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<keyof PRO>("name");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredData = pros
        .filter(pro => 
            pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pro.commentaire.toLowerCase().includes(searchTerm.toLowerCase())
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

    const handleSort = (field: keyof PRO) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
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
                            <div className="flex items-center">
                                <Leaf className="h-6 w-6 text-emerald-600 mr-3" />
                                <h1 className="text-2xl font-bold text-gray-900">BD PRO</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Download className="h-4 w-4 mr-2" />
                                Exporter
                            </button>
                            <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                <Upload className="h-4 w-4 mr-2" />
                                Importer
                            </button>
                            <button className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter
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
                                Produits Résiduaires Organiques (PRO)
                            </h2>
                            <p className="text-gray-600">
                                Base de données des PRO avec teneurs en carbone, azote et facteurs d'émission GES
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            {filteredData.length} entrée(s) sur {pros.length}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-6">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Rechercher par nom de PRO ou commentaire..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                                        onClick={() => handleSort("name")}
                                    >
                                        <div className="flex items-center">
                                            Nom PRO
                                            {sortField === "name" && (
                                                <span className="ml-1">
                                                    {sortDirection === "asc" ? "↑" : "↓"}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort("ismo")}
                                    >
                                        <div className="flex items-center">
                                            ISMO
                                            {sortField === "ismo" && (
                                                <span className="ml-1">
                                                    {sortDirection === "asc" ? "↑" : "↓"}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort("teneurCKgT")}
                                    >
                                        <div className="flex items-center">
                                            Teneur C (kg/T)
                                            {sortField === "teneurCKgT" && (
                                                <span className="ml-1">
                                                    {sortDirection === "asc" ? "↑" : "↓"}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort("nMoyenKgT")}
                                    >
                                        <div className="flex items-center">
                                            N moyen (kg/T)
                                            {sortField === "nMoyenKgT" && (
                                                <span className="ml-1">
                                                    {sortDirection === "asc" ? "↑" : "↓"}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort("feCO2eqT")}
                                    >
                                        <div className="flex items-center">
                                            FE CO2eq/T
                                            {sortField === "feCO2eqT" && (
                                                <span className="ml-1">
                                                    {sortDirection === "asc" ? "↑" : "↓"}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort("prixT")}
                                    >
                                        <div className="flex items-center">
                                            Prix (€/T)
                                            {sortField === "prixT" && (
                                                <span className="ml-1">
                                                    {sortDirection === "asc" ? "↑" : "↓"}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredData.map((pro, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {pro.name}
                                            </div>
                                            {pro.commentaire && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {pro.commentaire}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {pro.ismo}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {pro.teneurCKgT}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {pro.nMoyenKgT}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {pro.feCO2eqT.toFixed(3)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {pro.prixT > 0 ? `${pro.prixT}€` : '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {pro.name.startsWith('COMP') ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Compost
                                                    </span>
                                                ) : pro.name.includes('FUMIER') ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brown-100 text-brown-800">
                                                        Fumier
                                                    </span>
                                                ) : pro.name.includes('VINASSE') ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                        Vinasse
                                                    </span>
                                                ) : pro.name.includes('DIGESTAT') ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        Digestat
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        Autre
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
                        À propos des Produits Résiduaires Organiques (PRO)
                    </h3>
                    <div className="text-blue-800 text-sm space-y-2">
                        <p>
                            Les PRO sont des matières organiques issues de l'activité humaine qui peuvent être valorisées en agriculture comme amendements organiques ou fertilisants.
                        </p>
                        <p>
                            <strong>ISMO :</strong> Indice de Stabilité de la Matière Organique, exprime la fraction de carbone organique qui reste dans le sol après décomposition
                        </p>
                        <p>
                            <strong>Teneur C :</strong> Teneur en carbone organique (kg/tonne de produit brut)
                        </p>
                        <p>
                            <strong>N moyen :</strong> Teneur moyenne en azote total (kg/tonne de produit brut)
                        </p>
                        <p>
                            <strong>FE CO2eq/T :</strong> Facteur d'émission en équivalent CO2 par tonne de produit
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}