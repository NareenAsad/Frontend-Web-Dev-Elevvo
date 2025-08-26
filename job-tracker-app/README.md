# Job Application Tracker

A simple yet powerful web application to help you track and manage your job applications with ease. Stay organized, monitor your progress, and streamline your job search journey.

[Live Demo](https://https://job-tracker-app-nu.vercel.app/)

## ✨ Features

*   **Dashboard Overview**: Get a quick glance at your total applications, and breakdown by status (Applied, Interviewing, Offer, Rejected).
*   **Add New Applications**: Easily add new job applications with details like company name, job title, status, application date, and notes.
*   **Job Details & Editing**: View comprehensive details for each application and update them as your status changes.
*   **Data Persistence**: All your job application data is saved locally in your browser's `localStorage`, so your data remains even after closing the browser.
*   **Export & Import Data**: Backup your application data to a JSON file or import existing data, making it easy to migrate or share.
*   **Responsive Design**: A clean and intuitive user interface that works well on both desktop and mobile devices.
*   **Light Theme**: A bright and clear visual theme for comfortable use.
*   **UI Animations**: Subtle animations for a smooth and engaging user experience.


## 🚀 Technologies Used

This project is built with modern web technologies:

*   **Next.js**: A React framework for building production-ready applications.
*   **React**: For building the user interface components.
*   **Tailwind CSS**: A utility-first CSS framework for rapid styling.
*   **Context API**: For global state management of job applications.
*   **`localStorage`**: For client-side data persistence.
*   **Lucide React**: For beautiful and customizable icons.

## 🛠️ Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

*   Node.js (LTS version recommended)
*   npm or Yarn

### Getting Started

1.  **Clone the repository (or copy the code):**
    If you're using Git, you can clone the repository:
    \`\`\`bash
    git clone <repository-url>
    cd job-application-tracker
    \`\`\`
    If you received the code directly, ensure all files are in their respective directories (e.g., `app/`, `components/`, `contexts/`, `public/`).

2.  **Install dependencies:**
    Navigate to the project directory and install the required packages:
    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`

3.  **Run the development server:**
    Start the Next.js development server:
    \`\`\`bash
    npm run dev
    # or
    yarn dev
    \`\`\`

    The application will be accessible at `http://localhost:3000`.

## 💡 Usage

*   **Introduction Page (`/`)**: The landing page providing an overview of the application's features.
*   **Dashboard (`/dashboard`)**: View all your tracked job applications, filter them by status, and search by company or job title.
*   **Add Job (`/add-job`)**: Fill out a form to add a new job application to your tracker.
*   **Job Details (`/job/[id]`)**: Click on any job application from the dashboard to view its full details or edit/delete it.
*   **Import/Export**: Use the "Import" and "Export" buttons in the header to manage your data.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
