# Timesheet App

A React + TypeScript + Vite web application for managing timesheets.

## Live Demo

https://timesheet-app-ddci.vercel.app

## GitHub Repository

https://github.com/Hamza607/timesheet_app

## Setup Instructions

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Hamza607/timesheet_app


2. Go to the project folder

cd timesheet-app

3. Install dependencies

npm install

4. Start the development server

npm run dev


Frameworks and Libraries Used

1. React
2. TypeScript
3. Vite
4. Tailwind CSS
5. React Router DOM
6. Lucide React Icons

Assumptions and Notes
The project is built using React with TypeScript.
Vite is used for fast development and production builds.
Tailwind CSS is used for styling.
React Router DOM is used for routing.
The app is designed as a timesheet management application.


Time Spent

Time spent: 25 hours

## Project Structure

The project is organized by feature and responsibility.

- `src/api/` contains API-related logic such as authentication and timesheet API functions.
- `src/components/` contains reusable UI components.
- `src/components/TimesheetEntries/` contains the timesheet entry UI and related logic.
- `src/components/TimesheetEntries/hooks/` contains custom hooks used by the TimesheetEntries component.
- `src/components/TimesheetList/` contains the timesheet list UI and related logic.
- `src/components/TimesheetList/hooks/` contains custom hooks used by the TimesheetList component.
- `src/mock/db.json` contains mock data used for development/testing.
- `src/pages/` contains page-level components such as the timesheets page and timesheet detail page.
- `src/Router/` contains application routing logic.
- `src/types/` contains TypeScript type definitions.
- `src/utils/` contains reusable helper functions.

The `hooks/` folders are kept inside their related component folders so that component-specific logic stays close to the UI that uses it.