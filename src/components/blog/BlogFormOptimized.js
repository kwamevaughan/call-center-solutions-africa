// BlogFormOptimized.jsx - Fast and user-friendly blog creation/editing modal
import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useRouter } from "next/router";
import { useBlog } from "../../hooks/useBlog";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import imageService from "@/lib/imageService";
import ItemActionModal from "../ItemActionModal";
import CollapsibleSection from "../common/CollapsibleSection";
import { Icon } from "@iconify/react";
import Image from "next/image";
import SEOAccordion from "./seo/SEOTabs";
import SmartFormValidation from "./SmartFormValidation";
import {
  calculateSEOScore,
  getScoreColor,
  getScoreBgColor,
  getScoreIcon,
} from "@/utils/seo";

// Lazy load heavy components
const BlogFormFields = React.lazy(() => import("./BlogFormFields"));
const BlogFormFieldsOptimized = React.lazy(() => import("./BlogFormFieldsOptimized"));
const ImageLibrary = React.lazy(() => import("../common/ImageLibrary"));

// Auto-save hook
const useAutoSave = (formData, editorContent, isEditing, delay = 30000) => {
  const [lastSaved, setLastSaved] = useState(null);
  const timeoutRef = useRef(null);

  const saveDraft = useCallback(async () => {
    if (!formData.article_name || !editorContent) return;
    
    try {
      const draftData = {
        ...formData,
        article_body: editorContent,
        is_draft: true,
        is_published: false,
        updated_at: new Date().toISOString(),
      };

      if (isEditing && formData.id) {
        await supabase
          .from("blogs")
          .update(draftData)
          .eq("id", formData.id);
      } else {
        await supabase
          .from("blogs")
          .insert(draftData);
      }

      setLastSaved(new Date());
      toast.success("Draft saved automatically", { duration: 2000 });
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  }, [formData, editorContent, isEditing]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (formData.article_name && editorContent) {
      timeoutRef.current = setTimeout(saveDraft, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [formData, editorContent, saveDraft, delay]);

  return { lastSaved, saveDraft };
};

// Keyboard shortcuts hook
const useKeyboardShortcuts = (onSave, onCancel, onPreview) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            onSave();
            break;
          case 'Enter':
            e.preventDefault();
            onSave();
            break;
          case 'Escape':
            e.preventDefault();
            onCancel();
            break;
          case 'p':
            e.preventDefault();
            onPreview();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSave, onCancel, onPreview]);
};

// Optimized image upload component
const OptimizedImageUpload = memo(({ 
  mode, 
  formData, 
  onImageChange, 
  onRemoveImage 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = useCallback(async (file) => {
    const validation = imageService.validateImage(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setUploading(true);
    try {
      const result = await imageService.uploadImage(file, {
        quality: 0.8,
        maxWidth: 1920,
        format: 'webp'
      });

      if (result.success) {
        onImageChange(result.data.url);
        setPreview(result.data.url);
        toast.success("Image uploaded successfully");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }, [onImageChange]);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : mode === "dark"
            ? "border-gray-600 bg-gray-800/50"
            : "border-gray-300 bg-gray-50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {uploading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-sm text-gray-500">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Icon 
              icon="heroicons:photo" 
              className="w-12 h-12 text-gray-400" 
            />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Drag and drop an image here, or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-500 underline"
                >
                  browse files
                </button>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, WebP up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={onRemoveImage}
            className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
          >
            <Icon icon="heroicons:x-mark" className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
});

OptimizedImageUpload.displayName = 'OptimizedImageUpload';

// Main BlogForm component
const BlogFormOptimized = memo(function BlogFormOptimized({
  mode,
  blogId,
  showForm,
  handleCancel,
  handleSubmit,
  fetchBlogs,
  formData: propFormData,
  handleInputChange: propHandleInputChange,
  loading: propLoading,
  categories: propCategories,
  tags: propTags,
  adminUser,
  standalone = false, // New prop to render without modal wrapper
}) {
  const router = useRouter();
  const { user } = useAuth();
  const {
    formData: hookFormData,
    setFormData,
    handleInputChange: hookHandleInputChange,
    categories: hookCategories,
    tags: hookTags,
    editorContent,
    setEditorContent,
    loading: hookLoading,
    handleCategoryAdded,
    handleTagAdded,
    handleEdit,
  } = useBlog(blogId);

  // Use props if available, otherwise fall back to hook values
  const formData = propFormData || hookFormData;
  const handleInputChange = propHandleInputChange || hookHandleInputChange;
  const loading = propLoading || hookLoading;
  const categories = propCategories || hookCategories;
  const tags = propTags || hookTags;
  
  // Debug logging
  console.log("BlogFormOptimized - propFormData:", propFormData);
  console.log("BlogFormOptimized - hookFormData:", hookFormData);
  console.log("BlogFormOptimized - final formData:", formData);

  // State management
  const [imageSource, setImageSource] = useState("upload");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddTag, setShowAddTag] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSEOCollapsed, setIsSEOCollapsed] = useState(true);
  const [isImageCollapsed, setIsImageCollapsed] = useState(true);
  const [isPublishingCollapsed, setIsPublishingCollapsed] = useState(true);

  // Memoized values
  const isEditing = useMemo(() => Boolean(blogId), [blogId]);
  const seoScore = useMemo(() => 
    calculateSEOScore(formData, editorContent), 
    [formData, editorContent]
  );

  // Update editor content when formData changes (for edit mode)
  useEffect(() => {
    console.log("BlogFormOptimized - formData.article_body:", formData.article_body);
    console.log("BlogFormOptimized - editorContent:", editorContent);
    console.log("BlogFormOptimized - isEditing:", isEditing);
    
    if (isEditing && formData.article_body && formData.article_body !== editorContent) {
      console.log("Updating editor content from formData:", formData.article_body);
      setEditorContent(formData.article_body);
    }
  }, [formData.article_body, isEditing, editorContent]);

  // Update selected tags when formData changes (for edit mode)
  useEffect(() => {
    if (isEditing && formData.tag_ids && formData.tag_ids.length > 0) {
      const tagNames = formData.tag_ids.map(tagId => {
        const tag = tags.find(t => t.id === tagId);
        return tag?.name;
      }).filter(Boolean);
      
      if (tagNames.length > 0 && JSON.stringify(tagNames) !== JSON.stringify(selectedTags)) {
        console.log("Updating selected tags from formData:", tagNames);
        setSelectedTags(tagNames);
      }
    }
  }, [formData.tag_ids, isEditing, tags, selectedTags]);

  // Update image source when formData changes (for edit mode)
  useEffect(() => {
    if (isEditing && formData.article_image && imageSource !== "library") {
      console.log("Updating image source from formData:", formData.article_image);
      setImageSource("library");
    }
  }, [formData.article_image, isEditing, imageSource]);

  // Reset form when showForm changes
  useEffect(() => {
    if (!showForm) {
      // Reset all form state when modal is closed
      if (setFormData) {
        setFormData({
          id: null,
          article_name: "",
          article_body: "",
          category_id: null,
          tag_ids: [],
          article_image: "",
          meta_title: "",
          meta_description: "",
          meta_keywords: "",
          slug: "",
          is_published: false,
          is_draft: true,
          publish_date: null,
          author: "",
          title: "",
          description: "",
          keywords: [],
          featured_image_url: "",
          featured_image_upload: null,
          featured_image_library: null,
          content: "",
          publish_option: "draft",
          scheduled_date: null,
          focus_keyword: "",
        });
      }
      setEditorContent("");
      setImageSource("upload");
      setSelectedTags([]);
      setCurrentBlogId(null);
    } else if (!blogId) {
      // Reset form when opening modal for new post
      if (setFormData) {
        setFormData({
          id: null,
          article_name: "",
          article_body: "",
          category_id: null,
          tag_ids: [],
          article_image: "",
          meta_title: "",
          meta_description: "",
          meta_keywords: "",
          slug: "",
          is_published: false,
          is_draft: true,
          publish_date: null,
          author: "",
          title: "",
          description: "",
          keywords: [],
          featured_image_url: "",
          featured_image_upload: null,
          featured_image_library: null,
          content: "",
          publish_option: "draft",
          scheduled_date: null,
          focus_keyword: "",
        });
      }
      setEditorContent("");
      setImageSource("upload");
      setSelectedTags([]);
      setCurrentBlogId(null);
    }
  }, [showForm, blogId, setFormData, setEditorContent]);

  // Add a separate effect to handle editor content reset
  useEffect(() => {
    if (!blogId && showForm) {
      // When creating a new blog, ensure editor content is cleared
      setEditorContent("");
    }
  }, [blogId, showForm, setEditorContent]);

  // Auto-save functionality
  const { lastSaved, saveDraft } = useAutoSave(formData, editorContent, isEditing);

  // Keyboard shortcuts
  const handleSave = useCallback(() => {
    // Trigger form submission
    const form = document.querySelector('form');
    if (form) {
      form.requestSubmit();
    }
  }, []);

  const handlePreview = useCallback(() => {
    if (formData.slug) {
      window.open(`https://callcentersolutionsafrica.com/blog/${formData.slug}`, '_blank');
    }
  }, [formData.slug]);

  useKeyboardShortcuts(handleSave, handleCancel, handlePreview);

  // Optimized form submission
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const imageUrl = 
        formData.featured_image_upload ||
        formData.featured_image_library ||
        formData.article_image ||
        "";

      const updatedFormData = {
        ...formData,
        article_image: imageUrl,
        featured_image_url: imageUrl,
        featured_image_library: imageSource === "library" ? imageUrl : formData.featured_image_library,
        article_body: editorContent || formData.article_body || "",
        content: editorContent || formData.content || "",
        article_tags: JSON.stringify(selectedTags),
        focus_keyword: formData.focus_keyword || "",
        seo_score: seoScore,
      };

      const success = await handleSubmit(e, updatedFormData);

      if (success) {
        setHasUnsavedChanges(false);
        if (typeof fetchBlogs === "function") {
          await fetchBlogs();
        }
        handleCancel();
        router.push("/admin/blogs");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }, [formData, editorContent, selectedTags, seoScore, handleSubmit, fetchBlogs, handleCancel, router, imageSource]);

  // Optimized image handling
  const handleImageChange = useCallback((url) => {
    handleInputChange({
      target: {
        name: "multiple",
        value: {
          article_image: url,
          featured_image_url: url,
          featured_image_library: url,
          featured_image_upload: "",
        },
      },
    });
  }, [handleInputChange]);

  const handleRemoveImage = useCallback(() => {
    handleInputChange({
      target: {
        name: "multiple",
        value: {
          article_image: "",
          featured_image_url: "",
          featured_image_upload: "",
          featured_image_library: "",
        },
      },
    });
  }, [handleInputChange]);

  // Optimized tag handling
  const handleTagSelect = useCallback((e) => {
    const tagName = typeof e === "string" ? e : e.target.value;
    if (!tagName) return;

    const tag = tags.find((t) => t.name === tagName);
    if (tag && !selectedTags.includes(tag.name)) {
      setSelectedTags((prev) => [...prev, tag.name]);
      if (setFormData) {
        setFormData((prev) => ({
          ...prev,
          tag_ids: [...(prev.tag_ids || []), tag.id],
        }));
      }
    }
    
    if (typeof e !== "string" && e.target) {
      e.target.value = "";
    }
  }, [tags, selectedTags, setFormData]);

  const handleTagRemove = useCallback((tagName) => {
    const tag = tags.find((t) => t.name === tagName);
    if (tag) {
      setSelectedTags((prev) => prev.filter((name) => name !== tagName));
      if (setFormData) {
        setFormData((prev) => ({
          ...prev,
          tag_ids: prev.tag_ids.filter((id) => id !== tag.id),
        }));
      }
    }
  }, [tags, setFormData]);

  // Quick actions toolbar
  const QuickActions = memo(() => (
    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <button
        type="button"
        onClick={saveDraft}
        className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        title="Save draft (Ctrl+S)"
      >
        <Icon icon="heroicons:document-arrow-down" className="w-4 h-4" />
        Save Draft
      </button>
      {lastSaved && (
        <span className="text-xs text-gray-500">
          Last saved: {lastSaved.toLocaleTimeString()}
        </span>
      )}
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Shortcuts:</span>
        <kbd className="px-1 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">Ctrl+S</kbd>
        <kbd className="px-1 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">Ctrl+Enter</kbd>
        <kbd className="px-1 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd>
      </div>
    </div>
  ));

  QuickActions.displayName = 'QuickActions';

  const formContent = (
    <>
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
            {/* Quick Actions Toolbar */}
            <QuickActions />

            {/* Main Form Fields */}
            <React.Suspense fallback={<div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />}>
              <BlogFormFieldsOptimized
                mode={mode}
                formData={formData}
                handleInputChange={handleInputChange}
                categories={categories}
                tags={tags}
                selectedTags={selectedTags}
                handleTagSelect={handleTagSelect}
                handleTagRemove={handleTagRemove}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                onAddCategory={() => setShowAddCategory(true)}
                onAddTag={() => setShowAddTag(true)}
              />
            </React.Suspense>

            {/* Content Validation */}
            <CollapsibleSection
              title="Content Analysis"
              description="Get intelligent feedback on your blog post"
              icon="heroicons:check-circle"
              isCollapsed={isSEOCollapsed}
              onToggle={() => setIsSEOCollapsed(!isSEOCollapsed)}
              mode={mode}
              rightElement={
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getScoreBgColor(seoScore, mode)}`}>
                  <span className={`text-sm font-medium ${getScoreColor(seoScore, mode)}`}>
                    Score: {seoScore}%
                  </span>
                  <Icon
                    icon={getScoreIcon(seoScore)}
                    className={`w-4 h-4 ${getScoreColor(seoScore, mode)}`}
                  />
                </div>
              }
            >
              <SmartFormValidation
                formData={formData}
                editorContent={editorContent}
                mode={mode}
                seoScore={seoScore}
              />
            </CollapsibleSection>

            {/* SEO Analysis */}
            <CollapsibleSection
              title="SEO Analysis"
              description="Detailed SEO optimization insights"
              icon="heroicons:chart-bar"
              isCollapsed={true}
              onToggle={() => {}}
              mode={mode}
            >
              <SEOAccordion
                formData={formData}
                editorContent={editorContent}
                mode={mode}
              />
            </CollapsibleSection>

            {/* Featured Image */}
            <CollapsibleSection
              title="Featured Image"
              description="Add a featured image for your blog post"
              icon="heroicons:photo"
              isCollapsed={isImageCollapsed}
              onToggle={() => setIsImageCollapsed(!isImageCollapsed)}
              mode={mode}
            >
              <OptimizedImageUpload
                mode={mode}
                formData={formData}
                onImageChange={handleImageChange}
                onRemoveImage={handleRemoveImage}
              />
            </CollapsibleSection>

            {/* Publishing Options */}
            <CollapsibleSection
              title="Publishing Options"
              description="Configure when and how to publish your blog post"
              icon="heroicons:clock"
              isCollapsed={isPublishingCollapsed}
              onToggle={() => setIsPublishingCollapsed(!isPublishingCollapsed)}
              mode={mode}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Author */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-bold ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    <Icon icon="heroicons:user" className="w-4 h-4" />
                    Author
                    <span className="text-red-500">*</span>
                  </label>
                  <div className={`px-4 py-2.5 rounded-xl border ${mode === "dark" ? "bg-gray-800 border-gray-700 text-gray-400" : "bg-gray-50 border-gray-300 text-gray-500"}`}>
                    {formData.author || "CCSA Admin"}
                  </div>
                </div>

                {/* Publish Status */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-bold ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    <Icon icon="heroicons:document-check" className="w-4 h-4" />
                    Publish Status
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['draft', 'publish', 'schedule'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleInputChange({
                          target: { name: "publish_option", value: option }
                        })}
                        className={`p-3 rounded-xl border transition-all duration-200 ${
                          formData.publish_option === option
                            ? mode === "dark"
                              ? "bg-blue-900/30 border-blue-700 shadow-lg shadow-blue-500/10"
                              : "bg-blue-50 border-blue-200 shadow-lg shadow-blue-500/10"
                            : mode === "dark"
                            ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                            : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`p-2 rounded-lg ${
                            formData.publish_option === option
                              ? mode === "dark" ? "bg-blue-900/50" : "bg-blue-100"
                              : mode === "dark" ? "bg-gray-700" : "bg-gray-100"
                          }`}>
                            <Icon
                              icon={
                                option === 'draft' ? 'heroicons:document-text' :
                                option === 'publish' ? 'heroicons:check-circle' :
                                'heroicons:clock'
                              }
                              className={`w-5 h-5 ${
                                formData.publish_option === option
                                  ? mode === "dark" ? "text-blue-400" : "text-blue-600"
                                  : mode === "dark" ? "text-gray-400" : "text-gray-500"
                              }`}
                            />
                          </div>
                          <span className={`text-sm font-medium ${
                            formData.publish_option === option
                              ? mode === "dark" ? "text-blue-400" : "text-blue-600"
                              : mode === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}>
                            {option === 'draft' ? 'Draft' : option === 'publish' ? 'Publish Now' : 'Schedule'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule Date */}
              {formData.publish_option === "schedule" && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-2">
                    <label className={`flex items-center gap-2 text-sm font-medium ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      <Icon icon="heroicons:calendar" className="w-4 h-4" />
                      Schedule Date
                    </label>
                    <input
                      type="datetime-local"
                      name="scheduled_date"
                      value={formData.scheduled_date || ""}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl border ${mode === "dark" ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-300 text-gray-900"} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
              )}
            </CollapsibleSection>

            {/* Action Buttons */}
            <div className="flex justify-between items-center sticky bottom-0 bg-white dark:bg-gray-900 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icon icon="heroicons:information-circle" className="w-4 h-4" />
                <span>Use Ctrl+S to save draft, Ctrl+Enter to publish, Esc to cancel</span>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className={`px-6 py-3 rounded-xl ${mode === "dark" ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"}
                </button>
              </div>
            </div>
          </form>
        )}
    </>
  );

  // If standalone mode, render without modal wrapper
  if (standalone) {
    return (
      <>
        <div className={`w-full ${mode === "dark" ? "bg-gray-900" : "bg-white"} rounded-2xl shadow-lg border ${mode === "dark" ? "border-gray-800" : "border-gray-200"} p-8`}>
          {/* Header */}
          <div className={`flex items-center justify-between mb-6 pb-4 border-b ${mode === "dark" ? "border-gray-700" : "border-gray-200"}`}>
            <h2 className={`text-2xl font-bold ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
              {isEditing ? "Edit Blog Post" : "Create Blog Post"}
            </h2>
            <div className="flex items-center gap-2">
              {isEditing && formData.slug && (
                <button
                  type="button"
                  onClick={handlePreview}
                  className={`p-2 rounded-lg transition ${mode === "dark" ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100 text-gray-700"}`}
                  title="Preview blog post (Ctrl+P)"
                >
                  <Icon icon="heroicons:eye" className="w-5 h-5" />
                </button>
              )}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getScoreBgColor(seoScore, mode)}`}
              >
                <span className={`text-sm font-medium ${getScoreColor(seoScore, mode)}`}>
                  Score: {seoScore}%
                </span>
                <Icon
                  icon={getScoreIcon(seoScore)}
                  className={`w-4 h-4 ${getScoreColor(seoScore, mode)}`}
                />
              </div>
            </div>
          </div>
          {formContent}
        </div>

        {/* Lazy loaded modals */}
        <React.Suspense fallback={null}>
          <ImageLibrary
            isOpen={showImageLibrary}
            onClose={() => setShowImageLibrary(false)}
            onSelect={(selectedImage) => {
              handleImageChange(selectedImage.url);
              setShowImageLibrary(false);
            }}
            mode={mode}
            folder="/Blog"
          />
        </React.Suspense>
      </>
    );
  }

  // Default modal mode
  return (
    <>
      <ItemActionModal
        isOpen={showForm}
        onClose={handleCancel}
        title={isEditing ? "Edit Blog Post" : "Create Blog Post"}
        mode={mode}
        width="max-w-6xl"
        hasUnsavedChanges={hasUnsavedChanges}
        rightElement={
          <div className="flex items-center gap-2">
            {isEditing && formData.slug && (
              <button
                type="button"
                onClick={handlePreview}
                className="p-2 rounded-lg hover:bg-white/20 text-white transition"
                title="Preview blog post (Ctrl+P)"
              >
                <Icon icon="heroicons:eye" className="w-5 h-5" />
              </button>
            )}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getScoreBgColor(seoScore, mode)}`}
            >
              <span className={`text-sm font-medium ${getScoreColor(seoScore, mode)}`}>
                Score: {seoScore}%
              </span>
              <Icon
                icon={getScoreIcon(seoScore)}
                className={`w-4 h-4 ${getScoreColor(seoScore, mode)}`}
              />
            </div>
          </div>
        }
      >
        {formContent}
      </ItemActionModal>

      {/* Lazy loaded modals */}
      <React.Suspense fallback={null}>
        <ImageLibrary
          isOpen={showImageLibrary}
          onClose={() => setShowImageLibrary(false)}
          onSelect={(selectedImage) => {
            handleImageChange(selectedImage.url);
            setShowImageLibrary(false);
          }}
          mode={mode}
          folder="/Blog"
        />
      </React.Suspense>
    </>
  );
});

BlogFormOptimized.displayName = 'BlogFormOptimized';

export default BlogFormOptimized;
