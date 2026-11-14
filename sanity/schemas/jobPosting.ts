import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'jobPosting',
  title: 'Job Posting',
  type: 'document',
  groups: [
    { name: 'details', title: 'Job Details', default: true },
    { name: 'description', title: 'Description' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ─── Core ────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Sales', value: 'sales' },
          { title: 'Customer Experience (CX)', value: 'cx' },
          { title: 'Operations', value: 'operations' },
          { title: 'Technology', value: 'technology' },
          { title: 'Quality Assurance', value: 'qa' },
          { title: 'Human Resources', value: 'hr' },
          { title: 'Finance', value: 'finance' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'isDraft',
      title: 'Draft (hide from site)',
      type: 'boolean',
      group: 'details',
      description: 'Enable to hide this posting from the public site.',
      initialValue: false,
    }),
    defineField({
      name: 'closingDate',
      title: 'Application Closing Date',
      type: 'date',
      group: 'details',
      description: 'Leave blank for rolling applications. Once this date passes, the position is automatically shown as closed.',
      options: { dateFormat: 'MMMM D, YYYY' },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
      placeholder: 'e.g. Nairobi, Kenya (Hybrid / On-site)',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
          { title: 'Freelance', value: 'freelance' },
        ],
      },
      initialValue: 'full-time',
    }),
    defineField({
      name: 'openings',
      title: 'Number of Openings',
      type: 'number',
      group: 'details',
    }),
    defineField({
      name: 'hiringTimeline',
      title: 'Hiring Timeline',
      type: 'string',
      group: 'details',
      description: 'e.g. "Rolling Basis" or "Starting March 2026"',
    }),
    defineField({
      name: 'languages',
      title: 'Required Languages',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'details',
      description: 'e.g. English, Danish, French',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'details',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'details',
      description: 'Lower numbers appear first. Open positions are shown before closed.',
    }),

    // ─── Description ─────────────────────────────────────────────────────
    defineField({
      name: 'summary',
      title: 'Role Summary',
      description: 'Short paragraph shown in listing cards (1–2 sentences)',
      type: 'text',
      rows: 3,
      group: 'description',
    }),
    defineField({
      name: 'aboutCompany',
      title: 'About CCSA',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'description',
    }),
    defineField({
      name: 'roleOverview',
      title: 'Role Overview',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'description',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Key Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'description',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements / Qualifications',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'description',
    }),
    defineField({
      name: 'idealCandidate',
      title: 'Ideal Candidate',
      description: 'Who you are looking for (bullet list)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'description',
    }),
    defineField({
      name: 'benefits',
      title: 'What We Offer / Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'description',
    }),
    defineField({
      name: 'extraSections',
      title: 'Extra Sections',
      description: 'Any additional custom sections (e.g. "What to Expect", "Interview Process")',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'extraSection',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'items', type: 'array', of: [{ type: 'string' }], title: 'Items' },
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
      group: 'description',
    }),

    // ─── SEO ─────────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      status: 'status',
      location: 'location',
      department: 'department',
    },
    prepare({ title, status, location, department }) {
      const statusLabel = status === 'open' ? 'Open' : status === 'closed' ? 'Closed' : 'Draft'
      return {
        title,
        subtitle: `${statusLabel} · ${department ?? ''} · ${location ?? ''}`.replace(/· ·/g, '·').replace(/· $/,''),
      }
    },
  },
})
