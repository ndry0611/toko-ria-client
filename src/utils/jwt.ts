import { jwtDecode } from "jwt-decode";

type userCredential = {
  id: number;
  id_role: number;
  status: boolean;
  exp: number;
  iat: number;
};

export function tokenDecode(token: string): userCredential | undefined {
  try {
    return jwtDecode(token);
  } catch {
    return undefined;
  }
}
