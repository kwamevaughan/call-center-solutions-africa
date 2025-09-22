// SmartFormValidation.jsx - Intelligent form validation with helpful hints
import React, { memo, useMemo } from 'react';
import { Icon } from '@iconify/react';

const SmartFormValidation = memo(function SmartFormValidation({
  formData,
  editorContent,
  mode,
  seoScore
}) {
  const validationChecks = useMemo(() => {
    const checks = [];

    // Title validation
    if (!formData.article_name) {
      checks.push({
        type: 'error',
        icon: 'heroicons:x-circle',
        title: 'Title Required',
        message: 'Your blog post needs a compelling title to attract readers.',
        suggestion: 'Write a clear, descriptive title that includes your main keyword.'
      });
    } else if (formData.article_name.length < 30) {
      checks.push({
        type: 'warning',
        icon: 'heroicons:exclamation-triangle',
        title: 'Title Too Short',
        message: 'Your title is shorter than the recommended 30 characters.',
        suggestion: 'Consider adding more descriptive words to improve SEO and click-through rates.'
      });
    } else if (formData.article_name.length > 60) {
      checks.push({
        type: 'warning',
        icon: 'heroicons:exclamation-triangle',
        title: 'Title Too Long',
        message: 'Your title is longer than 60 characters and may be truncated in search results.',
        suggestion: 'Shorten your title while keeping the most important keywords.'
      });
    }

    // Content validation
    if (!editorContent || editorContent.trim().length < 100) {
      checks.push({
        type: 'error',
        icon: 'heroicons:x-circle',
        title: 'Content Too Short',
        message: 'Your blog post needs more content to provide value to readers.',
        suggestion: 'Aim for at least 300 words to create a comprehensive, helpful article.'
      });
    } else {
      const wordCount = editorContent.split(/\s+/).filter(Boolean).length;
      if (wordCount < 300) {
        checks.push({
          type: 'warning',
          icon: 'heroicons:exclamation-triangle',
          title: 'Content Could Be Longer',
          message: `Your post has ${wordCount} words. Longer posts typically rank better.`,
          suggestion: 'Consider adding more detailed explanations, examples, or related information.'
        });
      }
    }

    // SEO validation
    if (!formData.focus_keyword) {
      checks.push({
        type: 'warning',
        icon: 'heroicons:exclamation-triangle',
        title: 'No Focus Keyword',
        message: 'Adding a focus keyword helps with SEO optimization.',
        suggestion: 'Choose a primary keyword that describes your main topic.'
      });
    } else {
      // Check keyword density
      const wordCount = editorContent?.split(/\s+/).filter(Boolean).length || 0;
      const keywordCount = (editorContent?.toLowerCase().match(new RegExp(formData.focus_keyword.toLowerCase(), 'g')) || []).length;
      const density = wordCount ? (keywordCount / wordCount) * 100 : 0;
      
      if (density < 0.5) {
        checks.push({
          type: 'warning',
          icon: 'heroicons:exclamation-triangle',
          title: 'Low Keyword Density',
          message: `Your focus keyword "${formData.focus_keyword}" appears ${keywordCount} times (${density.toFixed(1)}% density).`,
          suggestion: 'Consider using your focus keyword more naturally throughout the content.'
        });
      } else if (density > 2.5) {
        checks.push({
          type: 'warning',
          icon: 'heroicons:exclamation-triangle',
          title: 'High Keyword Density',
          message: `Your focus keyword "${formData.focus_keyword}" appears ${keywordCount} times (${density.toFixed(1)}% density).`,
          suggestion: 'Reduce keyword usage to avoid over-optimization penalties.'
        });
      }
    }

    // Meta description validation
    if (!formData.description) {
      checks.push({
        type: 'warning',
        icon: 'heroicons:exclamation-triangle',
        title: 'No Meta Description',
        message: 'A meta description helps your post appear better in search results.',
        suggestion: 'Write a compelling 120-160 character description that includes your focus keyword.'
      });
    } else if (formData.description.length < 120) {
      checks.push({
        type: 'warning',
        icon: 'heroicons:exclamation-triangle',
        title: 'Meta Description Too Short',
        message: 'Your meta description is shorter than the recommended 120 characters.',
        suggestion: 'Expand your description to provide more compelling information for search results.'
      });
    } else if (formData.description.length > 160) {
      checks.push({
        type: 'warning',
        icon: 'heroicons:exclamation-triangle',
        title: 'Meta Description Too Long',
        message: 'Your meta description may be truncated in search results.',
        suggestion: 'Shorten your description to 160 characters or less.'
      });
    }

    // Image validation
    if (!formData.article_image && !formData.featured_image_url) {
      checks.push({
        type: 'warning',
        icon: 'heroicons:exclamation-triangle',
        title: 'No Featured Image',
        message: 'A featured image makes your post more engaging and shareable.',
        suggestion: 'Add a high-quality, relevant image that represents your content.'
      });
    }

    // Category validation
    if (!formData.category_id) {
      checks.push({
        type: 'warning',
        icon: 'heroicons:exclamation-triangle',
        title: 'No Category Selected',
        message: 'Categorizing your post helps with organization and SEO.',
        suggestion: 'Choose the most relevant category for your content.'
      });
    }

    // Tags validation
    if (!formData.tag_ids || formData.tag_ids.length === 0) {
      checks.push({
        type: 'info',
        icon: 'heroicons:information-circle',
        title: 'No Tags Added',
        message: 'Tags help readers find related content and improve SEO.',
        suggestion: 'Add 3-5 relevant tags that describe your content topics.'
      });
    }

    // SEO Score validation
    if (seoScore < 50) {
      checks.push({
        type: 'error',
        icon: 'heroicons:x-circle',
        title: 'Low SEO Score',
        message: `Your current SEO score is ${seoScore}%. This may affect search rankings.`,
        suggestion: 'Focus on improving title, content structure, and keyword optimization.'
      });
    } else if (seoScore < 70) {
      checks.push({
        type: 'warning',
        icon: 'heroicons:exclamation-triangle',
        title: 'SEO Score Could Be Better',
        message: `Your current SEO score is ${seoScore}%. There's room for improvement.`,
        suggestion: 'Review the SEO suggestions above to boost your score.'
      });
    }

    return checks;
  }, [formData, editorContent, seoScore]);

  const errorCount = validationChecks.filter(check => check.type === 'error').length;
  const warningCount = validationChecks.filter(check => check.type === 'warning').length;
  const infoCount = validationChecks.filter(check => check.type === 'info').length;

  if (validationChecks.length === 0) {
    return (
      <div className={`p-4 rounded-xl border ${mode === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}>
        <div className="flex items-center gap-3">
          <Icon icon="heroicons:check-circle" className="w-6 h-6 text-green-500" />
          <div>
            <h3 className="font-semibold text-green-700 dark:text-green-400">All Good!</h3>
            <p className="text-sm text-green-600 dark:text-green-500">
              Your blog post meets all the recommended guidelines.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className={`p-4 rounded-xl border ${mode === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Content Analysis</h3>
          <div className="flex items-center gap-4 text-sm">
            {errorCount > 0 && (
              <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <Icon icon="heroicons:x-circle" className="w-4 h-4" />
                {errorCount} Error{errorCount !== 1 ? 's' : ''}
              </span>
            )}
            {warningCount > 0 && (
              <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                <Icon icon="heroicons:exclamation-triangle" className="w-4 h-4" />
                {warningCount} Warning{warningCount !== 1 ? 's' : ''}
              </span>
            )}
            {infoCount > 0 && (
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <Icon icon="heroicons:information-circle" className="w-4 h-4" />
                {infoCount} Suggestion{infoCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Validation checks */}
      <div className="space-y-3">
        {validationChecks.map((check, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${
              check.type === 'error'
                ? mode === 'dark'
                  ? 'bg-red-900/20 border-red-700'
                  : 'bg-red-50 border-red-200'
                : check.type === 'warning'
                ? mode === 'dark'
                  ? 'bg-yellow-900/20 border-yellow-700'
                  : 'bg-yellow-50 border-yellow-200'
                : mode === 'dark'
                ? 'bg-blue-900/20 border-blue-700'
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <Icon
                icon={check.icon}
                className={`w-5 h-5 mt-0.5 ${
                  check.type === 'error'
                    ? 'text-red-500'
                    : check.type === 'warning'
                    ? 'text-yellow-500'
                    : 'text-blue-500'
                }`}
              />
              <div className="flex-1">
                <h4
                  className={`font-semibold ${
                    check.type === 'error'
                      ? 'text-red-700 dark:text-red-400'
                      : check.type === 'warning'
                      ? 'text-yellow-700 dark:text-yellow-400'
                      : 'text-blue-700 dark:text-blue-400'
                  }`}
                >
                  {check.title}
                </h4>
                <p
                  className={`text-sm mt-1 ${
                    check.type === 'error'
                      ? 'text-red-600 dark:text-red-500'
                      : check.type === 'warning'
                      ? 'text-yellow-600 dark:text-yellow-500'
                      : 'text-blue-600 dark:text-blue-500'
                  }`}
                >
                  {check.message}
                </p>
                <p
                  className={`text-xs mt-2 font-medium ${
                    check.type === 'error'
                      ? 'text-red-700 dark:text-red-400'
                      : check.type === 'warning'
                      ? 'text-yellow-700 dark:text-yellow-400'
                      : 'text-blue-700 dark:text-blue-400'
                  }`}
                >
                  💡 {check.suggestion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

SmartFormValidation.displayName = 'SmartFormValidation';

export default SmartFormValidation;
