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
  status?: string;
};