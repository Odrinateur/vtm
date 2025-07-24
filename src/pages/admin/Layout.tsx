import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
    icon?: ReactNode;
    actions?: ReactNode;
}

export default function AdminLayout({
    children,
    title,
    icon,
    actions,
}: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="w-full bg-white shadow-sm border-b">
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
                            {icon && <span className="mr-3">{icon}</span>}
                            {title && (
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {title}
                                </h1>
                            )}
                        </div>
                        {actions && (
                            <div className="flex items-center space-x-3">
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className="flex-1 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full">
                {children}
            </main>
            <footer className="w-full text-center text-gray-400 text-sm py-4 border-t bg-white">
                © {new Date().getFullYear()} Vivescia. Tous droits réservés.
            </footer>
        </div>
    );
}
