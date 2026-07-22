// Thin fetch wrapper around the Express backend (see /backend). Every
// endpoint responds with { success: true, data } or { success: false, error }
// — this file is the only place that unwraps that envelope.

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000/api";

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(code: string, status: number) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
}

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (options.token) headers.Authorization = `Bearer ${options.token}`;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError("network_error", 0);
  }

  const json = (await response.json().catch(() => null)) as
    | { success: true; data: T }
    | { success: false; error: string }
    | null;

  if (json === null) {
    throw new ApiError("network_error", response.status);
  }
  if (json.success === false) {
    throw new ApiError(json.error, response.status);
  }

  return json.data;
}

export type AccountType = "student" | "trainer" | "company" | "admin";

export interface AuthUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  accountType: AccountType;
  isSystemAccount: boolean;
  createdAt: string;
}

export interface AuthResult {
  token: string;
  user: AuthUser;
}

export function loginRequest(email: string, password: string): Promise<AuthResult> {
  return apiRequest<AuthResult>("/auth/login", { method: "POST", body: { email, password } });
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  accountType: string;
  password: string;
}

export function registerRequest(payload: RegisterPayload): Promise<AuthResult> {
  return apiRequest<AuthResult>("/auth/register", { method: "POST", body: payload });
}

export interface ContactAttachment {
  filename: string;
  mimeType: string;
  dataBase64: string;
}

export interface ContactPayload {
  subject: string;
  message: string;
  messageType?: string;
  attachments?: ContactAttachment[];
}

export function submitContactRequest(payload: ContactPayload, token: string | null): Promise<unknown> {
  return apiRequest("/contact", { method: "POST", body: payload, token });
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  senderId: string;
  senderName: string;
  senderAccountType: AccountType;
  relatedContactId: string;
  createdAt: string;
  isRead: boolean;
}

export function listAdminNotificationsRequest(token: string | null): Promise<AdminNotification[]> {
  return apiRequest<AdminNotification[]>("/admin/notifications", { token });
}

export function markAdminNotificationReadRequest(id: string, token: string | null): Promise<AdminNotification> {
  return apiRequest<AdminNotification>(`/admin/notifications/${id}/read`, { method: "PATCH", token });
}

// Reads a File into the { filename, mimeType, dataBase64 } shape the
// backend's contact endpoint expects for attachments.
export function fileToBase64(file: File): Promise<ContactAttachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const dataBase64 = result.slice(result.indexOf(",") + 1);
      resolve({ filename: file.name, mimeType: file.type, dataBase64 });
    };
    reader.onerror = () => reject(reader.error ?? new Error("file_read_error"));
    reader.readAsDataURL(file);
  });
}
