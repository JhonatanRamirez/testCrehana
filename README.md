# Country Information and Video Streaming App

This is a React Native application that displays information about countries and allows users to watch HLS video streams.

## Features

-   **Country List:** View a list of all countries.
-   **Search:** Filter countries by name.
-   **Filter:** Filter countries by continent and currency.
-   **Country Details:** View detailed information about a specific country.
-   **HLS Video Player:** Watch an HLS video stream on the country detail screen.

## Tech Stack

-   **React Native:** A framework for building native apps using React.
-   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
-   **GraphQL:** A query language for APIs.
-   **Apollo Client:** A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.
-   **React Navigation:** A library for routing and navigation in React Native apps.
-   **React Native Paper:** A popular UI component library for React Native.
-   **React Native Video:** A component for displaying video in React Native.

## Getting Started

### Prerequisites

-   Node.js (>= 20)
-   npm or Yarn
-   React Native CLI
-   An Android or iOS emulator/device

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/country-app.git
    cd country-app
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Install iOS dependencies:**

    ```sh
    cd ios && pod install && cd ..
    ```

### Running the App

1.  **Start the Metro bundler:**

    ```sh
    npm start
    # or
    yarn start
    ```

2.  **Run on Android:**

    ```sh
    npm run android
    # or
    yarn android
    ```

3.  **Run on iOS:**

    ```sh
    npm run ios
    # or
    yarn ios
    ```

## Project Structure

The project is organized into the following directories:

-   `src/api`: Contains the Apollo Client configuration and GraphQL queries.
-   `src/components`: Contains reusable UI components.
-   `src/navigation`: Contains the navigation setup.
-   `src/screens`: Contains the application screens.
-   `src/types`: Contains the TypeScript type definitions.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.
