# Overview

This is a full-stack web application for DOMREALCE, a Portuguese visual communication and digital printing company. The application serves as a company portfolio and business website showcasing services like digital printing, vinyl cutting, vehicle wrapping, and custom signage. Built with a modern tech stack including React, Express, TypeScript, and PostgreSQL, it follows a monorepo structure with separate client and server directories.

## Recent Changes (August 2025)
- **Service Detail Pages**: Created 7 comprehensive service detail pages with professional layouts:
  - Design Gráfico (/servico-design-grafico)
  - Impressão Digital (/servico-impressao-digital)
  - Papel de Parede (/servico-papel-parede) 
  - Telas Artísticas (/servico-telas-artisticas)
  - Autocolantes (/servico-autocolantes)
  - Decoração de Viaturas (/servico-decoracao-viaturas)
  - Espaços Comerciais (/servico-espacos-comerciais)
- **Enhanced Service Pages**: Each detail page includes hero sections, feature grids, process workflows, specifications, and call-to-action sections
- **Navigation Integration**: All "Ver Mais" buttons in services page now link to corresponding detail pages
- **Routing Updates**: Added complete routing system for all service pages in App.tsx
- **Consistent Design**: Maintained brand color scheme and professional styling across all service pages
- **Contact Integration**: All service pages include direct links to contact form with WhatsApp integration

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible components
- **Styling**: Tailwind CSS with custom design tokens for DOMREALCE brand colors (yellow, turquoise, blue, coral)
- **Build Tool**: Vite with custom configuration for development and production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage Layer**: Abstracted storage interface with in-memory implementation (MemStorage) for development
- **API Structure**: RESTful API with `/api` prefix for all endpoints
- **Development Server**: Custom Vite integration for seamless full-stack development

## Database Design
- **Database**: PostgreSQL (configured via Drizzle)
- **Schema**: User management with UUID primary keys, username/password authentication
- **Migrations**: Drizzle Kit for database schema management and migrations
- **Connection**: Neon Database serverless connection for production

## Styling and Design System
- **CSS Framework**: Tailwind CSS with custom configuration
- **Component System**: shadcn/ui components built on Radix UI primitives
- **Theme**: Dark theme with custom brand color palette
- **Typography**: Inter for body text, Poppins for headings
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## Development Experience
- **Monorepo Structure**: Shared TypeScript types between client and server
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)
- **Hot Reload**: Vite HMR for client-side development
- **Error Handling**: Runtime error overlay for development debugging
- **Code Quality**: TypeScript strict mode for type safety

## Security and Authentication
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)
- **Password Handling**: Planned implementation for user authentication
- **CORS**: Configured for development and production environments

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **Build Tools**: Vite, TypeScript, ESBuild for production builds
- **State Management**: TanStack React Query for server state

## UI and Styling
- **Component Library**: Radix UI primitives (40+ components for dialogs, forms, navigation, etc.)
- **CSS Framework**: Tailwind CSS with PostCSS and Autoprefixer
- **Utility Libraries**: clsx, tailwind-merge for conditional styling
- **Icons**: Lucide React for consistent iconography

## Backend and Database
- **Database**: Neon Database (PostgreSQL serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for runtime type validation and schema generation
- **Session Store**: connect-pg-simple for PostgreSQL session storage

## Development Tools
- **Replit Integration**: Cartographer for code navigation, runtime error modal
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Date Handling**: date-fns for date manipulation
- **Carousel**: Embla Carousel for image/content sliders

## Production Services
- **Database Hosting**: Neon Database (serverless PostgreSQL)
- **Environment Variables**: DATABASE_URL for database connection
- **Asset Hosting**: Static assets served from Express in production