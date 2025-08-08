# 📋 TODOS - Portfolio Lena Rog

## 🎨 Mejoras Visuales

### 1. **Imágenes en Grisaceo hasta Hover**
- [ ] **Archivo**: `src/components/NavigationCarousel.css`
- [ ] **Cambio**: Agregar filtro gris a las imágenes por defecto
- [ ] **Implementación**: 
  ```css
  .nav-image img {
    filter: grayscale(100%);
    transition: filter 0.3s ease;
  }
  
  .nav-image:hover img {
    filter: grayscale(0%);
  }
  ```
- [ ] **Estado**: Pendiente

### 2. **Desactivar Autoplay del Carrusel**
- [ ] **Archivo**: `src/components/NavigationCarousel.jsx`
- [ ] **Cambio**: Remover o desactivar el autoplay
- [ ] **Implementación**:
  ```javascript
  // Remover esta línea:
  autoplay={{
    delay: 5000,
    disableOnInteraction: false,
  }}
  ```
- [ ] **Estado**: Pendiente

### 3. **Zoom en Hover de Imágenes**
- [ ] **Archivo**: `src/components/NavigationCarousel.css`
- [ ] **Cambio**: Mejorar el efecto de zoom en hover
- [ ] **Implementación**:
  ```css
  .nav-image:hover img {
    transform: scale(1.1);
    filter: grayscale(0%);
  }
  ```
- [ ] **Estado**: Pendiente

## 🏗️ Nueva Página de Diseños

### 4. **Crear Página de Detalles de Proyectos**
- [ ] **Archivo**: `src/pages/ProjectDetails.jsx`
- [ ] **Funcionalidades**:
  - [ ] Galería de imágenes del proyecto
  - [ ] Descripción detallada
  - [ ] Información técnica
  - [ ] Proceso de diseño
  - [ ] Navegación entre proyectos
- [ ] **Estado**: Pendiente

### 5. **Configurar React Router**
- [ ] **Instalación**: `npm install react-router-dom`
- [ ] **Archivo**: `src/App.jsx`
- [ ] **Rutas**:
  - [ ] `/` - Página principal
  - [ ] `/project/:id` - Página de detalles
- [ ] **Estado**: Pendiente

### 6. **Componente de Navegación**
- [ ] **Archivo**: `src/components/ProjectDetails.jsx`
- [ ] **Funcionalidades**:
  - [ ] Carrusel de imágenes del proyecto
  - [ ] Información del proyecto
  - [ ] Botón de regreso
  - [ ] Navegación entre proyectos
- [ ] **Estado**: Pendiente

### 7. **Datos de Proyectos**
- [ ] **Archivo**: `src/data/projects.js`
- [ ] **Estructura**:
  ```javascript
  export const projects = [
    {
      id: 1,
      title: "PLANNING SOLUTION",
      description: "Descripción detallada...",
      images: ["url1", "url2", "url3"],
      category: "planning",
      details: {
        client: "Cliente XYZ",
        location: "Madrid, España",
        year: "2023",
        area: "150m²"
      }
    }
  ]
  ```
- [ ] **Estado**: Pendiente

## 🔗 Integración

### 8. **Conectar Carrusel con Páginas de Detalles**
- [ ] **Archivo**: `src/components/NavigationCarousel.jsx`
- [ ] **Cambio**: Agregar navegación a páginas de detalles
- [ ] **Implementación**:
  ```javascript
  const handleCategoryClick = (category) => {
    navigate(`/project/${category.id}`);
  };
  ```
- [ ] **Estado**: Pendiente

### 9. **Estilos para Página de Detalles**
- [ ] **Archivo**: `src/pages/ProjectDetails.css`
- [ ] **Estilos**:
  - [ ] Layout responsivo
  - [ ] Galería de imágenes
  - [ ] Tipografía consistente
  - [ ] Animaciones de entrada
- [ ] **Estado**: Pendiente

## 📱 Responsive Design

### 10. **Optimizar para Móviles**
- [ ] **Página de Detalles**: Asegurar que funcione bien en móviles
- [ ] **Galería**: Carrusel táctil para móviles
- [ ] **Navegación**: Menú hamburguesa si es necesario
- [ ] **Estado**: Pendiente

## 🎯 Prioridades

### **Alta Prioridad** (Implementar primero):
1. ✅ Imágenes en grisaceo hasta hover
2. ✅ Desactivar autoplay del carrusel
3. ✅ Zoom en hover de imágenes

### **Media Prioridad** (Implementar después):
4. ✅ Crear página de detalles de proyectos
5. ✅ Configurar React Router
6. ✅ Conectar navegación

### **Baja Prioridad** (Implementar al final):
7. ✅ Optimizaciones de rendimiento
8. ✅ Mejoras de UX adicionales

## 📝 Notas de Implementación

### **Orden Sugerido**:
1. **Empezar con las mejoras visuales** (1-3)
2. **Instalar React Router** (5)
3. **Crear datos de proyectos** (7)
4. **Crear página de detalles** (4, 6, 9)
5. **Conectar navegación** (8)
6. **Optimizar responsive** (10)

### **Archivos a Modificar**:
- `src/components/NavigationCarousel.jsx`
- `src/components/NavigationCarousel.css`
- `src/App.jsx` (para rutas)
- `src/pages/ProjectDetails.jsx` (nuevo)
- `src/pages/ProjectDetails.css` (nuevo)
- `src/data/projects.js` (nuevo)

### **Dependencias a Instalar**:
- `react-router-dom` para navegación

---

**Última actualización**: $(date)
**Estado general**: 🚧 En progreso 