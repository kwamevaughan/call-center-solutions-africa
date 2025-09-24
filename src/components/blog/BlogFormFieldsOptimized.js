// BlogFormFieldsOptimized.jsx - Optimized form fields with fast input handling
import React, { memo, useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";

// Lazy load the editor component
const EditorComponent = dynamic(
  () => import("../EditorComponent"),
  { ssr: false }
);

// Optimized input field component
const OptimizedInput = memo(function OptimizedInput({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  mode,
  className = "",
  ...props
}) {
  const handleChange = useCallback((e) => {
    onChange(e);
  }, [onChange]);

  return (
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2.5 rounded-xl border transition-colors ${
        mode === "dark"
          ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
      } focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
});

// Optimized textarea component
const OptimizedTextarea = memo(function OptimizedTextarea({
  name,
  value,
  onChange,
  placeholder,
  mode,
  rows = 3,
  className = "",
  ...props
}) {
  const handleChange = useCallback((e) => {
    onChange(e);
  }, [onChange]);

  return (
    <textarea
      name={name}
      value={value || ""}
      onChange={handleChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-4 py-2.5 rounded-xl border transition-colors resize-none ${
        mode === "dark"
          ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
      } focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
});

// Optimized select component
const OptimizedSelect = memo(function OptimizedSelect({
  name,
  value,
  onChange,
  options,
  placeholder,
  mode,
  className = "",
  ...props
}) {
  const handleChange = useCallback((e) => {
    onChange(e);
  }, [onChange]);

  return (
    <select
      name={name}
      value={value || ""}
      onChange={handleChange}
      className={`w-full px-4 py-2.5 rounded-xl border transition-colors ${
        mode === "dark"
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-300 text-gray-900"
      } focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.id || option.value} value={option.id || option.value}>
          {option.name || option.label}
        </option>
      ))}
    </select>
  );
});

// Main BlogFormFields component
const BlogFormFieldsOptimized = memo(function BlogFormFieldsOptimized({
  mode,
  formData,
  handleInputChange,
  categories,
  tags,
  selectedTags,
  handleTagSelect,
  handleTagRemove,
  editorContent,
  setEditorContent,
  onAddCategory,
  onAddTag,
}) {
  // Debug logging
  console.log("BlogFormFieldsOptimized - formData:", formData);
  console.log("BlogFormFieldsOptimized - editorContent:", editorContent);
  // Use the parent's handleInputChange function
  const memoizedHandlers = useMemo(() => ({
    title: (e) => handleInputChange(e),
    slug: (e) => handleInputChange(e),
    description: (e) => handleInputChange(e),
    category: (e) => handleInputChange(e),
    focusKeyword: (e) => handleInputChange(e),
    metaTitle: (e) => handleInputChange(e),
    metaDescription: (e) => handleInputChange(e),
    metaKeywords: (e) => handleInputChange(e),
    canonicalUrl: (e) => handleInputChange(e),
    ogTitle: (e) => handleInputChange(e),
    ogDescription: (e) => handleInputChange(e),
    twitterCard: (e) => handleInputChange(e),
  }), [handleInputChange]);

  // Optimized editor content change handler
  const handleEditorChange = useCallback((content) => {
    setEditorContent(content);
  }, [setEditorContent]);

  // Optimized tag selection
  const handleTagSelectOptimized = useCallback((e) => {
    handleTagSelect(e);
  }, [handleTagSelect]);

  // Optimized tag removal
  const handleTagRemoveOptimized = useCallback((tagName) => {
    handleTagRemove(tagName);
  }, [handleTagRemove]);

  return (
    <div className="space-y-6">
      {/* Title Field */}
      <div className="space-y-2">
        <label className={`flex items-center gap-2 text-sm font-bold ${
          mode === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
          <Icon icon="heroicons:document-text" className="w-4 h-4" />
          Blog Title
          <span className="text-red-500">*</span>
        </label>
        <OptimizedInput
          name="article_name"
          value={formData.article_name}
          onChange={memoizedHandlers.title}
          placeholder="Enter your blog title"
          mode={mode}
        />
        {formData.article_name && (
          <div className="text-xs text-gray-500">
            {formData.article_name.length}/60 characters
          </div>
        )}
      </div>

      {/* Slug Field */}
      <div className="space-y-2">
        <label className={`flex items-center gap-2 text-sm font-bold ${
          mode === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
          <Icon icon="heroicons:link" className="w-4 h-4" />
          URL Slug
        </label>
        <OptimizedInput
          name="slug"
          value={formData.slug}
          onChange={memoizedHandlers.slug}
          placeholder="url-slug"
          mode={mode}
        />
        {formData.slug && (
          <div className="text-xs text-gray-500">
            Preview: /blog/{formData.slug}
          </div>
        )}
      </div>

      {/* SEO Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
          <Icon icon="heroicons:chart-bar" className="w-5 h-5 text-blue-600" />
          <h3 className={`text-lg font-semibold ${
            mode === "dark" ? "text-gray-200" : "text-gray-800"
          }`}>
            SEO & Meta Data
          </h3>
        </div>

        {/* Meta Title */}
        <div className="space-y-2">
          <label className={`flex items-center gap-2 text-sm font-bold ${
            mode === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            <Icon icon="heroicons:document-text" className="w-4 h-4" />
            Meta Title
            <span className="text-red-500">*</span>
          </label>
          <OptimizedInput
            name="meta_title"
            value={formData.meta_title}
            onChange={memoizedHandlers.metaTitle}
            placeholder="SEO title for search engines (50-60 characters)"
            mode={mode}
          />
          {formData.meta_title && (
            <div className={`text-xs ${
              formData.meta_title.length > 60 ? "text-red-500" : 
              formData.meta_title.length < 50 ? "text-yellow-500" : "text-green-500"
            }`}>
              {formData.meta_title.length}/60 characters
              {formData.meta_title.length > 60 && " (Too long)"}
              {formData.meta_title.length < 50 && " (Too short)"}
            </div>
          )}
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <label className={`flex items-center gap-2 text-sm font-bold ${
            mode === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            <Icon icon="heroicons:document-text" className="w-4 h-4" />
            Meta Description
            <span className="text-red-500">*</span>
          </label>
          <OptimizedTextarea
            name="meta_description"
            value={formData.meta_description}
            onChange={memoizedHandlers.metaDescription}
            placeholder="Brief description for search engines (120-160 characters)"
            mode={mode}
            rows={3}
          />
          {formData.meta_description && (
            <div className={`text-xs ${
              formData.meta_description.length > 160 ? "text-red-500" : 
              formData.meta_description.length < 120 ? "text-yellow-500" : "text-green-500"
            }`}>
              {formData.meta_description.length}/160 characters
              {formData.meta_description.length > 160 && " (Too long)"}
              {formData.meta_description.length < 120 && " (Too short)"}
            </div>
          )}
        </div>

        {/* Focus Keyword */}
        <div className="space-y-2">
          <label className={`flex items-center gap-2 text-sm font-bold ${
            mode === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            <Icon icon="heroicons:key" className="w-4 h-4" />
            Focus Keyword
            <span className="text-red-500">*</span>
          </label>
          <OptimizedInput
            name="focus_keyword"
            value={formData.focus_keyword}
            onChange={memoizedHandlers.focusKeyword}
            placeholder="Enter your main keyword"
            mode={mode}
          />
          <div className="text-xs text-gray-500">
            The primary keyword you want to rank for
          </div>
        </div>

        {/* Meta Keywords */}
        <div className="space-y-2">
          <label className={`flex items-center gap-2 text-sm font-bold ${
            mode === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            <Icon icon="heroicons:tag" className="w-4 h-4" />
            Meta Keywords
          </label>
          <OptimizedTextarea
            name="meta_keywords"
            value={formData.meta_keywords}
            onChange={memoizedHandlers.metaKeywords}
            placeholder="Comma-separated keywords (e.g., call center, customer service, business)"
            mode={mode}
            rows={2}
          />
          <div className="text-xs text-gray-500">
            Additional keywords separated by commas
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <label className={`flex items-center gap-2 text-sm font-bold ${
          mode === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
          <Icon icon="heroicons:tag" className="w-4 h-4" />
          Category
          <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <OptimizedSelect
            name="category_id"
            value={formData.category_id}
            onChange={memoizedHandlers.category}
            options={categories || []}
            placeholder="Select a category"
            mode={mode}
            className="flex-1"
          />
          <button
            type="button"
            onClick={onAddCategory}
            className={`px-4 py-2.5 rounded-xl border transition-colors ${
              mode === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon icon="heroicons:plus" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tags Selection */}
      <div className="space-y-2">
        <label className={`flex items-center gap-2 text-sm font-bold ${
          mode === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
          <Icon icon="heroicons:tag" className="w-4 h-4" />
          Tags
        </label>
        <div className="flex gap-2">
          <OptimizedSelect
            name="tag_select"
            value=""
            onChange={handleTagSelectOptimized}
            options={tags?.filter(tag => !selectedTags.includes(tag.name)) || []}
            placeholder="Select tags"
            mode={mode}
            className="flex-1"
          />
          <button
            type="button"
            onClick={onAddTag}
            className={`px-4 py-2.5 rounded-xl border transition-colors ${
              mode === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon icon="heroicons:plus" className="w-4 h-4" />
          </button>
        </div>
        
        {/* Selected Tags */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((tagName) => (
              <span
                key={tagName}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  mode === "dark"
                    ? "bg-blue-900/30 text-blue-300 border border-blue-700"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}
              >
                {tagName}
                <button
                  type="button"
                  onClick={() => handleTagRemoveOptimized(tagName)}
                  className="hover:text-red-500 transition-colors"
                >
                  <Icon icon="heroicons:x-mark" className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Editor */}
      <div className="space-y-2">
        <label className={`flex items-center gap-2 text-sm font-bold ${
          mode === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
          <Icon icon="heroicons:pencil" className="w-4 h-4" />
          Content
          <span className="text-red-500">*</span>
        </label>
        <div className={`border rounded-xl overflow-hidden ${
          mode === "dark" ? "border-gray-700" : "border-gray-300"
        }`}>
          <EditorComponent
            content={editorContent}
            onChange={handleEditorChange}
            mode={mode}
          />
        </div>
        {editorContent && (
          <div className="text-xs text-gray-500">
            {editorContent.split(/\s+/).filter(Boolean).length} words
          </div>
        )}
      </div>
    </div>
  );
});

BlogFormFieldsOptimized.displayName = 'BlogFormFieldsOptimized';

export default BlogFormFieldsOptimized;
