import { apiRequest } from "./api";

export async function getWeeklyTimesheets(userId:any) {
  return apiRequest(`/weeklyTimesheets?userId=${userId}`);
}

export async function getTimesheetEntries(timesheetId:any) {
  return apiRequest(`/timesheetEntries?timesheetId=${timesheetId}`);
}