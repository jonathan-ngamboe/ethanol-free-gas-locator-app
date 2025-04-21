<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

# ETHANOL-FREE-GAS-LOCATOR-APP

<em></em>

<!-- BADGES -->
<!-- local repository, no metadata badges. -->

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=default&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=default&logo=React&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Expo-000020.svg?style=default&logo=Expo&logoColor=white" alt="Expo">

</div>
<br clear="right">

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#🤖-usage)
- [🔰 Contributing](#-contributing)

## 📍 Overview

A React Native application that provides users with an intuitive interface for finding ethanol-free service stations in the USA.

## 👾 Features

- **User Authentication**: Allows users to sign up and log in via Supabase for profile management.​

- **Location Services**: Utilizes user geolocation and manual address input to find nearby stations, and integrates with Apple or Google Maps for navigation.​

- **Station Search**: Provides a map view with station markers, a list view of stations, and comprehensive station information including address, hours, and fuel types.

## 🖼️ Screenshots

<p align="center">
  <img src="/assets/images/welcome-page.png" width="75%" alt="Ethanol-Free Locator App Welcome Page" />
  <br>
  <em>Welcome Page</em>
</p>

<p align="center">
  <img src="/assets/images/signup-page.png" width="75%" alt="Ethanol-Free Locator App Signup Page" />
  <br>
  <em>Signup Page</em>
</p>

<p align="center">
  <img src="/assets/images/discover-page.png" width="75%" alt="Ethanol-Free Locator App Discover Page" />
  <br>
  <em>Discover Page</em>
</p>

<p align="center">
  <img src="/assets/images/station-details-page.png" width="75%" alt="Ethanol-Free Locator App Station Details Page" />
  <br>
  <em>Station Details Page</em>
</p>

<p align="center">
  <img src="/assets/images/settings-page.png" width="75%" alt="Ethanol-Free Locator App Settings Page" />
  <br>
  <em>Settings Page</em>
</p>

## 📁 Project Structure

```sh
└── ethanol-free-gas-locator-app/
    ├── App.js
    ├── README.md
    ├── app.json
    ├── assets
    │   ├── adaptive-icon.png
    │   ├── favicon.png
    │   ├── icon.png
    │   ├── images
    │   ├── mapStyles
    │   └── splash.png
    ├── babel.config.js
    ├── lib
    │   └── supabase.js
    ├── package-lock.json
    ├── package.json
    └── src
        ├── components
        ├── constants
        ├── context
        ├── navigation
        ├── screens
        ├── services
        ├── styles
        └── utils
```

## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with ethanol-free-gas-locator-app, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Npm


### ⚙️ Installation

Install ethanol-free-gas-locator-app using one of the following methods:

**Build from source:**

1. Clone the ethanol-free-gas-locator-app repository:
```sh
❯ git clone https://github.com/jonathan-ngamboe/ethanol-free-gas-locator-app
```

2. Navigate to the project directory:
```sh
❯ cd ethanol-free-gas-locator-app
```

3. Install the project dependencies:

**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

4. Add environment variables

**Create .env** file in root directory
```sh
EXPO_PUBLIC_GEOCODING_API_URL=your_geocoding_api_url
EXPO_PUBLIC_GEOCODING_API_KEY=your_geocoding_api_key
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
EXPO_PUBLIC_REACT_NATIVE_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_REACT_NATIVE_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_NREL_API_KEY=your_nrel_api_key
```



### 🤖 Usage
Run ethanol-free-gas-locator-app using the following command:
```sh
# Start development server
expo start

# Run on iOS
expo run:ios

# Run on Android
expo run:android
```

## 🔰 Contributing

- **💬 [Join the Discussions](https://github.com/jonathan-ngamboe/ethanol-free-gas-locator-app/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/jonathan-ngamboe/ethanol-free-gas-locator-app/issues)**: Submit bugs found or log feature requests for the `ethanol-free-gas-locator-app` project.
- **💡 [Submit Pull Requests](https://github.com/jonathan-ngamboe/ethanol-free-gas-locator-app/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/jonathan-ngamboe/ethanol-free-gas-locator-app
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/jonathan-ngamboe/ethanol-free-gas-locator-app/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=jonathan-ngamboe/ethanol-free-gas-locator-app">
   </a>
</p>
</details>