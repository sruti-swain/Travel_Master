# Wanderlust Travel Website

## Overview

This is a full-stack travel website built with React (frontend) and Express.js (backend). The application showcases travel destinations, features testimonials, and provides a modern, responsive user interface for browsing travel packages. It uses PostgreSQL for data storage with Drizzle ORM for database operations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Custom components built with Radix UI primitives (shadcn/ui)
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: AOS (Animate On Scroll) library for scroll-triggered animations

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Validation**: Zod for runtime type checking
- **Development**: Hot reload with tsx for TypeScript execution

### Build System
- **Monorepo Structure**: Shared types and schemas between client and server
- **Development**: Concurrent client/server development with Vite proxy
- **Production**: Static client build served by Express server
- **Bundling**: ESBuild for server-side bundling

## Key Components

### Data Models
- **Users**: Basic user authentication schema
- **Destinations**: Travel destinations with pricing, ratings, and descriptions
- **Testimonials**: Customer reviews with ratings and avatars
- **Newsletter**: Email subscription management

### Frontend Components
- **Hero Section**: Video background with search widget
- **Destinations**: Dynamic destination cards with data from API
- **Features**: Service highlights (pricing, support, packages, guides)
- **Statistics**: Animated counters showing company metrics
- **Testimonials**: Swiper.js carousel for customer reviews
- **Gallery**: Image gallery with lightbox functionality
- **Newsletter**: Email subscription form
- **Floating Keywords**: Animated background elements

### API Endpoints
- `GET /api/destinations` - Fetch all destinations
- `GET /api/destinations/:id` - Fetch specific destination
- `POST /api/destinations` - Create new destination
- `GET /api/testimonials` - Fetch testimonials
- `POST /api/testimonials` - Create testimonial
- `POST /api/newsletter` - Newsletter subscription

## Data Flow

1. **Client Request**: React components use TanStack Query to fetch data
2. **API Layer**: Express.js routes handle HTTP requests
3. **Data Access**: Storage layer abstracts database operations
4. **Database**: PostgreSQL stores persistent data via Drizzle ORM
5. **Response**: JSON data flows back through the stack to update UI

The application uses a RESTful API design with proper error handling and validation at each layer.

## External Dependencies

### Frontend Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **TanStack Query**: Server state management
- **Wouter**: Lightweight routing
- **AOS**: Scroll animations
- **Swiper.js**: Touch slider/carousel
- **Bootstrap**: CSS framework for responsive design
- **Font Awesome**: Icon library

### Backend Libraries
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Schema validation
- **Neon Database**: Serverless PostgreSQL provider

### External Services
- **Unsplash**: Image hosting for destination photos
- **Google Fonts**: Web fonts (Inter, Poppins)
- **CDN Resources**: Bootstrap, Font Awesome, AOS via CDN

## Deployment Strategy

### Development
- **Environment**: Replit with Node.js 20, Web, and PostgreSQL modules
- **Hot Reload**: Vite dev server with HMR for frontend changes
- **Database**: Automatic PostgreSQL provisioning via Replit

### Production Build
- **Client**: Vite builds optimized static assets to `dist/public`
- **Server**: ESBuild bundles TypeScript server code to `dist/index.js`
- **Database**: Drizzle migrations handle schema changes
- **Hosting**: Replit autoscale deployment on port 80

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment flag for development/production builds
- **Static Serving**: Express serves built React app in production

## Changelog

```
Changelog:
- June 19, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```