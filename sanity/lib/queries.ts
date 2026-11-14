// ─── Field fragments ─────────────────────────────────────────────────────────

const authorFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  image,
  role,
  bio,
  linkedin
`

const categoryFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  description,
  color
`

export const postCardFields = /* groq */ `
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
export const postFullFields = /* groq */ `
  ${postCardFields},
  body,
  rawHtml
`

// ─── Queries ─────────────────────────────────────────────────────────────────

/** Published posts, paginated */
export const postsQuery = /* groq */ `{
  "posts": *[_type == "post" && isPublished == true && isDraft == false]
    | order(publishedAt desc)
    [$start...$end] { ${postCardFields} },
  "total": count(*[_type == "post" && isPublished == true && isDraft == false])
}`

/** Posts filtered by category slug */
export const postsByCategoryQuery = /* groq */ `{
  "posts": *[_type == "post" && isPublished == true && isDraft == false
    && $categorySlug in categories[]->slug.current]
    | order(publishedAt desc)
    [$start...$end] { ${postCardFields} },
  "total": count(*[_type == "post" && isPublished == true && isDraft == false
    && $categorySlug in categories[]->slug.current])
}`

/** Posts matching a search term */
export const postsBySearchQuery = /* groq */ `{
  "posts": *[_type == "post" && isPublished == true && isDraft == false
    && (title match $search || excerpt match $search || metaKeywords match $search)]
    | order(publishedAt desc)
    [$start...$end] { ${postCardFields} },
  "total": count(*[_type == "post" && isPublished == true && isDraft == false
    && (title match $search || excerpt match $search || metaKeywords match $search)])
}`

/** Single post by slug (includes body) */
export const postBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug && isPublished == true && isDraft == false][0] {
    ${postFullFields}
  }
`

/** Related posts (same category, exclude current) */
export const relatedPostsQuery = /* groq */ `
  *[_type == "post" && isPublished == true && isDraft == false
    && _id != $currentId
    && count((categories[]->_id)[@ in $categoryIds]) > 0]
    | order(publishedAt desc)
    [0...$limit] { ${postCardFields} }
`

/** Latest / featured posts */
export const featuredPostsQuery = /* groq */ `
  *[_type == "post" && isPublished == true && isDraft == false]
    | order(isFeatured desc, publishedAt desc)
    [0...$limit] { ${postCardFields} }
`

/** All categories */
export const categoriesQuery = /* groq */ `
  *[_type == "category"] | order(name asc) { ${categoryFields} }
`

/** All published slugs (for getStaticPaths) */
export const postSlugsQuery = /* groq */ `
  *[_type == "post" && isPublished == true && isDraft == false] {
    "slug": slug.current
  }
`
