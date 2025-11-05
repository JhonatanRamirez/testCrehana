# Country Explorer — React Native App

A React Native application that displays information about countries using GraphQL and includes an embedded HLS video player.

## Features

* **Country List:** Browse all countries retrieved via GraphQL API.
* **Search & Filter:** Search by name or filter by continent/currency.
* **Country Details:** View detailed information about each country.
* **HLS Video Player:** Watch HLS video streams using a custom WebView player.
* **Language Settings:** Switch between English and Spanish.
* **Theming:** Fully supports light/dark themes via React Native Paper.

## Tech Stack

| Category             | Technology                                         |
| -------------------- | -------------------------------------------------- |
| Framework            | React Native (0.73.6)                              |
| Language             | TypeScript (5.x)                                   |
| API Layer            | GraphQL with Apollo Client                         |
| Navigation           | React Navigation (Native Stack)                    |
| UI Library           | React Native Paper                                 |
| Video Playback       | WebView-based HLS Player                           |
| Internationalization | react-native-localize + custom i18n                |
| Testing              | Jest + @testing-library/react-native               |
| Icons                | react-native-vector-icons (MaterialCommunityIcons) |

## Project Structure

```
src
├── api/
│   ├── apollo/              # Apollo client setup
│   └── graphQl/             # GraphQL queries
│
├── domain/
│   └── country/             # Business logic (e.g. filterCountries)
│
├── i18n/                    # Translations and language provider
│   ├── index.ts
│   └── I18nProvider.tsx
│
├── navigation/
│   └── AppNavigator.tsx     # Navigation configuration
│
├── presentation/
│   ├── components/          # Reusable UI components (VideoPlayer, etc.)
│   └── screens/
│       ├── CountryList/     # Country list view + filters
│       ├── CountryDetail/   # Country details + video player
│       └── Settings/        # Language selection screen
│
└── App.tsx                  # App entry point
```

## Testing & Coverage

This project uses Jest and @testing-library/react-native.

### Run all tests

```bash
yarn test
```

### Run with coverage report

```bash
yarn test --coverage
```

A detailed HTML report is generated at:

```
coverage/lcov-report/index.html
```

### Example coverage result

```
----------------------------------------
File                           | % Stmts | % Branch | % Funcs | % Lines
----------------------------------------
All files                      |   85.7  |   80.0   |   78.9  |   86.2
src/presentation/components    |  100.0  |  100.0   |  100.0  |  100.0
src/presentation/screens       |   76.4  |   70.0   |   65.0  |   74.8
----------------------------------------
```

## Installation & Setup

### Prerequisites

* Node.js >= 20
* Yarn (recommended)
* React Native CLI
* iOS Simulator or Android Emulator

### 1. Clone the repository

```bash
git clone https://github.com/JhonatanRamirez/testCrehana.git
cd testCrehana
```

### 2. Install dependencies

```bash
yarn install
```

### 3. iOS setup

```bash
cd ios && pod install && cd ..
```

### 4. Run the app

```bash
# Start Metro bundler
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android
```

## GraphQL API

The app uses the Countries GraphQL API (`https://countries.trevorblades.com/`) to fetch data such as:

* Country name
* Capital
* Currency
* Continent
* Languages

## Environment

| Platform     | Version  |
| ------------ | -------- |
| Node         | ≥ 20.0.0 |
| Yarn         | ≥ 1.22   |
| React Native | 0.73.6   |
| TypeScript   | 5.x      |
| Jest         | 29.x     |

## Contributing

Contributions are welcome.
Fork the repository, create a feature branch, and submit a pull request.

## Author

**Jhonatan Ramirez**
Senior React Native Developer
GitHub: [JhonatanRamirez](https://github.com/JhonatanRamirez)
