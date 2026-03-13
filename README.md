# WMS Frontend

Frontend application for the **Warehouse Management System (WMS)** built for the marketplace integration technical assessment.

This application allows warehouse operators to:

- View and manage marketplace orders
- Perform warehouse lifecycle actions (Pickup → Pack → Ship)
- Monitor order status and summary statistics
- Interact with the WMS backend API

The frontend communicates with the backend service that integrates with the **Marketplace Mock API**.

---

# Tech Stack

## Framework

- **React** – UI framework
- **Vite** – Fast development build tool
- **TypeScript** – Static typing

## UI & Styling

- **Shadcn/UI** – Component library
- **TailwindCSS** – Utility-first CSS framework

## Data Fetching

- **Axios** – HTTP client
- **TanStack Query** – Server state management and caching

## Forms & Validation

- **React Hook Form** – Form management
- **Zod** – Schema validation

## Table Management

- **TanStack Table** – Headless table utilities for building flexible tables

---

# Features

- Authentication
- Order listing with pagination, sorting, and filtering
- Order detail view
- Warehouse actions:
  - Pickup
  - Pack
  - Ship
- Dashboard order summary
- API integration with WMS backend
- Dynamic UI based on `allowedActions` from backend

---

# Installation

### 1. Clone the repository

```bash
git clone https://github.com/Corazon-17/wms-fe.git
cd wms-fe
```

### 2. Copy environment file

```bash
cp .env.example .env
```

Update values in `.env` if needed.

### 3. Install dependencies

```bash
pnpm install
```

### 4. Start development server

```bash
pnpm dev
```

The application will start at:

```
http://localhost:5173
```

---

# Development

### Build project

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

---

# API Integration

This frontend communicates with the WMS backend API.

Example API endpoints used:

```
POST /auth/login
GET  /api/orders
GET  /api/orders/:order_sn
POST /api/orders/:order_sn/pick
POST /api/orders/:order_sn/pack
POST /api/orders/:order_sn/ship
GET  /api/orders/summary
```

Server state is managed using **TanStack Query**, and all API requests are handled through a centralized **Axios client**.

---

# UI Components

UI components are built using **Shadcn/UI** and styled with **TailwindCSS**.

Examples include:

- Button
- Input
- Table
- Dialog
- Card

Tables are implemented using **TanStack Table** to support:

- Sorting
- Pagination
- Column configuration
- Dynamic rendering

---

# Forms

Forms are handled using:

- **React Hook Form**
- **Zod** for schema validation

Example validation workflow:

```
Zod schema
      ↓
React Hook Form resolver
      ↓
Validated form submission
```

---

# Notes

- This project assumes the **WMS backend server is running**
- Marketplace API integration is handled by the backend service
- Frontend focuses only on warehouse operations and UI state

---

# License

This project is for technical assessment purposes.
