import ApplicationForm from "@/features/careers/components/ApplicationForm";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "@sanity/lib/client";
import { jobBySlugQuery, jobSlugsQuery } from "@sanity/lib/queries";

const DEPT_LABELS: Record<string, string> = {
  sales: "Sales",
  cx: "Customer Experience",
  operations: "Operations",
  technology: "Technology",
  qa: "Quality Assurance",
  hr: "Human Resources",
  finance: "Finance",
  other: "Other",
};

const BulletList = ({ items }: { items?: string[] }) => {
  if (!items?.length) return null;
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-slate-600 leading-relaxed"
        >
          <Icon
            icon="mdi:check"
            width={16}
            height={16}
            className="text-ccsa-blue mt-1 shrink-0"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

const formatDeadline = (date?: string) =>
  date
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${date}T00:00:00Z`))
    : null;

export default function JobDetailPage({ job }: { job: any }) {
  if (!job) return null;

  const isClosed = job.status === "closed";
  const dept = DEPT_LABELS[job.department] ?? job.department;
  const languages = job.languages?.join(" · ");
  const deadline = formatDeadline(job.closingDate);

  const metaFields = [
    { icon: "mdi:map-marker-outline", label: "Location", value: job.location },
    { icon: "mdi:office-building-outline", label: "Department", value: dept },
    { icon: "mdi:briefcase-outline", label: "Type", value: job.employmentType },
    {
      icon: "mdi:account-multiple-outline",
      label: "Openings",
      value: job.openings
        ? `${job.openings} position${job.openings > 1 ? "s" : ""}`
        : null,
    },
    { icon: "mdi:translate", label: "Languages", value: languages },
    {
      icon: "mdi:calendar-clock-outline",
      label: "Timeline",
      value: job.hiringTimeline,
    },
    {
      icon: "mdi:calendar-alert-outline",
      label: "Application deadline",
      value: deadline,
    },
  ].filter((f) => f.value);

  return (
    <>
      <main className="min-h-screen bg-slate-50">
        {/* Hero — matches blog article header */}
        <div className="bg-gradient-to-br from-ccsa-dark-blue via-ccsa-dark-blue to-[#1a1f3a] py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Icon icon="mdi:chevron-right" width={14} height={14} />
              <Link
                href="/careers"
                className="hover:text-white transition-colors"
              >
                Careers
              </Link>
              <Icon icon="mdi:chevron-right" width={14} height={14} />
              <span className="text-white/80 truncate max-w-xs">
                {job.title}
              </span>
            </nav>

            <div className="text-center text-white">
              {/* Status badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm border rounded-full text-sm font-medium mb-6 ${
                  isClosed
                    ? "bg-white/10 border-white/20 text-white/60"
                    : "bg-white/10 border-white/20 text-white"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isClosed ? "bg-slate-400" : "bg-green-400 animate-pulse"}`}
                />
                {isClosed ? "Position Closed" : "Now Hiring"}
                {dept && <span className="text-white/40">·</span>}
                {dept && <span>{dept}</span>}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {job.title}
              </h1>

              {job.summary && (
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {job.summary}
                </p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap justify-center items-center gap-5 text-white/70 text-sm">
                {job.location && (
                  <span className="flex items-center gap-1.5">
                    <Icon
                      icon="mdi:map-marker-outline"
                      width={16}
                      height={16}
                    />
                    {job.location}
                  </span>
                )}
                {job.openings && (
                  <span className="flex items-center gap-1.5">
                    <Icon
                      icon="mdi:account-multiple-outline"
                      width={16}
                      height={16}
                    />
                    {job.openings} opening{job.openings > 1 ? "s" : ""}
                  </span>
                )}
                {languages && (
                  <span className="flex items-center gap-1.5">
                    <Icon icon="mdi:translate" width={16} height={16} />
                    {languages}
                  </span>
                )}
                {job.hiringTimeline && (
                  <span className="flex items-center gap-1.5">
                    <Icon
                      icon="mdi:calendar-clock-outline"
                      width={16}
                      height={16}
                    />
                    {job.hiringTimeline}
                  </span>
                )}
                {deadline && (
                  <span className="flex items-center gap-1.5">
                    <Icon
                      icon="mdi:calendar-alert-outline"
                      width={16}
                      height={16}
                    />
                    Apply by {deadline}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-2xl bg-ccsa-dark-blue text-white p-7">
                {/* Meta */}
                {metaFields.length > 0 && (
                  <dl className="space-y-4 mb-8">
                    {metaFields.map((f) => (
                      <div key={f.label} className="flex items-start gap-3">
                        <Icon
                          icon={f.icon}
                          width={16}
                          height={16}
                          className="text-ccsa-blue mt-0.5 shrink-0"
                        />
                        <div>
                          <dt className="text-xs text-white/40 uppercase tracking-wide">
                            {f.label}
                          </dt>
                          <dd className="text-sm text-white/90 mt-0.5">
                            {f.value}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                )}

                {/* CTA */}
                <div className="space-y-2 border-t border-white/10 pt-6">
                  {!isClosed ? (
                    <a
                      href="#application-form"
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-ccsa-blue text-white font-semibold rounded-xl hover:bg-ccsa-blue/90 transition-colors text-sm"
                    >
                      <Icon icon="mdi:send" width={18} height={18} />
                      Apply for This Role
                    </a>
                  ) : (
                    <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50">
                      This position is no longer accepting applications
                    </div>
                  )}
                  <Link
                    href="/careers"
                    className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-white/10 text-white/80 font-medium rounded-xl hover:bg-white/20 transition-colors text-sm"
                  >
                    <Icon icon="mdi:arrow-left" width={16} height={16} />
                    Back to All Positions
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="space-y-8">
              {job.aboutCompany?.length > 0 && (
                <Section title="About CCSA Africa">
                  {job.aboutCompany.map((para: any, i: number) => (
                    <p key={i} className="text-slate-600 leading-relaxed mb-3">
                      {para.children?.map((c: any) => c.text).join("") ?? para}
                    </p>
                  ))}
                </Section>
              )}

              {job.roleOverview?.length > 0 && (
                <Section title="Role Overview">
                  {job.roleOverview.map((para: any, i: number) => (
                    <p key={i} className="text-slate-600 leading-relaxed mb-3">
                      {para.children?.map((c: any) => c.text).join("") ?? para}
                    </p>
                  ))}
                </Section>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                {job.responsibilities?.length > 0 && (
                  <Section title="Key Responsibilities">
                    <BulletList items={job.responsibilities} />
                  </Section>
                )}
                {job.requirements?.length > 0 && (
                  <Section title="Requirements">
                    <BulletList items={job.requirements} />
                  </Section>
                )}
                {job.idealCandidate?.length > 0 && (
                  <Section title="Ideal Candidate">
                    <BulletList items={job.idealCandidate} />
                  </Section>
                )}
                {job.benefits?.length > 0 && (
                  <Section title="What We Offer">
                    <BulletList items={job.benefits} />
                  </Section>
                )}
                {job.extraSections?.map((s: any) => (
                  <Section key={s._key} title={s.heading}>
                    <BulletList items={s.items} />
                  </Section>
                ))}
              </div>

              {!isClosed && (
                <div id="application-form">
                  <ApplicationForm jobTitle={job.title} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-7">
      <h2 className="text-base font-semibold uppercase tracking-wide text-slate-400 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}
