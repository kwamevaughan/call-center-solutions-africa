export type CcsaPublicDetails = {
  summary?: string;
  openings?: number;
  languages?: string[];
  hiring_timeline?: string;
  tags?: string[];
  about_company?: string[];
  role_overview?: string[];
  responsibilities?: string[];
  ideal_candidate?: string[];
  extra_sections?: { heading: string; items: string[] }[];
};

export type KaziPublicJob = {
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  description: string | null;
  requirements: { must_haves?: string[]; nice_to_haves?: string[] } | null;
  employment_type: string | null;
  work_mode: string | null;
  contract_duration: string | null;
  compensation: string | null;
  reports_to: string | null;
  public_details: CcsaPublicDetails | null;
  published_at: string | null;
  closes_at: string | null;
};

export type CcsaCareerJob = {
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  summary: string | null;
  employmentType: string | null;
  workMode: string | null;
  closingDate: string | null;
  publishedAt: string | null;
  openings?: number;
  languages?: string[];
  hiringTimeline?: string;
  tags?: string[];
  aboutCompany?: string[];
  roleOverview?: string[];
  responsibilities?: string[];
  requirements?: string[];
  idealCandidate?: string[];
  benefits?: string[];
  extraSections?: { _key: string; heading: string; items: string[] }[];
  status: "open";
};

const KAZI_COMPANY_SLUG = "ccsa";

function publicApiBaseUrl() {
  return process.env.KAZI_PUBLIC_API_URL?.replace(/\/$/, "") ?? null;
}

function lines(value: string | null) {
  return value
    ?.split(/\n|•/)
    .map((item) => item.trim().replace(/^-\s*/, ""))
    .filter(Boolean);
}

export function toCcsaCareerJob(job: KaziPublicJob): CcsaCareerJob {
  const details = job.public_details ?? {};
  const requirements = [
    ...(job.requirements?.must_haves ?? []),
    ...(job.requirements?.nice_to_haves ?? []),
  ];

  return {
    slug: job.slug,
    title: job.title,
    department: job.department,
    location: job.location,
    summary: details.summary ?? job.description,
    employmentType: job.employment_type,
    workMode: job.work_mode,
    closingDate: job.closes_at,
    publishedAt: job.published_at,
    openings: details.openings,
    languages: details.languages,
    hiringTimeline: details.hiring_timeline,
    tags: details.tags,
    aboutCompany: details.about_company,
    roleOverview: details.role_overview ?? lines(job.description),
    responsibilities: details.responsibilities,
    requirements,
    idealCandidate: details.ideal_candidate,
    extraSections: (details.extra_sections ?? []).map((section, index) => ({
      _key: `section-${index}`,
      heading: section.heading,
      items: section.items,
    })),
    status: "open",
  };
}

async function getPayload(path: string) {
  const baseUrl = publicApiBaseUrl();
  if (!baseUrl) return null;

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Could not read CCSA jobs from Kazi", error);
    return null;
  }
}

export async function getKaziJobs(): Promise<CcsaCareerJob[]> {
  const payload = (await getPayload(
    `/api/public/jobs?company=${KAZI_COMPANY_SLUG}`,
  )) as { jobs?: KaziPublicJob[] } | null;
  return (payload?.jobs ?? []).map(toCcsaCareerJob);
}

export async function getKaziJob(slug: string): Promise<CcsaCareerJob | null> {
  const payload = (await getPayload(
    `/api/public/jobs/${encodeURIComponent(slug)}?company=${KAZI_COMPANY_SLUG}`,
  )) as { job?: KaziPublicJob } | null;
  return payload?.job ? toCcsaCareerJob(payload.job) : null;
}
