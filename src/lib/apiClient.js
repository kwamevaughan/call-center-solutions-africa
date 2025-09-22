// lib/apiClient.js - Optimized API client with batching, caching, and retry logic
import { supabase } from './supabase';

class APIClient {
  constructor() {
    this.cache = new Map();
    this.requestQueue = new Map();
    this.batchTimeout = 50; // ms
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
  }

  // Request batching for multiple similar requests
  async batchRequest(key, requestFn) {
    if (this.requestQueue.has(key)) {
      return this.requestQueue.get(key);
    }

    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await requestFn();
          this.requestQueue.delete(key);
          resolve(result);
        } catch (error) {
          this.requestQueue.delete(key);
          reject(error);
        }
      }, this.batchTimeout);
    });

    this.requestQueue.set(key, promise);
    return promise;
  }

  // Cache with TTL
  getCached(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Retry logic with exponential backoff
  async withRetry(fn, retries = this.maxRetries) {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0 && this.isRetryableError(error)) {
        await this.delay(this.retryDelay * (this.maxRetries - retries + 1));
        return this.withRetry(fn, retries - 1);
      }
      throw error;
    }
  }

  isRetryableError(error) {
    return error.status >= 500 || error.code === 'NETWORK_ERROR' || error.code === 'TIMEOUT';
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Optimized Supabase queries
  async optimizedQuery(table, options = {}) {
    const {
      select = '*',
      filters = {},
      order = {},
      limit,
      offset,
      cache = true,
      batch = false
    } = options;

    const cacheKey = `${table}_${JSON.stringify({ select, filters, order, limit, offset })}`;
    
    if (cache) {
      const cached = this.getCached(cacheKey);
      if (cached) return cached;
    }

    const requestFn = async () => {
      let query = supabase.from(table).select(select);

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          query = query.in(key, value);
        } else if (typeof value === 'object' && value.operator) {
          query = query[value.operator](key, value.value);
        } else {
          query = query.eq(key, value);
        }
      });

      // Apply ordering
      if (order.column) {
        query = query.order(order.column, { ascending: order.ascending !== false });
      }

      // Apply pagination
      if (limit) {
        query = query.limit(limit);
      }
      if (offset) {
        query = query.range(offset, offset + (limit || 10) - 1);
      }

      const { data, error } = await query;
      if (error) throw error;

      if (cache) {
        this.setCache(cacheKey, data);
      }

      return data;
    };

    if (batch) {
      return this.batchRequest(cacheKey, requestFn);
    }

    return this.withRetry(requestFn);
  }

  // Parallel requests
  async parallelRequests(requests) {
    const promises = requests.map(request => 
      this.withRetry(() => request())
    );
    return Promise.allSettled(promises);
  }

  // Optimized blog operations
  async getBlogsOptimized(options = {}) {
    const {
      page = 1,
      limit = 12,
      category = null,
      search = null,
      status = 'all'
    } = options;

    const filters = {};
    if (category && category !== 'all') {
      filters.article_category = category;
    }
    if (status !== 'all') {
      if (status === 'published') {
        filters.is_published = true;
        filters.is_draft = false;
      } else if (status === 'draft') {
        filters.is_draft = true;
      }
    }

    const select = `
      *,
      author_details:admin_users(name, username),
      category:blog_categories(name),
      tags:blog_post_tags(
        tag:blog_tags(name)
      )
    `;

    const order = { column: 'created_at', ascending: false };
    const offset = (page - 1) * limit;

    return this.optimizedQuery('blogs', {
      select,
      filters,
      order,
      limit,
      offset,
      cache: true,
      batch: true
    });
  }

  // Batch multiple blog operations
  async batchBlogOperations(operations) {
    const requests = operations.map(op => {
      switch (op.type) {
        case 'getBlogs':
          return () => this.getBlogsOptimized(op.options);
        case 'getCategories':
          return () => this.optimizedQuery('blog_categories', { cache: true });
        case 'getTags':
          return () => this.optimizedQuery('blog_tags', { cache: true });
        case 'getUser':
          return () => this.optimizedQuery('admin_users', { 
            filters: { id: op.userId },
            cache: true 
          });
        default:
          return () => Promise.resolve(null);
      }
    });

    return this.parallelRequests(requests);
  }

  // Clear cache
  clearCache(pattern = null) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  // Get cache stats
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Create singleton instance
const apiClient = new APIClient();

export default apiClient;
