import { jwtDecode } from "jwt-decode";
import type { IUser } from "@/types/user";

export const decodedToken = (token: string): Partial<IUser> => {
  return jwtDecode(token);
};
