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
            <div className="w-full flex flex-col items-center mb-8">
                <div className="relative w-full">
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
            </div>
            <div className="w-full space-y-4">
                {filtered.length === 0 ? (
                    <div className="text-center text-gray-400">
                        Aucune exploitation trouvée.
                    </div>
                ) : (
                    filtered.map((exp: Exploitation) => (
                        <div
                            key={exp.code}
                            className="bg-white rounded shadow p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
                        >
                            <div>
                                <div className="font-semibold text-lg">
                                    {exp.nom}
                                </div>
                                <div className="text-gray-500 text-sm">
                                    Code SAP : {exp.code}
                                </div>
                            </div>
                            <Link 
                                to={`/exploitation/${exp.id}`}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            >
                                Voir
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}
