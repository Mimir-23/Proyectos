# 🔥 Upnext

Una aplicación web moderna para descubrir juegos populares y tendencias del momento, construida con React, Vite y Tailwind CSS.

## ✨ Características

- **🎮 Exploración de juegos populares** - Descubre los juegos más valorados
- **✨ Lanzamientos recientes** - Mantente al día con los últimos lanzamientos
- **🏷️ Búsqueda por géneros** - Explora juegos por categoría con imágenes de fondo
- **🔍 Búsqueda avanzada** - Encuentra juegos específicos con filtros inteligentes y sugerencias
- **📄 Paginación minimalista** - Navegación ultra-responsive y optimizada para móviles
- **🎛️ Filtros avanzados** - Filtra por plataforma, género, puntuación, año y más
- **📱 100% Responsive** - Diseño adaptable optimizado para todos los dispositivos
- **🌙 Modo oscuro/claro** - Cambia entre temas según tu preferencia
- **⚡ Rendimiento optimizado** - Carga rápida con lazy loading y scroll automático
- **🎨 Animaciones fluidas** - Transiciones suaves con Framer Motion
- **🔄 Scroll automático** - Navegación que siempre inicia desde el top
- **💾 Historial de búsquedas** - Guarda automáticamente tus búsquedas recientes
- **🎯 Sugerencias inteligentes** - Autocompletado en tiempo real
- **🎮 Detalles completos** - Información exhaustiva de cada juego con plataformas y capturas

## 🛠️ Tecnologías

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Navegación**: React Router DOM
- **API**: RAWG.io Games Database
- **HTTP Client**: Axios
- **Iconos**: React Icons

## 🚀 Instalación y Configuración

### Prerequisitos

- Node.js 18+
- npm o yarn

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd upnext
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```
   
   Obtén tu API key gratuita de [RAWG.io](https://rawg.io/apidocs) y actualiza el archivo `.env`:
   ```env
   VITE_RAWG_API_KEY=tu-api-key-aqui
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador** en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── 📁 components/
│   ├── ui/                    # Componentes UI reutilizables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Spinner.jsx
│   │   ├── Pagination.jsx     # 📄 Componente de paginación minimalista
│   │   └── ToggleSwitch.jsx
│   ├── layout/                # Componentes de layout
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Container.jsx
│   │   └── ScrollToTop.jsx    # 🔄 Componente scroll automático
│   ├── games/                 # Componentes específicos de juegos
│   │   ├── GameCard.jsx
│   │   ├── GameGrid.jsx
│   │   └── GameCarousel.jsx
│   └── utils/                 # Componentes utilitarios
│       └── ScrollToTop.jsx
├── 📁 pages/                  # Páginas de la aplicación
│   ├── Home.jsx
│   ├── Popular.jsx
│   ├── NewReleases.jsx
│   ├── Genres.jsx
│   ├── Search.jsx
│   └── GameDetails.jsx
├── 📁 hooks/                  # Hooks personalizados
│   ├── useFetchGames.js
│   ├── useDarkMode.js
│   └── useInfiniteScroll.js
├── 📁 context/                # Contextos de React
│   └── ThemeContext.jsx
├── 📁 services/               # Servicios API
│   └── rawgService.js
├── 📁 utils/                  # Utilidades
│   ├── formatDate.js
│   ├── formatPlatforms.js
│   └── helpers.js
└── 📁 styles/                 # Estilos
    └── globals.css
```

## 📄 Funcionalidad de Carpetas y Archivos

### **📁 src/components/** (Componentes reutilizables)

#### **📁 ui/** - Componentes básicos de interfaz
- **`Button.jsx`**: Botón reutilizable con diferentes variantes (primario, secundario, etc.)
- **`Card.jsx`**: Tarjeta base para mostrar contenido con bordes y sombras
- **`Spinner.jsx`**: Indicador de carga animado para cuando se cargan datos
- **`Pagination.jsx`**: 📄 Componente de paginación minimalista y ultra-responsive
- **`ToggleSwitch.jsx`**: Interruptor para cambiar entre modo claro/oscuro

#### **📁 layout/** - Estructura de páginas
- **`Navbar.jsx`**: Barra de navegación superior con logo, menú y toggle de tema
- **`Footer.jsx`**: Pie de página profesional con tecnologías utilizadas, enlaces sociales y información del desarrollador
- **`Container.jsx`**: Contenedor responsivo que envuelve el contenido principal
- **`ScrollToTop.jsx`**: Componente que hace scroll automático al inicio al cambiar de página

#### **📁 games/** - Componentes específicos para juegos
- **`GameCard.jsx`**: Tarjeta individual de juego (imagen, título, rating, plataformas)
- **`GameGrid.jsx`**: Grilla responsiva que organiza múltiples GameCard
- **`GameCarousel.jsx`**: Carrusel horizontal para mostrar juegos destacados

#### **📁 utils/** - Componentes utilitarios
- **`ScrollToTop.jsx`**: 🔄 Componente para scroll automático al cambiar rutas

### **📁 src/pages/** - Páginas principales del sitio
- **`Home.jsx`**: Página de inicio con hero section y juegos populares
- **`Popular.jsx`**: Lista completa de juegos populares con filtros y paginación
- **`NewReleases.jsx`**: Últimos lanzamientos ordenados por fecha con paginación
- **`Genres.jsx`**: Exploración de juegos por categorías con imágenes de fondo y paginación
- **`Search.jsx`**: Búsqueda avanzada en tiempo real con filtros inteligentes
- **`GameDetails.jsx`**: Página de detalle individual de cada juego con información completa

### **📁 src/hooks/** - Lógica reutilizable
- **`useFetchGames.js`**: Hook personalizado para obtener datos de juegos de la API
- **`useDarkMode.js`**: Hook para manejar el cambio entre modo claro/oscuro
- **`useInfiniteScroll.js`**: Hook para cargar más contenido al hacer scroll

### **📁 src/context/** - Estado global
- **`ThemeContext.jsx`**: Context API para manejar el tema (claro/oscuro) en toda la app

### **📁 src/services/** - Comunicación con APIs
- **`rawgService.js`**: Todas las funciones para comunicarse con la API de RAWG:
  - `getPopularGames()`: Obtiene juegos populares ordenados por rating
  - `getNewReleases()`: Obtiene lanzamientos recientes (últimos 2 meses)
  - `getGamesByGenre()`: Filtra juegos por género específico
  - `searchGames()`: Busca juegos por nombre/palabra clave
  - `getGameDetails()`: Obtiene información detallada de un juego
  - `getGameScreenshots()`: Obtiene capturas de pantalla de un juego
  - `getGenres()`: Lista todos los géneros disponibles
  - `getPlatforms()`: Lista todas las plataformas disponibles

### **📁 src/utils/** - Funciones auxiliares
- **`formatDate.js`**: Formatea fechas para mostrar de manera legible
- **`formatPlatforms.js`**: Convierte datos de plataformas en texto legible
- **`helpers.js`**: Funciones utilitarias generales (validaciones, conversiones, etc.)

## 📄 Páginas Disponibles

- **🏠 Home** (`/`) - Página principal con juegos destacados y carruseles
- **🔥 Populares** (`/popular`) - Lista de juegos populares con filtros avanzados y paginación minimalista
- **✨ Lanzamientos** (`/new-releases`) - Juegos recién lanzados con filtros de fecha y paginación
- **🏷️ Géneros** (`/genres`) - Exploración por categorías con imágenes de fondo y paginación
- **🔍 Búsqueda** (`/search`) - Búsqueda avanzada con filtros inteligentes, sugerencias y historial
- **📖 Detalles** (`/games/:id`) - Información detallada del juego con plataformas, capturas y carrusel de similares

## 📄 Sistema de Paginación

El proyecto incluye un componente de paginación **ultra-minimalista** y **100% responsive** implementado en las principales páginas de listado:

### 🎯 Características de la Paginación

- **� Mobile-First Design**: Optimizada para dispositivos táctiles
- **🎨 Diseño minimalista**: Sin bordes, sombras o elementos decorativos innecesarios
- **⚡ Ultra-responsive**: Adaptación inteligente desde 320px hasta pantallas 4K
- **🔄 Navegación intuitiva**: Botones de anterior/siguiente y páginas directas
- **� Información contextual**: Muestra resultados de forma inteligente según el dispositivo
- **♿ Completamente accesible**: Aria labels y soporte para lectores de pantalla
- **� Animaciones suaves**: Transiciones de 200ms para mejor UX

### 📱 Adaptaciones Responsive

#### **💻 Desktop (≥640px)**
- Información completa: "1-20 de 1,234 resultados"
- Botones de 36px para mejor clicking con mouse
- Muestra ±2 páginas alrededor de la actual
- Layout horizontal optimizado

#### **📱 Mobile (<640px)**
- Información condensada: "Página 1 de 62"
- Botones de 32px optimizados para dedos
- Muestra ±1 página alrededor de la actual
- Indicador de carga visible cuando aplica

### 📋 Páginas con Paginación

| Página | Elementos/página | Filtros disponibles | Características especiales |
|--------|------------------|---------------------|---------------------------|
| **🔥 Populares** | 20 juegos | Plataforma, Género, Puntuación, Búsqueda | Orden por rating |
| **✨ Lanzamientos** | 20 juegos | Plataforma, Género, Puntuación, Fecha, Búsqueda | Filtros de fecha |
| **🏷️ Géneros** | 20 juegos | Plataforma, Puntuación, Búsqueda | Filtro por género |
| **🔍 Búsqueda** | 20 juegos | Todos los filtros avanzados | Paginación dinámica |

### 🛠️ Funcionalidades Técnicas

- **Reset automático**: Al cambiar filtros, regresa automáticamente a la página 1
- **Scroll automático**: Al cambiar página, hace scroll suave hacia arriba automáticamente
- **Estado de carga**: Muestra indicadores visuales durante la carga
- **Manejo de errores**: Control de errores en la navegación
- **Algoritmo inteligente**: Evita duplicados y optimiza páginas visibles
- **Persistencia de estado**: Mantiene filtros activos durante la navegación
- **Detección de viewport**: Adapta la UI según el tamaño de pantalla disponible

### 🎨 Componente Pagination

El componente `Pagination.jsx` es completamente reutilizable y minimalista:

```jsx
<Pagination
  currentPage={1}           // Página actual
  totalPages={10}          // Total de páginas
  onPageChange={handlePage} // Función para cambiar página
  totalCount={200}         // Total de resultados
  pageSize={20}           // Elementos por página
  loading={false}         // Estado de carga
/>
```

**Ventajas del diseño minimalista:**
- ✅ **50% menos espacio vertical** ocupado
- ✅ **Mejor UX en móviles** con controles táctiles optimizados
- ✅ **Carga más rápida** sin elementos decorativos pesados
- ✅ **Accesible** con soporte completo para lectores de pantalla
- ✅ **Visualmente limpio** y profesional

## 🔍 Sistema de Búsqueda Avanzada

La página de búsqueda incluye funcionalidades avanzadas para una experiencia de descubrimiento superior:

### 🎯 Características de Búsqueda

- **🔄 Búsqueda en tiempo real** con debounce de 500ms
- **💡 Sugerencias inteligentes** basadas en la API de RAWG
- **📜 Historial de búsquedas** guardado en localStorage (últimas 5)
- **🎛️ Filtros avanzados** expandibles y colapsables
- **🏷️ Búsquedas populares** con indicadores de trending
- **📱 100% responsive** con UX optimizada para móvil

### 🎛️ Filtros Disponibles

| Filtro | Opciones | Descripción |
|--------|----------|-------------|
| **Ordenamiento** | Relevancia, Rating, Fecha, Popularidad, Alfabético | Control del orden de resultados |
| **Género** | 16 géneros diferentes | Acción, RPG, Estrategia, Indie, etc. |
| **Plataforma** | PC, PlayStation, Xbox, Nintendo, Mobile | Filtro por ecosistema |
| **Puntuación** | 3.0+, 3.5+, 4.0+, 4.5+ | Rating mínimo con estrellas |
| **Año** | 2018-2024 | Año de lanzamiento |

### 🎨 UX Mejorada

- **Autocompletado inteligente** mientras escribes
- **Búsquedas recientes** fácilmente accesibles
- **Filtros activos** mostrados como badges de colores
- **Estados de carga** con spinners informativos
- **Resultados vacíos** con sugerencias útiles
- **Scroll automático** a resultados tras filtrar

## 🎨 Branding y Diseño

### 🖼️ Identidad Visual
- **Nombre**: **Upnext** - "Descubre qué sigue en tu lista gaming"
- **Logo**: `logoup.png` - Favicon personalizado optimizado
- **Concepto**: Enfoque en próximos juegos y tendencias gaming

### 🎨 Paleta de Colores

- **🟣 Primario**: `#825EE4` (Morado neón) - Color principal de la marca
- **🟡 Secundario**: `#FFD700` (Dorado luminoso) - Acentos y elementos destacados
- **⚪ Modo claro**: `#FAFAFA` (Fondo) / `#111111` (Texto)
- **⚫ Modo oscuro**: `#181818` (Fondo) / `#FFFFFF` (Texto)

### 🎭 Elementos Visuales
- **Gradientes sutiles** en fondos y secciones principales
- **Animaciones gaming** en footer con líneas animadas
- **Iconografía gaming** con controladores y elementos temáticos
- **Efectos glassmorphism** en componentes destacados

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting con ESLint
```

## 🌐 API

Este proyecto utiliza la [RAWG Video Games Database API](https://rawg.io/apidocs) que proporciona:

- Información detallada de juegos
- Capturas de pantalla
- Calificaciones y reseñas
- Datos de plataformas y géneros
- Búsqueda avanzada

## 📱 Características Responsive

- **📱 Mobile**: Diseño optimizado para smartphones
- **📟 Tablet**: Layout adaptado para tablets
- **💻 Desktop**: Experiencia completa en escritorio
- **🖥️ Large screens**: Aprovechamiento de pantallas grandes

## 🔄 Flujo de Funcionamiento

1. **Usuario accede al sitio** → `index.html` carga `main.jsx` con favicon personalizado
2. **App.jsx** inicializa el contexto de tema, ScrollToTop y renderiza las páginas
3. **ScrollToTop** automáticamente lleva al usuario al inicio en cada navegación
4. **Navbar** permite navegación fluida entre secciones con logo Upnext
5. **Páginas** usan `rawgService.js` para obtener datos de la API con filtros avanzados
6. **Componentes de juegos** muestran información con paginación minimalista
7. **Hooks personalizados** manejan estado, efectos y navegación
8. **Utils** procesan y formatean datos para mostrar correctamente
9. **Footer profesional** muestra tecnologías, enlaces sociales y créditos

## ⚡ Optimizaciones de Rendimiento

### 🚀 Mejoras Implementadas
- **Lazy loading** de imágenes y componentes
- **Debounce en búsquedas** (500ms) para reducir llamadas API
- **Paginación eficiente** con carga bajo demanda
- **LocalStorage** para persistir historial y preferencias
- **Scroll automático** optimizado sin bloqueo de UI
- **Componentes minimalistas** para reducir bundle size
- **Animaciones hardware-accelerated** con Framer Motion

### 📱 Responsive Optimizations
- **Mobile-first approach** en todos los componentes
- **Touch-friendly interfaces** con botones de tamaño adecuado
- **Adaptación inteligente** de contenido según viewport
- **Imágenes responsive** con srcset automático
- **Navegación táctil** optimizada para una mano

## 🎯 Próximas Funcionalidades

- [ ] **PWA (Progressive Web App)** - Instalación como app nativa
- [ ] **Sistema de favoritos** - Guardar juegos favoritos en localStorage
- [ ] **Reseñas de usuarios** - Sistema de comentarios y ratings
- [ ] **Comparación de juegos** - Comparar características lado a lado
- [ ] **Lista de deseos** - Wishlist personalizada con notificaciones
- [ ] **Integración con redes sociales** - Compartir descubrimientos
- [ ] **Modo offline** - Caché de contenido para navegación sin internet
- [ ] **Filtros guardados** - Presets de búsqueda personalizados
- [ ] **Notificaciones push** - Alertas de nuevos lanzamientos
- [ ] **Tema personalizable** - Editor de colores y estilos
- [ ] **Analytics** - Seguimiento de juegos más vistos
- [ ] **API GraphQL** - Migración para queries más eficientes

## ⚡ Configuración de Vite

Este proyecto utiliza Vite como bundler para un desarrollo rápido:

- **HMR (Hot Module Replacement)** para actualizaciones instantáneas
- **Fast Refresh** con React para preservar el estado durante el desarrollo
- **Build optimizado** para producción con tree-shaking automático

### Plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) - Usa Babel para Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) - Usa SWC para Fast Refresh

## 🔍 Configuración de ESLint

Para aplicaciones de producción, recomendamos usar TypeScript con reglas de lint con tipos. Consulta el [template de TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para información sobre cómo integrar TypeScript y [`typescript-eslint`](https://typescript-eslint.io) en tu proyecto.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🎨 Iconos con React Icons

Este proyecto utiliza **React Icons**, una librería que incluye iconos populares de múltiples librerías en un solo lugar. Los iconos se importan de manera modular para optimizar el bundle size.

### Librerías de Iconos Utilizadas

- **Font Awesome (Fa)**: Iconos principales de interfaz
- **Heroicons (Hi)**: Iconos de navegación y acciones
- **Ionicons (Io)**: Iconos de gaming y específicos
- **Material Design (Md)**: Iconos de sistema

### Ejemplos de Uso

```jsx
// Importar iconos específicos
import { FaPlay, FaStar } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoGameController } from 'react-icons/io5';

// Usar en componentes
<FaPlay className="w-4 h-4" />
<FaStar className="text-yellow-400" />
<IoGameController className="w-6 h-6 text-purple-500" />
```

### Iconos por Categoría

| Categoría | Iconos | Librería |
|-----------|--------|----------|
| Navegación | Menu, Close, Search | Heroicons (Hi) |
| Gaming | Controller, Gamepad | Ionicons (Io) |
| Interfaz | Play, Star, Calendar | Font Awesome (Fa) |
| Social | Github, Twitter, Discord | Font Awesome (Fa) |
| Tema | Sun, Moon | Heroicons (Hi) |

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Reconocimientos

- [RAWG.io](https://rawg.io) por proporcionar la API gratuita
- [Tailwind CSS](https://tailwindcss.com) por el framework de estilos
- [Framer Motion](https://framer.com/motion) por las animaciones
- [React Icons](https://react-icons.github.io/react-icons/) por la librería completa de iconos
- [Vite](https://vitejs.dev) por el excelente tooling de desarrollo

## 👨‍💻 Desarrollador

**Deivi Mesa**
- 🌐 Portfolio: [deivimesa.art](https://deivimesa.art/)
- 💼 LinkedIn: [Deivi Mesa](https://www.linkedin.com/in/deivi-mesa-3ba573186/)
- 📧 Email: deivi1817@gmail.com
- 🔗 GitHub: [Mimir-23](https://github.com/Mimir-23)

---

Hecho con ❤️ para la comunidad gaming