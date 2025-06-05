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

## Using the React components

AECreqtrack does not include a bundler configuration. To run the interface, place `App.tsx` and the entire `src/` directory inside an existing React project or create a new one. The example below uses [Vite](https://vitejs.dev/):

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
# Copy `App.tsx` and the `src/` directory from this repository into the Vite project's `src/`
npm run dev
```

Open the local development URL displayed by Vite (typically `http://localhost:5173`) and you will be able to:

1. Create a project or work with the default project stored in local storage.
2. Add new requirements using the **Add Requirement** dialog.
3. Filter requirements by typing in the search box or choosing a status from the drop down.
4. Switch between **List**, **Tree**, **Matrix** and **Dashboard** views using the buttons in the header.
5. Import or export a CSV file with the **Import CSV** and **Export CSV** buttons.

All data is persisted in the browser, so refreshing the page keeps your progress for each project.
