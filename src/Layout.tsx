import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex flex-col">
            <header className="w-full bg-white shadow flex items-center px-8 py-4 justify-between">
                <div className="flex items-center">
                    <img
                        src="/logo-vivescia.svg"
                        alt="Vivescia"
                        className="h-10 mr-4"
                    />
                    <span className="text-2xl font-bold text-green-800 tracking-tight">
                        Vivescia Décarbonation
                    </span>
                </div>
                <img
                    src="/logo-transitions.svg"
                    alt="Transitions"
                    className="h-10 ml-4"
                />
            </header>
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 my-8">
                    {children}
                </div>
            </main>
            <footer className="w-full text-center text-gray-400 text-sm py-4">
                © {new Date().getFullYear()} Vivescia. Tous droits réservés.
            </footer>
        </div>
    );
}
