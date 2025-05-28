import BlogCard from "./BlogCard";

const BLOGS = [
  {
    image: "https://placehold.co/400x200?text=Two+men+standing+back+to+back+with+green+check+and+red+cross+on+wall",
    alt: "Two men standing back to back...",
    title: "Có sai lầm khi tôi chuyển hướng từ IT sang Marketing?",
    author: "Thuy Diem",
    date: "3 tháng trước",
  },
  {
    image: "https://placehold.co/400x200?text=Woman+in+black+business+suit+talking+on+phone+at+office+desk",
    alt: "Woman in black business suit...",
    title: "Nhân sự ngành du lịch: Cung không theo kịp cầu",
    author: "Thuy Diem",
    date: "3 tháng trước",
  },
  {
    image: "https://placehold.co/400x200?text=Woman+in+black+business+suit+talking+on+phone+at+office+desk",
    alt: "Woman in black business suit...",
    title: "Nhân sự ngành du lịch: Cung không theo kịp cầu",
    author: "Thuy Diem",
    date: "3 tháng trước",
  },
  {
    image: "https://placehold.co/400x200?text=Woman+in+black+business+suit+talking+on+phone+at+office+desk",
    alt: "Woman in black business suit...",
    title: "Nhân sự ngành du lịch: Cung không theo kịp cầu",
    author: "Thuy Diem",
    date: "3 tháng trước",
  },
  {
    image: "https://placehold.co/400x200?text=Woman+in+black+business+suit+talking+on+phone+at+office+desk",
    alt: "Woman in black business suit...",
    title: "Nhân sự ngành du lịch: Cung không theo kịp cầu",
    author: "Thuy Diem",
    date: "3 tháng trước",
  },
  {
    image: "https://placehold.co/400x200?text=Woman+in+black+business+suit+talking+on+phone+at+office+desk",
    alt: "Woman in black business suit...",
    title: "Nhân sự ngành du lịch: Cung không theo kịp cầu",
    author: "Thuy Diem",
    date: "3 tháng trước",
  },
  {
    image: "https://placehold.co/400x200?text=Woman+in+black+business+suit+talking+on+phone+at+office+desk",
    alt: "Woman in black business suit...",
    title: "Nhân sự ngành du lịch: Cung không theo kịp cầu",
    author: "Thuy Diem",
    date: "3 tháng trước",
  },
  // ...Thêm các bài viết khác ở đây
];

export default function BlogGrid() {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {BLOGS.map((item, idx) => (
        <BlogCard key={idx} {...item} />
      ))}
    </div>
  );
}
