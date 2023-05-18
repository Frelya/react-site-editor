# React Page Editor

<hr/>

[![Deployment](https://api.netlify.com/api/v1/badges/9e747f8d-ff28-425b-b50b-52e68e3dede9/deploy-status?branch=main)](https://app.netlify.com/sites/react-site-editor/deploys)

<hr/>

A React-based page builder that allows you to create custom web pages with ease.

## Features

-   Drag-and-drop interface for adding and arranging elements on the page
-   Customizable components and styles to create unique pages
-   Undo/Redo functionality to easily revert changes
-   Preview mode to see your changes in real-time

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for
development and testing purposes.

### Prerequisites

You will need to have `Node.js` and `pnpm` installed on your system.

### Installing

1. Clone the repository:

```bash
git clone https://github.com/Frelya/react-site-editor.git
```

2. Navigate to the project directory:

```bash
cd react-site-editor
```

3. Install the dependencies:

```bash
pnpm i
```

4. Start the development server:

```bash
pnpm dev
```

The page builder should now be running at `http://localhost:3000`.

## Deployment

To deploy the page builder to a production environment, run the following command:

```bash
pnpm build
```

This will create a production-ready build of the page builder in the `build` folder.

## Built With

-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces
-   [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps
-   [Vite](https://vitejs.dev/) - A fast build tool for modern web apps
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs
-   [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript
-   [Turborepo](https://turbo.build/) - A tool for managing multiple interdependent JavaScript projects
-   [pnpm](https://pnpm.io/) - A fast, disk space efficient package manager

## Contributing

If you would like to contribute to the project, please follow the steps below:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
