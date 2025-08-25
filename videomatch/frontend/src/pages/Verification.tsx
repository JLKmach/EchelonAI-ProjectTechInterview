import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Camera, Mail, Shield, Clock, UserCheck } from 'lucide-react';

const Verification: React.FC = () => {
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock verification status
  const verificationSteps = [
    {
      id: 'email',
      name: 'Verificación de Email',
      description: 'Confirma tu dirección de correo electrónico',
      status: 'completed',
      icon: Mail,
      completedAt: '2024-01-15 10:30'
    },
    {
      id: 'selfie',
      name: 'Verificación con Selfie',
      description: 'Toma una foto de tu rostro para verificar tu identidad',
      status: 'pending',
      icon: Camera,
      completedAt: null
    },
    {
      id: 'video',
      name: 'Video de Perfil',
      description: 'Sube un video de 3 minutos para completar tu perfil',
      status: 'completed',
      icon: UserCheck,
      completedAt: '2024-01-20 15:45'
    },
    {
      id: 'ai',
      name: 'Verificación AI',
      description: 'Análisis automático de tu selfie y video',
      status: 'pending',
      icon: Shield,
      completedAt: null
    }
  ];

  const handleSelfieUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelfieFile(file);
      // Simulate AI verification
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        // Update verification status
        verificationSteps[1].status = 'completed';
        verificationSteps[1].completedAt = new Date().toLocaleString('es-ES');
        verificationSteps[3].status = 'completed';
        verificationSteps[3].completedAt = new Date().toLocaleString('es-ES');
      }, 3000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'pending':
        return 'Pendiente';
      case 'failed':
        return 'Fallido';
      default:
        return 'Pendiente';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-800';
      case 'pending':
        return 'text-yellow-800';
      case 'failed':
        return 'text-red-800';
      default:
        return 'text-gray-800';
    }
  };

  const completedSteps = verificationSteps.filter(step => step.status === 'completed').length;
  const totalSteps = verificationSteps.length;
  const verificationProgress = (completedSteps / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verificación de Cuenta</h1>
        <p className="text-gray-600">
          Completa los pasos de verificación para aumentar la confianza en tu perfil
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Progreso de Verificación</h2>
          <span className="text-2xl font-bold text-purple-600">{Math.round(verificationProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${verificationProgress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          {completedSteps} de {totalSteps} pasos completados
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Steps */}
        <div className="space-y-4">
          {verificationSteps.map((step) => (
            <div
              key={step.id}
              className={`p-4 rounded-lg border ${getStatusColor(step.status)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{step.name}</h3>
                    <span className={`text-sm font-medium ${getStatusTextColor(step.status)}`}>
                      {getStatusText(step.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  {step.completedAt && (
                    <p className="text-xs text-gray-500">
                      Completado: {step.completedAt}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selfie Upload */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Estado Actual</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Nivel de Verificación</span>
                <span className="text-lg font-semibold text-purple-600">
                  {verificationProgress >= 75 ? 'Alto' : verificationProgress >= 50 ? 'Medio' : 'Bajo'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Perfil Público</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  verificationProgress >= 75 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {verificationProgress >= 75 ? 'Visible' : 'Limitado'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Prioridad en Matches</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  verificationProgress >= 75 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {verificationProgress >= 75 ? 'Alta' : 'Normal'}
                </span>
              </div>
            </div>
          </div>

          {/* Selfie Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Verificación con Selfie</h2>
            {!selfieFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Toma una foto de tu rostro para verificar tu identidad
                </p>
                <label className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
                  <Camera className="w-4 h-4 mr-2" />
                  Tomar Selfie
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleSelfieUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  O sube una foto desde tu galería
                </p>
                <label className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer mt-2">
                  <Camera className="w-4 h-4 mr-2" />
                  Subir Foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelfieUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(selfieFile)}
                    alt="Selfie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Foto seleccionada: {selfieFile.name}
                </p>
                {isProcessing ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Verificando identidad...</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelfieFile(null)}
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cambiar Foto
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Verification Benefits */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Beneficios de la Verificación</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Mayor Visibilidad</p>
                  <p className="text-sm text-gray-600">Tu perfil aparece primero en las búsquedas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Confianza</p>
                  <p className="text-sm text-gray-600">Los usuarios confían más en perfiles verificados</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Mejores Matches</p>
                  <p className="text-sm text-gray-600">Algoritmo prioriza perfiles verificados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
