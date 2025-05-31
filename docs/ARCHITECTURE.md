# Technical Architecture

## Overview

ScanTheLie is built using a modern web stack with React and Firebase, incorporating AI capabilities through Google's Gemini AI. The application follows a component-based architecture with clear separation of concerns.

## Tech Stack

### Frontend
- **React 18.3.1**: Core UI framework
- **TypeScript 5.5.0**: Type safety and developer experience
- **Vite 5.4.2**: Build tool and development server
- **TailwindCSS 3.4.1**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Router DOM**: Client-side routing
- **Recharts**: Data visualization

### Backend Services
- **Firebase**: Backend-as-a-Service
  - Authentication
  - Cloud Firestore
  - Cloud Storage
- **Gemini AI**: AI/ML capabilities

## Component Architecture

```mermaid
graph TD
    A[App Component] --> B[Layout Component]
    B --> C[Navigation]
    B --> D[Main Content]
    B --> E[Footer]
    
    D --> F[Home Page]
    D --> G[Scan Page]
    D --> H[Results Page]
    D --> I[History Page]
    D --> J[Settings Page]
    
    G --> K[Image Uploader]
    H --> L[Analysis Components]
    
    L --> M[HealthScore]
    L --> N[IngredientTree]
    L --> O[ClaimVerifier]
    L --> P[ChatBot]
```

## State Management

### Context API
- **AuthContext**: Manages authentication state
- **AppContext**: Manages application-wide state
  - API key management
  - Scan history
  - User preferences
  - Loading states

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant Context
    participant Firebase
    participant GeminiAI

    User->>UI: Interacts
    UI->>Context: Updates State
    Context->>Firebase: Persists Data
    UI->>GeminiAI: Requests Analysis
    GeminiAI->>Context: Returns Results
    Context->>UI: Updates View
```

## Security

1. **Authentication**
   - Google Sign-in
   - Protected routes
   - Session management

2. **Data Protection**
   - Environment variables
   - Firebase security rules
   - API key protection

## AI Integration

### Gemini AI Features
1. Label Analysis
   - Text extraction
   - Ingredient analysis
   - Claim verification

2. Interactive Chatbot
   - Context-aware responses
   - Product-specific knowledge
   - Health insights

## Performance Optimization

1. **Code Splitting**
   - Route-based splitting
   - Component lazy loading

2. **Asset Optimization**
   - Image compression
   - Lazy loading
   - CDN delivery

3. **State Management**
   - Memoization
   - Efficient context usage
   - Optimized re-renders 