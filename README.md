# Issue-to-Action AI: Your Guide to Labor Rights

Firebase Studio was used as a development accelerator to scaffold the project. The team actively designed the system architecture, AI flows, UX improvements, and ethical safeguards, and iteratively refined the MVP based on product and judge-facing considerations.

## 1. Problem & Solution

**Problem:** Many workers, especially in the unorganized sector, are unaware of their labor rights and the government resources available to them. When they face issues like unpaid overtime, unfair dismissal, or unsafe working conditions, they often don't know where to turn for help, and legal advice can be inaccessible or expensive.

**Solution:** Issue-to-Action AI is an AI-powered web application that provides immediate, clear, and actionable guidance on labor and employment issues. Users can describe their problem in plain language, and the app uses Google's Gemini model to provide a tailored response covering their rights, relevant government schemes, and the next steps they can take. Our goal is to empower workers by making critical information accessible and easy to understand.

## 2. Solution Description (100 Words)

Issue-to-Action AI is a user-friendly web application designed to demystify labor rights for workers. By entering a description of their employment issue, users receive instant, AI-powered guidance tailored to their situation. The platform leverages Google's Gemini model to explain relevant labor laws, recommend applicable government support schemes, and provide clear, actionable next steps. This empowers workers with the knowledge to safely address workplace injustices. Our goal is to make essential labor rights information accessible to everyone, helping to bridge the gap between workers and the support systems designed to protect them.

## 3. Google Technologies Used

This project is built entirely on Google's ecosystem, showcasing a modern, serverless, AI-first architecture:

*   **Firebase App Hosting:** Hosts the Next.js application, providing a secure, scalable, and fully-managed environment.
*   **Google Gemini:** The advanced AI model that powers the core logic of the application, analyzing user issues and generating guidance.
*   **Genkit (on Firebase):** The open-source framework used to build the AI flow. It provides a structured, robust, and observable way to integrate Gemini into the application via server-side logic.
*   **Google Fonts:** Used for the application's typography.

## 4. Getting Started

This is a Next.js project bootstrapped with `create-next-app`.

### Prerequisites

*   Node.js >= 20
*   npm

### Running the Development Server

First, run the Genkit developer server:
```bash
npm run genkit:dev
```

In a separate terminal, run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.
