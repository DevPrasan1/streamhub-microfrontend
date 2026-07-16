# 🚀 React Vite Module Federation Boilerplate (Micro Frontend)

> **A production-ready Micro Frontend (MFE) boilerplate built with React 19, Vite, Module Federation, TypeScript, Storybook 10, Zustand, and a local Mock API.**
>
> 🌐 **Live Production Demo**: [micro-frontend-vite-boilerplate.netlify.app](https://micro-frontend-vite-boilerplate.netlify.app/)
>
> **A production-inspired E-Commerce Product Catalog platform built with React, Vite, Module Federation, Storybook, Zustand, and a local Mock API.**
>
> The goal of this project is to demonstrate how a large enterprise e-commerce application can be split into independently developed and deployed Micro-Frontends (MFEs).
>
> 📖 **Developer Workflows**: For instructions on running standalone commands, integrated hot-rebuild environments, and workspace scripts cataloging, refer to [workflow.md](./workflow.md).
>
> 🏗️ **MFE Boilerplate Guide**: To use this repository as a template or boilerplate for your own React Module Federation monorepo, see [BOILERPLATE.md](./BOILERPLATE.md).
>
> 🚀 **Deployment Guide**: For instructions on deploying the host and remotes to Netlify, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Preview & Screenshots

| Homepage (Light Theme) | Homepage (Dark Theme) |
| :---: | :---: |
| ![Home Light](./assets/screenshots/home_1.jpeg) | ![Home Dark](./assets/screenshots/home_1_dark_theme.jpeg) |
| **Product Detail** | **Customer Reviews** |
| ![Details](./assets/screenshots/product_detail_top_1.jpeg) | ![Reviews](./assets/screenshots/product_detail_bottom.jpeg) |
| **Cart Dropdown** | **Sign In Screen** |
| ![Cart](./assets/screenshots/product_cart.jpeg) | ![Sign In](./assets/screenshots/login_1.jpeg) |

---

## 🚀 Getting Started

To use this repository as a template for your own projects:

1. Click the **"Use this template"** button at the top of the GitHub repository page.
2. Clone your newly created repository:
   ```bash
   git clone <your-new-repo-url>
   cd micro-frontend-vite-boilerplate
   ```
3. Install the workspaces and dependencies:
   ```bash
   npm install
   ```
4. Start the interactive development build:
   ```bash
   npm run dev:mfe
   ```
   Open **[http://localhost:5005](http://localhost:5005)** inside your browser to start coding.

---

## 🏗️ High-Level Architecture

```
                          MFE Monorepo
                               │
                       Host (Container)
             [Auth, Routing, Layout, Shared Store]
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
  Product Catalog       Product Details       Product Reviews
     (MFE 1)               (MFE 2)               (MFE 3)
```

---

## ⚙️ How Module Federation Works Here

Each micro frontend is independently built and deployed while sharing common libraries at runtime using Module Federation:

1. **Host (`apps/host`)** requests remote entrypoints from target domains (e.g. `http://localhost:5001/assets/remoteEntry.js`).
2. **Remotes (`apps/product-catalog`, etc.)** expose React components which get dynamically loaded over the network only when the user navigates to those sub-routes.
3. Common dependencies like `react`, `react-dom`, and `zustand` are shared, ensuring that each library is only loaded **once** in the browser, matching the optimal bundle-sharing setup of a monolith.

---

## ⚡ Performance Metrics

The values below represent optimized builds running locally:

| Metric | Host Shell Container | Product Catalog MFE | Product Details MFE | Product Reviews MFE |
| :--- | :---: | :---: | :---: | :---: |
| **Startup Time (Dev)** | ~95ms | ~90ms | ~92ms | ~91ms |
| **Build Time** | ~740ms | ~590ms | ~740ms | ~690ms |
| **Production Bundle Size** | ~106 kB | ~98 kB | ~98 kB | ~98 kB |
| **Remote Entry script** | - | 3.74 kB | 3.44 kB | 3.44 kB |
| **Lighthouse Performance** | 99+ | 99+ | 99+ | 99+ |

---

## 🗺️ Roadmap

- [x] **React 19 & TypeScript 5 support**
- [x] **Storybook 10 design system**
- [x] **Zustand shared store synchronization**
- [x] **Authentication & Mock API**
- [ ] **SSR (Server-Side Rendering) Support**
- [ ] **Docker & Kubernetes deployment templates**
- [ ] **Playwright E2E testing suite**
- [ ] **Turborepo / Nx Monorepo Migration**
- [ ] **AWS / Terraform deployment scripts**

---

## 🛠️ Monorepo CLI Commands

For the full developer guide, refer to the [workflow.md](./workflow.md) guide.

```bash
# Install Monorepo Workspaces
npm install

# Run All Apps in Integrated Dev Mode
npm run dev:mfe

# Compile Production Build Assets
npm run build

# Preview Static Builds Locally
npm run preview

# Format & Lint checks
npm run format
npm run lint

# Launch Storybook Components Library
npm run storybook
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
