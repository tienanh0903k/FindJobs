import BlogGrid from "@/components/client/Blogs/BlogGrid";
import Breadcrumb from "@/components/base/BreadCrumb";

export default function BlogPage() {
  return (
    <main className="max-w-7xl mx-auto bg-white p-4 sm:p-6 md:p-8 min-h-screen mt-16">
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Blog" }, // Không có href là node cuối
        ]}
      />
      <h2 className="text-2xl font-bold mb-6">Blog</h2>
      <BlogGrid />
    </main>
  );
}
