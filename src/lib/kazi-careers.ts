type KaziJob = {
  slug: string;
  title: string;
  location: string | null;
  employment_type: string | null;
  closes_at: string | null;
};

const KAZI_COMPANY_SLUG = "ccsa";

function publicApiBaseUrl() {
  return process.env.KAZI_PUBLIC_API_URL?.replace(/\/$/, "") ?? null;
}

/**
 * Public, cacheable read model for the CCSA careers site. A mapped Kazi role
 * is the source of truth for whether a role is still open; Sanity continues to
 * hold CCSA's richer editorial sections and canonical page slug.
 */
/** `undefined` means Kazi could not be reached; `null` means the mapped role is closed. */
export async function getKaziOpenJob(
  slug: string,
): Promise<KaziJob | null | undefined> {
  const baseUrl = publicApiBaseUrl();
  if (!baseUrl || !slug) return undefined;

  try {
    const response = await fetch(
      `${baseUrl}/api/public/jobs/${encodeURIComponent(slug)}?company=${KAZI_COMPANY_SLUG}`,
      { next: { revalidate: 60 } },
    );
    if (response.status === 404) return null;
    if (!response.ok) return undefined;
    const payload = (await response.json()) as { job?: KaziJob };
    return payload.job ?? null;
  } catch (error) {
    console.error("Could not read the Kazi public job", error);
    return undefined;
  }
}

export async function keepOpenKaziJobs<T extends { kaziJobSlug?: string }>(
  jobs: T[],
): Promise<T[]> {
  if (!publicApiBaseUrl()) return jobs;
  const availability = await Promise.all(
    jobs.map(async (job) => ({
      job,
      open:
        !job.kaziJobSlug || (await getKaziOpenJob(job.kaziJobSlug)) !== null,
    })),
  );
  return availability.filter(({ open }) => open).map(({ job }) => job);
}

export function mergeKaziJob<T extends Record<string, unknown>>(
  job: T,
  kaziJob: KaziJob | null | undefined,
): T & { status: "open" | "closed" } {
  if (kaziJob === null) return { ...job, status: "closed" };
  if (!kaziJob) return { ...job, status: "open" };
  return {
    ...job,
    title: kaziJob.title || job.title,
    location: kaziJob.location || job.location,
    employmentType: kaziJob.employment_type || job.employmentType,
    closesAt: kaziJob.closes_at || job.closingDate,
    status: "open",
  };
}
