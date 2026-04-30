import { useMemo } from "react";
import type { User } from "../../../types/timesheet";

export function useStoredUser() {
  return useMemo<User | null>(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      return null;
    }
  }, []);
}