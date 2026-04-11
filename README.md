# Online Assessment Platform

A simplified online assessment application built to demonstrate advanced frontend development skills, component design, and complex state management workflows. This project contains two distinct interfaces: an Employer Panel for managing exams and a Candidate Panel for taking them.

## 🔗 Project Links

- **Live Demo:** [Insert Live Demo URL Here]
- **Video Walkthrough:** [Insert Video Link Here]
- **Figma Design Reference:** [Insert Figma Link Here]

---

## 🚀 Features

### Employer Panel

- **Authentication:** Login page with email and password fields, redirecting to the dashboard upon successful login. (Note: Implemented a mock authentication system).
- **Dashboard (Online Tests List):** Displays a list of created online tests in a card format. Each card shows the Exam Name, Candidate count, Question Sets, Exam Slots, and a "View Candidates" button.
- **Create Online Test (Multi-Step Form):**
  - _Step 1 (Basic Info):_ Collects Title, Total Candidates, Total Slots, Question Sets, Question Type, Start Time, End Time, and Duration.
  - _Step 2 (Question Sets):_ A modal interface to Add, Edit, or Delete questions. Supports Checkbox, Radio, and Text question types.

### Candidate Panel

- **Authentication:** Login system for candidates using email and password.
- **Dashboard:** Shows assigned exams as cards detailing Duration, Questions count, Negative Marking, and a "Start" button.
- **Exam Screen:** Displays questions with a live timer countdown.
- **Exam Controls:** Includes auto-submit on timeout, a manual submit option, and behavioral tracking features (like tab switch detection and fullscreen exit monitoring).

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js / React
- **State Management:** Zustand / Redux Toolkit
- **Forms & Validation:** React Hook Form paired with Zod/Yup for schema validation
- **Styling:** Tailwind CSS combined with ShadCN UI (or MUI/Ant Design)
- **Data Fetching:** Axios and React Query for API handling
- **Code Quality:** Focused on clean, readable, and maintainable code. Utilizes custom hooks for logic encapsulation, reusable modular components, and DRY principles for forms and API calls. Component re-renders are optimized for performance.

---

## ⚙️ Setup Instructions

To run this project locally on your machine, follow these steps:

1. Clone the repository:
   git clone [Your-Repo-URL]

2. Navigate to the project directory:
   cd online-assessment-platform

3. Install the dependencies:
   npm install

4. Start the development server:
   npm run dev

5. Open your browser and visit http://localhost:3000

---

## 📝 Additional Interview Questions

**1. MCP Integration**

- _Have you worked with any MCP (Model Context Protocol)?_
  Yes, I integrated a Figma MCP server during this project.
- _What work did you perform, and what was accomplished?_
  Using Claude Code inside VSCode, I utilized the Figma MCP server to directly inspect and extract design tokens, layout dimensions, and component structures from the provided Figma file. This severely reduced context switching, accelerated the translation of UI designs into Tailwind/ShadCN components, and ensured high fidelity to the original design specs.

**2. AI Tools for Development**

- _Which AI tools or processes have you used or recommend to speed up frontend development?_
  I extensively utilized Claude Code alongside Codex within my VSCode environment. Codex assisted with rapid inline code completion and boilerplate generation. Claude Code was instrumental in scaffolding the complex multi-step forms, setting up the behavioral tracking logic (like tab switching), and refactoring components to align with clean code and DRY principles.

**3. Offline Mode**

- _How would you handle offline mode if a candidate loses internet during an exam?_
  I would implement a local-first approach using localStorage or IndexedDB. As the candidate answers questions, their progress and the remaining timer state are continuously saved locally. If the network status drops, the UI will alert the user but allow them to continue the exam uninterrupted. Once the connection is restored, a background synchronization function automatically pushes the locally stored payload to the server.
