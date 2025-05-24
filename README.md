# Start Demo Project

A modern React application built with TypeScript, using functional programming principles and Tailwind CSS for styling.

## 🚀 Setup

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (Package manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hygorzorak/start-demo
cd start-demo
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report

## 📁 Project Structure

```
start-demo/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── features/          # Feature-specific components and logic
│   ├── routes/           # Route components and definitions
│   ├── shared/           # Shared utilities, types, and constants
│   ├── setup/            # Application setup and configuration
│   ├── client.tsx        # Client entry point
│   ├── router.tsx        # Router configuration
│   ├── routeTree.gen.ts  # Generated route tree
│   ├── ssr.tsx           # Server-side rendering entry
│   ├── test-setup.ts     # Test configuration
│   └── test-utils.tsx    # Testing utilities
├── app.config.ts         # Application configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vitest.config.ts      # Vitest configuration
```

## 🛠 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vinxi
- **Package Manager**: pnpm
- **Routing**: @tanstack/react-router
- **State Management**: @tanstack/react-query
- **UI Components**: @mui/material
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Testing Library
- **Form Validation**: Zod
- **Notifications**: react-hot-toast

## 🧪 Testing

The project uses Vitest and Testing Library for testing. Tests can be run using:

```bash
pnpm test        # Run tests in watch mode
pnpm test:coverage  # Run tests with coverage report
```

## 📝 Code Style

- Functional programming principles
- TypeScript with strict mode enabled
- Type definitions preferred over interfaces
- Tailwind CSS for styling
- Component-based architecture
- Feature-based folder structure 