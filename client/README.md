 Google Keep Clone

A robust and responsive web application built with **React**, **TypeScript**, and **Vite** that replicates the core functionality and design of [Google Keep](https://keep.google.com/). This project serves as a modern example of a note-taking application with create, read, update, and delete (CRUD) operations, featuring a dynamic masonry layout and dark mode support.

🚀 Features

- Create Notes: Quickly add new notes with title and content.
- Edit & Update: Seamlessly edit existing notes.
- Delete Notes: Remove unwanted notes.
- Masonry Layout: Dynamic, Pinterest-style grid layout using `react-masonry-css` for an optimal viewing experience.
- Dark Mode: Fully supported dark theme that respects user preference or system settings.
- Responsive Design: Optimized for desktop, tablet, and mobile devices.

🛠️ Technology Stack

- Framework: [React 19](https://react.dev/)
- Build Tool: [Vite](https://vitejs.dev/)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Styling: CSS Variables & Custom CSS
- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- Linting: ESLint

 📦 Getting Started

Follow these steps to set up the project locally on your machine.

 Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 16 or higher recommended) and npm installed.



# Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.



# 📂 Project Structure

```
client/
├── src/
│   ├── components/   # Reusable UI components (NoteCard, Header, etc.)
│   ├── context/      # React Context for global state (Theme, etc.)
│   ├── services/     # API services and mock data
│   ├── App.tsx       # Main application component
│   ├── main.tsx      # Entry point
│   └── index.css     # Global styles and variables
├── public/           # Static assets
└── package.json      # Project dependencies and scripts
```




