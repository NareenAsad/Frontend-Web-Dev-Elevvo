# 💼 Freelance Dashboard — Multi-Page Admin Interface

A modern, responsive **admin dashboard** built for a fictional freelance client.
Designed with a **clean gradient UI**, animated backgrounds, and **real-time project insights**.

[Live Demo](https://frontend-web-dev-elevvo.vercel.app/?text=Freelance+Dashboard)

---

## 📋 Overview

This project demonstrates a **multi-page admin dashboard** with professional design and functionality. It focuses on:

* **Project Management** (CRUD operations, filtering, progress tracking)
* **Real-Time Analytics** (charts, earnings, distribution)
* **Profile Management** (settings, skills, security, avatar upload)
* **Responsive UI/UX** (gradient design, animations, mobile-friendly)

---

## ✨ Features

### 📊 Dashboard Overview

* Summary cards: Projects, Earnings, Tasks, Monthly Income
* Recent activity & notifications
* Bar & pie charts for earnings and project distribution
* Dynamic calculations from sample project data

### 📁 Projects Management

* Table & card view of all projects
* CRUD operations: create, edit, delete, duplicate
* Filtering by client, status, or priority
* Visual progress indicators with status labels

### 👤 Profile & Settings

* Editable profile info: name, email, phone, location, bio
* Professional details: skills, hourly rate, availability
* Avatar upload & security placeholders
* Clean and intuitive forms with validation

---

## 🎨 UI / UX Highlights

* Gradient background with floating blob animations
* Glassmorphism effects for modern look
* Consistent sidebar + header across all pages
* Hover states, smooth transitions, and toast notifications
* Fully responsive: mobile, tablet, desktop

---

## 🛠 Tech Stack

* **Next.js 14 (App Router)** + **React.js** + **TypeScript**
* **Tailwind CSS** + **shadcn/ui** + **Lucide Icons**
* **Recharts** (bar, pie, progress charts)
* **React Hook Form** (form handling)
* **date-fns** (date utilities)
* **Local Storage** (data persistence)

---

## 🚀 Getting Started

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd freelance-dashboard
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```
3. **Run Development Server**

   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
freelance-dashboard/
├── app/                # Next.js App Router pages
│   ├── dashboard/      # Dashboard routes (overview, projects, profile)
│   └── layout.tsx      # Root layout
├── components/         # Reusable components
├── contexts/           # State management
├── data/               # Sample project data
├── hooks/              # Custom hooks
├── utils/              # Utility functions
└── lib/                # Configurations
```

---

## 📱 Responsive Design

* **Mobile**: collapsible sidebar, card-first layouts
* **Tablet**: optimized grids and charts
* **Desktop**: full navigation and analytics

---

## 📊 Sample Data Included

* **20+ sample projects** (different industries & clients)
* Project states: Planning, In Progress, Review, Completed
* Realistic budgets, timelines, and notifications

---

## 🚀 Deployment

* Optimized for **Vercel** (Next.js recommended)
* Also supports **Netlify**, **GitHub Pages**, or any static host

```bash
npm run build
npx vercel --prod
```

---

## 📝 License

Open-sourced under the **MIT License**.

---

✨ **Built with React, Next.js, and Tailwind CSS**
📊 *A modern dashboard solution for freelance project management*

---

👉 Do you want me to also **make it more portfolio-style** (like emphasizing “this was built as a showcase project” for hiring managers/clients), or should it stay more **client-facing** (like real product documentation)?
