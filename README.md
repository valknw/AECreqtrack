# AECreqtrack

AECreqtrack is a lightweight requirements tracker implemented with **React** and **TypeScript**. It provides a small set of reusable components and hooks that handle requirement management, CSV import/export and simple project switching using the browser's local storage.

## Key Features

- **Multiple projects** – create and switch between requirement collections stored locally in the browser.
- **Requirement list** – add, edit or delete requirements with status, description and comments.
- **Filtering and search** – quickly locate requirements by text or by status.
- **Specification tree view** – navigate requirements grouped by specification section.
- **Traceability matrix** – view each requirement across all statuses for quick verification.
- **Dashboard** – pie chart coverage and readiness indicator based on verification status.
- **CSV import/export** – move requirements in and out of the app using standard CSV files.

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

## Getting started in Visual Studio Code

AECreqtrack ships with reusable React components and a Vite configuration so
you can run the application directly from this repository. The steps below show
how to open the project in VS Code and start the development server.

1. **Install prerequisites**
   - [Node.js](https://nodejs.org/) 18 or newer
   - [Git](https://git-scm.com/) for cloning the repository
   - [Visual Studio Code](https://code.visualstudio.com/)
2. **Clone or download the repository.** In a terminal run:
   ```bash
   git clone https://github.com/yourname/AECreqtrack.git
   cd AECreqtrack
   ```
   Alternatively, download the ZIP archive and extract it.
3. **Open the folder in VS Code** (`File` → `Open Folder...`).
4. **Install dependencies** using the integrated terminal:
   ```bash
   npm install
   ```
   If npm reports a peer dependency conflict, retry with:
   ```bash
   npm install --legacy-peer-deps
   ```
5. **Compile the TypeScript sources**:
   ```bash
   npx tsc
   ```
6. **Run the included test** to verify everything works:
   ```bash
   node tests/csv.test.js
   ```

7. **Start the development server** directly from the repository root:
   ```bash
   npm run dev
   ```
8. Open the URL printed in the terminal (typically
   `http://localhost:5173`) in your browser to use AECreqtrack.

Once running, you can:

1. Create a project or work with the default project stored in local storage.
2. Add new requirements using the **Add Requirement** dialog.
3. Filter requirements by typing in the search box or choosing a status from the drop down.
4. Switch between **List**, **Tree**, **Matrix** and **Dashboard** views using the buttons in the header.
5. Import or export a CSV file with the **Import CSV** and **Export CSV** buttons.

All data is persisted in the browser, so refreshing the page keeps your progress for each project.


All of these commands can be executed from the integrated terminal inside Visual
Studio Code, making it easy for beginners to experiment with the project.

## API

The `useRequirements` hook exposes several helpers for manipulating the requirement list. It now also returns an `addRequirement` function, which is an alias for `createRequirement` and can be used in the same way to append a new requirement to the current project.
