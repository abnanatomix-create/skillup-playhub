const VALID_CODES = ["ABN-PRO-JECT7", "SKILLUP-2024", "ADMIN-ACCESS"];

const SESSION_KEY = "skillup_admin_auth";

export function validateCode(code: string): boolean {
  return VALID_CODES.includes(code.trim().toUpperCase());
}

export function loginAdmin(code: string): boolean {
  if (validateCode(code)) {
    sessionStorage.setItem(SESSION_KEY, "authenticated");
    return true;
  }
  return false;
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "authenticated";
}

export function logoutAdmin() {
  sessionStorage.removeItem(SESSION_KEY);
}
