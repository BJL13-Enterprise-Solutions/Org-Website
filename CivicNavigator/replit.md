# BJL13 Enterprise Solutions - AI Public Access System

## Overview

This is a full-stack web application serving as an AI-augmented digital public worker for civic navigation and mutual aid. The system helps users understand bureaucratic documents, navigate government processes, and connect with local resources, particularly in the Kansas City area.

## User Preferences

Preferred communication style: Simple, everyday language.
Design approach: Human-centered, warm language that builds trust with people who may be distrustful of systems or have limited technology literacy.
Branding: Use "Community Solutions" in header for approachable feel, but maintain "BJL13 Enterprise Solutions, LLC" in footer for legal/grant requirements.
Privacy: Optional login for AI memory features - anonymous use by default to protect sensitive information.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **State Management**: React Query (TanStack Query) for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **API Design**: RESTful endpoints with JSON responses
- **Error Handling**: Centralized error middleware with structured error responses
- **Logging**: Custom request/response logging middleware

### Data Storage Solutions
- **Database**: PostgreSQL using Neon serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **Migrations**: Drizzle Kit for schema management
- **Session Storage**: PostgreSQL with connect-pg-simple for session persistence
- **Fallback Storage**: In-memory storage implementation for development/testing

## Key Components

### Core Data Models
- **Users**: Optional user accounts with AI memory preferences (Replit Auth integration)
- **Sessions**: Secure session storage for authentication
- **Conversations**: Track user sessions and conversation history (can be linked to users or anonymous)
- **Messages**: Store individual chat messages with role-based typing (user/assistant)
- **Local Services**: Database of Kansas City area service providers (notaries, legal aid, healthcare)
- **Documents**: RAG document database for civic information (forms, guides, legal resources)

### Frontend Components
- **ConversationInterface**: Main chat interface for user-AI interactions
- **QuickActions**: Pre-defined action buttons for common use cases
- **LocalServices**: Display and interaction with local service providers
- **ResourceLinks**: Emergency contacts and local organization information
- **TrustBanner**: Transparency messaging about AI limitations

### Backend Services
- **Storage Interface**: Abstracted storage layer supporting both database and in-memory implementations
- **Route Handlers**: RESTful API endpoints for conversations, messages, and local services
- **Middleware**: Request logging, error handling, and development tooling

## Data Flow

1. **User Interaction**: Users can interact anonymously or log in for personalized features
2. **Privacy by Default**: Anonymous sessions protect sensitive information unless users opt-in
3. **Session Management**: Each user gets a unique session ID for conversation tracking
4. **Message Processing**: User messages are stored and trigger AI response generation
5. **RAG Integration**: System searches document database for relevant civic information
6. **Local Service Integration**: System can recommend local Kansas City services based on user needs
7. **Response Delivery**: AI responses with document references and local service recommendations

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL database connectivity
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database operations
- **wouter**: Lightweight routing
- **express**: Node.js web framework

### UI/UX Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Dependencies
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React application to `dist/public`
2. **Backend**: esbuild bundles Node.js server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: Uses tsx for hot reloading and Vite dev server
- **Production**: Serves static files from Express with optimized bundles
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Hosting Considerations
- Application designed for deployment on platforms supporting Node.js
- Uses PostgreSQL database (Neon serverless recommended)
- Requires environment variable configuration for database connectivity
- Static assets served through Express in production

### Monitoring and Logging
- Request/response logging with performance metrics
- Structured error handling with status codes
- Development-specific tooling (Replit integration, error overlays)

## Key Architectural Decisions

### Database Choice
**Decision**: PostgreSQL with Drizzle ORM
**Rationale**: Type safety, better tooling, and serverless scaling with Neon
**Trade-offs**: More complex than SQLite but provides better production scalability

### State Management
**Decision**: React Query for server state, local React state for UI
**Rationale**: Separates server state concerns from UI state, provides caching and synchronization
**Trade-offs**: Additional dependency but significantly reduces boilerplate

### UI Framework
**Decision**: Shadcn/ui with Radix UI primitives
**Rationale**: Accessible components with customizable styling
**Trade-offs**: Larger bundle size but better accessibility and design consistency

### Storage Abstraction
**Decision**: Interface-based storage with multiple implementations
**Rationale**: Allows for easy testing and development without requiring database
**Trade-offs**: Additional complexity but improved development experience