import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const fullName = formData.get("fullName") as string | null;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const coverLetter = formData.get("coverLetter") as string | null;
  const jobSlug = formData.get("jobSlug") as string | null;
  const linkedin = formData.get("linkedin") as string | null;
  const resumeFile = formData.get("resume") as File | null;

  if (!fullName || !email || !jobSlug) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  if (!linkedin) {
    return NextResponse.json(
      { error: "Please add your LinkedIn profile URL" },
      { status: 400 },
    );
  }
  if (!resumeFile || resumeFile.size === 0) {
    return NextResponse.json(
      { error: "Please upload your CV" },
      { status: 400 },
    );
  }

  const kaziUrl = process.env.KAZI_PUBLIC_API_URL;
  if (!kaziUrl) {
    console.error("KAZI_PUBLIC_API_URL is not configured");
    return NextResponse.json(
      {
        error:
          "Applications are temporarily unavailable. Please try again shortly.",
      },
      { status: 503 },
    );
  }

  const kaziForm = new FormData();
  kaziForm.set("company_slug", "ccsa");
  kaziForm.set("job_slug", jobSlug);
  kaziForm.set("full_name", fullName);
  kaziForm.set("email", email);
  kaziForm.set("phone", phone ?? "");
  kaziForm.set("linkedin_url", linkedin);
  kaziForm.set("cover_message", coverLetter ?? "");
  kaziForm.set("source", "ccsa-careers");
  kaziForm.set("consented", "true");
  kaziForm.set("cv", resumeFile, resumeFile.name);

  try {
    const response = await fetch(
      `${kaziUrl.replace(/\/$/, "")}/api/hire/candidates/apply-with-cv`,
      { method: "POST", body: kaziForm, cache: "no-store" },
    );
    const result = await response.json().catch(() => ({}));
    if (!response.ok)
      return NextResponse.json(
        {
          error:
            result.error ??
            "We could not submit your application. Please try again.",
        },
        { status: response.status >= 500 ? 502 : response.status },
      );
    return NextResponse.json(
      { message: "Application submitted successfully" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Kazi application submission error", error);
    return NextResponse.json(
      {
        error:
          "Applications are temporarily unavailable. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
