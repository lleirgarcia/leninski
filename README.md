# Lena Rog - Portfolio de Arquitectura de Interiores

Un portfolio moderno y responsivo para una arquitecta de interiores, construido con React y tecnologías modernas.

## 🚀 Tecnologías Utilizadas

- **React 18** - Framework principal
- **Vite** - Bundler y herramienta de desarrollo
- **Swiper.js** - Carrusel de imágenes infinito
- **Framer Motion** - Animaciones fluidas
- **React Intersection Observer** - Animaciones al hacer scroll
- **CSS3** - Estilos modernos y responsivos

## ✨ Características

### 🎨 Diseño Moderno
- Diseño minimalista y elegante
- Tipografía Helvetica Neue Light
- Gradientes y efectos visuales modernos
- Paleta de colores profesional

### 📱 Totalmente Responsivo
- Diseño adaptativo para desktop, tablet y móvil
- Breakpoints optimizados
- Navegación táctil en dispositivos móviles

### 🎠 Carrusel Avanzado
- **Swiper.js** para navegación suave
- **Navegación infinita** - puedes navegar indefinidamente
- **Autoplay** con pausa al interactuar
- **Navegación por botones** y **paginación**
- **Breakpoints responsivos** (3 slides en desktop, 2 en tablet, 1 en móvil)

### 🎭 Animaciones Fluidas
- **Framer Motion** para transiciones suaves
- **Animaciones de entrada** con Intersection Observer
- **Hover effects** en imágenes y botones
- **Animaciones de escala** al hacer click

### 🎯 Interactividad
- **Click en categorías** para navegación futura
- **Scroll suave** al footer
- **Navegación por teclado** (flechas izquierda/derecha)
- **Estados de hover** y focus

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── Hero.jsx              # Sección principal con animaciones
│   ├── Hero.css
│   ├── PortfolioOverview.jsx # Descripción del portfolio
│   ├── PortfolioOverview.css
│   ├── NavigationCarousel.jsx # Carrusel con Swiper.js
│   ├── NavigationCarousel.css
│   ├── Footer.jsx            # Información de contacto
│   └── Footer.css
├── App.jsx                   # Componente principal
├── App.css                   # Estilos globales
└── main.jsx                  # Punto de entrada
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd leninski
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

### Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción

## 🎨 Componentes Principales

### Hero Section
- **Gradiente oscuro** de fondo
- **Animaciones de entrada** escalonadas
- **Botón de contacto** con scroll suave
- **Texto centrado** con tipografía elegante

### Portfolio Overview
- **Grid responsivo** (1fr 2fr en desktop)
- **Animaciones al hacer scroll**
- **Texto descriptivo** del portfolio

### Navigation Carousel
- **Swiper.js** con navegación infinita
- **3 categorías** visibles en desktop
- **Click handlers** para navegación futura
- **Autoplay** con pausa al interactuar
- **Botones de navegación** personalizados

### Footer
- **Gradiente oscuro** que coincide con el hero
- **Información de contacto** en grid
- **Enlaces sociales** con hover effects
- **Animaciones de entrada** escalonadas

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px+ (3 slides visibles)
- **Tablet**: 768px-1023px (2 slides visibles)
- **Mobile**: <768px (1 slide visible)

### Características Responsivas
- **Tipografía escalable**
- **Espaciado adaptativo**
- **Navegación táctil** en móviles
- **Botones optimizados** para touch

## 🎯 Funcionalidades del Carrusel

### Navegación
- **Botones izquierda/derecha**
- **Flechas del teclado** (← →)
- **Paginación** con bullets
- **Navegación infinita**

### Autoplay
- **5 segundos** de delay
- **Pausa** al interactuar
- **Reanuda** automáticamente

### Interactividad
- **Click en categorías** para navegación
- **Hover effects** en imágenes
- **Scale animations** al hacer click

## 🎨 Personalización

### Colores
```css
/* Gradientes principales */
background: linear-gradient(135deg, #2a2a2a 0%, #000 100%);

/* Colores de texto */
color: #333; /* Texto principal */
color: #666; /* Texto secundario */
color: white; /* Texto sobre gradiente */
```

### Tipografía
```css
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
font-weight: 300; /* Light */
```

### Animaciones
```javascript
// Ejemplo de animación con Framer Motion
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

## 🔧 Configuración de Swiper

```javascript
<Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={30}
  slidesPerView={3}
  navigation={true}
  pagination={{ clickable: true }}
  loop={true}
  autoplay={{
    delay: 5000,
    disableOnInteraction: false,
  }}
  breakpoints={{
    320: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 3, spaceBetween: 30 }
  }}
>
```

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Servidor de Producción
```bash
npm run preview
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ para portfolios de arquitectura de interiores.

---

**¡Disfruta explorando el portfolio de Lena Rog!** 🏗️✨
