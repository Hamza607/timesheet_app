import { apiRequest } from "./api";

export async function loginUser(email: string, password: string) {
  const users = await apiRequest(
    `/users?email=${encodeURIComponent(email.trim())}`
  );

  if (!Array.isArray(users) || users.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = users.find(
    (u: any) => String(u.password).trim() === String(password).trim()
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
}