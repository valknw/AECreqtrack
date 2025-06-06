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

AECreqtrack ships with reusable React components but no bundler
configuration. The steps below show how to open the repository and run the demo
inside a fresh Vite project.

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

7. **Create a React project** in a new folder (this guide uses `demo`). Run:
   ```bash
   npm create vite@latest demo -- --template react-ts
   cd demo
   npm install
   ```

8. **Return to the repository root and run the setup script** to copy the
   application files, install the extra dependencies and configure Tailwind CSS:


   ```bash
   cd ..
   node setupDemo.js demo
   ```

9. **Start the development server** inside `demo`:
   ```bash
   cd demo
   npm run dev
   ```
11. Open the URL printed in the terminal (typically
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
