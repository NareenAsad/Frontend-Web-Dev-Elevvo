# 🚀 TaskFlow Landing Page

A modern, responsive **one-page landing website** for the TaskFlow productivity app.  
Built with **React, Tailwind CSS, TypeScript, Heroicons, and Lucide Icons**, the site highlights features, testimonials, pricing, and a clean call-to-action.  

---

## ✨ Features

✅ Hero Section with app name, tagline & call-to-action button  
✅ Features Section (Lightning Fast, Team Collaboration, Advanced Analytics)  
✅ Testimonials Section with customer reviews (Pakistani professionals)  
✅ Pricing Section (Free, Pro, and Team tiers)  
✅ Footer with contact info and social links  
✅ Smooth scroll animations & responsive design  
✅ Theming with custom **Tailwind color variables**  

---

## 🛠️ Tech Stack

- **React + TypeScript**
- **Vite** (bundler / dev server) or Next.js *(depending on your setup)*  
- **Tailwind CSS** (with custom color system)  
- **Heroicons** & **Lucide-react** (for icons)  

---

## 📂 Project Structure

```

taskflow-landing/
├─ src/
│   ├─ app/
│   │   ├─ components/   # Reusable UI components (Hero, Features, Testimonials, Pricing, Footer)
│   │   ├─ hooks/        # Custom hooks (e.g., scroll animations)
│   │   ├─ page.tsx      # Main entry page
│   └─ index.css         # Global Tailwind + custom CSS variables
├─ package.json
├─ tailwind.config.js
├─ README.md

````

---

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/taskflow-landing.git
   cd taskflow-landing
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   * For Vite → open [http://localhost:5173](http://localhost:5173)
   * For Next.js → open [http://localhost:3000](http://localhost:3000)

4. **Build for production**

   ```bash
   npm run build
   npm run preview
   ```

---

## 🎨 Customization

* Colors are defined in `src/index.css` under `:root` using CSS variables.
* Update icons in `Features.tsx` or `Testimonials.tsx` by importing from:

  * `@heroicons/react/24/outline`
  * `lucide-react`

---