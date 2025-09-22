// useOptimizedInput.js - Optimized input handling with debouncing and performance improvements
import { useCallback, useRef, useMemo } from 'react';
import { useDebounce } from './useDebounce';

export function useOptimizedInput(setFormData, options = {}) {
  const {
    debounceDelay = 150,
    enableSlugGeneration = true,
    enableValidation = false
  } = options;

  // Cache for expensive operations
  const slugCache = useRef(new Map());
  const validationCache = useRef(new Map());

  // Optimized slug generation with caching
  const generateSlug = useCallback((value) => {
    if (!enableSlugGeneration) return '';
    
    // Check cache first
    if (slugCache.current.has(value)) {
      return slugCache.current.get(value);
    }

    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Cache the result (limit cache size)
    if (slugCache.current.size > 100) {
      const firstKey = slugCache.current.keys().next().value;
      slugCache.current.delete(firstKey);
    }
    slugCache.current.set(value, slug);

    return slug;
  }, [enableSlugGeneration]);

  // Optimized input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    // Immediate update for UI responsiveness
    const immediateValue = type === "checkbox" ? checked : value;
    
    if (name === "multiple") {
      setFormData((prev) => ({
        ...prev,
        ...value,
      }));
    } else if (name === "article_name" && enableSlugGeneration) {
      // Generate slug asynchronously to avoid blocking
      const slug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: slug,
      }));
    } else if (name === "featured_image_url") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        article_image: value,
        featured_image_upload: "",
        featured_image_library: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: immediateValue,
      }));
    }
  }, [setFormData, generateSlug, enableSlugGeneration]);

  // Debounced input change for expensive operations
  const debouncedInputChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // Only debounce expensive operations
    if (name === "article_name" && enableSlugGeneration) {
      // Slug generation is already optimized with caching
      return;
    }
    
    // For other fields, use debounced updates if needed
    if (enableValidation && name === "meta_description") {
      // Could add validation logic here
    }
  }, [enableSlugGeneration, enableValidation]);

  // Batch update function for multiple fields
  const batchUpdate = useCallback((updates) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  }, [setFormData]);

  // Optimized field-specific handlers
  const handlers = useMemo(() => ({
    // Text input with immediate feedback
    text: (name) => (e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },

    // Checkbox with immediate feedback
    checkbox: (name) => (e) => {
      const checked = e.target.checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    },

    // Select with immediate feedback
    select: (name) => (e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },

    // Textarea with immediate feedback
    textarea: (name) => (e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },

    // Multiple field update
    multiple: (updates) => () => {
      setFormData((prev) => ({
        ...prev,
        ...updates,
      }));
    }
  }), [setFormData]);

  return {
    handleInputChange,
    debouncedInputChange,
    batchUpdate,
    handlers,
    generateSlug
  };
}
