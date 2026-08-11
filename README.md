# AceHub Study

Build a modern, professional web app called "AceHub" — an AI-powered student productivity platform. Stack: React, TypeScript, Tailwind CSS, connected to Supabase for auth, database, and file storage.

CORE CONCEPT

StudyHub lets students organize their learning into courses, take notes, upload PDFs, and use AI to generate summaries, flashcards, and quizzes from their material — with progress tracking and collaborative study spaces.

DESIGN DIRECTION

Clean, modern, and calm — this should feel trustworthy and focused, like Notion meets Linear meets a study app. Light theme as default with a soft, low-saturation color palette (think off-white backgrounds, one confident accent color like indigo or teal, soft shadows instead of heavy borders). Generous whitespace, rounded corners (not too much), clear typographic hierarchy. Avoid anything that feels "AI hackathon project" — no neon gradients or glowing chatbot bubbles. It should feel like a tool students trust with their grades.

LAYOUT & NAVIGATION

- Persistent sidebar navigation: Dashboard, My Courses, Notes, Flashcards, Quizzes, Study Groups, Progress, Settings

- Top bar with search, streak counter (flame icon + number), and profile avatar

PAGES/SECTIONS TO BUILD

1. Landing Page (pre-login)

   - Hero section: headline about studying smarter with AI, subheadline, CTA buttons (Get Started / Sign In)

   - Feature highlights section (AI summaries, flashcards, quizzes, streaks, group spaces) as icon cards

   - Simple "how it works" 3-step section

   - Clean footer

2. Dashboard (post-login)

   - Welcome header with streak counter and today's study goal

   - Continue where you left off (recent courses/notes)

   - Upcoming study sessions or due flashcard reviews

   - Weekly progress chart (study time or cards reviewed)

3. Courses

   - Grid of course cards (title, color tag, progress bar, note/file count)

   - Create Course modal

   - Course detail page listing all notes/PDFs within it

4. Notes & PDF Upload

   - Rich text note editor

   - PDF upload with a clean drag-and-drop zone, file preview, and processing state

   - "Generate AI Summary" button on notes/PDFs with a loading state, showing the summary in a clean expandable card once ready

5. Flashcards

   - "Generate flashcards from this note" flow

   - Flashcard study mode: flip-card UI, swipe/keyboard navigation, spaced repetition style (mark as Easy/Hard/Again)

   - Deck overview grid

6. Quizzes

   - "Generate quiz from this note" flow with difficulty/question-count options

   - Quiz-taking UI: one question at a time, progress bar, instant feedback, final score screen with review of wrong answers

7. Study Groups

   - List/grid of group spaces user belongs to

   - Group page with shared notes, a simple discussion/chat feed, and shared study goals

   - Create/join group flow with invite code

8. Progress & Streaks

   - Calendar heatmap (GitHub-contributions style) for study activity

   - Stats cards: current streak, longest streak, total study hours, cards reviewed

   - Per-course progress bars

INTERACTION DETAILS

- Smooth transitions between pages, subtle hover states on cards and buttons

- Empty states should be encouraging and on-brand, not generic ("No notes yet — upload your first PDF to get started")

- Loading states for AI actions should feel intentional (e.g. "Analyzing your notes..." with a subtle animated indicator), not just a spinner

- Fully responsive for mobile and tablet

Use placeholder/mock data for now so the UI is fully explorable. Prioritize getting the Dashboard, Courses, Notes, and Flashcards flows polished first.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ayayayay.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5c83369a-e1d2-4740-9c3c-b764b788e393).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
