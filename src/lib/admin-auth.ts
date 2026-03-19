import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const SESSION_KEY = "skillup_admin_auth";

/** Format raw input into XXXXX-XX-XXXX-XXX pattern */
export function formatAccessCode(raw: string): string {
  const clean = raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  const groups = [5, 2, 4, 3];
  const parts: string[] = [];
  let pos = 0;
  for (const len of groups) {
    if (pos >= clean.length) break;
    parts.push(clean.slice(pos, pos + len));
    pos += len;
  }
  return parts.join("-");
}

export async function validateCode(code: string): Promise<boolean> {
  const cleaned = code.replace(/-/g, "").toUpperCase();
  // Check against Firestore "admin_codes" collection
  const q = query(
    collection(db, "admin_codes"),
    where("code", "==", cleaned)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}

export async function loginAdmin(code: string): Promise<boolean> {
  const valid = await validateCode(code);
  if (valid) {
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
