/**
 * Migration: hardcoded careers components → Sanity jobPosting documents
 *
 * Run:  node scripts/migrate-careers-to-sanity.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnv(p) {
  try {
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('=')
      if (eq === -1) continue
      const k = t.slice(0, eq).trim()
      const v = t.slice(eq + 1).trim()
      if (!process.env[k]) process.env[k] = v
    }
  } catch {}
}

loadEnv(join(__dirname, '..', '.env'))

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'jf7k2yuf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

// ─── Hardcoded position data extracted from components ────────────────────────

const positions = [
  {
    _id: 'job-sales-executive',
    title: 'Sales Executive – Telesales & Omnichannel Growth',
    slug: 'sales-executive-telesales-omnichannel-growth',
    department: 'sales',
    status: 'open',
    location: 'Nairobi (Hybrid / On-site)',
    employmentType: 'full-time',
    openings: 10,
    hiringTimeline: 'Rolling Basis',
    languages: ['English'],
    tags: ['telesales', 'sales', 'omnichannel', 'CRM'],
    order: 1,
    summary:
      'We are seeking experienced, highly fluent English-speaking Sales Executives with a strong passion for telesales and omnichannel outreach.',
    aboutCompany: [
      'Call Center Solutions Africa (CCSA) is a fast-growing outsourced sales and customer engagement company serving businesses across Africa, Europe, and global markets. We specialize in high-performance telesales, lead conversion, and omnichannel outreach that directly drives revenue for our clients.',
      'We are building a world-class sales engine and are looking for driven sales professionals who thrive on targets, conversations, and closing deals.',
    ],
    roleOverview: [
      'We are seeking experienced, highly fluent English-speaking Sales Executives with a strong passion for telesales and omnichannel outreach. This role is ideal for self-motivated closers who enjoy engaging prospects, overcoming objections, and converting warm and cold leads into paying customers across phone, email, WhatsApp, and LinkedIn.',
      'You will be at the frontline of revenue generation, representing both CCSA and our clients, with clear performance metrics, structured playbooks, and strong leadership support.',
    ],
    responsibilities: [
      'Execute high-volume outbound telesales campaigns targeting qualified leads provided via CRM',
      'Engage prospects through omnichannel outreach (calls, email, WhatsApp, LinkedIn)',
      'Conduct needs discovery, qualify prospects, and confidently pitch client solutions',
      'Handle objections and close deals while maintaining high conversion rates',
      'Accurately update CRM systems with call outcomes, notes, and next actions',
      'Meet and exceed daily, weekly, and monthly sales targets',
      'Collaborate with QA, training, and team leads to continuously improve scripts and performance',
      'Maintain exceptional professionalism, tone, and clarity in all customer interactions',
    ],
    requirements: [
      '2+ years proven experience in telesales, inside sales, or call center sales',
      'Excellent spoken and written English — neutral accent, articulate, persuasive',
      'Demonstrated ability to consistently meet or exceed sales quotas',
      'Familiarity with CRM tools (HubSpot, Salesforce, Zoho, etc.)',
      'Strong active listening, objection handling, and negotiation skills',
      'High energy, resilient under pressure, and goal-oriented mindset',
    ],
    idealCandidate: [
      'Ambitious and self-motivated with a proven track record in sales',
      'Comfortable making 60–100+ calls per day',
      'Resourceful: you don\'t wait to be told — you find a way to get it done',
      'A team player who lifts others and celebrates wins collectively',
      'Detail-oriented — accurate CRM logging and pipeline hygiene matter to you',
    ],
    benefits: [
      'Competitive base salary + uncapped commissions',
      'Performance bonuses and incentive trips',
      'Structured onboarding, sales training, and coaching',
      'Clear career path: Senior Sales Executive → Team Lead → Sales Manager',
      'Dynamic, high-energy work culture with a winning mindset',
      'Exposure to international clients across Europe, the UK, and Africa',
    ],
    publishedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    _id: 'job-danish-customer-service',
    title: 'Customer Service Executive (Danish Speaking)',
    slug: 'customer-service-executive-danish-speaking',
    department: 'cx',
    status: 'open',
    location: 'Nairobi, Kenya (On-site / Hybrid)',
    employmentType: 'full-time',
    openings: null,
    hiringTimeline: 'Rolling Basis',
    languages: ['Danish', 'English'],
    tags: ['customer service', 'Danish', 'Nordic', 'multilingual', 'CX'],
    order: 2,
    summary:
      'We are expanding our Nordic-language support capability and are looking for Danish-speaking Customer Service Executives who take pride in delivering clear, professional, and empathetic customer support.',
    aboutCompany: [
      'Call Center Solutions Africa (CCSA) is a fast-growing customer experience and sales outsourcing company supporting clients across Europe, the UK, and global markets. We deliver high-quality, multilingual customer support, telesales, and omnichannel engagement through disciplined processes, trained talent, and strong performance management.',
      'We are expanding our Nordic-language support capability and are looking for Danish-speaking Customer Service Executives who take pride in delivering clear, professional, and empathetic customer support.',
    ],
    roleOverview: [
      'As a Customer Service Executive (Danish-speaking), you will be the primary point of contact for Danish-speaking customers of our international clients. Your role is to deliver timely, professional, and empathetic support across inbound and outbound channels including phone, email, chat, and WhatsApp.',
      'You must be highly proficient in both Danish and English, with strong communication skills and a service-first attitude.',
    ],
    responsibilities: [
      'Handle inbound and outbound customer interactions in Danish across phone, email, chat, and WhatsApp',
      'Resolve customer queries, complaints, and requests within defined SLAs',
      'Accurately document all customer interactions in the CRM system',
      'Escalate complex issues to the relevant teams or supervisors when needed',
      'Maintain a positive, empathetic, and professional tone in all customer interactions',
      'Meet or exceed daily KPIs including CSAT, FCR, AHT, and Quality scores',
      'Participate in team briefings, coaching sessions, and performance reviews',
    ],
    requirements: [
      'Fluent in Danish — spoken and written (C1 or native level)',
      'Strong English communication skills',
      'Previous experience in customer service, BPO, or contact center environments is an advantage',
      'Proficient in using CRM and ticketing tools',
      'Ability to work in shifts, including weekends if required',
      'Patient, empathetic, and solution-oriented attitude',
    ],
    idealCandidate: [
      'A natural communicator who finds joy in helping people',
      'Detail-oriented — you get things right the first time',
      'Adaptable — you handle complex or emotional customers with calm and structure',
      'Comfortable in a performance-driven environment with clear KPIs',
      'A team player who also takes initiative independently',
    ],
    benefits: [
      'Competitive salary reflective of Danish language skills',
      'Performance bonuses based on CSAT and quality scores',
      'Paid training and onboarding for client processes and tools',
      'Clear growth path: Senior Agent → Team Lead → Quality Analyst',
      'Work in a multilingual, international team environment',
      'Exposure to Nordic market clients and business culture',
    ],
    publishedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    _id: 'job-customer-service-agents',
    title: 'Customer Service Agents',
    slug: 'customer-service-agents',
    department: 'cx',
    status: 'closed',
    location: 'Nairobi, Kenya',
    employmentType: 'full-time',
    openings: null,
    hiringTimeline: 'Flexible Hours',
    languages: ['English'],
    tags: ['customer service', 'CX', 'inbound', 'outbound'],
    order: 3,
    summary:
      'We were seeking dedicated and customer-focused Customer Service Agents to join our dynamic team as the first point of contact for our clients\' customers.',
    aboutCompany: [
      'Call Center Solutions Africa (CCSA) is a leading provider of outsourced customer service and sales solutions across Africa and global markets.',
    ],
    roleOverview: [
      'We were seeking dedicated and customer-focused Customer Service Agents to join our dynamic team. As a Customer Service Agent, you would be the first point of contact for our clients\' customers, providing exceptional service and support across various communication channels.',
    ],
    responsibilities: [
      'Handle inbound and outbound customer calls professionally',
      'Resolve customer complaints and inquiries efficiently',
      'Maintain accurate records of customer interactions in CRM systems',
      'Collaborate with team members to ensure consistent service quality',
      'Meet performance KPIs including call quality, FCR, and CSAT scores',
    ],
    requirements: [
      'Excellent communication skills in English',
      'Customer-focused mindset with strong problem-solving abilities',
      'Basic computer proficiency',
      'Previous customer service experience preferred',
      'Ability to work in a fast-paced environment',
    ],
    idealCandidate: [
      'Empathetic and patient with a positive attitude',
      'Quick learner who adapts to new processes and tools',
      'Team player with a strong work ethic',
    ],
    benefits: [
      'Competitive salary package',
      'Performance-based bonuses',
      'Professional training and development',
      'Career growth opportunities within CCSA',
    ],
    publishedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    _id: 'job-customer-service-team-lead',
    title: 'Customer Service Team Lead',
    slug: 'customer-service-team-lead',
    department: 'cx',
    status: 'closed',
    location: 'Nairobi, Kenya',
    employmentType: 'full-time',
    openings: null,
    hiringTimeline: null,
    languages: ['English'],
    tags: ['team lead', 'management', 'CX', 'customer service'],
    order: 4,
    summary:
      'We were looking for an experienced Team Lead to manage and coach a team of customer service agents, drive performance, and ensure exceptional service delivery.',
    aboutCompany: [
      'Call Center Solutions Africa (CCSA) is a leading provider of outsourced customer service and sales solutions. We are known for our commitment to quality, performance-driven culture, and empowering our teams.',
    ],
    roleOverview: [
      'The Customer Service Team Lead oversees a team of agents, ensures KPI targets are met, conducts coaching and quality monitoring, and acts as the primary escalation point for complex customer issues.',
    ],
    responsibilities: [
      'Manage and coach a team of 10–15 customer service agents',
      'Monitor team KPIs including CSAT, FCR, AHT, and adherence',
      'Conduct regular 1-on-1 coaching and performance reviews',
      'Handle escalated customer complaints and ensure timely resolution',
      'Collaborate with QA and training teams to improve agent performance',
      'Report team performance metrics to management weekly',
      'Create shift schedules and manage attendance',
    ],
    requirements: [
      '3+ years of experience in a customer service or BPO environment',
      '1+ year of supervisory or team lead experience',
      'Strong coaching and feedback skills',
      'Proficiency in CRM and workforce management tools',
      'Excellent spoken and written English',
      'Analytical mindset with ability to interpret performance data',
    ],
    idealCandidate: [
      'A natural leader who leads by example',
      'Data-driven and performance-focused',
      'Empathetic communicator who motivates teams through challenges',
      'Organized and calm under pressure',
    ],
    benefits: [
      'Competitive management-level salary',
      'Leadership development programs',
      'Direct career path to Operations Manager',
      'Team performance bonuses',
    ],
    publishedAt: '2024-01-01T00:00:00.000Z',
  },
]

// ─── Build mutations ──────────────────────────────────────────────────────────

function textToBlocks(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `block-${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `span-${i}`, text, marks: [] }],
  }))
}

async function main() {
  console.log('🚀 Migrating careers to Sanity...')

  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ SANITY_WRITE_TOKEN not set')
    process.exit(1)
  }

  for (const pos of positions) {
    const doc = {
      _id: pos._id,
      _type: 'jobPosting',
      title: pos.title,
      slug: { _type: 'slug', current: pos.slug },
      department: pos.department,
      status: pos.status,
      location: pos.location,
      employmentType: pos.employmentType,
      ...(pos.openings ? { openings: pos.openings } : {}),
      ...(pos.hiringTimeline ? { hiringTimeline: pos.hiringTimeline } : {}),
      languages: pos.languages ?? [],
      tags: pos.tags ?? [],
      order: pos.order,
      summary: pos.summary,
      aboutCompany: textToBlocks(pos.aboutCompany),
      roleOverview: textToBlocks(pos.roleOverview),
      responsibilities: pos.responsibilities,
      requirements: pos.requirements,
      idealCandidate: pos.idealCandidate,
      benefits: pos.benefits,
      publishedAt: pos.publishedAt,
    }

    await sanity.createOrReplace(doc)
    console.log(`  ✅ "${pos.title}" [${pos.status}]`)
  }

  console.log('\n🎉 All careers migrated!')
}

main().catch((err) => { console.error('❌', err.message); process.exit(1) })
