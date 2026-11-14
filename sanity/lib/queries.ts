// ─── Field fragments ─────────────────────────────────────────────────────────

const authorFields = `
  _id,
  name,
  "slug": slug.current,
  image,
  role,
  bio,
  linkedin
`

const categoryFields =`
  _id,
  name,
  "slug": slug.current,
  description,
  color
`

export const postCardFields =`
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  excerpt,
  mainImageUrl,
  mainImage,
  publishedAt,
  isPublished,
  isDraft,
  isFeatured,
  tags,
  metaTitle,
  metaDescription,
  focusKeyword,
  metaKeywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  twitterCard,
  noIndex,
  "author": author->{ ${authorFields} },
  "categories": categories[]->{ ${categoryFields} }
`

/** Full post including body + rawHtml */
export const postFullFields =`
  ${postCardFields},
  body,
  rawHtml
`

// ─── Queries ─────────────────────────────────────────────────────────────────

/** Published posts, paginated */
export const postsQuery =`{
  "posts": *[_type == "post" && isPublished == true && isDraft == false]
    | order(publishedAt desc)
    [$start...$end] { ${postCardFields} },
  "total": count(*[_type == "post" && isPublished == true && isDraft == false])
}`

/** Posts filtered by category slug */
export const postsByCategoryQuery =`{
  "posts": *[_type == "post" && isPublished == true && isDraft == false
    && $categorySlug in categories[]->slug.current]
    | order(publishedAt desc)
    [$start...$end] { ${postCardFields} },
  "total": count(*[_type == "post" && isPublished == true && isDraft == false
    && $categorySlug in categories[]->slug.current])
}`

/** Posts matching a search term */
export const postsBySearchQuery =`{
  "posts": *[_type == "post" && isPublished == true && isDraft == false
    && (title match $search || excerpt match $search || metaKeywords match $search)]
    | order(publishedAt desc)
    [$start...$end] { ${postCardFields} },
  "total": count(*[_type == "post" && isPublished == true && isDraft == false
    && (title match $search || excerpt match $search || metaKeywords match $search)])
}`

/** Single post by slug (includes body) */
export const postBySlugQuery =`
  *[_type == "post" && slug.current == $slug && isPublished == true && isDraft == false][0] {
    ${postFullFields}
  }
`

/** Related posts (same category, exclude current) */
export const relatedPostsQuery =`
  *[_type == "post" && isPublished == true && isDraft == false
    && _id != $currentId
    && count((categories[]->_id)[@ in $categoryIds]) > 0]
    | order(publishedAt desc)
    [0...$limit] { ${postCardFields} }
`

/** Latest / featured posts */
export const featuredPostsQuery =`
  *[_type == "post" && isPublished == true && isDraft == false]
    | order(isFeatured desc, publishedAt desc)
    [0...$limit] { ${postCardFields} }
`

/** All categories */
export const categoriesQuery =`
  *[_type == "category"] | order(name asc) { ${categoryFields} }
`

/** All published slugs (for getStaticPaths) */
export const postSlugsQuery =`
  *[_type == "post" && isPublished == true && isDraft == false] {
    "slug": slug.current
  }
`

// ─── Careers ─────────────────────────────────────────────────────────────────

const jobFields =`
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  department,
  closingDate,
  "status": select(
    isDraft == true => "draft",
    closingDate != null && closingDate < now() => "closed",
    "open"
  ),
  location,
  employmentType,
  openings,
  hiringTimeline,
  languages,
  tags,
  publishedAt,
  order,
  summary,
  aboutCompany,
  roleOverview,
  responsibilities,
  requirements,
  idealCandidate,
  benefits,
  extraSections,
  metaTitle,
  metaDescription
`

/** All non-draft job postings, soonest closing date first */
export const jobPostingsQuery =`
  *[_type == "jobPosting" && isDraft != true]
    | order(closingDate asc, order asc, publishedAt desc) {
      ${jobFields}
    }
`

/** Single job by slug */
export const jobBySlugQuery =`
  *[_type == "jobPosting" && slug.current == $slug && isDraft != true][0] { ${jobFields} }
`

/** All job slugs */
export const jobSlugsQuery =`
  *[_type == "jobPosting" && isDraft != true] { "slug": slug.current }
`
