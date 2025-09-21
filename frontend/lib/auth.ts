export type Role = "admin" | "candidate" | "";

export type Session = {
  role: Role;
  user: { user_id: string; email: string } | null;
};

const KEY = "jobfair_session";

export function saveSession(s: Session) {
  localStorage.setItem(KEY, JSON.stringify(s));
}
export function loadSession(): Session {
  if (typeof window === "undefined") return { role: "", user: null };
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : { role: "", user: null };
}
export function clearSession() {
  localStorage.removeItem(KEY);
}
