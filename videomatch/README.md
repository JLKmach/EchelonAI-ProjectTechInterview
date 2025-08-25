# 🎥 VideoMatch - Aplicación de Conexiones por Video

VideoMatch es una aplicación web innovadora que conecta personas a través de perfiles de video de 3 minutos, permitiendo mostrar la personalidad y pasiones de manera más auténtica que las fotos tradicionales.

## ✨ Características Principales

- **Perfiles de Video**: Graba o sube videos de 3 minutos para mostrar tu personalidad
- **Sistema de Matches**: Algoritmo inteligente basado en intereses, ubicación y compatibilidad
- **Chat en Tiempo Real**: Comunicación fluida con tus matches
- **Verificación Multicapa**: Email, selfie y verificación AI para perfiles genuinos
- **Sistema de Ratings**: Evaluaciones post-encuentro para mantener la calidad
- **Geolocalización**: Encuentra personas cerca de ti
- **Intereses y Hobbies**: Categorías principales para mejor compatibilidad

## 🚀 Cómo Probar la Aplicación

### **Opción 1: Demo HTML (Recomendado para pruebas rápidas)**

1. **Abrir el archivo demo**: Navega a `videomatch/demo.html`
2. **Abrir en navegador**: Haz doble clic en el archivo o arrastra a tu navegador
3. **Explorar funcionalidades**:
   - Navegación por secciones
   - Modales de login/registro
   - Demo interactivo de perfiles y matches
   - Diseño responsivo

### **Opción 2: Aplicación React Completa**

#### **Prerrequisitos**
- Node.js (versión 16 o superior)
- npm o yarn

#### **Instalación y Ejecución**

```bash
# Navegar al directorio del frontend
cd videomatch/frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# La aplicación se abrirá en http://localhost:3000
```

#### **Funcionalidades Disponibles**
- **Página de Inicio**: Landing page con características
- **Registro/Login**: Formularios funcionales con validación
- **Perfil de Usuario**: Vista completa del perfil con datos mock
- **Sistema de Matches**: Usuarios potenciales y existentes
- **Chat**: Conversaciones simuladas entre usuarios
- **Subida de Video**: Simulación de grabación y subida
- **Verificación**: Pasos de verificación de cuenta

## 🏗️ Arquitectura del Proyecto

### **Frontend (React + TypeScript)**
```
videomatch/frontend/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas principales
│   ├── stores/        # Estado global (Zustand)
│   └── types/         # Definiciones de TypeScript
├── public/            # Archivos estáticos
└── package.json       # Dependencias y scripts
```

### **Backend (Node.js + Express)**
```
videomatch/backend/
├── src/
│   ├── config/        # Configuraciones (DB, Redis)
│   ├── routes/        # Endpoints de la API
│   ├── middleware/    # Middleware personalizado
│   └── types/         # Tipos TypeScript
├── database/          # Esquemas SQL y migraciones
└── package.json       # Dependencias del backend
```

### **Base de Datos**
- **PostgreSQL**: Base de datos principal con funciones personalizadas
- **Redis**: Cache y sesiones
- **AWS S3**: Almacenamiento de videos y selfies

### **Docker**
- **docker-compose.yml**: Orquestación de servicios
- **Dockerfiles**: Imágenes para frontend y backend
- **Nginx**: Proxy reverso y servidor web

## 🎯 Tecnologías Utilizadas

### **Frontend**
- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **Zustand** para manejo de estado
- **React Router** para navegación
- **React Hook Form** para formularios
- **Lucide React** para iconos

### **Backend**
- **Node.js** con Express
- **TypeScript** para tipado
- **PostgreSQL** con pg
- **Redis** para cache
- **Socket.io** para tiempo real
- **JWT** para autenticación

### **Herramientas de Desarrollo**
- **ESLint** y **Prettier** para calidad de código
- **Jest** para testing
- **Nodemon** para desarrollo
- **Docker** para containerización

## 📱 Funcionalidades Implementadas

### **✅ Completado**
- [x] Estructura del proyecto completa
- [x] Páginas principales con datos mock
- [x] Sistema de navegación
- [x] Componentes reutilizables
- [x] Estado global con Zustand
- [x] Formularios con validación
- [x] Diseño responsivo con Tailwind CSS
- [x] Demo HTML funcional
- [x] Configuración de Docker
- [x] Esquema de base de datos

### **🔄 En Desarrollo**
- [ ] Conexión con backend real
- [ ] Autenticación JWT
- [ ] Subida de archivos a AWS S3
- [ ] WebSockets para chat en tiempo real
- [ ] Algoritmo de matching real

### **📋 Pendiente**
- [ ] Testing automatizado
- [ ] CI/CD pipeline
- [ ] Monitoreo y analytics
- [ ] PWA capabilities
- [ ] App móvil nativa

## 🧪 Testing

### **Frontend**
```bash
cd videomatch/frontend
npm test          # Ejecutar tests
npm run test:coverage  # Con cobertura
```

### **Backend**
```bash
cd videomatch/backend
npm test          # Ejecutar tests
npm run test:watch  # Modo watch
```

## 🐳 Docker

### **Desarrollo**
```bash
cd videomatch/docker
docker-compose -f docker-compose.dev.yml up
```

### **Producción**
```bash
cd videomatch/docker
docker-compose up -d
```

## 📊 Estructura de Datos

### **Entidades Principales**
- **Users**: Perfiles de usuario con verificación
- **Videos**: Perfiles de video de 3 minutos
- **Matches**: Conexiones entre usuarios
- **Chat**: Mensajes entre matches
- **Ratings**: Evaluaciones post-encuentro
- **Reports**: Sistema de reportes para moderación

### **Funciones Personalizadas**
- `calculate_age()`: Cálculo automático de edad
- `calculate_compatibility()`: Algoritmo de compatibilidad
- `update_verification_score()`: Puntuación de verificación
- `update_mutual_like()`: Gestión de likes mutuos

## 🔒 Seguridad y Privacidad

- **Verificación Multicapa**: Email, selfie y AI
- **JWT Tokens**: Autenticación segura
- **Rate Limiting**: Protección contra abuso
- **Validación de Entrada**: Sanitización de datos
- **Encriptación**: Contraseñas hasheadas con bcrypt

## 🚀 Despliegue

### **Requisitos del Servidor**
- **CPU**: 2+ cores
- **RAM**: 4GB+ 
- **Almacenamiento**: 50GB+ SSD
- **Red**: Ancho de banda para videos

### **Variables de Entorno**
```bash
# Servidor
PORT=3000
NODE_ENV=production

# Base de Datos
DATABASE_URL=postgresql://user:pass@host:5432/videomatch
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# AWS S3
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=videomatch-uploads

# Email
SENDGRID_API_KEY=your-key
```

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

- **Email**: soporte@videomatch.com
- **Documentación**: [docs.videomatch.com](https://docs.videomatch.com)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/videomatch/issues)

## 🎉 Agradecimientos

- **Tailwind CSS** por el framework de estilos
- **Unsplash** por las imágenes de ejemplo
- **Lucide** por los iconos
- **React Team** por el framework

---

**VideoMatch** - Conectando personas a través de video historias 🎥❤️
