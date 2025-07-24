import { Link } from "react-router-dom";
import {
    Database,
    Cloud,
    Beaker,
    Leaf,
    Settings,
    ArrowLeft,
} from "lucide-react";

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link
                                to="/"
                                className="flex items-center text-gray-600 hover:text-gray-900 mr-6"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Retour à l'accueil
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Administration
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                        Gestion des bases de données
                    </h2>
                    <p className="text-gray-600">
                        Accédez aux différentes bases de données pour consulter
                        et gérer les référentiels techniques.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                        to="/admin/climat"
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <Cloud className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 ml-3">
                                BD Climat
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Zones climatiques avec ETP, précipitations et
                            températures moyennes annuelles.
                        </p>
                        <div className="text-blue-600 text-sm font-medium">
                            37 zones climatiques →
                        </div>
                    </Link>

                    <Link
                        to="/admin/pra"
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                <Database className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 ml-3">
                                BD PRA Grand-Est
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Données DDC moyennes et Q3 pour les Petites Régions
                            Agricoles du Grand-Est.
                        </p>
                        <div className="text-green-600 text-sm font-medium">
                            48 PRA référencées →
                        </div>
                    </Link>

                    <Link
                        to="/admin/engrais"
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                <Beaker className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 ml-3">
                                BD Engrais
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Engrais minéraux avec concentrations NPK, facteurs
                            d'émission et prix.
                        </p>
                        <div className="text-purple-600 text-sm font-medium">
                            70+ engrais référencés →
                        </div>
                    </Link>

                    <Link
                        to="/admin/amendements"
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                <Settings className="h-6 w-6 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 ml-3">
                                BD Amendements
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Amendements calciques avec valeurs neutralisantes et
                            facteurs d'émission.
                        </p>
                        <div className="text-orange-600 text-sm font-medium">
                            3 amendements →
                        </div>
                    </Link>

                    <Link
                        to="/admin/pro"
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                                <Leaf className="h-6 w-6 text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 ml-3">
                                BD PRO
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Produits Résiduaires Organiques avec teneurs en
                            carbone, azote et facteurs d'émission.
                        </p>
                        <div className="text-emerald-600 text-sm font-medium">
                            150+ PRO référencés →
                        </div>
                    </Link>

                    <Link
                        to="/admin/materiel"
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                                <Settings className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 ml-3">
                                BD Matériel
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Matériel d'épandage avec délais et facteurs
                            d'ajustement pour les émissions.
                        </p>
                        <div className="text-red-600 text-sm font-medium">
                            21 configurations →
                        </div>
                    </Link>
                </div>

                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        À propos des bases de données
                    </h3>
                    <p className="text-blue-800 text-sm">
                        Ces bases de données contiennent les référentiels
                        techniques utilisés pour les calculs de bilans carbone
                        et GES. Les données proviennent de sources officielles
                        (GES'TIM+, Label Bas Carbone, CITEPA OMINEA) et sont
                        régulièrement mises à jour.
                    </p>
                </div>
            </div>
        </div>
    );
}
