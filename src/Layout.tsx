import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

interface LayoutProps {
    children: ReactNode;
    fullHeight?: boolean;
}

export default function Layout({ children, fullHeight = false }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex flex-col">
            <header className="w-full bg-white shadow flex items-center px-8 py-4 justify-between">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/logo-vivescia.svg"
                            alt="Vivescia"
                            className="h-10 mr-4"
                        />
                        <span className="text-2xl font-bold text-green-800 tracking-tight">
                            Calculette Décarbonation
                        </span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link
                        to="/admin"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                        title="Administration"
                    >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin
                    </Link>
                    <img
                        src="/logo-transitions.svg"
                        alt="Transitions"
                        className="h-10 ml-4"
                    />
                </div>
            </header>
            <main
                className={`flex-1 ${
                    fullHeight
                        ? "flex flex-col"
                        : "flex flex-col items-center justify-center"
                } p-4`}
            >
                <div
                    className={`w-full ${
                        fullHeight ? "flex-1 flex flex-col" : "max-w-6xl"
                    } bg-white rounded-xl shadow-lg ${
                        fullHeight ? "h-full" : ""
                    } my-8`}
                >
                    <div
                        className={`${
                            fullHeight
                                ? "flex-1 flex flex-col overflow-hidden"
                                : "p-8"
                        }`}
                    >
                        {children}
                    </div>
                </div>
            </main>
            <footer className="w-full text-center text-gray-400 text-sm py-4">
                © {new Date().getFullYear()} Vivescia. Tous droits réservés.
            </footer>
        </div>
    );
}
