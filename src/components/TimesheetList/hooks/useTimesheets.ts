import { useEffect, useState } from "react";
import type { Timesheet } from "../../../types/timesheet";
import { getWeeklyTimesheets } from "../../../api/timesheetApi";


export function useTimesheets(userId?: string | number) {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchTimesheets() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getWeeklyTimesheets(userId);

        if (isMounted) {
          setTimesheets(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchTimesheets();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return {
    timesheets,
    loading,
    error,
  };
}