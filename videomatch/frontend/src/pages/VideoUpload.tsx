import React, { useState, useRef } from 'react';
import { Play, Upload, RotateCcw, Camera, Mic, Settings, Check } from 'lucide-react';

const VideoUpload: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock video data
  const mockVideo = {
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '2:45',
    size: '15.2 MB',
    uploadDate: '2024-01-20',
    status: 'active'
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    setRecordingInterval(interval);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    // Simulate processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setUploadedVideo(mockVideo.url);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file upload
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setUploadedVideo(mockVideo.url);
      }, 2000);
    }
  };

  const handleRetake = () => {
    setUploadedVideo(null);
    setRecordingTime(0);
    setIsRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Perfil</h1>
        <p className="text-gray-600">
          Graba o sube un video de 3 minutos para mostrar tu personalidad y pasiones
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Recording/Upload Area */}
        <div className="space-y-6">
          {/* Current Video Display */}
          {uploadedVideo ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tu Video Actual</h2>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-600">Video de {mockVideo.duration}</p>
                  <p className="text-sm text-gray-500">{mockVideo.size}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>Subido: {new Date(mockVideo.uploadDate).toLocaleDateString('es-ES')}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Activo
                </span>
              </div>
              <button
                onClick={handleRetake}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Grabar Nuevo Video
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Grabar Video</h2>
              
              {/* Recording Interface */}
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                {isRecording ? (
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <p className="text-2xl font-mono">{formatTime(recordingTime)}</p>
                    <p className="text-sm opacity-75">Grabando...</p>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Preparado para grabar</p>
                    <p className="text-sm opacity-75">Haz clic en Grabar para comenzar</p>
                  </div>
                )}
              </div>

              {/* Recording Controls */}
              <div className="flex space-x-3">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <div className="w-4 h-4 bg-white rounded-full mr-2"></div>
                    Grabar
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                  >
                    <div className="w-4 h-4 bg-white rounded-full mr-2"></div>
                    Detener
                  </button>
                )}
              </div>

              {/* Recording Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Consejos para tu video:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Habla sobre tus pasiones e intereses</li>
                  <li>• Sé auténtico y natural</li>
                  <li>• Mantén una buena iluminación</li>
                  <li>• Duración máxima: 3 minutos</li>
                </ul>
              </div>
            </div>
          )}

          {/* Upload Alternative */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">O Sube un Video</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Arrastra y suelta tu video aquí, o
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                selecciona un archivo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-sm text-gray-500 mt-2">
                MP4, AVI, MOV hasta 100MB
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recording Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Estado de Grabación</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Cámara</span>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Conectada</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Micrófono</span>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Conectado</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Almacenamiento</span>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Disponible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Status */}
          {isProcessing && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Procesando Video</h2>
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Procesando tu video...</p>
                <p className="text-sm text-gray-500">Esto puede tomar unos minutos</p>
              </div>
            </div>
          )}

          {/* Video Guidelines */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pautas del Video</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Duración</p>
                  <p className="text-sm text-gray-600">Máximo 3 minutos</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Formato</p>
                  <p className="text-sm text-gray-600">MP4, AVI, MOV</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Tamaño</p>
                  <p className="text-sm text-gray-600">Máximo 100MB</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Calidad</p>
                  <p className="text-sm text-gray-600">Mínimo 720p</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="space-y-3">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                <Settings className="w-4 h-4 mr-2" />
                Configurar Cámara
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                <Mic className="w-4 h-4 mr-2" />
                Configurar Micrófono
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
