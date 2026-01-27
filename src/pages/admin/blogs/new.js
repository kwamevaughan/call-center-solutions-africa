import { useState } from "react";
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

export default function NewBlog({
  mode = "light",
  toggleMode,
  categories,
  tags,
  breadcrumbs,
  adminUser,
}) {
  const router = useRouter();
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
    fetchBlogs,
  } = useBlog();

  const handleFormSubmit = async (e, updatedFormData) => {
    e.preventDefault();
    const result = await handleSubmit(e, updatedFormData);
    if (result && !result.error) {
      toast.success("Blog created successfully!");
      router.push("/admin/blogs");
    }
  };

  const handleCancel = () => {
    router.push("/admin/blogs");
  };

  return (
    <>
      <SEO
        title="Create New Blog | Admin"
        description="Create a new blog post"
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
          pageName="New Blog Post"
          pageDescription="Create a new blog post"
          breadcrumbs={[
            { label: "Dashboard", href: "/admin" },
            { label: "Blog", href: "/admin/blogs" },
            { label: "New Post" },
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
              <BlogFormOptimized
                showForm={true}
                mode={mode}
                blogId={null}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleFormSubmit}
                handleCancel={handleCancel}
                loading={loading}
                isEditing={false}
                categories={categories}
                tags={tags}
                adminUser={adminUser}
                fetchBlogs={fetchBlogs}
                standalone={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
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
      breadcrumbs: [
        { label: "Dashboard", href: "/admin" },
        { label: "Blog", href: "/admin/blogs" },
        { label: "New Post" },
      ],
    },
  };
}

