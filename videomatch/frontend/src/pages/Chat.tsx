import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Paperclip, Smile, MoreVertical, Phone, Video } from 'lucide-react';

const Chat: React.FC = () => {
  const { matchId } = useParams();
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>(matchId || null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for chat conversations
  const conversations = [
    {
      id: '1',
      name: 'Mariana Lopez',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      lastMessage: '¡Hola! ¿Cómo estás?',
      lastMessageTime: '2 horas',
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: '1',
          text: '¡Hola! ¿Cómo estás?',
          sender: 'them',
          timestamp: '14:30',
          isRead: false
        },
        {
          id: '2',
          text: '¡Hola Mariana! Muy bien, gracias. ¿Y tú?',
          sender: 'me',
          timestamp: '14:32',
          isRead: true
        },
        {
          id: '3',
          text: 'También muy bien. ¿Te gustaría que nos conozcamos en persona?',
          sender: 'them',
          timestamp: '14:35',
          isRead: false
        },
        {
          id: '4',
          text: '¡Por supuesto! Me encantaría. ¿Qué te parece si vamos a tomar un café?',
          sender: 'me',
          timestamp: '14:37',
          isRead: true
        },
        {
          id: '5',
          text: '¡Perfecto! ¿Te parece bien mañana a las 3pm en el café de la esquina?',
          sender: 'them',
          timestamp: '14:40',
          isRead: true
        }
      ]
    },
    {
      id: '2',
      name: 'Roberto Santos',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Nos vemos mañana entonces',
      lastMessageTime: '1 día',
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: '1',
          text: '¡Hola Roberto! ¿Cómo va todo?',
          sender: 'me',
          timestamp: '10:15',
          isRead: true
        },
        {
          id: '2',
          text: '¡Hola! Todo muy bien, gracias. ¿Y tú?',
          sender: 'them',
          timestamp: '10:20',
          isRead: true
        },
        {
          id: '3',
          text: 'También muy bien. ¿Te gustaría que nos conozcamos?',
          sender: 'me',
          timestamp: '10:25',
          isRead: true
        },
        {
          id: '4',
          text: '¡Por supuesto! ¿Qué te parece si vamos a cenar?',
          sender: 'them',
          timestamp: '10:30',
          isRead: true
        },
        {
          id: '5',
          text: '¡Me encanta la idea! ¿Cuándo te parece bien?',
          sender: 'me',
          timestamp: '10:35',
          isRead: true
        },
        {
          id: '6',
          text: '¿Te parece bien mañana a las 8pm?',
          sender: 'them',
          timestamp: '10:40',
          isRead: true
        },
        {
          id: '7',
          text: '¡Perfecto! Nos vemos mañana entonces',
          sender: 'me',
          timestamp: '10:45',
          isRead: true
        }
      ]
    },
    {
      id: '3',
      name: 'Carmen Vega',
      profilePicture: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
      lastMessage: 'Gracias por la recomendación',
      lastMessageTime: '3 días',
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: '1',
          text: '¡Hola Carmen! ¿Cómo estás?',
          sender: 'me',
          timestamp: '16:00',
          isRead: true
        },
        {
          id: '2',
          text: '¡Hola! Muy bien, gracias. ¿Y tú?',
          sender: 'them',
          timestamp: '16:05',
          isRead: true
        },
        {
          id: '3',
          text: 'También muy bien. ¿Te gustaría que nos conozcamos?',
          sender: 'me',
          timestamp: '16:10',
          isRead: true
        },
        {
          id: '4',
          text: '¡Por supuesto! ¿Qué te parece si vamos a tomar un café?',
          sender: 'them',
          timestamp: '16:15',
          isRead: true
        },
        {
          id: '5',
          text: '¡Me encanta la idea! ¿Cuándo te parece bien?',
          sender: 'me',
          timestamp: '16:20',
          isRead: true
        },
        {
          id: '6',
          text: '¿Te parece bien mañana a las 3pm?',
          sender: 'them',
          timestamp: '16:25',
          isRead: true
        },
        {
          id: '7',
          text: '¡Perfecto! Nos vemos mañana entonces',
          sender: 'me',
          timestamp: '16:30',
          isRead: true
        },
        {
          id: '8',
          text: 'Gracias por la recomendación',
          sender: 'them',
          timestamp: '16:35',
          isRead: false
        }
      ]
    }
  ];

  const currentConversation = conversations.find(conv => conv.id === activeChat) || conversations[0];

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement actual message sending
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-200px)]">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex">
        {/* Sidebar - Conversations List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Conversaciones</h2>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setActiveChat(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeChat === conversation.id ? 'bg-purple-50 border-purple-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.profilePicture}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={currentConversation.profilePicture}
                alt={currentConversation.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{currentConversation.name}</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${currentConversation.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-gray-500">
                    {currentConversation.isOnline ? 'En línea' : 'Desconectado'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentConversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === 'me'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className={`text-xs mt-1 ${
                    msg.sender === 'me' ? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                    {msg.sender === 'me' && (
                      <span className="ml-2">
                        {msg.isRead ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe un mensaje..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={1}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
