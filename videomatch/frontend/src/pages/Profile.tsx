import React, { useState } from 'react';
import { Edit, MapPin, Calendar, Globe, Video, Shield } from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Función para calcular la edad basada en la fecha de nacimiento
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };
  
  // Mock data for demo
  const user = {
    name: 'Mariana Estrada Romero',
    birthDate: '1979-08-03',
    location: 'Ciudad de México',
    bio: 'Me encanta la música, viajar y conocer gente nueva. Siempre buscando nuevas aventuras y conexiones auténticas. Disfruto de la vida y de las experiencias que me ofrece cada día.',
    interests: ['Música', 'Viajes', 'Fotografía', 'Cocina', 'Yoga', 'Arte', 'Literatura'],
    languages: ['Español', 'Inglés', 'Francés'],
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    verificationStatus: 'verified' as const,
    stats: {
      matches: 24,
      conversations: 18,
      meetings: 8,
      rating: 4.8
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                <Video className="w-4 h-4" />
              </button>
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                {user.verificationStatus === 'verified' && (
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Verificado
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{calculateAge(user.birthDate)} años</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>Miembro desde {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sobre mí</h2>
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>

          {/* Video Profile */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mi Video Perfil</h2>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600">Video de 3 minutos</p>
                <p className="text-sm text-gray-500">Tu historia personal</p>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Intereses</h2>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Idiomas</h2>
            <div className="flex flex-wrap gap-2">
              {user.languages.map((language) => (
                <span
                  key={language}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Estadísticas</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Matches</span>
                <span className="text-2xl font-bold text-purple-600">{user.stats.matches}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Me gusta</span>
                <span className="text-2xl font-bold text-pink-600">{user.stats.conversations}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Rating</span>
                <span className="text-2xl font-bold text-yellow-600">{user.stats.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Verificación</span>
                <span className="text-2xl font-bold text-green-600">100%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="space-y-3">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Subir Nuevo Video
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                Editar Perfil
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                Ver Matches
              </button>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Estado de Verificación</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email</span>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Selfie</span>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Video</span>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
