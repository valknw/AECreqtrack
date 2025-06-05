# AECreqtrack

This repository contains a lightweight requirements tracker built with React and TypeScript. The project includes several modular components and a small test for CSV utilities.

## Prerequisites

- **Node.js** v18 or newer
- **npm** for installing packages and running commands

## Running the tests

1. Compile the TypeScript sources.
   ```bash
   npx tsc
   ```
2. Execute the CSV utility test.
   ```bash
   node tests/csv.test.js
   ```

## Running the app

The repository does not ship with a bundler configuration. To run the React interface, place `App.tsx` and the `src/` directory inside an existing React project or create a new one (for example using [Vite](https://vitejs.dev/)):

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
# Copy the files from this repository into the `src/` folder of the Vite project
npm run dev
```

Open the local development URL displayed by Vite (typically `http://localhost:5173`) to use the requirements tracker.
