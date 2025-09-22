// lib/imageService.js - Optimized image upload and processing service
import apiClient from './apiClient';

class ImageService {
  constructor() {
    this.uploadQueue = [];
    this.isProcessing = false;
    this.maxConcurrentUploads = 3;
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  // Optimized image upload with compression and resizing
  async uploadImage(file, options = {}) {
    const {
      folder = '/Blog',
      quality = 0.8,
      maxWidth = 1920,
      maxHeight = 1080,
      format = 'webp'
    } = options;

    try {
      // Compress and resize image before upload
      const processedFile = await this.processImage(file, {
        quality,
        maxWidth,
        maxHeight,
        format
      });

      // Create FormData
      const formData = new FormData();
      formData.append('file', processedFile);
      formData.append('folder', folder);

      // Upload with retry logic
      const response = await this.uploadWithRetry(formData);
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Image upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Process image for optimization
  async processImage(file, options = {}) {
    const {
      quality = 0.8,
      maxWidth = 1920,
      maxHeight = 1080,
      format = 'webp'
    } = options;

    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to process image'));
            }
          },
          `image/${format}`,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  // Upload with retry logic
  async uploadWithRetry(formData, attempts = this.retryAttempts) {
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await fetch('/api/imagekit/upload-file', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        if (i === attempts - 1) {
          throw error;
        }
        
        // Wait before retry
        await new Promise(resolve => 
          setTimeout(resolve, this.retryDelay * (i + 1))
        );
      }
    }
  }

  // Batch upload multiple images
  async uploadMultiple(images, options = {}) {
    const results = [];
    const batches = this.chunkArray(images, this.maxConcurrentUploads);

    for (const batch of batches) {
      const batchPromises = batch.map(image => 
        this.uploadImage(image, options)
      );
      
      const batchResults = await Promise.allSettled(batchPromises);
      results.push(...batchResults);
    }

    return results;
  }

  // Queue upload for later processing
  queueUpload(file, options = {}) {
    return new Promise((resolve, reject) => {
      this.uploadQueue.push({
        file,
        options,
        resolve,
        reject
      });

      this.processQueue();
    });
  }

  // Process upload queue
  async processQueue() {
    if (this.isProcessing || this.uploadQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.uploadQueue.length > 0) {
      const batch = this.uploadQueue.splice(0, this.maxConcurrentUploads);
      
      const promises = batch.map(({ file, options, resolve, reject }) =>
        this.uploadImage(file, options)
          .then(resolve)
          .catch(reject)
      );

      await Promise.allSettled(promises);
    }

    this.isProcessing = false;
  }

  // Utility function to chunk array
  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  // Get optimized image URL
  getOptimizedImageUrl(url, options = {}) {
    if (!url) return url;

    const {
      width,
      height,
      quality = 80,
      format = 'webp'
    } = options;

    // If it's an ImageKit URL, add transformation parameters
    if (url.includes('ik.imagekit.io')) {
      const params = new URLSearchParams();
      
      if (width) params.append('w', width);
      if (height) params.append('h', height);
      if (quality) params.append('q', quality);
      if (format) params.append('f', format);
      
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}${params.toString()}`;
    }

    return url;
  }

  // Preload images for better performance
  preloadImages(urls) {
    return Promise.all(
      urls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => reject(new Error(`Failed to load ${url}`));
          img.src = url;
        });
      })
    );
  }

  // Get image dimensions
  getImageDimensions(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  // Validate image file
  validateImage(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File too large. Please upload an image smaller than 10MB.'
      };
    }

    return { valid: true };
  }
}

// Create singleton instance
const imageService = new ImageService();

export default imageService;
