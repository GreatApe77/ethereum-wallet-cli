# Termiwallet - Ethereum Wallet CLI

Termiwallet is a simple, terminal-based Ethereum wallet CLI designed for managing finances, inspired by MetaMask but tailored for the command line. It allows users to manage wallets, interact with the Ethereum blockchain, and handle transactions directly from their terminal.

## Project Overview

### Main Technologies
- **Runtime:** Node.js (>=18.0.0)
- **Language:** TypeScript
- **Blockchain Interface:** Ethers.js (v6)
- **CLI Interaction:** Inquirer.js, Chalk, Figlet
- **Storage:** SQLite3 (via `sqlite3` package)
- **Testing:** Vitest

### Architecture
The project follows a modular architecture inspired by MVC and Dependency Injection:

- **Entry Point:** `src/index.ts` initializes settings, database, and triggers the navigation to the initial screen.
- **Dependency Injection:** `src/AppContainer.ts` manages the registration and retrieval of services, prompts, and repositories.
- **Navigation:** `src/services/navigation/implementations/AppNavigation.ts` acts as a router, managing transitions between different "Screens" (Controllers).
- **Controllers:** Located in `src/controllers/`, each implements a `Controller` interface with a `handle()` method. Each controller represents a specific screen or flow (e.g., `LoginController`, `MainMenuController`).
- **Models/Repositories:** Data access is abstracted through repositories (e.g., `WalletRepositorySqlite`, `NetworkRepositorySqlite`) found in `src/models/*/repository/`.
- **Database:** `src/db/implementations/DatabaseSqlite.ts` handles SQLite migrations and seeding.
- **Services:** Utility services for cache, clipboard, and navigation are located in `src/services/`.
- **Prompts:** Custom CLI prompts are organized in `src/services/prompt/`.
- **UI Components:** Reusable CLI UI elements are in `src/ui/components/`.

## Building and Running

### Development
To run the project in development mode with hot-reloading:
```bash
npm run dev
```

### Build
To compile the TypeScript source to JavaScript:
```bash
npm run build
```
The output will be in the `dist/` directory.

### Production
To run the compiled version:
```bash
npm start
```
Alternatively, if installed globally:
```bash
termiwallet
```

### Docker
To run Termiwallet using Docker in interactive mode:
```bash
docker run -it ghcr.io/greatape77/ethereum-wallet-cli:latest
```

## Testing

The project uses **Vitest** for unit testing.

- **Run all tests once:**
  ```bash
  npm test
  ```
- **Run tests in watch mode:**
  ```bash
  npm run test:dev
  ```
- **Check test coverage:**
  ```bash
  npm run coverage
  ```

Test files are typically located alongside the source files with the `.test.ts` extension (e.g., `src/models/settings/implementations/SettingsFs.test.ts`).

## Development Conventions

- **Module System:** Uses ES Modules (`"type": "module"` in `package.json`).
- **Coding Style:** Follows standard TypeScript conventions. Uses `AppContainer` for service retrieval instead of direct instantiation where possible.
- **Database Migrations:** Managed automatically on startup if `needsMigration` is set in settings.
- **Navigation Flow:** Controllers should use the `Navigation` service to move between screens.
- **Async/Await:** Heavy use of async/await for blockchain and CLI interactions.
- **Type Safety:** Strong typing for screens, entities, and service interfaces.
