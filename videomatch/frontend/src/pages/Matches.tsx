import React, { useState } from 'react';
import { Heart, MessageCircle, X, Star, MapPin, Calendar } from 'lucide-react';

const Matches: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'potential' | 'matches'>('potential');

  // Mock data for potential matches
  const potentialMatches = [
    {
      id: '1',
      name: 'Carlos Mendoza',
      age: 30,
      city: 'Madrid',
      distance: '2.3 km',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      interests: ['Música', 'Deportes', 'Viajes'],
      languages: ['Español', 'Inglés'],
      compatibility: 87,
      lastActive: '2 min'
    },
    {
      id: '2',
      name: 'Sofia Torres',
      age: 26,
      city: 'Madrid',
      distance: '1.8 km',
      profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      interests: ['Arte', 'Cocina', 'Fotografía'],
      languages: ['Español', 'Francés'],
      compatibility: 92,
      lastActive: '15 min'
    },
    {
      id: '3',
      name: 'Diego Ramirez',
      age: 29,
      city: 'Madrid',
      distance: '3.1 km',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      interests: ['Tecnología', 'Gaming', 'Música'],
      languages: ['Español', 'Inglés'],
      compatibility: 78,
      lastActive: '1 hora'
    },
    {
      id: '4',
      name: 'Valentina Silva',
      age: 27,
      city: 'Madrid',
      distance: '2.7 km',
      profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      interests: ['Yoga', 'Meditación', 'Naturaleza'],
      languages: ['Español', 'Portugués'],
      compatibility: 85,
      lastActive: '30 min'
    }
  ];

  // Mock data for existing matches
  const existingMatches = [
    {
      id: '1',
      name: 'Mariana Lopez',
      age: 28,
      city: 'Madrid',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      matchDate: '2024-01-20',
      lastMessage: '¡Hola! ¿Cómo estás?',
      lastMessageTime: '2 horas',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Roberto Santos',
      age: 31,
      city: 'Madrid',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      matchDate: '2024-01-18',
      lastMessage: 'Nos vemos mañana entonces',
      lastMessageTime: '1 día',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'Carmen Vega',
      age: 25,
      city: 'Madrid',
      profilePicture: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
      matchDate: '2024-01-15',
      lastMessage: 'Gracias por la recomendación',
      lastMessageTime: '3 días',
      unreadCount: 1,
      isOnline: true
    }
  ];

  const handleLike = (id: string) => {
    // TODO: Implement like functionality
    console.log('Liked:', id);
  };

  const handlePass = (id: string) => {
    // TODO: Implement pass functionality
    console.log('Passed:', id);
  };

  const handleMessage = (id: string) => {
    // TODO: Navigate to chat
    console.log('Message:', id);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Matches</h1>
        <p className="text-gray-600">Descubre personas compatibles y mantén conversaciones con tus matches</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('potential')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'potential'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Descubrir ({potentialMatches.length})
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'matches'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mis Matches ({existingMatches.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'potential' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {potentialMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={match.profilePicture}
                  alt={match.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {match.compatibility}% Match
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{match.name}</h3>
                    <div className="flex items-center space-x-3 text-gray-600 text-sm">
                      <span>{match.age} años</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{match.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {match.lastActive}
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {match.interests.map((interest) => (
                      <span
                        key={interest}
                        className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {match.languages.map((language) => (
                      <span
                        key={language}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handlePass(match.id)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Pasar
                  </button>
                  <button
                    onClick={() => handleLike(match.id)}
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Me Gusta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {existingMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                {/* Profile Picture */}
                <div className="relative">
                  <img
                    src={match.profilePicture}
                    alt={match.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {match.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                {/* Match Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{match.name}</h3>
                    <span className="text-sm text-gray-500">{match.lastMessageTime}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600 text-sm mb-2">
                    <span>{match.age} años</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{match.city}</span>
                    </div>
                    <span>•</span>
                    <span>Match desde {new Date(match.matchDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  <p className="text-gray-700">{match.lastMessage}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  {match.unreadCount > 0 && (
                    <div className="bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {match.unreadCount}
                    </div>
                  )}
                  <button
                    onClick={() => handleMessage(match.id)}
                    className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
