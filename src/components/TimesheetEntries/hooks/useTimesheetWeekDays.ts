import { useMemo } from "react";
import type { Timesheet, TimesheetEntry } from "../../../types/timesheet";

export function useTimesheetWeekDays(
  timesheet: Timesheet | undefined,
  entries: TimesheetEntry[],
) {
  return useMemo(() => {
    if (timesheet?.weekStart) {
      const start = new Date(timesheet.weekStart);
      const days = [];

      for (let i = 0; i < 5; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);

        days.push({
          raw: date.toISOString().split("T")[0],
          label: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        });
      }

      return days;
    }

    const uniqueDates = Array.from(new Set(entries.map((entry) => entry.date)));

    return uniqueDates.map((date) => ({
      raw: date,
      label: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));
  }, [timesheet?.weekStart, entries]);
}
