import { useMemo } from "react";
import type { TimesheetEntry } from "../../../types/timesheet";

const MAX_HOURS = 40;

export function useTimesheetProgress(entries: TimesheetEntry[]) {
  return useMemo(() => {
    const totalHours = entries.reduce(
      (sum, entry) => sum + Number(entry.hours || 0),
      0
    );

    const progress = Math.min((totalHours / MAX_HOURS) * 100, 100);

    return {
      totalHours,
      maxHours: MAX_HOURS,
      progress,
    };
  }, [entries]);
}