import React from 'react';

interface ImageComponentProps {
  src: string; // Đường dẫn đến hình ảnh
  alt?: string; // Văn bản thay thế cho hình ảnh (optional)
  width?: number; // Chiều rộng của hình ảnh (optional)
  height?: number; // Chiều cao của hình ảnh (optional)
  className?: string; // Các lớp CSS tùy chọn (optional)
}

// Component Image tùy chỉnh
const Image: React.FC<ImageComponentProps> = ({ 
  src, 
  alt = 'Default alt text', 
  width = 100, 
  height = 100, 
  className = '', 
  ...props 
}) => {
  if (!src) {
    return <div>No image source provided</div>;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
};

export default Image;
