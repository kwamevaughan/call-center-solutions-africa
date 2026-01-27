import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import HRSidebar from "@/layouts/hrSidebar";
import HRHeader from "@/layouts/hrHeader";
import useSidebar from "@/hooks/useSidebar";
import useLogout from "@/hooks/useLogout";
import useAuthSession from "@/hooks/useAuthSession";
import { useBlog } from "@/hooks/useBlog";
import BlogFormOptimized from "@/components/blog/BlogFormOptimized";
import { getAdminBlogProps } from "utils/getPropsUtils";
import SEO from "@/components/SEO";
import { supabase } from "@/lib/supabase";

export default function EditBlog({
  mode = "light",
  toggleMode,
  categories,
  tags,
  breadcrumbs,
  adminUser,
  blogId,
}) {
  const router = useRouter();
  const { id } = router.query;
  useAuthSession();

  const {
    isSidebarOpen,
    toggleSidebar,
    sidebarState,
    updateDragOffset,
    isMobile,
    isHovering,
    handleMouseEnter,
    handleMouseLeave,
    handleOutsideClick,
  } = useSidebar();

  const handleLogout = useLogout();

  const {
    formData,
    setFormData,
    handleInputChange,
    loading,
    handleSubmit,
    handleEdit,
    fetchBlogs,
    setEditorContent,
  } = useBlog(id);

  const [isLoadingBlog, setIsLoadingBlog] = useState(true);

  // Load blog data when component mounts or id changes
  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id) return;
      
      try {
        setIsLoadingBlog(true);
        console.log("Fetching blog data for ID:", id);
        
        const { data, error } = await supabase
          .from("blogs")
          .select(
            `
            *,
            tags:blog_post_tags(
              tag:blog_tags(
                id,
                name,
                slug
              )
            ),
            category:blog_categories(
              id,
              name,
              slug
            ),
            author_details:admin_users(
              name,
              username
            )
          `
          )
          .eq("id", id)
          .single();

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        console.log("Fetched blog data:", data);

        if (data) {
          // Transform the blog data to match the form structure
          const tagIds = data.tags?.map(t => t.tag?.id).filter(Boolean) || [];
          console.log("Extracted tag IDs:", tagIds);
          
          const transformedData = {
            id: data.id,
            article_name: data.article_name || "",
            article_body: data.article_body || "",
            category_id: data.category_id || null,
            tag_ids: tagIds,
            article_image: data.article_image || "",
            meta_title: data.meta_title || "",
            meta_description: data.meta_description || "",
            meta_keywords: data.meta_keywords || "",
            canonical_url: data.canonical_url || "",
            og_title: data.og_title || "",
            og_description: data.og_description || "",
            twitter_card: data.twitter_card || "summary_large_image",
            slug: data.slug || "",
            is_published: data.is_published || false,
            is_draft: data.is_draft !== false,
            publish_date: data.publish_date || null,
            author: data.author_details?.name || data.author_details?.username || "CCSA Admin",
            title: data.article_name || "",
            description: data.meta_description || "",
            keywords: data.meta_keywords ? data.meta_keywords.split(",").map(k => k.trim()).filter(Boolean) : [],
            featured_image_url: data.article_image || "",
            featured_image_upload: null,
            featured_image_library: data.article_image || null,
            content: data.article_body || "",
            publish_option: data.is_published ? "publish" : (data.publish_date ? "schedule" : "draft"),
            scheduled_date: data.publish_date || null,
            focus_keyword: data.focus_keyword || "",
          };

          console.log("Transformed data:", transformedData);
          console.log("Article body length:", data.article_body?.length || 0);
          console.log("Article image:", data.article_image);
          
          // Set form data first
          setFormData(transformedData);
          
          // Then set editor content with a small delay to ensure formData is set
          setTimeout(() => {
            setEditorContent(data.article_body || "");
            console.log("Editor content set to:", data.article_body?.substring(0, 50) + "...");
          }, 100);
          
          console.log("Form data and editor content set");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error(`Failed to load blog post: ${error.message}`);
        // Don't redirect immediately, let user see the error
      } finally {
        setIsLoadingBlog(false);
      }
    };

    fetchBlogData();
  }, [id, setFormData, setEditorContent]);

  const handleFormSubmit = async (e, updatedFormData) => {
    e.preventDefault();
    const result = await handleSubmit(e, updatedFormData);
    if (result && !result.error) {
      toast.success("Blog updated successfully!");
      router.push("/admin/blogs");
    }
  };

  const handleCancel = () => {
    router.push("/admin/blogs");
  };

  return (
    <>
      <SEO
        title="Edit Blog | Admin"
        description="Edit blog post"
        noindex={true}
      />
      <div
        className={`min-h-screen flex flex-col antialiased ${
          mode === "dark"
            ? "bg-gray-950 text-gray-100"
            : "bg-gray-100 text-gray-900"
        } transition-colors duration-300`}
      >
        <HRHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          sidebarState={sidebarState}
          mode={mode}
          toggleMode={toggleMode}
          onLogout={handleLogout}
          pageName="Edit Blog Post"
          pageDescription="Edit your blog post"
          breadcrumbs={[
            { label: "Dashboard", href: "/admin" },
            { label: "Blog", href: "/admin/blogs" },
            { label: "Edit Post" },
          ]}
        />
        <div className="flex flex-1">
          <HRSidebar
            isSidebarOpen={isSidebarOpen}
            mode={mode}
            toggleSidebar={toggleSidebar}
            onLogout={handleLogout}
            setDragOffset={updateDragOffset}
            user={{ name: "CCSA Admin" }}
            isMobile={isMobile}
            isHovering={isHovering}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleOutsideClick={handleOutsideClick}
          />
          <div
            className={`flex-1 transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "md:ml-64" : "md:ml-20"
            } ${sidebarState.hidden ? "ml-0" : ""}`}
            style={{
              marginLeft: sidebarState.hidden
                ? "0px"
                : `${84 + (isSidebarOpen ? 120 : 0) + sidebarState.offset}px`,
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {isLoadingBlog ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Loading blog post...
                    </p>
                  </div>
                </div>
              ) : (
                <BlogFormOptimized
                  showForm={true}
                  mode={mode}
                  blogId={id}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleFormSubmit}
                  handleCancel={handleCancel}
                  loading={loading}
                  isEditing={true}
                  categories={categories}
                  tags={tags}
                  adminUser={adminUser}
                  fetchBlogs={fetchBlogs}
                  standalone={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const props = await getAdminBlogProps({ req, res });
  
  // If redirect, return it
  if (props.redirect) {
    return props;
  }

  // Return only the props needed for the form
  return {
    props: {
      categories: props.props?.categories || [],
      tags: props.props?.tags || [],
      adminUser: props.props?.adminUser || null,
      blogId: params?.id || null,
      breadcrumbs: [
        { label: "Dashboard", href: "/admin" },
        { label: "Blog", href: "/admin/blogs" },
        { label: "Edit Post" },
      ],
    },
  };
}

