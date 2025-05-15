
# GitHub Autocomplete

Custom-built autocomplete component for searching GitHub repositories and users. This project is built without any third-party UI libraries (excluding icons ;)) — only plain HTML elements and styles — and provides a smooth and accessible user experience with keyboard navigation and scroll support.

## ✨ Features

- 🔎 Search GitHub **repositories** and **users** via the GitHub REST API.
- ⌨️ Keyboard navigation using **ArrowUp**, **ArrowDown**, and **Enter**.
- 📜 Scroll support for navigating long lists of results.
- 🔤 Results are sorted **alphabetically** by name.
- 🕒 Debounced API calls that start searching after typing at least **3 characters**.
- ❌ Displays custom error messages for API errors (e.g., rate limits).
- 💡 No usage of UI component libraries — **fully custom** UI.
- 🔐 Supports clean and isolated **SCSS** styling.

## 🧰 Tech Stack

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/) (since CRA is dead and I'm using Next.js on daily basis)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress](https://www.cypress.io/) (E2E testing)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/github-autocomplete.git
cd github-autocomplete
```
2.  Start the application using Docker Compose:
```bash 
docker-compose up -d
```
3. Visit `http://localhost:3000` in your browser.