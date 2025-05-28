export default function BlogCard({
    image,
    alt,
    title,
    author,
    date,
  }: {
    image: string;
    alt: string;
    title: string;
    author: string;
    date: string;
  }) {
    return (
      <article className="rounded-lg overflow-hidden bg-white">
        <img
          src={image}
          alt={alt}
          className="w-full h-auto object-cover rounded-lg"
        />
        <div className="mt-3 px-1">
          <h3 className="text-gray-900 text-base leading-6 font-normal">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Bởi <span className="text-purple-600 cursor-pointer">{author}</span>
            <span className="text-gray-400">• {date}</span>
          </p>
        </div>
      </article>
    );
  }
  