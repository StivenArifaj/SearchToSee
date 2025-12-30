# SearchToSee - Image Search Engine 🔍

A beautiful, modern image search engine powered by the Unsplash API with Firebase authentication.

## ✨ Features

- 🔍 **Search Images**: Search millions of high-quality images from Unsplash
- 🎨 **Dynamic Themes**: Toggle between light and dark modes
- ✨ **Cursor Effects**: Interactive particle trail cursor animation
- 🔐 **Authentication**: Secure user authentication with Firebase
- 📱 **Responsive Design**: Works beautifully on all devices
- 🎭 **Smooth Animations**: Scroll-triggered animations and transitions

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Unsplash API key ([Get one here](https://unsplash.com/developers))
- Firebase project ([Create one here](https://console.firebase.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/StivenArifaj/SearchToSee.git
   cd SearchToSee
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   VITE_FIREBASE_API_KEY=your_firebase_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production**
   ```bash
   npm run build
   ```
   
   The production-ready files will be in the `dist/` folder.

## 🌐 Deploy to Vercel

### First-Time Deployment

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the Vite configuration

3. **Set Environment Variables in Vercel**
   - Go to your project settings on Vercel
   - Navigate to **Environment Variables**
   - Add all variables from `.env.local`:
     - `VITE_UNSPLASH_ACCESS_KEY`
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`

4. **Deploy**
   ```bash
   vercel --prod
   ```

### Updating Deployment

Every push to the `main` branch will automatically deploy to Vercel if you have GitHub integration enabled.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Build Tool**: Vite
- **API**: Unsplash API
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Hosting**: Vercel

## 📁 Project Structure

```
SearchToSee/
├── images/              # Gallery images for landing page
├── index.html          # Landing page with authentication
├── main.html           # Main search page
├── auth.js             # Authentication logic
├── auth.css            # Authentication styles
├── script.js           # Main application logic
├── style.css           # Main styles
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── vercel.json         # Vercel deployment config
├── .env.example        # Environment variables template
└── .env.local          # Your local environment variables (not committed)
```

## 🔑 Getting API Keys

### Unsplash API Key

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Register your application
3. Copy your Access Key

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → **Email/Password** sign-in method
4. Enable **Firestore Database**
5. Go to **Project Settings** → **General**
6. Copy your Firebase configuration values

## 🎨 Features Breakdown

### Theme Toggle
Switch between light and dark themes with a smooth transition animation.

### Cursor Animation
Enable/disable interactive particle trail that follows your cursor (desktop only).

### Search Functionality
- Real-time image search using Unsplash API
- Infinite scroll with "Show More" button
- Responsive grid layout

### Authentication
- User registration and login
- Password reset functionality
- Secure session management with Firebase

## 🐛 Troubleshooting

### Build fails with "import.meta.env is undefined"
Make sure you:
1. Have created `.env.local` file
2. All environment variables are prefixed with `VITE_`
3. Restart the dev server after adding environment variables

### Images not loading
- Check your Unsplash API key is correct
- Verify you haven't exceeded API rate limits
- Check browser console for errors

### Authentication not working
- Verify Firebase configuration is correct
- Ensure Firebase Authentication is enabled in Firebase Console
- Check Firestore rules allow read/write access

## 📝 License

Copyright © 2024 Stiven Arifaj. All Rights Reserved.

## 👨‍💻 Author

**Stiven Arifaj**
- GitHub: [@StivenArifaj](https://github.com/StivenArifaj)

## 🙏 Acknowledgments

- Image API powered by [Unsplash](https://unsplash.com)
- Authentication by [Firebase](https://firebase.google.com)
- Icons from [Font Awesome](https://fontawesome.com)
