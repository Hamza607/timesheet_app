import type { Timesheet } from "../types/timesheet";

export function formatDateRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const startMonth = startDate.toLocaleString("en-US", { month: "long" });
  const endMonth = endDate.toLocaleString("en-US", { month: "long" });

  const year = endDate.getFullYear();

  if (startMonth === endMonth) {
    return `${startDay} - ${endDay} ${endMonth}, ${year}`;
  }

  return `${startDay} ${startMonth} - ${endDay} ${endMonth}, ${year}`;
}

export function getDateRangeKey(sheet: Pick<Timesheet, "weekStart" | "weekEnd">) {
  return `${sheet.weekStart}_${sheet.weekEnd}`;
}

export function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-emerald-100 text-emerald-700";
    case "incomplete":
      return "bg-yellow-100 text-yellow-700";
    case "missing":
      return "bg-pink-100 text-pink-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export function getActionText(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "View";
    case "incomplete":
      return "Update";
    case "missing":
      return "Create";
    default:
      return "View";
  }
}