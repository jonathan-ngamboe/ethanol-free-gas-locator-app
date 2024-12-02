

# Ethanol-Free Gas Locator App 🚗

A mobile application to help users find gas stations offering ethanol-free gasoline.

## 🌟 Overview

This React Native mobile app helps users locate gas stations that offer ethanol-free gasoline. Built with modern technologies and a focus on user experience, it provides an intuitive interface with mapping capabilities and various features for optimal usability.

## ✨ Key Features

- **User Authentication**
  - Sign up and login via Supabase
  - Profile management (TO DO)
  
- **Location Services**
  - User geolocation
  - Manual address input
  - Integration with navigation apps (Apple/Google Maps)

- **Station Search**
  - Map view with station markers
  - List view with stations
  - Comprehensive station information (address, hours, fuel types etc.)
  - Distance-based search

- **User Features**
  - Favorite stations
  - Dark/Light theme support
  - Share functionality

## 📋 Prerequisites

```bash
Node.js: v20.x.x
npm/yarn: 10.x.x
Expo CLI: 6.x.x
```

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/jonathan-ngamboe/ethanol-free-gas-locator-app.git
cd ethanol-free-gas-locator-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Environment setup
```bash
# Create .env file in root directory
EXPO_PUBLIC_GEOCODING_API_URL=your_geocoding_api_url
EXPO_PUBLIC_GEOCODING_API_KEY=your_geocoding_api_key
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
EXPO_PUBLIC_REACT_NATIVE_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_REACT_NATIVE_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_NREL_API_KEY=your_nrel_api_key
```

## 🏃‍♂️ Running the App

```bash
# Start development server
expo start

# Run on iOS
expo run:ios

# Run on Android
expo run:android
```

## 📁 Project Structure

```
src/
├── components/    # Reusable components
├── constants/     # Application constants
├── contexts/      # React contexts
├── screens/       # Application screens
├── navigation/    # Navigation configuration
├── screens/       # Application screens
├── services/      # API services and utilities
├── styles/        # Global styles and themes
└── utils/         # Utility functions
```

## 🛠 Tech Stack

- React Native with Expo
- React Navigation
- React Native Paper
- React Native Gesture Handler
- React Native Maps
- React Native Reanimated 
- @gorhom/bottom-sheet
- Supabase (Authentication & Storage)
- NREL API (Station Data)
- Expo Location
- Expo Clipboard

## 🐛 Known Issues

- Performance issues when displaying many stations simultaneously
- Have to replace E85 with E0 in NREL API response
- Social login (Google, Facebook, Apple) not implemented
- Profile management not implemented