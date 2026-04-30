export type TimesheetEntry = {
  id: number | string;
  date: string;
  project: string;
  task: string;
  hours: number;
};

export type Timesheet = {
  id: number | string;
  weekStart: string;
  weekEnd: string;
  status?: TimesheetStatus;
};

export type TimesheetStatus = "completed" | "incomplete" | "missing" | string;



export interface User {
  id: string | number;
  name?: string;
  email?: string;
}