import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-4xl">404</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Página no encontrada
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Ir al Inicio
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver Atrás
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            ¿Necesitas ayuda?
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#" className="text-purple-600 hover:text-purple-700">
              Contacto
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-purple-600 hover:text-purple-700">
              Soporte
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-purple-600 hover:text-purple-700">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
