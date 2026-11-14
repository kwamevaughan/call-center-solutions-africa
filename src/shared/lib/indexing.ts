import { google } from "googleapis";

const authClient = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || "{}"),
  scopes: ["https://www.googleapis.com/auth/indexing"],
});
const indexing = google.indexing({ version: "v3", auth: authClient });

export async function notifyGoogle(url: string): Promise<unknown> {
  try {
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: "URL_UPDATED",
      },
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as { message?: string; stack?: string; code?: string; details?: unknown };
    console.error("Indexing API error:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
      details: err.details,
    });
    throw error;
  }
}
