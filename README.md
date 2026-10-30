# Barceló Digital Ventures

> **Ideas Beyond Tomorrow**  
> Soluciones digitales de alto impacto potenciadas con inteligencia artificial, arquitectura cloud y diseño de vanguardia.

---

## 🏛 Arquitectura del Repositorio (Monorepo)

Este repositorio está estructurado como un monorepo modular organizado en aplicaciones (`apps/`) y paquetes compartidos (`packages/`):

```text
barcelo-digital-ventures/
│
├── apps/
│   ├── frontend/                  # Aplicación Web SPA (React + Vite + Tailwind CSS)
│   │   ├── public/
│   │   │   └── assets/            # Identidad gráfica oficial, logos transparentes y medios
│   │   ├── src/
│   │   │   ├── components/        # Componentes UI reutilizables (Hero, Header, Services, etc.)
│   │   │   ├── pages/             # Vistas principales (HomePage)
│   │   │   ├── styles/            # Estilos globales y configuración Tailwind
│   │   │   ├── App.tsx            # Componente raíz con orquestación de intro y contextos
│   │   │   └── main.tsx           # Punto de entrada del cliente React
│   │   ├── index.html             # Entry point HTML optimizado con meta tags y SEO
│   │   ├── package.json           # Dependencias y scripts del frontend (@bdv/frontend)
│   │   ├── tsconfig.json          # Configuración TypeScript del frontend
│   │   └── vite.config.ts         # Configuración del bundler Vite
│   │
│   └── backend/                   # API Serverless en el Edge (Cloudflare Workers)
│       ├── src/
│       │   ├── index.ts           # Handler principal y enrutador de peticiones
│       │   ├── routes/            # Controladores de rutas (contact, health, leads)
│       │   ├── services/          # Lógica de negocio (EmailService, LeadsService, AIService)
│       │   └── utils/             # Utilidades compartidas (CORS, JSON response, validación)
│       ├── package.json           # Dependencias y scripts del backend (@bdv/backend)
│       ├── tsconfig.json          # Configuración TypeScript para Workers
│       └── wrangler.jsonc         # Configuración de despliegue Cloudflare Wrangler
│
├── packages/
│   └── shared/                    # Tipos, constantes y modelos compartidos
│       └── src/
│           ├── constants/         # Identidad de marca (BDV_BRAND), colores, enlaces
│           ├── types/             # Modelos de datos (ContactInquiry, ApiResponse, Services)
│           └── index.ts           # Punto de exportación centralizado (@bdv/shared)
│
├── .gitignore                     # Reglas de exclusión de Git
├── package.json                   # Configuración del monorepo (workspaces) y scripts raíz
├── package-lock.json              # Bloqueo determinista de dependencias
└── README.md                      # Documentación completa del proyecto
```

---

## 🚀 Tecnologías

| Dominio | Tecnologías |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion), Vite, Lucide Icons |
| **Backend** | Cloudflare Workers, TypeScript, Wrangler |
| **Shared** | TypeScript Types & Interfaces, Brand Constants |
| **Herramientas** | NPM Workspaces, ESLint, Prettier |

---

## 🛠 Requisitos Previos

- **Node.js** >= 20.x
- **NPM** >= 10.x
- (Opcional) **Wrangler CLI** para despliegues del backend: `npm i -g wrangler`

---

## 💻 Desarrollo Local

### 1. Instalación de dependencias

Instala todas las dependencias del monorepo desde la raíz:

```bash
npm install
```

### 2. Iniciar el servidor de desarrollo (Frontend)

Inicia la aplicación frontend en el puerto local predeterminado:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### 3. Iniciar el entorno de desarrollo del Backend (Cloudflare Workers)

Para levantar el emulador de Cloudflare Workers localmente:

```bash
npm run dev:backend
# o directamente en apps/backend:
cd apps/backend && npm run dev
```

---

## 📦 Compilación y Control de Calidad

| Comando | Acción |
| :--- | :--- |
| `npm run build` | Compila el frontend para producción en `apps/frontend/dist` |
| `npm run build:backend` | Valida y compila los tipos del backend de Cloudflare Workers |
| `npm run lint` | Ejecuta la verificación estática de TypeScript en todos los paquetes |
| `npm run preview` | Previsualiza la versión compilada para producción |

---

## 🌐 Guía de Despliegue

### Frontend (`apps/frontend`)
Puede desplegarse en **Cloudflare Pages**, **Vercel** o **Netlify**:
- **Build command:** `npm run build` o `vite build`
- **Output directory:** `apps/frontend/dist`
- **Root directory:** `apps/frontend`

### Backend (`apps/backend`)
Despliegue directo en la red Edge global de Cloudflare:
```bash
cd apps/backend
npx wrangler deploy
```

---

## 📄 Licencia

Derechos reservados © 2026 Barceló Digital Ventures.
*Ideas Beyond Tomorrow.*
