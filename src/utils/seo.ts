// Helper function to strip HTML and get plain text
const stripHTML = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

// Helper function to count words in text (excluding HTML)
const countWords = (text) => {
  if (!text) return 0;
  const plainText = stripHTML(text);
  return plainText.split(/\s+/).filter(Boolean).length;
};

// Helper function to check if keyword exists (handles multi-word keywords)
const hasKeyword = (text, keyword) => {
  if (!text || !keyword) return false;
  const normalizedText = text.toLowerCase();
  const normalizedKeyword = keyword.toLowerCase();
  return normalizedText.includes(normalizedKeyword);
};

export const calculateSEOScore = (formData, editorContent) => {
  let score = 0;
  let totalChecks = 0;
  const focusKeyword = formData.focus_keyword || '';
  const plainTextContent = stripHTML(editorContent || '');
  const wordCount = countWords(editorContent || '');

  // ===== BASIC SEO CHECKS (Weight: 30%) =====
  
  // 1. Title length (30-60 characters is optimal)
  const titleLength = (formData.article_name || '').length;
  if (titleLength >= 30 && titleLength <= 60) {
    score += 2; // Optimal range
  } else if (titleLength >= 20 && titleLength <= 70) {
    score += 1; // Acceptable range
  }
  totalChecks += 2;

  // 2. Focus keyword in title
  if (hasKeyword(formData.article_name, focusKeyword)) {
    score += 2;
  }
  totalChecks += 2;

  // 3. Meta description length (120-160 characters is optimal)
  const descLength = (formData.description || formData.meta_description || '').length;
  if (descLength >= 120 && descLength <= 160) {
    score += 2;
  } else if (descLength >= 100 && descLength <= 180) {
    score += 1;
  }
  totalChecks += 2;

  // 4. Focus keyword in meta description
  if (hasKeyword(formData.description || formData.meta_description, focusKeyword)) {
    score += 2;
  }
  totalChecks += 2;

  // 5. Slug/URL length (should be <= 60 characters)
  const slugLength = (formData.slug || '').length;
  if (slugLength > 0 && slugLength <= 60) {
    score += 2;
  } else if (slugLength > 60 && slugLength <= 75) {
    score += 1;
  }
  totalChecks += 2;

  // 6. Focus keyword in slug
  if (hasKeyword(formData.slug, focusKeyword)) {
    score += 2;
  }
  totalChecks += 2;

  // 7. Content length (minimum 300 words, optimal 600+)
  if (wordCount >= 600) {
    score += 2;
  } else if (wordCount >= 300) {
    score += 1;
  }
  totalChecks += 2;

  // 8. Focus keyword in content
  if (hasKeyword(plainTextContent, focusKeyword)) {
    score += 2;
  }
  totalChecks += 2;

  // ===== CONTENT STRUCTURE CHECKS (Weight: 25%) =====

  // 9. Heading structure (H2-H4)
  const headings = editorContent?.match(/<h[2-4][^>]*>.*?<\/h[2-4]>/gi) || [];
  const headingCount = headings.length;
  if (headingCount >= 3) {
    score += 2;
  } else if (headingCount >= 1) {
    score += 1;
  }
  totalChecks += 2;

  // 10. Focus keyword in headings
  if (headings.some(h => hasKeyword(h, focusKeyword))) {
    score += 2;
  }
  totalChecks += 2;

  // 11. Images with alt text
  const images = editorContent?.match(/<img[^>]*>/gi) || [];
  const imagesWithAlt = images.filter(img => /alt=["'][^"']+["']/i.test(img)).length;
  if (images.length > 0) {
    if (imagesWithAlt === images.length) {
      score += 2; // All images have alt text
    } else if (imagesWithAlt > 0) {
      score += 1; // Some images have alt text
    }
  }
  totalChecks += 2;

  // 12. Focus keyword in alt text
  const altTexts = editorContent?.match(/alt=["']([^"']+)["']/gi) || [];
  if (altTexts.some(alt => hasKeyword(alt, focusKeyword))) {
    score += 2;
  }
  totalChecks += 2;

  // 13. Featured image
  if (formData.article_image || formData.featured_image_url) {
    score += 2;
  }
  totalChecks += 2;

  // ===== KEYWORD OPTIMIZATION (Weight: 20%) =====

  // 14. Keyword density (0.5% - 2.5% is optimal)
  let keywordDensity = 0;
  if (focusKeyword && wordCount > 0) {
    const keywordMatches = (plainTextContent.match(new RegExp(focusKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
    keywordDensity = (keywordMatches / wordCount) * 100;
    
    if (keywordDensity >= 0.5 && keywordDensity <= 2.5) {
      score += 2;
    } else if (keywordDensity >= 0.3 && keywordDensity <= 3.0) {
      score += 1;
    }
  }
  totalChecks += 2;

  // 15. Keyword in first paragraph
  const firstParagraph = plainTextContent.split(/\n\n/)[0] || plainTextContent.substring(0, 200);
  if (hasKeyword(firstParagraph, focusKeyword)) {
    score += 2;
  }
  totalChecks += 2;

  // 16. Keyword placement in title (first 3 words)
  const titleWords = (formData.article_name || '').toLowerCase().split(/\s+/).slice(0, 3).join(' ');
  if (hasKeyword(titleWords, focusKeyword)) {
    score += 1;
  }
  totalChecks += 1;

  // ===== LINKS & ENGAGEMENT (Weight: 15%) =====

  // 17. Internal links
  const internalLinks = (editorContent?.match(/href=["']\/[^"']*["']/gi) || []).length;
  if (internalLinks >= 2) {
    score += 2;
  } else if (internalLinks >= 1) {
    score += 1;
  }
  totalChecks += 2;

  // 18. External links
  const externalLinks = (editorContent?.match(/href=["']https?:\/\//gi) || []).length;
  if (externalLinks >= 1) {
    score += 2;
  }
  totalChecks += 2;

  // 19. Link balance (should have both internal and external)
  if (internalLinks > 0 && externalLinks > 0) {
    score += 1;
  }
  totalChecks += 1;

  // ===== READABILITY & UX (Weight: 10%) =====

  // 20. Paragraph length (should be <= 150 words per paragraph)
  const paragraphs = editorContent?.split(/<\/p>/i) || [];
  const validParagraphs = paragraphs.filter(p => {
    const paraText = stripHTML(p);
    return paraText.trim().length > 0;
  });
  const avgParaLength = validParagraphs.length > 0 
    ? validParagraphs.reduce((sum, p) => sum + countWords(p), 0) / validParagraphs.length 
    : 0;
  
  if (avgParaLength > 0 && avgParaLength <= 150) {
    score += 1;
  }
  totalChecks += 1;

  // 21. Meta tags completeness
  const hasMetaTitle = !!(formData.meta_title || formData.article_name);
  const hasMetaDesc = !!(formData.meta_description || formData.description);
  const hasMetaKeywords = !!(formData.meta_keywords || formData.keywords?.length > 0);
  
  if (hasMetaTitle && hasMetaDesc && hasMetaKeywords) {
    score += 1;
  }
  totalChecks += 1;

  // Calculate final score
  const finalScore = totalChecks > 0 ? Math.round((score / totalChecks) * 100) : 0;
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, finalScore));
};

export const getScoreColor = (score, mode) => {
  if (score >= 90) return mode === 'dark' ? 'text-green-400' : 'text-green-600';
  if (score >= 80) return mode === 'dark' ? 'text-blue-400' : 'text-blue-600';
  if (score >= 70) return mode === 'dark' ? 'text-yellow-400' : 'text-yellow-600';
  if (score >= 60) return mode === 'dark' ? 'text-orange-400' : 'text-orange-600';
  return mode === 'dark' ? 'text-red-400' : 'text-red-600';
};

export const getScoreBgColor = (score, mode) => {
  if (score >= 90) return mode === 'dark' ? 'bg-green-900/20' : 'bg-green-50';
  if (score >= 80) return mode === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50';
  if (score >= 70) return mode === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50';
  if (score >= 60) return mode === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50';
  return mode === 'dark' ? 'bg-red-900/20' : 'bg-red-50';
};

export const getScoreIcon = (score) => {
  if (score >= 90) return 'heroicons:star';
  if (score >= 80) return 'heroicons:check-circle';
  if (score >= 70) return 'heroicons:exclamation-circle';
  if (score >= 60) return 'heroicons:exclamation-triangle';
  return 'heroicons:x-circle';
}; 