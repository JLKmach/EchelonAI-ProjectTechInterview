# VideoMatch - Conectando Personas a Través de Videos

## 🎯 Descripción del Proyecto
Plataforma de matchmaking que reemplaza las fotos estáticas con videos de 3 minutos donde las personas muestran su personalidad, pasiones e intereses reales.

## 🏗️ Arquitectura del Sistema
- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Base de Datos:** PostgreSQL
- **Cache:** Redis
- **Storage:** AWS S3 (videos, selfies)
- **Real-time:** Socket.io

## 🚀 Funcionalidades Core
1. **Gestión de Perfil** - Crear perfil con video de presentación
2. **Sistema de Match** - Algoritmo de compatibilidad basado en intereses
3. **Comunicación** - Chat en tiempo real entre matches
4. **Sistema de Rating** - Encuestas anónimas post-encuentro
5. **Verificación** - Email + selfie para evitar bots
6. **Geolocalización** - Búsqueda por ciudad y código postal
7. **QR Encuentros** - Confirmación de encuentros en persona
8. **Reportes** - Sistema de moderación por recurrencia

## 📁 Estructura del Proyecto
```
videomatch/
├── frontend/          # React frontend
├── backend/           # Node.js backend
├── database/          # Scripts de base de datos
├── docs/             # Documentación
└── docker/           # Configuración Docker
```

## 🛠️ Instalación y Configuración
Ver instrucciones en cada directorio específico.

## 📋 Estado del Proyecto
- [x] PRD completado
- [ ] Estructura del proyecto
- [ ] Base de datos
- [ ] Backend API
- [ ] Frontend
- [ ] Testing
- [ ] Deployment
