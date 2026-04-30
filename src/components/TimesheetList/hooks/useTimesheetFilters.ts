import { useMemo, useState } from "react";
import type { Timesheet } from "../../../types/timesheet";
import {
  formatDateRange,
  getDateRangeKey,
} from "../../../utils/timesheetUtils";

export function useTimesheetFilters(timesheets: Timesheet[]) {
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusOptions = useMemo(() => {
    return Array.from(new Set(timesheets.map((sheet) => sheet.status)));
  }, [timesheets]);

  const dateRangeOptions = useMemo(() => {
    return timesheets.map((sheet) => ({
      key: getDateRangeKey(sheet),
      label: formatDateRange(sheet.weekStart, sheet.weekEnd),
    }));
  }, [timesheets]);

  const filteredTimesheets = useMemo(() => {
    return timesheets.filter((sheet: any) => {
      const matchesDateRange =
        !selectedDateRange || getDateRangeKey(sheet) === selectedDateRange;

      const matchesStatus =
        !selectedStatus ||
        sheet.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesDateRange && matchesStatus;
    });
  }, [timesheets, selectedDateRange, selectedStatus]);

  const clearFilters = () => {
    setSelectedDateRange("");
    setSelectedStatus("");
  };

  return {
    selectedDateRange,
    selectedStatus,
    setSelectedDateRange,
    setSelectedStatus,
    statusOptions,
    dateRangeOptions,
    filteredTimesheets,
    clearFilters,
  };
}
