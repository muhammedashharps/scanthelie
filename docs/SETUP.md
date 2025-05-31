# Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- A Firebase account
- A Google Cloud account (for Gemini AI API)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/muhammedashharps/scanthelie.git
cd scanthelie
```

2. Install dependencies:
```bash
npm install
```

3. Environment Setup:
   
Create a `.env` file in the root directory with the following variables:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication with Google Sign-in
4. Create a Cloud Firestore database
5. Set up Storage for image uploads
6. Get your Firebase configuration from Project Settings

## Gemini AI Setup

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Gemini AI API
4. Create API credentials
5. Copy the API key to your environment variables

## Development

Run the development server:
```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

## Deployment

The project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy! 