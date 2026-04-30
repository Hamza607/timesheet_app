import { useEffect, useMemo, useState } from "react";
import { getTimesheetEntries } from "../../../api/timesheetApi";
import type { TimesheetEntry } from "../../../types/timesheet";



export function useTimesheetEntries(activeTimesheetId?: number | string) {
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEntries() {
      try {
        setLoading(true);
        setError("");

        if (!activeTimesheetId) {
          setError("Timesheet not found.");
          return;
        }

        const data = await getTimesheetEntries(activeTimesheetId);

        setEntries(data);
      } catch (err: any) {
        console.error("Failed to fetch timesheet entries:", err);
        setError(err?.message || "Failed to load timesheet entries");
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, [activeTimesheetId]);

  const groupedEntries = useMemo(() => {
    return entries.reduce<Record<string, TimesheetEntry[]>>((groups, entry) => {
      if (!groups[entry.date]) {
        groups[entry.date] = [];
      }

      groups[entry.date].push(entry);
      return groups;
    }, {});
  }, [entries]);

  function addEntry(entry: TimesheetEntry) {
    setEntries((prev) => [...prev, entry]);
  }

  return {
    entries,
    setEntries,
    groupedEntries,
    loading,
    error,
    addEntry,
  };
}
