
# Persian Todo List Application

A responsive Todo List application with category filtering, built with React, TypeScript, and Tailwind CSS.

## Live Demo

You can view the live demo of this project on GitHub Pages: https://[your-username].github.io/[your-repository-name]/

## Project info

**URL**: https://lovable.dev/projects/1b1b44ee-6c59-434e-984f-3ee9fada69de

## Features

- Add, toggle, and delete tasks
- Filter tasks by category
- Responsive design for all devices
- RTL support for Persian language

## How to deploy to GitHub Pages

### Method 1: Manual Deployment
1. Create a repository on GitHub for this project
2. Connect your Lovable project to the GitHub repository
3. Clone the repository to your local machine
4. Install dependencies with `npm install`
5. Run the following command to deploy to GitHub Pages:

```bash
# This will build the project and push it to the gh-pages branch
npm run build && npx gh-pages -d dist
```

6. Go to your repository settings and enable GitHub Pages, selecting the gh-pages branch as the source

### Method 2: Using GitHub Actions (Automated)
1. Create a repository on GitHub for this project
2. Push your code to the repository
3. GitHub Actions will automatically build and deploy your site to GitHub Pages whenever you push to the main branch
4. Go to your repository settings -> Pages and make sure the source is set to "GitHub Actions"

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/1b1b44ee-6c59-434e-984f-3ee9fada69de) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
