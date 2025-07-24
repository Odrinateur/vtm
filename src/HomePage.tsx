import type { Exploitation } from "./assets/exploitations.mock";
import exploitations from "./assets/exploitations.mock";
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

export default function HomePage() {
    const [search, setSearch] = useState("");
    const filtered = exploitations.filter(
        (exp) =>
            exp.nom.toLowerCase().includes(search.toLowerCase()) ||
            exp.code.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-8 text-center">
                Sélectionnez une exploitation
            </h1>
            <div className="w-full flex flex-col mb-8">
                <div className="relative w-full mb-6">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou code SAP..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800 placeholder-gray-400 transition-all"
                    />
                </div>

                {/* Tableau des exploitations */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nom
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Code SAP
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type de diagnostique
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date de dernière mise à jour
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                                        Aucune exploitation trouvée.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((exp: Exploitation) => (
                                    <tr key={exp.code} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">
                                                {exp.nom}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {exp.codeSAP}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {exp.typeDiag}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {exp.dateDerniereMiseAJour}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link 
                                                to={`/exploitation/${exp.id}`}
                                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                Accéder
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
