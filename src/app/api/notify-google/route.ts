import { NextResponse } from "next/server";
import { notifyGoogle } from "@/shared/lib/indexing";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { url } = body as { url?: string };
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    await notifyGoogle(url);
    return NextResponse.json({ message: "Google notified successfully" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Error in /api/notify-google:", err);
    return NextResponse.json(
      { error: "Failed to notify Google", details: msg },
      { status: 500 },
    );
  }
}
